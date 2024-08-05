"use client";
import React from "react";

import { SignInButton, SignUpButton, SignedOut, useUser } from "@clerk/nextjs";

import { cn } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/UserMenu";
import { Skeleton } from "@/components/ui/skeleton";
import { syncUpWithS3 } from "@/actions/syncUpWithS3";

export const UserAccount = ({ imageTheme }: { imageTheme: boolean | null }) => {
  const { user, isLoaded } = useUser();

  const syncUp = () => {
    syncUpWithS3();
  };

  if (!isLoaded)
    return (
      <div className="flex items-center lg:w-[182px] justify-center flex-shrink-0">
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
                <Button
                  variant={"secondary"}
                  className={cn(imageTheme && "bg-white hover:bg-white/90")}
                >
                  Login
                </Button>
              </SignInButton>
            </li>
            {/* <Button variant={"secondary"} className="mr-4" onClick={syncUp}>
              Sync Up
            </Button> */}
            <li>
              <SignUpButton>
                <Button>Get Started</Button>
              </SignUpButton>
            </li>
          </ul>
        </nav>
      </SignedOut>

      {user ? (
        <div
          className={cn(
            "flex items-center lg:w-[182px] justify-center flex-shrink-0"
          )}
        >
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
