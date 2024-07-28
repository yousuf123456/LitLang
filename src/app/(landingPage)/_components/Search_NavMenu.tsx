"use client";
import React, { useEffect, useState } from "react";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { AnimatePresence, LazyMotion, m } from "framer-motion";

const loadFeatures = () =>
  import("@/app/utils/features").then((res) => res.default);

import Link from "next/link";
import { cn, getSearchParamsArray } from "@/utils/utils";
import { Search } from "lucide-react";
import { Searchbar } from "@/components/Searchbar";

import { useDebounce } from "use-debounce";
import { trpc } from "@/app/_trpc/client";
import { SubjectType } from "@/types";
import { Badge } from "@/components/ui/badge";
import { useRouter, useSearchParams } from "next/navigation";

export const Search_NavMenu = ({
  imageTheme,
}: {
  imageTheme: boolean | null;
}) => {
  // const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // const [debouncedQueryValue] = useDebounce(query, 500);

  // const [autocompletes, setAutocompletes] = useState<
  //   Omit<SubjectType, "createdAt" | "updatedAt" | "resources" | "university">[]
  // >([]);

  const { mutateAsync: getAutocompletes } =
    trpc.subjects.getSubjectsAutocompletes.useMutation();

  // useEffect(() => {
  //   getAutocompletes({ query: debouncedQueryValue }).then((res) =>
  //     setAutocompletes(res)
  //   );
  // }, [debouncedQueryValue]);

  // const router = useRouter();
  // const searchParams = useSearchParams();

  // const onSearch = (autocomplete: string) => {
  //   const searchParamsArray = getSearchParamsArray(
  //     searchParams,
  //     query ? [`query=${autocomplete}`] : [],
  //     ["query", "paginationToken", "going", "page"]
  //   );

  //   router.push(`/subjects?${searchParamsArray.join("&")}`);
  // };

  return (
    <AnimatePresence mode="wait">
      <LazyMotion strict features={loadFeatures}>
        {!isSearching ? (
          <m.div
            initial={{
              top: 48,
              opacity: 0,
            }}
            animate={{
              top: 0,
              opacity: [0, 0, 1],
            }}
            exit={{
              top: 48,
              opacity: [1, 0, 0],
            }}
            transition={{
              duration: 0.35,
              ease: "easeInOut",
            }}
            key={"nav_menu"}
            className="flex items-center justify-center gap-3 md:gap-6 relative"
          >
            <NavigationMenu
              className="hidden sm:block"
              aria-label="Desktop Primary Navigation 1"
            >
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "bg-transparent",
                      imageTheme &&
                        " text-[#F6F5AE] hover:text-[#F6F5AE] hover:bg-[#F6F5AE]/20 data-[state=open]:bg-[#F6F5AE]/40"
                    )}
                  >
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="flex flex-col p-4 gap-3 w-[150px] ">
                      <ListItem href="/blogs">Blogs</ListItem>
                      <ListItem href="/standalones?type=Article">
                        Articles
                      </ListItem>
                      <ListItem href="/standalones?type=Book">Books</ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href={"#pricing"} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent",
                        imageTheme &&
                          "bg-transparent text-[#F6F5AE] hover:text-[#F6F5AE] hover:bg-[#F6F5AE]/20"
                      )}
                    >
                      Pricing
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div
              onClick={() => setIsSearching(true)}
              className="p-2 rounded-full bg-transparent border-none border-black/20 cursor-pointer transition-colors hover:top-0.5 relative"
            >
              <Search
                aria-label="Open Search Bar"
                className={cn(
                  "w-5 h-5",
                  imageTheme ? "text-[#F6F5AE]" : "text-zinc-700"
                )}
              />
              <span className="sr-only">Toggle Search Bar</span>
            </div>

            <NavigationMenu
              className="hidden sm:block"
              aria-label="Desktop Primary Navigation 2"
            >
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/contact_us" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent",
                        imageTheme &&
                          "bg-transparent text-[#F6F5AE] hover:text-[#F6F5AE] hover:bg-[#F6F5AE]/20"
                      )}
                    >
                      Contact Us
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/about_us" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent",
                        imageTheme &&
                          "bg-transparent text-[#F6F5AE] hover:text-[#F6F5AE] hover:bg-[#F6F5AE]/20"
                      )}
                    >
                      About Us
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </m.div>
        ) : (
          <m.div
            className="relative flex-1"
            initial={{
              top: -48,
              opacity: 0,
            }}
            animate={{
              top: 0,
              opacity: [0, 0, 1],
            }}
            exit={{
              top: -48,
              opacity: [1, 0, 0],
            }}
            transition={{
              duration: 0.35,
              ease: "easeInOut",
            }}
            key={"search_bar"}
          >
            <Searchbar
              autoFocus
              // query={query}
              // setQuery={setQuery}
              autoComplete="false"
              pathname="/subjects"
              imageTheme={imageTheme}
              id="subjects-search-input"
              getAutocompletes={getAutocompletes}
              placeholder="Search for subjects here."
              onBlur={(e) => {
                if (e.relatedTarget?.id === "autocomplete") {
                  document.getElementById("subjects-search-input")?.focus();
                  return;
                }

                setIsSearching(false);
              }}
            />

            {/* {autocompletes.length > 0 && (
              <div className="absolute top-14 left-0 right-0 bg-white p-3 rounded-md drop-shadow-md">
                <ul className="flex flex-col">
                  {autocompletes.map((autocomplete, i) => (
                    <li
                      key={i}
                      tabIndex={0}
                      id="autocomplete"
                      onClick={() => {
                        setQuery("");
                        setAutocompletes([]);
                        onSearch(autocomplete.name);
                      }}
                      className="px-2 py-4 hover:bg-zinc-50 transition-colors rounded-lg flex flex-col gap-3"
                    >
                      <p className="text-zinc-700 text-[13px] leading-4 font-medium">
                        {autocomplete.name}
                      </p>
                      <div className="flex justify-start w-full gap-3">
                        <Badge
                          variant={"outline"}
                          className="text-zinc-700 font-normal"
                        >
                          {autocomplete.universityShort}
                        </Badge>
                        <Badge
                          variant={"outline"}
                          className="text-zinc-700 font-normal"
                        >
                          Semester {autocomplete.semester}
                        </Badge>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
          </m.div>
        )}
      </LazyMotion>
    </AnimatePresence>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <p className="line-clamp-2 text-start text-sm leading-snug text-zinc-700">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
