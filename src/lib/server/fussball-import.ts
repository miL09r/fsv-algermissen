import type { D1DatabaseLike } from "./auth";

type ImportSource = {
  teamSlug: string;
  url: string;
};

type ImportedMatch = {
  teamSlug: string;
  homeTeam: string;
  awayTeam: string;
  homeGoals?: number;
  awayGoals?: number;
  date: string;
  kickoffTime?: string;
  competition: string;
  matchday?: string;
  sourceUrl: string;
  status: "result" | "fixture";
};

type ImportedStandingRow = {
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

type FontTable = {
  offset: number;
  length: number;
};

const digitNames: Record<string, string> = {
  zero: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  hyphen: "-"
};

const standardGlyphNames = [
  ".notdef",
  ".null",
  "nonmarkingreturn",
  "space",
  "exclam",
  "quotedbl",
  "numbersign",
  "dollar",
  "percent",
  "ampersand",
  "quotesingle",
  "parenleft",
  "parenright",
  "asterisk",
  "plus",
  "comma",
  "hyphen",
  "period",
  "slash",
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine"
];

export const fussballImportSources: ImportSource[] = [
  {
    teamSlug: "1-herren",
    url: "https://www.fussball.de/mannschaft/fsv-algermissen-fsv-algermissen-niedersachsen/-/saison/2627/team-id/011MIC1BK8000000VTVG0001VTR8C1K7"
  },
  {
    teamSlug: "2-herren",
    url: "https://www.fussball.de/mannschaft/fsv-algermissen-ii-fsv-algermissen-niedersachsen/-/saison/2627/team-id/011MIAMK78000000VTVG0001VTR8C1K7"
  },
  {
    teamSlug: "ue32",
    url: "https://www.fussball.de/mannschaft/fsv-algermissen-fsv-algermissen-niedersachsen/-/saison/2627/team-id/01SBNP0VUG000000VS548984VTL2SVNK"
  },
  {
    teamSlug: "a-junioren",
    url: "https://www.fussball.de/mannschaft/jsg-nord-fsv-algermissen-niedersachsen/-/saison/2627/team-id/03155A9JH4000000VS5489BSVSCPI5U4"
  }
];

const fontCache = new Map<string, Promise<Record<number, string>>>();

const textDecoder = new TextDecoder();

const stripTags = (value: string) =>
  value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#8203;/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&uuml;/g, "ü")
    .replace(/&Uuml;/g, "Ü")
    .replace(/&ouml;/g, "ö")
    .replace(/&auml;/g, "ä")
    .replace(/&szlig;/g, "ß")
    .replace(/\s+/g, " ")
    .trim();

const decodeHtmlEntities = (value: string) =>
  value.replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16))).replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)));

const normalizeDate = (value: string) => {
  const match = value.match(/(\d{1,2})\.(\d{1,2})\.(\d{2,4})/);
  if (!match) return undefined;
  const year = match[3].length === 2 ? `20${match[3]}` : match[3];
  return `${year}-${match[2].padStart(2, "0")}-${match[1].padStart(2, "0")}`;
};

const normalizeTime = (value: string) => value.match(/\b(\d{1,2}:\d{2})\b/)?.[1];

const numberValue = (value: string) => Number.parseInt(value.replace(/[^\d-]/g, ""), 10) || 0;

const parseGoals = (value: string) => {
  const match = value.match(/(-?\d+)\s*:\s*(-?\d+)/);
  return {
    goalsFor: match ? Number.parseInt(match[1], 10) : 0,
    goalsAgainst: match ? Number.parseInt(match[2], 10) : 0
  };
};

const tagText = (html: string, className: string) => {
  const match = html.match(new RegExp(`<span[^>]*class=["'][^"']*${className}[^"']*["'][^>]*>([\\s\\S]*?)<\\/span>`, "i"));
  return match ? stripTags(match[1]) : undefined;
};

const readU16 = (view: DataView, offset: number) => view.getUint16(offset, false);
const readI16 = (view: DataView, offset: number) => view.getInt16(offset, false);
const readU32 = (view: DataView, offset: number) => view.getUint32(offset, false);

const readAscii = (bytes: Uint8Array, offset: number, length: number) => textDecoder.decode(bytes.slice(offset, offset + length));

const parseCmapFormat4 = (view: DataView, offset: number) => {
  const segCount = readU16(view, offset + 6) / 2;
  let cursor = offset + 14;
  const endCodes = Array.from({ length: segCount }, (_, index) => readU16(view, cursor + index * 2));
  cursor += segCount * 2 + 2;
  const startCodes = Array.from({ length: segCount }, (_, index) => readU16(view, cursor + index * 2));
  cursor += segCount * 2;
  const idDeltas = Array.from({ length: segCount }, (_, index) => readI16(view, cursor + index * 2));
  cursor += segCount * 2;
  const rangeOffsetStart = cursor;
  const idRangeOffsets = Array.from({ length: segCount }, (_, index) => readU16(view, cursor + index * 2));
  const result = new Map<number, number>();

  for (let segment = 0; segment < segCount; segment += 1) {
    for (let code = startCodes[segment]; code <= endCodes[segment] && code !== 0xffff; code += 1) {
      let glyphId = 0;
      if (idRangeOffsets[segment] === 0) {
        glyphId = (code + idDeltas[segment]) & 0xffff;
      } else {
        const glyphOffset = rangeOffsetStart + segment * 2 + idRangeOffsets[segment] + (code - startCodes[segment]) * 2;
        glyphId = readU16(view, glyphOffset);
        if (glyphId) glyphId = (glyphId + idDeltas[segment]) & 0xffff;
      }
      if (glyphId) result.set(code, glyphId);
    }
  }

  return result;
};

async function getFontMap(fontId: string) {
  if (!fontCache.has(fontId)) {
    fontCache.set(
      fontId,
      (async () => {
        const response = await fetch(`https://www.fussball.de/export.fontface/-/format/ttf/id/${fontId}/type/font`, {
          headers: { "user-agent": "FSV-Algermissen-Website/1.0 Ergebnisimport" }
        });
        if (!response.ok) return {};

        const buffer = await response.arrayBuffer();
        const view = new DataView(buffer);
        const bytes = new Uint8Array(buffer);
        const tables: Record<string, FontTable> = {};
        const tableCount = readU16(view, 4);
        for (let index = 0; index < tableCount; index += 1) {
          const offset = 12 + index * 16;
          tables[readAscii(bytes, offset, 4)] = {
            offset: readU32(view, offset + 8),
            length: readU32(view, offset + 12)
          };
        }

        if (!tables.cmap || !tables.post) return {};
        const cmapOffset = tables.cmap.offset;
        const subtableOffset = cmapOffset + readU32(view, cmapOffset + 8);
        const codeToGlyph = parseCmapFormat4(view, subtableOffset);

        const postOffset = tables.post.offset;
        const glyphCount = readU16(view, postOffset + 32);
        let cursor = postOffset + 34;
        const nameIndexes = Array.from({ length: glyphCount }, () => {
          const value = readU16(view, cursor);
          cursor += 2;
          return value;
        });
        const customNames: string[] = [];
        while (cursor < postOffset + tables.post.length) {
          const length = bytes[cursor];
          cursor += 1;
          customNames.push(readAscii(bytes, cursor, length));
          cursor += length;
        }

        const glyphNames = nameIndexes.map((index) => standardGlyphNames[index] ?? customNames[index - 258] ?? "");
        return Object.fromEntries(
          Array.from(codeToGlyph.entries()).map(([code, glyph]) => [code, digitNames[glyphNames[glyph]] ?? ""])
        );
      })()
    );
  }

  return fontCache.get(fontId)!;
}

async function decodeScorePart(matchHtml: string, className: string) {
  const match = matchHtml.match(
    new RegExp(`<span[^>]*data-obfuscation=["']([^"']+)["'][^>]*class=["'][^"']*${className}[^"']*["'][^>]*>([\\s\\S]*?)<\\/span>`, "i")
  );
  if (!match) return undefined;

  const fontMap = await getFontMap(match[1]);
  return Array.from(decodeHtmlEntities(stripTags(match[2]))).map((char) => fontMap[char.codePointAt(0) ?? 0] ?? char).join("");
}

async function decodeScore(matchHtml: string) {
  const left = await decodeScorePart(matchHtml, "score-left");
  const right = await decodeScorePart(matchHtml, "score-right");
  if (!left || !right || left.includes("-") || right.includes("-")) return undefined;
  const homeGoals = Number.parseInt(left, 10);
  const awayGoals = Number.parseInt(right, 10);
  if (Number.isNaN(homeGoals) || Number.isNaN(awayGoals)) return undefined;
  return { homeGoals, awayGoals };
}

async function parseMatchday(matchUrl: string) {
  const response = await fetch(matchUrl, {
    headers: { "user-agent": "FSV-Algermissen-Website/1.0 Ergebnisimport", accept: "text/html,application/xhtml+xml" }
  });
  if (!response.ok) return undefined;
  const html = await response.text();
  return stripTags(html.match(/<li class="row"><span>Spiel:<\/span><span>([\s\S]*?)<\/span><\/li>/i)?.[1] ?? "").split("/").at(1)?.trim();
}

async function parseSource(source: ImportSource) {
  const response = await fetch(source.url, {
    headers: { "user-agent": "FSV-Algermissen-Website/1.0 Ergebnisimport", accept: "text/html,application/xhtml+xml" }
  });
  if (!response.ok) return [];
  const html = await response.text();
  const chunks = html.match(/<li[\s\S]*?data-cycle-slider-element[\s\S]*?<\/li>/g) ?? [];
  const matches: ImportedMatch[] = [];

  for (const chunk of chunks) {
    const isFixture = /Nächstes Spiel/i.test(chunk);
    if (!/Letztes Spiel|Nächstes Spiel/i.test(chunk)) continue;
    const href = chunk.match(/<a href="([^"]*\/spiel\/[^"]+)"/i)?.[1];
    const homeTeam = tagText(chunk, "team-home");
    const awayTeam = tagText(chunk, "team-away");
    const score = isFixture ? undefined : await decodeScore(chunk);
    const meta = stripTags(chunk.match(/<div class="match-meta">([\s\S]*?)<\/div>/i)?.[1] ?? "");
    const date = normalizeDate(meta);
    if (!href || !homeTeam || !awayTeam || !date || (!isFixture && !score)) continue;

    matches.push({
      teamSlug: source.teamSlug,
      homeTeam,
      awayTeam,
      homeGoals: score?.homeGoals,
      awayGoals: score?.awayGoals,
      date,
      kickoffTime: normalizeTime(meta),
      competition: meta.split("|").at(-1)?.trim() || "FUSSBALL.DE",
      matchday: await parseMatchday(href),
      sourceUrl: href,
      status: isFixture ? "fixture" : "result"
    });
  }

  return matches;
}

function parseStandings(html: string) {
  const tableStart = html.indexOf('id="team-fixture-league-tables"');
  if (tableStart < 0) return [];
  const tableEnd = html.indexOf("</table>", tableStart);
  if (tableEnd < 0) return [];
  const tableHtml = html.slice(tableStart, tableEnd);
  const rows: ImportedStandingRow[] = [];

  for (const match of tableHtml.matchAll(/<tr([^>]*)>([\s\S]*?)<\/tr>/gi)) {
    const className = match[1] ?? "";
    const rowHtml = match[2] ?? "";
    if (!/column-rank|column-club/i.test(rowHtml)) continue;

    const position = numberValue(stripTags(rowHtml.match(/<td[^>]*class=["'][^"']*column-rank[^"']*["'][^>]*>([\s\S]*?)<\/td>/i)?.[1] ?? ""));
    const clubName = stripTags(rowHtml.match(/<div[^>]*class=["'][^"']*club-name[^"']*["'][^>]*>([\s\S]*?)<\/div>/i)?.[1] ?? "");
    const cells = Array.from(rowHtml.matchAll(/<td(?:\s[^>]*)?>([\s\S]*?)<\/td>/gi)).map((cell) => stripTags(cell[1] ?? ""));
    if (!position || !clubName || cells.length < 10) continue;

    const goals = parseGoals(cells[7] ?? "");
    rows.push({
      position,
      clubName,
      played: numberValue(cells[3] ?? ""),
      wins: numberValue(cells[4] ?? ""),
      draws: numberValue(cells[5] ?? ""),
      losses: numberValue(cells[6] ?? ""),
      goalsFor: goals.goalsFor,
      goalsAgainst: goals.goalsAgainst,
      goalDifference: numberValue(cells[8] ?? ""),
      points: numberValue(cells[9] ?? ""),
      isOwn: /\bown\b/i.test(className)
    });
  }

  return rows;
}

async function upsertMatch(db: D1DatabaseLike, match: ImportedMatch) {
  const team = await db.prepare("SELECT id, league FROM teams WHERE slug = ?").bind(match.teamSlug).first<{ id: number; league: string | null }>();
  if (!team) return "missing-team" as const;

  const existing = await db
    .prepare(
      `SELECT id FROM match_results
       WHERE team_id = ? AND played_at = ? AND home_team = ? AND away_team = ?`
    )
    .bind(team.id, match.date, match.homeTeam, match.awayTeam)
    .first<{ id: number }>();

  if (existing) {
    await db
      .prepare(
        `UPDATE match_results
         SET home_goals = ?, away_goals = ?, kickoff_time = ?, competition = ?, matchday = ?, status = ?, source_url = ?,
             show_on_homepage = 1, updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`
      )
      .bind(
        match.homeGoals ?? null,
        match.awayGoals ?? null,
        match.kickoffTime ?? null,
        match.competition || team.league || "FUSSBALL.DE",
        match.matchday ?? null,
        match.status,
        match.sourceUrl,
        existing.id
      )
      .run();
    return "updated" as const;
  }

  await db
    .prepare(
      `INSERT INTO match_results (
        team_id, home_team, away_team, home_goals, away_goals, played_at,
        kickoff_time, competition, matchday, status, report_title, source_url, show_on_homepage
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`
    )
    .bind(
      team.id,
      match.homeTeam,
      match.awayTeam,
      match.homeGoals ?? null,
      match.awayGoals ?? null,
      match.date,
      match.kickoffTime ?? null,
      match.competition || team.league || "FUSSBALL.DE",
      match.matchday ?? null,
      match.status,
      null,
      match.sourceUrl
    )
    .run();
  return "inserted" as const;
}

async function replaceStandings(db: D1DatabaseLike, source: ImportSource, rows: ImportedStandingRow[]) {
  const team = await db.prepare("SELECT id FROM teams WHERE slug = ?").bind(source.teamSlug).first<{ id: number }>();
  if (!team || rows.length === 0) return 0;

  await db.prepare("DELETE FROM team_standings WHERE team_id = ?").bind(team.id).run();
  for (const row of rows) {
    await db
      .prepare(
        `INSERT INTO team_standings (
          team_id, position, club_name, played, wins, draws, losses,
          goals_for, goals_against, goal_difference, points, is_own, source_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        team.id,
        row.position,
        row.clubName,
        row.played,
        row.wins,
        row.draws,
        row.losses,
        row.goalsFor,
        row.goalsAgainst,
        row.goalDifference,
        row.points,
        row.isOwn ? 1 : 0,
        source.url
      )
      .run();
  }

  return rows.length;
}

export async function runFussballImport(db: D1DatabaseLike, sources = fussballImportSources) {
  let parsed = 0;
  let standings = 0;
  let inserted = 0;
  let updated = 0;
  const errors: string[] = [];

  for (const source of sources) {
    try {
      const matches = await parseSource(source);
      parsed += matches.length;
      for (const match of matches) {
        const action = await upsertMatch(db, match);
        if (action === "inserted") inserted += 1;
        if (action === "updated") updated += 1;
      }
      const response = await fetch(source.url, {
        headers: { "user-agent": "FSV-Algermissen-Website/1.0 Ergebnisimport", accept: "text/html,application/xhtml+xml" }
      });
      if (response.ok) {
        standings += await replaceStandings(db, source, parseStandings(await response.text()));
      }
    } catch (error) {
      errors.push(`${source.teamSlug}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  return { parsed, standings, inserted, updated, errors };
}
