import React from "react";
import { StandaloneFiles } from "./_components/StandaloneFiles";
import { PaddingTopWrapper } from "@/components/PaddingTopWrapper";

export default function BooksListingPage({
  searchParams,
}: {
  searchParams: { type: string };
}) {
  return <StandaloneFiles type={searchParams.type} />;
}
