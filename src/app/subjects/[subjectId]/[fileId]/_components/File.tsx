import React from "react";

import { redirect } from "next/navigation";

// import { PDFViewer } from "./PDFViewer";
import { AudioPlayer } from "./AudioPlayer";

import { getSubject } from "@/actions/getSubject";
import { findFileById } from "@/utils/utils";
import { PDF } from "./PDF";

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

  // https://drwjw5urvo0gp.cloudfront.net
  // const pdfUrl = `https://drwjw5urvo0gp.cloudfront.net/${file.key}?bg=shhshshs`;
  const pdfUrl = `https://litlang2.s3.amazonaws.com/${file.key}`;
  const audioUrl = `https://drwjw5urvo0gp.cloudfront.net/${file.key}`;

  // Check for subscription
  if (file.isPremium && false) redirect(`/subjects/${subjectId}`);

  return (
    <>
      {file.type === "PDF" ? (
        <PDF
          aiChatAvailable={!file.isHandwritten}
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
