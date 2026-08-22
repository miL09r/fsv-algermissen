PRAGMA foreign_keys = OFF;

CREATE TABLE match_results_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  home_team TEXT NOT NULL,
  away_team TEXT NOT NULL,
  home_goals INTEGER,
  away_goals INTEGER,
  played_at TEXT NOT NULL,
  kickoff_time TEXT,
  competition TEXT NOT NULL,
  matchday TEXT,
  status TEXT NOT NULL DEFAULT 'result' CHECK (status IN ('result', 'fixture')),
  report_title TEXT,
  source_url TEXT,
  show_on_homepage INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO match_results_new (
  id,
  team_id,
  home_team,
  away_team,
  home_goals,
  away_goals,
  played_at,
  competition,
  matchday,
  status,
  report_title,
  source_url,
  show_on_homepage,
  updated_at
)
SELECT
  id,
  team_id,
  home_team,
  away_team,
  home_goals,
  away_goals,
  played_at,
  competition,
  matchday,
  'result',
  report_title,
  source_url,
  show_on_homepage,
  updated_at
FROM match_results;

DROP TABLE match_results;
ALTER TABLE match_results_new RENAME TO match_results;

CREATE INDEX idx_match_results_homepage ON match_results(show_on_homepage, played_at);
CREATE INDEX idx_match_results_team_status ON match_results(team_id, status, played_at);

PRAGMA foreign_keys = ON;
