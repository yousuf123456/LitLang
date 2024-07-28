"use client";

import Image from "next/image";
// Import useClerk()
import {
  useUser,
  useClerk,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
// Import the Next.js router
import { usePathname, useRouter } from "next/navigation";
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
} from "lucide-react";
import { Button } from "./ui/button";

export const UserMenu = () => {
  const { isLoaded, user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  const pathname = usePathname();

  if (!isLoaded) return null;

  return (
    <>
      <DropdownMenu modal={false}>
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

          <Link href={"/blogs"} className="sm:hidden">
            <DropdownMenuItem>
              <Newspaper className="mr-4 h-4 w-4 text-zinc-700" />
              <span>Blogs</span>
            </DropdownMenuItem>
          </Link>

          <Link href={"/standalones?type=Article"} className="sm:hidden">
            <DropdownMenuItem>
              <Newspaper className="mr-4 h-4 w-4 text-zinc-700" />
              <span>Articles</span>
            </DropdownMenuItem>
          </Link>

          <Link href={"/standalones?type=Book"} className="sm:hidden">
            <DropdownMenuItem>
              <Newspaper className="mr-4 h-4 w-4 text-zinc-700" />
              <span>Books</span>
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

          <DropdownMenuSeparator />

          <SignedIn>
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOutIcon className="mr-4 h-4 w-4 text-zinc-700" />
              <span>Logout</span>
            </DropdownMenuItem>
          </SignedIn>
          <SignedOut>
            <nav aria-label="Mobile User Authentication">
              <ul className="w-full flex flex-col p-1 gap-2">
                <li>
                  <SignInButton>
                    <Button variant={"secondary"} className="w-full">
                      Login
                    </Button>
                  </SignInButton>
                </li>
                <li>
                  <SignUpButton>
                    <Button className="w-full">Get Started</Button>
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
