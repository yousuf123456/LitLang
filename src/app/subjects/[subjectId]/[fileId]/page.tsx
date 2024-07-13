import React, { Suspense } from "react";

import prisma from "@/app/utils/prismadb";
import googleDrive from "@/app/utils/googleDrive";

import { Sidebar } from "../_components/Sidebar";
import { ResourceType, SubjectType } from "@/types";

import { Loader } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { PDFViewer } from "./_components/PDFViewer";

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

  const response = await googleDrive.files.get({
    fileId: file.id,
    alt: "media",
  });

  const fileArrayBuffer = response.data as unknown as Blob;

  const uint8ArrayData = new Uint8Array(await fileArrayBuffer.arrayBuffer());
  return (
    <Suspense fallback={<Loading />}>
      <div className="md:max-h-[calc(100vh-89px)] max-h-[calc(100vh-73px)] md:min-h-[calc(100vh-89px)] min-h-[calc(100vh-73px)] flex">
        <Sidebar subject={subject} showSubject className="hidden md:block" />
        {/* <PDFViewer uint8ArrayData={uint8ArrayData} /> */}
      </div>
    </Suspense>
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

const Loading = () => {
  return (
    <div className="md:max-h-[calc(100vh-89px)] max-h-[calc(100vh-73px)] md:min-h-[calc(100vh-89px)] min-h-[calc(100vh-73px)] flex">
      <Skeleton className="hidden md:flex w-64 lg:w-80 rounded-none "></Skeleton>

      <div className="flex-1 flex items-center justify-center">
        <Loader className="text-zinc-700 animate-spin" />
      </div>
    </div>
  );
};
