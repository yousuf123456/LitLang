import React from "react";

import prisma from "@/app/utils/prismadb";
import { Blog } from "./_components/Blog";
import { redirect } from "next/navigation";
import { clerkClient } from "@clerk/nextjs/server";
import { PaddingTopWrapper } from "@/components/PaddingTopWrapper";

const getBlogAndWriter = async (blogId: string) => {
  const blog = await prisma.blogs.findUnique({ where: { id: blogId } });

  if (!blog) return null;

  const writer = await clerkClient.users.getUser(blog.userId);

  return { blog, writer };
};

export default async function BlogPage({
  params,
}: {
  params: { blogId: string };
}) {
  const blogData = await getBlogAndWriter(params.blogId);

  if (!blogData || !blogData.writer) return <p>Hello</p>;

  return (
    <PaddingTopWrapper>
      <Blog {...blogData} />
    </PaddingTopWrapper>
  );
}
