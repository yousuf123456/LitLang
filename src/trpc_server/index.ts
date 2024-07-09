import prisma from "@/app/utils/prismadb";

import { z } from "zod";
import { inferRouterInputs, inferRouterOutputs, TRPCError } from "@trpc/server";
import {
  createCallerFactory,
  protectedProcedure,
  publicProcedure,
  router,
} from "./trpc";
import {
  getSortbyDirection,
  paymobApiUrl,
  transformRawResultsToPrisma,
} from "@/utils/utils";
import { BlogsListPageSize } from "@/pagination";
import { blogType } from "@/types";
import { currentUser, User } from "@clerk/nextjs/server";
import {
  authenticate,
  createPaymobSubscription,
  createSubscriptionPlan,
} from "@/utils/paymob";

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const user = await currentUser();

    if (!user) return { success: false };

    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });

    if (!dbUser) {
      await prisma.user.create({
        data: {
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress || "",
        },
      });
    }

    return { success: true };
  }),
  updateOrCreateDraft: protectedProcedure
    .input(
      z.object({
        asAnUncompletedDraft: z.union([z.undefined(), z.boolean()]),
        draftId: z.union([z.string(), z.undefined(), z.null()]),
        isPublished: z.union([z.undefined(), z.boolean()]),
        coverImage: z.union([z.undefined(), z.string()]),
        content: z.union([z.undefined(), z.string()]),
        title: z.union([z.undefined(), z.string()]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const {
        draftId,
        content,
        coverImage,
        title,
        asAnUncompletedDraft,
        isPublished,
      } = input;

      if (!draftId) {
        const createdDraft = await prisma.blogs.create({
          data: {
            asAUncompletedDraft:
              asAnUncompletedDraft === undefined ? true : asAnUncompletedDraft,
            isPublished: isPublished!!,
            coverImage,
            content,
            title,
            userId,
          },
        });

        return createdDraft.id;
      }

      const updatedDraft = await prisma.blogs.update({
        where: {
          id: draftId,
        },
        data: {
          title,
          content,
          coverImage,
          isPublished: isPublished!!,
          asAUncompletedDraft:
            asAnUncompletedDraft === undefined ? true : asAnUncompletedDraft,
        },
      });

      return updatedDraft.id;
    }),

  getBlogs: publicProcedure
    .input(
      z.object({
        paginationToken: z.union([z.string(), z.null()]),
        sortBy: z.union([z.string(), z.null()]),
        userId: z.union([z.string(), z.null()]),
        query: z.union([z.string(), z.null()]),
        going: z.union([z.string(), z.null()]),
        page: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { query, sortBy, page, paginationToken, going, userId } = input;

      const toSkip = (page - 1) * BlogsListPageSize;

      const pipeline_search = [
        {
          $search: {
            index: "search",
            compound: {
              must: [
                {
                  text: {
                    query,
                    path: "title",
                  },
                },
              ],

              ...(userId
                ? {
                    filter: [
                      {
                        text: {
                          path: "userId",
                          query: userId,
                        },
                      },
                    ],
                  }
                : {}),
            },
            count: {
              type: "total",
            },
            sort: {
              ...(sortBy
                ? {
                    [sortBy.split("-")[0]]: getSortbyDirection(
                      sortBy.split("-")[1]
                    ),
                  }
                : {
                    _id: -1,
                  }),
            },
            ...(paginationToken
              ? {
                  ...(going === "next"
                    ? {
                        searchAfter: paginationToken,
                      }
                    : {
                        searchBefore: paginationToken,
                      }),
                }
              : {}),
          },
        },
        {
          $limit: BlogsListPageSize,
        },
        {
          $project: {
            paginationToken: { $meta: "searchSequenceToken" },
            metadata: "$$SEARCH_META",
            asAUncompletedDraft: 1,
            isPublished: 1,
            coverImage: 1,
            content: 1,
            title: 1,
            userId: 1,
          },
        },
      ];

      const pipeline_noSearch = [
        {
          $match: {
            isPublished: true,
            ...(userId ? { userId } : {}),
          },
        },
        {
          ...(sortBy
            ? {
                $sort: {
                  [sortBy.split("-")[0]]: getSortbyDirection(
                    sortBy.split("-")[1]
                  ),
                },
              }
            : {
                $sort: {
                  _id: -1,
                },
              }),
        },
        {
          $facet: {
            metadata: [{ $count: "total" }],
            data: [{ $skip: toSkip }, { $limit: BlogsListPageSize }],
          },
        },
      ];

      const data = (await prisma.blogs.aggregateRaw({
        pipeline: query ? pipeline_search : pipeline_noSearch,
      })) as any;

      const totalCount = query
        ? data[0]?.metadata.count.total || 0
        : data[0]?.metadata[0]?.total || 0;

      const blogs = transformRawResultsToPrisma(
        query ? data : (data[0].data as any)
      ) as blogType[];

      return {
        blogs,
        totalCount,
      };
    }),
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

      console.log(subscription);

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

const createCaller = createCallerFactory(appRouter);
export const caller = createCaller({});

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

export type AppRouter = typeof appRouter;
