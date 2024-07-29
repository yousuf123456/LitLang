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

  const command = new GetObjectCommand({
    Key: file.key || "",
    Bucket: "litlang2",
  });

  const signedUrl = await getSignedUrl(aws_s3, command, {
    expiresIn: 5,
  });

  return (
    <>
      {file.type === "PDF" ? (
        <PDFViewer
          backUrl={`/subjects/${subjectId}`}
          pdfUrl={signedUrl}
          name={file.name}
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
