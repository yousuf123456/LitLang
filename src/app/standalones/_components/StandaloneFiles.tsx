import React from "react";

import { StandaloneFilesList } from "./StandaloneFilesList";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { OverlayImageHeader } from "@/components/OverlayImageHeader";
import { Search_SortInputs } from "./Search_SortInputs";

export const StandaloneFiles = ({ type }: { type: string }) => {
  return (
    <div className="flex flex-col gap-6">
      <OverlayImageHeader
        heading={type === "Book" ? "Our Books" : "Our Articles"}
        subHeading={`Browse through our extensive collection of ${
          type === "Book" ? "books" : "articles"
        }`}
        overlayImages={{
          desktop:
            type === "Book" ? "/desktop_books.jpg" : "/desktop_articles.jpg",
          mobiles:
            type === "Book" ? "/mobiles_books.jpg" : "/mobiles_articles.jpg",
        }}
      />

      <div
        className="flex flex-col w-full gap-3 mt-5 md:mt-8"
        id="data-container"
      >
        <div className="sticky z-50 top-[72px] w-full bg-white py-5 backdrop-blur-sm bg-opacity-70">
          <MaxWidthWrapper id="data" className="px-3 sm:px-8 w-full">
            <Search_SortInputs />
          </MaxWidthWrapper>
        </div>

        <MaxWidthWrapper id="data" className="px-3 sm:px-8 w-full">
          <StandaloneFilesList />
        </MaxWidthWrapper>
      </div>
    </div>
  );
};
