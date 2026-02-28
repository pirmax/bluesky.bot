import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  return new NextResponse("did:example:123456789", {
    headers: {
      "content-type": "text/plain",
    },
  });
}
