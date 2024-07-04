import React from "react";
import { Blogs } from "./_components/Blogs";

export default function BlogsPage({
  searchParams,
}: {
  searchParams: { userId: string | null };
}) {
  return <Blogs isUserSpecificBlogs={!!searchParams.userId} />;
}
