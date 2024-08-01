"use client";
import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getSearchParamsArray, scrollToElement } from "@/utils/utils";
import { useRouter, useSearchParams } from "next/navigation";

export const SortbySelector = ({
  sortBy,
  pathname,
  setSortBy,
  sortByOptions,
}: {
  sortBy: string;
  pathname: string;
  sortByOptions: { label: string; value: string }[];
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const onSort = () => {
    const isDefault = sortBy.split("-")[2] === "default";

    const searchParamsArray = getSearchParamsArray(
      searchParams,
      isDefault ? [] : [`sortBy=${sortBy}`],
      ["sortBy"]
    );

    router.push(`${pathname}?${searchParamsArray.join("&")}`, {
      scroll: false,
    });

    scrollToElement("data-container", 48);
  };

  useEffect(() => {
    // Do not sort when user searches for blogs
    if (sortBy === "best_matched") return;

    // Do not sort if sort is default and user has not done any other sorting
    if (
      sortBy.split("-")[2] === "default" &&
      searchParams.get("sortBy") === null
    )
      return;

    // Do not sort if current sort is equals to the prev sort
    if (sortBy === searchParams.get("sortBy")) return;

    onSort();
  }, [sortBy]);

  const query = searchParams.get("query");

  useEffect(() => {
    if (sortBy === "best_matched" && !query) {
      const defSort = sortByOptions.filter((sortByOption) =>
        sortByOption.value.includes("default")
      )[0];

      setSortBy(searchParams.get("sortBy") || defSort.value);
    }

    if (query && sortBy !== "best_matched") {
      setSortBy("best_matched");
    }
  }, [query, sortBy, setSortBy]);

  return (
    <Select
      open={open}
      value={sortBy}
      onOpenChange={setOpen}
      onValueChange={setSortBy}
      defaultValue={"_id-desc-default"}
    >
      <SelectTrigger
        onClick={() => setOpen(true)}
        aria-label="Sort By Select Button"
        className="min-[480px]:w-32 md:w-48"
        onPointerDown={(e) => e.preventDefault()}
      >
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>

      <SelectContent
        ref={(ref) => {
          if (!ref) return;
          ref.ontouchstart = (e) => e.preventDefault();
        }}
      >
        <SelectGroup>
          <SelectLabel>Sort By</SelectLabel>
          <SelectItem
            value="best_matched"
            onClick={(e) => e.stopPropagation()}
            disabled={!!!searchParams.get("query")}
          >
            Best Matched
          </SelectItem>

          {sortByOptions.map((sortByOption, i) => (
            <SelectItem
              key={i}
              value={sortByOption.value}
              onClick={(e) => e.stopPropagation()}
              disabled={!!searchParams.get("query")}
            >
              {sortByOption.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
