import React from "react";
import { Subjects } from "./_components/Subjects";

export default function SubjectsListPage({
  searchParams,
}: {
  searchParams: { university?: string };
}) {
  return <Subjects university={searchParams.university} />;
}
