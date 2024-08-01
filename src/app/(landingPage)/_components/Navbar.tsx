"use client";
import React, { Suspense, useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils/utils";
import { UserAccount } from "./UserAccount";
import { usePathname } from "next/navigation";
import { Search_NavMenu } from "./Search_NavMenu";

export const Navbar = ({}: {}) => {
  const pathname = usePathname();

  const defaultImageThemePages = [
    "/",
    "/blogs",
    "/standalones",
    "/subjects",
    "/contact_us",
    "/about_us",
  ];
  const defaultImageTheme = defaultImageThemePages.includes(pathname);

  const [imageTheme, setImageTheme] = useState<boolean>(defaultImageTheme);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const isAnyEntryIntersecting =
        entries.filter((entry) => entry.isIntersecting).length > 0;

      if (isAnyEntryIntersecting) setImageTheme(true);
      else {
        setImageTheme(false);
      }
    };

    const observerOptions = {
      root: null,
      rootMargin: "-73px 0px -100% 0px",
      threshold: [0],
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    const targetElements = document.querySelectorAll(".overlay-image");

    targetElements.forEach((targetElem) => {
      observer.observe(targetElem);
    });

    if (targetElements.length === 0) setImageTheme(false);

    return () => {
      targetElements.forEach((targetElem) => {
        observer.unobserve(targetElem);
      });
    };
  }, [pathname]);

  if (pathname === "/blogEditor") return;

  return (
    <header>
      <div
        className={cn(
          "py-4 xl:px-12 md:px-6 px-3 fixed top-0 left-0 right-0 z-[999] transition-all backdrop-blur-sm backdrop-filter h-[72px]",
          !imageTheme ? "bg-white bg-opacity-70" : "bg-primary/10",
          imageTheme === null && "bg-transparent"
        )}
      >
        <div className="flex justify-between items-center w-full gap-3 sm:gap-8 h-full min-h-[40px] ">
          <Link href={"/"} aria-label="Home">
            <div className="flex items-center gap-4 lg:w-[182.5px]">
              <div className="relative w-8 h-8">
                <Image
                  alt="Company Logo"
                  src={"/logo2.svg"}
                  className="object-cover"
                  fill
                />
              </div>

              <p
                className={cn(
                  "text-2xl font-medium font-brand hidden lg:block text-white transition-colors",
                  imageTheme ? "text-white" : "text-black",
                  imageTheme === null && "opacity-0"
                )}
              >
                LitLang
              </p>
            </div>
          </Link>

          <Suspense>
            <Search_NavMenu imageTheme={imageTheme} />
          </Suspense>

          <UserAccount imageTheme={imageTheme} />
        </div>
      </div>
    </header>
  );
};
