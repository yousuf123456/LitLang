import React, { Suspense } from "react";

import { StandaloneFile } from "./_StandaloneFile";
import { Loader } from "lucide-react";
import { PaddingTopWrapper } from "@/components/PaddingTopWrapper";

export default function BookFilePage({
  params,
}: {
  params: { standaloneId: string };
}) {
  return (
    <PaddingTopWrapper>
      <div className="max-h-[calc(100vh-73px)] min-h-[calc(100vh-73px)] flex">
        <Suspense
          key={`${params.standaloneId}`}
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
          <StandaloneFile standaloneId={params.standaloneId} />
        </Suspense>
      </div>
    </PaddingTopWrapper>
  );
}
