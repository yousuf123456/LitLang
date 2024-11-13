import React, { Suspense } from "react";

import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";

import { SubjectsList } from "./SubjectsList";
import { OverlayImageHeader } from "@/components/OverlayImageHeader";
import { PaginationSearchParams, sortSearchParamType } from "@/types";
import { getSubjects } from "../_serverFn/getSubjects";
import { LoadingState } from "./LoadingState";
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export const Subjects = async ({
  page,
  query,
  going,
  sortBy,
  paginationToken,
}: PaginationSearchParams) => {
  const { subjects, totalCount } = await getSubjects({
    sortBy: sortBy as sortSearchParamType | undefined,
    page: parseInt(page || "1"),
    paginationToken,
    going,
    query,
  });

  return <SubjectsList subjects={subjects} totalCount={totalCount} />;
};
