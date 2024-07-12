import { router, protectedProcedure } from "./trpc";

import prisma from "@/app/utils/prismadb";

import {
  authenticate,
  createPaymobSubscription,
  createSubscriptionPlan,
} from "@/utils/paymob";

import { currentUser, User } from "@clerk/nextjs/server";

export const paymentsRouter = router({
  createSubscription: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      const dbUser = await prisma.user.findUnique({
        where: { clerkId: ctx.userId },
      });

      if (!dbUser) {
        const user = (await currentUser()) as User;
        await prisma.user.create({
          data: {
            clerkId: ctx.userId,
            email: user.primaryEmailAddress?.emailAddress || "",
          },
        });
      }

      if (dbUser?.planInfo?.client_secret) return dbUser.planInfo.client_secret;

      const user = (await currentUser()) as User;
      const authToken = await authenticate();

      const subscriptionPlan = await createSubscriptionPlan(authToken, {
        frequency: 7,
        name: "Pro",
        reminder_days: 3,
        retrial_days: null,
        plan_type: "rent",
        number_of_deductions: null,
        amount_cents: 21127,
        use_transaction_amount: true,
        is_active: true,
        integration: 175418,
        fee: null,
      });

      const subscription = await createPaymobSubscription({
        amount: 1000,
        currency: "PKR",
        integrations: [{}],
        payment_methods: ["card"],
        subscription_plan_id: subscriptionPlan.id,
        items: [
          {
            name: "Litlang Premium Notes Access",
            amount: 1000,
            description: "Premium hand written notes with voice explainations",
            quantity: 1,
          },
        ],
        billing_data: {
          apartment: "demo",
          first_name: user.firstName,
          last_name: user.lastName,
          street: "demo",
          building: "demo",
          phone_number: "demo",
          country: "demo",
          email: user.primaryEmailAddress?.emailAddress,
          floor: "demo",
          state: "demo",
        },
        customer: {
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.primaryEmailAddress?.emailAddress,
        },
      });

      if (subscription?.client_secret) {
        await prisma.user.update({
          where: {
            clerkId: ctx.userId,
          },
          data: {
            planInfo: {
              client_secret: subscription.client_secret,
              subscriptionPlanId: subscriptionPlan.id,
            },
          },
        });
      }

      return "";
    } catch (e) {
      console.log(e);
      return "";
    }
  }),
});
