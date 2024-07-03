import React, { useContext, useEffect, useMemo } from "react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { blogs } from "@prisma/client";
import { BlogContext } from "./BlogEditorContext";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export const DraftActions = ({
  initialDraft,
}: {
  initialDraft: blogs | null;
}) => {
  const draftId = useSearchParams().get("draftId");
  const { content, title, coverImage, updateOrCreateDraft, isSavingDraft } =
    useContext(BlogContext);

  const unsavedChanged = useMemo(
    (): boolean =>
      !!(
        initialDraft &&
        (title !== (initialDraft.title || undefined) ||
          content !== (initialDraft.content || undefined) ||
          coverImage !== (initialDraft.coverImage || undefined))
      ),
    [initialDraft, title, content, coverImage]
  );

  useEffect(() => {
    const onbeforeunloadFn = async (e: any) => {
      if (!unsavedChanged) return;

      e.preventDefault();
      updateOrCreateDraft({ draftId, content, title, coverImage });
    };

    window.addEventListener("beforeunload", onbeforeunloadFn);
    return () => {
      window.removeEventListener("beforeunload", onbeforeunloadFn);
    };
  }, [unsavedChanged, updateOrCreateDraft]);

  return (
    <div className="md:py-6 py-4 lg:px-16 xl:px-20 md:px-8 px-3 border-b border-zinc-300 sticky top-0 left-0 bg-white z-50">
      <div className="flex justify-between items-center w-full gap-3 sm:gap-8">
        <Link href={"/"}>
          <div className="w-full flex items-center gap-3 sm:gap-6 lg:gap-8">
            <div className="relative w-7 h-7 sm:w-9 sm:h-9">
              <Image
                alt="Company Logo"
                src={"/logo2.svg"}
                className="object-cover"
                fill
              />
            </div>

            <p className="text-2xl font-semibold text-primary hidden lg:block">
              LitLang
            </p>
          </div>
        </Link>

        <div className="flex gap-3 sm:gap-5 items-center">
          <Button
            variant={"secondary"}
            disabled={!unsavedChanged}
            onClick={() =>
              updateOrCreateDraft({ draftId, content, title, coverImage })
            }
          >
            {unsavedChanged ? "Save Draft" : "Saved"}
          </Button>
          <Button
            onClick={() =>
              updateOrCreateDraft({
                draftId,
                content,
                title,
                coverImage,
                asAnUncompletedDraft: false,
                isPublished: true,
              })
            }
          >
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
};
