import React from "react";

import aws_s3 from "@/app/utils/aws-s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { getStandalone } from "@/actions/getStandalone";
import { PDFViewer } from "@/app/subjects/[subjectId]/[fileId]/_components/PDFViewer";

export const StandaloneFile = async ({
  standaloneId,
}: {
  standaloneId: string;
}) => {
  const standalone = await getStandalone(standaloneId);
  if (!standalone) return <p>Invalid book/article id.</p>;

  const command = new GetObjectCommand({
    Key: standalone.pdfKey || "",
    Bucket: "litlang2",
  });

  const signedUrl = await getSignedUrl(aws_s3, command, {
    expiresIn: 900,
  });

  return (
    <PDFViewer
      pdfUrl={signedUrl}
      backUrl={"/standalones"}
      name={standalone.name}
    />
  );
};
