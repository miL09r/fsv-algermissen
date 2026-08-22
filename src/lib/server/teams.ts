import {
  teamProfiles,
  teams,
  type Team,
  type TeamArea,
  type TeamProfile
} from "../data";
import type { D1DatabaseLike } from "./auth";

type TeamRow = {
  id: number;
  slug: string;
  name: string;
  short_name: string | null;
  area: TeamArea;
  age_group: string | null;
  sort_order: number;
  description: string | null;
  league: string | null;
  training_location: string | null;
  image_url: string | null;
  is_active: number;
};

type ContactRow = {
  team_slug: string;
  role: string;
  name: string;
  email: string | null;
  phone: string | null;
  sort_order: number;
};

type TrainingRow = {
  team_slug: string;
  weekday: string;
  starts_at: string | null;
  ends_at: string | null;
  location: string | null;
  note: string | null;
};

type ProfileRow = {
  team_slug: string;
  headline: string;
  intro: string;
  team_photo_url: string | null;
};

type PlayerRow = {
  team_slug: string;
  name: string;
  shirt_number: string | null;
  position: string | null;
  image_url: string | null;
  bio: string | null;
  sort_order: number;
  is_staff: number;
  is_active: number;
};

const bySlug = <T extends { slug: string }>(items: T[]) => new Map(items.map((item) => [item.slug, item]));

const parseIntro = (value: string | null | undefined) => {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.map(String).filter(Boolean);
  } catch {
    return value.split(/\r?\n\r?\n/).map((part) => part.trim()).filter(Boolean);
  }
  return [];
};

export async function getSiteTeams(db: D1DatabaseLike | undefined, options: { includeInactive?: boolean } = {}) {
  if (!db) return options.includeInactive ? teams : teams.filter(Boolean);

  const rows = (
    await db
      .prepare(
        `SELECT id, slug, name, short_name, area, age_group, sort_order, description, league,
                training_location, image_url, is_active
         FROM teams
         ${options.includeInactive ? "" : "WHERE is_active = 1"}
         ORDER BY area, sort_order, name`
      )
      .all<TeamRow>()
  ).results;

  if (rows.length === 0) return options.includeInactive ? teams : teams.filter(Boolean);

  const contactRows = (
    await db
      .prepare(
        `SELECT teams.slug AS team_slug, team_contacts.role, team_contacts.name,
                team_contacts.email, team_contacts.phone, team_contacts.sort_order
         FROM team_contacts
         JOIN teams ON teams.id = team_contacts.team_id
         ORDER BY team_contacts.sort_order, team_contacts.id`
      )
      .all<ContactRow>()
  ).results;

  const trainingRows = (
    await db
      .prepare(
        `SELECT teams.slug AS team_slug, team_training_times.weekday, team_training_times.starts_at,
                team_training_times.ends_at, team_training_times.location, team_training_times.note
         FROM team_training_times
         JOIN teams ON teams.id = team_training_times.team_id
         ORDER BY team_training_times.id`
      )
      .all<TrainingRow>()
  ).results;

  const fallbackBySlug = bySlug(teams);

  return rows.map((row) => {
    const fallback = fallbackBySlug.get(row.slug);
    const contacts = contactRows
      .filter((contact) => contact.team_slug === row.slug)
      .map((contact) => ({
        role: contact.role,
        name: contact.name,
        email: contact.email ?? undefined,
        phone: contact.phone ?? undefined
      }));
    const trainingTimes = trainingRows
      .filter((time) => time.team_slug === row.slug)
      .map((time) =>
        [time.weekday, time.starts_at && time.ends_at ? `${time.starts_at}-${time.ends_at}` : time.starts_at, time.note]
          .filter(Boolean)
          .join(" ")
      );

    return {
      slug: row.slug,
      name: row.name,
      shortName: row.short_name || fallback?.shortName || row.name,
      area: row.area,
      ageGroup: row.age_group ?? fallback?.ageGroup,
      league: row.league ?? fallback?.league,
      description: row.description || fallback?.description || "",
      trainingTimes: trainingTimes.length ? trainingTimes : fallback?.trainingTimes ?? [],
      trainingLocation: row.training_location ?? fallback?.trainingLocation,
      contacts: contacts.length ? contacts : fallback?.contacts ?? [],
      image: row.image_url ?? fallback?.image,
      isActive: row.is_active === 1,
      sponsorSlugs: fallback?.sponsorSlugs,
      externalIds: fallback?.externalIds
    } satisfies Team;
  });
}

export async function getSiteTeam(db: D1DatabaseLike | undefined, slug: string) {
  return (await getSiteTeams(db)).find((team) => team.slug === slug);
}

export async function getSiteTeamProfile(db: D1DatabaseLike | undefined, slug: string): Promise<TeamProfile | undefined> {
  const fallback = teamProfiles.find((profile) => profile.teamSlug === slug);
  if (!db) return fallback;

  const profile = await db
    .prepare(
      `SELECT teams.slug AS team_slug, team_profiles.headline, team_profiles.intro, team_profiles.team_photo_url
       FROM team_profiles
       JOIN teams ON teams.id = team_profiles.team_id
       WHERE teams.slug = ?`
    )
    .bind(slug)
    .first<ProfileRow>();

  const players = (
    await db
      .prepare(
        `SELECT teams.slug AS team_slug, team_players.name, team_players.shirt_number,
                team_players.position, team_players.image_url, team_players.bio,
                team_players.sort_order, team_players.is_staff, team_players.is_active
         FROM team_players
         JOIN teams ON teams.id = team_players.team_id
         WHERE teams.slug = ? AND team_players.is_active = 1
         ORDER BY team_players.sort_order, team_players.id`
      )
      .bind(slug)
      .all<PlayerRow>()
  ).results;

  if (!profile && players.length === 0) return fallback;

  return {
    teamSlug: slug,
    headline: profile?.headline || fallback?.headline || "Teamvorstellung",
    intro: parseIntro(profile?.intro).length ? parseIntro(profile?.intro) : fallback?.intro ?? [],
    staff: players
      .filter((player) => player.is_staff === 1)
      .map((player) => ({ role: player.position || "Team", name: player.name })),
    players: players
      .filter((player) => player.is_staff !== 1)
      .map((player) => ({
        name: player.name,
        number: player.shirt_number ?? undefined,
        image: player.image_url ?? undefined,
        position: player.position ?? undefined,
        bio: player.bio ?? undefined
      }))
  };
}
