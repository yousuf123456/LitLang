"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import { AnimatePresence, LazyMotion, m } from "framer-motion";

import { trpc } from "@/app/_trpc/client";
import { SubjectCard } from "./SubjectCard";
import { SubjectsListPageSize } from "@/pagination";
import { sortSearchParamType, SubjectType } from "@/types";
import { PaginationControls } from "@/components/PaginationControls";

const loadFeatures = () =>
  import("@/app/utils/features").then((res) => res.default);

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
      <div
        aria-live="polite"
        aria-atomic
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-0 mt-6"
      >
        <div className="relative p-1.5 sm:p-3 lg:p-4 block">
          <Skeleton className="w-full h-full rounded-xl border border-zinc-200 p-1.5">
            <div className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-1.5 flex flex-col gap-4">
              <div className="rounded-xl relative w-full h-full overflow-hidden aspect-w-16 aspect-h-8"></div>
            </div>

            <div className="p-2 flex flex-col items-end gap-2">
              <div className="h-14" />

              <div className="w-full flex items-center">
                <div className="h-7" />
              </div>
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

              <div className="w-full flex items-center">
                <div className="h-7" />
              </div>
            </div>
          </Skeleton>
        </div>
      </div>
    );
  }

  if (data.subjects.length === 0) {
    return (
      <div
        aria-label="No subjects available"
        className="flex w-full flex-col items-center gap-5 mt-12 "
      >
        <div
          aria-label="No data illustration"
          className="w-[180px] md:w-[250px] aspect-1 h-auto relative"
        >
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
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-0 mt-6">
        {data.subjects.map((subject, i) => (
          <li key={i}>
            <Link
              href={`/subjects/${subject.id}`}
              className="relative p-1.5 sm:p-3 lg:p-4 block"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <LazyMotion features={loadFeatures} strict>
                <AnimatePresence>
                  {hoveredIndex === i && (
                    <m.span
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
              </LazyMotion>

              <SubjectCard subject={subject as unknown as SubjectType} />
            </Link>
          </li>
        ))}
      </ul>

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
