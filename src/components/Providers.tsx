"use client";
import React, { useState } from "react";

import { trpc } from "@/app/_trpc/client";
import { absoluteUrl } from "@/utils/utils";

import { ClerkProvider, useUser } from "@clerk/nextjs";

import { Toaster } from "./ui/sonner";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";

const SessionLoaded = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded } = useUser();

  if (!isLoaded) return <p>Loading Session</p>;

  return <>{children}</>;
};

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
      <SessionLoaded>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <Toaster />
            {children}
          </QueryClientProvider>
        </trpc.Provider>
      </SessionLoaded>
    </ClerkProvider>
  );
};
