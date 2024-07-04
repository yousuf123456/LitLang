import React from "react";
import prisma from "@/app/utils/prismadb";
import { clerkClient } from "@clerk/nextjs/server";
import { Blog } from "./_components/Blog";
import { Footer } from "@/app/(landingPage)/_components/Footer";

const getBlogAndWriter = async (blogId: string) => {
  const blog = await prisma.blogs.findUnique({ where: { id: blogId } });

  if (!blog) return;

  const writer = await clerkClient.users.getUser(blog.userId);

  return { blog, writer };
};

export default async function BlogPage({
  params,
}: {
  params: { blogId: string };
}) {
  const blogData = await getBlogAndWriter(params.blogId);

  if (!blogData) return <p>Invalid Blog Id</p>;

  return <Blog {...blogData} />;
}
