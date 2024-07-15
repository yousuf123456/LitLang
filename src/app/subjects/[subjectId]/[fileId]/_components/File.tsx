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
import { getSubject } from "@/actions/getSubject";
import { findFileById } from "@/utils/utils";
import { getFile } from "@/actions/getFile";

export const File = async ({
  fileId,
  subjectId,
}: {
  fileId: string;
  subjectId: string;
}) => {
  const subject = await getSubject(subjectId);

  if (!subject) return <p>Invalid Subject Id</p>;

  const file = findFileById(subject.resources, fileId);

  if (!file) return <p>Invalid File Id</p>;

  const response = await getFile(file.id);

  const fileBlob = response.data as unknown as Blob;

  const uint8ArrayData = new Uint8Array(await fileBlob.arrayBuffer());

  return (
    <>
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
    </>
  );
};
