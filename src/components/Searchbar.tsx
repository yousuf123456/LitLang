"use client";

import React from "react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { getSearchParamsArray } from "@/utils/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

interface SearchbarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  query: string;
  pathname: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const Searchbar = ({
  query,
  setQuery,
  pathname,
  ...inputProps
}: SearchbarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSearch = (e?: any) => {
    if (e) e.preventDefault();

    const searchParamsArray = getSearchParamsArray(
      searchParams,
      query ? [`query=${query}`] : [],
      ["query", "paginationToken", "going", "page"]
    );

    router.push(`${pathname}?${searchParamsArray.join("&")}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <form className="w-full" autoComplete="nope">
      <label className=" sr-only" htmlFor="search-input">
        Search
      </label>

      <Input
        type="text"
        value={query}
        id="search-input"
        className="w-full"
        autoComplete="nope"
        onKeyDown={onKeyDown}
        onChange={(e) => setQuery(e.target.value)}
        {...inputProps}
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
  );
};
