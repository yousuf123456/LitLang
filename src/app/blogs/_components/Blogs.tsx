import React from "react";

import { Heading } from "@/components/Heading";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { BlogsList } from "./BlogsList";
import { Search_SortInputs } from "./Search_SortInputs";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { auth } from "@clerk/nextjs/server";

export const Blogs = ({
  isUserSpecificBlogs,
}: {
  isUserSpecificBlogs: boolean;
}) => {
  const { userId } = auth();

  if (isUserSpecificBlogs && !userId) return <p>Unauthorized</p>;

  return (
    <MaxWidthWrapper className="mt-10 md:mt-16 flex flex-col gap-8 px-3 sm:px-8 lg:px-16">
      <div className="w-full flex flex-col items-center gap-6">
        {isUserSpecificBlogs && (
          <Breadcrumb className="w-full">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/blogs" className="sm:text-base">
                  Blogs
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="max-w-56 sm:max-w-80 line-clamp-1 sm:text-base">
                  My Blogs
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )}

        <Heading
          subHeading={
            !isUserSpecificBlogs
              ? "Explore expert opinions in our diverse range of engaging blogs where knowledge meets inspiration!"
              : undefined
          }
        >
          {isUserSpecificBlogs ? "My Blogs" : "Our Blogs"}
        </Heading>
      </div>

      <div className="flex min-[480px]:flex-row flex-col items-center gap-3 md:gap-6">
        <Search_SortInputs />
      </div>

      <BlogsList />
    </MaxWidthWrapper>
  );
};
