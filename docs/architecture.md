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
