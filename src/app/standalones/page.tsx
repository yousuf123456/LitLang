import React from "react";
import { StandaloneFiles } from "./_components/StandaloneFiles";
import { StandaloneFileType } from "@prisma/client";

export default function BooksListingPage({
  searchParams,
}: {
  searchParams: { type: StandaloneFileType };
}) {
  return <StandaloneFiles type={searchParams.type} />;
}
