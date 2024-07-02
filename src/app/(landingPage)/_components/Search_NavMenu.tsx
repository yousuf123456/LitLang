"use client";
import React, { useState } from "react";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { AnimatePresence, motion } from "framer-motion";

import Link from "next/link";
import { cn } from "@/utils/utils";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const Search_NavMenu = () => {
  const [isSearching, setIsSearching] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!isSearching ? (
        <motion.div
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
            duration: 0.2,
            ease: "easeInOut",
          }}
          key={"nav_menu"}
          className="flex items-center justify-center gap-6 relative"
        >
          <NavigationMenu className="hidden sm:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="flex flex-col p-4 gap-3 w-[150px] ">
                    <ListItem href="/">Blogs</ListItem>
                    <ListItem href="/">Articles</ListItem>
                    <ListItem href="/">Books</ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/pricing" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div
            onClick={() => setIsSearching(true)}
            className="p-2 rounded-full bg-white border border-zinc-200 cursor-pointer hover:bg-zinc-50 transition-colors hover:top-0.5 relative"
          >
            <Search className="text-zinc-400 w-5 h-5" />
          </div>

          <NavigationMenu className="hidden sm:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/contact_us" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Contact Us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/about_us" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    About Us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </motion.div>
      ) : (
        <motion.div
          onClick={() => setIsSearching(false)}
          className="relative w-full"
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
            duration: 0.2,
            ease: "easeInOut",
          }}
          key={"search_bar"}
        >
          <Input
            placeholder="Search for subjects"
            className="w-full"
            onBlur={() => setIsSearching(false)}
            autoFocus
          />
        </motion.div>
      )}
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
