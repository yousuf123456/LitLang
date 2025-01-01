import { router, publicProcedure } from "./trpc";

import { z } from "zod";

import prisma from "@/app/utils/prismadb";

import { standaloneFile } from "@prisma/client";
import { StandalonesListPerPageSize } from "@/pagination";
import { getSortbyDirection, transformRawResultsToPrisma } from "@/utils/utils";
import { FullStandaloneFileType } from "@/types";

export const standaloneFileRouter = router({
  // Getting from server fn
  get: publicProcedure
    .input(
      z.object({
        type: z.union([
          z.literal("Text"),
          z.literal("Book"),
          z.literal("Article"),
          z.literal("BookReview"),
        ]),
        paginationToken: z.union([z.string(), z.null()]),
        sortBy: z.union([z.string(), z.null()]),
        bookId: z.union([z.string(), z.null()]),
        query: z.union([z.string(), z.null()]),
        going: z.union([z.string(), z.null()]),
        page: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { query, sortBy, page, paginationToken, going, type, bookId } =
        input;

      const toSkip = (page - 1) * StandalonesListPerPageSize;

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
          $limit: StandalonesListPerPageSize,
        },
        {
          $project: {
            name: 1,
            imageUrl: 1,
            bookReviewIds: 1,
            metadata: "$$SEARCH_META",
            scoreDetails: { $meta: "searchScoreDetails" },
            paginationToken: { $meta: "searchSequenceToken" },
          },
        },
      ];

      if (bookId) {
        pipeline_search[0].$search?.compound.filter.push({
          equals: {
            value: { $oid: bookId },
            path: "bookId",
          },
        } as any);
      }

      const pipeline_noSearch = [
        {
          $match: {
            type,
            ...(bookId ? { bookId: { $oid: bookId } } : {}),
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
            data: [{ $skip: toSkip }, { $limit: StandalonesListPerPageSize }],
          },
        },
      ];

      const data = (await prisma.standaloneFile.aggregateRaw({
        pipeline: query ? pipeline_search : pipeline_noSearch,
      })) as any;

      const totalCount = query
        ? data[0]?.metadata.count.total || 0
        : data[0]?.metadata[0]?.total || 0;

      const standaloneFiles = transformRawResultsToPrisma(
        query ? data : (data[0].data as any)
      ) as (FullStandaloneFileType & { paginationToken?: string })[];

      return {
        standaloneFiles,
        totalCount,
      };
    }),

  getStandalonesAutocompletes: publicProcedure
    .input(
      z.object({
        bookId: z.union([z.string(), z.null()]),
        query: z.optional(z.string()),
        type: z.union([
          z.literal("Book"),
          z.literal("Article"),
          z.literal("Text"),
          z.literal("BookReview"),
        ]),
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
