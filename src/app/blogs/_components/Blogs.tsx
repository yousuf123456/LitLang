import React from "react";

import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { BlogsList } from "./BlogsList";
import { Search_SortInputs } from "./Search_SortInputs";

import { auth } from "@clerk/nextjs/server";
import { OverlayImageHeader } from "@/components/OverlayImageHeader";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export const Blogs = ({
  isUserSpecificBlogs,
}: {
  isUserSpecificBlogs: boolean;
}) => {
  const { userId } = auth();

  if (isUserSpecificBlogs && !userId) return <p>Unauthorized</p>;

  return (
    <div className="flex flex-col gap-6">
      <OverlayImageHeader
        buttonLabel="Explore Blogs"
        heading={isUserSpecificBlogs ? "My Blogs" : "Our Blogs"}
        overlayImages={{
          desktop: "/desktop_blogs.jpg",
          mobiles: "/mobiles_blogs.jpg",
        }}
        subHeading={
          !isUserSpecificBlogs
            ? "Explore expert opinions in our diverse range of engaging blogs where knowledge meets inspiration!"
            : undefined
        }
      >
        {!isUserSpecificBlogs && (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/blogs"
                  className="sm:text-base text-white/90 hover:text-white/70"
                >
                  Blogs
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator className="text-white/50" />

              <BreadcrumbItem>
                <BreadcrumbPage className="max-w-56 sm:max-w-80 line-clamp-1 sm:text-base text-white/90">
                  My Blogs
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </OverlayImageHeader>

      <div
        id="data-container"
        className="flex flex-col w-full gap-3 mt-5 md:mt-8"
      >
        <div className="sticky z-50 top-[72px] w-full bg-white pt-2 pb-5 backdrop-filter backdrop-blur-sm bg-opacity-70">
          <MaxWidthWrapper className="px-3 sm:px-8 w-full">
            <Search_SortInputs />
          </MaxWidthWrapper>
        </div>

        <MaxWidthWrapper className="px-3 sm:px-8 w-full">
          <BlogsList />
        </MaxWidthWrapper>
      </div>
    </div>
  );
};
