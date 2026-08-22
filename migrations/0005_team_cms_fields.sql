PRAGMA foreign_keys = ON;

ALTER TABLE team_profiles ADD COLUMN team_photo_url TEXT;

ALTER TABLE team_players ADD COLUMN position TEXT;
ALTER TABLE team_players ADD COLUMN bio TEXT;
ALTER TABLE team_players ADD COLUMN is_staff INTEGER NOT NULL DEFAULT 0;

CREATE INDEX idx_teams_active_nav ON teams(is_active, area, sort_order);
