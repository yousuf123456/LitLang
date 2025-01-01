import React from "react";

import { StandaloneFilesList } from "./StandaloneFilesList";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { OverlayImageHeader } from "@/components/OverlayImageHeader";
import { Search_SortInputs } from "./Search_SortInputs";
import { StandaloneFileType } from "@prisma/client";
import { redirect } from "next/navigation";
import { getStandaloneFiles } from "../_serverFn/getStandaloneFiles";
import { PaginationSearchParams } from "@/types";
import { delay } from "@/app/subjects/_components/Subjects";

export const StandaloneFiles = async ({
  type,
  page,
  query,
  going,
  sortBy,
  bookId,
  paginationToken,
}: { type: StandaloneFileType; bookId?: string } & PaginationSearchParams) => {
  const { standaloneFiles, totalCount } = await getStandaloneFiles({
    type,
    query,
    going,
    bookId,
    sortBy,
    paginationToken,
    page: parseInt(page || "1"),
  });

  return (
    <StandaloneFilesList
      standaloneFiles={standaloneFiles}
      totalCount={totalCount}
    />
  );
};
