"use client";

import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Image from "next/image";
import React from "react";
import { Search } from "./Search";
import { UserAccount } from "./UserAccount";
import { usePathname } from "next/navigation";
import { Search_NavMenu } from "./Search_NavMenu";
import Link from "next/link";

export const Navbar = () => {
  const pathname = usePathname();

  if (pathname === "/blogEditor") return;

  return (
    <header className="border-b border-zinc-200">
      <MaxWidthWrapper className="md:py-6 py-4 xl:px-0 md:px-6 px-3 sticky top-0 left-0 bg-white z-50 h-full">
        <div className="flex justify-between items-center w-full gap-3 sm:gap-8 h-full min-h-[40px]">
          <Link href={"/"} aria-label="Home">
            <div className="flex items-center gap-4">
              <div className="relative w-8 h-8 sm:w-9 sm:h-9">
                <Image
                  alt="Company Logo"
                  src={"/logo2.svg"}
                  className="object-cover"
                  fill
                />
              </div>

              <p className="text-2xl font-semibold font-brand hidden lg:block font-">
                LitLang
              </p>
            </div>
          </Link>

          <Search_NavMenu />

          <UserAccount />
        </div>
      </MaxWidthWrapper>
    </header>
  );
};
