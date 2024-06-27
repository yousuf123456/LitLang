"use client";
import {
  ClerkLoaded,
  ClerkLoading,
  ClerkProvider,
  useUser,
} from "@clerk/nextjs";
import React from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <ClerkLoading>
        <p>Loading Session</p>
      </ClerkLoading>
      <ClerkLoaded>{children}</ClerkLoaded>
    </ClerkProvider>
  );
};
