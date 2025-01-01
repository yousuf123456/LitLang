"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { AnimatePresence, LazyMotion, m } from "framer-motion";

import { SubjectCard } from "./SubjectCard";
import { SubjectsListPageSize } from "@/pagination";
import { SubjectType } from "@/types";
import { PaginationControls } from "@/components/PaginationControls";

const loadFeatures = () =>
  import("@/app/utils/features").then((res) => res.default);

export const SubjectsList = ({
  subjects,
  totalCount,
}: {
  subjects: SubjectType[];
  totalCount: number;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);

  if (subjects.length === 0) {
    return (
      <div
        aria-label="No subjects available"
        className="flex w-full flex-col items-center gap-5 mt-12 "
      >
        <div
          aria-label="No data illustration"
          className="w-[180px] md:w-[250px] aspect-1 h-auto relative"
        >
          <Image alt="No Data Illustration" src={"/nosvg"} fill />
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
        {subjects.map((subject, i) => (
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
        nextPaginationToken={subjects[subjects.length - 1]?.paginationToken}
        prevPaginationToken={subjects[0]?.paginationToken}
        itemsPerPage={SubjectsListPageSize}
        totalCount={totalCount}
      />
    </div>
  );
};
