"use client";
import React, { useContext, useEffect, useMemo } from "react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { blogs } from "@prisma/client";
import { BlogContext } from "./BlogEditorContext";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const DraftActions = ({
  initialDraft,
  isLoading,
}: {
  initialDraft: blogs | null;
  isLoading?: boolean;
}) => {
  const draftId = useSearchParams().get("draftId");

  const { content, title, coverImage, updateOrCreateDraft, unsavedChanges } =
    useContext(BlogContext);

  return (
    <header className="md:py-6 py-4 lg:px-16 xl:px-20 md:px-8 px-3 border-b border-zinc-300 sticky top-0 left-0 bg-white z-50">
      <div className="flex justify-between items-center w-full gap-3 sm:gap-8">
        <Link href={"/"} aria-label="Home">
          <div className="flex items-center gap-4 lg:w-[182.5px]">
            <div className="relative w-8 h-8">
              <Image
                alt="Company Logo"
                src={"/logo2.svg"}
                className="object-cover"
                fill
              />
            </div>

            <p
              className={
                "text-2xl font-medium font-brand hidden lg:block text-black transition-colors"
              }
            >
              LitLang
            </p>
          </div>
        </Link>

        <div className="flex gap-3 sm:gap-5 items-center">
          <Button
            variant={"secondary"}
            disabled={!unsavedChanges || !!isLoading}
            onClick={() =>
              updateOrCreateDraft({
                title,
                draftId,
                content,
                coverImage,
                isPublished: false,
                pendingForApproval: false,
                asAnUncompletedDraft: true,
              })
            }
          >
            {unsavedChanges ? "Save Draft" : "Saved"}
          </Button>

          <Button
            disabled={!!isLoading || initialDraft?.pendingForApproval}
            onClick={() =>
              updateOrCreateDraft({
                title,
                draftId,
                content,
                coverImage,
                isPublished: false,
                pendingForApproval: true,
                asAnUncompletedDraft: false,
              })
            }
          >
            {initialDraft?.pendingForApproval
              ? "Waiting For Approval"
              : "Publish"}
          </Button>
        </div>
      </div>
    </header>
  );
};
