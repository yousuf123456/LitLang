import prisma from "@/app/utils/prismadb";

import { z } from "zod";

import { inferRouterInputs, inferRouterOutputs, TRPCError } from "@trpc/server";

import {
  createCallerFactory,
  protectedProcedure,
  publicProcedure,
  router,
} from "./trpc";

import { getSortbyDirection, transformRawResultsToPrisma } from "@/utils/utils";

import { BlogsListPageSize, SubjectsListPageSize } from "@/pagination";
import { blogType, SubjectType } from "@/types";
import { currentUser, User } from "@clerk/nextjs/server";

import {
  authenticate,
  createPaymobSubscription,
  createSubscriptionPlan,
} from "@/utils/paymob";
import { blogsRouter } from "./blogs";
import { subjectsRouter } from "./subjects";
import { paymentsRouter } from "./payments";

export const appRouter = router({
  blogs: blogsRouter,
  subjects: subjectsRouter,
  payments: paymentsRouter,
});

const createCaller = createCallerFactory(appRouter);
export const caller = createCaller({});

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

export type AppRouter = typeof appRouter;
