"use client";
import React from "react";

import { HamburgerMenu } from "./HamburgerMenu";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/UserMenu";
import { cn } from "@/utils/utils";

export const UserAccount = () => {
  const { user } = useUser();

  return (
    <>
      <SignedOut>
        <div className="lg:flex items-center gap-3 hidden">
          <SignInButton>
            <Button variant={"secondary"}>Login</Button>
          </SignInButton>
          <SignUpButton>
            <Button>Be a Publisher</Button>
          </SignUpButton>
        </div>
      </SignedOut>

      <SignedIn>
        <div
          className={cn(
            "flex items-center justify-start flex-shrink-0",
            !user && "lg:hidden",
            user && "lg:w-32"
          )}
        >
          <UserMenu />
        </div>
      </SignedIn>
    </>
  );
};
