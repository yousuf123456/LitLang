import { router, protectedProcedure, publicProcedure } from "./trpc";

import prisma from "@/app/utils/prismadb";
import { MessagePagesLimit } from "@/pagination";
import { ExtendedMessageType } from "@/types";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";

export const chatRouter = router({
  getMessagePages: publicProcedure
    .input(
      z.object({
        fileId: z.string(),
        cursor: z.string().nullish(),
        limit: z.number().min(1).max(100).nullish(),
      })
    )
    .query(async ({ input }) => {
      const { fileId, cursor, limit } = input;

      const user = await currentUser();

      if (!user) return { cursor: undefined, messages: [] };

      const messagePages = await prisma.messagesPage.findMany({
        take: (limit ?? MessagePagesLimit) + 1,
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        where: {
          userClerkId: user.id,
          fileId,
        },
        orderBy: {
          id: "desc",
        },
      });

      let newCursor: undefined | string;

      if (messagePages.length > (limit ?? MessagePagesLimit)) {
        const lastMessagePage = messagePages.pop();

        newCursor = lastMessagePage?.id;
      }

      const messages = messagePages.flatMap((message) =>
        message.page.reverse()
      ) as unknown as ExtendedMessageType[];

      return {
        messages: messages,
        cursor: newCursor,
      };
    }),
});
