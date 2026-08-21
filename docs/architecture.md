# Architekturentscheidungen

## Zielbild

Die Website wird als Astro-Anwendung fuer Cloudflare Pages/Workers gebaut. Milestone 1 nutzt lokale, typisierte Daten in `src/lib/data.ts`, damit die Informationsarchitektur, Seitenstruktur und Komponenten schon stabil sind. Spaeter ersetzt D1 diese Datenquelle schrittweise.

## Daten statt harte Seiten

Teams, News, Vereinsseiten, Sponsoren, Downloads und FUSSBALL.DE Widget-Zuordnungen liegen zentral. Dadurch koennen News mehreren Bereichen zugeordnet werden und erscheinen automatisch auf:

- der Startseite
- `/news`
- betroffenen Teamseiten
- Bereichsseiten wie Jugend/JSG Nord oder Darts

## CMS-Pfad

`/admin` ist als geschuetzter Bereich vorbereitet. In Milestone 1 ist es ein Login- und News-Verwaltungsgeruest ohne echte Session-Erstellung. Das D1-Schema enthaelt bereits Rollen, Session-Tabelle, Teamrechte, News, Medien, Downloads und Widget-Konfiguration.

## FUSSBALL.DE

Widget-IDs werden ueber `football_widgets` beziehungsweise aktuell ueber `footballWidgets` in `src/lib/data.ts` referenziert. Die Astro-Komponente rendert den offiziellen `https://www.fussball.de/widgets.js`-Loader und `data-id`/`data-type`-Container, sobald die domaingebundenen Codes aus `next.fussball.de/widgets` hinterlegt sind. Solange diese IDs fehlen, zeigt sie pro Team einen klaren Hinweis mit den bekannten FSV-Team- und Vereins-IDs aus der Bestandsseite.

Fuer kompakte Startseitenmodule wie Ergebnisbanner wird nicht das Widget-Layout erzwungen. Ergebnisse liegen zusaetzlich als `matchResults` vor und sind mit `migrations/0002_team_profiles_match_results.sql` fuer D1 vorbereitet. Dadurch kann spaeter ein geplanter Import aus FUSSBALL.DE oder eine manuelle CMS-Pflege genutzt werden, falls die offiziellen Widgets optisch nicht zur Seite passen.

## Teamprofile

Teamvorstellungen, Kaderauszuege und Team-Partner werden als eigene Inhaltsgruppe modelliert. Milestone 1 nutzt `teamProfiles` in `src/lib/data.ts`; D1 erhaelt dafuer `team_profiles`, `team_players` und `match_results`, damit Redakteure die Inhalte spaeter ohne Codeaenderung pflegen koennen.

## Medien

Bild- und Dateiuploads sind fuer R2 vorgesehen. Milestone 1 nutzt vorhandene externe Bildquellen als Migrationsanker und dokumentiert, welche Motive spaeter in R2 uebernommen werden sollten.

## Sicherheit

Das D1-Schema ist fuer serverseitige Rechtepruefung ausgelegt:

- Rollen: Admin, Redakteur, Team-Redakteur
- Teamrechte ueber `user_team_permissions`
- sichere Sessions ueber `sessions`
- eindeutige Slugs
- geplante Veroeffentlichung mit `published_at`
- Upload-Metadaten getrennt von Dateien

Passwort-Hashing, CSRF, Rate-Limiting und Upload-Validierung werden in Milestone 2/3 in den serverseitigen Actions und API-Routen umgesetzt.
