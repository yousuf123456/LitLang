"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import { AnimatePresence, motion } from "framer-motion";

import { trpc } from "@/app/_trpc/client";
import { sortSearchParamType } from "@/types";
import { StandalonesListPerPageSize, SubjectsListPageSize } from "@/pagination";
import { PaginationControls } from "@/components/PaginationControls";
import { createImageUrlFromWebViewLink } from "@/utils/utils";
import { StandaloneFileType } from "@prisma/client";
import { buttonVariants } from "@/components/ui/button";

export const StandaloneFilesList = () => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const bookId = searchParams.get("bookId");
  const type = searchParams.get("type");

  const { data, isFetching, error, isError } =
    trpc.standaloneFiles.get.useQuery({
      sortBy: searchParams.get("sortBy") as sortSearchParamType | null,
      paginationToken: searchParams.get("paginationToken"),
      type: type as StandaloneFileType,
      going: searchParams.get("going"),
      query: searchParams.get("query"),
      page: currentPage,
      bookId,
    });

  useEffect(() => {
    if (isError) console.log(error);
  }, [isError, error]);

  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);

  if (isFetching || !data) {
    return (
      <div
        aria-live="polite"
        aria-atomic="true"
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-0 mt-6"
      >
        <div className="relative p-1.5 sm:p-3 lg:p-4 block">
          <Skeleton className="w-full h-full rounded-xl border border-zinc-200 p-1.5 flex flex-col gap-4">
            <div className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-1.5">
              <div className="rounded-xl relative w-full h-full overflow-hidden aspect-w-16 aspect-h-8"></div>
            </div>

            <div className="p-2 flex flex-col items-end gap-2">
              <div className="h-14" />
            </div>
          </Skeleton>
        </div>

        <div className="relative p-1.5 sm:p-3 lg:p-4 block">
          <Skeleton className="w-full h-full rounded-xl border border-zinc-200 p-1.5 flex flex-col gap-4">
            <div className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-1.5">
              <div className="rounded-xl relative w-full h-full overflow-hidden aspect-w-16 aspect-h-8"></div>
            </div>

            <div className="p-2 flex flex-col items-end gap-2">
              <div className="h-14" />
            </div>
          </Skeleton>
        </div>
      </div>
    );
  }

  if (data.standaloneFiles.length === 0) {
    return (
      <div
        aria-label={`No ${
          type === "BookReview" ? "Book Reviews" : type + "s"
        } available`}
        className="flex w-full flex-col items-center gap-5 mt-12 "
      >
        <div
          aria-label="Illustration for no data"
          className="w-[180px] md:w-[250px] aspect-1 h-auto relative"
        >
          <Image alt="No Data Illustration" src={"/noData.svg"} fill />
        </div>

        <h2 className="text-xl md:text-2xl font-medium text-zinc-500 text-center">
          No {type === "BookReview" ? "Book Reviews" : type + "s"} To Show
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-0 mt-6">
        {data.standaloneFiles.map((standalone, i) => (
          <li>
            <Link
              key={i}
              href={`/standalones/${standalone.id}`}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative p-1.5 sm:p-3 lg:p-4 block"
            >
              <AnimatePresence>
                {hoveredIndex === i && (
                  <motion.span
                    className="absolute inset-0 h-full w-full bg-zinc-100 dark:bg-slate-800/[0.8] block  rounded-3xl -z-10"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.15 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15, delay: 0.2 },
                    }}
                  />
                )}
              </AnimatePresence>

              <article className="w-full h-full rounded-xl bg-zinc-50 hover:bg-white transition-colors border border-zinc-200 p-1.5 flex flex-col gap-2 group cursor-pointer z-20">
                <div className="w-full bg-white border border-zinc-200 rounded-xl p-1.5">
                  <div className="rounded-xl relative w-full h-full overflow-hidden aspect-w-16 aspect-h-8 bg-zinc-50">
                    <Image
                      fill
                      loading="lazy"
                      className="object-cover"
                      alt="subject Cover Image"
                      src={createImageUrlFromWebViewLink(standalone.imageUrl)}
                    />
                  </div>
                </div>

                <div className="w-full p-2 flex flex-col gap-4">
                  <p className="text-base md:text-lg text-zinc-700 font-medium line-clamp-2 w-full text-start h-14">
                    {standalone.name}
                  </p>

                  {standalone.bookReviewIds?.length > 0 && (
                    <Link
                      href={`/standalones?type=BookReview&bookId=${standalone.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.nativeEvent.stopImmediatePropagation();
                      }}
                      onMouseLeave={() => setHoveredIndex(i)}
                      onMouseEnter={() => setHoveredIndex(null)}
                      className={buttonVariants({
                        size: "sm",
                        variant: "outline",
                        className: "w-full bg-white text-zinc-700",
                      })}
                    >
                      Read Reviews
                    </Link>
                  )}
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>

      <PaginationControls
        nextPaginationToken={
          data.standaloneFiles[data.standaloneFiles.length - 1]?.paginationToken
        }
        prevPaginationToken={data.standaloneFiles[0]?.paginationToken}
        itemsPerPage={StandalonesListPerPageSize}
        totalCount={data.totalCount}
      />
    </div>
  );
};
