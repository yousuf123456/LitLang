"use client";
import React from "react";

import dynamic from "next/dynamic";
import { StandaloneFileType } from "@prisma/client";
const PDFViewer = dynamic(
  () => import("./PDFViewer").then((mod) => mod.PDFViewer),
  { ssr: false }
);

export const PDF = (props: {
  aiChatAvailable?: boolean;
  type?: StandaloneFileType;
  bookId?: string | null;
  backUrl: string;
  pdfUrl: string;
  name: string;
}) => {
  return <PDFViewer {...props} />;
};
