PRAGMA foreign_keys = ON;

CREATE TABLE roles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role_id INTEGER NOT NULL REFERENCES roles(id),
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  csrf_token TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE teams (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  short_name TEXT,
  area TEXT NOT NULL,
  age_group TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  league TEXT,
  training_location TEXT,
  image_url TEXT,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE team_contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE team_training_times (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  weekday TEXT NOT NULL,
  starts_at TEXT,
  ends_at TEXT,
  location TEXT,
  note TEXT
);

CREATE TABLE user_team_permissions (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  team_id INTEGER NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  can_edit_news INTEGER NOT NULL DEFAULT 1,
  can_publish_news INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, team_id)
);

CREATE TABLE news_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE media (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  r2_key TEXT NOT NULL UNIQUE,
  filename TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  byte_size INTEGER NOT NULL,
  width INTEGER,
  height INTEGER,
  alt_text TEXT,
  uploaded_by INTEGER REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  teaser TEXT NOT NULL,
  body TEXT NOT NULL,
  hero_media_id INTEGER REFERENCES media(id),
  external_image_url TEXT,
  author_id INTEGER REFERENCES users(id),
  status TEXT NOT NULL CHECK (status IN ('draft', 'published', 'scheduled')),
  category_id INTEGER REFERENCES news_categories(id),
  published_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE news_teams (
  news_id INTEGER NOT NULL REFERENCES news(id) ON DELETE CASCADE,
  team_id INTEGER NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  PRIMARY KEY (news_id, team_id)
);

CREATE TABLE pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  nav_group TEXT,
  body TEXT,
  status TEXT NOT NULL DEFAULT 'published',
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sponsors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  logo_media_id INTEGER REFERENCES media(id),
  external_logo_url TEXT,
  website_url TEXT,
  description TEXT,
  category TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE team_sponsors (
  team_id INTEGER NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  sponsor_id INTEGER NOT NULL REFERENCES sponsors(id) ON DELETE CASCADE,
  PRIMARY KEY (team_id, sponsor_id)
);

CREATE TABLE downloads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  media_id INTEGER REFERENCES media(id),
  external_url TEXT,
  category TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_public INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE football_widgets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  provider TEXT NOT NULL DEFAULT 'fussball.de',
  club_id TEXT,
  team_external_id TEXT,
  fixture_widget_id TEXT,
  table_widget_id TEXT,
  latest_widget_id TEXT,
  upcoming_widget_id TEXT,
  season TEXT,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_news_status_published ON news(status, published_at);
CREATE INDEX idx_teams_area ON teams(area, sort_order);
CREATE INDEX idx_sponsors_category ON sponsors(category, sort_order);

INSERT INTO roles (name, description) VALUES
  ('admin', 'Kann alle Inhalte und Systemeinstellungen verwalten.'),
  ('editor', 'Kann News und Medien verwalten.'),
  ('team_editor', 'Kann Inhalte freigegebener Teams verwalten.');
