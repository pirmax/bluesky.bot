import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { User } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export default async function proxy(request: NextRequest) {
  const headersList = await headers();

  const host = headersList.get("host") || null;

  if (!host) {
    return NextResponse.next();
  }

  const url = new URL(process.env.NEXT_PUBLIC_URL || "");

  if (host === url.host) {
    return NextResponse.next();
  }

  const user: User | null = await prisma.user.findFirst({
    where: {
      newHandle: host,
    },
  });

  if (!user) {
    return NextResponse.json("No user found for handle", {
      status: 404,
    });
  }

  if (request.nextUrl.pathname === "/.well-known/atproto-did") {
    return new NextResponse(user.did);
  }

  return NextResponse.redirect(
    `https://bsky.app/profile/${user.newHandle}`,
    302,
  );
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
