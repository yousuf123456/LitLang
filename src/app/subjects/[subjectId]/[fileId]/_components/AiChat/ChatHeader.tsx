"use client";
import React, { useContext } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { buttonVariants } from "@/components/ui/button";

import Link from "next/link";

import { Info } from "lucide-react";
import { GrHide } from "react-icons/gr";
import { AiOutlineFilePdf } from "react-icons/ai";
import { chatContext } from "./ChatContext";

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
  const { messagesQuota } = useContext(chatContext);

  return (
    <div className="w-full flex justify-between items-center h-fit px-3 sm:px-6 pb-3 shadow-sm">
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

      <TooltipProvider>
        <Tooltip delayDuration={150}>
          <TooltipTrigger>
            <Link
              href={`/subjects/${subjectId}/${fileId}?type=Viewer`}
              className={buttonVariants({
                size: "icon",
                variant: "secondary",
                className: "bg-[#F2F0E8]/80 hover:bg-[#F2F0E8]/90",
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
      </TooltipProvider>
    </div>
  );
};
