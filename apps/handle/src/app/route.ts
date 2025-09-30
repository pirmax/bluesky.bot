import { prisma, type User } from "@repo/database";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const headersList = await headers();

  const handle = headersList.get("host") || null;

  if (!handle) {
    return NextResponse.json("No handle found in headers", {
      status: 400,
    });
  }

  const user: User | null = await prisma.user.findFirst({
    where: {
      newHandle: handle,
    },
  });

  if (!user) {
    return NextResponse.json("No user found for handle", {
      status: 404,
    });
  }

  return NextResponse.redirect(`https://bsky.app/profile/${user.did}`, {
    status: 301,
  });
}
