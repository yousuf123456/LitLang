"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatePresence, motion } from "framer-motion";

import { trpc } from "@/app/_trpc/client";
import { sortSearchParamType } from "@/types";
import { SubjectsListPageSize } from "@/pagination";
import { PaginationControls } from "@/components/PaginationControls";
import { createImageUrlFromWebViewLink } from "@/utils/utils";

export const SubjectsList = () => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const { data, isFetching, error, isError } = trpc.subjects.get.useQuery({
    sortBy: searchParams.get("sortBy") as sortSearchParamType | null,
    paginationToken: searchParams.get("paginationToken"),
    university: searchParams.get("university"),
    going: searchParams.get("going"),
    query: searchParams.get("query"),
    page: currentPage,
  });

  useEffect(() => {
    if (isError) console.log(error);
  }, [isError, error]);

  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);

  if (isFetching || !data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
        <Skeleton className="w-full aspect-w-16 aspect-h-11 rounded-xl" />
        <Skeleton className="w-full aspect-w-16 aspect-h-11 rounded-xl" />
      </div>
    );
  }

  if (data.subjects.length === 0) {
    return (
      <div className="flex w-full flex-col items-center gap-5 mt-12 ">
        <div className="w-[180px] md:w-[250px] aspect-1 h-auto relative">
          <Image alt="No Data Illustration" src={"/noData.svg"} fill />
        </div>

        <h2 className="text-xl md:text-2xl font-medium text-zinc-500 text-center">
          No Subjects To Show
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-0 mt-6">
        {data.subjects.map((subject, i) => (
          <Link
            key={i}
            href={`/subjects/${subject.id}`}
            className="relative p-1.5 sm:p-3 lg:p-5 block"
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
                    src={createImageUrlFromWebViewLink(subject.imageUrl)}
                    alt="subject Cover Image"
                    className="object-cover"
                    fill
                  />
                </div>
              </div>

              <div className="p-2 flex flex-col items-end gap-2">
                <p className="text-base md:text-lg text-zinc-700 font-medium line-clamp-2 w-full text-start h-12">
                  {subject.name}
                </p>

                <div className="flex items-center gap-3">
                  <Badge className="bg-white text-sm font-medium text-zinc-600 border border-zinc-200 rounded-lg hover:bg-white">
                    {subject.universityShort}
                  </Badge>
                  <Badge className="bg-white text-sm text-zinc-600 font-medium border border-zinc-200 rounded-lg hover:bg-white">
                    Semester {subject.semester}
                  </Badge>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <PaginationControls
        nextPaginationToken={
          data.subjects[data.subjects.length - 1]?.paginationToken
        }
        prevPaginationToken={data.subjects[0]?.paginationToken}
        itemsPerPage={SubjectsListPageSize}
        totalCount={data.totalCount}
      />
    </div>
  );
};