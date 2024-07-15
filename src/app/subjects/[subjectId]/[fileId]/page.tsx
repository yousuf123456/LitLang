import React, { Suspense } from "react";

import prisma from "@/app/utils/prismadb";

import { Sidebar } from "../_components/Sidebar";
import { ResourceType, SubjectType } from "@/types";

import { Skeleton } from "@/components/ui/skeleton";

import { File } from "./_components/File";

export default async function FilePage({
  params,
}: {
  params: { subjectId: string; fileId: string };
}) {
  const subject = (await prisma.subject.findUnique({
    where: { id: params.subjectId },
  })) as SubjectType;

  if (!subject) return <p>Invalid Subject Id</p>;

  const file = findFileById(subject.resources, params.fileId);

  if (!file) return <p>Invalid File Id</p>;

  return (
    <div className="md:max-h-[calc(100vh-89px)] max-h-[calc(100vh-73px)] md:min-h-[calc(100vh-89px)] min-h-[calc(100vh-73px)] flex">
      <Suspense
        fallback={
          <Skeleton className="hidden md:flex w-64 lg:w-80 rounded-none " />
        }
      >
        <Sidebar subject={subject} showSubject className="hidden md:block" />
      </Suspense>

      <File file={file} subjectId={params.subjectId} />
    </div>
  );
}

const findFileById = (
  resources: ResourceType[],
  id: string
): ResourceType | null => {
  for (const resource of resources) {
    if (resource.type !== "Folder" && resource.id === id) {
      return resource;
    } else {
      const found = findFileById(resource.resources, id);

      if (found) {
        return found;
      }
    }
  }

  return null;
};
