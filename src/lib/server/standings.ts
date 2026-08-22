import type { D1DatabaseLike } from "./auth";

export type TeamStandingRow = {
  position: number;
  clubName: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  isOwn: boolean;
};

type DbStandingRow = {
  position: number;
  club_name: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goals_for: number;
  goals_against: number;
  goal_difference: number;
  points: number;
  is_own: number;
};

export async function getTeamStandings(db: D1DatabaseLike | undefined, teamSlug: string): Promise<TeamStandingRow[]> {
  if (!db) return [];

  const rows = (
    await db
      .prepare(
        `SELECT
          team_standings.position,
          team_standings.club_name,
          team_standings.played,
          team_standings.wins,
          team_standings.draws,
          team_standings.losses,
          team_standings.goals_for,
          team_standings.goals_against,
          team_standings.goal_difference,
          team_standings.points,
          team_standings.is_own
        FROM team_standings
        JOIN teams ON teams.id = team_standings.team_id
        WHERE teams.slug = ?
        ORDER BY team_standings.position ASC, team_standings.id ASC`
      )
      .bind(teamSlug)
      .all<DbStandingRow>()
  ).results;

  return rows.map((row) => ({
    position: row.position,
    clubName: row.club_name,
    played: row.played,
    wins: row.wins,
    draws: row.draws,
    losses: row.losses,
    goalsFor: row.goals_for,
    goalsAgainst: row.goals_against,
    goalDifference: row.goal_difference,
    points: row.points,
    isOwn: row.is_own === 1
  }));
}
