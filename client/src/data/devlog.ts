// Devlog entries — hand-rolled, newest first.
// Surfaced on the desktop via DevlogWidget (latest entry preview) and in the
// full DevlogApp dock-app modal (chronological list).

export type DevlogProject =
  | 'Janus'
  | 'Nexus OS'
  | 'Graf'
  | 'GrafHub'
  | 'ProGit'
  | 'Libertaria'
  | 'Chapter ZERO'
  | 'Sovereign Society'
  | 'maiwald.work'
  | 'cross-project';

export interface DevlogBilingual {
  EN: string;
  DE: string;
}

export interface DevlogEntry {
  id: string;
  /** ISO date YYYY-MM-DD. */
  date: string;
  project: DevlogProject;
  title: DevlogBilingual;
  summary: DevlogBilingual;
}

export const devlogEntries: DevlogEntry[] = [
  {
    id: '2026-04-25-sovereign-society-app',
    date: '2026-04-25',
    project: 'Sovereign Society',
    title: {
      EN: 'Sovereign Society SAE dock app shipped',
      DE: 'Sovereign Society SAE Dock-App ausgeliefert',
    },
    summary: {
      EN: '10 Foundation properties surfaced in three tiers (philosophical / academic / tooling), with a custom-event cross-link round-trip into ProjectShowcase. The Tier-3 tooling cards now jump straight to the matching technical-project detail modal.',
      DE: '10 Foundation-Eigentümer in drei Ebenen (philosophisch / akademisch / Werkzeuge) sichtbar, mit einer Custom-Event-Cross-Link-Brücke zur ProjectShowcase. Die Tier-3-Werkzeugkarten springen jetzt direkt zum passenden Detail-Modal des technischen Projekts.',
    },
  },
  {
    id: '2026-04-25-grafhub-progit-projects',
    date: '2026-04-25',
    project: 'cross-project',
    title: {
      EN: 'GrafHub + ProGit added to the project grid',
      DE: 'GrafHub + ProGit zum Projekt-Raster hinzugefügt',
    },
    summary: {
      EN: 'Both now have full ProjectShowcase entries with a `foundationUrl` field that renders a gold "Foundation surface" badge on each card. GrafHub launching ~2026-05-09; ProGit at stable beta v0.7, recruiting testers.',
      DE: 'Beide haben nun vollständige ProjectShowcase-Einträge mit einem `foundationUrl`-Feld, das auf jeder Karte ein goldenes "Foundation-Surface"-Badge rendert. GrafHub-Start ~2026-05-09; ProGit in stabiler Beta v0.7, sucht Tester.',
    },
  },
  {
    id: '2026-04-25-ai-chat-glm51',
    date: '2026-04-25',
    project: 'maiwald.work',
    title: {
      EN: 'AI chat swapped: Gemini → GLM-5.1',
      DE: 'AI-Chat getauscht: Gemini → GLM-5.1',
    },
    summary: {
      EN: 'Via a shared `fetch` helper in `shared/ai.ts` so both the Express dev server and the Cloudflare Workers entry route through one code path. Caught a reasoning-mode trap on the way (GLM-5.1 returns thinking output in `reasoning_content` separately from final `content`) — disabled `thinking` for chat-style use.',
      DE: 'Über einen gemeinsamen Fetch-Helper in `shared/ai.ts`, sodass sowohl der Express-Dev-Server als auch der Cloudflare-Workers-Eintrag über denselben Code-Pfad laufen. Eine Reasoning-Mode-Falle entdeckt (GLM-5.1 trennt das Denken in `reasoning_content` vom finalen `content`) — `thinking` für Chat-Einsatz deaktiviert.',
    },
  },
  {
    id: '2026-04-24-v1-content-pass',
    date: '2026-04-24',
    project: 'maiwald.work',
    title: {
      EN: 'v1 content pass — killed the €1,500/month CTO framing',
      DE: 'v1-Content-Pass — die 1.500-€/Monat-CTO-Positionierung gekillt',
    },
    summary: {
      EN: 'Identity rewritten across 14 files to "Systems Architect · President, Sovereign Society · Leader, Chapter ZERO". The site is a filter now, not a brochure. AI prompt rewritten to refuse hourly / retainer / fractional-CTO requests outright.',
      DE: 'Identität über 14 Dateien hinweg neu geschrieben zu "Systems Architect · Präsident, Sovereign Society · Leiter, Chapter ZERO". Die Site ist jetzt ein Filter, keine Broschüre. AI-Prompt umgeschrieben, um Stunden- / Retainer- / Fractional-CTO-Anfragen rundweg abzuweisen.',
    },
  },
  {
    id: '2026-04-24-engagement-chapterzero',
    date: '2026-04-24',
    project: 'Chapter ZERO',
    title: {
      EN: 'Chapter ZERO + Engagement modals replaced "CTO as a Service"',
      DE: 'Chapter-ZERO- + Engagement-Modale ersetzten "CTO as a Service"',
    },
    summary: {
      EN: 'Two new dock apps. The Chapter ZERO modal carries the genesis-polity framing and Libertaria axioms; the Engagement modal carries the equity-only manifesto and the "what I won\'t do" filter list.',
      DE: 'Zwei neue Dock-Apps. Das Chapter-ZERO-Modal trägt die Genesis-Gemeinwesen-Rahmung und die Libertaria-Axiome; das Engagement-Modal trägt das Equity-only-Manifest und die "was ich nicht mache"-Filterliste.',
    },
  },
];
