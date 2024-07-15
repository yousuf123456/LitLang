import React, { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";

import { Loader } from "lucide-react";
import { File } from "./_components/File";
import { FileNavigation } from "./_components/FileNavigation";

export const revalidate = 3600;

export default function FilePage({
  params,
}: {
  params: { subjectId: string; fileId: string };
}) {
  return (
    <div className="md:max-h-[calc(100vh-89px)] max-h-[calc(100vh-73px)] md:min-h-[calc(100vh-89px)] min-h-[calc(100vh-73px)] flex">
      <Suspense
        key={`${params.subjectId} ${params.fileId}`}
        fallback={
          <Skeleton
            aria-busy
            aria-live="polite"
            className="hidden md:flex w-64 lg:w-80 rounded-none "
          />
        }
      >
        <FileNavigation fileId={params.fileId} subjectId={params.subjectId} />
      </Suspense>

      <Suspense
        key={`${params.subjectId} ${params.fileId}`}
        fallback={
          <div
            aria-busy
            aria-live="polite"
            className="flex-1 flex items-center justify-center"
          >
            <p className="sr-only">Loading file...</p>
            <Loader className="text-zinc-700 animate-spin" />
          </div>
        }
      >
        <File fileId={params.fileId} subjectId={params.subjectId} />
      </Suspense>
    </div>
  );
}
