export const maxDuration = 30;
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

import llm from "@/app/utils/llm";
import reranker from "../../utils/reranker";
import embeddings from "@/app/utils/embeddings";

import { PineconeClient } from "@/app/utils/pinecone";

import { ChatPromptTemplate } from "@langchain/core/prompts";

import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";

import { PineconeStore } from "@langchain/pinecone";

import { StructuredOutputParser } from "langchain/output_parsers";
import { StringOutputParser } from "@langchain/core/output_parsers";

import ObjectID from "bson-objectid";
import prisma from "@/app/utils/prismadb";

import { z } from "zod";
import { SubjectType } from "@/types";
import { findFileById } from "@/utils/utils";
import { currentUser } from "@clerk/nextjs/server";
import { MAX_HISTORY_MESSAGES, MessagesPerPage } from "@/pagination";
import { MultiQueryRetriever } from "langchain/retrievers/multi_query";
import { contextualizeQSystemPrompt, qaSystemPrompt } from "@/app/utils/prompt";

export async function POST(request: Request) {
  try {
    const user = await currentUser();
    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: user?.id || "",
      },
    });

    if (!user || !dbUser) {
      return new NextResponse("Unauthorized", { status: 404 });
    }

    if (dbUser.messagesQuota === 0)
      return new NextResponse("Messages Quota Reached", { status: 429 });

    const { message, subjectId, fileId } = await request.json();

    if (!message || !fileId || !subjectId) {
      return new NextResponse("Invalid Data", { status: 400 });
    }

    const subject = (await prisma.subject.findUnique({
      where: { id: subjectId },
    })) as SubjectType;

    const file = findFileById(subject?.resources, fileId);

    if (!subject || !file || !file.key) {
      return new NextResponse("Invalid Data", { status: 400 });
    }

    const oldMessagesPage = await prisma.messagesPage.findMany({
      where: { userClerkId: user.id, fileId },
      orderBy: { id: "desc" },
      take: 2,
    });

    const allOldMessages = oldMessagesPage.flatMap((msgPage) =>
      msgPage.page.reverse()
    );

    const limitedMessagesHistory = allOldMessages
      .filter((msg) => !msg.gotRejected)
      .slice(0, MAX_HISTORY_MESSAGES)
      .reverse();

    const pineconeIndex = PineconeClient.index("litlang-1");

    const store = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex,
      namespace: `Litlang/Subjects/${subject.name}/`,
      filter: {
        fileKey: file.key,
      },
    });

    const retriever = store.asRetriever({ k: 6 });

    const multiQueryRetriever = MultiQueryRetriever.fromLLM({
      llm,
      queryCount: 1,
      retriever: retriever,
      documentCompressor: reranker,
    });

    const contextualizeQPrompt = ChatPromptTemplate.fromMessages([
      ["system", contextualizeQSystemPrompt],
      ["human", "{question}"],
    ]);

    const contextualizeQChain = contextualizeQPrompt
      .pipe(llm)
      .pipe(
        StructuredOutputParser.fromZodSchema(
          z.object({ results: z.array(z.string()) })
        )
      );

    const qaPrompt = ChatPromptTemplate.fromMessages([
      ["system", qaSystemPrompt],
      ["human", "{reformulatedQueries}"],
    ]);

    let queries: string[] = [];
    let messagesUsedCount = 0;

    const ragChain = RunnableSequence.from([
      RunnablePassthrough.assign({
        queryTranslation: (input: Record<string, unknown>) => {
          return contextualizeQChain;
        },
      }),
      RunnablePassthrough.assign({
        reformulatedQueries: (input) => {
          const contextualizedQuestions: string[] =
            input.queryTranslation.results;

          const reformulatedQueries = contextualizedQuestions.map(
            (q, i) => `${i + 1}) ${q}`
          );

          queries = reformulatedQueries;
          messagesUsedCount = reformulatedQueries.length;

          return reformulatedQueries.join("\n");
        },
      }),
      RunnablePassthrough.assign({
        context: async (input) => {
          // Contextualized query and subqueries if original query was complex
          const contextualizedQuestions: string[] =
            input.queryTranslation.results;

          const allQueriesRetrievedDocs = await Promise.all(
            contextualizedQuestions.map((q) => {
              return multiQueryRetriever
                .invoke(q)
                .then((docs) => ({ retrievedDocs: docs, query: q }));
            })
          );

          const queriesDocsString = allQueriesRetrievedDocs.flatMap(
            (queryDocs) =>
              queryDocs.retrievedDocs.map((doc, i) => {
                if (i === 0)
                  return `=== For Query '${queryDocs.query}' ===\n\n[Page Number: ${doc.metadata["loc.pageNumber"]}]\n${doc.pageContent}\n\n`;
                else
                  return `[Page Number: ${doc.metadata["loc.pageNumber"]}]\n${doc.pageContent}\n\n`;
              })
          );

          const allDocsString = queriesDocsString.join("\n\n");

          return allDocsString;
        },
      }),
      qaPrompt,
      llm,
      new StringOutputParser(),
    ]);

    const aiMsg = await ragChain
      .withListeners({
        onEnd: async (run) => {
          if (!run.outputs || !run.outputs["output"]) return;

          const { output: aiResponse } = run.outputs as { output: string };

          const gotRejected = aiResponse.includes("[Out of Context]");

          const userMessage = {
            id: ObjectID().toHexString(),
            createdAt: { $date: new Date() },
            isUserMessage: true,
            text: message,
            gotRejected,
          };

          const aiMessage = {
            id: ObjectID().toHexString(),
            createdAt: { $date: new Date() },
            isUserMessage: false,
            text: aiResponse,
            gotRejected,
          };

          await prisma.$transaction([
            prisma.user.update({
              where: {
                id: dbUser.id,
              },
              data: {
                messagesQuota: dbUser.messagesQuota - messagesUsedCount,
              },
            }),
            prisma.$runCommandRaw({
              findAndModify: "messagesPage",
              query: {
                fileId,
                userClerkId: user.id,
                messagesCount: { $lt: MessagesPerPage },
              },
              update: {
                $push: {
                  page: userMessage,
                },

                $inc: {
                  messagesCount: 1,
                },

                $setOnInsert: {
                  fileId: fileId,
                  userClerkId: user.id,
                  updatedAt: { $date: new Date() },
                  createdAt: { $date: new Date() },
                },
              },
              upsert: true,
            }),
            prisma.$runCommandRaw({
              findAndModify: "messagesPage",
              query: {
                fileId,
                userClerkId: user.id,
                messagesCount: { $lt: MessagesPerPage },
              },
              update: {
                $push: {
                  page: aiMessage,
                },

                $inc: {
                  messagesCount: 1,
                },

                $setOnInsert: {
                  fileId: fileId,
                  userClerkId: user.id,
                  updatedAt: { $date: new Date() },
                  createdAt: { $date: new Date() },
                },
              },
              upsert: true,
            }),
          ]);
        },
      })
      .stream({
        question: message,
        history: `${limitedMessagesHistory.map((message) => {
          if (message.isUserMessage) return `User: ${message.text}\n`;
          return `Ai: ${message.text}\n\n`;
        })}`,
      });

    const headers = new Headers({
      "Content-Type": "text/plain",
      "X-Json-Data": JSON.stringify({
        messagesUsedCount,
        queries,
      }),
    });

    return new NextResponse(aiMsg, { headers, status: 200 });
  } catch (e) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
