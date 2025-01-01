import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const LoadingState = () => {
  return (
    <div
      aria-atomic="true"
      aria-live="polite"
      className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-0 mt-6"
    >
      <div className="relative p-1.5 sm:p-3 lg:p-4 block">
        <Skeleton className="w-full h-full rounded-xl border border-zinc-200 p-1.5 flex flex-col gap-4">
          <div className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-1.5">
            <div className="rounded-xl relative w-full h-full overflow-hidden aspect-w-16 aspect-h-8"></div>
          </div>

          <div className="p-2 flex flex-col items-end gap-2">
            <div className="h-14" />

            <div className="w-full flex items-center">
              <div className="h-4" />
            </div>
          </div>
        </Skeleton>
      </div>

      <div className="relative p-1.5 sm:p-3 lg:p-4 block">
        <Skeleton className="w-full h-full rounded-xl border border-zinc-200 p-1.5 flex flex-col gap-4">
          <div className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-1.5">
            <div className="rounded-xl relative w-full h-full overflow-hidden aspect-w-16 aspect-h-8"></div>
          </div>

          <div className="p-2 flex flex-col items-end gap-2">
            <div className="h-14" />

            <div className="w-full flex items-center">
              <div className="h-5" />
            </div>
          </div>
        </Skeleton>
      </div>
    </div>
  );
};
