"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { getSearchParamsArray } from "@/utils/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { BlogsListPageSize } from "@/pagination";

export const PaginationControls = ({
  nextPaginationToken,
  prevPaginationToken,
  totalCount,
}: {
  nextPaginationToken: string | undefined;
  prevPaginationToken: string | undefined;
  totalCount: number;
}) => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const noOfAvailablePages = Math.ceil(totalCount / BlogsListPageSize);
  const isNextPageAvailable = currentPage < noOfAvailablePages;

  const router = useRouter();

  const onNext = () => {
    let searchParamsToAdd = [`page=${currentPage + 1}`, "going=next"];
    if (nextPaginationToken)
      searchParamsToAdd.push(`paginationToken=${nextPaginationToken}`);

    const searchParamsArray = getSearchParamsArray(
      searchParams,
      searchParamsToAdd,
      ["page", "paginationToken", "going"]
    );

    router.push(`/blogs?${searchParamsArray.join("&")}`);
  };

  const onPrev = () => {
    let searchParamsToAdd = currentPage > 2 ? [`page=${currentPage - 1}`] : [];

    if (prevPaginationToken) {
      searchParamsToAdd.push(`paginationToken=${prevPaginationToken}`);
      searchParamsToAdd.push("going=prev");
    }

    const searchParamsArray = getSearchParamsArray(
      searchParams,
      searchParamsToAdd,
      ["page", "paginationToken", "going"]
    );

    router.push(`/blogs?${searchParamsArray.join("&")}`);
  };

  return (
    <div className="flex w-full justify-center gap-4 mt-6">
      <Button
        disabled={currentPage === 1}
        variant={"secondary"}
        onClick={onPrev}
      >
        Prev Page
      </Button>

      <Button
        disabled={!isNextPageAvailable}
        variant={"secondary"}
        onClick={onNext}
      >
        Next Page
      </Button>
    </div>
  );
};
