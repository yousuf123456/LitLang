"use client";
import React from "react";

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
import { Skeleton } from "@/components/ui/skeleton";
import { syncUpWithDrive } from "@/actions/syncUpWithDrive";

export const UserAccount = () => {
  const { user, isLoaded } = useUser();

  const syncUp = () => {
    syncUpWithDrive();
  };

  if (!isLoaded)
    return (
      <div className="flex items-center lg:w-32 justify-center flex-shrink-0">
        <Skeleton className="w-9 h-9 rounded-full" />
      </div>
    );

  return (
    <>
      <SignedOut>
        <nav
          className="lg:block hidden"
          aria-label="Desktop User Authentication"
        >
          <ul className="flex items-center gap-3">
            <li>
              <SignInButton>
                <Button variant={"secondary"}>Login</Button>
              </SignInButton>
            </li>
            <li>
              <SignUpButton>
                <Button>Be a Publisher</Button>
              </SignUpButton>
            </li>
          </ul>
        </nav>
      </SignedOut>

      {user ? (
        <div
          className={cn(
            "flex items-center lg:w-32 justify-center flex-shrink-0"
          )}
        >
          <Button className="mr-3" variant={"secondary"} onClick={syncUp}>
            Sync Up
          </Button>
          <UserMenu />
        </div>
      ) : (
        <div
          className={cn(
            "flex items-center lg:hidden justify-start flex-shrink-0"
          )}
        >
          <UserMenu />
        </div>
      )}
    </>
  );
};
