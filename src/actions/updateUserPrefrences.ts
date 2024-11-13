"use server";

import prisma from "@/app/utils/prismadb";
import { auth } from "@clerk/nextjs/server";
import { UserPrefrences } from "@prisma/client";

export const updateUserPrefrences = async (userPrefrences: UserPrefrences) => {
  const { userId } = await auth();
  if (!userId) return "Unauthorized";

  await prisma.user.update({
    where: { clerkId: userId },
    data: { prefrences: userPrefrences },
  });

  return "Updated User Prefrences";
};
