import React, { Suspense } from "react";

import { StandaloneFile } from "./_StandaloneFile";
import { Loader } from "lucide-react";
import { PaddingTopWrapper } from "@/components/PaddingTopWrapper";

export default async function BookFilePage({
  params,
}: {
  params: Promise<{ standaloneId: string }>;
}) {
  const { standaloneId } = await params;
  return (
    <PaddingTopWrapper>
      <div className="max-h-[calc(100dvh-73px)] min-h-[calc(100dvh-73px)] flex">
        <Suspense
          key={`${standaloneId}`}
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
          <StandaloneFile standaloneId={standaloneId} />
        </Suspense>
      </div>
    </PaddingTopWrapper>
  );
}
