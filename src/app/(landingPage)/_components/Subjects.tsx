import React from "react";

import prisma from "@/app/utils/prismadb";

import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";

import { SubjectType } from "@/types";
import { SubjectsList } from "./SubjectsList";
import { Button } from "@/components/ui/button";

export const Subjects = async () => {
  const subjects = await prisma.subject.findMany({ take: 6 });

  return (
    <section>
      <MaxWidthWrapper className="px-0 sm:px-16 md:py-40 py-24 flex flex-col items-center gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-center text-3xl min-[420px]:text-4xl sm:text-5xl font-[550] text-gray-800 leading-[48px] sm:leading-[60px] font-brand">
            Browse Subjects
          </h2>

          <Button variant={"outline"} className="rounded-3xl bg-white">
            Explore All Subjects
          </Button>
        </div>

        <SubjectsList subjects={subjects as SubjectType[]} />
      </MaxWidthWrapper>
    </section>
  );
};
