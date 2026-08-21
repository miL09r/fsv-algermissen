import type { APIRoute } from "astro";
import { getDb, hashPassword } from "../../../lib/server/auth";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const db = getDb(locals);
  if (!db) return redirect("/admin?register=db", 303);

  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const name = String(formData.get("name") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const requestedScope = formData.getAll("scope").map(String).join(",");

  if (!email || !name || password.length < 10) return redirect("/admin?register=invalid", 303);

  const existingUser = await db.prepare("SELECT id FROM users WHERE lower(email) = ?").bind(email).first();
  if (existingUser) return redirect("/admin?register=exists", 303);

  const passwordHash = await hashPassword(password);
  await db
    .prepare(
      `INSERT INTO registration_requests (email, name, password_hash, requested_scope, status)
       VALUES (?, ?, ?, ?, 'pending')`
    )
    .bind(email, name, passwordHash, requestedScope)
    .run();

  return redirect("/admin?register=pending", 303);
};
