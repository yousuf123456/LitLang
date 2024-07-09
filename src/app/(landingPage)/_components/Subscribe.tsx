"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { trpc } from "@/app/_trpc/client";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/clerk-react";

export const Subscribe = ({ btnClassName }: { btnClassName: string }) => {
  const { mutateAsync: createSubscription } =
    trpc.createSubscription.useMutation();

  const { isLoaded } = useUser();

  const onSubscribe = () => {
    createSubscription();
  };

  return (
    <>
      <SignedIn>
        <Button
          disabled={!isLoaded}
          onClick={onSubscribe}
          className={btnClassName}
        >
          Subsribe
        </Button>
      </SignedIn>
      <SignedOut>
        <SignUpButton>
          <Button className={btnClassName} disabled={!isLoaded}>
            Subscribe
          </Button>
        </SignUpButton>
      </SignedOut>
    </>
  );
};
