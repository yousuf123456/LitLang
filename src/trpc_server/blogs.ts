import { router, publicProcedure, protectedProcedure } from "./trpc";

import { z } from "zod";
import prisma from "@/app/utils/prismadb";

import { blogType } from "@/types";

import { BlogsListPageSize } from "@/pagination";
import { getSortbyDirection, transformRawResultsToPrisma } from "@/utils/utils";
import { blogs } from "@prisma/client";

export const blogsRouter = router({
  updateOrCreate: protectedProcedure
    .input(
      z.object({
        asAnUncompletedDraft: z.union([z.undefined(), z.boolean()]),
        draftId: z.union([z.string(), z.undefined(), z.null()]),
        coverImage: z.union([z.undefined(), z.string()]),
        content: z.union([z.undefined(), z.string()]),
        title: z.union([z.undefined(), z.string()]),
        pendingForApproval: z.boolean(),
        isPublished: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      const {
        title,
        draftId,
        content,
        coverImage,
        isPublished,
        pendingForApproval,
        asAnUncompletedDraft,
      } = input;

      if (!draftId) {
        const data = {
          asAUncompletedDraft:
            asAnUncompletedDraft === undefined ? true : asAnUncompletedDraft,
          isPublished: isPublished,
          pendingForApproval,
          coverImage,
          content,
          userId,
          title,
        };

        const createdDraft = await prisma.blogs.create({
          data,
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
          pendingForApproval,
          isPublished: isPublished,
          asAUncompletedDraft:
            asAnUncompletedDraft === undefined ? true : asAnUncompletedDraft,
        },
      });

      return updatedDraft.id;
    }),

  // Getting from server fn
  get: publicProcedure
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
                    fuzzy: {},
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

              ...(!userId
                ? {
                    filter: [
                      {
                        equals: {
                          path: "isPublished",
                          value: true,
                        },
                      },
                    ],
                  }
                : {}),
            },
            count: {
              type: "total",
            },

            sort: { score: { $meta: "searchScore" }, createdAt: 1 },

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
            ...(!userId ? { isPublished: true } : {}),
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

  getBlogsAutocompletes: publicProcedure
    .input(
      z.object({
        query: z.optional(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { query } = input;

      if (!query || query.length === 0) return [];

      const pipeline = [
        {
          $search: {
            index: "search",
            autocomplete: {
              query,
              path: "title",
              fuzzy: {},
            },
          },
        },
        {
          $project: {
            title: 1,
          },
        },
      ];

      const data = (await prisma.blogs.aggregateRaw({
        pipeline,
      })) as unknown as Omit<blogs, "createdAt" | "updatedAt">[];

      return data;
    }),
});
