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
  sortBy,
  isOnlyMyBlogs,
  paginationToken,
}: {
  isOnlyMyBlogs: boolean;
} & PaginationSearchParams) => {
  const { blogs, totalCount } = await getBlogs({
    query,
    going,
    sortBy,
    isOnlyMyBlogs,
    paginationToken,
    page: parseInt(page || "1"),
  });

  return <BlogsList blogs={blogs} totalCount={totalCount} />;
};
