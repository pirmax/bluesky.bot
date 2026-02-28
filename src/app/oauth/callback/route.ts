import { Agent } from "@atproto/api";
import type { IronSession } from "iron-session";
import { type NextRequest, NextResponse } from "next/server";
import type { User } from "@/generated/prisma/client";
import createBlueskyClient from "@/lib/atproto";
import getSession, { type Session } from "@/lib/iron";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  // Get the next URL from the request
  const nextUrl = request.nextUrl;

  try {
    // Create a Bluesky client
    const blueskyClient = await createBlueskyClient(prisma);

    // Get the session and state from the callback
    const { session } = await blueskyClient.callback(nextUrl.searchParams);

    // Create an agent
    const agent = new Agent(session);

    // Get the profile of the user
    const { data } = await agent.getProfile({
      actor: session.did,
    });

    const user: User = await prisma.user.upsert({
      where: {
        did: data.did,
      },
      update: {
        displayName: data.displayName,
        avatar: data.avatar,
      },
      create: {
        did: data.did,
        oldHandle: data.handle,
        displayName: data.displayName,
        avatar: data.avatar,
      },
    });

    // Create a user from the Bluesky profile
    const ironSession: IronSession<Session> = await getSession();

    // Save the user to the session
    ironSession.user = user;

    // Save the session
    await ironSession.save();

    // Redirect to the private page
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/manage`);
  } catch (e: unknown) {
    if (e instanceof Error) {
      // Bluesky error
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_URL}/?error=${e.message}`,
      );
    } else {
      // Unknown error
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_URL}/?error=Unknown+error`,
      );
    }
  }
}
