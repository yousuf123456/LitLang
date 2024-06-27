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
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";

export const UserMenu = () => {
  const { isLoaded, user } = useUser();
  // Grab the signOut and openUserProfile methods
  const { signOut, openUserProfile } = useClerk();
  // Get access to the Next.js router
  const router = useRouter();

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
        <DropdownMenuItem asChild>
          <Link
            href={"/pricing"}
            className={buttonVariants({
              variant: "ghost",
              className: "w-full font-normal focus-visible:ring-0",
            })}
          >
            Pricing
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Button
            onClick={() => openUserProfile()}
            variant={"ghost"}
            className="w-full font-normal focus-visible:ring-0"
          >
            Manage Account
          </Button>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Button
            onClick={() => signOut(() => router.push("/"))}
            variant={"ghost"}
            className="w-full font-normal focus-visible:ring-0"
          >
            Sign Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
