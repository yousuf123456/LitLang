"use client";
import React, { useContext, useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Button, buttonVariants } from "@/components/ui/button";

import Link from "next/link";

import { Info, Loader2, Trash } from "lucide-react";
import { GrHide } from "react-icons/gr";
import { AiOutlineFilePdf } from "react-icons/ai";
import { chatContext } from "./ChatContext";
import { trpc } from "@/app/_trpc/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SignInButton, useUser } from "@clerk/nextjs";

export const ChatHeader = ({
  type,
  fileId,
  subjectId,
  maxQuotaLimit,
}: {
  fileId: string;
  subjectId: string;
  maxQuotaLimit: number;
  type: "Chat" | "Viewer" | "Both";
}) => {
  const [open, setOpen] = useState(false);
  const { messagesQuota } = useContext(chatContext);

  const utils = trpc.useUtils();
  const { mutateAsync: clearChat, isLoading: isClearingChat } =
    trpc.chat.clear.useMutation();

  const onClearChat = () => {
    clearChat(fileId)
      .then((res) => {
        utils.chat.getMessagePages.invalidate();
        toast.success(res);
      })
      .catch(() =>
        toast.error("There was some error clearing your chat history.")
      )
      .finally(() => setOpen(false));
  };

  const { user, isLoaded } = useUser();

  return (
    <>
      <header className="w-full flex justify-between items-center h-fit px-3 sm:px-6 pb-3 shadow-sm">
        <div className="flex items-center gap-4">
          <p className="font-brand text-xl font-medium text-primary">Litera</p>

          <div className="flex items-center gap-2 text-xs font-medium font-inter">
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger>
                  <Info className="w-3.5 h-3.5 text-zinc-600" />
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-white max-w-48">
                  You have {messagesQuota} messages left out of your{" "}
                  {maxQuotaLimit}-message limit.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Progress
              max={maxQuotaLimit}
              className="w-20 h-1.5"
              value={maxQuotaLimit - messagesQuota}
            />
            {`${maxQuotaLimit - messagesQuota} / 500`}
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`/subjects/${subjectId}/${fileId}?type=Viewer`}
                  className={buttonVariants({
                    size: "icon",
                    variant: "secondary",
                    className: "bg-[#F2F0E8]/100 hover:bg-[#F2F0E8]/90",
                  })}
                >
                  {type === "Both" ? (
                    <GrHide className="w-[18px] h-[18px] text-primary" />
                  ) : (
                    <AiOutlineFilePdf className="w-[18px] h-[18px] text-primary" />
                  )}
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <div className="p-0.5 rounded-md">
                  <p className="text-xs text-black">
                    {type === "Both" ? "Hide Litera Ai" : "View Pdf"}
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                {isLoaded && !user ? (
                  <SignInButton>
                    <Button size={"icon"} variant={"destructive"}>
                      <Trash className="w-[18px] h-[18px]" />
                    </Button>
                  </SignInButton>
                ) : (
                  <Button
                    size={"icon"}
                    variant={"destructive"}
                    disabled={isClearingChat}
                    onClick={() => setOpen(true)}
                  >
                    <Trash className="w-[18px] h-[18px]" />
                  </Button>
                )}
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <div className="p-0.5 rounded-md">
                  <p className="text-xs text-black">Clear Chat</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </header>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Clear Chat History ?</DialogTitle>
            <DialogDescription>
              All the chat history with Litera AI about this pdf will be cleared
              permanently.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"ghost"} disabled={isClearingChat}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={onClearChat}
              variant={"destructive"}
              disabled={isClearingChat}
            >
              Clear{" "}
              {isClearingChat && (
                <Loader2 className="w-4 h-4 animate-spin ml-2" />
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
