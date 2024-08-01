import React from "react";

import { getStandalone } from "@/actions/getStandalone";
import { PDFViewer } from "@/app/subjects/[subjectId]/[fileId]/_components/PDFViewer";
import { redirect } from "next/navigation";

export const StandaloneFile = async ({
  standaloneId,
}: {
  standaloneId: string;
}) => {
  const standalone = await getStandalone(standaloneId);

  if (!standalone) return redirect("/standalones?type=Book");

  const url = `https://litlang2.s3.amazonaws.com/${standalone.pdfKey}`;

  return (
    <PDFViewer
      pdfUrl={url}
      backUrl={
        standalone.type === "Book"
          ? `/standalones?type=Book`
          : standalone.type === "Article"
          ? `/standalones?type=Article`
          : `/standalones?type=Text`
      }
      name={standalone.name}
    />
  );
};
