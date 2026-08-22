import type { ClubPage, Team } from "../data";

export function buildNavigation(teams: Team[], clubPages: ClubPage[]) {
  return [
    { label: "News", href: "/news" },
    { label: "Kleinanzeigen", href: "/verein/kleinanzeigen" },
    {
      label: "Fussball",
      href: teams.find((team) => team.area !== "darts") ? `/teams/${teams.find((team) => team.area !== "darts")?.slug}` : "/news",
      children: teams
        .filter((team) => team.area !== "darts")
        .map((team) => ({ label: team.shortName, href: `/teams/${team.slug}` }))
    },
    {
      label: "Darts",
      href: "/darts",
      children: teams
        .filter((team) => team.area === "darts")
        .map((team) => ({ label: team.shortName, href: `/teams/${team.slug}` }))
    },
    {
      label: "Verein",
      href: "/verein/vorstand",
      children: clubPages.map((page) => ({ label: page.title, href: `/verein/${page.slug}` }))
    },
    { label: "Login Bereich", href: "/admin" }
  ];
}
