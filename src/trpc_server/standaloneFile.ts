import { router, publicProcedure } from "./trpc";

import { z } from "zod";

import prisma from "@/app/utils/prismadb";

import { BooksListPerPageSize } from "@/pagination";
import { getSortbyDirection, transformRawResultsToPrisma } from "@/utils/utils";
import { standaloneFile } from "@prisma/client";

export const standaloneFileRouter = router({
  get: publicProcedure
    .input(
      z.object({
        type: z.union([z.literal("Book"), z.literal("Article")]),
        paginationToken: z.union([z.string(), z.null()]),
        sortBy: z.union([z.string(), z.null()]),
        query: z.union([z.string(), z.null()]),
        going: z.union([z.string(), z.null()]),
        page: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { query, sortBy, page, paginationToken, going, type } = input;

      const toSkip = (page - 1) * BooksListPerPageSize;

      const pipeline_search = [
        {
          $search: {
            index: "search",
            compound: {
              must: [
                {
                  text: {
                    query,
                    fuzzy: {},
                    path: "name",
                  },
                },
              ],
              filter: [
                {
                  text: {
                    query: type,
                    path: "type",
                  },
                },
              ],
            },

            scoreDetails: true,

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
          $limit: BooksListPerPageSize,
        },
        {
          $project: {
            name: 1,
            imageUrl: 1,
            metadata: "$$SEARCH_META",
            scoreDetails: { $meta: "searchScoreDetails" },
            paginationToken: { $meta: "searchSequenceToken" },
          },
        },
      ];

      const pipeline_noSearch = [
        {
          $match: {
            type,
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
            data: [{ $skip: toSkip }, { $limit: BooksListPerPageSize }],
          },
        },
      ];

      const data = (await prisma.standaloneFile.aggregateRaw({
        pipeline: query ? pipeline_search : pipeline_noSearch,
      })) as any;

      const totalCount = query
        ? data[0]?.metadata.count.total || 0
        : data[0]?.metadata[0]?.total || 0;

      const books = transformRawResultsToPrisma(
        query ? data : (data[0].data as any)
      ) as (standaloneFile & { paginationToken?: string })[];

      return {
        books,
        totalCount,
      };
    }),

  getStandalonesAutocompletes: publicProcedure
    .input(
      z.object({
        query: z.optional(z.string()),
        type: z.union([z.literal("Book"), z.literal("Article")]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { query, type } = input;

      if (!query || query.length === 0) return [];

      const pipeline = [
        {
          $search: {
            index: "search",
            compound: {
              must: [
                {
                  autocomplete: {
                    query,
                    path: "name",
                    fuzzy: {},
                  },
                },
              ],

              filter: [
                {
                  queryString: {
                    defaultPath: "type",
                    query: type,
                  },
                },
              ],
            },
          },
        },
        {
          $project: {
            name: 1,
          },
        },
      ];

      const data = (await prisma.standaloneFile.aggregateRaw({
        pipeline,
      })) as unknown as Omit<standaloneFile, "createdAt" | "updatedAt">[];

      return data;
    }),
});
