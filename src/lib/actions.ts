"use server";

import type { IronSession } from "iron-session";
import type { User } from "@/generated/prisma/client";
import createBlueskyClient, { blueskyClientMetadata } from "@/lib/atproto";
import getSession, { type Session } from "@/lib/iron";
import { prisma } from "@/lib/prisma";

export async function signInWithBluesky(handle: string): Promise<string> {
  // Create a Bluesky client
  const blueskyClient = await createBlueskyClient(prisma);

  // Get the URL to authorize the user
  const url: URL = await blueskyClient.authorize(handle, {
    scope: blueskyClientMetadata().scope,
  });

  // Return the URL
  return url.toString();
}

export async function signOut(): Promise<void> {
  // Get the session
  const session: IronSession<Session> = await getSession();

  // Destroy the session
  session.destroy();
}

export async function getUserFromSession(): Promise<User | null> {
  const session: IronSession<Session> = await getSession();

  if (!session.user) {
    return null;
  }

  const user: User | null = await prisma.user.findFirst({
    where: {
      did: session.user.did,
    },
  });

  return user;
}

export async function updateNewHandle(handle: string): Promise<User> {
  const session: IronSession<Session> = await getSession();

  if (!session.user) {
    throw new Error("No user in session");
  }

  await checkUniqueHandle(handle);

  return prisma.user.update({
    where: {
      did: session.user.did,
    },
    data: {
      newHandle: `${handle}${process.env.NEXT_PUBLIC_HANDLE_SUFFIX}`,
    },
  });
}

export async function checkUniqueHandle(handle: string): Promise<void> {
  const user: User | null = await prisma.user.findFirst({
    where: {
      newHandle: `${handle}${process.env.NEXT_PUBLIC_HANDLE_SUFFIX}`,
    },
  });

  if (user) {
    throw new Error("Handle already taken");
  }

  return;
}
