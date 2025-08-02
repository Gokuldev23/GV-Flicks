import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: "movie_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

// ✅ For App Router handlers using cookies() (Edge-compatible)
export async function getSessionData() {
  const cookieStore = await cookies(); // this returns CookieStore
  const session = await getIronSession<{
    user?: { id: string; email: string };
  }>(cookieStore, sessionOptions);
  return session;
}
