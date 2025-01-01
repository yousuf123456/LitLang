import React, { Suspense } from "react";
import { Blogs } from "./_components/Blogs";
import { PaginationSearchParams } from "@/types";
import { LoadingState } from "./_components/LoadingState";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Search_SortInputs } from "./_components/Search_SortInputs";
import { OverlayImageHeader } from "@/components/OverlayImageHeader";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ userId?: string } & PaginationSearchParams>;
}) {
  const { userId, page, query, ...allSearchParams } = await searchParams;
  const isUserSpecificBlogs = !!userId;

  return (
    <div className="flex flex-col gap-6">
      <OverlayImageHeader
        buttonLabel={isUserSpecificBlogs ? "See My Blogs" : "Explore Blogs"}
        heading={isUserSpecificBlogs ? "My Blogs" : "Our Blogs"}
        overlayImages={{
          desktop: "/desktop_blogs.jpg",
          mobiles: "/mobiles_blogs.jpg",
        }}
        subHeading={
          !isUserSpecificBlogs
            ? "Explore expert opinions in our diverse range of engaging blogs where knowledge meets inspiration!"
            : "View or Edit all of your published / unpublished blogs."
        }
      >
        {isUserSpecificBlogs && (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  asChild
                  className="sm:text-base text-white/90 hover:text-white/70"
                >
                  <Link href={"/blogs"}>Blogs</Link>
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

      <section
        id="data-container"
        className="flex flex-col w-full gap-3 mt-5 md:mt-8"
      >
        <div className="sticky z-50 top-[72px] w-full bg-white pt-2 pb-5 backdrop-filter backdrop-blur-sm bg-opacity-[0.75]">
          <MaxWidthWrapper className="px-3 sm:px-8 w-full">
            <Search_SortInputs />
          </MaxWidthWrapper>
        </div>

        <MaxWidthWrapper className="px-3 sm:px-8 w-full">
          <Suspense fallback={<LoadingState />} key={`${query} ${page}`}>
            <Blogs
              isUserSpecificBlogs={!!userId}
              page={page}
              query={query}
              {...allSearchParams}
            />
          </Suspense>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
