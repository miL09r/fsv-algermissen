import type { APIRoute } from "astro";
import { getCurrentUser, getDb } from "../../../../lib/server/auth";
import { getMediaBucket, uploadMediaFile } from "../../../../lib/server/media";

export const prerender = false;

const text = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim();

const lines = (value: string) => value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);

const paragraphs = (value: string) => value.split(/\r?\n\r?\n/).map((part) => part.trim()).filter(Boolean);

export const POST: APIRoute = async ({ request, locals, cookies, redirect }) => {
  const db = await getDb(locals);
  const currentUser = await getCurrentUser(db, cookies);
  if (!db || !currentUser) return redirect("/admin/teams?team=auth", 303);

  const formData = await request.formData();
  const slug = text(formData, "teamSlug");
  const team = await db.prepare("SELECT id FROM teams WHERE slug = ?").bind(slug).first<{ id: number }>();
  if (!team) return redirect("/admin/teams?team=invalid", 303);

  if (currentUser.role !== "admin") {
    const permission = await db
      .prepare("SELECT user_id FROM user_team_permissions WHERE user_id = ? AND team_id = ? AND can_edit_news = 1")
      .bind(currentUser.id, team.id)
      .first<{ user_id: number }>();
    if (!permission) return redirect("/admin/teams?team=forbidden", 303);
  }

  const bucket = await getMediaBucket(locals);
  const uploadedTeamImage = await uploadMediaFile(db, bucket, formData.get("teamImage"), currentUser.id);
  const teamImageUrl = uploadedTeamImage || text(formData, "imageUrl") || null;

  await db
    .prepare(
      `UPDATE teams
       SET name = ?, short_name = ?, area = ?, age_group = ?, description = ?, league = ?,
           training_location = ?, image_url = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`
    )
    .bind(
      text(formData, "name"),
      text(formData, "shortName"),
      text(formData, "area"),
      text(formData, "ageGroup") || null,
      text(formData, "description"),
      text(formData, "league") || null,
      text(formData, "trainingLocation") || null,
      teamImageUrl,
      formData.get("isActive") === "on" ? 1 : 0,
      team.id
    )
    .run();

  await db.prepare("DELETE FROM team_training_times WHERE team_id = ?").bind(team.id).run();
  for (const line of lines(text(formData, "trainingTimes"))) {
    const [weekday, startsAt, endsAt, location, note] = line.split(";").map((part) => part.trim());
    if (!weekday) continue;
    await db
      .prepare(
        `INSERT INTO team_training_times (team_id, weekday, starts_at, ends_at, location, note)
         VALUES (?, ?, ?, ?, ?, ?)`
      )
      .bind(team.id, weekday, startsAt || null, endsAt || null, location || null, note || null)
      .run();
  }

  await db.prepare("DELETE FROM team_contacts WHERE team_id = ?").bind(team.id).run();
  for (const [index, line] of lines(text(formData, "contacts")).entries()) {
    const [role, name, email, phone] = line.split(";").map((part) => part.trim());
    if (!role || !name) continue;
    await db
      .prepare(
        `INSERT INTO team_contacts (team_id, role, name, email, phone, sort_order)
         VALUES (?, ?, ?, ?, ?, ?)`
      )
      .bind(team.id, role, name, email || null, phone || null, index)
      .run();
  }

  const headline = text(formData, "headline") || text(formData, "name");
  const intro = JSON.stringify(paragraphs(text(formData, "intro")));
  await db
    .prepare(
      `INSERT INTO team_profiles (team_id, headline, intro, team_photo_url, updated_at)
       VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(team_id) DO UPDATE SET
         headline = excluded.headline,
         intro = excluded.intro,
         team_photo_url = excluded.team_photo_url,
         updated_at = CURRENT_TIMESTAMP`
    )
    .bind(team.id, headline, intro, teamImageUrl)
    .run();

  await db.prepare("DELETE FROM team_players WHERE team_id = ?").bind(team.id).run();
  const playerImageFiles = formData.getAll("playerImages");
  for (const [index, line] of lines(text(formData, "players")).entries()) {
    const [name, shirtNumber, position, imageUrl, staffMarker, bio] = line.split(";").map((part) => part.trim());
    if (!name) continue;
    const uploadedPlayerImage = await uploadMediaFile(db, bucket, playerImageFiles[index] ?? null, currentUser.id);
    await db
      .prepare(
        `INSERT INTO team_players (
          team_id, name, shirt_number, position, image_url, bio, sort_order, is_staff, is_active
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)`
      )
      .bind(
        team.id,
        name,
        shirtNumber || null,
        position || null,
        uploadedPlayerImage || imageUrl || null,
        bio || null,
        index,
        staffMarker?.toLowerCase() === "staff" ? 1 : 0
      )
      .run();
  }

  return redirect(`/admin/teams?team=ok#team-${slug}`, 303);
};
