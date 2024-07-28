import React from "react";
import { Subjects } from "./_components/Subjects";

export default function SubjectsListPage({
  searchParams,
}: {
  searchParams: { university?: string; query?: string };
}) {
  return (
    <Subjects university={searchParams.university} query={searchParams.query} />
  );
}
