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
  isActive?: boolean;
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
  players: Array<{ name: string; number?: string; image?: string; position?: string; bio?: string }>;
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
  category: "Premium-Partner" | "Exklusiv-Partner" | "Partner" | "Team-Sponsor" | "Trikotsponsor";
  website?: string;
  description?: string;
  logoUrl?: string;
};

export type ClubContact = {
  role: string;
  name: string;
  phone?: string;
  email?: string;
};

export type ClubLink = {
  label: string;
  href: string;
};

export type ClubInfoBlock = {
  title: string;
  text?: string[];
  items?: string[];
};

export type ClubPage = {
  slug: string;
  title: string;
  teaser: string;
  body: string[];
  image?: { src: string; alt: string };
  contacts?: ClubContact[];
  links?: ClubLink[];
  infoBlocks?: ClubInfoBlock[];
  openingHours?: Array<{ day: string; context: string; time: string }>;
  products?: Array<{ name: string; description?: string; price?: string }>;
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
    { label: "Instagram", href: "https://www.instagram.com/fsv.algermissen/" },
    { label: "JSG Nord Facebook", href: "https://www.facebook.com/elsternkids/" },
    { label: "FUSSBALL.DE", href: "https://www.fussball.de/" }
  ]
};

export const currentSeason = "2026/2027";

export const teams: Team[] = [
  {
    slug: "1-herren",
    name: "Herren - FSV Algermissen",
    shortName: "1. Herren",
    area: "senioren",
    league: "Kreisliga Staffel A · Krombacher Kreispokal · Gilde Börde Cup 2026 · Freundschaftsspiele",
    description:
      "Die 1. Herren des FSV Algermissen spielt in der Saison 2026/2027 in der Kreisliga Staffel A.",
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
    name: "Herren - FSV Algermissen II",
    shortName: "2. Herren",
    area: "senioren",
    league: "2. Kreisklasse Staffel A · Freundschaftsspiele",
    description:
      "Die 2. Herren des FSV Algermissen spielt in der Saison 2026/2027 in der 2. Kreisklasse Staffel A.",
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
    name: "Herren Ü32 - FSV Algermissen",
    shortName: "Ü32",
    area: "senioren",
    ageGroup: "Ü32",
    league: "Ü32 2.Kreisklasse Staffel A · Kreispokal Ü32 Kleinfeld",
    description:
      "Herren Ü32 des FSV Algermissen im Spielbetrieb 2026/2027.",
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
    name: "Herren Ü40 - FSV Algermissen",
    shortName: "Ü40",
    area: "senioren",
    ageGroup: "Ü40",
    league: "Kreisliga A · Kreispokal",
    description:
      "Herren Ü40 des FSV Algermissen im Spielbetrieb 2026/2027.",
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
    name: "A-Junioren - JSG Nord",
    shortName: "A-Junioren",
    area: "jugend",
    ageGroup: "A",
    league: "A-Junioren Kreisliga Staffel A · Kreispokal A-Junioren · Leistungsvergleich · Freundschaftsspiele",
    description: "A-Junioren der JSG Nord im Spielbetrieb 2026/2027.",
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
    name: "B-Junioren - JSG Nord",
    shortName: "B-Junioren",
    area: "jugend",
    ageGroup: "B",
    league: "B-Junioren Kreisliga Staffel A · Kreispokal B-Junioren · Freundschaftsspiele",
    description: "B-Junioren der JSG Nord im Spielbetrieb 2026/2027.",
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
    name: "C-Junioren - JSG Nord",
    shortName: "C-Junioren",
    area: "jugend",
    ageGroup: "C",
    league: "C-Junioren 1. KK Staffel A · Kreispokal C-Junioren · Freundschaftsspiele",
    description: "C-Junioren der JSG Nord im Spielbetrieb 2026/2027.",
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
    name: "D-Junioren - JSG Nord",
    shortName: "D-Junioren",
    area: "jugend",
    ageGroup: "D",
    league: "1.Kreisklasse Staffel B (Hinrunde) · Kreispokal D-Junioren · Freundschaftsspiele",
    description: "D-Junioren der JSG Nord im Spielbetrieb 2026/2027.",
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
    name: "E-Junioren - JSG Nord I",
    shortName: "E-Junioren I",
    area: "jugend",
    ageGroup: "E",
    league: "1.Kreisklasse Staffel A (Hinrunde)",
    description: "E-Junioren JSG Nord I im Spielbetrieb 2026/2027.",
    trainingTimes: ["nach Teamplan"],
    contacts: [{ role: "Trainerteam", name: "JSG Nord" }],
    externalIds: {
      clubId: "4844",
      teamId: "13780",
      currentWebsiteUrl: "https://www.fsvalgermissen.de/mannschaft/13780/e-junioren-team-1-und-2"
    }
  },
  {
    slug: "e-junioren-ii",
    name: "E-Junioren - JSG Nord II",
    shortName: "E-Junioren II",
    area: "jugend",
    ageGroup: "E",
    league: "1.Kreisklasse Staffel A (Hinrunde)",
    description: "E-Junioren JSG Nord II im Spielbetrieb 2026/2027.",
    trainingTimes: ["nach Teamplan"],
    contacts: [{ role: "Trainerteam", name: "JSG Nord" }]
  },
  {
    slug: "e-junioren-iii",
    name: "E-Junioren - JSG Nord III",
    shortName: "E-Junioren III",
    area: "jugend",
    ageGroup: "E",
    league: "1.Kreisklasse Staffel C (Hinrunde)",
    description: "E-Junioren JSG Nord III im Spielbetrieb 2026/2027.",
    trainingTimes: ["nach Teamplan"],
    contacts: [{ role: "Trainerteam", name: "JSG Nord" }]
  },
  {
    slug: "e-junioren-iv",
    name: "E-Junioren - JSG Nord IV",
    shortName: "E-Junioren IV",
    area: "jugend",
    ageGroup: "E",
    league: "1.Kreisklasse Staffel B (Hinrunde)",
    description: "E-Junioren JSG Nord IV im Spielbetrieb 2026/2027.",
    trainingTimes: ["nach Teamplan"],
    contacts: [{ role: "Trainerteam", name: "JSG Nord" }]
  },
  {
    slug: "f-junioren",
    name: "F-Junioren - JSG Nord U9-1",
    shortName: "F U9-1",
    area: "jugend",
    ageGroup: "F",
    league: "Festival A Kaspel 3/1",
    description: "F-Junioren JSG Nord U9-1 im Festival-Spielbetrieb 2026/2027.",
    trainingTimes: ["nach Teamplan"],
    contacts: [{ role: "Trainerteam", name: "JSG Nord" }],
    externalIds: {
      clubId: "4844",
      teamId: "12586",
      currentWebsiteUrl: "https://www.fsvalgermissen.de/mannschaft/12586/f-junioren"
    }
  },
  {
    slug: "f-junioren-u9-2",
    name: "F-Junioren - JSG Nord U9-2",
    shortName: "F U9-2",
    area: "jugend",
    ageGroup: "F",
    league: "Festival D Giften",
    description: "F-Junioren JSG Nord U9-2 im Festival-Spielbetrieb 2026/2027.",
    trainingTimes: ["nach Teamplan"],
    contacts: [{ role: "Trainerteam", name: "JSG Nord" }]
  },
  {
    slug: "f-junioren-u8-1",
    name: "F-Junioren - JSG Nord U8-1",
    shortName: "F U8-1",
    area: "jugend",
    ageGroup: "F",
    league: "Festival D Giften",
    description: "F-Junioren JSG Nord U8-1 im Festival-Spielbetrieb 2026/2027.",
    trainingTimes: ["nach Teamplan"],
    contacts: [{ role: "Trainerteam", name: "JSG Nord" }]
  },
  {
    slug: "g-junioren",
    name: "G-Junioren - JSG Nord U7-1",
    shortName: "G U7-1",
    area: "jugend",
    ageGroup: "G",
    league: "Festival B",
    description: "G-Junioren JSG Nord U7-1 im Festival-Spielbetrieb 2026/2027.",
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
      "Das A-Team der Magpies spielt in der Bezirksklasse 4 und gehoert zum Darts-Bereich im Clubhaus.",
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
    description: "Das B-Team spielt in der Kreisoberliga 3 und wird redaktionell gleichwertig gefuehrt.",
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
    description: "Das C-Team spielt in der Kreisklasse 06 und rundet den Darts-Bereich der Magpies ab.",
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
  { slug: "danilo-henne", name: "Danilo Henne", category: "Partner", website: "https://www.schwaebisch-hall.de/" },
  { slug: "autofit-siewert", name: "Autofit - Ralf Siewert", category: "Partner", website: "https://siewert-automobile.de/" },
  { slug: "bormann", name: "Bormann - Dachdeckermeisterbetrieb", category: "Partner", website: "https://www.dachdecker-algermissen.de/" },
  { slug: "continentale", name: "Die Continentale", category: "Partner" },
  { slug: "karl-weiterer", name: "Karl Weiterer", category: "Partner", website: "https://www.branchen.stadtplan.de/" },
  { slug: "vgh-schulze", name: "VGH - Markus Schulze", category: "Partner", website: "https://www.vgh.de/" },
  { slug: "lokschuppen", name: "Wirtshaus zum Lokschuppen", category: "Partner", website: "https://wirtshaus-zum-lokschuppen.de/" },
  { slug: "trinkgut-sarstedt", name: "Trinkgut Sarstedt - Jacob e. K.", category: "Partner", website: "https://www.trinkgut.de/" },
  { slug: "werbewerkstatt", name: "Die Werbewerkstatt", category: "Partner", website: "https://diewerbewerkstatt.info/" },
  {
    slug: "gasthaus-weiterer",
    name: "Gasthaus Weiterer",
    category: "Team-Sponsor",
    description: "Team-Partner der Alt-Herren Ü32."
  },
  {
    slug: "coiffeur-juan",
    name: "Coiffeur Juan",
    category: "Team-Sponsor",
    website: "https://coiffeur-juan.de/",
    description:
      "Exklusives Allround-Friseur Atelier fuer stilvolle Haarschnitte und erstklassige Stylings.",
    logoUrl: "https://images.ebcdn.de/club-4844/SponsorImage_3293.png?v=4&width=600&format=webp&height=400&mode=max"
  },
  { slug: "gleitz-verlag", name: "Gleitz - Verlag", category: "Partner", website: "https://www.gleitz-online.de/" },
  { slug: "dammeyer", name: "Dammeyer - Bauunternehmen", category: "Partner", website: "https://dammeyer-bauunternehmen.de/" },
  { slug: "einbecker", name: "Einbecker", category: "Trikotsponsor", website: "https://gilde-brauerei.com/" },
  { slug: "koehring", name: "Köhring - Fliesenlegermeister", category: "Trikotsponsor", website: "https://www.fliesen-koehring.de/" }
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
      "Die Ü32 spielt in der 2. Kreisklasse 8er-Feld.",
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
    teamName: "Ü32",
    homeTeam: "SC Drispenstedt",
    awayTeam: "FSV Algermissen",
    date: "2026-08-21",
    kickoffTime: "19:00",
    season: currentSeason,
    competition: "Ü32 2. Kreisklasse Staffel A",
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
    slug: "hilfe-fuer-den-kleinen-kuba",
    title: "Hilfe fuer den kleinen Kuba",
    teaser: "Hannover 96 und der FSV Algermissen starten gemeinsam einen Spendenaufruf.",
    body:
      "Der sechsjaehrige Kuba ist in seiner Mobilitaet stark eingeschraenkt. Gemeinsam mit Hannover 96 ruft der FSV Algermissen zu Spenden fuer ein spezielles Dreirad mit E-Motor und einen passenden Rollstuhl auf. Durch Aktionen im Jugendbereich und Mannschaftskassen sind bereits rund 400 Euro zusammengekommen.",
    date: "2026-03-05",
    status: "published",
    category: "Verein",
    teamSlugs: ["jsg-nord"],
    areaTags: ["verein", "jugend"],
    author: "Redaktion"
  },
  {
    slug: "hannover-96-fussballschule-dezember",
    title: "Hannover 96 Fussballschule Talents+Friends zu Gast",
    teaser: "Der Besuch der Hannover 96 Fussballschule wurde fuer den FSV angekuendigt.",
    body:
      "Die Hannover 96 Fussballschule Talents+Friends ist beim FSV Algermissen zu Gast und verbindet Fussball, Training und Vereinsleben.",
    date: "2025-12-11",
    status: "published",
    category: "Jugend",
    teamSlugs: ["jsg-nord"],
    areaTags: ["verein", "jugend"],
    author: "Jugendredaktion"
  },
  {
    slug: "gruenkohlessen-2026",
    title: "Gruenkohlessen satt am 31.01.26",
    teaser: "Der FSV laedt zum gemeinsamen Gruenkohlessen ein.",
    body:
      "Das Vereinsleben bleibt auch abseits des Platzes sichtbar: Am 31.01.2026 findet das Gruenkohlessen satt statt.",
    date: "2025-11-12",
    status: "published",
    category: "Verein",
    teamSlugs: [],
    areaTags: ["verein"],
    author: "Redaktion"
  },
  {
    slug: "spieltag-14",
    title: "Spieltag 14",
    teaser: "Informationen zum 14. Spieltag im Herrenbereich.",
    body:
      "Der 14. Spieltag wurde auf der alten Website als aktuelle Vereinsmeldung gefuehrt und ist jetzt in der neuen News-Struktur sichtbar.",
    date: "2025-11-08",
    status: "published",
    category: "Fussball",
    teamSlugs: ["1-herren", "2-herren"],
    areaTags: ["senioren"],
    author: "Sportredaktion"
  },
  {
    slug: "nachholspiel-schellerten",
    title: "Nachholspiel gegen Schellerten",
    teaser: "Nachholspiel am 15.10.2025 um 19:00 Uhr.",
    body:
      "Das Nachholspiel gegen Schellerten wurde fuer den 15.10.2025 um 19:00 Uhr angekuendigt.",
    date: "2025-10-15",
    status: "published",
    category: "Fussball",
    teamSlugs: ["1-herren"],
    areaTags: ["senioren"],
    author: "Sportredaktion"
  },
  {
    slug: "spielbericht-sportnews-hildesheim",
    title: "Spielbericht von Sportnews Hildesheim",
    teaser: "FSV Algermissen - SV Teutonia Sorsum 2:1.",
    body:
      "Der Spielbericht zum Spiel FSV Algermissen gegen SV Teutonia Sorsum wurde auf der alten Website im Bereich der 1. Herren gefuehrt.",
    date: "2025-10-15",
    status: "published",
    category: "1. Herren",
    teamSlugs: ["1-herren"],
    areaTags: ["senioren"],
    author: "Sportredaktion"
  },
  {
    slug: "bittere-niederlage-zweite-herren",
    title: "Bittere Niederlage fuer die II. Herren",
    teaser: "FSV Algermissen II verliert gegen SG Huemax/Borsum 2:3.",
    body:
      "Die 2. Herren startete ausgeglichen, fuehrte zwischenzeitlich und musste sich nach mehreren Platzverweisen und einer langen Nachspielzeit am Ende mit 2:3 geschlagen geben.",
    date: "2025-10-15",
    status: "published",
    category: "2. Herren",
    teamSlugs: ["2-herren"],
    areaTags: ["senioren"],
    author: "Sportredaktion"
  },
  {
    slug: "unentschieden-im-derby",
    title: "Unentschieden im Derby",
    teaser: "TuS Luehnde - FSV Algermissen 1:1.",
    body:
      "Das Derby gegen TuS Luehnde endete fuer die 1. Herren mit einem 1:1-Unentschieden.",
    date: "2025-10-05",
    status: "published",
    category: "1. Herren",
    teamSlugs: ["1-herren"],
    areaTags: ["senioren"],
    author: "Sportredaktion"
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
    image: {
      src: "https://images.ebcdn.de/club-4844/PageTeaser_6364.jpg?format=webp&mode=max&v=11&width=2560",
      alt: "Vorstand des FSV Algermissen"
    },
    body: [
      "Der Vorstand des Fußball- und Sportverein Algermissen von 1911 / 1990 e.V. ist mit Stand 19.05.2026 gepflegt.",
      "Vorstandsmitglieder:"
    ],
    contacts: [
      { role: "1. Vorsitzender", name: "Stephan Käsehage", phone: "0171 - 1770000", email: "stephan.kaesehage@fsvalgermissen.de" },
      { role: "2. Vorsitzender", name: "Sebastian Boes", phone: "0151 - 20253112" },
      { role: "Finanzen", name: "Jan Hendrik Ahrens", phone: "0160 - 4031848", email: "jan.ahrens@fsvalgermissen.de" },
      { role: "Sport", name: "Liam Harborth", phone: "01573 - 1997664", email: "liam.harborth@fsvalgermissen.de" },
      { role: "Mitglieder und Engagement", name: "Godehard Rohmann", phone: "0170 - 2453987", email: "godehard.rohmann@fsvalgermissen.de" },
      { role: "Liegenschaften", name: "Henry Algermissen", phone: "0172 - 5453427", email: "henry.algermissen@t-online.de" },
      { role: "Öffentlichkeit, Sponsoring & Digitales", name: "Jörn Thamm", phone: "0151 - 70876796", email: "joern.thamm@fsvalgermissen.de" },
      { role: "Jugend", name: "Maik Hartmann", phone: "0173 - 3585496", email: "maik.hartmann@fsvalgermissen.de" }
    ]
  },
  {
    slug: "leitbild",
    title: "Leitbild",
    teaser: "Modern, offen, traditionsbewusst und generationenuebergreifend.",
    body: [
      "Leitbild des FSV Algermissen",
      "Unser Sportverein ist ein aktiver Bestandteil unserer Gesellschaft. Wir sehen den Sport und seine Organisationen als unentbehrlich fuer ein funktionierendes Gemeinwesen an.",
      "Wir verstehen uns als wichtigen Teil und festen Faktor der oertlichen Lebenskultur. Uns ist bewusst, dass alle gesellschaftlichen Werte einer staendigen Veraenderung unterliegen und beruecksichtigen dieses in unserer Vereinsarbeit.",
      "Unsere Zukunft wollen wir selbststaendig und bewusst gestalten. Deshalb entwickeln wir Visionen und leiten daraus unsere Ziele und Strategien ab.",
      "Wir sind modern und offen fuer neue Ideen, aber auch traditionsbewusst.",
      "Unseren Mitgliedern versuchen wir ein nach ihren Wuenschen gestaltetes Sport- und Freizeitangebot anzubieten, durch das wir eine gesunde Lebensfuehrung, eine sinnvolle Lebensgestaltung sowie den Ausbau und Erhalt sozialer Kontakte foerdern. Leistungsorientierung und Breitensport schliessen sich dabei nicht aus.",
      "Grundlagen unserer Vereinsaktivitaeten sind Gemeinnuetzigkeit und Ehrenamtlichkeit, bei Bedarf ergaenzt um hauptamtliche Kraefte. Wir foerdern eine qualifizierte Aus- und Weiterbildung unserer Mitarbeiter und gehen offen und fair miteinander um.",
      "Wir wollen besser sein als andere. Deshalb arbeiten wir permanent an der Optimierung unserer Strukturen und Verfahrensweisen. Wir sind bereit, dauernd zu lernen.",
      "Unser Ziel sind zufriedene Mitglieder und Mitarbeiter, die mit der Qualitaet unseres Angebotes und der Organisation der Vereinsaktivitaeten zufrieden sind.",
      "Wir fuehren Jung und Alt zusammen und vermitteln so zwischen den Generationen. Wir integrieren Menschen aller Nationalitaeten und sind politisch wie religioes neutral.",
      "Wir wollen die persoenliche und soziale Lebensqualitaet erhalten, verbessern, foerdern und einen Beitrag leisten zur positiven Entwicklung der Persoenlichkeit. Die Jugendarbeit geniesst bei uns einen hohen Stellenwert.",
      "Bei kommunalpolitischen und verbandsinternen Entscheidungen, die uns betreffen, wollen wir mitreden und mitgestalten. Keine Entscheidung in diesem Bereich soll ohne uns getroffen werden.",
      "Wir achten auf eine solide Finanzierung aller Vereinsaktivitaeten und handeln umweltbewusst und ressourcenschonend."
    ],
    infoBlocks: [
      {
        title: "Wofür der FSV steht",
        items: [
          "Sport- und Freizeitangebote für unterschiedliche Wünsche der Mitglieder",
          "Jung und Alt zusammenführen und zwischen Generationen vermitteln",
          "Integration, politische und religiöse Neutralität",
          "Umweltbewusstes und ressourcenschonendes Handeln"
        ]
      }
    ],
    links: [{ label: "Leitbild herunterladen", href: "/verein/downloads" }]
  },
  {
    slug: "datenschutzordnung",
    title: "Datenschutzordnung",
    teaser: "Datenschutz und Vereinsdokumente des FSV Algermissen.",
    body: [
      "Die Datenschutzordnung ist als eigener Vereinsbereich hinterlegt und gehoert zu den zentralen Dokumenten des FSV Algermissen.",
      "Das Dokument wird im Downloadbereich gepflegt, damit es bei Aktualisierungen zentral ausgetauscht werden kann."
    ],
    links: [{ label: "Zum Downloadbereich", href: "/verein/downloads" }]
  },
  {
    slug: "clubhaus",
    title: "Das Clubhaus",
    teaser: "Treffpunkt, Stammtisch, Bundesliga-Abende, Darts und Spieltagsleben.",
    body: [
      "Unser Clubhaus ist der Treffpunkt und das Herz des Vereins.",
      "Es ist jeden Donnerstag ab 19.00 Uhr zum Stammtisch fuer unsere Mitglieder, aber selbstverstaendlich auch fuer jedermann geoeffnet.",
      "Freitags kann hier die Bundesliga live auf Grossbild geschaut werden. Sonntags ist zum Spielbetrieb und auch noch ein wenig danach geoeffnet.",
      "Montags trainieren im Clubhaus unsere Darter und donnerstags zum Stammtisch laufen auch weiterhin die Geschaeftszeiten.",
      "Wenn keiner mehr Durst hat, schliesst das Clubhaus auch eher.",
      "Unser Clubhaus steht Vereinsmitgliedern und Mitgliedern des Freundeskreises auch fuer Feiern zur Verfuegung. Diese Moeglichkeit beschraenkt sich regelmaessig auf den Samstag. Bei Interesse bitte bei unserem Wirt waehrend der Oeffnungszeiten persoenlich im Clubhaus melden."
    ],
    openingHours: [
      { day: "Donnerstag", context: "Stammtisch / Geschäftszeiten", time: "19:00 Uhr - last order 23:00 Uhr" },
      { day: "Freitag", context: "Spielbetrieb Ü32/Ü40", time: "19:00 Uhr - last order 23:30 Uhr" },
      { day: "Freitag", context: "Bundesliga live", time: "20:00 Uhr - last order 23:30 Uhr" },
      { day: "Sonntag", context: "Sommerspielplan, 2 Spiele", time: "12:30 Uhr - last order 19:00 Uhr" },
      { day: "Sonntag", context: "Sommerspielplan, 1 Spiel", time: "14:00 Uhr - last order 19:00 Uhr" },
      { day: "Sonntag", context: "Winterspielplan, 2 Spiele", time: "11:30 Uhr - last order 18:00 Uhr" },
      { day: "Sonntag", context: "Winterspielplan, 1 Spiel", time: "13:00 Uhr - last order 18:00 Uhr" }
    ],
    links: [{ label: "Nutzungsvertrag Clubhaus", href: "/verein/downloads" }],
    ctaLabel: "Downloads ansehen",
    ctaHref: "/verein/downloads"
  },
  {
    slug: "rewe-rudat-arena",
    title: "REWE-Rudat-Arena",
    teaser: "Sportstaette am Grasweg mit Anfahrt und Dokumenten.",
    body: [
      "Die REWE-Rudat-Arena am Grasweg ist die zentrale Sportstätte für Training, Spielbetrieb und Vereinsleben.",
      "Anfahrt und Hygienekonzept werden als eigene Links geführt, damit die Angaben später im Redaktionsbereich einzeln aktualisiert werden können."
    ],
    links: [
      { label: "Anfahrt öffnen", href: "https://www.google.com/maps/search/?api=1&query=REWE-Rudat-Arena%20Algermissen" },
      { label: "Hygienekonzept", href: "/verein/downloads" }
    ]
  },
  {
    slug: "ostpreussen-stadion",
    title: "Ostpreußen-Stadion",
    teaser: "Weitere Sportstaette des FSV mit eigener Informationsseite.",
    body: [
      "Auch das Ostpreußen-Stadion bleibt als eigener Vereinsbereich sichtbar.",
      "Anfahrt und Hygienekonzept sind direkt mit dieser Sportstätte verknüpft."
    ],
    links: [
      { label: "Anfahrt öffnen", href: "https://www.google.com/maps/search/?api=1&query=Ostpreu%C3%9Fen-Stadion%20Algermissen" },
      { label: "Hygienekonzept", href: "/verein/downloads" }
    ]
  },
  {
    slug: "sponsoren",
    title: "Sponsoren",
    teaser: "Premium-Partner, Exklusiv-Partner, Partner und Team-Sponsoren.",
    body: [
      "Sponsoren werden nach Premium-Partnern, Exklusiv-Partnern, Partnern, Team-Sponsoren und Trikotsponsoren dargestellt.",
      "Die Startseite zeigt eine Auswahl, die Sponsorenseite alle aktiven Partner."
    ]
  },
  {
    slug: "foerderverein",
    title: "Fußballförderverein",
    teaser: "Unterstützung für Fußball, Nachwuchs und Vereinsentwicklung.",
    body: [
      "Mit nur 2,00 Euro Mindestbeitrag im Monat kann der FSV Algermissen bei seiner Weiterentwicklung und der Förderung junger Talente unterstützt werden.",
      "Das Projekt 100 x 100 ruft 100 Förderer auf, jeweils 100 Euro zur Unterstützung des FSV beizutragen."
    ],
    contacts: [
      { role: "Vorsitzender", name: "Frank Linkogel" },
      { role: "Stellv. Vorsitzender", name: "Godehard Rohmann" },
      { role: "Kassenwart", name: "Michael Linkogel" },
      { role: "Schriftführerin", name: "Cordula Engelke" }
    ],
    links: [
      { label: "Eintrittserklärung", href: "/verein/downloads" },
      { label: "Satzung", href: "/verein/downloads" }
    ]
  },
  {
    slug: "downloads",
    title: "Downloads",
    teaser: "Formulare, Satzungen, Ordnungen und Clubhaus-Unterlagen.",
    body: [
      "Hier stehen die wichtigsten Formulare und Vereinsunterlagen zentral zur Verfügung.",
      "Downloads sind als eigene Datensätze geführt und können später unabhängig von Seitentexten ausgetauscht werden."
    ]
  },
  {
    slug: "kleinanzeigen",
    title: "Kleinanzeigen",
    teaser: "Nachhaltige Boerse fuer Vereins- und JSG-Nord-Mitglieder.",
    body: [
      "Hier koennen Vereins- und JSG-Nord-Mitglieder gut erhaltene Fussballschuhe sowie Trainingsanzuege zum Verkauf anbieten.",
      "Anzeigen koennen per Mail mit Foto, Groesse, Preisvorstellung und Kontaktmoeglichkeit an Jugendleiter@jsg-nord.com geschickt werden.",
      "Wichtig: Der Verein vermittelt nicht. Der Kontakt findet direkt zwischen Interessent und Verkaeufer statt. Sobald etwas nicht mehr verfuegbar ist, reicht eine formlose Mail, damit die Anzeige geloescht werden kann.",
      "Lasst uns gemeinsam etwas nachhaltiger werden - und die Geldbeutel der Familien schonen."
    ],
    contacts: [{ role: "Kleinanzeigen", name: "Jugendleitung JSG Nord", email: "Jugendleiter@jsg-nord.com" }]
  },
  {
    slug: "fanartikel",
    title: "Fanartikel",
    teaser: "Fanshop, Restposten und Artikel rund um den FSV.",
    body: [
      "Zusätzlich zum externen Fanshop gibt es beim FSV einzelne Artikel und Restposten.",
      "Alle Artikel sind bei Heimspielen erhältlich. Zusätzlich können Artikel per Mail an fanshop@fsvalgermissen.de bestellt werden."
    ],
    products: [
      { name: "Trainingsjacke + Hose", description: "Restposten" },
      { name: "Poloshirt", description: "Restposten" },
      { name: "Schal", price: "10,- EUR" },
      { name: "Wendeschal", description: "Ein Ort - Ein Verein" },
      { name: "Tasse", description: "FSV Algermissen", price: "10,- EUR" },
      { name: "Feuerzeug", description: "Elektronikfeuerzeug FSV Algermissen", price: "2,- EUR" },
      { name: "Pin", description: "Wappen mit Schmetterlingverschluss", price: "3,50 EUR" },
      { name: "Aufkleber + Kuli", description: "auf Anfrage erhältlich" }
    ],
    links: [{ label: "Per Mail bestellen", href: "mailto:fanshop@fsvalgermissen.de" }],
    ctaLabel: "Zum externen Fanshop",
    ctaHref: "https://fsvalgermissen.fan12.de/"
  }
];

export const downloads = [
  "Vereinssatzung",
  "Datenschutzordnung",
  "Beitragsordnung",
  "Eintrittserklärung",
  "Eintrittserklärung ausfüllbar",
  "Passantrag NFV",
  "Passantrag NFV als PDF",
  "Passantrag NFV Online-Ausfüllhilfe",
  "Nutzungsvertrag Clubhaus",
  "Satzung Fußballförderverein",
  "Eintrittserklärung Fußballförderverein"
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
  { label: "Kleinanzeigen", href: "/verein/kleinanzeigen" },
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
