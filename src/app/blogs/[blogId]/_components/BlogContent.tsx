"use client";

import "@/app/prosemirror.css";

import { EditorContent, EditorRoot } from "novel";
import { defaultExtensions } from "@/components/editor/extensions";
import { slashCommand } from "@/components/editor/slash-command";
import React from "react";

const extensions = [...defaultExtensions, slashCommand];

export const BlogContent = ({ content }: { content: string }) => {
  return (
    <div className="mt-10">
      <EditorRoot>
        <EditorContent
          className="w-full"
          editable={false}
          extensions={extensions}
          editorProps={{
            attributes: {
              class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
            },
          }}
          initialContent={JSON.parse(content)}
        ></EditorContent>
      </EditorRoot>
    </div>
  );
};
