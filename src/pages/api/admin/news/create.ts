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

export const POST: APIRoute = async ({ request, locals, cookies, redirect }) => {
  const db = await getDb(locals);
  const currentUser = await getCurrentUser(db, cookies);
  if (!db || !currentUser) return redirect("/admin/news?news=auth", 303);

  const formData = await request.formData();
  const title = text(formData, "title");
  const teaser = text(formData, "teaser");
  const body = sanitizeBody(text(formData, "body"));
  const status = mapStatus(text(formData, "status"));
  const categorySlug = text(formData, "category") || "verein";
  const publishedAt = status === "published" ? new Date().toISOString() : null;
  let slug = slugify(text(formData, "slug") || title);

  if (!title || !teaser || !body || !slug) return redirect("/admin/news?news=invalid", 303);

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

  const existing = await db.prepare("SELECT id FROM news WHERE slug = ?").bind(slug).first<{ id: number }>();
  if (existing) slug = `${slug}-${Date.now().toString(36)}`;

  const bucket = await getMediaBucket(locals);
  const uploadedImage = await uploadMediaFile(db, bucket, formData.get("newsImage"), currentUser.id);
  const imageUrl = uploadedImage || text(formData, "imageUrl") || null;

  const result = await db
    .prepare(
      `INSERT INTO news (
        slug, title, teaser, body, external_image_url, author_id, status, category_id, published_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(slug, title, teaser, body, imageUrl, currentUser.id, status, category?.id ?? null, publishedAt)
    .run();

  if (!result.success) return redirect("/admin/news?news=error", 303);

  const created = await db.prepare("SELECT id FROM news WHERE slug = ?").bind(slug).first<{ id: number }>();
  const selectedTeams = formData.getAll("teams").map((value) => String(value).trim()).filter(Boolean);
  if (created && selectedTeams.length > 0) {
    const teamRows = (
      await db
        .prepare(`SELECT id, slug FROM teams WHERE slug IN (${selectedTeams.map(() => "?").join(", ")})`)
        .bind(...selectedTeams)
        .all<{ id: number; slug: string }>()
    ).results;

    for (const team of teamRows) {
      await db.prepare("INSERT OR IGNORE INTO news_teams (news_id, team_id) VALUES (?, ?)").bind(created.id, team.id).run();
    }
  }

  return redirect("/admin/news?news=ok#liste", 303);
};
