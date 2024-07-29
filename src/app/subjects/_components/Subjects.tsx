import React from "react";

import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { SubjectsList } from "./SubjectsList";
import { OverlayImageHeader } from "@/components/OverlayImageHeader";

export const Subjects = ({
  university,
  query,
}: {
  university: string | undefined;
  query: string | undefined;
}) => {
  return (
    <div className="flex flex-col gap-6">
      <OverlayImageHeader
        heading={"Subjects"}
        buttonLabel="Explore Subjects"
        subHeading={`Browse through our extensive collection of ${
          university || "several universities"
        } subjects.`}
        overlayImages={{
          desktop: "/desktop_subjects.jpg",
          mobiles: "/mobiles_subjects.jpg",
        }}
      >
        {university && (
          <Breadcrumb className="w-full">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/blogs" className="sm:text-base">
                  Subjects
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="max-w-56 sm:max-w-80 line-clamp-1 sm:text-base">
                  {university}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </OverlayImageHeader>

      <MaxWidthWrapper
        id="data-container"
        className="mt-10 md:mt-16 px-3 sm:px-8 flex flex-col gap-6"
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
