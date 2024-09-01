"use client";

import React, { useEffect } from "react";

import Image from "next/image";

import { Message } from "./Message";
import { trpc } from "@/app/_trpc/client";
import { useParams } from "next/navigation";
import { ExtendedMessageType } from "@/types";
import { Loader } from "lucide-react";
import { useInView } from "react-intersection-observer";

export const Messages = () => {
  const { fileId } = useParams();

  const { data, isFetchingNextPage, fetchNextPage, isLoading } =
    trpc.chat.getMessagePages.useInfiniteQuery(
      { fileId: fileId as string, limit: 1 },
      {
        getNextPageParam: (lastPage) => lastPage?.cursor,
      }
    );

  const { ref, inView } = useInView({ threshold: 1 });

  useEffect(() => {
    if (inView && !isFetchingNextPage) fetchNextPage();
  }, [inView, ref]);

  if (isLoading || data === undefined) {
    return (
      <div className="flex-1 flex justify-center items-center pb-32">
        <Image
          className="animate-write"
          src={"/ai_logo.png"}
          alt="Chat AI Logo"
          height={75}
          width={75}
        />
      </div>
    );
  }

  const messages = [
    ...data.pages.flatMap((page) => page?.messages || []),
  ] as ExtendedMessageType[];

  return (
    <section
      aria-label="Chat messages"
      className="flex-1 flex-col-reverse pb-36 pt-4 gap-12 flex h-full max-h-full overflow-y-auto scrollbar-none"
    >
      {messages.length === 0 && (
        <div className="flex flex-col h-full gap-12 px-6 py-4 mx-auto w-full max-w-screen-lg">
          <div className="flex flex-col h-full justify-center items-center">
            <Image
              width={90}
              height={90}
              className="mb-6"
              alt="Litera Ai Logo"
              src={"/ai_logo.png"}
            />
            <h1 className="text-4xl md:text-5xl text-center font-brand font-[530] text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50 w-fit">
              Got a question?
            </h1>
            <h1 className="text-4xl md:text-5xl text-center leading-10 font-brand font-[530] text-[#DDD8C2]">
              Start Questioning PDF.
            </h1>
          </div>
        </div>
      )}

      {messages.length > 0 &&
        messages.map((message, i) => {
          if (messages.length - 1 === i) {
            return (
              <Message
                key={i}
                ref={ref}
                message={message as ExtendedMessageType}
              />
            );
          }

          return <Message key={i} message={message as ExtendedMessageType} />;
        })}

      {isFetchingNextPage && (
        <div
          aria-live="polite"
          aria-atomic="true"
          className="w-full flex justify-center"
        >
          <Loader
            className="w-5 h-5 animate-spin "
            aria-label="Loading more messages"
          />
        </div>
      )}
    </section>
  );
};
