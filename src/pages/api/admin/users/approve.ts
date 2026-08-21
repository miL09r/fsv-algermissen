import type { APIRoute } from "astro";
import { getCurrentUser, getDb } from "../../../../lib/server/auth";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals, cookies, redirect }) => {
  const db = getDb(locals);
  const currentUser = await getCurrentUser(db, cookies);
  if (!db || currentUser?.role !== "admin") return redirect("/admin?error=forbidden", 303);

  const formData = await request.formData();
  const requestId = Number(formData.get("requestId"));
  const roleName = String(formData.get("role") ?? "team_editor");
  const teamSlugs = formData.getAll("teams").map(String);
  const contentKeys = formData.getAll("content").map(String);
  const canPublish = formData.get("canPublish") === "on" ? 1 : 0;

  const registration = await db
    .prepare("SELECT * FROM registration_requests WHERE id = ? AND status = 'pending'")
    .bind(requestId)
    .first<{ id: number; email: string; name: string; password_hash: string }>();
  const role = await db.prepare("SELECT id FROM roles WHERE name = ?").bind(roleName).first<{ id: number }>();
  if (!registration || !role) return redirect("/admin?approve=missing", 303);

  const existing = await db.prepare("SELECT id FROM users WHERE lower(email) = ?").bind(registration.email.toLowerCase()).first<{ id: number }>();
  let userId = existing?.id;

  if (userId) {
    await db
      .prepare("UPDATE users SET name = ?, password_hash = ?, role_id = ?, is_active = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?")
      .bind(registration.name, registration.password_hash, role.id, userId)
      .run();
  } else {
    await db
      .prepare("INSERT INTO users (email, name, password_hash, role_id, is_active) VALUES (?, ?, ?, ?, 1)")
      .bind(registration.email, registration.name, registration.password_hash, role.id)
      .run();
    userId = (await db.prepare("SELECT id FROM users WHERE lower(email) = ?").bind(registration.email.toLowerCase()).first<{ id: number }>())?.id;
  }

  if (!userId) return redirect("/admin?approve=user", 303);

  await db.prepare("DELETE FROM user_team_permissions WHERE user_id = ?").bind(userId).run();
  for (const slug of teamSlugs) {
    const team = await db.prepare("SELECT id FROM teams WHERE slug = ?").bind(slug).first<{ id: number }>();
    if (!team) continue;
    await db
      .prepare(
        `INSERT INTO user_team_permissions (user_id, team_id, can_edit_news, can_publish_news)
         VALUES (?, ?, 1, ?)`
      )
      .bind(userId, team.id, canPublish)
      .run();
  }

  await db.prepare("DELETE FROM user_content_permissions WHERE user_id = ?").bind(userId).run();
  for (const key of contentKeys) {
    await db
      .prepare(
        `INSERT INTO user_content_permissions (user_id, permission_key, can_edit, can_publish)
         VALUES (?, ?, 1, ?)`
      )
      .bind(userId, key, canPublish)
      .run();
  }

  await db
    .prepare("UPDATE registration_requests SET status = 'approved', reviewed_by = ?, reviewed_at = CURRENT_TIMESTAMP WHERE id = ?")
    .bind(currentUser.id, requestId)
    .run();

  return redirect("/admin?approve=ok", 303);
};
