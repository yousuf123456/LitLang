import React from "react";

import aws_s3 from "@/app/utils/aws-s3";
import { PDFViewer } from "./PDFViewer";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import dynamic from "next/dynamic";
const AudioPlayer = dynamic(
  () => import("./AudioPlayer").then((mod) => mod.AudioPlayer),
  {
    ssr: false,
  }
);

import { getSubject } from "@/actions/getSubject";
import { findFileById } from "@/utils/utils";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
