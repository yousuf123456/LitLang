import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-primary mt-24">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-8 h-8 fill-white">
              <Image src={"/logo-dark.svg"} alt="Company Logo" fill />
            </div>

            <p className="text-lg font-semibold text-[#FFECD1]">LitLang</p>
          </div>
          <ul className="max-sm:mt-4 flex flex-wrap items-center text-sm font-medium text-[#FFECD1]">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 sm:mx-auto border-[#FFECD1] lg:my-8" />
        <span className="block text-sm sm:text-center text-[#FFECD1]">
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
