import { z } from "zod";
import prisma from "@/app/utils/prismadb";
import { createCallerFactory, protectedProcedure, router } from "./trpc";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export const appRouter = router({
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

  getBlogs: protectedProcedure.query(async ({ ctx }) => {
    const blogs = await prisma.blogs.findMany({
      where: { isPublished: true },
      take: 15,
    });

    return blogs;
  }),
});

const createCaller = createCallerFactory(appRouter);
export const caller = createCaller({});

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

export type AppRouter = typeof appRouter;
