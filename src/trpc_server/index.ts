import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import { createCallerFactory, router } from "./trpc";

import { chatRouter } from "./chat";
import { blogsRouter } from "./blogs";
import { standaloneFileRouter } from "./standaloneFile";
import { subjectsRouter } from "./subjects";
import { paymentsRouter } from "./payments";

export const appRouter = router({
  chat: chatRouter,
  blogs: blogsRouter,
  subjects: subjectsRouter,
  payments: paymentsRouter,
  standaloneFiles: standaloneFileRouter,
});

const createCaller = createCallerFactory(appRouter);
export const caller = createCaller({});

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

export type AppRouter = typeof appRouter;
