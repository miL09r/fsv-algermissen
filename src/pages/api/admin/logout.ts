import type { APIRoute } from "astro";
import { clearSessionCookie, getDb } from "../../../lib/server/auth";

export const prerender = false;

export const POST: APIRoute = async ({ cookies, locals, redirect }) => {
  const db = getDb(locals);
  const session = cookies.get("fsv_session")?.value;
  if (db && session) await db.prepare("DELETE FROM sessions WHERE id = ?").bind(session).run();
  clearSessionCookie(cookies);
  return redirect("/admin", 303);
};
