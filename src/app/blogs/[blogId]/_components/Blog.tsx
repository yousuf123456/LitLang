import React from "react";

import Image from "next/image";
import { format } from "date-fns";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { User } from "@clerk/nextjs/server";
import { blogs } from "@prisma/client";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { EditorRoot } from "novel";
import { BlogContent } from "./BlogContent";

export const Blog = ({ blog, writer }: { blog: blogs; writer: User }) => {
  const date = new Date("April 2024 19:47:00");
  const formattedDate = format(date, "EEE MMM yyyy 'at' hh:mm a");

  return (
    <MaxWidthWrapper className="mt-12 sm:mt-20 px-4 sm:px-8 lg:px-16 pb-12">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/blogs" className="sm:text-base">
              Blogs
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="max-w-56 sm:max-w-80 line-clamp-1 sm:text-base">
              {blog.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <article className="flex flex-col gap-10 mt-10">
        <div className="flex flex-col gap-4">
          <header className="flex flex-col gap-4">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
              {blog.title}
            </h1>

            <div className="flex justify-between items-center">
              <div className="flex gap-4 items-start">
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden">
                  <Image
                    fill
                    alt="Writer Picture"
                    src={writer.imageUrl}
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col">
                  <p className="text-sm sm:text-base font-medium text-gray-800 leading-5">
                    {writer.firstName}
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-500">Publisher</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600">
                {formattedDate}
              </p>
            </div>
          </header>

          <figure className="w-full aspect-w-16 aspect-h-8 relative mt-4 bg-zinc-100">
            {blog.coverImage ? (
              <Image
                fill
                src={blog.coverImage}
                alt="Blog Cover Image"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <p className="text-zinc-600 text-lg">Cover Image</p>
              </div>
            )}
          </figure>
        </div>

        <section className="mt-10">
          <BlogContent content={blog.content!} />
        </section>
      </article>
    </MaxWidthWrapper>
  );
};
