import type { APIRoute } from "astro";
import { createSession, getDb, setSessionCookie, verifyPassword } from "../../../lib/server/auth";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals, cookies, redirect }) => {
  const db = await getDb(locals);
  if (!db) return redirect("/admin?error=db", 303);

  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  const user = await db
    .prepare(
      `SELECT users.id, users.password_hash
       FROM users
       WHERE lower(users.email) = ? AND users.is_active = 1`
    )
    .bind(email)
    .first<{ id: number; password_hash: string }>();

  let isValidPassword = false;
  if (user) {
    try {
      isValidPassword = await verifyPassword(password, user.password_hash);
    } catch (error) {
      return Response.json(
        {
          stage: "verify",
          name: error instanceof Error ? error.name : "Unknown",
          message: error instanceof Error ? error.message : "Unknown error"
        },
        { status: 500 }
      );
    }
  }

  if (!user || !isValidPassword) {
    return redirect("/admin?error=login", 303);
  }

  let session;
  try {
    session = await createSession(db, user.id);
    setSessionCookie(cookies, session.sessionId, session.expiresAt);
  } catch (error) {
    return Response.json(
      {
        stage: "session",
        name: error instanceof Error ? error.name : "Unknown",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
  return redirect("/admin", 303);
};
