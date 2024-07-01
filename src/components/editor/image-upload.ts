import { trpc } from "@/app/_trpc/client";
import { BlogContext } from "@/app/blogEditor/_components/BlogEditorContext";
import { caller } from "@/trpc_server";
import { uploadFiles } from "@/utils/uploadthing";
import { useSearchParams } from "next/navigation";
import { createImageUpload } from "novel/plugins";
import { useContext } from "react";
import { toast } from "sonner";

const onUpload = (file: File) => {
  const promise = uploadFiles("imageUploader", { files: [file] });

  return new Promise((resolve) => {
    toast.promise(
      promise.then(async (res) => {
        if (res && res[0].key) {
          const { url } = res[0];
          // preload the image
          let image = new Image();
          image.src = url;
          image.onload = () => {
            resolve(url);
          };
        } else {
          throw new Error(`Error uploading image. Please try again.`);
        }
      }),
      {
        loading: "Uploading image...",
        success: "Image uploaded successfully.",
        error: (e) => e.message,
      }
    );
  });
};

export const uploadFn = createImageUpload({
  onUpload,
  validateFn: (file) => {
    if (!file.type.includes("image/")) {
      toast.error("File type not supported.");
      return false;
    } else if (file.size / 1024 / 1024 > 20) {
      toast.error("File size too big (max 20MB).");
      return false;
    }
    return true;
  },
});
