"use client";
import React, { useState } from "react";

import { Searchbar } from "@/components/Searchbar";
import { SortbySelector } from "@/components/SortbySelector";
import { useSearchParams } from "next/navigation";
import { trpc } from "@/app/_trpc/client";

export const Search_SortInputs = () => {
  const searchParams = useSearchParams();

  const [sortBy, setSortBy] = useState(
    !!searchParams.get("query")
      ? "best_matched"
      : searchParams.get("sortBy") || "_id-desc-default"
  );

  const { mutateAsync: getAutocompletes } =
    trpc.standaloneFiles.getStandalonesAutocompletes.useMutation();

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

  const type = searchParams.get("type") as "Book" | "Article";

  return (
    <div className="flex min-[480px]:flex-row flex-col items-center gap-3 md:gap-6 ">
      <div className="w-full max-[480px]:order-2 relative">
        <Searchbar
          imageTheme={false}
          pathname="/standalones"
          getAutocompletes={getAutocompletes}
          autocompleteProps={{ type: searchParams.get("type") }}
          placeholder={`Search for ${
            type === "Book" ? "books" : "articles"
          } here.`}
        />
      </div>

      <SortbySelector
        sortBy={sortBy}
        pathname="/standalones"
        setSortBy={setSortBy}
        sortByOptions={sortByOptions}
      />
    </div>
  );
};
