"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import { AnimatePresence, motion } from "framer-motion";

import { trpc } from "@/app/_trpc/client";
import { sortSearchParamType } from "@/types";
import { BooksListPerPageSize, SubjectsListPageSize } from "@/pagination";
import { PaginationControls } from "@/components/PaginationControls";
import { createImageUrlFromWebViewLink } from "@/utils/utils";

export const StandaloneFilesList = () => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const type = searchParams.get("type");

  const { data, isFetching, error, isError } =
    trpc.standaloneFiles.get.useQuery({
      sortBy: searchParams.get("sortBy") as sortSearchParamType | null,
      paginationToken: searchParams.get("paginationToken"),
      going: searchParams.get("going"),
      query: searchParams.get("query"),
      page: currentPage,
      type: type as "Book" | "Article",
    });

  useEffect(() => {
    if (isError) console.log(error);
  }, [isError, error]);

  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);

  if (type !== "Book" && type !== "Article")
    return <p>Invalid Resource Type</p>;

  if (isFetching || !data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-0 mt-6">
        <div className="relative p-1.5 sm:p-3 lg:p-4 block">
          <Skeleton className="w-full h-full rounded-xl border border-zinc-200 p-1.5">
            <div className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-1.5">
              <div className="rounded-xl relative w-full h-full overflow-hidden aspect-w-16 aspect-h-8"></div>
            </div>

            <div className="p-2 flex flex-col items-end gap-2">
              <div className="h-14" />
            </div>
          </Skeleton>
        </div>

        <div className="relative p-1.5 sm:p-3 lg:p-4 block">
          <Skeleton className="w-full h-full rounded-xl border border-zinc-200 p-1.5">
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

  if (data.books.length === 0) {
    return (
      <div className="flex w-full flex-col items-center gap-5 mt-12 ">
        <div className="w-[180px] md:w-[250px] aspect-1 h-auto relative">
          <Image alt="No Data Illustration" src={"/noData.svg"} fill />
        </div>

        <h2 className="text-xl md:text-2xl font-medium text-zinc-500 text-center">
          No Books To Show
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-0 mt-6">
        {data.books.map((book, i) => (
          <Link
            key={i}
            href={`/standalones/${book.id}`}
            className="relative p-1.5 sm:p-3 lg:p-4 block"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
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

            <div className="w-full h-full rounded-xl bg-zinc-50 hover:bg-white transition-colors border border-zinc-200 p-1.5 flex flex-col gap-2 group cursor-pointer z-20">
              <div className="w-full bg-white border border-zinc-200 rounded-xl p-1.5">
                <div className="rounded-xl relative w-full h-full overflow-hidden aspect-w-16 aspect-h-8">
                  <Image
                    src={createImageUrlFromWebViewLink(book.imageUrl)}
                    alt="subject Cover Image"
                    className="object-cover"
                    loading="lazy"
                    fill
                  />
                </div>
              </div>

              <div className="w-full p-2">
                <p className="text-base md:text-lg text-zinc-700 font-medium line-clamp-2 w-full text-start h-14">
                  {book.name}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <PaginationControls
        nextPaginationToken={data.books[data.books.length - 1]?.paginationToken}
        prevPaginationToken={data.books[0]?.paginationToken}
        itemsPerPage={BooksListPerPageSize}
        totalCount={data.totalCount}
      />
    </div>
  );
};
