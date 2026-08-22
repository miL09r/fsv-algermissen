PRAGMA foreign_keys = OFF;

CREATE TABLE team_standings_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  club_name TEXT NOT NULL,
  played INTEGER NOT NULL DEFAULT 0,
  wins INTEGER NOT NULL DEFAULT 0,
  draws INTEGER NOT NULL DEFAULT 0,
  losses INTEGER NOT NULL DEFAULT 0,
  goals_for INTEGER NOT NULL DEFAULT 0,
  goals_against INTEGER NOT NULL DEFAULT 0,
  goal_difference INTEGER NOT NULL DEFAULT 0,
  points INTEGER NOT NULL DEFAULT 0,
  is_own INTEGER NOT NULL DEFAULT 0,
  source_url TEXT,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO team_standings_new (
  id,
  team_id,
  position,
  club_name,
  played,
  wins,
  draws,
  losses,
  goals_for,
  goals_against,
  goal_difference,
  points,
  is_own,
  source_url,
  updated_at
)
SELECT
  id,
  team_id,
  position,
  club_name,
  played,
  wins,
  draws,
  losses,
  goals_for,
  goals_against,
  goal_difference,
  points,
  is_own,
  source_url,
  updated_at
FROM team_standings;

DROP TABLE team_standings;
ALTER TABLE team_standings_new RENAME TO team_standings;

CREATE INDEX idx_team_standings_team ON team_standings(team_id, position);

PRAGMA foreign_keys = ON;
