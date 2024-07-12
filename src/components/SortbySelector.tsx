"use client";
import React, { useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getSearchParamsArray } from "@/utils/utils";
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
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSort = () => {
    const isDefault = sortBy.split("-")[2] === "default";

    const searchParamsArray = getSearchParamsArray(
      searchParams,
      isDefault ? [] : [`sortBy=${sortBy}`],
      ["sortBy"]
    );

    router.push(`${pathname}?${searchParamsArray.join("&")}`);
  };

  useEffect(() => {
    // Do not sort when user searches for blogs
    if (sortBy === "best_matched") return;

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
      value={sortBy}
      onValueChange={setSortBy}
      defaultValue={"_id-desc-default"}
    >
      <SelectTrigger
        className="min-[480px]:w-32 md:w-48"
        aria-label="Sort By Select Button"
      >
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort By</SelectLabel>
          <SelectItem
            value="best_matched"
            disabled={!!!searchParams.get("query")}
          >
            Best Matched
          </SelectItem>

          {sortByOptions.map((sortByOption, i) => (
            <SelectItem
              key={i}
              value={sortByOption.value}
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
