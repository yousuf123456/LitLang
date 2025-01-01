import React from "react";

import { SubjectsList } from "./SubjectsList";
import { getSubjects } from "../_serverFn/getSubjects";
import { PaginationSearchParams, sortSearchParamType } from "@/types";

export function delay(ms: number) {
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
