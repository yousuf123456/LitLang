import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Image from "next/image";
import React from "react";
import { Search } from "./Search";
import { UserAccount } from "./UserAccount";

export const Navbar = () => {
  return (
    <MaxWidthWrapper className="md:py-6 py-4 lg:px-16 xl:px-20 md:px-8 px-3 border-b border-zinc-300 sticky top-0 left-0 bg-white z-50">
      <div className="flex justify-between items-center w-full gap-3 sm:gap-8">
        <div className="w-full flex items-center gap-3 sm:gap-6 lg:gap-12">
          <div className="flex items-center gap-4">
            <div className="relative w-7 h-7 sm:w-9 sm:h-9">
              <Image
                alt="Company Logo"
                src={"/logo.svg"}
                className="object-cover"
                fill
              />
            </div>

            <p className="text-2xl font-semibold text-primary hidden lg:block">
              LitLang
            </p>
          </div>

          <Search />
        </div>

        <UserAccount />
      </div>
    </MaxWidthWrapper>
  );
};
