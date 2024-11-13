import React from "react";
import { Blogs } from "./_components/Blogs";

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: { userId: string | null };
}) {
  const { userId } = await searchParams;

  return <Blogs isUserSpecificBlogs={!!userId} />;
}
