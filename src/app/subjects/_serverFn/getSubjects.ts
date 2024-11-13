import prisma from "@/app/utils/prismadb";

import { SubjectType } from "@/types";
import { SubjectsListPageSize } from "@/pagination";
import { getSortbyDirection, transformRawResultsToPrisma } from "@/utils/utils";

interface ParamsType {
  paginationToken?: string;
  sortBy?: string;
  query?: string;
  going?: string;
  page: number;
}

export const getSubjects = async (params: ParamsType) => {
  const { query, sortBy, page, paginationToken, going } = params;

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
    {
      ...(sortBy
        ? {
            $sort: {
              [sortBy.split("-")[0]]: getSortbyDirection(sortBy.split("-")[1]),
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
    totalCount: totalCount as number,
  };
};
