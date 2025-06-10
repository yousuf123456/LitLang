"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/clerk-react";

export const Subscribe = ({ btnClassName }: { btnClassName: string }) => {
  const { isLoaded } = useUser();

  return (
    <>
      <SignedIn>
        <Button size={"lg"} disabled={!isLoaded} className={btnClassName}>
          Subsribe
        </Button>
      </SignedIn>
      <SignedOut>
        <SignUpButton>
          <Button size={"lg"} className={btnClassName} disabled={!isLoaded}>
            Subscribe
          </Button>
        </SignUpButton>
      </SignedOut>
    </>
  );
};
