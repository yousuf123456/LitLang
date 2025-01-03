"use client";
import React, { useEffect, useState } from "react";

import { trpc } from "@/app/_trpc/client";
import { absoluteUrl } from "@/utils/utils";

import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "./ui/sonner";

import { httpBatchLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { refetchOnWindowFocus: false } },
      })
  );

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
    <ClerkProvider
      dynamic={false}
      appearance={{ variables: { colorPrimary: "#934E29" } }}
    >
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          {children}
        </QueryClientProvider>
      </trpc.Provider>
    </ClerkProvider>
  );
};
