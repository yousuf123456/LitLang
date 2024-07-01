import React, { Suspense } from "react";
import prisma from "../utils/prismadb";
import BlogEditorContext from "./_components/BlogEditorContext";

export default async function BlogEditorPage({
  searchParams,
}: {
  searchParams: { draftId?: string };
}) {
  const draft = searchParams.draftId
    ? await prisma.blogs.findUnique({
        where: { id: searchParams.draftId },
      })
    : null;

  return (
    <Suspense fallback={<p>Loading Draft</p>}>
      <BlogEditorContext draft={draft} />
    </Suspense>
  );
}
