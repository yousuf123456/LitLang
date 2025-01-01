import prisma from "@/app/utils/prismadb";

import { FullStandaloneFileType } from "@/types";
import { StandalonesListPerPageSize } from "@/pagination";
import { getSortbyDirection, transformRawResultsToPrisma } from "@/utils/utils";

interface ParamsType {
  type: "Text" | "Book" | "Article" | "BookReview";
  paginationToken: string | undefined;
  sortBy: string | undefined;
  bookId: string | undefined;
  query: string | undefined;
  going: string | undefined;
  page: number;
}

export const getStandaloneFiles = async (params: ParamsType) => {
  const { query, sortBy, page, paginationToken, going, type, bookId } = params;

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
};
