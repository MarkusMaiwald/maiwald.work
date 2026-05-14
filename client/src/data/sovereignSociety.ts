// Sovereign Society SAE / Libertaria Foundation — public property catalogue surfaced on maiwald.work.
// Canonical homes: each property's `url` is the source of truth; this file is just the index.

export type SsTier = 'philosophical' | 'academic' | 'tooling';

export interface SsBilingual {
  EN: string;
  DE: string;
}

export interface SsFeaturedItem {
  title: string;
  href: string;
  note?: SsBilingual;
}

export interface SsProperty {
  id: string;
  name: string;
  tier: SsTier;
  roles: string[];
  url: string;
  blurb: SsBilingual;
  status?: SsBilingual;
  featured?: SsFeaturedItem[];
  /** Cross-link to a sibling entry in ProjectShowcase, by id. */
  projectSibling?: string;
}

export const sovereignSocietyMission: SsBilingual = {
  EN: 'The Foundation hosts projects coping with, expecting, fearing, and embracing the AGI / ASI era — human-centric, AI-embracing, post-state-aware.',
  DE: 'Die Foundation hostet Projekte, die mit der AGI- / ASI-Ära ringen, sie erwarten, fürchten und umarmen — humanzentriert, KI-umarmend, post-staatlich denkend.',
};

export const sovereignSocietyProperties: SsProperty[] = [
  // ─── Tier 1 — Philosophical ──────────────────────────────────────────
  {
    id: 'sovereign-society-org',
    name: 'sovereign-society.org',
    tier: 'philosophical',
    roles: ['President'],
    url: 'https://sovereign-society.org',
    blurb: {
      EN: "The Foundation's official face. Hosts the curated journal, papers index, membership, and Principals.",
      DE: 'Das offizielle Gesicht der Foundation. Hostet das kuratierte Journal, den Papers-Index, Mitgliedschaft und Principals.',
    },
    status: { EN: 'live', DE: 'live' },
    featured: [
      { title: 'The Exitarian Manifesto', href: 'https://sovereign-society.org/journal/2026-03-08-the-only-right-an-exitarian-manifesto' },
      { title: "The Steward's Covenant", href: 'https://sovereign-society.org/journal/2026-03-13-the-stewards-covenant' },
      { title: 'The Membrane Manifesto', href: 'https://sovereign-society.org/journal/2026-02-23-membrane-manifesto' },
    ],
  },
  {
    id: 'libertaria-app',
    name: 'libertaria.app',
    tier: 'philosophical',
    roles: ['Editor', 'Author'],
    url: 'https://libertaria.app',
    blurb: {
      EN: 'The Exitarian School blog. Interpreting governance, exit, and the AGI/ASI era through a sovereign-systems lens.',
      DE: 'Der Blog der Exitarian-Schule. Interpretiert Governance, Exit und die AGI/ASI-Ära durch die Linse souveräner Systeme.',
    },
    status: { EN: '75+ essays · 2017→present', DE: '75+ Essays · 2017→heute' },
    featured: [
      { title: 'The Federation Axioms', href: 'https://libertaria.app/blog/2020-03-15-the-federation-axioms' },
      { title: 'The Four Pillars of a Decentralized Society', href: 'https://libertaria.app/blog/2017-10-01-the-four-pillars-of-a-decentralized-society' },
      { title: 'Kenya Rule', href: 'https://libertaria.app/blog/2026-02-01-kenya-rule' },
      { title: 'The Membrane Manifesto', href: 'https://libertaria.app/blog/2026-03-20-the-membrane-manifesto' },
    ],
  },
  {
    id: 'git-sovereign-society-org',
    name: 'git.sovereign-society.org',
    tier: 'philosophical',
    roles: ['Operator'],
    url: 'https://git.sovereign-society.org',
    blurb: {
      EN: 'Forgejo / Gitea code hosting for the Foundation and its public repositories. Deploy endpoint for SS site builds.',
      DE: 'Forgejo- / Gitea-Code-Hosting für die Foundation und ihre öffentlichen Repositories. Deploy-Endpunkt für SS-Site-Builds.',
    },
    status: { EN: 'live', DE: 'live' },
  },
  // ─── Tier 2 — Academic ───────────────────────────────────────────────
  {
    id: 'skh-paper',
    name: 'SKH',
    tier: 'academic',
    roles: ['Author'],
    url: 'https://sovereign-society.org/papers/skh-v2',
    blurb: {
      EN: 'Anonymous Root Keys for Quantum-Safe Decentralized Identity. Three-tier hierarchical architecture combining post-quantum KEX, context-separated identities, sybil resistance, and anonymous roots — without blockchain dependency.',
      DE: 'Anonyme Root-Keys für quantensichere dezentrale Identität. Drei-Schichten-Hierarchie mit Post-Quanten-KEX, kontextgetrennten Identitäten, Sybil-Resistenz und anonymen Wurzeln — ohne Blockchain-Abhängigkeit.',
    },
    status: { EN: 'arXiv v2 · NeurIPS 2025 · USENIX 2027 (in flight)', DE: 'arXiv v2 · NeurIPS 2025 · USENIX 2027 (in Bearbeitung)' },
    featured: [
      { title: 'arXiv v2', href: 'https://sovereign-society.org/papers/skh-v2' },
      { title: 'EasyCrypt + Tamarin proofs', href: 'https://git.sovereign-society.org/skh-paper', note: { EN: 'machine-checked formal proofs', DE: 'maschinell geprüfte formale Beweise' } },
    ],
  },
  {
    id: 'mosaic-did-paper',
    name: 'Mosaic DID',
    tier: 'academic',
    roles: ['Co-author'],
    url: 'https://sovereign-society.org/papers/mosaic-did',
    blurb: {
      EN: 'Blockchain-Agnostic Self-Sovereign Identity with Selective Disclosure. JSON-Digest disclosure, cross-chain anchoring, key rotation and revocation without vendor lock-in.',
      DE: 'Blockchain-agnostische Self-Sovereign Identity mit selektiver Offenlegung. JSON-Digest-Offenlegung, Cross-Chain-Anker, Key-Rotation und Widerruf ohne Vendor-Lock-in.',
    },
    status: { EN: 'arXiv submission · co-author Attila Vágvölgyi', DE: 'arXiv-Einreichung · Co-Autor Attila Vágvölgyi' },
    featured: [
      { title: 'arXiv preprint', href: 'https://sovereign-society.org/papers/mosaic-did' },
      { title: 'iop-rs reference impl', href: 'https://github.com/Internet-of-People/iop-rs' },
    ],
  },
  {
    id: 'cryptocurrency-whitepaper',
    name: 'Cryptocurrency whitepaper',
    tier: 'academic',
    roles: ['Author'],
    url: 'https://sovereign-society.org/papers/cryptocurrency',
    blurb: {
      EN: 'Foundation-published cryptocurrency whitepaper (2026-03). Full description forthcoming.',
      DE: 'Foundation-veröffentlichtes Cryptocurrency-Whitepaper (2026-03). Volle Beschreibung folgt.',
    },
    status: { EN: 'PDF · March 2026', DE: 'PDF · März 2026' },
  },
  // ─── Tier 3 — Tooling ────────────────────────────────────────────────

  {
    id: 'devlog-libertaria-dev',
    name: 'devlog.libertaria.dev',
    tier: 'tooling',
    roles: ['Operator', 'Author'],
    url: 'https://devlog.libertaria.dev',
    blurb: {
      EN: 'Public engineering field log for the Libertaria ecosystem: Janus, Nexus, Graf, ProGit, and the sovereign tooling stack.',
      DE: 'Öffentliches Engineering-Feldlog des Libertaria-Ökosystems: Janus, Nexus, Graf, ProGit und der souveräne Tooling-Stack.',
    },
    status: { EN: 'live · engineering dispatches', DE: 'live · Engineering-Dispatches' },
  },
  {
    id: 'janus-lang-org',
    name: 'janus-lang.org',
    tier: 'tooling',
    roles: ['Creator', 'Language Designer'],
    url: 'https://janus-lang.org',
    projectSibling: 'janus-lang',
    blurb: {
      EN: 'Public home of Janus: the systems language for syntactic honesty, visible costs, and sovereign software education.',
      DE: 'Öffentlicher Auftritt von Janus: die Systemsprache für syntaktische Ehrlichkeit, sichtbare Kosten und souveräne Softwarebildung.',
    },
    status: { EN: 'live', DE: 'live' },
    featured: [
      { title: 'Learn Janus — The Monastery', href: 'https://learn.janus-lang.org' },
      { title: 'Janus documentation', href: 'https://docs.janus-lang.org' },
    ],
  },
  {
    id: 'nexus-os-org',
    name: 'nexus-os.org',
    tier: 'tooling',
    roles: ['Creator', 'Lead Architect'],
    url: 'https://nexus-os.org',
    projectSibling: 'nexus-os',
    blurb: {
      EN: 'Public home of Nexus OS: sovereign operating-system work, NIIX architecture, and post-cloud infrastructure doctrine.',
      DE: 'Öffentlicher Auftritt von Nexus OS: souveräne Betriebssystemarbeit, NIIX-Architektur und Post-Cloud-Infrastruktur-Doktrin.',
    },
    status: { EN: 'live', DE: 'live' },
    featured: [
      { title: 'Nexus docs', href: 'https://docs.nexus-os.org' },
    ],
  },
  {
    id: 'graf-tools',
    name: 'graf.tools',
    tier: 'tooling',
    roles: ['Creator'],
    url: 'https://graf.tools',
    projectSibling: 'graf-vcs',
    blurb: {
      EN: 'Official site for Graf — content-addressed cryptographic VCS. BLAKE3 + Merkle, three-way merge, fiber concurrency.',
      DE: 'Offizielle Seite für Graf — content-adressiertes kryptografisches VCS. BLAKE3 + Merkle, Drei-Wege-Merge, Faser-Nebenläufigkeit.',
    },
    status: { EN: 'live · 101 tests passing · sub-100ms incremental status', DE: 'live · 101 Tests bestanden · Sub-100ms-Inkrementalstatus' },
    featured: [
      { title: 'Commands: init / checkpoint / merge / sync', href: 'https://graf.tools/docs' },
    ],
  },
  {
    id: 'grafhub-org',
    name: 'grafhub.org',
    tier: 'tooling',
    roles: ['Creator', 'Operator'],
    url: 'https://grafhub.org',
    projectSibling: 'grafhub',
    blurb: {
      EN: 'Sovereign Git-hosting platform. Graf-native github.com replacement. Multi-service: api / hub / registry / repository.',
      DE: 'Souveräne Git-Hosting-Plattform. Graf-nativer github.com-Ersatz. Multi-Service: api / hub / registry / repository.',
    },
    status: { EN: 'launching ~2026-05-09', DE: 'Start ~2026-05-09' },
  },
  {
    id: 'progit-dev',
    name: 'progit.dev',
    tier: 'tooling',
    roles: ['Creator'],
    url: 'https://progit.dev',
    projectSibling: 'progit',
    blurb: {
      EN: 'Site for ProGit — terminal Git workflow manager (Rust). Virtual branches, AI agents, 10 MB binary, sub-100ms cold start.',
      DE: 'Seite für ProGit — Terminal-Git-Workflow-Manager (Rust). Virtuelle Branches, KI-Agenten, 10-MB-Binary, Sub-100ms-Kaltstart.',
    },
    status: { EN: 'stable beta v0.7 · recruiting testers', DE: 'stabile Beta v0.7 · sucht Tester' },
  },
  {
    id: 'libertaria-dev',
    name: 'libertaria.dev',
    tier: 'tooling',
    roles: ['Creator'],
    url: 'https://libertaria.dev',
    projectSibling: 'libertaria',
    blurb: {
      EN: 'Developer portal for the Libertaria Protocol — focused on L0 (the wire): P2P mesh, Noise + Ed25519, satellite-ready, 8-byte control messages.',
      DE: 'Entwicklerportal für das Libertaria-Protokoll — Fokus auf L0 (die Leitung): P2P-Mesh, Noise + Ed25519, satellitentauglich, 8-Byte-Steuernachrichten.',
    },
    status: { EN: 'live', DE: 'live' },
  },
];
