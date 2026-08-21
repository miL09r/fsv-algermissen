import type { APIRoute } from "astro";
import { createSession, getDb, setSessionCookie, verifyPassword } from "../../../lib/server/auth";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals, cookies, redirect }) => {
  const db = getDb(locals);
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

  if (!user || !(await verifyPassword(password, user.password_hash))) {
    return redirect("/admin?error=login", 303);
  }

  const session = await createSession(db, user.id);
  setSessionCookie(cookies, session.sessionId, session.expiresAt);
  return redirect("/admin", 303);
};
