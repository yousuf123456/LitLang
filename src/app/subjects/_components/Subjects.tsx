import React from "react";

import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";

// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";

import { SubjectsList } from "./SubjectsList";
import { OverlayImageHeader } from "@/components/OverlayImageHeader";
// import Link from "next/link";

export const Subjects = ({ query }: { query: string | undefined }) => {
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
      >
        {/* {university && (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className="sm:text-base text-white/90 hover:text-white/70">
                  <Link href={"/subjects"}>Subjects</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator className="text-white/50" />

              <BreadcrumbItem>
                <BreadcrumbPage className="max-w-56 sm:max-w-80 line-clamp-1 sm:text-base text-white/90">
                  {university}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )} */}
      </OverlayImageHeader>

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

        <SubjectsList />
      </MaxWidthWrapper>
    </div>
  );
};
