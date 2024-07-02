import prisma from "@/app/utils/prismadb";

import { z } from "zod";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { createCallerFactory, protectedProcedure, router } from "./trpc";
import { getSortbyDirection, transformRawResultsToPrisma } from "@/utils/utils";
import { blogs } from "@prisma/client";
import { BlogsListPageSize } from "@/pagination";
import { blogType } from "@/types";

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

  getBlogs: protectedProcedure
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
});

const createCaller = createCallerFactory(appRouter);
export const caller = createCaller({});

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

export type AppRouter = typeof appRouter;
