import { currentSeason, matchResults, teams, type MatchResult } from "../data";
import type { D1DatabaseLike } from "./auth";

type DbMatchResultRow = {
  team_slug: string;
  team_name: string;
  home_team: string;
  away_team: string;
  home_goals: number;
  away_goals: number;
  played_at: string;
  competition: string;
  matchday: string | null;
  report_title: string | null;
  source_url: string | null;
};

const normalizeDate = (value: string) => value.slice(0, 10);

const resultKey = (result: MatchResult) =>
  [
    result.teamSlug,
    normalizeDate(result.date),
    result.homeTeam.toLowerCase(),
    result.awayTeam.toLowerCase(),
    result.homeGoals ?? "",
    result.awayGoals ?? ""
  ].join("|");

const mapDbResult = (row: DbMatchResultRow): MatchResult => ({
  teamSlug: row.team_slug,
  teamName: row.team_name,
  homeTeam: row.home_team,
  awayTeam: row.away_team,
  homeGoals: row.home_goals,
  awayGoals: row.away_goals,
  date: normalizeDate(row.played_at),
  season: currentSeason,
  competition: row.competition,
  matchday: row.matchday ?? undefined,
  reportTitle: row.report_title ?? undefined,
  sourceUrl: row.source_url ?? undefined,
  status: "result"
});

export async function getSiteMatchResults(db: D1DatabaseLike | undefined, slugs?: string[]) {
  const allowedSlugs = slugs?.length ? slugs : teams.map((team) => team.slug);
  const staticResults = matchResults.filter(
    (result) => result.season === currentSeason && allowedSlugs.includes(result.teamSlug)
  );

  if (!db) return staticResults.sort((a, b) => b.date.localeCompare(a.date));

  const placeholders = allowedSlugs.map(() => "?").join(", ");
  const query = `
    SELECT
      teams.slug AS team_slug,
      teams.name AS team_name,
      match_results.home_team,
      match_results.away_team,
      match_results.home_goals,
      match_results.away_goals,
      match_results.played_at,
      match_results.competition,
      match_results.matchday,
      match_results.report_title,
      match_results.source_url
    FROM match_results
    JOIN teams ON teams.id = match_results.team_id
    WHERE teams.slug IN (${placeholders})
    ORDER BY match_results.played_at DESC
  `;

  const dbResults = (await db.prepare(query).bind(...allowedSlugs).all<DbMatchResultRow>()).results.map(mapDbResult);
  const merged = new Map<string, MatchResult>();
  for (const result of [...staticResults, ...dbResults]) merged.set(resultKey(result), result);

  return Array.from(merged.values()).sort((a, b) => b.date.localeCompare(a.date));
}
