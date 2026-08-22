import type { APIRoute } from "astro";
import { getCurrentUser, getDb } from "../../../../lib/server/auth";

export const prerender = false;

const parseScore = (value: string) => {
  const match = value.trim().match(/^(\d{1,2})\s*[:\-]\s*(\d{1,2})$/);
  if (!match) return null;
  return {
    homeGoals: Number(match[1]),
    awayGoals: Number(match[2])
  };
};

export const POST: APIRoute = async ({ request, locals, cookies, redirect }) => {
  const db = await getDb(locals);
  const currentUser = await getCurrentUser(db, cookies);
  if (!db || !currentUser) return redirect("/admin/teams?result=auth", 303);

  const formData = await request.formData();
  const teamSlug = String(formData.get("resultTeam") ?? "").trim();
  const homeTeam = String(formData.get("homeTeam") ?? "").trim();
  const awayTeam = String(formData.get("awayTeam") ?? "").trim();
  const score = parseScore(String(formData.get("score") ?? ""));
  const date = String(formData.get("date") ?? "").trim();
  const competition = String(formData.get("competition") ?? "").trim();
  const matchday = String(formData.get("matchday") ?? "").trim();
  const showOnHomepage = formData.get("showOnHomepage") === "on" ? 1 : 0;

  if (!teamSlug || !homeTeam || !awayTeam || !score || !date) {
    return redirect("/admin/teams?result=invalid", 303);
  }

  const team = await db.prepare("SELECT id, league FROM teams WHERE slug = ?").bind(teamSlug).first<{ id: number; league: string | null }>();
  if (!team) return redirect("/admin/teams?result=invalid", 303);

  if (currentUser.role !== "admin") {
    const permission = await db
      .prepare(
        `SELECT user_team_permissions.id
         FROM user_team_permissions
         WHERE user_id = ? AND team_id = ? AND can_edit_news = 1`
      )
      .bind(currentUser.id, team.id)
      .first<{ id: number }>();

    if (!permission) return redirect("/admin/teams?result=forbidden", 303);
  }

  await db
    .prepare(
      `INSERT INTO match_results (
        team_id,
        home_team,
        away_team,
        home_goals,
        away_goals,
        played_at,
        competition,
        matchday,
        report_title,
        source_url,
        show_on_homepage
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      team.id,
      homeTeam,
      awayTeam,
      score.homeGoals,
      score.awayGoals,
      date,
      competition || team.league || "Spielbetrieb",
      matchday || null,
      null,
      null,
      showOnHomepage
    )
    .run();

  return redirect("/admin/teams?result=ok", 303);
};
