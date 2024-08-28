import React from "react";

import prisma from "@/app/utils/prismadb";

import Link from "next/link";

import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";

import { SubjectType } from "@/types";
import { SubjectsList } from "./SubjectsList";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/utils";

export const Subjects = async () => {
  const subjects = await prisma.subject.findMany({ take: 6 });

  return (
    <section>
      <MaxWidthWrapper className="px-0 sm:px-16 md:py-40 py-24 flex flex-col items-center gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-center text-3xl min-[420px]:text-4xl sm:text-5xl font-[530] text-gray-800 leading-[48px] sm:leading-[60px] font-brand">
            Browse Subjects
          </h2>

          <Link
            href={"/subjects"}
            className={cn(
              buttonVariants({
                variant: "outline",
                className: " bg-white",
              }),
              "rounded-3xl"
            )}
          >
            Explore All Subjects
          </Link>
        </div>

        <SubjectsList subjects={subjects as SubjectType[]} />
      </MaxWidthWrapper>
    </section>
  );
};
