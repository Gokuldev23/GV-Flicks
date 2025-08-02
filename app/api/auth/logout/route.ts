// app/api/auth/logout/route.ts
import { getSessionData } from "@/app/lib/session";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await getSessionData();
  session.destroy();
  return NextResponse.json({ success: true });
}
