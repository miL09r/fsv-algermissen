import type { APIRoute } from "astro";
import { clubPages } from "../../../../lib/data";
import { getCurrentUser, getDb } from "../../../../lib/server/auth";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals, cookies, redirect }) => {
  const db = await getDb(locals);
  const currentUser = await getCurrentUser(db, cookies);
  if (!db || !currentUser) return redirect("/admin?error=auth", 303);

  if (currentUser.role !== "admin") {
    const permission = await db
      .prepare(
        `SELECT id
         FROM user_content_permissions
         WHERE user_id = ? AND permission_key = 'verein' AND can_edit = 1`
      )
      .bind(currentUser.id)
      .first<{ id: number }>();

    if (!permission) return redirect("/admin?error=forbidden", 303);
  }

  const formData = await request.formData();
  const slug = String(formData.get("slug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const teaser = String(formData.get("teaser") ?? "").trim();
  const body = String(formData.get("body") ?? "")
    .split(/\r?\n\r?\n/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (!clubPages.some((page) => page.slug === slug) || !title || !teaser || body.length === 0) {
    return redirect("/admin/verein?page=invalid", 303);
  }

  const storedBody = JSON.stringify({ teaser, body });

  await db
    .prepare(
      `INSERT INTO pages (slug, title, nav_group, body, status)
       VALUES (?, ?, 'verein', ?, 'published')
       ON CONFLICT(slug) DO UPDATE SET
         title = excluded.title,
         body = excluded.body,
         status = 'published',
         updated_at = CURRENT_TIMESTAMP`
    )
    .bind(slug, title, storedBody)
    .run();

  return redirect("/admin/verein?page=ok", 303);
};
