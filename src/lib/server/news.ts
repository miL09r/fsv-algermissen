import { getPublishedNews, news as fallbackNews, type NewsItem, type NewsStatus } from "../data";
import type { D1DatabaseLike } from "./auth";

type DbNewsRow = {
  id: number;
  slug: string;
  title: string;
  teaser: string;
  body: string;
  status: NewsStatus;
  published_at: string | null;
  created_at: string;
  external_image_url: string | null;
  category_name: string | null;
  author_name: string | null;
};

type DbNewsTeamRow = {
  news_id: number;
  team_slug: string;
  area: string;
};

const normalizeDate = (value: string | null | undefined) => (value ?? new Date().toISOString()).slice(0, 10);

export async function getSiteNews(db: D1DatabaseLike | undefined, includeDrafts = false): Promise<NewsItem[]> {
  const staticItems = includeDrafts ? fallbackNews : getPublishedNews();
  if (!db) return staticItems;

  const statusFilter = includeDrafts ? "" : "WHERE news.status = 'published'";
  const rows = (
    await db
      .prepare(
        `SELECT
          news.id,
          news.slug,
          news.title,
          news.teaser,
          news.body,
          news.status,
          news.published_at,
          news.created_at,
          news.external_image_url,
          news_categories.name AS category_name,
          users.name AS author_name
        FROM news
        LEFT JOIN news_categories ON news_categories.id = news.category_id
        LEFT JOIN users ON users.id = news.author_id
        ${statusFilter}
        ORDER BY COALESCE(news.published_at, news.created_at) DESC`
      )
      .all<DbNewsRow>()
  ).results;

  const teamRows = rows.length
    ? (
        await db
          .prepare(
            `SELECT news_teams.news_id, teams.slug AS team_slug, teams.area
             FROM news_teams
             JOIN teams ON teams.id = news_teams.team_id
             WHERE news_teams.news_id IN (${rows.map(() => "?").join(", ")})`
          )
          .bind(...rows.map((row) => row.id))
          .all<DbNewsTeamRow>()
      ).results
    : [];

  const teamMap = new Map<number, DbNewsTeamRow[]>();
  for (const row of teamRows) {
    const current = teamMap.get(row.news_id) ?? [];
    current.push(row);
    teamMap.set(row.news_id, current);
  }

  const dbItems: NewsItem[] = rows.map((row) => {
    const teams = teamMap.get(row.id) ?? [];
    return {
      slug: row.slug,
      title: row.title,
      teaser: row.teaser,
      body: row.body,
      date: normalizeDate(row.published_at ?? row.created_at),
      status: row.status,
      category: row.category_name ?? "Verein",
      teamSlugs: teams.map((team) => team.team_slug),
      areaTags: Array.from(new Set(teams.map((team) => team.area))).filter(Boolean),
      image: row.external_image_url ?? undefined,
      author: row.author_name ?? "FSV Redaktion"
    };
  });

  const merged = new Map<string, NewsItem>();
  for (const item of staticItems) merged.set(item.slug, item);
  for (const item of dbItems) merged.set(item.slug, item);
  return Array.from(merged.values()).sort((a, b) => b.date.localeCompare(a.date));
}
