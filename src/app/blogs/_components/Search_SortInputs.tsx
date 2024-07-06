"use client";
import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSearchParamsArray } from "@/utils/utils";
import { sortSearchParamType } from "@/types";

export const Search_SortInputs = () => {
  const searchParams = useSearchParams();

  const [sortBy, setSortBy] = useState(
    searchParams.get("sortBy") || "_id-desc-default"
  );
  const [query, setQuery] = useState(searchParams.get("query") || "");

  const router = useRouter();

  const onSort = () => {
    const isDefault = sortBy.split("-")[2] === "default";

    const searchParamsArray = getSearchParamsArray(
      searchParams,
      isDefault ? [] : [`sortBy=${sortBy}`],
      ["sortBy"]
    );

    router.push(`/blogs?${searchParamsArray.join("&")}`);
  };

  const onSearch = (e?: any) => {
    if (e) e.preventDefault();

    const searchParamsArray = getSearchParamsArray(
      searchParams,
      query ? [`query=${query}`] : [],
      ["query"]
    );
    router.push(`/blogs?${searchParamsArray.join("&")}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSearch();
  };

  useEffect(() => {
    onSort();
  }, [sortBy]);

  return (
    <>
      <div className="w-full max-[480px]:order-2 relative">
        <form className="w-full">
          <label className=" sr-only" htmlFor="search-input">
            Search
          </label>

          <Input
            value={query}
            id="search-input"
            className="w-full"
            onKeyDown={onKeyDown}
            placeholder="Search for blogs here"
            onChange={(e) => setQuery(e.target.value)}
          />

          <Button
            size={"icon"}
            type="submit"
            variant={"ghost"}
            onClick={onSearch}
            className="absolute top-1/2 -translate-y-1/2 right-4 p-2"
          >
            <span className="sr-only">Submit search</span>
            <Search className="w-5 h-5 text-zinc-400" />
          </Button>
        </form>
      </div>

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
            <SelectItem value="_id-desc-default">Newly Published</SelectItem>
            <SelectItem value="_id-asc">Old Published</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};
