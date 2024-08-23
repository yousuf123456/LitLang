"use client";

import React, { useContext, useState } from "react";
import { IoMdSend } from "react-icons/io";
import Textarea from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import { chatContext } from "./ChatContext";
import { toast } from "sonner";
import { SignInButton, useUser } from "@clerk/nextjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { absoluteUrl, cn } from "@/utils/utils";

export const ChatInput = () => {
  const [message, setMessage] = useState("");

  const { user, isLoaded } = useUser();
  const { isLoading, createMessage, messagesQuota } = useContext(chatContext);

  const send = () => {
    if (!message || message.length === 0)
      return toast.error("No message was provided.");

    if (messagesQuota === 0) return toast.error("Messages Quota Reached");

    createMessage(message);
    setMessage("");
  };

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (!isLoaded) return;

      if (isLoaded && !user)
        return router.push(
          `/sign-in?redirect_url=${encodeURIComponent(
            absoluteUrl(`${pathname}?${searchParams}`, true)
          )}`
        );

      send();
    }
  };

  return (
    <div className="absolute bottom-0 inset-x-3 pb-2 bg-white flex flex-col">
      <div className="relative px-3 pt-3 w-full h-fit max-w-screen-lg mx-auto">
        <label htmlFor="chat-input" className="sr-only">
          Enter your question here
        </label>
        <Textarea
          id="chat-input"
          value={message}
          onKeyDown={onKeyDown}
          aria-label="Chat input"
          placeholder="Enter your question here"
          onChange={(e) => setMessage(e.target.value)}
          className={cn(
            "p-5 pr-16 text-sm text-black font-[450] w-full resize-none items-center rounded-[36px] border-none bg-[#F2F0E8]/80 focus-visible:bg-[#F2F0E8] focus-visible:outline-none placeholder:text-black",
            message.length === 0 && "h-[60px]"
          )}
        />

        {isLoaded && !user ? (
          <SignInButton>
            <Button
              size={"icon"}
              variant={"secondary"}
              disabled={isLoading || !isLoaded}
              aria-label="Sign in to send message"
              className="right-6 bottom-[14px] absolute hover:bg-[#DED8C4] rounded-full bg-transparent p-3 h-fit w-fit duration-200"
            >
              <IoMdSend className="w-[22px] h-[22px] text-primary" />
            </Button>
          </SignInButton>
        ) : (
          <Button
            size={"icon"}
            onClick={send}
            variant={"secondary"}
            aria-label="Send message"
            disabled={isLoading || !isLoaded}
            className="right-6 bottom-[14px] absolute hover:bg-[#DED8C4] rounded-full bg-transparent p-3 h-fit w-fit duration-200"
          >
            <IoMdSend className="w-[22px] h-[22px] text-primary" />
          </Button>
        )}
      </div>
    </div>
  );
};
