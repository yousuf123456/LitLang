import React from "react";

import { redirect } from "next/navigation";

import aws_s3 from "@/app/utils/aws-s3";
import { PDFViewer } from "./PDFViewer";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { getSubject } from "@/actions/getSubject";
import { findFileById } from "@/utils/utils";

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

  // const command = new GetObjectCommand({
  //   Key: file.key || "",
  //   Bucket: "litlang2",
  // });

  // const signedUrl = await getSignedUrl(aws_s3, command, {
  //   expiresIn: 3600,
  // });

  const url = `https://litlang2.s3.amazonaws.com/${file.key}`;

  return (
    <>
      {file.type === "PDF" ? (
        <PDFViewer
          backUrl={`/subjects/${subjectId}`}
          name={file.name}
          pdfUrl={url}
        />
      ) : (
        <p></p>
        // <AudioPlayer
        //   bufferArray={Array.from(uint8ArrayData)}
        //   subjectId={subjectId}
        //   name={file.name}
        // />
      )}
    </>
  );
};
