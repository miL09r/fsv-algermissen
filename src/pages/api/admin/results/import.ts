import type { APIRoute } from "astro";
import { getCurrentUser, getDb } from "../../../../lib/server/auth";

export const prerender = false;

type ImportedMatch = {
  homeTeam: string;
  awayTeam: string;
  homeGoals: number;
  awayGoals: number;
  date: string;
  competition: string;
  matchday: string | null;
};

const text = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim();

const cleanup = (value: string) =>
  value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

const normalizeDate = (value: string) => {
  const match = value.match(/(\d{1,2})\.(\d{1,2})\.(\d{2,4})/);
  if (!match) return null;
  const year = match[3].length === 2 ? `20${match[3]}` : match[3];
  return `${year}-${match[2].padStart(2, "0")}-${match[1].padStart(2, "0")}`;
};

const extractMatches = (html: string, fallbackCompetition: string): ImportedMatch[] => {
  const plain = cleanup(html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, "\n"));
  const chunks = plain.split(/(?=\d{1,2}\.\d{1,2}\.\d{2,4})/g);
  const matches: ImportedMatch[] = [];

  for (const chunk of chunks) {
    const score = chunk.match(/(\d{1,2})\s*[:]\s*(\d{1,2})/);
    const date = normalizeDate(chunk);
    if (!score || !date) continue;

    const beforeScore = cleanup(chunk.slice(0, score.index));
    const candidates = beforeScore
      .split(/\s{2,}| - | vs\.? | gegen /i)
      .map(cleanup)
      .filter((part) => part.length > 2 && !/^\d/.test(part));

    const namedTeams = candidates.filter((part) => /FSV|Algermissen|JSG|SG|SC|FC|TSV|SV|VfB|VfL/i.test(part));
    const homeTeam = namedTeams.at(-2) ?? "Heimteam";
    const awayTeam = namedTeams.at(-1) ?? "Auswaertsteam";
    if (homeTeam === awayTeam || homeTeam === "Heimteam" || awayTeam === "Auswaertsteam") continue;

    matches.push({
      homeTeam,
      awayTeam,
      homeGoals: Number(score[1]),
      awayGoals: Number(score[2]),
      date,
      competition: fallbackCompetition || "FUSSBALL.DE",
      matchday: chunk.match(/(\d{1,2}\.\s*Spieltag)/i)?.[1] ?? null
    });
  }

  return matches.slice(0, 8);
};

export const POST: APIRoute = async ({ request, locals, cookies, redirect }) => {
  const db = await getDb(locals);
  const currentUser = await getCurrentUser(db, cookies);
  if (!db || !currentUser) return redirect("/admin/teams?import=auth#ergebnisse", 303);

  const formData = await request.formData();
  const teamSlug = text(formData, "resultTeam");
  const sourceUrl = text(formData, "sourceUrl");
  const showOnHomepage = formData.get("showOnHomepage") === "on" ? 1 : 0;

  if (!teamSlug || !sourceUrl || !sourceUrl.startsWith("https://")) {
    return redirect("/admin/teams?import=missing#ergebnisse", 303);
  }

  const team = await db
    .prepare("SELECT id, league FROM teams WHERE slug = ?")
    .bind(teamSlug)
    .first<{ id: number; league: string | null }>();
  if (!team) return redirect("/admin/teams?import=missing#ergebnisse", 303);

  if (currentUser.role !== "admin") {
    const permission = await db
      .prepare("SELECT user_id FROM user_team_permissions WHERE user_id = ? AND team_id = ? AND can_edit_news = 1")
      .bind(currentUser.id, team.id)
      .first<{ user_id: number }>();
    if (!permission) return redirect("/admin/teams?import=forbidden#ergebnisse", 303);
  }

  const response = await fetch(sourceUrl, {
    headers: {
      "user-agent": "FSV-Algermissen-Website/1.0 Ergebnisimport",
      accept: "text/html,application/xhtml+xml"
    }
  });
  if (!response.ok) return redirect("/admin/teams?import=empty#ergebnisse", 303);

  const importedMatches = extractMatches(await response.text(), team.league ?? "FUSSBALL.DE");
  if (importedMatches.length === 0) return redirect("/admin/teams?import=empty#ergebnisse", 303);

  for (const match of importedMatches) {
    const exists = await db
      .prepare(
        `SELECT id FROM match_results
         WHERE team_id = ? AND played_at = ? AND home_team = ? AND away_team = ?`
      )
      .bind(team.id, match.date, match.homeTeam, match.awayTeam)
      .first<{ id: number }>();
    if (exists) continue;

    await db
      .prepare(
        `INSERT INTO match_results (
          team_id, home_team, away_team, home_goals, away_goals, played_at,
          competition, matchday, report_title, source_url, show_on_homepage
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        team.id,
        match.homeTeam,
        match.awayTeam,
        match.homeGoals,
        match.awayGoals,
        match.date,
        match.competition,
        match.matchday,
        null,
        sourceUrl,
        showOnHomepage
      )
      .run();
  }

  return redirect("/admin/teams?import=ok#ergebnisse", 303);
};
