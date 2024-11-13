import React from "react";
import { StandaloneFiles } from "./_components/StandaloneFiles";
import { StandaloneFileType } from "@prisma/client";

export default async function BooksListingPage({
  searchParams,
}: {
  searchParams: Promise<{ type: StandaloneFileType }>;
}) {
  const { type } = await searchParams;

  return <StandaloneFiles type={type} />;
}
