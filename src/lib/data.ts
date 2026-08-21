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

export const teams: Team[] = [
  {
    slug: "1-herren",
    name: "1. Herren",
    shortName: "1. Herren",
    area: "senioren",
    league: "Kreisliga Staffel A",
    description:
      "Die erste Herrenmannschaft steht fuer ambitionierten Seniorenfussball im FSV, ist aber bewusst Teil eines groesseren Vereinsauftritts.",
    trainingTimes: ["Dienstag 19:00-21:00", "Donnerstag 19:00-21:00"],
    trainingLocation: "REWE-Rudat-Arena",
    contacts: [{ role: "Sportliche Leitung", name: "wird im CMS gepflegt" }],
    image: "https://images.ebcdn.de/club-4844/TeamImage_10821.jpg?404=default.png&format=jpg&mode=max&v=4&width=1180",
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
    description:
      "Die zweite Herrenmannschaft bekommt denselben redaktionellen Raum wie die erste Mannschaft: News, Teamdaten, Spielinfos und Ansprechpartner.",
    trainingTimes: ["Trainingszeiten werden migriert"],
    trainingLocation: "Ostpreussen-Stadion",
    contacts: [{ role: "Ansprechpartner", name: "wird im CMS gepflegt" }],
    image: "https://images.ebcdn.de/club-4844/TeamImage_10822.jpg?404=default.png&format=jpg&mode=max&v=3&width=1180",
    externalIds: {
      clubId: "4844",
      teamId: "10822",
      currentWebsiteUrl: "https://www.fsvalgermissen.de/mannschaft/10822/2-herren"
    }
  },
  {
    slug: "ue32",
    name: "Alt-Herren (UE-32)",
    shortName: "UE-32",
    area: "senioren",
    description:
      "Seniorenfussball, Vereinsbindung und Spielbetrieb fuer die Alt-Herren.",
    trainingTimes: ["Trainingszeiten werden migriert"],
    contacts: [{ role: "Ansprechpartner", name: "wird im CMS gepflegt" }],
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
    trainingTimes: ["Trainingszeiten werden migriert"],
    contacts: [{ role: "Ansprechpartner", name: "wird im CMS gepflegt" }],
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
    description: "Mannschaftsseite fuer die aeltesten Junioren im FSV/JSG-Kontext.",
    trainingTimes: ["Trainingszeiten werden migriert"],
    contacts: [{ role: "Trainerteam", name: "wird im CMS gepflegt" }],
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
    description: "Struktureller Platz fuer News, Training, Trainer und FUSSBALL.DE Widgets.",
    trainingTimes: ["Trainingszeiten werden migriert"],
    contacts: [{ role: "Trainerteam", name: "wird im CMS gepflegt" }],
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
    description: "C-Junioren mit automatischer News-Zuordnung und spaeterer Spielplanintegration.",
    trainingTimes: ["Trainingszeiten werden migriert"],
    contacts: [{ role: "Trainerteam", name: "wird im CMS gepflegt" }],
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
    trainingTimes: ["Trainingszeiten werden migriert"],
    contacts: [{ role: "Trainerteam", name: "wird im CMS gepflegt" }],
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
    trainingTimes: ["Trainingszeiten werden migriert"],
    contacts: [{ role: "Trainerteam", name: "wird im CMS gepflegt" }],
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
    trainingTimes: ["Trainingszeiten werden migriert"],
    contacts: [{ role: "Trainerteam", name: "wird im CMS gepflegt" }],
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
    trainingTimes: ["Trainingszeiten werden migriert"],
    contacts: [{ role: "Trainerteam", name: "wird im CMS gepflegt" }],
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
    trainingTimes: ["Trainingszeiten werden migriert"],
    contacts: [{ role: "Trainerteam", name: "wird im CMS gepflegt" }],
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
  { slug: "cosmophone", name: "Cosmophone", category: "Exklusiv-Partner", website: "https://www.cosmophone.de/" },
  { slug: "sportkluft", name: "Sportkluft", category: "Exklusiv-Partner", website: "https://sportkluft.eu/" },
  { slug: "telis", name: "Telis Finanz - Umut Buz", category: "Exklusiv-Partner", website: "https://www.telis-finanz.de/" },
  { slug: "continentale", name: "Die Continentale", category: "Partner" },
  { slug: "lokschuppen", name: "Wirtshaus zum Lokschuppen", category: "Partner", website: "https://wirtshaus-zum-lokschuppen.de/" }
];

export const news: NewsItem[] = [
  {
    slug: "mitgliederversammlung-2026",
    title: "Bericht ueber die Mitgliederversammlung 2026",
    teaser: "Der FSV blickt auf ein gelungenes Vereinsjahr und stellt die Weichen fuer die naechsten Aufgaben.",
    body:
      "Diese Beispielnews bildet die bestehende Vereinsmeldung nach und zeigt, wie eine Vereinsnews ohne Teambindung auf Startseite und News-Seite erscheint.",
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
      "Diese News ist zugleich Vereins- und Jugendinhalt. Sie wird ueber Tags auf der Startseite, der News-Seite und bei Jugend/JSG sichtbar.",
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
      "Sponsoren- und Vereinsleben-News koennen mehreren Bereichen zugeordnet und spaeter Sponsorenprofilen verknuepft werden.",
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
      "Darts-News werden zentral gespeichert und erscheinen automatisch im Darts-Bereich sowie auf den Teamseiten.",
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
    teaser: "Kreisliga, Trainingsrhythmus und Team-Partner sind fuer die Mannschaftsseite vorbereitet.",
    body:
      "Diese Mannschaftsnews ist nur einmal angelegt und wird ueber die Team-Zuordnung automatisch auf der 1.-Herren-Seite angezeigt.",
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
      "Die aktuelle Bestandsseite fuehrt den Vorstand mit Stand 19.05.2026. Die finale Migration sollte Rollen, Kontaktdaten und Freigaben im CMS sauber pruefen.",
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
      "Der Mietvertrag wird in Milestone 3 in die Download- und R2-Struktur ueberfuehrt."
    ],
    ctaLabel: "Downloads ansehen",
    ctaHref: "/verein/downloads"
  },
  {
    slug: "rewe-rudat-arena",
    title: "REWE-Rudat-Arena",
    teaser: "Sportstaette am Grasweg mit Anfahrt und Dokumenten.",
    body: [
      "Die Arena erhaelt eine eigene Seite fuer Anfahrt, Bilder, Belegung und spaetere Spieltagsinformationen.",
      "Bestehende Hygienekonzepte und Dokumente werden als Downloads modelliert."
    ]
  },
  {
    slug: "ostpreussen-stadion",
    title: "Ostpreussen-Stadion",
    teaser: "Weitere Sportstaette des FSV mit eigener Informationsseite.",
    body: [
      "Auch das Ostpreussen-Stadion bleibt als Vereinsbereich erhalten und wird nicht in der Navigation versteckt.",
      "Anfahrts- und Dokumentlinks werden im CMS verwaltbar."
    ]
  },
  {
    slug: "sponsoren",
    title: "Sponsoren",
    teaser: "Premium-Partner, Exklusiv-Partner, Partner und Team-Sponsoren.",
    body: [
      "Sponsoren werden kategorisiert, sortierbar und optional Teams zugeordnet.",
      "Die Startseite zeigt eine kuratierte Auswahl, die Sponsorenseite spaeter alle aktiven Partner."
    ]
  },
  {
    slug: "foerderverein",
    title: "Fussballfoerderverein",
    teaser: "Unterstuetzung fuer Fussball und Vereinsentwicklung.",
    body: [
      "Der bestehende Foerderverein bleibt als eigenstaendiger Navigationspunkt erhalten.",
      "Mitgliedschaft, Foerderziele und Dokumente werden im CMS gepflegt."
    ]
  },
  {
    slug: "downloads",
    title: "Downloads",
    teaser: "Formulare, Satzungen, Ordnungen und Clubhaus-Unterlagen.",
    body: [
      "Vereinssatzung, Datenschutzordnung, Beitragsordnung, Eintrittserklaerungen, NFV-Passantrag und Clubhaus-Nutzungsvertrag sind als zentrale Download-Kategorien vorgesehen.",
      "Dateien sollen spaeter sicher in Cloudflare R2 liegen."
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
  fussballDeUrl: "https://www.fussball.de/",
  note:
    "Vereinsweite Widget-IDs werden in next.fussball.de fuer die aktuelle Domain erstellt und hier hinterlegt."
};

export const footballWidgets = teams.reduce<Record<string, FootballWidgetConfig>>((acc, team) => {
  acc[team.slug] = {
    fussballDeUrl: team.externalIds?.currentWebsiteUrl,
    note:
      "Team-Widget-IDs werden in next.fussball.de erzeugt. data-id und data-type aus dem Codeblock hier eintragen."
  };
  return acc;
}, {});

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
  { label: "Admin", href: "/admin" }
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

export function getClubPage(slug: string) {
  return clubPages.find((page) => page.slug === slug);
}

export function filterSponsors(category?: Sponsor["category"]) {
  return sponsors.filter((sponsor) => !category || sponsor.category === category);
}
