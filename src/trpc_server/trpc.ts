import { currentUser } from "@clerk/nextjs/server";
import { TRPCError, initTRPC } from "@trpc/server";

const t = initTRPC.create();

const middleware = t.middleware(async (opts) => {
  const user = await currentUser();

  if (!user || !user.id) throw new TRPCError({ code: "UNAUTHORIZED" });

  return opts.next({
    ctx: { userId: user.id },
  });
});

export const { createCallerFactory, router } = t;

// export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(middleware);
