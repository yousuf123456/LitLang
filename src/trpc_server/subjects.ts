import { TRPCError } from "@trpc/server";
import { router, publicProcedure } from "./trpc";

import { z } from "zod";

import prisma from "@/app/utils/prismadb";
import googleDrive from "@/app/utils/googleDrive";

import { SubjectType } from "@/types";

import { SubjectsListPageSize } from "@/pagination";
import { getSortbyDirection, transformRawResultsToPrisma } from "@/utils/utils";

export const subjectsRouter = router({
  get: publicProcedure
    .input(
      z.object({
        paginationToken: z.union([z.string(), z.null()]),
        university: z.union([z.string(), z.null()]),
        sortBy: z.union([z.string(), z.null()]),
        query: z.union([z.string(), z.null()]),
        going: z.union([z.string(), z.null()]),
        page: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { query, sortBy, page, paginationToken, going, university } = input;

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
              ...(university
                ? {
                    filter: [
                      {
                        text: {
                          path: "universityShort",
                          query: university,
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
              createdAt: 1,
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
        {
          $match: {
            ...(university ? { university } : {}),
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
            semester: 1,
            universityShort: 1,
          },
        },
      ];

      const data = (await prisma.subject.aggregateRaw({
        pipeline,
      })) as unknown as Omit<
        SubjectType,
        "createdAt" | "updatedAt" | "resources" | "university"
      >[];

      return data;
    }),
  getUInt8ArrayOfPdf: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      try {
        const fileId = input;

        if (!fileId)
          throw new TRPCError({
            message: "No file id was provided",
            code: "UNPROCESSABLE_CONTENT",
          });

        const response = await googleDrive.files.get(
          { fileId, alt: "media" },
          { responseType: "arraybuffer" }
        );

        // const pdfBuffer = Buffer.from(response.data as ArrayBuffer);

        const u8intArray = new Uint8Array(response.data as ArrayBuffer);

        console.log(typeof u8intArray);

        return u8intArray;
      } catch (e: any) {
        throw new TRPCError({
          message: "Internal Server Error",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
