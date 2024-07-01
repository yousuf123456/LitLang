"use client";

import React, { createContext, useEffect, useState } from "react";
import { DraftActions } from "./../_components/DraftActions";
import { BlogEditor } from "./../_components/BlogEditor";
import { trpc } from "../../_trpc/client";
import { toast } from "sonner";
import { RouterInput } from "@/trpc_server";
import { useRouter, useSearchParams } from "next/navigation";
import { blogs } from "@prisma/client";

export const BlogContext = createContext({
  title: "Untitled",
  isSavingDraft: false,
  content: "" as string | undefined,
  coverImage: "" as string | undefined,
  setContent: undefined as unknown as React.Dispatch<
    React.SetStateAction<string | undefined>
  >,
  setTitle: undefined as unknown as React.Dispatch<
    React.SetStateAction<string>
  >,
  setCoverImage: undefined as unknown as React.Dispatch<
    React.SetStateAction<string | undefined>
  >,
  updateOrCreateDraft: undefined as unknown as (
    props: RouterInput["updateOrCreateDraft"]
  ) => void,
});

export default function BlogEditorContext({ draft }: { draft: blogs | null }) {
  const draftId = useSearchParams().get("draftId");
  const router = useRouter();

  const { mutateAsync, isPending } = trpc.updateOrCreateDraft.useMutation();

  const [title, setTitle] = useState(draft?.title || "Untitled");
  const [content, setContent] = useState<string | undefined>(
    draft?.content || undefined
  );
  const [coverImage, setCoverImage] = useState<undefined | string>(
    draft?.coverImage || undefined
  );

  const updateOrCreateDraft = (props: RouterInput["updateOrCreateDraft"]) => {
    if (!props.content || !props.coverImage || !props.title)
      return toast.error("Uncompleted blog data.");

    const promise = mutateAsync(props)
      .then((data) => {
        if (draftId) {
          router.refresh();
        } else router.push(`/blogEditor?draftId=${data}`);
      })
      .then(() => {
        if (!props.asAnUncompletedDraft)
          toast.success("Blog will be officially published after approval.");
      });

    toast.promise(promise, {
      loading: "Saving Draft",
      success: "Draft Saved.",
      error: "Error saving draft. Please try again.",
    });
  };

  if (draftId && !draft) return <p>Invalid Draft Id</p>;

  return (
    <BlogContext.Provider
      value={{
        title,
        content,
        setTitle,
        setContent,
        coverImage,
        setCoverImage,
        updateOrCreateDraft,
        isSavingDraft: isPending,
      }}
    >
      <div className="w-full h-full min-h-screen flex flex-col md:gap-8 pb-12 ">
        <DraftActions initialDraft={draft} />
        <BlogEditor />
      </div>
    </BlogContext.Provider>
  );
}
