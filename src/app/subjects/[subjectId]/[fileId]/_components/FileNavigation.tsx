import { getSubject } from "@/actions/getSubject";
import { findFileById } from "@/utils/utils";
import React from "react";
import { Sidebar } from "../../_components/Sidebar";

export const FileNavigation = async ({
  subjectId,
  fileId,
}: {
  subjectId: string;
  fileId: string;
}) => {
  const subject = await getSubject(subjectId);

  if (!subject) return <p>Invalid Subject Id</p>;

  const file = findFileById(subject.resources, fileId);

  if (!file) return <p>Invalid File Id</p>;

  return <Sidebar subject={subject} showSubject className="hidden md:block" />;
};
