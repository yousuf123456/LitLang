"use client";
import React, { useState } from "react";

import { trpc } from "@/app/_trpc/client";
import { absoluteUrl } from "@/utils/utils";

import { ClerkProvider, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";

import { Toaster } from "./ui/sonner";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient({}));

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: absoluteUrl("/api/trpc"),
        }),
      ],
    })
  );

  return (
    <ClerkProvider>
      <ClerkLoading>
        <p>Loading Session</p>
      </ClerkLoading>
      <ClerkLoaded>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <Toaster />
            {children}
          </QueryClientProvider>
        </trpc.Provider>
      </ClerkLoaded>
    </ClerkProvider>
  );
};
