PRAGMA foreign_keys = ON;

INSERT OR IGNORE INTO teams (slug, name, short_name, area, age_group, sort_order, description, league, training_location, image_url)
VALUES
  ('1-herren', '1. Herren', '1. Herren', 'senioren', NULL, 10, 'Die 1. Herren geht in dieser Saison in der Kreisliga Staffel A an den Start.', 'Kreisliga Staffel A', 'REWE-Rudat-Arena', 'https://images.ebcdn.de/club-4844/TeamImage_10821.jpg?v=5&width=1920&format=webp&mode=max'),
  ('2-herren', '2. Herren', '2. Herren', 'senioren', NULL, 20, 'Die 2. Herren geht in dieser Saison in der 2. Kreisklasse Staffel A an den Start.', '2. Kreisklasse Staffel A', 'Ostpreussen-Stadion', 'https://images.ebcdn.de/club-4844/TeamImage_10822.jpg?v=3&width=1920&format=webp&mode=max'),
  ('ue32', 'Alt-Herren (UE32)', 'UE32', 'senioren', NULL, 30, 'Die UE32 spielt in der 2. Kreisklasse 8er-Feld und trainiert mittwochs am Grasweg.', 'UE32 2. Kreisklasse Staffel A', 'Sportplatz am Grasweg', NULL),
  ('ue40', 'Alt-Senioren (UE-40)', 'UE-40', 'senioren', NULL, 40, 'Die Alt-Senioren gehoeren sichtbar zur Vereinsstruktur.', NULL, NULL, NULL),
  ('jsg-nord', 'JSG Nord', 'JSG Nord', 'jugend', NULL, 100, 'Die Jugendspielgemeinschaft ist der zentrale Einstieg in die Jugendarbeit.', NULL, NULL, 'https://images.ebcdn.de/club-4844/ArticleTeaser_90487.jpg?format=webp&height=1000&mode=crop&v=1&width=1600'),
  ('a-junioren', 'A-Junioren', 'A-Junioren', 'jugend', 'A', 110, 'Die A-Junioren der JSG Nord sind der U19-Bereich im FSV/JSG-Kontext.', 'A-Junioren Kreisliga Staffel A', 'Luehnde, Hangeraethsweg', NULL),
  ('b-junioren', 'B-Junioren', 'B-Junioren', 'jugend', 'B', 120, 'B-Junioren mit Spielbetrieb, Training, Trainerteam und aktuellen Mannschaftsinfos.', NULL, NULL, NULL),
  ('c-junioren', 'C-Junioren', 'C-Junioren', 'jugend', 'C', 130, 'C-Junioren der JSG Nord mit eigener Mannschaftsseite und aktuellen Vereinsmeldungen.', NULL, NULL, NULL),
  ('d-junioren', 'D-Junioren', 'D-Junioren', 'jugend', 'D', 140, 'D-Junioren als eigener Bereich innerhalb der JSG- und Jugendstruktur.', NULL, NULL, NULL),
  ('e-junioren', 'E-Junioren Team 1 & 2', 'E-Junioren', 'jugend', 'E', 150, 'Mehrere Teams pro Jahrgang koennen sauber abgebildet werden.', NULL, NULL, NULL),
  ('f-junioren', 'F-Junioren', 'F-Junioren', 'jugend', 'F', 160, 'F-Junioren mit Raum fuer Trainingszeiten, Ansprechpartner und kindgerechte News.', NULL, NULL, NULL),
  ('g-junioren', 'G-Junioren', 'G-Junioren', 'jugend', 'G', 170, 'G-Junioren als frueher Einstieg in den Fussball beim FSV.', NULL, NULL, NULL),
  ('bambinis', 'Bambinis', 'Bambinis', 'jugend', NULL, 180, 'Die Bambinis bekommen eine eigene Seite.', NULL, NULL, NULL),
  ('darts-a-team', 'Darts A-Team', 'A-Team', 'darts', NULL, 210, 'Das A-Team der Magpies bildet einen sichtbaren Darts-Bereich mit eigener Teamseite.', 'Bezirksklasse 4', 'Clubhaus', NULL),
  ('darts-b-team', 'Darts B-Team', 'B-Team', 'darts', NULL, 220, 'Das B-Team ist Teil der Darts-Struktur.', 'Kreisoberliga 3', 'Clubhaus', NULL),
  ('darts-c-team', 'Darts C-Team', 'C-Team', 'darts', NULL, 230, 'Das C-Team rundet den Darts-Bereich mit eigener Seite und News-Zuordnung ab.', 'Kreisklasse 06', 'Clubhaus', NULL);
