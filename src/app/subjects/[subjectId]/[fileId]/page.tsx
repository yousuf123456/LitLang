import React, { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";

import { Loader } from "lucide-react";
import { File } from "./_components/File";
import { FileNavigation } from "./_components/FileNavigation";
import { PaddingTopWrapper } from "@/components/PaddingTopWrapper";

import { redirect } from "next/navigation";
import { cn } from "@/utils/utils";

import prisma from "@/app/utils/prismadb";
import { auth } from "@clerk/nextjs/server";
import { ChatContext } from "./_components/AiChat/ChatContext";
import { Messages } from "./_components/AiChat/Messages";
import { ChatInput } from "./_components/AiChat/ChatInput";
import { ChatHeader } from "./_components/AiChat/ChatHeader";
import { ClerkProvider } from "@clerk/nextjs";

export const revalidate = 3600;

export default async function FilePage({
  params,
  searchParams,
}: {
  searchParams: Promise<{ type?: "Viewer" | "Chat" | "Both" }>;
  params: Promise<{ subjectId: string; fileId: string }>;
}) {
  const { userId } = await auth();
  const { type } = await searchParams;
  const { subjectId, fileId } = await params;

  const dbUser = await prisma.user.findUnique({
    where: {
      clerkId: userId || "",
    },
  });

  const messagesQuota = dbUser?.messagesQuota || 500;

  const maxMessagesQuotaLimit = dbUser?.maxMessagesQuotaLimit || 500;

  if (type === undefined)
    redirect(`/subjects/${subjectId}/${fileId}?type=Viewer`);

  return (
    <ClerkProvider dynamic>
      <PaddingTopWrapper>
        <div className="max-h-[calc(100dvh-72.5px)] min-h-[calc(100dvh-72.5px)] flex">
          <Suspense
            key={`${subjectId} ${fileId} sidebar`}
            fallback={
              <Skeleton
                aria-busy
                aria-live="polite"
                className="hidden md:16 lg:w-16 rounded-none md:block"
              />
            }
          >
            <FileNavigation fileId={fileId} subjectId={subjectId} />
          </Suspense>

          <div
            className={cn(
              "flex-1 grid grid-cols-1",
              type === "Both" && "grid-cols-7"
            )}
          >
            {(type === "Both" || type === "Chat") && (
              <ChatContext
                userPrefrences={
                  dbUser?.prefrences || { showMultipleQuotaUsageModal: true }
                }
                messagesQuota={messagesQuota}
                subjectId={subjectId}
                fileId={fileId}
              >
                <ChatHeader
                  type={type}
                  fileId={fileId}
                  subjectId={subjectId}
                  maxQuotaLimit={maxMessagesQuotaLimit}
                />

                <Messages />

                <ChatInput />
              </ChatContext>
            )}

            {(type === "Both" || type === "Viewer") && (
              <Suspense
                key={`${subjectId} ${fileId} content`}
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
                <File fileId={fileId} subjectId={subjectId} />
              </Suspense>
            )}
          </div>
        </div>
      </PaddingTopWrapper>
    </ClerkProvider>
  );
}
