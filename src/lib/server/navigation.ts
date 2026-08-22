import type { ClubPage, Team } from "../data";

const featuredTeamOrder = ["1-herren", "2-herren", "ue32"];

function sortTeamsForNavigation(teams: Team[]) {
  return [...teams].sort((a, b) => {
    const aIndex = featuredTeamOrder.indexOf(a.slug);
    const bIndex = featuredTeamOrder.indexOf(b.slug);

    if (aIndex !== -1 || bIndex !== -1) {
      return (aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex) - (bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex);
    }

    return a.shortName.localeCompare(b.shortName, "de");
  });
}

export function buildNavigation(teams: Team[], clubPages: ClubPage[]) {
  const footballTeams = sortTeamsForNavigation(teams.filter((team) => team.area !== "darts"));
  const dartsTeams = sortTeamsForNavigation(teams.filter((team) => team.area === "darts"));

  return [
    { label: "News", href: "/news" },
    {
      label: "Fussball",
      href: footballTeams[0] ? `/teams/${footballTeams[0].slug}` : "/news",
      children: footballTeams.map((team) => ({ label: team.shortName, href: `/teams/${team.slug}` }))
    },
    {
      label: "Darts",
      href: "/darts",
      children: dartsTeams.map((team) => ({ label: team.shortName, href: `/teams/${team.slug}` }))
    },
    {
      label: "Verein",
      href: "/verein/vorstand",
      children: clubPages.map((page) => ({ label: page.title, href: `/verein/${page.slug}` }))
    },
    { label: "Shop", href: "https://fsvalgermissen.fan12.de/", external: true },
    { label: "Login Bereich", href: "/admin" }
  ];
}
