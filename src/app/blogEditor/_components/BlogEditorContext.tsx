"use client";

import React, { createContext, useEffect, useMemo, useState } from "react";
import { DraftActions } from "./../_components/DraftActions";
import { BlogEditor } from "./../_components/BlogEditor";
import { trpc } from "../../_trpc/client";
import { toast } from "sonner";
import { RouterInput } from "@/trpc_server";
import { useRouter, useSearchParams } from "next/navigation";
import { blogs } from "@prisma/client";
import { Button } from "@/components/ui/button";

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

  const [dialogOpen, setDialogOpen] = useState(false);

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

  let isPerformingAction = false;

  const updateOrCreateDraft = (
    props: RouterInput["blogs"]["updateOrCreate"]
  ) => {
    if (isPerformingAction) return;

    isPerformingAction = true;

    if (
      (!props.content || !props.coverImage || !props.title) &&
      props.pendingForApproval
    )
      return toast.error(
        "Please provide all the blogs details, cover image/blog title/blog content."
      );

    const promise = mutateAsync(props)
      .then((data) => {
        if (draftId) {
          router.refresh();
        } else router.push(`/blogEditor?draftId=${data}`);
      })
      .finally(() => (isPerformingAction = false));

    toast.promise(promise, {
      loading: props.pendingForApproval
        ? "Requesting for Publish"
        : "Saving Draft",
      success: props.pendingForApproval
        ? "Request Made Succesfully. Blog will be officially published after approval from the team."
        : "Draft Saved.",
      error: "Error saving draft. Please try again.",
    });
  };

  useEffect(() => {
    const onbeforeunloadFn = async (e: BeforeUnloadEvent) => {
      if (!unsavedChanges) return;

      e.preventDefault();
    };

    if (!draft && !coverImage && !content && title === "Untitled") return;

    window.addEventListener("beforeunload", onbeforeunloadFn);

    return () => {
      window.removeEventListener("beforeunload", onbeforeunloadFn);
    };
  }, [unsavedChanges, updateOrCreateDraft, content, coverImage, title]);

  if (draftId && !draft) {
    router.push("/blogEditor");

    return <p>Invalid Draft Id</p>;
  }

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
        <BlogEditor open={dialogOpen} setOpen={setDialogOpen} />
      </div>
    </BlogContext.Provider>
  );
}
