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
  const firstTeam = teams.find((team) => team.slug === "1-herren");
  const secondTeam = teams.find((team) => team.slug === "2-herren");
  const ue32Team = teams.find((team) => team.slug === "ue32");
  const remainingFootballTeams = footballTeams.filter((team) => !featuredTeamOrder.includes(team.slug));

  return [
    ...(firstTeam ? [{ label: firstTeam.shortName, href: `/teams/${firstTeam.slug}` }] : []),
    ...(secondTeam ? [{ label: secondTeam.shortName, href: `/teams/${secondTeam.slug}` }] : []),
    {
      label: "Darts",
      href: "/darts",
      children: dartsTeams.map((team) => ({ label: team.shortName, href: `/teams/${team.slug}` }))
    },
    ...(ue32Team ? [{ label: ue32Team.shortName, href: `/teams/${ue32Team.slug}` }] : []),
    { label: "News", href: "/news" },
    {
      label: "Fussball",
      href: remainingFootballTeams[0] ? `/teams/${remainingFootballTeams[0].slug}` : "/teams/1-herren",
      children: remainingFootballTeams.map((team) => ({ label: team.shortName, href: `/teams/${team.slug}` }))
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
