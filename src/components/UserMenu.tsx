"use client";

import Image from "next/image";
// Import useClerk()
import { useUser, useClerk } from "@clerk/nextjs";
// Import the Next.js router
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { Edit, Gem, LogOutIcon, User, Newspaper } from "lucide-react";

export const UserMenu = () => {
  const { isLoaded, user } = useUser();
  // Grab the signOut and openUserProfile methods
  const { signOut, openUserProfile } = useClerk();

  if (!isLoaded) return null;
  if (!user?.id) return null;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <div className="relative w-9 h-9 rounded-full overflow-hidden">
          <Image
            src={user.imageUrl}
            alt={user.primaryEmailAddress?.emailAddress!}
            fill
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={20}
        className="max-w-xl w-72 min-[360px]:w-80 rounded-xl"
      >
        <DropdownMenuLabel className="py-3" asChild>
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
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <Link href={"/blogs"}>
          <DropdownMenuItem>
            <Newspaper className="mr-4 h-4 w-4 text-zinc-700" />
            <span>Blogs</span>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <Link href={"/pricing"}>
          <DropdownMenuItem>
            <Gem className="mr-4 h-4 w-4 text-zinc-700" />
            <span>Pricing</span>
          </DropdownMenuItem>
        </Link>

        <Link href={"/blogEditor"}>
          <DropdownMenuItem>
            <Edit className="mr-4 h-4 w-4 text-zinc-700" />
            <span>Write Blog</span>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem onClick={() => openUserProfile()}>
          <User className="mr-4 h-4 w-4 text-zinc-700" />
          <span>Manage Account</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => signOut()}>
          <LogOutIcon className="mr-4 h-4 w-4 text-zinc-700" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
