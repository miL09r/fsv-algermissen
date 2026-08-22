import type { APIRoute } from "astro";
import { getCurrentUser, getDb } from "../../../../lib/server/auth";
import { getMediaBucket, uploadMediaFile } from "../../../../lib/server/media";

export const prerender = false;

const text = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim();

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);

const sanitizeBody = (value: string) =>
  value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/\son[a-z]+="[^"]*"/gi, "")
    .replace(/\son[a-z]+='[^']*'/gi, "")
    .trim();

const mapStatus = (value: string) => {
  const normalized = value.toLowerCase();
  if (normalized === "draft" || normalized === "entwurf") return "draft";
  if (normalized === "scheduled" || normalized === "geplant") return "scheduled";
  return "published";
};

const categoryNames: Record<string, string> = {
  verein: "Verein",
  fussball: "Fussball",
  jugend: "Jugend",
  darts: "Darts",
  sponsoren: "Sponsoren"
};

const publishedAtValue = (status: string, formData: FormData, currentPublishedAt?: string | null) => {
  if (status !== "published") return null;
  if (currentPublishedAt) return currentPublishedAt;
  const date = text(formData, "date");
  if (date) return `${date}T12:00:00.000Z`;
  return new Date().toISOString();
};

export const POST: APIRoute = async ({ request, locals, cookies, redirect }) => {
  const db = await getDb(locals);
  const currentUser = await getCurrentUser(db, cookies);
  if (!db || !currentUser) return redirect("/admin/news?news=auth", 303);

  const formData = await request.formData();
  const originalSlug = text(formData, "originalSlug");
  const title = text(formData, "title");
  const teaser = text(formData, "teaser");
  const body = sanitizeBody(text(formData, "body"));
  const status = mapStatus(text(formData, "status"));
  const categorySlug = text(formData, "category") || "verein";
  const slug = slugify(text(formData, "slug") || title);

  if (!originalSlug || !title || !teaser || !body || !slug) return redirect("/admin/news?news=invalid#liste", 303);

  let category = await db
    .prepare("SELECT id FROM news_categories WHERE slug = ?")
    .bind(categorySlug)
    .first<{ id: number }>();
  if (!category) {
    await db
      .prepare("INSERT OR IGNORE INTO news_categories (slug, name) VALUES (?, ?)")
      .bind(categorySlug, categoryNames[categorySlug] ?? categorySlug)
      .run();
    category = await db.prepare("SELECT id FROM news_categories WHERE slug = ?").bind(categorySlug).first<{ id: number }>();
  }

  const existing = await db
    .prepare("SELECT id, published_at FROM news WHERE slug = ?")
    .bind(originalSlug)
    .first<{ id: number; published_at: string | null }>();
  const slugOwner = await db.prepare("SELECT id FROM news WHERE slug = ?").bind(slug).first<{ id: number }>();
  if (slugOwner && slugOwner.id !== existing?.id) return redirect("/admin/news?news=slug#liste", 303);

  const bucket = await getMediaBucket(locals);
  const uploadedImage = await uploadMediaFile(db, bucket, formData.get("newsImage"), currentUser.id);
  const imageUrl = uploadedImage || text(formData, "imageUrl") || text(formData, "existingImage") || null;
  const publishedAt = publishedAtValue(status, formData, existing?.published_at);

  let newsId = existing?.id;
  if (newsId) {
    const result = await db
      .prepare(
        `UPDATE news
         SET slug = ?, title = ?, teaser = ?, body = ?, external_image_url = ?,
             status = ?, category_id = ?, published_at = ?, updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`
      )
      .bind(slug, title, teaser, body, imageUrl, status, category?.id ?? null, publishedAt, newsId)
      .run();
    if (!result.success) return redirect("/admin/news?news=error#liste", 303);
  } else {
    const result = await db
      .prepare(
        `INSERT INTO news (
          slug, title, teaser, body, external_image_url, author_id, status, category_id, published_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(slug, title, teaser, body, imageUrl, currentUser.id, status, category?.id ?? null, publishedAt)
      .run();
    if (!result.success) return redirect("/admin/news?news=error#liste", 303);
    newsId = (await db.prepare("SELECT id FROM news WHERE slug = ?").bind(slug).first<{ id: number }>())?.id;
  }

  if (!newsId) return redirect("/admin/news?news=error#liste", 303);

  await db.prepare("DELETE FROM news_teams WHERE news_id = ?").bind(newsId).run();
  const selectedTeams = formData.getAll("teams").map((value) => String(value).trim()).filter(Boolean);
  if (selectedTeams.length > 0) {
    const teamRows = (
      await db
        .prepare(`SELECT id, slug FROM teams WHERE slug IN (${selectedTeams.map(() => "?").join(", ")})`)
        .bind(...selectedTeams)
        .all<{ id: number; slug: string }>()
    ).results;

    for (const team of teamRows) {
      await db.prepare("INSERT OR IGNORE INTO news_teams (news_id, team_id) VALUES (?, ?)").bind(newsId, team.id).run();
    }
  }

  return redirect(`/admin/news?news=updated#news-${slug}`, 303);
};
