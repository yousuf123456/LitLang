import { Webhook } from "svix";
import { headers } from "next/headers";
import { clerkClient, UserJSON, WebhookEvent } from "@clerk/nextjs/server";

import prisma from "@/app/utils/prismadb";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET_KEY;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const { id } = evt.data as UserJSON;
  const eventType = evt.type;

  const client = await clerkClient();

  if (eventType === "user.created") {
    const user = await client.users.getUser(id!);

    await prisma.user.create({
      data: {
        prefrences: {
          showMultipleQuotaUsageModal: true,
        },
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress || "",
      },
    });
  }

  if (eventType === "user.updated") {
    const user = await client.users.getUser(id!);

    await prisma.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress || "",
      },
    });
  }

  if (eventType === "user.deleted") {
    await prisma.user.delete({ where: { clerkId: id! } });
  }

  return new Response("", { status: 200 });
}
