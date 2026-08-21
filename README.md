# FSV Algermissen v3 Cloudflare Edition

Neue technische Basis fuer die Website des FSV Algermissen auf Astro, Cloudflare Pages/Workers, D1 und R2.

## Status

Milestone 1 ist als lauffaehiges Fundament angelegt:

- Vereinsweite Startseite
- zentrale `/news`-Seite mit Filterlogik
- datengetriebene Teamseiten
- Jugend/JSG- und Darts-Struktur
- Admin-Login- und News-CMS-Grundgeruest
- D1-Schema mit News-Mehrfachzuordnung
- zentrale Platzhalter fuer FUSSBALL.DE Widgets
- Dokumentation der Architektur und offenen Migrationsthemen

## Entwicklung

```bash
npm install
npm run dev
npm run build
```

## Cloudflare

`wrangler.jsonc` enthaelt die geplanten Bindings:

- `DB` fuer Cloudflare D1
- `MEDIA_BUCKET` fuer Cloudflare R2
- `APP_TIMEZONE=Europe/Berlin`

Die echten Cloudflare IDs und Secrets werden ausserhalb des Repositories konfiguriert.

## Wichtige Dokumente

- [Architektur](docs/architecture.md)
- [Bestandsaufnahme](docs/content-audit.md)
- [Milestones](docs/milestones.md)
