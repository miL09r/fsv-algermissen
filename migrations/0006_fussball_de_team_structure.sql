PRAGMA foreign_keys = ON;

INSERT INTO teams (slug, name, short_name, area, age_group, sort_order, description, league, training_location, image_url, is_active)
VALUES
  ('ue40', 'Herren Ü40 - FSV Algermissen', 'Ü40', 'senioren', 'Ü40', 5, 'Herren Ü40 des FSV Algermissen im Spielbetrieb 2026/2027.', 'Kreisliga A · Kreispokal', NULL, NULL, 1),
  ('ue32', 'Herren Ü32 - FSV Algermissen', 'Ü32', 'senioren', 'Ü32', 10, 'Herren Ü32 des FSV Algermissen im Spielbetrieb 2026/2027.', 'Ü32 2.Kreisklasse Staffel A · Kreispokal Ü32 Kleinfeld', 'Sportplatz am Grasweg', NULL, 1),
  ('1-herren', 'Herren - FSV Algermissen', '1. Herren', 'senioren', NULL, 20, 'Die 1. Herren des FSV Algermissen spielt in der Saison 2026/2027 in der Kreisliga Staffel A.', 'Kreisliga Staffel A · Krombacher Kreispokal · Gilde Börde Cup 2026 · Freundschaftsspiele', 'REWE-Rudat-Arena', 'https://images.ebcdn.de/club-4844/TeamImage_10821.jpg?v=5&width=1920&format=webp&mode=max', 1),
  ('2-herren', 'Herren - FSV Algermissen II', '2. Herren', 'senioren', NULL, 30, 'Die 2. Herren des FSV Algermissen spielt in der Saison 2026/2027 in der 2. Kreisklasse Staffel A.', '2. Kreisklasse Staffel A · Freundschaftsspiele', 'Ostpreussen-Stadion', 'https://images.ebcdn.de/club-4844/TeamImage_10822.jpg?v=3&width=1920&format=webp&mode=max', 1),
  ('a-junioren', 'A-Junioren - JSG Nord', 'A-Junioren', 'jugend', 'A', 110, 'A-Junioren der JSG Nord im Spielbetrieb 2026/2027.', 'A-Junioren Kreisliga Staffel A · Kreispokal A-Junioren · Leistungsvergleich · Freundschaftsspiele', 'Luehnde, Hangeraethsweg', NULL, 1),
  ('b-junioren', 'B-Junioren - JSG Nord', 'B-Junioren', 'jugend', 'B', 120, 'B-Junioren der JSG Nord im Spielbetrieb 2026/2027.', 'B-Junioren Kreisliga Staffel A · Kreispokal B-Junioren · Freundschaftsspiele', NULL, NULL, 1),
  ('c-junioren', 'C-Junioren - JSG Nord', 'C-Junioren', 'jugend', 'C', 130, 'C-Junioren der JSG Nord im Spielbetrieb 2026/2027.', 'C-Junioren 1. KK Staffel A · Kreispokal C-Junioren · Freundschaftsspiele', NULL, NULL, 1),
  ('d-junioren', 'D-Junioren - JSG Nord', 'D-Junioren', 'jugend', 'D', 140, 'D-Junioren der JSG Nord im Spielbetrieb 2026/2027.', '1.Kreisklasse Staffel B (Hinrunde) · Kreispokal D-Junioren · Freundschaftsspiele', NULL, NULL, 1),
  ('e-junioren', 'E-Junioren - JSG Nord I', 'E-Junioren I', 'jugend', 'E', 150, 'E-Junioren JSG Nord I im Spielbetrieb 2026/2027.', '1.Kreisklasse Staffel A (Hinrunde)', NULL, NULL, 1),
  ('e-junioren-ii', 'E-Junioren - JSG Nord II', 'E-Junioren II', 'jugend', 'E', 151, 'E-Junioren JSG Nord II im Spielbetrieb 2026/2027.', '1.Kreisklasse Staffel A (Hinrunde)', NULL, NULL, 1),
  ('e-junioren-iii', 'E-Junioren - JSG Nord III', 'E-Junioren III', 'jugend', 'E', 152, 'E-Junioren JSG Nord III im Spielbetrieb 2026/2027.', '1.Kreisklasse Staffel C (Hinrunde)', NULL, NULL, 1),
  ('e-junioren-iv', 'E-Junioren - JSG Nord IV', 'E-Junioren IV', 'jugend', 'E', 153, 'E-Junioren JSG Nord IV im Spielbetrieb 2026/2027.', '1.Kreisklasse Staffel B (Hinrunde)', NULL, NULL, 1),
  ('f-junioren', 'F-Junioren - JSG Nord U9-1', 'F U9-1', 'jugend', 'F', 160, 'F-Junioren JSG Nord U9-1 im Festival-Spielbetrieb 2026/2027.', 'Festival A Kaspel 3/1', NULL, NULL, 1),
  ('f-junioren-u9-2', 'F-Junioren - JSG Nord U9-2', 'F U9-2', 'jugend', 'F', 161, 'F-Junioren JSG Nord U9-2 im Festival-Spielbetrieb 2026/2027.', 'Festival D Giften', NULL, NULL, 1),
  ('f-junioren-u8-1', 'F-Junioren - JSG Nord U8-1', 'F U8-1', 'jugend', 'F', 162, 'F-Junioren JSG Nord U8-1 im Festival-Spielbetrieb 2026/2027.', 'Festival D Giften', NULL, NULL, 1),
  ('g-junioren', 'G-Junioren - JSG Nord U7-1', 'G U7-1', 'jugend', 'G', 170, 'G-Junioren JSG Nord U7-1 im Festival-Spielbetrieb 2026/2027.', 'Festival B', NULL, NULL, 1)
ON CONFLICT(slug) DO UPDATE SET
  name = excluded.name,
  short_name = excluded.short_name,
  area = excluded.area,
  age_group = excluded.age_group,
  sort_order = excluded.sort_order,
  description = excluded.description,
  league = excluded.league,
  training_location = COALESCE(training_location, excluded.training_location),
  image_url = COALESCE(image_url, excluded.image_url),
  is_active = 1,
  updated_at = CURRENT_TIMESTAMP;
