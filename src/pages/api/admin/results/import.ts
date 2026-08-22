import type { APIRoute } from "astro";
import { getCurrentUser, getDb } from "../../../../lib/server/auth";
import { runFussballImport } from "../../../../lib/server/fussball-import";

export const prerender = false;

const text = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim();

export const POST: APIRoute = async ({ request, locals, cookies, redirect }) => {
  const db = await getDb(locals);
  const currentUser = await getCurrentUser(db, cookies);
  if (!db || !currentUser) return redirect("/admin/teams?import=auth#ergebnisse", 303);

  const formData = await request.formData();
  const teamSlug = text(formData, "resultTeam");
  const sourceUrl = text(formData, "sourceUrl");

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

  const result = await runFussballImport(db, [{ teamSlug, url: sourceUrl }]);
  if (result.parsed === 0) return redirect("/admin/teams?import=empty#ergebnisse", 303);

  return redirect("/admin/teams?import=ok#ergebnisse", 303);
};
