"use client";
import React, { useState } from "react";

import { useSearchParams } from "next/navigation";
import { Searchbar } from "@/components/Searchbar";
import { SortbySelector } from "@/components/SortbySelector";
import { trpc } from "@/app/_trpc/client";
import { useAuth } from "@clerk/nextjs";

export const Search_SortInputs = () => {
  const searchParams = useSearchParams();

  const [sortBy, setSortBy] = useState(
    !!searchParams.get("query")
      ? "best_matched"
      : searchParams.get("sortBy") || "_id-desc-default"
  );

  const { mutateAsync: getAutocompletes } =
    trpc.blogs.getBlogsAutocompletes.useMutation();

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

  const { userId } = useAuth();
  const isMyBlogs = useSearchParams().get("myBlogs") === "true";

  return (
    <div className="flex min-[480px]:flex-row flex-col items-center gap-3 md:gap-6">
      <div className="w-full max-[480px]:order-2 relative">
        <Searchbar
          pathname="/blogs"
          imageTheme={false}
          autocompleteFieldName="title"
          getAutocompletes={getAutocompletes}
          placeholder="Search for blogs here."
          autocompleteProps={{ isMyBlogs, userId }}
        />
      </div>

      <SortbySelector
        sortBy={sortBy}
        pathname="/blogs"
        setSortBy={setSortBy}
        sortByOptions={sortByOptions}
      />
    </div>
  );
};
