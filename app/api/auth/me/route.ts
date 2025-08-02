// app/api/auth/me/route.ts
import { getSessionData } from "@/app/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSessionData();
  if (!session.user) {
    return NextResponse.json({ user: null });
  }
  return NextResponse.json({ user: session.user });
}
