"use client";
import React, { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import { Searchbar } from "@/components/Searchbar";
import { SortbySelector } from "@/components/SortbySelector";

export const Search_SortInputs = () => {
  const searchParams = useSearchParams();

  const [sortBy, setSortBy] = useState(
    !!searchParams.get("query")
      ? "best_matched"
      : searchParams.get("sortBy") || "_id-desc-default"
  );

  const [query, setQuery] = useState(searchParams.get("query") || "");

  const sortByOptions = [
    {
      label: "Newly Published",
      value: "_id-desc-default",
    },
    {
      label: "Old Published",
      value: "_id-asc",
    },
  ];

  return (
    <>
      <div className="w-full max-[480px]:order-2 relative">
        <Searchbar
          query={query}
          pathname="/blogs"
          setQuery={setQuery}
          placeholder="Search for blogs here."
        />
      </div>

      <SortbySelector
        sortBy={sortBy}
        pathname="/blogs"
        setSortBy={setSortBy}
        sortByOptions={sortByOptions}
      />
    </>
  );
};
