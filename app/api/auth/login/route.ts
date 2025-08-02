// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db/db";
import bcrypt from "bcrypt";
import { getSessionData } from "@/app/lib/session";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const userQuery = await db.query(
    "SELECT id, email, password FROM users WHERE email = $1",
    [email]
  );

  if (userQuery.rowCount === 0) {
    return NextResponse.json({ error: "Invalid email" }, { status: 401 });
  }

  const user = userQuery.rows[0];

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const session = await getSessionData();
  session.user = { id: user.id, email: user.email };
  await session.save();

  return NextResponse.json({ success: true });
}
