import { cache } from "react";

import prisma from "@/app/utils/prismadb";
import { standaloneFile } from "@prisma/client";

export const getStandalone = cache(async (id: string) => {
  const standalone = (await prisma.standaloneFile.findUnique({
    where: { id },
  })) as standaloneFile | null;

  return standalone;
});
