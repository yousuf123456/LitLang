import React, { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";

import { Loader } from "lucide-react";
import { File } from "./_components/File";
import { FileNavigation } from "./_components/FileNavigation";
import { PaddingTopWrapper } from "@/components/PaddingTopWrapper";

import { redirect } from "next/navigation";
import { cn } from "@/utils/utils";

import prisma from "@/app/utils/prismadb";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ChatContext } from "./_components/AiChat/ChatContext";
import { Messages } from "./_components/AiChat/Messages";
import { ChatInput } from "./_components/AiChat/ChatInput";
import { ChatHeader } from "./_components/AiChat/ChatHeader";

export const revalidate = 3600;

export default async function FilePage({
  params,
  searchParams,
}: {
  searchParams: { type?: "Viewer" | "Chat" | "Both" };
  params: { subjectId: string; fileId: string };
}) {
  const { userId } = auth();

  const dbUser = await prisma.user.findUnique({
    where: {
      clerkId: userId || "",
    },
  });

  const messagesQuota = dbUser?.messagesQuota || 500;

  const maxMessagesQuotaLimit = dbUser?.maxMessagesQuotaLimit || 500;

  if (searchParams.type === undefined)
    redirect(`/subjects/${params.subjectId}/${params.fileId}?type=Viewer`);

  return (
    <PaddingTopWrapper>
      <div className="max-h-[calc(100dvh-72px)] min-h-[calc(100dvh-72px)] flex">
        <Suspense
          key={`${params.subjectId} ${params.fileId} sidebar`}
          fallback={
            <Skeleton
              aria-busy
              aria-live="polite"
              className="hidden md:flex w-64 lg:w-80 rounded-none "
            />
          }
        >
          <FileNavigation fileId={params.fileId} subjectId={params.subjectId} />
        </Suspense>

        <div
          className={cn(
            "flex-1 grid grid-cols-1",
            searchParams.type === "Both" && "grid-cols-7"
          )}
        >
          {(searchParams.type === "Both" || searchParams.type === "Chat") && (
            <ChatContext
              userPrefrences={
                dbUser?.prefrences || { showMultipleQuotaUsageModal: true }
              }
              messagesQuota={messagesQuota}
              subjectId={params.subjectId}
              fileId={params.fileId}
            >
              <ChatHeader
                type={searchParams.type}
                fileId={params.fileId}
                subjectId={params.subjectId}
                maxQuotaLimit={maxMessagesQuotaLimit}
              />

              <Messages />

              <ChatInput />
            </ChatContext>
          )}

          {(searchParams.type === "Both" || searchParams.type === "Viewer") && (
            <Suspense
              key={`${params.subjectId} ${params.fileId} content`}
              fallback={
                <div
                  aria-busy
                  aria-live="polite"
                  className="flex-1 col-span-4 flex items-center justify-center"
                >
                  <p className="sr-only">Loading file...</p>
                  <Loader className="text-zinc-700 animate-spin" />
                </div>
              }
            >
              <File fileId={params.fileId} subjectId={params.subjectId} />
            </Suspense>
          )}
        </div>
      </div>
    </PaddingTopWrapper>
  );
}
