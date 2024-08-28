import React from "react";
import { Subjects } from "./_components/Subjects";

export default function SubjectsListPage({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  return <Subjects query={searchParams.query} />;
}
