"use client";
import React from "react";

import { HamburgerMenu } from "./HamburgerMenu";
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/UserMenu";

export const UserAccount = () => {
  return (
    <>
      <div className="lg:flex items-center gap-3 hidden">
        <SignInButton>
          <Button variant={"secondary"}>Login</Button>
        </SignInButton>
        <SignUpButton>
          <Button>Be a Publisher</Button>
        </SignUpButton>
      </div>

      <div className="lg:hidden">
        <UserMenu />
      </div>
    </>
  );
};
