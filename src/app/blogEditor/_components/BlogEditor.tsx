import React, { useContext, useRef, useState } from "react";

import Image from "next/image";
import TextArea from "react-textarea-autosize";
import { BlogContext } from "./BlogEditorContext";
import { Button } from "@/components/ui/button";
import { ContentEditor } from "./ContentEditor";

import { UploadFile } from "./UploadFile";
import { ClientUploadedFileData } from "uploadthing/types";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export const BlogEditor = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const draftId = useSearchParams().get("draftId") || undefined;

  const {
    title,
    setTitle,
    setCoverImage,
    coverImage,
    content,
    updateOrCreateDraft,
  } = useContext(BlogContext);

  const onEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  const onBlur = () => {
    setIsEditing(false);
  };

  const onImageUploadSuccess = (
    res: ClientUploadedFileData<{
      imageUrl: string;
    }>[]
  ) => {
    setCoverImage(res[0].url);
    updateOrCreateDraft({
      title,
      draftId,
      content,
      isPublished: false,
      coverImage: res[0].url,
      pendingForApproval: false,
      asAnUncompletedDraft: true,
    });
  };

  return (
    <>
      <form className="w-full mx-auto max-w-screen-xl flex-1 flex flex-col gap-10 md:gap-16 md:px-8">
        <div className="w-full flex flex-col gap-5 items-center">
          <div
            className={cn(
              "w-full h-64 md:border max-md:border-b border-zinc-200 md:rounded-lg justify-center items-center flex max-sm:flex-col gap-12 relative overflow-hidden",
              coverImage && "group md:border-0"
            )}
          >
            {!coverImage ? (
              <>
                <figure className="sm:w-[180px] sm:h-[128px] w-[150px] h-[106px] relative">
                  <Image alt="Upload Illustration" src={"/upload.svg"} fill />
                </figure>

                <Button
                  type="button"
                  variant={"secondary"}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(true);
                  }}
                  aria-label="Upload Cover Image"
                >
                  Upload Cover Image
                </Button>
              </>
            ) : (
              <>
                <Image
                  fill
                  src={coverImage}
                  alt="Blog Cover Image"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity"
                />
                <Button
                  variant={"secondary"}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(true);
                  }}
                  aria-label="Change Cover Image"
                  className="opacity-0 absolute bottom-6 right-6 group-hover:opacity-100 transition-opacity w-fit"
                >
                  Change Cover Image
                </Button>
              </>
            )}
          </div>

          {isEditing ? (
            <>
              <label className="sr-only" htmlFor="Title Textarea">
                Change Title
              </label>
              <TextArea
                value={title}
                ref={inputRef}
                onBlur={onBlur}
                id="Title Textarea"
                onKeyDown={onKeyDown}
                className="resize-none text-start focus-within:outline-none text-2xl sm:text-3xl font-bold font-primary text-gray-700 w-full max-md:px-5 mt-6"
                onChange={(e) => setTitle(e.target.value)}
              />
            </>
          ) : (
            <h1
              className="text-2xl sm:text-3xl font-bold text-start font-primary text-gray-700 w-full max-md:px-5 mt-6"
              onClick={onEdit}
            >
              {title}
            </h1>
          )}
        </div>

        <section className="max-md:px-2 h-full flex-1 flex-grow">
          <ContentEditor />
        </section>
      </form>

      <UploadFile
        open={open}
        setOpen={setOpen}
        onUploadSuccess={onImageUploadSuccess}
      />
    </>
  );
};
