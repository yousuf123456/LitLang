"use server";

import { auth } from "@clerk/nextjs/server";

export const test = async () => {
  const { sessionId, userId, sessionClaims } = await auth();
  console.log(sessionId, userId, sessionClaims);
};
