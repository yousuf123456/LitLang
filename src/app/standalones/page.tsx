import React, { Suspense } from "react";
import { StandaloneFiles } from "./_components/StandaloneFiles";
import { StandaloneFileType } from "@prisma/client";
import { PaginationSearchParams } from "@/types";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { OverlayImageHeader } from "@/components/OverlayImageHeader";
import { Search_SortInputs } from "./_components/Search_SortInputs";
import { redirect } from "next/navigation";
import { LoadingState } from "./_components/LoadingState";

export default async function BooksListingPage({
  searchParams,
}: {
  searchParams: Promise<
    { type: StandaloneFileType; bookId?: string } & PaginationSearchParams
  >;
}) {
  const { type, query, page, ...allSearchParams } = await searchParams;

  if (
    type !== "Book" &&
    type !== "Article" &&
    type !== "Text" &&
    type !== "BookReview"
  )
    redirect("/standalones?type=Book");

  const overlayImages = {
    Article: {
      desktop: "/desktop_articles.jpg",
      mobiles: "/mobiles_articles.jpg",
    },
    Book: {
      desktop: "/desktop_books.jpg",
      mobiles: "/mobiles_books.jpg",
    },
    Text: {
      desktop: "/desktop_texts.jpg",
      mobiles: "/mobiles_texts.jpg",
    },
    BookReview: {
      desktop: "/desktop_bookReviews.jpg",
      mobiles: "/mobiles_bookReviews.png",
    },
  };

  const overlayHeadings = {
    BookReview: "Our Book Reviews",
    Article: "Our Articles",
    Book: "Our Books",
    Text: "Our Texts",
  };

  const overlaySubHeadings = {
    Article:
      "Discover a wealth of knowledge, explore our articles to inspire and inform your journey",
    Book: "Discover a wealth of knowledge, explore our books to inspire and inform your journey",
    Text: "Discover a wealth of knowledge, explore our texts to inspire and inform your journey",
    BookReview:
      "Unveiling the Essence of Books: Reader Insights, Messages, and Poet Stories",
  };

  return (
    <div className="flex flex-col gap-6">
      <OverlayImageHeader
        buttonLabel={`Browse ${type === "BookReview" ? "Book Reviews" : type}s`}
        heading={overlayHeadings[type]}
        overlayImages={overlayImages[type]}
        subHeading={overlaySubHeadings[type]}
      />

      <section
        className="flex flex-col w-full gap-3 mt-5 md:mt-8"
        id="data-container"
      >
        <div className="sticky z-50 top-[72px] w-full bg-white py-5 backdrop-blur-sm bg-opacity-[0.75]">
          <MaxWidthWrapper id="data" className="px-3 sm:px-8 w-full">
            <Search_SortInputs />
          </MaxWidthWrapper>
        </div>

        <MaxWidthWrapper id="data" className="px-3 sm:px-8 w-full">
          <Suspense fallback={<LoadingState />} key={`${query} ${page}`}>
            <StandaloneFiles
              type={type}
              query={query}
              page={page}
              {...allSearchParams}
            />
          </Suspense>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
