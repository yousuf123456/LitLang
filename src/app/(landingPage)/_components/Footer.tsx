"use client";
import React from "react";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/utils";

export const Footer = () => {
  const pathname = usePathname();

  return (
    <footer
      className={cn(
        "bg-brown-800",
        !/^\/subjects\/[^\/]+\/[^\/]+$/.test(pathname) &&
          !/^\/standalones\/[\w\d]+$/.test(pathname) &&
          pathname !== "/contact_us" &&
          "mt-28 md:mt-32"
      )}
    >
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="/" aria-label="Home" className="flex items-center gap-4">
            <div className="relative w-8 h-8 fill-white">
              <Image src={"/logo2.svg"} alt="Company Logo" fill />
            </div>

            <p className="text-lg font-medium text-themeSecondary font-brand">
              LitLang
            </p>
          </Link>

          <nav aria-label="Secondary Navigation">
            <ul className="max-sm:mt-4 flex flex-wrap items-center text-sm font-medium text-themeSecondary">
              <li>
                <Link
                  href={"/about_us"}
                  className="hover:underline me-4 md:me-6"
                >
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </Link>
              </li>
              <li>
                <Link href="/contact_us" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <hr className="my-6 sm:mx-auto border-themeSecondary/50 lg:my-8" />

        <span className="block text-sm sm:text-center text-themeSecondary">
          © 2024{" "}
          <Link href="https://LitLang.com/" className="hover:underline">
            LitLang
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};
