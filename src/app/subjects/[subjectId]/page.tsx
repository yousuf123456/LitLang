import React, { Suspense } from "react";

import Image from "next/image";

import prisma from "@/app/utils/prismadb";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Badge } from "@/components/ui/badge";
import { Sidebar } from "./_components/Sidebar";
import { createImageUrlFromWebViewLink } from "@/utils/utils";
import { Loader, Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getSubject } from "@/actions/getSubject";

export const revalidate = 3600;

export default async function SubjectPage({
  params,
}: {
  params: { subjectId: string };
}) {
  const subject = await getSubject(params.subjectId);

  if (!subject) return <p>Invalid Subject Id</p>;

  return (
    <Suspense key={params.subjectId} fallback={<Loading />}>
      <div className="md:max-h-[calc(100vh-89px)] max-h-[calc(100vh-73px)] md:min-h-[calc(100vh-89px)] min-h-[calc(100vh-73px)] flex">
        <Sidebar subject={subject} />

        <section
          aria-label="Subject information"
          className="md:flex-1 hidden md:flex items-center flex-col gap-16 overflow-y-auto p-5 select-none"
        >
          <Breadcrumb className="w-full">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/blogs" className="sm:text-base">
                  Subjects
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="max-w-56 sm:max-w-80 line-clamp-1 sm:text-base">
                  {subject.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <section className="flex flex-col w-full flex-1 items-center justify-center gap-5">
            <article className="w-full max-w-[420px] rounded-xl bg-zinc-50 hover:bg-white transition-colors border border-zinc-200 p-1.5 flex flex-col gap-2 group cursor-pointer z-20">
              <header className="w-full bg-white border border-zinc-200 rounded-xl p-1.5">
                <div className="rounded-xl relative w-full h-full overflow-hidden aspect-w-16 aspect-h-8">
                  <Image
                    src={createImageUrlFromWebViewLink(subject.imageUrl)}
                    alt="subject Cover Image"
                    className="object-cover group-hover:scale-105 transition-transform"
                    fill
                  />
                </div>
              </header>

              <div className="p-2 flex flex-col items-end gap-2">
                <p className="text-base md:text-lg text-zinc-700 font-medium line-clamp-2 w-full text-start h-12">
                  {subject.name}
                </p>

                <footer className="flex items-center gap-3">
                  <Badge className="bg-white text-sm text-zinc-600 font-medium border border-zinc-200 rounded-lg hover:bg-white">
                    {subject.universityShort}
                  </Badge>
                  <Badge className="bg-white text-sm text-zinc-600 font-medium border border-zinc-200 rounded-lg hover:bg-white">
                    Semester {subject.semester}
                  </Badge>
                </footer>
              </div>
            </article>

            <div
              role="complementary"
              aria-label="Additional action"
              className="flex items-center gap-4"
            >
              <div className="rounded-full p-1 border border-zinc-600">
                <Plus className="text-zinc-600 lg:w-4 lg:h-4 w-3 h-3" />
              </div>
              <h2 className="text-lg lg:text-xl font-medium text-gray-600">
                Open any file.
              </h2>
            </div>
          </section>
        </section>
      </div>
    </Suspense>
  );
}

const Loading = () => {
  return (
    <div
      aria-live="polite"
      role="status"
      className="md:max-h-[calc(100vh-89px)] max-h-[calc(100vh-73px)] md:min-h-[calc(100vh-89px)] min-h-[calc(100vh-73px)] flex"
    >
      <Skeleton className="flex max-w-full md:max-w-64 w-full lg:max-w-80 max-md:bg-zinc-100 rounded-none items-center justify-center">
        <Loader className="text-zinc-600 animate-spin md:hidden" />
      </Skeleton>

      <div className="flex-1 md:flex items-center justify-center hidden">
        <Loader className="text-zinc-700 animate-spin" />
      </div>
    </div>
  );
};
