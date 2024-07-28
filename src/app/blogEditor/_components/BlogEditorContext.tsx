"use client";

import React, { createContext, useEffect, useMemo, useState } from "react";
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
  unsavedChanges: true,
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
    props: RouterInput["blogs"]["updateOrCreate"]
  ) => void,
});

export default function BlogEditorContext({ draft }: { draft: blogs | null }) {
  const router = useRouter();
  const draftId = useSearchParams().get("draftId");

  const { mutateAsync, isPending } = trpc.blogs.updateOrCreate.useMutation();

  const [title, setTitle] = useState(draft?.title || "Untitled");

  const [content, setContent] = useState<string | undefined>(
    draft?.content || undefined
  );

  const [coverImage, setCoverImage] = useState<undefined | string>(
    draft?.coverImage || undefined
  );

  const unsavedChanges = useMemo((): boolean => {
    if (draft === null) return true;

    const unsavedChanges =
      title !== (draft.title || undefined) ||
      content !== (draft.content || undefined) ||
      coverImage !== (draft.coverImage || undefined);

    return unsavedChanges;
  }, [draft, title, content, coverImage]);

  const updateOrCreateDraft = (
    props: RouterInput["blogs"]["updateOrCreate"]
  ) => {
    if (!props.content || !props.coverImage || !props.title)
      return toast.error(
        "Please provide all the blogs details, cover image/blog title/blog content."
      );

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

  useEffect(() => {
    const onbeforeunloadFn = async (e: any) => {
      console.log(e);
      if (!unsavedChanges) return;

      e.preventDefault();
      updateOrCreateDraft({ draftId, content, title, coverImage });
    };

    window.addEventListener("beforeunload", onbeforeunloadFn);

    return () => {
      window.removeEventListener("beforeunload", onbeforeunloadFn);
    };
  }, [unsavedChanges, updateOrCreateDraft]);

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
        unsavedChanges,
        updateOrCreateDraft,
        isSavingDraft: isPending,
      }}
    >
      <div className="w-full h-full min-h-screen flex flex-col md:gap-8 pb-12">
        <DraftActions initialDraft={draft} />
        <BlogEditor />
      </div>
    </BlogContext.Provider>
  );
}
