import React, { Suspense } from "react";

import { ResourceType } from "@/types";

import { PDFViewer } from "./PDFViewer";

import dynamic from "next/dynamic";
const AudioPlayer = dynamic(
  () => import("./AudioPlayer").then((mod) => mod.AudioPlayer),
  {
    ssr: false,
  }
);

import googleDrive from "@/app/utils/googleDrive";
import { Loader } from "lucide-react";

export const File = async ({
  file,
  subjectId,
}: {
  file: ResourceType;
  subjectId: string;
}) => {
  const response = await googleDrive.files.get({
    fileId: file.id,
    alt: "media",
  });

  const fileBlob = response.data as unknown as Blob;

  const uint8ArrayData = new Uint8Array(await fileBlob.arrayBuffer());

  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center">
          <Loader className="text-zinc-700 animate-spin" />
        </div>
      }
    >
      {file.type === "PDF" ? (
        <PDFViewer
          uint8ArrayData={uint8ArrayData}
          name={file.name}
          subjectId={subjectId}
        />
      ) : (
        <AudioPlayer
          bufferArray={Array.from(uint8ArrayData)}
          subjectId={subjectId}
          name={file.name}
        />
      )}
    </Suspense>
  );
};
