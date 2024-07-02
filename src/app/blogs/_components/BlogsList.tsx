"use client";
import { trpc } from "@/app/_trpc/client";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { HiArrowRight } from "react-icons/hi";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { sortSearchParamType } from "@/types";
import { PaginationControls } from "./PaginationControls";

export const BlogsList = () => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const { data, isFetching, error, isError } = trpc.getBlogs.useQuery({
    sortBy: searchParams.get("sortBy") as sortSearchParamType | null,
    paginationToken: searchParams.get("paginationToken"),
    userId: searchParams.get("userId"),
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
      <div className="grid grid-cols-1 sm:grid-cols-2 auto-rows-[360px] gap-5">
        <Skeleton className="h-full w-full rounded-xl" />
        <Skeleton className="h-full w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-0 mt-6">
        {data.blogs.map((blog, i) => (
          <Link
            key={i}
            href={`/blogs/${blog.id}`}
            className="relative p-1.5 sm:p-3 lg:p-5 block"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === i && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-zinc-200 dark:bg-slate-800/[0.8] block  rounded-3xl -z-10"
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
            <div className="w-full h-full rounded-xl bg-zinc-50 hover:bg-white border border-zinc-200 p-1.5 flex flex-col gap-4 group cursor-pointer z-20">
              <div className="w-full bg-white border border-zinc-200 rounded-xl p-1.5">
                <div className="rounded-xl relative w-full h-full overflow-hidden aspect-w-16 aspect-h-8">
                  <Image
                    alt="Blog Cover Image"
                    src={blog.coverImage!}
                    className="object-cover"
                    fill
                  />
                </div>
              </div>

              <div className="p-2 flex flex-col items-end gap-2">
                <p className="text-sm md:text-base text-zinc-700 font-medium line-clamp-2 w-full text-start h-12">
                  {blog.title}
                </p>

                <Badge className="bg-white text-zinc-600 border border-zinc-200 rounded-lg hover:bg-white pr-4">
                  Read Blog{" "}
                  <HiArrowRight className="w-3 h-3  ml-3 group-hover:translate-x-2 transition-transform" />
                </Badge>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <PaginationControls
        nextPaginationToken={data.blogs[data.blogs.length - 1]?.paginationToken}
        prevPaginationToken={data.blogs[0]?.paginationToken}
        totalCount={data.totalCount}
      />
    </div>
  );
};
