"use client";
import { useState } from "react";
import Image from "next/image";

import {
  useUser,
  useClerk,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";

import { usePathname, useSearchParams } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import Link from "next/link";

import {
  Edit,
  Gem,
  LogOutIcon,
  User,
  Newspaper,
  Contact,
  PersonStanding,
  Star,
  Text,
} from "lucide-react";

import { IoBookOutline } from "react-icons/io5";
import { PiGraduationCap } from "react-icons/pi";
import { PiNewspaperClipping } from "react-icons/pi";

import { Button } from "./ui/button";
import { getSearchParamsArray } from "@/utils/utils";

export const UserMenu = () => {
  const [open, setOpen] = useState(false);

  const { isLoaded, user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onSignOut = () => {
    const searchParamsArray = getSearchParamsArray(searchParams, [], []);

    signOut({ redirectUrl: `${pathname}?${searchParamsArray.join("&")}` });
  };

  if (!isLoaded) return null;

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
        <DropdownMenuTrigger>
          <div className="relative w-9 h-9 rounded-full overflow-hidden">
            <Image
              src={user?.imageUrl || "/placeholder.jpg"}
              alt={
                user?.primaryEmailAddress?.emailAddress! || "not signed in user"
              }
              fill
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          sideOffset={20}
          className="max-w-xl w-72 min-[360px]:w-80 rounded-xl"
        >
          <DropdownMenuLabel className="py-3" asChild>
            {user ? (
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={user.imageUrl}
                    alt={user.primaryEmailAddress?.emailAddress!}
                    fill
                  />
                </div>

                <div className="flex flex-col gap-0">
                  <p className="text-zinc-700">
                    {user.username ||
                      (user.firstName || "") + " " + (user.lastName || "")}
                  </p>
                  <p className="text-xs text-zinc-500 line-clamp-1">
                    {user.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-start text-zinc-600 pl-6">My Account</p>
            )}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <div
            className="max-h-72 overflow-y-auto overflow-x-hidden scrollbar-thin"
            data-lenis-prevent
          >
            <Link href={"/subjects"} className="sm:hidden">
              <DropdownMenuItem>
                <PiGraduationCap className="mr-4 h-4 w-4 text-zinc-700" />
                <span>Subjects</span>
              </DropdownMenuItem>
            </Link>

            <Link href={"/standalones?type=Book"} className="sm:hidden">
              <DropdownMenuItem>
                <IoBookOutline className="mr-4 h-4 w-4 text-zinc-700" />
                <span>Books</span>
              </DropdownMenuItem>
            </Link>

            <Link href={"/standalones?type=Book"} className="sm:hidden">
              <DropdownMenuItem>
                <Star className="mr-4 h-4 w-4 text-zinc-700" />
                <span>Books Reviews</span>
              </DropdownMenuItem>
            </Link>

            <Link href={"/standalones?type=Article"} className="sm:hidden">
              <DropdownMenuItem>
                <Newspaper className="mr-4 h-4 w-4 text-zinc-700" />
                <span>Articles</span>
              </DropdownMenuItem>
            </Link>

            <Link href={"/standalones?type=Text"} className="sm:hidden">
              <DropdownMenuItem>
                <Text className="mr-4 h-4 w-4 text-zinc-700" />
                <span>Texts</span>
              </DropdownMenuItem>
            </Link>

            <Link href={"/blogs"} className="sm:hidden">
              <DropdownMenuItem>
                <PiNewspaperClipping className="mr-4 h-4 w-4 text-zinc-700" />
                <span>Blogs</span>
              </DropdownMenuItem>
            </Link>

            <Link
              href={"/?goTo=pricing"}
              scroll={pathname !== "/"}
              className="sm:hidden"
            >
              <DropdownMenuItem className="sm:hidden">
                <Gem className="mr-4 h-4 w-4 text-zinc-700" />
                <span>Pricing</span>
              </DropdownMenuItem>
            </Link>

            <Link href={"/contact_us"} className="sm:hidden">
              <DropdownMenuItem>
                <Contact className="mr-4 h-4 w-4 text-zinc-700" />
                <span>Contact Us</span>
              </DropdownMenuItem>
            </Link>

            <Link href={"/about_us"} className="sm:hidden">
              <DropdownMenuItem>
                <PersonStanding className="mr-4 h-4 w-4 text-zinc-700" />
                <span>About Us</span>
              </DropdownMenuItem>
            </Link>

            <DropdownMenuSeparator className="sm:hidden" />

            {user && (
              <Link href={"/blogEditor"}>
                <DropdownMenuItem>
                  <Edit className="mr-4 h-4 w-4 text-zinc-700" />
                  <span>Write Blog</span>
                </DropdownMenuItem>
              </Link>
            )}

            {user && (
              <Link href={`/blogs?userId=${user.id}`}>
                <DropdownMenuItem>
                  <Newspaper className="mr-4 h-4 w-4 text-zinc-700" />
                  <span>My Blogs</span>
                </DropdownMenuItem>
              </Link>
            )}

            {user && (
              <DropdownMenuItem onClick={() => openUserProfile()}>
                <User className="mr-4 h-4 w-4 text-zinc-700" />
                <span>Manage Account</span>
              </DropdownMenuItem>
            )}
          </div>

          <DropdownMenuSeparator />

          <SignedIn>
            <DropdownMenuItem onClick={onSignOut}>
              <LogOutIcon className="mr-4 h-4 w-4 text-zinc-700" />
              <span>Logout</span>
            </DropdownMenuItem>
          </SignedIn>
          <SignedOut>
            <nav aria-label="Mobile User Authentication">
              <ul className="w-full flex flex-col p-1 gap-2">
                <li>
                  <SignInButton>
                    <Button
                      className="w-full"
                      variant={"secondary"}
                      onClick={() => setOpen(false)}
                    >
                      Login
                    </Button>
                  </SignInButton>
                </li>
                <li>
                  <SignUpButton>
                    <Button onClick={() => setOpen(false)} className="w-full">
                      Get Started
                    </Button>
                  </SignUpButton>
                </li>
              </ul>
            </nav>
          </SignedOut>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
