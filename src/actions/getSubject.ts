import { cache } from "react";

import { SubjectType } from "@/types";
import prisma from "@/app/utils/prismadb";

export const getSubject = cache(async (id: string) => {
  const subject = (await prisma.subject.findUnique({
    where: { id },
  })) as SubjectType | null;

  return subject;
});
