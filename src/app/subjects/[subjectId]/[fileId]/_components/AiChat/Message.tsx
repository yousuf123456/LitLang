import React, { forwardRef, useEffect, useRef, useState } from "react";

import Image from "next/image";

import { cn } from "@/utils/utils";
import { useUser } from "@clerk/nextjs";
import { ExtendedMessageType } from "@/types";

import ReactMarkdown from "react-markdown";
import { Skeleton } from "@/components/ui/skeleton";

export const Message = forwardRef<
  HTMLDivElement,
  { message: ExtendedMessageType }
>(({ message }, ref) => {
  const { user } = useUser();

  return (
    <div
      ref={ref}
      className="flex max-sm:flex-col items-start gap-2 sm:gap-4 w-full max-w-screen-lg mx-auto px-6"
    >
      {message.isUserMessage ? (
        <div className="w-7 h-7 rounded-full relative overflow-hidden">
          <Image
            alt="User Profile Picture"
            src={user?.imageUrl || "/placeholder.jpg"}
            fill
          />
        </div>
      ) : (
        <Image
          width={36}
          height={36}
          alt="Litera Ai Logo"
          src={"/ai_logo.png"}
          className={cn(
            message.isAiWriting && "animate-write",
            "relative right-1"
          )}
        />
      )}

      {message.isUserMessage ? (
        <p className="mt-1.5 text-gray-900 font-inter">{message.text}</p>
      ) : (
        !message.isAiThinking && (
          <ReactMarkdown
            className={
              "prose prose-headings:font-semibold prose-headings:text-zinc-800 text-gray-900 mt-1.5 relative right-2"
            }
          >
            {message.text}
          </ReactMarkdown>
        )
      )}

      {message.isAiThinking && (
        <div className="mt-4 flex flex-col w-full gap-3">
          <Skeleton className="w-full h-5 bg-primary/20" />
          <Skeleton className="w-full h-5 bg-primary/20" />
          <Skeleton className="w-full h-5 bg-primary/20" />
        </div>
      )}
    </div>
  );
});

Message.displayName = "Message";
