import React, { Suspense } from "react";
import { Subjects } from "./_components/Subjects";
import { PaginationSearchParams } from "@/types";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { OverlayImageHeader } from "@/components/OverlayImageHeader";
import { LoadingState } from "./_components/LoadingState";

export default async function SubjectsListPage({
  searchParams,
}: {
  searchParams: PaginationSearchParams;
}) {
  const { query, page, ...remSearchParams } = await searchParams;

  return (
    <div className="flex flex-col gap-6">
      <OverlayImageHeader
        heading={"Subjects"}
        buttonLabel="Explore Subjects"
        subHeading={`Browse through our extensive collection of subjects.`}
        overlayImages={{
          desktop: "/desktop_subjects.jpg",
          mobiles: "/mobiles_subjects.jpg",
        }}
      />

      <MaxWidthWrapper
        as="section"
        id="data-container"
        className="mt-10 md:mt-16 px-3 sm:px-8"
      >
        {query && (
          <p className="font-medium text-zinc-600">
            Showing results for {query}....
          </p>
        )}

        <Suspense fallback={<LoadingState />} key={`${query} ${page}`}>
          <Subjects query={query} page={page} {...remSearchParams} />
        </Suspense>
      </MaxWidthWrapper>
    </div>
  );
}
