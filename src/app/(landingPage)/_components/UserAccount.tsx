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
