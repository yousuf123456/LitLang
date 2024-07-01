import React, { useState } from "react";

import Dropzone from "react-dropzone";

import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Loader2, UploadCloud, File } from "lucide-react";
import { useUploadThing } from "@/utils/uploadthing";
import { ClientUploadedFileData } from "uploadthing/types";
import { toast } from "sonner";

export const UploadFile = ({
  open,
  setOpen,
  onUploadSuccess,
}: {
  open: boolean;
  onUploadSuccess: (
    res:
      | ClientUploadedFileData<{
          imageUrl: string;
        }>[]
  ) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingProgress, setUploadingProgress] = useState(0);

  const { startUpload } = useUploadThing("imageUploader");

  let interval: string | number | NodeJS.Timeout | undefined;
  const startProgressInterval = () => {
    interval = setInterval(() => {
      setUploadingProgress((prev) => {
        if (prev < 95) return prev + 5;

        clearInterval(interval);
        return prev;
      });
    }, 400);
  };

  const onDrop = async (acceptedFiles: File[]) => {
    setIsUploading(true);
    setUploadingProgress(0);

    startProgressInterval();

    const res = await startUpload(acceptedFiles);

    setOpen(false);
    setIsUploading(false);
    clearInterval(interval);
    setUploadingProgress(100);

    if (!res || !res[0].key) {
      return toast.error("Uploading image failed!", {
        description: "Try uploading later",
      });
    }

    onUploadSuccess(res);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <Dropzone multiple={false} onDrop={onDrop}>
          {({ getRootProps, getInputProps, acceptedFiles }) => (
            <div className="mt-4 w-full flex flex-col" {...getRootProps()}>
              <div className="min-h-64 max-h-64 flex flex-1 rounded-lg border border-dashed border-zinc-300 hover:border-zinc-400 transition-opacity">
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <div className="p-2 rounded-full aspect-square max-w-fit bg-white shadow-lg border border-zinc-200">
                    <UploadCloud className="h-7 w-7 text-zinc-600" />
                  </div>

                  <label htmlFor="dropzone-file-input" className="text-center ">
                    <h3 className="mt-3 text-lg font-semibold text-zinc-700">
                      Drag & Drop or Select File
                    </h3>
                    <p className="text-sm text-zinc-500 mt-1">
                      Upto {"4MB"} of data files
                    </p>
                  </label>

                  {acceptedFiles && acceptedFiles.length > 0 && isUploading && (
                    <div className="w-full flex items-center flex-col mt-8">
                      <div className="flex items-center gap-3">
                        <File className="w-5 h-5 text-primary/60" />
                        <p className="text-sm text-zinc-600 mt-0.5">
                          {acceptedFiles[0].name}
                        </p>
                      </div>

                      <Progress
                        value={uploadingProgress}
                        className="h-1 max-w-xs w-full mx-auto mt-3"
                        indicatorColor={
                          uploadingProgress === 100 ? "text-green-500" : ""
                        }
                      />

                      {uploadingProgress === 100 && (
                        <div className="mt-1 flex justify-center w-full gap-3">
                          <Loader2 className="text-primary w-5 h-5 animate-spin" />
                          <p className="text-sm text-zinc-500">Redirecting</p>
                        </div>
                      )}
                    </div>
                  )}

                  <input
                    id="dropzone-file-input"
                    {...getInputProps()}
                    type="file"
                    hidden
                  />
                </div>
              </div>
            </div>
          )}
        </Dropzone>
      </DialogContent>
    </Dialog>
  );
};
