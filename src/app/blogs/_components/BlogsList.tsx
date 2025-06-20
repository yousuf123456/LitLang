"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { HiArrowRight } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";

import { blogType } from "@/types";
import { PaginationControls } from "../../../components/PaginationControls";
import { BlogsListPageSize } from "@/pagination";
import { buttonVariants } from "@/components/ui/button";
import { Edit } from "lucide-react";

export const BlogsList = ({
  blogs,
  totalCount,
}: {
  blogs: blogType[];
  totalCount: number;
}) => {
  const searchParams = useSearchParams();

  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);

  if (blogs.length === 0) {
    return (
      <div
        aria-label="No blogs available"
        className="flex w-full flex-col items-center gap-5 mt-12 "
      >
        <div
          aria-label="No data illustration"
          className="w-[180px] md:w-[250px] aspect-1 h-auto relative"
        >
          <Image alt="No Data Illustration" src={"/noData.svg"} fill />
        </div>

        <h2 className="text-xl md:text-2xl font-medium text-zinc-500 text-center">
          No Blogs To Show
        </h2>
      </div>
    );
  }

  const isMyBlogs = searchParams.get("myBlogs") === "true";

  return (
    <div className="w-full flex flex-col gap-8">
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-0 mt-6">
        {blogs.map((blog, i) => (
          <li key={i} className="relative">
            <Link
              href={`/blogs/${blog.id}`}
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

              <article className="w-full h-full rounded-xl bg-zinc-50 hover:bg-white border border-zinc-200 p-1.5 flex flex-col gap-4 group cursor-pointer z-20">
                <div className="w-full bg-white border border-zinc-200 rounded-xl p-1.5">
                  <div className="rounded-xl relative w-full h-full overflow-hidden aspect-w-16 aspect-h-8 bg-zinc-50">
                    {blog.coverImage ? (
                      <Image
                        fill
                        loading="lazy"
                        src={blog.coverImage}
                        alt="Blog Cover Image"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex justify-center items-center">
                        <p className="text-zinc-600">Cover Image</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-2 flex flex-col items-end gap-2">
                  <p className="text-base md:text-lg text-zinc-700 font-medium line-clamp-2 w-full text-start h-14">
                    {blog.title}
                  </p>

                  <div className="w-full flex items-center">
                    <div className="flex-1 flex justify-end">
                      <Badge className="bg-white text-zinc-600 border border-zinc-200 rounded-lg hover:bg-white pr-4">
                        Read Blog{" "}
                        <HiArrowRight className="w-3 h-3  ml-3 group-hover:translate-x-2 transition-transform" />
                      </Badge>
                    </div>
                  </div>
                </div>
              </article>
            </Link>

            {isMyBlogs && (
              <Link
                href={`/blogEditor?draftId=${blog.id}`}
                className={buttonVariants({
                  size: "sm",
                  variant: "outline",
                  className:
                    "bg-white text-xs absolute lg:bottom-7 lg:left-7 md:bottom-6 md:left-6 bottom-4 left-4",
                })}
              >
                Edit <Edit className="w-[14px] h-[14px] ml-2 text-zinc-600" />
              </Link>
            )}
          </li>
        ))}
      </ul>

      <PaginationControls
        nextPaginationToken={blogs[blogs.length - 1]?.paginationToken}
        prevPaginationToken={blogs[0]?.paginationToken}
        itemsPerPage={BlogsListPageSize}
        totalCount={totalCount}
      />
    </div>
  );
};
