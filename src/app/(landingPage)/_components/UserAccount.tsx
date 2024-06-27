"use client";
import React from "react";

import { HamburgerMenu } from "./HamburgerMenu";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Gem } from "lucide-react";
import { UserMenu } from "@/components/UserMenu";

export const UserAccount = () => {
  const { user, isLoaded } = useUser();

  return (
    <>
      {!user ? (
        <>
          <div className="md:flex items-center gap-3 hidden">
            <SignInButton>
              <Button variant={"secondary"}>Login</Button>
            </SignInButton>
            <SignUpButton>
              <Button>Become a Publisher</Button>
            </SignUpButton>
          </div>

          <HamburgerMenu />
        </>
      ) : (
        <>
          <UserMenu />
        </>
      )}
    </>
  );
};
