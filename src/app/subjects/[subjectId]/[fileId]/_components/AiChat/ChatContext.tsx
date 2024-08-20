"use client";
import React, { createContext, useState } from "react";

import ObjectID from "bson-objectid";

import { toast } from "sonner";

import { trpc } from "@/app/_trpc/client";
import { ExtendedMessageType } from "@/types";
import { useMutation } from "@tanstack/react-query";

import dynamic from "next/dynamic";

const Dialog = dynamic(() =>
  import("@/components/ui/dialog").then((mod) => mod.Dialog)
);
const DialogTitle = dynamic(() =>
  import("@/components/ui/dialog").then((mod) => mod.DialogTitle)
);
const DialogClose = dynamic(() =>
  import("@/components/ui/dialog").then((mod) => mod.DialogClose)
);
const DialogHeader = dynamic(() =>
  import("@/components/ui/dialog").then((mod) => mod.DialogHeader)
);
const DialogFooter = dynamic(() =>
  import("@/components/ui/dialog").then((mod) => mod.DialogFooter)
);
const DialogContent = dynamic(() =>
  import("@/components/ui/dialog").then((mod) => mod.DialogContent)
);

import { Button } from "@/components/ui/button";
import { updateUserPrefrences } from "@/actions/updateUserPrefrences";
import { UserPrefrences } from "@prisma/client";

export const chatContext = createContext<{
  isLoading: boolean;
  messagesQuota: number;
  createMessage: (message: string) => void;
}>({
  isLoading: false,
  createMessage: (message: string) => "",
  messagesQuota: 500,
});

export const ChatContext = ({
  userPrefrences,
  messagesQuota,
  subjectId,
  children,
  fileId,
}: {
  userPrefrences: UserPrefrences;
  children: React.ReactNode;
  messagesQuota: number;
  subjectId: string;
  fileId: string;
}) => {
  const [queries, setQueries] = useState<string[]>([]);
  const [messagesUsedCount, setMessagesUsedCount] = useState(0);

  const [open, setOpen] = useState(false);

  const [currentQuota, setCurrentQuota] = useState(messagesQuota);
  const [isLoading, setIsLoading] = useState(false);

  const utils = trpc.useUtils();

  const { mutate } = useMutation({
    mutationFn: async (message: string) => {
      const response = await fetch("/api/createMessage", {
        method: "POST",
        body: JSON.stringify({
          fileId,
          message,
          subjectId,
        }),
      });

      if (!response.ok) throw new Error("Something goes wrong");

      return response;
    },
    onMutate: async (newMessage) => {
      utils.chat.getMessagePages.setInfiniteData(
        { fileId, limit: 1 },
        (oldData) => {
          if (!oldData) return oldData;

          let latestPage = oldData.pages[0];

          const newUserMessage: ExtendedMessageType = {
            createdAt: new Date().toString(),
            id: ObjectID().toHexString(),
            isUserMessage: true,
            gotRejected: false,
            text: newMessage,
          };

          const newAiMessage: ExtendedMessageType = {
            id: "ai-streaming-response",
            isAiWriting: true,
            gotRejected: false,
            isAiThinking: true,
            isUserMessage: false,
            createdAt: new Date().toString(),
            text: "Litera is processing your query...",
          };

          latestPage.messages.unshift(newUserMessage);
          latestPage.messages.unshift(newAiMessage);

          oldData.pages[0] = latestPage;

          return oldData;
        }
      );

      setIsLoading(true);
    },
    onSuccess: async (response) => {
      if (!response.body)
        return toast.error(
          "There was some error sending your message. Try again later."
        );

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      let streamedResponse = "";

      while (!done) {
        const { value, done: doneReadingStream } = await reader.read();
        done = doneReadingStream;

        const chunkText = decoder.decode(value);
        streamedResponse += chunkText;

        utils.chat.getMessagePages.setInfiniteData(
          { fileId, limit: 1 },
          (oldData) => {
            if (!oldData) return oldData;

            const updatedPages = oldData.pages.map((page, i) => {
              if (i === 0) {
                const updatedMessages = page.messages.map((message) => {
                  if (message.id === "ai-streaming-response") {
                    return {
                      ...message,
                      isAiThinking: false,
                      text: streamedResponse,
                      isAiWriting: !doneReadingStream,
                      id: done
                        ? ObjectID().toHexString()
                        : "ai-streaming-response",
                    };
                  } else return message;
                });

                return { ...page, messages: updatedMessages };
              } else return page;
            });

            return { ...oldData, pages: updatedPages };
          }
        );
      }
    },
    onError: (e) => {
      console.log(e);
      toast.error(
        "There was some error sending your message. Try again later."
      );
    },
    onSettled: (response) => {
      setIsLoading(false);

      if (!response?.ok || !response.body) return;

      const jsonData = JSON.parse(response.headers.get("X-JSON-Data") || "");

      let queries = jsonData.queries || [];
      let messagesUsedCount = jsonData.messagesUsedCount || 1;

      setCurrentQuota((prev) => prev - messagesUsedCount);

      if (
        userPrefrences.showMultipleQuotaUsageModal &&
        (messagesUsedCount || 1) > 1
      ) {
        setQueries(queries);
        setMessagesUsedCount(messagesUsedCount);
        setOpen(true);
      }
    },
  });

  const createMessage = (message: string) => {
    mutate(message);
  };

  const doNotShowAgain = () => {
    setOpen(false);
    updateUserPrefrences({ showMultipleQuotaUsageModal: false });
  };

  return (
    <>
      <chatContext.Provider
        value={{ isLoading, createMessage, messagesQuota: currentQuota }}
      >
        <div className="flex col-span-3 flex-col w-full h-full min-h-[calc(100vh-72px)] max-[calc(100vh-72px)] relative">
          {children}
        </div>
      </chatContext.Provider>

      {open && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Multiple Messages Quota Usage</DialogTitle>
            </DialogHeader>
            <div className="mt-6 flex flex-col gap-3">
              <p>{`${messagesUsedCount} messages quota was used because your query was complex and for best answer it was broken down into:`}</p>
              <ul>
                {queries.map((query, i) => (
                  <li key={i} className="font-medium">
                    {query}
                  </li>
                ))}
              </ul>
            </div>

            <DialogFooter className="flex gap-3 mt-6">
              <Button
                variant={"secondary"}
                className="w-full"
                onClick={doNotShowAgain}
              >
                Never show again
              </Button>

              <DialogClose className="w-full">
                <Button variant={"ghost"} className="w-full">
                  Ok
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
