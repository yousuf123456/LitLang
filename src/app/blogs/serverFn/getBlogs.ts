import prisma from "@/app/utils/prismadb";

import { blogType } from "@/types";
import { BlogsListPageSize } from "@/pagination";
import { getSortbyDirection, transformRawResultsToPrisma } from "@/utils/utils";

interface ParamsType {
  paginationToken: string | undefined;
  sortBy: string | undefined;
  userId: string | undefined;
  query: string | undefined;
  going: string | undefined;
  page: number;
}

export const getBlogs = async (params: ParamsType) => {
  const { query, sortBy, page, paginationToken, going, userId } = params;

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
};
