"use client";
import React, { useState } from "react";

import Image from "next/image";

import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden ">
      <Button variant={"ghost"} size={"icon"} onClick={() => setOpen(true)}>
        <Menu className="w-6 h-6 text-primary" />
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="w-full flex justify-center">
              <div className="flex items-center gap-4">
                <div className="relative w-8 h-8 fill-white">
                  <Image src={"/logo.svg"} alt="Company Logo" fill />
                </div>

                <p className="text-xl font-semibold text-primary">LitLang</p>
              </div>
            </SheetTitle>
          </SheetHeader>

          <div className="h-full flex flex-col justify-end gap-4 pb-12">
            <Link
              href="/sign-in"
              className={buttonVariants({ variant: "secondary" })}
            >
              Sign In
            </Link>
            <Link href="/sign-up" className={buttonVariants()}>
              Become a Publisher
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
