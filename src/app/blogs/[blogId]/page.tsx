import React from "react";

import prisma from "@/app/utils/prismadb";
import { Blog } from "./_components/Blog";
import { clerkClient } from "@clerk/nextjs/server";
import { PaddingTopWrapper } from "@/components/PaddingTopWrapper";

const getBlogAndWriter = async (blogId: string) => {
  const blog = await prisma.blogs.findUnique({ where: { id: blogId } });

  if (!blog) return null;

  const writer = await (await clerkClient()).users.getUser(blog.userId);

  return { blog, writer };
};

export default async function BlogPage({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;
  const blogData = await getBlogAndWriter(blogId);

  if (!blogData || !blogData.writer) return <p>Hello</p>;

  return (
    <PaddingTopWrapper>
      <Blog {...blogData} />
    </PaddingTopWrapper>
  );
}
