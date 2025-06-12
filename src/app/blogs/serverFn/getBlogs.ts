import prisma from "@/app/utils/prismadb";

import { blogType } from "@/types";
import { BlogsListPageSize } from "@/pagination";
import { getSortbyDirection, transformRawResultsToPrisma } from "@/utils/utils";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface ParamsType {
  paginationToken: string | undefined;
  sortBy: string | undefined;
  query: string | undefined;
  going: string | undefined;
  isOnlyMyBlogs: boolean;
  page: number;
}

export const getBlogs = async (params: ParamsType) => {
  const { query, sortBy, page, paginationToken, going, isOnlyMyBlogs } = params;

  const { userId, sessionId } = await auth();

  if (isOnlyMyBlogs && (!userId || !sessionId)) redirect("/sign-in");

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

          ...(isOnlyMyBlogs
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

          ...(!isOnlyMyBlogs
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
        ...(!isOnlyMyBlogs ? { isPublished: true } : {}), // Get all users blogs but only the published ones
        ...(isOnlyMyBlogs ? { userId } : {}), // Get all the blogs of a specific user
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
