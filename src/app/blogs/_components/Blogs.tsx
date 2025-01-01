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
import Link from "next/link";
import { PaginationSearchParams } from "@/types";
import { getBlogs } from "../serverFn/getBlogs";

export const Blogs = async ({
  page,
  going,
  query,
  userId,
  sortBy,
  paginationToken,
  isUserSpecificBlogs,
}: {
  userId?: string;
  isUserSpecificBlogs: boolean;
} & PaginationSearchParams) => {
  const { userId: authUserId } = await auth();

  if (isUserSpecificBlogs && !authUserId) return <p>Unauthorized</p>;

  const { blogs, totalCount } = await getBlogs({
    query,
    going,
    sortBy,
    userId,
    paginationToken,
    page: parseInt(page || "1"),
  });

  return <BlogsList blogs={blogs} totalCount={totalCount} />;
};
