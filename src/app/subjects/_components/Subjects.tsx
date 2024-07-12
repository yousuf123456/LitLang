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
import { Heading } from "@/components/Heading";
import { SubjectsList } from "./SubjectsList";

export const Subjects = ({
  university,
}: {
  university: string | undefined;
}) => {
  return (
    <MaxWidthWrapper className="mt-10 md:mt-16 flex flex-col gap-8 px-3 sm:px-8 lg:px-16 ">
      <div className="w-full flex flex-col items-center gap-6">
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

        <Heading
          subHeading={`Browse through our extensive collection of ${
            university || "several universities"
          } subjects.`}
        >
          Subjects
        </Heading>
      </div>

      <SubjectsList />
    </MaxWidthWrapper>
  );
};
