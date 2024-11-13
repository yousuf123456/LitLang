import React, { Suspense } from "react";
import prisma from "../utils/prismadb";
import BlogEditorContext from "./_components/BlogEditorContext";
import { Skeleton } from "@/components/ui/skeleton";
import { DraftActions } from "./_components/DraftActions";

const Loading = () => {
  return (
    <>
      <DraftActions initialDraft={null} isLoading />
      <div className="md:mt-8 md:px-8 flex flex-col gap-5">
        <Skeleton className="w-full h-64" />
        <div className="flex flex-col gap-16 max-md:px-5">
          <Skeleton className="max-w-96 w-full h-10" />
          <Skeleton className="w-full h-64" />
        </div>
      </div>
    </>
  );
};

export default async function BlogEditorPage({
  searchParams,
}: {
  searchParams: Promise<{ draftId?: string }>;
}) {
  const { draftId } = await searchParams;

  const draft = draftId
    ? await prisma.blogs.findUnique({
        where: { id: draftId },
      })
    : null;

  return (
    <Suspense fallback={<Loading />}>
      <BlogEditorContext draft={draft} />
    </Suspense>
  );
}
