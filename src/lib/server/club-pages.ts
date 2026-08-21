import { clubPages, type ClubContact, type ClubPage } from "../data";
import type { D1DatabaseLike } from "./auth";

type DbPageRow = {
  slug: string;
  title: string;
  body: string | null;
};

type StoredPageBody = {
  teaser?: string;
  body?: string[];
  image?: { src: string; alt: string };
  contacts?: ClubContact[];
};

const parseBody = (value: string | null) => {
  if (!value) return {};
  try {
    const parsed = JSON.parse(value) as StoredPageBody;
    if (Array.isArray(parsed.body)) return parsed;
  } catch {
    return { body: value.split(/\r?\n\r?\n/).map((part) => part.trim()).filter(Boolean) };
  }
  return {};
};

export async function getSiteClubPage(db: D1DatabaseLike | undefined, slug: string): Promise<ClubPage | undefined> {
  const fallback = clubPages.find((page) => page.slug === slug);
  if (!fallback || !db) return fallback;

  const row = await db
    .prepare("SELECT slug, title, body FROM pages WHERE slug = ? AND status = 'published'")
    .bind(slug)
    .first<DbPageRow>();

  if (!row) return fallback;

  const stored = parseBody(row.body);
  return {
    ...fallback,
    title: row.title || fallback.title,
    teaser: stored.teaser || fallback.teaser,
    body: stored.body?.length ? stored.body : fallback.body,
    image: stored.image?.src ? stored.image : fallback.image,
    contacts: stored.contacts?.length ? stored.contacts : fallback.contacts
  };
}

export async function getSiteClubPages(db: D1DatabaseLike | undefined) {
  const pages = [];
  for (const page of clubPages) pages.push((await getSiteClubPage(db, page.slug)) ?? page);
  return pages;
}
