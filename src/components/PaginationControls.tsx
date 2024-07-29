"use client";
import React, { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { getSearchParamsArray, scrollToElement } from "@/utils/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const PaginationControls = ({
  nextPaginationToken,
  prevPaginationToken,
  itemsPerPage,
  totalCount,
}: {
  nextPaginationToken: string | undefined;
  prevPaginationToken: string | undefined;
  itemsPerPage: number;
  totalCount: number;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const noOfAvailablePages = Math.ceil(totalCount / itemsPerPage);
  const isNextPageAvailable = currentPage < noOfAvailablePages;

  const router = useRouter();

  const onNext = () => {
    let searchParamsToAdd = [`page=${currentPage + 1}`, "going=next"];
    if (nextPaginationToken)
      searchParamsToAdd.push(
        `paginationToken=${encodeURIComponent(nextPaginationToken)}`
      );

    const searchParamsArray = getSearchParamsArray(
      searchParams,
      searchParamsToAdd,
      ["page", "paginationToken", "going"]
    );

    router.push(`${pathname}?${searchParamsArray.join("&")}`, {
      scroll: false,
    });
  };

  const onPrev = () => {
    let searchParamsToAdd = currentPage > 2 ? [`page=${currentPage - 1}`] : [];

    if (prevPaginationToken) {
      searchParamsToAdd.push(
        `paginationToken=${encodeURIComponent(prevPaginationToken)}`
      );
      searchParamsToAdd.push("going=prev");
    }

    const searchParamsArray = getSearchParamsArray(
      searchParams,
      searchParamsToAdd,
      ["page", "paginationToken", "going"]
    );

    router.push(`${pathname}?${searchParamsArray.join("&")}`, {
      scroll: currentPage <= 2,
    });
  };

  useEffect(() => {
    if (currentPage <= 1) return;

    scrollToElement("data-container", 48);
  }, [currentPage]);

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
