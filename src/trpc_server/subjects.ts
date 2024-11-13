import { router, publicProcedure } from "./trpc";

import { z } from "zod";

import prisma from "@/app/utils/prismadb";

import { SubjectType } from "@/types";

import { SubjectsListPageSize } from "@/pagination";
import { getSortbyDirection, transformRawResultsToPrisma } from "@/utils/utils";

export const subjectsRouter = router({
  // Using a server function for this
  get: publicProcedure
    .input(
      z.object({
        paginationToken: z.union([z.string(), z.null()]),
        sortBy: z.union([z.string(), z.null()]),
        query: z.union([z.string(), z.null()]),
        going: z.union([z.string(), z.null()]),
        page: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { query, sortBy, page, paginationToken, going } = input;

      const toSkip = (page - 1) * SubjectsListPageSize;

      const pipeline_search = [
        {
          $search: {
            index: "search",
            compound: {
              should: [
                {
                  text: {
                    query,
                    fuzzy: {},
                    path: "name",
                  },
                },
                {
                  text: {
                    query,
                    path: "university",
                  },
                },
                {
                  text: {
                    query,
                    path: "universityShort",
                  },
                },
              ],
              minimumShouldMatch: 1,
              // ...(university
              //   ? {
              //       filter: [
              //         {
              //           text: {
              //             path: "universityShort",
              //             query: university,
              //           },
              //         },
              //       ],
              //     }
              //   : {}),
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
          $limit: SubjectsListPageSize,
        },
        {
          $project: {
            name: 1,
            semester: 1,
            imageUrl: 1,
            resources: 1,
            university: 1,
            universityShort: 1,
            metadata: "$$SEARCH_META",
            paginationToken: { $meta: "searchSequenceToken" },
          },
        },
      ];

      const pipeline_noSearch = [
        // {
        //   $match: {
        //     ...(university ? { universityShort: university } : {}),
        //   },
        // },
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
            data: [{ $skip: toSkip }, { $limit: SubjectsListPageSize }],
          },
        },
      ];

      const data = (await prisma.subject.aggregateRaw({
        pipeline: query ? pipeline_search : pipeline_noSearch,
      })) as any;

      const totalCount = query
        ? data[0]?.metadata.count.total || 0
        : data[0]?.metadata[0]?.total || 0;

      const subjects = transformRawResultsToPrisma(
        query ? data : (data[0].data as any)
      ) as SubjectType[];

      return {
        subjects,
        totalCount,
      };
    }),

  getSubjectsAutocompletes: publicProcedure
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
              query: query,
              path: "name",
              fuzzy: {},
            },
          },
        },
        {
          $project: {
            name: 1,
          },
        },
      ];

      const data = (await prisma.subject.aggregateRaw({
        pipeline,
      })) as unknown as Omit<
        SubjectType,
        "createdAt" | "updatedAt" | "resources"
      >[];

      return data;
    }),
});
