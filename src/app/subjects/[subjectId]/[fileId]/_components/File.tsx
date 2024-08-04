import React from "react";

import { redirect } from "next/navigation";

import { PDFViewer } from "./PDFViewer";

import { getSubject } from "@/actions/getSubject";
import { findFileById } from "@/utils/utils";

import dynamic from "next/dynamic";
const AudioPlayer = dynamic(
  () => import("./AudioPlayer").then((mod) => mod.AudioPlayer),
  { ssr: false }
);

export const File = async ({
  fileId,
  subjectId,
}: {
  fileId: string;
  subjectId: string;
}) => {
  const subject = await getSubject(subjectId);

  if (!subject) redirect("/subjects");

  const file = findFileById(subject.resources, fileId);

  if (!file) redirect(`/subjects/${subjectId}`);

  const pdfUrl = `https://litlang2.s3.amazonaws.com/${file.key}`;
  const audioUrl = `https://drwjw5urvo0gp.cloudfront.net/${file.key}`;

  return (
    <>
      {file.type === "PDF" ? (
        <PDFViewer
          backUrl={`/subjects/${subjectId}`}
          name={file.name}
          pdfUrl={pdfUrl}
        />
      ) : (
        <AudioPlayer
          subjectId={subjectId}
          name={file.name}
          audioUrl={audioUrl}
        />
      )}
    </>
  );
};
