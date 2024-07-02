import React from "react";
import { Blogs } from "./_components/Blogs";

export default function BlogsPage({
  searchParams,
}: {
  searchParams: { userId: string | null };
}) {
  return (
    <div className="w-full">
      <Blogs isUserSpecificBlogs={!!searchParams.userId} />
    </div>
  );
}
