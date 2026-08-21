export type TeamArea = "senioren" | "jugend" | "darts";
export type NewsStatus = "draft" | "published" | "scheduled";

export type Team = {
  slug: string;
  name: string;
  shortName: string;
  area: TeamArea;
  ageGroup?: string;
  league?: string;
  description: string;
  trainingTimes: string[];
  trainingLocation?: string;
  contacts: Array<{ role: string; name: string; email?: string; phone?: string }>;
  image?: string;
  sponsorSlugs?: string[];
  externalIds?: {
    clubId?: string;
    teamId?: string;
    leagueId?: string;
    currentWebsiteUrl?: string;
  };
};

export type TeamProfile = {
  teamSlug: string;
  headline: string;
  intro: string[];
  staff: Array<{ role: string; name: string }>;
  players: Array<{ name: string; number?: string; image?: string }>;
};

export type MatchResult = {
  teamSlug: string;
  teamName: string;
  homeTeam: string;
  awayTeam: string;
  homeGoals?: number;
  awayGoals?: number;
  date: string;
  kickoffTime?: string;
  season: string;
  competition: string;
  matchday?: string;
  reportTitle?: string;
  sourceUrl?: string;
  status?: "result" | "fixture";
};

export type FootballWidgetConfig = {
  fixtureWidgetId?: string;
  fixtureWidgetType?: string;
  tableWidgetId?: string;
  tableWidgetType?: string;
  latestWidgetId?: string;
  latestWidgetType?: string;
  upcomingWidgetId?: string;
  upcomingWidgetType?: string;
  fussballDeUrl?: string;
  note?: string;
};

export type NewsItem = {
  slug: string;
  title: string;
  teaser: string;
  body: string;
  date: string;
  status: NewsStatus;
  category: string;
  teamSlugs: string[];
  areaTags: string[];
  image?: string;
  author: string;
};

export type Sponsor = {
  slug: string;
  name: string;
  category: "Premium-Partner" | "Exklusiv-Partner" | "Partner" | "Team-Sponsor";
  website?: string;
  description?: string;
  logoUrl?: string;
};

export type ClubPage = {
  slug: string;
  title: string;
  teaser: string;
  body: string[];
  ctaLabel?: string;
  ctaHref?: string;
};

export const site = {
  name: "FSV Algermissen",
  fullName: "FSV Algermissen v. 1911 / 1990 e.V.",
  description:
    "Die neue Vereinswebsite fuer Herren, Jugend, Darts, Vorstand, Vereinsleben, Sportstaetten und Sponsoren.",
  colors: {
    blue: "#0069b4",
    black: "#101820",
    white: "#ffffff"
  },
  socialLinks: [
    { label: "Instagram", href: "https://www.instagram.com/fsvalgermissen/" },
    { label: "JSG Nord Facebook", href: "https://www.facebook.com/elsternkids/" },
    { label: "FUSSBALL.DE", href: "https://www.fussball.de/" }
  ]
};

export const currentSeason = "2026/2027";

export const teams: Team[] = [
  {
    slug: "1-herren",
    name: "1. Herren",
    shortName: "1. Herren",
    area: "senioren",
    league: "Kreisliga Staffel A",
    description:
      "Die 1. Herren geht in dieser Saison in der Kreisliga Staffel A an den Start.",
    trainingTimes: ["Dienstag 19:00-21:00", "Donnerstag 19:00-21:00"],
    trainingLocation: "REWE-Rudat-Arena",
    contacts: [{ role: "Sportliche Leitung", name: "FSV Algermissen" }],
    image: "https://images.ebcdn.de/club-4844/TeamImage_10821.jpg?v=5&width=1920&format=webp&mode=max",
    sponsorSlugs: ["cosmophone"],
    externalIds: {
      clubId: "4844",
      teamId: "10821",
      leagueId: "3496",
      currentWebsiteUrl: "https://www.fsvalgermissen.de/mannschaft/10821/1-herren"
    }
  },
  {
    slug: "2-herren",
    name: "2. Herren",
    shortName: "2. Herren",
    area: "senioren",
    league: "2. Kreisklasse Staffel A",
    description:
      "Die 2. Herren geht in dieser Saison in der 2. Kreisklasse Staffel A an den Start.",
    trainingTimes: ["Dienstag 19:00-21:00", "Donnerstag 19:00-21:00"],
    trainingLocation: "Ostpreussen-Stadion",
    contacts: [
      { role: "Trainer", name: "Wolf Daniel Busche" },
      { role: "Co-Trainer", name: "Marc Baxmann" }
    ],
    image: "https://images.ebcdn.de/club-4844/TeamImage_10822.jpg?v=3&width=1920&format=webp&mode=max",
    sponsorSlugs: ["coiffeur-juan"],
    externalIds: {
      clubId: "4844",
      teamId: "10822",
      currentWebsiteUrl: "https://www.fsvalgermissen.de/mannschaft/10822/2-herren"
    }
  },
  {
    slug: "ue32",
    name: "Alt-Herren (UE32)",
    shortName: "UE32",
    area: "senioren",
    league: "UE32 2. Kreisklasse Staffel A",
    description:
      "Die UE32 spielt in der 2. Kreisklasse 8er-Feld und trainiert mittwochs am Grasweg.",
    trainingTimes: ["Mittwoch 19:00"],
    trainingLocation: "Sportplatz am Grasweg",
    contacts: [{ role: "Ansprechpartner", name: "Alexander Reslan", email: "alexander.reslan@fsvalgermissen.de" }],
    sponsorSlugs: ["gasthaus-weiterer"],
    externalIds: {
      clubId: "4844",
      teamId: "10824",
      currentWebsiteUrl: "https://www.fsvalgermissen.de/mannschaft/10824/alt-herren-(ue-32)"
    }
  },
  {
    slug: "ue40",
    name: "Alt-Senioren (UE-40)",
    shortName: "UE-40",
    area: "senioren",
    description:
      "Die Alt-Senioren gehoeren sichtbar zur Vereinsstruktur und erhalten eigene Inhalte.",
    trainingTimes: ["nach Absprache"],
    contacts: [{ role: "Ansprechpartner", name: "FSV Algermissen" }],
    externalIds: {
      clubId: "4844",
      teamId: "10825",
      currentWebsiteUrl: "https://www.fsvalgermissen.de/mannschaft/10825/alt-senioren-(ue-40)"
    }
  },
  {
    slug: "jsg-nord",
    name: "JSG Nord",
    shortName: "JSG Nord",
    area: "jugend",
    description:
      "Die Jugendspielgemeinschaft ist der zentrale Einstieg in die Jugendarbeit und verknuepft die Jahrgaenge von A bis Bambinis.",
    trainingTimes: ["jahrgangsabhaengig"],
    contacts: [{ role: "Jugend", name: "Maik Hartmann" }],
    image: "https://images.ebcdn.de/club-4844/ArticleTeaser_90487.jpg?format=webp&height=1000&mode=crop&v=1&width=1600",
    externalIds: {
      clubId: "4844",
      currentWebsiteUrl: "https://www.fsvalgermissen.de/jsg-nord"
    }
  },
  {
    slug: "a-junioren",
    name: "A-Junioren",
    shortName: "A-Junioren",
    area: "jugend",
    ageGroup: "A",
    league: "A-Junioren Kreisliga Staffel A",
    description: "Die A-Junioren der JSG Nord sind der U19-Bereich im FSV/JSG-Kontext.",
    trainingTimes: ["Montag 17:00-18:30", "Donnerstag 17:00-18:30"],
    trainingLocation: "Luehnde, Hangeraethsweg",
    contacts: [{ role: "Trainer", name: "Sebastian Boppel", email: "2007er@jsg-nord.com", phone: "015154309230" }],
    sponsorSlugs: ["cosmophone"],
    externalIds: {
      clubId: "4844",
      teamId: "10918",
      currentWebsiteUrl: "https://www.fsvalgermissen.de/mannschaft/10918/a-junioren"
    }
  },
  {
    slug: "b-junioren",
    name: "B-Junioren",
    shortName: "B-Junioren",
    area: "jugend",
    ageGroup: "B",
    description: "B-Junioren mit Spielbetrieb, Training, Trainerteam und aktuellen Mannschaftsinfos.",
    trainingTimes: ["nach Teamplan"],
    contacts: [{ role: "Trainerteam", name: "JSG Nord" }],
    externalIds: {
      clubId: "4844",
      teamId: "10920",
      currentWebsiteUrl: "https://www.fsvalgermissen.de/mannschaft/10920/b-junioren"
    }
  },
  {
    slug: "c-junioren",
    name: "C-Junioren",
    shortName: "C-Junioren",
    area: "jugend",
    ageGroup: "C",
    description: "C-Junioren der JSG Nord mit eigener Mannschaftsseite und aktuellen Vereinsmeldungen.",
    trainingTimes: ["nach Teamplan"],
    contacts: [{ role: "Trainerteam", name: "JSG Nord" }],
    externalIds: {
      clubId: "4844",
      teamId: "10922",
      currentWebsiteUrl: "https://www.fsvalgermissen.de/mannschaft/10922/c-junioren"
    }
  },
  {
    slug: "d-junioren",
    name: "D-Junioren",
    shortName: "D-Junioren",
    area: "jugend",
    ageGroup: "D",
    description: "D-Junioren als eigener Bereich innerhalb der JSG- und Jugendstruktur.",
    trainingTimes: ["nach Teamplan"],
    contacts: [{ role: "Trainerteam", name: "JSG Nord" }],
    externalIds: {
      clubId: "4844",
      teamId: "10925",
      currentWebsiteUrl: "https://www.fsvalgermissen.de/mannschaft/10925/d-junioren"
    }
  },
  {
    slug: "e-junioren",
    name: "E-Junioren Team 1 & 2",
    shortName: "E-Junioren",
    area: "jugend",
    ageGroup: "E",
    description:
      "Die Architektur erlaubt mehrere Teams pro Jahrgang, etwa E I, E II oder weitere Mannschaften.",
    trainingTimes: ["nach Teamplan"],
    contacts: [{ role: "Trainerteam", name: "JSG Nord" }],
    externalIds: {
      clubId: "4844",
      teamId: "13780",
      currentWebsiteUrl: "https://www.fsvalgermissen.de/mannschaft/13780/e-junioren-team-1-und-2"
    }
  },
  {
    slug: "f-junioren",
    name: "F-Junioren",
    shortName: "F-Junioren",
    area: "jugend",
    ageGroup: "F",
    description: "F-Junioren mit Raum fuer Trainingszeiten, Ansprechpartner und kindgerechte News.",
    trainingTimes: ["nach Teamplan"],
    contacts: [{ role: "Trainerteam", name: "JSG Nord" }],
    externalIds: {
      clubId: "4844",
      teamId: "12586",
      currentWebsiteUrl: "https://www.fsvalgermissen.de/mannschaft/12586/f-junioren"
    }
  },
  {
    slug: "g-junioren",
    name: "G-Junioren",
    shortName: "G-Junioren",
    area: "jugend",
    ageGroup: "G",
    description: "G-Junioren als frueher Einstieg in den Fussball beim FSV.",
    trainingTimes: ["nach Teamplan"],
    contacts: [{ role: "Trainerteam", name: "JSG Nord" }],
    externalIds: {
      clubId: "4844",
      teamId: "15160",
      currentWebsiteUrl: "https://www.fsvalgermissen.de/mannschaft/15160/g-junioren"
    }
  },
  {
    slug: "bambinis",
    name: "Bambinis",
    shortName: "Bambinis",
    area: "jugend",
    description: "Die Bambinis bekommen eine eigene Seite statt nur als Randnotiz aufzutauchen.",
    trainingTimes: ["nach Teamplan"],
    contacts: [{ role: "Trainerteam", name: "JSG Nord" }],
    externalIds: {
      clubId: "4844",
      teamId: "18861",
      currentWebsiteUrl: "https://www.fsvalgermissen.de/mannschaft/18861/bambinis"
    }
  },
  {
    slug: "darts-a-team",
    name: "Darts A-Team",
    shortName: "A-Team",
    area: "darts",
    league: "Bezirksklasse 4",
    description:
      "Das A-Team der Magpies bildet einen sichtbaren Darts-Bereich mit eigener Teamseite.",
    trainingTimes: ["Montag 19:00", "Mittwoch 19:00"],
    trainingLocation: "Clubhaus",
    contacts: [{ role: "Kontakt", name: "Sebastian Boes" }]
  },
  {
    slug: "darts-b-team",
    name: "Darts B-Team",
    shortName: "B-Team",
    area: "darts",
    league: "Kreisoberliga 3",
    description: "Das B-Team ist Teil der Darts-Struktur und wird redaktionell gleichwertig gefuehrt.",
    trainingTimes: ["Montag 19:00", "Mittwoch 19:00"],
    trainingLocation: "Clubhaus",
    contacts: [{ role: "Kontakt", name: "Sebastian Boes" }]
  },
  {
    slug: "darts-c-team",
    name: "Darts C-Team",
    shortName: "C-Team",
    area: "darts",
    league: "Kreisklasse 06",
    description: "Das C-Team rundet den Darts-Bereich mit eigener Seite und News-Zuordnung ab.",
    trainingTimes: ["Montag 19:00", "Mittwoch 19:00"],
    trainingLocation: "Clubhaus",
    contacts: [{ role: "Kontakt", name: "Sebastian Boes" }]
  }
];

export const sponsors: Sponsor[] = [
  { slug: "rewe-rudat", name: "Rewe - Rudat oHG", category: "Premium-Partner", website: "https://www.rewe.de/" },
  { slug: "gilde", name: "Gilde", category: "Premium-Partner", website: "https://gilde-brauerei.com/" },
  { slug: "sauk", name: "Getraenkefachgrosshandel SAUK", category: "Exklusiv-Partner", website: "https://getraenke-sauk.de/" },
  {
    slug: "cosmophone",
    name: "Cosmophone",
    category: "Exklusiv-Partner",
    website: "https://www.cosmophone.de/",
    logoUrl: "https://images.ebcdn.de/club-4844/SponsorImage_2647.png?v=1&width=600&format=webp&height=400&mode=max"
  },
  { slug: "sportkluft", name: "Sportkluft", category: "Exklusiv-Partner", website: "https://sportkluft.eu/" },
  { slug: "telis", name: "Telis Finanz - Umut Buz", category: "Exklusiv-Partner", website: "https://www.telis-finanz.de/" },
  { slug: "continentale", name: "Die Continentale", category: "Partner" },
  { slug: "lokschuppen", name: "Wirtshaus zum Lokschuppen", category: "Partner", website: "https://wirtshaus-zum-lokschuppen.de/" },
  {
    slug: "gasthaus-weiterer",
    name: "Gasthaus Weiterer",
    category: "Team-Sponsor",
    description: "Team-Partner der Alt-Herren UE32."
  },
  {
    slug: "coiffeur-juan",
    name: "Coiffeur Juan",
    category: "Team-Sponsor",
    website: "https://coiffeur-juan.de/",
    description:
      "Exklusives Allround-Friseur Atelier fuer stilvolle Haarschnitte und erstklassige Stylings.",
    logoUrl: "https://images.ebcdn.de/club-4844/SponsorImage_3293.png?v=4&width=600&format=webp&height=400&mode=max"
  }
];

export const teamProfiles: TeamProfile[] = [
  {
    teamSlug: "1-herren",
    headline: "Kreisliga-Fussball in der REWE-Rudat-Arena",
    intro: [
      "Die 1. Herren geht in dieser Saison in der Kreisliga Staffel A an den Start.",
      "Trainiert wird dienstags und donnerstags von 19 bis 21 Uhr. Als Team-Partner ist Cosmophone auf der bestehenden Website gefuehrt."
    ],
    staff: [{ role: "Sportliche Leitung", name: "FSV Algermissen" }],
    players: [
      { name: "Malte Niemann", number: "1", image: "https://images.ebcdn.de/club-4844/PlayerPhoto_16583.jpg?v=1&width=1000&format=webp&height=1000&mode=crop" },
      { name: "Manuel Pieper", number: "12", image: "https://images.ebcdn.de/club-4844/PlayerPhoto_69988.jpg?v=1&width=1000&format=webp&height=1000&mode=crop" },
      { name: "Luke Harborth", number: "3", image: "https://images.ebcdn.de/club-4844/PlayerPhoto_16585.jpg?v=1&width=1000&format=webp&height=1000&mode=crop" },
      { name: "Patrick Pries", number: "6", image: "https://images.ebcdn.de/club-4844/PlayerPhoto_27166.jpg?v=1&width=1000&format=webp&height=1000&mode=crop" },
      { name: "Elias Willerding", number: "13", image: "https://images.ebcdn.de/club-4844/PlayerPhoto_57281.jpg?v=2&width=1000&format=webp&height=1000&mode=crop" },
      { name: "Philipp Dimitrakakis", number: "17", image: "https://images.ebcdn.de/club-4844/PlayerPhoto_69989.jpg?v=1&width=1000&format=webp&height=1000&mode=crop" },
      { name: "Andreas Hinrichsen", number: "24" },
      { name: "Farschad Babai", number: "37" },
      { name: "Pascal Meyer", number: "3" },
      { name: "Liam Harborth", number: "7" },
      { name: "Yoiner Andres Serpa Lopez", number: "7" },
      { name: "Moussa Camara", number: "8" },
      { name: "Philipp Busche", number: "10" },
      { name: "Louis Keita", number: "11" },
      { name: "Mathias Koch", number: "19" },
      { name: "Davit Tchabashvili", number: "21" },
      { name: "Jannis Dimitrakakis", number: "25" },
      { name: "Anderson Kipre", number: "32" },
      { name: "Ulrich Tchakounte Leukeu", number: "1" },
      { name: "Franco Antonio Ferraro", number: "10" }
    ]
  },
  {
    teamSlug: "2-herren",
    headline: "2. Kreisklasse mit eigenem Profil",
    intro: [
      "Die 2. Herren geht in dieser Saison in der 2. Kreisklasse Staffel A an den Start.",
      "Trainer ist Wolf Daniel Busche, Co-Trainer ist Marc Baxmann. Team-Partner ist Coiffeur Juan."
    ],
    staff: [
      { role: "Trainer", name: "Wolf Daniel Busche" },
      { role: "Co-Trainer", name: "Marc Baxmann" }
    ],
    players: [
      { name: "Marcel Koberstein", number: "21", image: "https://images.ebcdn.de/club-4844/PlayerPhoto_16605.jpg?v=2&width=1000&format=webp&height=1000&mode=crop" },
      { name: "Louis Busche", number: "5", image: "https://images.ebcdn.de/club-4844/PlayerPhoto_16610.jpg?v=3&width=1000&format=webp&height=1000&mode=crop" },
      { name: "Jannis Dimitrakakis", number: "5", image: "https://images.ebcdn.de/club-4844/PlayerPhoto_36818.jpg?v=1&width=1000&format=webp&height=1000&mode=crop" },
      { name: "Timo Rennmann", number: "23" },
      { name: "Damien Schroeter", number: "77" },
      { name: "Fabian Simhofer", number: "9" },
      { name: "Felix Aschemann", number: "19" },
      { name: "Maximilian Bendix", number: "20" },
      { name: "Jan-Henrik Ahrens", number: "4" },
      { name: "Daniel Wiegand", number: "13" },
      { name: "Felix-Jonathan Herrmann", number: "16" },
      { name: "Kornelius Paasche", number: "20" }
    ]
  },
  {
    teamSlug: "a-junioren",
    headline: "U19-Fussball bei der JSG Nord",
    intro: [
      "Die A-Junioren spielen in der A-Junioren Kreisliga Staffel A.",
      "Trainer ist Sebastian Boppel. Trainiert wird montags und donnerstags von 17:00 bis 18:30 Uhr in Luehnde am Hangeraethsweg."
    ],
    staff: [{ role: "Trainer", name: "Sebastian Boppel" }],
    players: [
      { name: "JSG Nord U19", number: "1" },
      { name: "Jahrgang 2007", number: "4" },
      { name: "Jahrgang 2008", number: "5" },
      { name: "Jahrgang 2007", number: "6" },
      { name: "Jahrgang 2008", number: "8" },
      { name: "Jahrgang 2007", number: "10" },
      { name: "Jahrgang 2008", number: "11" }
    ]
  },
  {
    teamSlug: "ue32",
    headline: "8er-Feld, Mittwochabend, Grasweg",
    intro: [
      "Die UE32 spielt in der 2. Kreisklasse 8er-Feld.",
      "Trainiert wird jeden Mittwoch um 19 Uhr auf dem Sportplatz am Grasweg. Ansprechpartner ist Alexander Reslan."
    ],
    staff: [{ role: "Ansprechpartner", name: "Alexander Reslan" }],
    players: [
      { name: "Fabian Fricke", number: "3" },
      { name: "Joern Thamm", number: "14" },
      { name: "Leif Even", number: "14" },
      { name: "Sebastian Ulbricht", number: "33" },
      { name: "Matthias Rack", number: "23" },
      { name: "Jan Algermissen", number: "24" },
      { name: "Phillipp Werder", number: "40" },
      { name: "Maik Hartmann", number: "9" },
      { name: "Steffen Fuchs", number: "10" },
      { name: "Daniel Krafczyk", number: "11" },
      { name: "Marcel Muenster", number: "18" }
    ]
  }
];

export const matchResults: MatchResult[] = [
  {
    teamSlug: "1-herren",
    teamName: "1. Herren",
    homeTeam: "FSV Algermissen",
    awayTeam: "SV Teutonia Sorsum",
    homeGoals: 3,
    awayGoals: 0,
    date: "2026-08-09",
    season: currentSeason,
    competition: "Kreisliga Staffel A",
    matchday: "2. Spieltag",
    sourceUrl: "https://www.fussball.de/mannschaft/fsv-algermissen-fsv-algermissen-niedersachsen/-/saison/2627/team-id/011MIC1BK8000000VTVG0001VTR8C1K7",
    status: "result"
  },
  {
    teamSlug: "1-herren",
    teamName: "1. Herren",
    homeTeam: "FSV Algermissen",
    awayTeam: "FC Concordia Hildesheim",
    homeGoals: 0,
    awayGoals: 1,
    date: "2026-08-12",
    season: currentSeason,
    competition: "Kreisliga Staffel A",
    matchday: "1. Spieltag",
    sourceUrl: "https://www.fussball.de/mannschaft/fsv-algermissen-fsv-algermissen-niedersachsen/-/saison/2627/team-id/011MIC1BK8000000VTVG0001VTR8C1K7",
    status: "result"
  },
  {
    teamSlug: "1-herren",
    teamName: "1. Herren",
    homeTeam: "SC Harsum 2",
    awayTeam: "FSV Algermissen",
    homeGoals: 3,
    awayGoals: 2,
    date: "2026-08-16",
    season: currentSeason,
    competition: "Kreisliga Staffel A",
    matchday: "3. Spieltag",
    sourceUrl: "https://www.fussball.de/mannschaft/fsv-algermissen-fsv-algermissen-niedersachsen/-/saison/2627/team-id/011MIC1BK8000000VTVG0001VTR8C1K7",
    status: "result"
  },
  {
    teamSlug: "1-herren",
    teamName: "1. Herren",
    homeTeam: "1. FC Sarstedt",
    awayTeam: "FSV Algermissen",
    homeGoals: 2,
    awayGoals: 0,
    date: "2026-08-19",
    season: currentSeason,
    competition: "Kreisliga Staffel A",
    matchday: "4. Spieltag",
    sourceUrl: "https://www.fussball.de/mannschaft/fsv-algermissen-fsv-algermissen-niedersachsen/-/saison/2627/team-id/011MIC1BK8000000VTVG0001VTR8C1K7",
    status: "result"
  },
  {
    teamSlug: "2-herren",
    teamName: "2. Herren",
    homeTeam: "SG Foerste/Hasede/Ahrbergen",
    awayTeam: "FSV Algermissen II",
    homeGoals: 0,
    awayGoals: 0,
    date: "2026-08-16",
    season: currentSeason,
    competition: "2. Kreisklasse Staffel A",
    matchday: "1. Spieltag",
    sourceUrl: "https://www.fussball.de/mannschaft/fsv-algermissen-ii-fsv-algermissen-niedersachsen/-/saison/2627/team-id/011MIAMK78000000VTVG0001VTR8C1K7",
    status: "result"
  },
  {
    teamSlug: "a-junioren",
    teamName: "A-Junioren",
    homeTeam: "JFC Kaspel",
    awayTeam: "JSG Nord",
    date: "2026-08-23",
    kickoffTime: "10:30",
    season: currentSeason,
    competition: "A-Junioren Kreisliga Staffel A",
    matchday: "1. Spieltag",
    sourceUrl: "https://www.fussball.de/verein/fsv-algermissen-niedersachsen/-/id/00ES8GN7P4000010VV0AG08LVUPGND5I",
    status: "fixture"
  },
  {
    teamSlug: "ue32",
    teamName: "UE32",
    homeTeam: "SC Drispenstedt",
    awayTeam: "FSV Algermissen",
    date: "2026-08-21",
    kickoffTime: "19:00",
    season: currentSeason,
    competition: "UE32 2. Kreisklasse Staffel A",
    matchday: "1. Spieltag",
    sourceUrl: "https://www.fussball.de/mannschaft/fsv-algermissen-fsv-algermissen-niedersachsen/-/saison/2627/team-id/01SBNP0VUG000000VS548984VTL2SVNK",
    status: "fixture"
  }
];

export const news: NewsItem[] = [
  {
    slug: "mitgliederversammlung-2026",
    title: "Bericht ueber die Mitgliederversammlung 2026",
    teaser: "Der FSV blickt auf ein gelungenes Vereinsjahr und stellt die Weichen fuer die naechsten Aufgaben.",
    body:
      "Der FSV blickt auf ein gelungenes Vereinsjahr zurueck und stellt die Weichen fuer die naechsten Aufgaben im Verein.",
    date: "2026-05-19",
    status: "published",
    category: "Verein",
    teamSlugs: [],
    areaTags: ["verein"],
    image: "https://images.ebcdn.de/club-4844/PageTeaser_6364.jpg?format=webp&mode=max&v=11&width=2560",
    author: "Redaktion"
  },
  {
    slug: "hannover-96-fussballschule",
    title: "Hannover 96 Fussballschule zu Gast",
    teaser: "Talents+Friends kommt nach Algermissen und verbindet Fussball mit einer Spendenaktion.",
    body:
      "Talents+Friends bringt Training, Teamgeist und eine Spendenaktion nach Algermissen.",
    date: "2026-03-21",
    status: "published",
    category: "Jugend",
    teamSlugs: ["jsg-nord", "d-junioren", "e-junioren", "f-junioren"],
    areaTags: ["verein", "jugend"],
    image: "https://images.ebcdn.de/club-4844/ArticleTeaser_90487.jpg?format=webp&height=1000&mode=crop&v=1&width=1600",
    author: "Jugendredaktion"
  },
  {
    slug: "sichtschutz-kindergarten",
    title: "Neuer Sichtschutz zum Kindergarten",
    teaser: "Umut Buz und Danilo Henne unterstuetzen den FSV mit einem neuen Sichtschutz.",
    body:
      "Umut Buz und Danilo Henne unterstuetzen den FSV mit einem neuen Sichtschutz am Sportgelaende.",
    date: "2026-03-17",
    status: "published",
    category: "Sponsoren",
    teamSlugs: [],
    areaTags: ["verein", "sponsoren"],
    author: "Redaktion"
  },
  {
    slug: "darts-magpies-aufstieg",
    title: "Aufstieg der Magpies ist perfekt",
    teaser: "Die Darts-Mannschaften feiern ihren sportlichen Erfolg im Clubhaus.",
    body:
      "Die Darts-Mannschaften feiern ihren sportlichen Erfolg und staerken den Magpies-Bereich im Clubhaus.",
    date: "2024-05-06",
    status: "published",
    category: "Darts",
    teamSlugs: ["darts-a-team", "darts-b-team", "darts-c-team"],
    areaTags: ["darts"],
    image: "https://images.ebcdn.de/club-4844/PageTeaser_6366.jpg?format=webp&mode=max&v=4&width=2560",
    author: "Darts-Redaktion"
  },
  {
    slug: "spielbericht-erste-herren",
    title: "Erste Herren startet in die neue Saison",
    teaser: "Kreisliga, Trainingsrhythmus und Team-Partner im Blick.",
    body:
      "Die 1. Herren geht in der Kreisliga Staffel A an den Start und trainiert dienstags und donnerstags in der REWE-Rudat-Arena.",
    date: "2026-08-12",
    status: "published",
    category: "1. Herren",
    teamSlugs: ["1-herren"],
    areaTags: ["senioren"],
    image: "https://images.ebcdn.de/club-4844/TeamImage_10821.jpg?404=default.png&format=jpg&mode=max&v=4&width=1180",
    author: "Sportredaktion"
  }
];

export const clubPages: ClubPage[] = [
  {
    slug: "vorstand",
    title: "Der Vorstand",
    teaser: "Ansprechpartner und Ressorts des FSV Algermissen.",
    body: [
      "Der Vorstand fuehrt den Verein mit Stand der Mitgliederversammlung vom 19.05.2026.",
      "Ressorts: Vorsitz, Finanzen, Sport, Mitglieder und Engagement, Liegenschaften, Oeffentlichkeit/Sponsoring/Digitales und Jugend."
    ]
  },
  {
    slug: "leitbild",
    title: "Leitbild",
    teaser: "Modern, offen, traditionsbewusst und generationenuebergreifend.",
    body: [
      "Das Leitbild beschreibt den FSV als aktiven Bestandteil des gesellschaftlichen Lebens in Algermissen.",
      "Jugendarbeit, Ehrenamt, Gemeinnuetzigkeit, Integration, Fairness und solide Finanzierung bleiben zentrale Inhalte."
    ]
  },
  {
    slug: "clubhaus",
    title: "Das Clubhaus",
    teaser: "Treffpunkt, Stammtisch, Bundesliga-Abende, Darts und Spieltagsleben.",
    body: [
      "Das Clubhaus ist Herz und Treffpunkt des Vereins. Die Bestandsseite nennt den Stammtisch donnerstags ab 19 Uhr, Bundesliga-Abende und Oeffnung zum Spielbetrieb.",
      "Dokumente und Formulare rund um das Clubhaus sind im Downloadbereich gebuendelt."
    ],
    ctaLabel: "Downloads ansehen",
    ctaHref: "/verein/downloads"
  },
  {
    slug: "rewe-rudat-arena",
    title: "REWE-Rudat-Arena",
    teaser: "Sportstaette am Grasweg mit Anfahrt und Dokumenten.",
    body: [
      "Die Arena am Grasweg ist die zentrale Sportstaette fuer Training, Spielbetrieb und Vereinsleben.",
      "Anfahrt, Dokumente und Informationen stehen im Download- und Vereinsbereich bereit."
    ]
  },
  {
    slug: "ostpreussen-stadion",
    title: "Ostpreussen-Stadion",
    teaser: "Weitere Sportstaette des FSV mit eigener Informationsseite.",
    body: [
      "Auch das Ostpreussen-Stadion bleibt als Vereinsbereich erhalten und wird nicht in der Navigation versteckt.",
      "Informationen zu Anfahrt und Nutzung sind direkt ueber den Vereinsbereich erreichbar."
    ]
  },
  {
    slug: "sponsoren",
    title: "Sponsoren",
    teaser: "Premium-Partner, Exklusiv-Partner, Partner und Team-Sponsoren.",
    body: [
      "Sponsoren werden nach Premium-Partnern, Exklusiv-Partnern, Partnern und Team-Sponsoren dargestellt.",
      "Die Startseite zeigt eine Auswahl, die Sponsorenseite alle aktiven Partner."
    ]
  },
  {
    slug: "foerderverein",
    title: "Fussballfoerderverein",
    teaser: "Unterstuetzung fuer Fussball und Vereinsentwicklung.",
    body: [
      "Der bestehende Foerderverein bleibt als eigenstaendiger Navigationspunkt erhalten.",
      "Mitgliedschaft, Foerderziele und Dokumente sind hier gebuendelt."
    ]
  },
  {
    slug: "downloads",
    title: "Downloads",
    teaser: "Formulare, Satzungen, Ordnungen und Clubhaus-Unterlagen.",
    body: [
      "Vereinssatzung, Datenschutzordnung, Beitragsordnung, Eintrittserklaerungen, NFV-Passantrag und Clubhaus-Nutzungsvertrag sind als zentrale Download-Kategorien vorgesehen.",
      "Alle wichtigen Vereinsunterlagen sind im Downloadbereich gebuendelt."
    ]
  },
  {
    slug: "fanartikel",
    title: "Fanartikel",
    teaser: "Fanshop, Restposten und Artikel rund um den FSV.",
    body: [
      "Schals, Tassen, Feuerzeuge, Pins und weitere Artikel werden als redaktioneller Bereich abgebildet.",
      "Der externe Fanshop bleibt als Link erhalten."
    ],
    ctaLabel: "Zum externen Fanshop",
    ctaHref: "https://fsvalgermissen.fan12.de/"
  }
];

export const downloads = [
  "Vereinssatzung",
  "Datenschutzordnung",
  "Beitragsordnung",
  "Eintrittserklaerung",
  "Eintrittserklaerung ausfuellbar",
  "Passantrag NFV",
  "Nutzungsvertrag Clubhaus"
];

export const clubFootballWidgets: FootballWidgetConfig = {
  fixtureWidgetId: "50b81c6d-8c29-48b7-abcc-6ba58ece362b",
  fixtureWidgetType: "club-matches",
  fussballDeUrl: "https://www.fussball.de/",
  note:
    "Testdomain-Widget fuer fsv-algermissen.pages.dev. Produktionsdomain-Widgets werden spaeter separat hinterlegt."
};

export const footballWidgets = teams.reduce<Record<string, FootballWidgetConfig>>((acc, team) => {
  acc[team.slug] = {
    fussballDeUrl: team.externalIds?.currentWebsiteUrl,
    note:
      "Team-Widget-IDs werden in next.fussball.de erzeugt. data-id und data-type aus dem Codeblock hier eintragen."
  };
  return acc;
}, {});

footballWidgets["1-herren"] = {
  ...footballWidgets["1-herren"],
  upcomingWidgetId: "f8ae19f4-9370-49ec-93fa-e85ff801155c",
  upcomingWidgetType: "next-match"
};

footballWidgets["2-herren"] = {
  ...footballWidgets["2-herren"],
  upcomingWidgetId: "260ec68c-06ec-4c44-97ed-5d017ab87fd2",
  upcomingWidgetType: "next-match"
};

export const nav = [
  { label: "News", href: "/news" },
  {
    label: "Fussball",
    href: "/teams/1-herren",
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

export function getPublishedNews() {
  return news
    .filter((item) => item.status === "published")
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getNewsForTeam(slug: string) {
  return getPublishedNews().filter((item) => item.teamSlugs.includes(slug));
}

export function getNewsForArea(area: string) {
  return getPublishedNews().filter((item) => item.areaTags.includes(area));
}

export function getTeam(slug: string) {
  return teams.find((team) => team.slug === slug);
}

export function getTeamProfile(slug: string) {
  return teamProfiles.find((profile) => profile.teamSlug === slug);
}

export function getResultsForTeam(slug: string) {
  return matchResults
    .filter((result) => result.teamSlug === slug && result.season === currentSeason)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getFeaturedResults(slugs: string[], limitPerTeam = 1) {
  return slugs.flatMap((slug) => getResultsForTeam(slug).slice(0, limitPerTeam));
}

export function getClubPage(slug: string) {
  return clubPages.find((page) => page.slug === slug);
}

export function filterSponsors(category?: Sponsor["category"]) {
  return sponsors.filter((sponsor) => !category || sponsor.category === category);
}

export function getSponsorsForTeam(slug: string) {
  const team = getTeam(slug);
  return sponsors.filter((sponsor) => team?.sponsorSlugs?.includes(sponsor.slug));
}
