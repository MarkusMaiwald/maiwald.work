import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CyberpunkPanel,
  GlitchText,
  DataVisualization,
  MatrixBackground,
  CyberpunkAudio,
} from "./CyberpunkEffects";
import { Language } from "../hooks/useLanguage";

interface Project {
  id: string;
  name: string;
  category: string;
  stack: string[];
  description: string;
  status: "ACTIVE" | "R&D" | "PRODUCTION" | "SCALING";
  impact: string;
  role: string;
  icon: string;
  color: string;
  customers?: { name: string; url: string }[];
  foundationUrl?: string; // Foundation/marketing site for this project, if it has a public surface
}

interface ProjectShowcaseProps {
  currentLanguage: Language;
  /** When set, immediately opens that project's detail modal on mount/change. Consumed once per value. */
  initialProjectId?: string;
}

export function ProjectShowcase({ currentLanguage, initialProjectId }: ProjectShowcaseProps) {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>(
    currentLanguage === "EN" ? "ALL" : "ALLE",
  );
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Mouse tracking for cyberpunk cursor in project modal
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (selectedProject) {
        setCursorPosition({ x: event.clientX, y: event.clientY });
      }
    };

    if (selectedProject) {
      document.addEventListener("mousemove", handleMouseMove);
      return () => document.removeEventListener("mousemove", handleMouseMove);
    }
  }, [selectedProject]);

  // Open a specific project's detail modal when an external trigger sets initialProjectId.
  useEffect(() => {
    if (initialProjectId) {
      setSelectedProject(initialProjectId);
    }
  }, [initialProjectId]);

  // ESC key functionality for project modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject) {
        setSelectedProject(null);
      }
    };

    if (selectedProject) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedProject]);

  // Multilingual project content
  const getProjectContent = (currentLanguage: Language) => {
    const projectContent = {
      EN: {
        categories: [
          "ALL",
          "LANGUAGES",
          "SYSTEMS",
          "INFRASTRUCTURE",
          "BLOCKCHAIN",
        ],
        filterLabel: "Filter Projects",
        detailsButton: "DETAILS",
        manifestButton: "MANIFEST",
      },
      DE: {
        categories: [
          "ALLE",
          "SPRACHEN",
          "SYSTEME",
          "INFRASTRUKTUR",
          "BLOCKCHAIN",
        ],
        filterLabel: "Projekte Filtern",
        detailsButton: "DETAILS",
        manifestButton: "MANIFEST",
      },
    };
    return projectContent[currentLanguage];
  };

  const getProjects = (currentLanguage: Language): Project[] => [
    {
      id: "nexus-os",
      name: "Nexus OS",
      category: currentLanguage === "EN" ? "SYSTEMS" : "SYSTEME",
      stack: ["Zig", "Nim", "RISC-V", "Unikernel", "Hypervisor", "Post-Quantum"],
      description:
        currentLanguage === "EN"
          ? "Sovereign operating system from scratch. Hybrid unikernel/hypervisor with capability-based security, post-quantum cryptography, and zero-trust architecture. Not a Linux distro."
          : "Souveränes Betriebssystem von Grund auf. Hybrid-Unikernel/Hypervisor mit Capability-basierter Sicherheit, Post-Quanten-Kryptographie und Zero-Trust-Architektur. Keine Linux-Distribution.",
      status: "ACTIVE",
      impact:
        currentLanguage === "EN"
          ? "Complete OS stack: tickless kernel, Type-1 hypervisor, capability algebra, lock-free IPC, and sovereign network transport — 33 development phases completed"
          : "Kompletter OS-Stack: tickless Kernel, Typ-1-Hypervisor, Capability-Algebra, lock-free IPC und souveräner Netzwerktransport — 33 Entwicklungsphasen abgeschlossen",
      role:
        currentLanguage === "EN"
          ? "Creator & Lead Architect"
          : "Schöpfer & Lead-Architekt",
      icon: "⬢",
      color: "cyberpunk-electric-blue",
    },
    {
      id: "nimpak",
      name: "NimPak",
      category: currentLanguage === "EN" ? "SYSTEMS" : "SYSTEME",
      stack: ["Nim", "Cryptography", "Security", "Package Management"],
      description:
        currentLanguage === "EN"
          ? "Next-Generation Package Manager and System Management Tool for NexusOS. Zero-trust verification with atomic rollbacks."
          : "Next-Generation Paketmanager und System-Management-Tool für NexusOS. Zero-Trust-Verifikation mit atomaren Rollbacks.",
      status: "R&D",
      impact:
        currentLanguage === "EN"
          ? "Revolutionary package management with cryptographic security and immutable system states"
          : "Revolutionäre Paketverwaltung mit kryptographischer Sicherheit und unveränderlichen Systemzuständen",
      role:
        currentLanguage === "EN"
          ? "Lead Developer & Security Architect"
          : "Lead-Entwickler & Sicherheitsarchitekt",
      icon: "◉",
      color: "cyberpunk-neon-magenta",
    },
    {
      id: "nexus-build-toolkit",
      name:
        currentLanguage === "EN"
          ? "Nexus Build Toolkit"
          : "Nexus Build Toolkit",
      category: currentLanguage === "EN" ? "SYSTEMS" : "SYSTEME",
      stack: [
        "LLVM",
        "Compiler",
        "Static Analysis",
        "Security",
        "Cross-Platform",
      ],
      description:
        currentLanguage === "EN"
          ? "Core system compiler and building toolkit for NexusOS. Advanced LLVM-based compilation with security-first optimization."
          : "Kernsystem-Compiler und Building-Toolkit für NexusOS. Fortgeschrittene LLVM-basierte Kompilierung mit sicherheitsorientierter Optimierung.",
      status: "R&D",
      impact:
        currentLanguage === "EN"
          ? "Advanced compilation infrastructure for secure, optimized system components"
          : "Fortgeschrittene Kompilierungsinfrastruktur für sichere, optimierte Systemkomponenten",
      role:
        currentLanguage === "EN"
          ? "Compiler Engineer & System Architect"
          : "Compiler-Ingenieur & Systemarchitekt",
      icon: "⬟",
      color: "cyberpunk-acid-green",
    },
    {
      id: "cloud-infrastructure",
      name:
        currentLanguage === "EN"
          ? "Cloud-Native Infrastructure"
          : "Cloud-Native Infrastruktur",
      category: currentLanguage === "EN" ? "INFRASTRUCTURE" : "INFRASTRUKTUR",
      stack: ["Kubernetes", "Docker", "Terraform", "AWS", "GCP"],
      description:
        currentLanguage === "EN"
          ? "Scalable cloud infrastructure solutions enabling rapid deployment and operational excellence."
          : "Skalierbare Cloud-Infrastrukturlösungen für schnelle Bereitstellung und operative Exzellenz.",
      status: "SCALING",
      impact:
        currentLanguage === "EN"
          ? "Powering business-critical applications with 99.9% uptime"
          : "Unterstützung geschäftskritischer Anwendungen mit 99,9% Verfügbarkeit",
      role:
        currentLanguage === "EN"
          ? "Infrastructure Architect"
          : "Infrastruktur-Architekt",
      icon: "◈",
      color: "cyberpunk-neon-cyan",
    },
    {
      id: "ttrpg-platform",
      name:
        currentLanguage === "EN"
          ? "Decentralized TTRPG Platform"
          : "Dezentrale TTRPG-Plattform",
      category: "BLOCKCHAIN",
      stack: ["React", "Blockchain", "SSI", "DID", "Smart Contracts"],
      description:
        currentLanguage === "EN"
          ? "Revolutionary gaming platform integrating Self-Sovereign Identity and Decentralized Identifiers for next-gen user experience."
          : "Revolutionäre Gaming-Plattform mit Self-Sovereign Identity und Dezentralen Identifikatoren für Next-Gen-Benutzererfahrung.",
      status: "R&D",
      impact:
        currentLanguage === "EN"
          ? "Pioneering blockchain integration in gaming ecosystems"
          : "Pionierarbeit bei der Blockchain-Integration in Gaming-Ökosystemen",
      role:
        currentLanguage === "EN"
          ? "Technical Lead & Product Architect"
          : "Technical Lead & Produkt-Architekt",
      icon: "⬡",
      color: "cyberpunk-acid-green",
    },
    {
      id: "janus-lang",
      name: "Janus Language",
      category: currentLanguage === "EN" ? "SYSTEMS" : "SYSTEME",
      stack: ["Zig", "LLVM", "Compiler Design", "SSA IR", "Columnar AST"],
      description:
        currentLanguage === "EN"
          ? "Systems programming language for teaching and production. Compiles through Zig natively — zero FFI overhead. Syntactic honesty: all costs visible, no hidden complexity."
          : "Systemprogrammiersprache für Lehre und Produktion. Kompiliert nativ über Zig — kein FFI-Overhead. Syntaktische Ehrlichkeit: alle Kosten sichtbar, keine versteckte Komplexität.",
      status: "ACTIVE",
      impact:
        currentLanguage === "EN"
          ? "Core profile 100% complete. 477/478 integration tests passing. Progressive disclosure via profile system — from teaching fundamentals to GPU kernels"
          : "Core-Profil 100% vollständig. 477/478 Integrationstests bestanden. Progressive Offenlegung via Profilsystem — von Grundlagen bis GPU-Kernel",
      role:
        currentLanguage === "EN"
          ? "Language Designer & Compiler Engineer"
          : "Sprachdesigner & Compiler-Ingenieur",
      icon: "⬠",
      color: "cyberpunk-acid-green",
    },
    {
      id: "graf-vcs",
      name: "Graf",
      category: currentLanguage === "EN" ? "SYSTEMS" : "SYSTEME",
      stack: ["Zig", "BLAKE3", "Merkle Trees", "CBOR", "Myers Diff"],
      description:
        currentLanguage === "EN"
          ? "Content-addressed version control built in Janus and Zig. Merkle-tree integrity, BLAKE3 hashing, three-way merge, and fiber-based concurrency. Git reimagined for the cryptographic age."
          : "Content-adressierte Versionskontrolle in Janus und Zig. Merkle-Tree-Integrität, BLAKE3-Hashing, Drei-Wege-Merge und faserbasierte Nebenläufigkeit. Git neu gedacht für das kryptographische Zeitalter.",
      status: "ACTIVE",
      impact:
        currentLanguage === "EN"
          ? "Fully functional VCS with sub-100ms incremental status, native M:N fiber scheduler, and cryptographic integrity by default. 101 tests passing"
          : "Voll funktionsfähiges VCS mit sub-100ms inkrementellem Status, nativem M:N-Fiber-Scheduler und kryptographischer Integrität als Standard. 101 Tests bestanden",
      role:
        currentLanguage === "EN"
          ? "Creator & Developer"
          : "Schöpfer & Entwickler",
      icon: "▲",
      color: "cyberpunk-neon-cyan",
      foundationUrl: "https://graf.tools",
    },
    {
      id: "libertaria",
      name: "Libertaria Protocol",
      category: "BLOCKCHAIN",
      stack: ["Zig", "Rust", "Post-Quantum Crypto", "DID/SSI", "CRDT"],
      description:
        currentLanguage === "EN"
          ? "Decentralized governance protocol stack. Four-layer architecture from wire transport to federated governance — enabling communities to coordinate without central authority. Protocol, not platform."
          : "Dezentraler Governance-Protokollstack. Vier-Schichten-Architektur von Draht-Transport bis föderierter Governance — ermöglicht Gemeinschaften Koordination ohne zentrale Autorität. Protokoll, nicht Plattform.",
      status: "R&D",
      impact:
        currentLanguage === "EN"
          ? "Complete RFC specification across 4 layers. Post-quantum encryption (PQXDH), trust graph engine (QVL), thermodynamic spam protection. Kenya Rule: must work on solar-powered 2G devices"
          : "Vollständige RFC-Spezifikation über 4 Schichten. Post-Quanten-Verschlüsselung (PQXDH), Trust-Graph-Engine (QVL), thermodynamischer Spam-Schutz. Kenia-Regel: muss auf solarbetriebenen 2G-Geräten funktionieren",
      role:
        currentLanguage === "EN"
          ? "Protocol Architect & Founder"
          : "Protokoll-Architekt & Gründer",
      icon: "⚛",
      color: "cyberpunk-neon-magenta",
      foundationUrl: "https://libertaria.dev",
    },
    {
      id: "soulkey",
      name: "SoulKey / SKH",
      category: "BLOCKCHAIN",
      stack: ["Zig", "ED25519", "X25519", "ML-KEM-768", "BLAKE3"],
      description:
        currentLanguage === "EN"
          ? "Post-quantum hybrid identity primitive. Nobody can revoke your Soul Key — it is math, not a government service. Foundation for L1 of the Libertaria Protocol."
          : "Post-quantische hybride Identitäts-Primitive. Niemand kann deinen Soul Key widerrufen – es ist Mathematik, kein staatlicher Dienst. Fundament für L1 des Libertaria-Protokolls.",
      status: "R&D",
      impact:
        currentLanguage === "EN"
          ? "Hybrid ED25519 + X25519 + ML-KEM-768 construction. Academic paper in draft (SKH). Migration path from classical to post-quantum identity."
          : "Hybride ED25519 + X25519 + ML-KEM-768 Konstruktion. Akademisches Paper im Entwurf (SKH). Migrationspfad von klassischer zu post-quantischer Identität.",
      role:
        currentLanguage === "EN" ? "Designer & Author" : "Designer & Autor",
      icon: "✦",
      color: "cyberpunk-neon-magenta",
    },
    {
      id: "iop",
      name: "Internet of People (IoP)",
      category: "BLOCKCHAIN",
      stack: ["DID", "SSI", "Social Graph", "Layer-1"],
      description:
        currentLanguage === "EN"
          ? "Decentralized identity and social networking protocol. One of the earliest SSI/DID systems in production. Co-founder."
          : "Dezentrales Identitäts- und Social-Networking-Protokoll. Eines der frühesten SSI/DID-Systeme in Produktion. Mitgründer.",
      status: "PRODUCTION",
      impact:
        currentLanguage === "EN"
          ? "Production network; lineage traces back to PIVX governance experimentation. Direct ancestor of later Libertaria identity layer thinking."
          : "Produktionsnetzwerk; Linie reicht zurück bis zum PIVX-Governance-Experiment. Direkter Vorfahr des späteren Denkens zur Libertaria-Identitätsschicht.",
      role:
        currentLanguage === "EN" ? "Co-founder" : "Mitgründer",
      icon: "◯",
      color: "cyberpunk-acid-green",
    },
    {
      id: "vendible-feed-post",
      name: "Vendible / Feed / Post",
      category: currentLanguage === "EN" ? "LANGUAGES" : "SPRACHEN",
      stack: ["Libertaria L2", "CRDT", "Janus", "Graf"],
      description:
        currentLanguage === "EN"
          ? "Application layer on top of the Libertaria Protocol: Vendible (sovereign commerce), Feed (post-algorithmic timeline), Post (identity-anchored publishing). Janus-native."
          : "Anwendungsschicht auf dem Libertaria-Protokoll: Vendible (souveräner Handel), Feed (post-algorithmische Timeline), Post (identitätsverankertes Veröffentlichen). Janus-nativ.",
      status: "R&D",
      impact:
        currentLanguage === "EN"
          ? "Reference applications that exercise L2/L3 of the protocol end-to-end. Each is a filter on how the protocol's affordances translate to daily use."
          : "Referenz-Anwendungen, die L2/L3 des Protokolls Ende zu Ende durchlaufen. Jede ist ein Filter dafür, wie die Möglichkeiten des Protokolls sich in den Alltag übersetzen.",
      role:
        currentLanguage === "EN"
          ? "Systems Architect"
          : "Systems Architect",
      icon: "⬡",
      color: "cyberpunk-electric-blue",
    },
    {
      id: "grafhub",
      name: "GrafHub",
      category: currentLanguage === "EN" ? "INFRASTRUCTURE" : "INFRASTRUKTUR",
      stack: ["Graf-native", "Multi-service", "API", "Hub", "Registry", "Repository"],
      description:
        currentLanguage === "EN"
          ? "Sovereign Git-hosting platform built Graf-native — a github.com replacement. Four-service architecture (api / hub / registry / repository) hosting Graf checkpoints and serving them with cryptographic provenance by default."
          : "Souveräne Git-Hosting-Plattform, Graf-nativ — ein github.com-Ersatz. Vier-Service-Architektur (api / hub / registry / repository), die Graf-Checkpoints hostet und sie standardmäßig mit kryptografischer Provenienz ausliefert.",
      status: "ACTIVE",
      impact:
        currentLanguage === "EN"
          ? "Operational launch ~2026-05-09. First public Graf-native hosting platform; positions Graf as a self-sufficient ecosystem rather than a niche tool."
          : "Operativer Start ~2026-05-09. Erste öffentliche Graf-native Hosting-Plattform; positioniert Graf als eigenständiges Ökosystem statt als Nischenwerkzeug.",
      role:
        currentLanguage === "EN" ? "Creator & Operator" : "Schöpfer & Betreiber",
      icon: "⌬",
      color: "cyberpunk-electric-blue",
      foundationUrl: "https://grafhub.org",
    },
    {
      id: "progit",
      name: "ProGit",
      category: currentLanguage === "EN" ? "SYSTEMS" : "SYSTEME",
      stack: ["Rust", "Terminal UI", "Virtual Branches", "AI Agents", "≤10 MB"],
      description:
        currentLanguage === "EN"
          ? "Terminal-based Git workflow manager. Virtual branches, line-level review, real-time CI/CD status, AI agents for refactor/test-gen/bug-find/docs, visual conflict resolution. Local-first, sub-100ms cold start, ≤ 10 MB binary."
          : "Terminal-basierter Git-Workflow-Manager. Virtuelle Branches, zeilengenaues Review, Echtzeit-CI/CD-Status, KI-Agenten für Refactor/Tests/Bugs/Docs, visuelle Konfliktauflösung. Local-first, Sub-100ms-Kaltstart, ≤ 10 MB Binary.",
      status: "ACTIVE",
      impact:
        currentLanguage === "EN"
          ? "Stable beta v0.7. Recruiting testers. Closes the gap between GitButler's virtual-branches UX and the speed of GitUI, with native AI inside the terminal — no Web UI required."
          : "Stabile Beta v0.7. Sucht Tester. Schließt die Lücke zwischen GitButlers Virtual-Branches-UX und der Geschwindigkeit von GitUI, mit nativer KI direkt im Terminal — kein Web-UI nötig.",
      role:
        currentLanguage === "EN" ? "Creator & Lead Developer" : "Schöpfer & Lead-Entwickler",
      icon: "▶",
      color: "cyberpunk-acid-green",
      foundationUrl: "https://progit.dev",
    },
  ];

  const projects = getProjects(currentLanguage);
  const content = getProjectContent(currentLanguage);

  // Reset filter when language changes
  useEffect(() => {
    setFilter(content.categories[0]); // Reset to "ALL" or "ALLE"
  }, [currentLanguage]);

  const filteredProjects =
    filter === content.categories[0]
      ? projects
      : projects.filter((p: Project) => p.category === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "text-cyberpunk-acid-green";
      case "R&D":
        return "text-cyberpunk-electric-blue";
      case "PRODUCTION":
        return "text-cyberpunk-neon-magenta";
      case "SCALING":
        return "text-cyberpunk-neon-cyan";
      default:
        return "text-cyberpunk-text-dim";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <GlitchText className="text-4xl font-bold cyberpunk-heading mb-4">
          {currentLanguage === "EN" ? "PROJECT PORTFOLIO" : "PROJEKT PORTFOLIO"}
        </GlitchText>
        <div className="text-white text-lg font-medium">
          {currentLanguage === "EN"
            ? "Strategic R&D demonstrating deep technical capabilities"
            : "Strategische F&E zur Demonstration tiefer technischer Fähigkeiten"}
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {content.categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
              filter === category
                ? "cyberpunk-button bg-cyberpunk-electric-blue text-cyberpunk-bg"
                : "cyberpunk-button"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <CyberpunkPanel
                className="h-full interactive cursor-pointer"
                onClick={() => setSelectedProject(project.id)}
              >
                <div className="p-4 md:p-6 space-y-3 md:space-y-4">
                  {/* Project Header */}
                  <div className="flex items-start justify-between">
                    <div
                      className={`text-2xl md:text-3xl text-${project.color}`}
                      style={{ color: `var(--${project.color})` }}
                    >
                      {project.icon}
                    </div>
                    <div
                      className={`text-xs font-mono px-2 py-1 rounded ${getStatusColor(project.status)}`}
                    >
                      {project.status}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div>
                    <h3 className="text-base md:text-lg font-bold cyberpunk-heading mb-2">
                      {project.name}
                    </h3>
                    <div className="text-xs md:text-sm text-cyberpunk-text-dim mb-2 md:mb-3">
                      {project.category}
                    </div>
                    <p className="text-xs md:text-sm text-cyberpunk-text leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Foundation surface badge (only if this project has a public marketing site) */}
                  {project.foundationUrl && (
                    <a
                      href={project.foundationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded border transition-colors"
                      style={{
                        color: "var(--cyberpunk-gold)",
                        borderColor: "rgba(245, 184, 0, 0.4)",
                      }}
                      title={currentLanguage === "EN" ? "Foundation surface" : "Foundation-Auftritt"}
                    >
                      <span>↗</span>
                      <span>{new URL(project.foundationUrl).hostname.replace(/^www\./, "")}</span>
                    </a>
                  )}

                  {/* Tech Stack Preview */}
                  <div className="flex flex-wrap gap-1">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-cyberpunk-surface-light rounded border border-cyberpunk-border text-cyberpunk-text-dim"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 3 && (
                      <span className="text-xs px-2 py-1 text-cyberpunk-electric-blue">
                        +{project.stack.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-1 md:gap-2 pt-2">
                    <button
                      onMouseEnter={() => CyberpunkAudio.playHoverClick()}
                      onClick={() => {
                        CyberpunkAudio.playButtonClick();
                        setSelectedProject(project.id);
                      }}
                      className="cyberpunk-button text-xs px-2 md:px-3 py-1 rounded flex-1"
                    >
                      {content.detailsButton}
                    </button>
                    <button
                      onMouseEnter={() => CyberpunkAudio.playHoverClick()}
                      onClick={() => CyberpunkAudio.playButtonClick()}
                      className="cyberpunk-button text-xs px-2 md:px-3 py-1 rounded flex-1"
                    >
                      {content.manifestButton}
                    </button>
                  </div>
                </div>
              </CyberpunkPanel>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            style={{
              background: `
                linear-gradient(135deg, #000514 0%, #001122 50%, #000f1e 100%),
                radial-gradient(ellipse at center, rgba(0, 212, 255, 0.2) 0%, transparent 70%)
              `,
              cursor: "none",
              backdropFilter: "blur(5px)",
            }}
            onClick={() => setSelectedProject(null)}
          >
            {/* Custom cyberpunk cursor for project modal */}
            <div
              className="fixed pointer-events-none z-[60]"
              style={{
                left: cursorPosition.x - 12,
                top: cursorPosition.y - 12,
                width: "24px",
                height: "24px",
                border: "3px solid #00d4ff",
                borderRadius: "50%",
                backgroundColor: "rgba(0, 212, 255, 0.3)",
                boxShadow:
                  "0 0 20px rgba(0, 212, 255, 0.8), inset 0 0 10px rgba(0, 212, 255, 0.5)",
                transition: "none",
              }}
            />

            {/* Matrix background */}
            <div className="absolute inset-0 z-10">
              <MatrixBackground />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-20"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const project = projects.find(
                  (p: Project) => p.id === selectedProject,
                );
                if (!project) return null;

                return (
                  <CyberpunkPanel className="p-4 md:p-8">
                    <div className="space-y-4 md:space-y-6">
                      {/* Header */}
                      <div className="flex items-start justify-between border-b border-cyberpunk-border pb-4 md:pb-6">
                        <div className="flex items-center space-x-2 md:space-x-4 flex-1 min-w-0">
                          <div
                            className={`text-2xl md:text-4xl text-${project.color} flex-shrink-0`}
                            style={{ color: `var(--${project.color})` }}
                          >
                            {project.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <GlitchText className="text-lg md:text-2xl font-bold cyberpunk-heading truncate">
                              {project.name}
                            </GlitchText>
                            <div className="text-cyberpunk-text-dim text-sm md:text-base">
                              {project.category} • {project.role}
                            </div>
                          </div>
                        </div>
                        <button
                          onMouseEnter={() => CyberpunkAudio.playHoverClick()}
                          onClick={() => {
                            CyberpunkAudio.playButtonClick();
                            setSelectedProject(null);
                          }}
                          className="cyberpunk-button p-2 rounded flex-shrink-0 ml-2"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Content */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
                        <div className="space-y-4">
                          <DataVisualization>
                            <h4 className="text-base md:text-lg font-bold text-cyberpunk-electric-blue mb-2 md:mb-3">
                              {project.id === "nexus-os"
                                ? "MANIFESTO"
                                : project.id === "janus-lang"
                                  ? "DESIGN PRINCIPLES"
                                  : project.id === "libertaria"
                                    ? "PROTOCOL ARCHITECTURE"
                                    : "PROJECT SCOPE"}
                            </h4>
                            <p className="text-cyberpunk-text text-sm md:text-base">
                              {project.description}
                            </p>
                            {project.id === "nexus-os" && (
                              <div className="mt-3 md:mt-4 p-3 md:p-4 bg-cyberpunk-surface-dark border border-cyberpunk-electric-blue rounded font-mono text-xs md:text-sm">
                                <div className="text-cyberpunk-electric-blue mb-2">
                                  ❯ decode ./sovereignty_manifest
                                </div>
                                <div className="text-cyberpunk-text leading-relaxed">
                                  Silence Doctrine: Tickless. Burst-first. WFI-default.
                                  <br />
                                  Capability Algebra: Born-with-nothing. 7 verbs. Caps only shrink.
                                  <br />
                                  ION Rings: Lock-free SPSC. Zero-copy. All IPC.
                                  <br />
                                  Graft, Evolve, Sovereignize.
                                  <br />
                                  This is not for users. This is for Operators.
                                </div>
                              </div>
                            )}
                            {project.id === "janus-lang" && (
                              <div className="mt-3 md:mt-4 space-y-2">
                                {[
                                  { label: "Syntactic Honesty", desc: "All costs visible. No hidden allocations, no implicit copies." },
                                  { label: "Mechanism over Policy", desc: "Tools, not restrictions. The programmer decides." },
                                  { label: "Explicit Choice", desc: "All allocations, effects, and trade-offs are visible in the code." },
                                  { label: "Revealed Complexity", desc: "No magic. Predictable behavior at every level." },
                                ].map((principle) => (
                                  <div key={principle.label} className="p-2 bg-cyberpunk-surface-dark border border-cyberpunk-acid-green/30 rounded text-xs">
                                    <span className="text-cyberpunk-acid-green font-bold">{principle.label}:</span>{" "}
                                    <span className="text-cyberpunk-text">{principle.desc}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            {project.id === "libertaria" && (
                              <div className="mt-3 md:mt-4 space-y-2">
                                {[
                                  { layer: "L0: THE WIRE", desc: "LWF transport, UTCP identity-centric protocol, works on 2G solar devices" },
                                  { layer: "L1: THE HULL", desc: "Entropy stamps, Membrane agent, QVL trust graph, SoulKey post-quantum identity" },
                                  { layer: "L2: THE LEDGER", desc: "Governance + Economics unified. Chapter genesis, solidarity, justice primitives" },
                                  { layer: "L3: THE FLEET", desc: "Federation without governors. Exit-arbitrage, emergent polity, voluntary treaties" },
                                ].map((l) => (
                                  <div key={l.layer} className="p-2 bg-cyberpunk-surface-dark border border-cyberpunk-neon-magenta/30 rounded text-xs">
                                    <span className="text-cyberpunk-neon-magenta font-bold">{l.layer}</span>{" "}
                                    <span className="text-cyberpunk-text-dim">— {l.desc}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </DataVisualization>

                          <DataVisualization>
                            <h4 className="text-base md:text-lg font-bold text-cyberpunk-neon-magenta mb-2 md:mb-3">
                              {project.id === "nexus-os"
                                ? "ARCHITECTURE"
                                : project.id === "janus-lang"
                                  ? "COMPILATION PIPELINE"
                                  : project.id === "libertaria"
                                    ? "CORE AXIOMS"
                                    : "BUSINESS IMPACT"}
                            </h4>
                            {project.id === "nexus-os" ? (
                              <div className="space-y-2 text-xs">
                                {[
                                  { label: "Rumpk", desc: "Event-driven, tickless, single-address-space unikernel (<1MB)" },
                                  { label: "RumKV", desc: "Type-1 hypervisor (EL2/Ring-1) with Dual-Pledge security (<4MB)" },
                                  { label: "Membrane", desc: "POSIX adapter, LwIP networking, MemFS compatibility layer" },
                                  { label: "SoulKey", desc: "Hybrid ED25519+X25519+ML-KEM-768 post-quantum identity" },
                                  { label: "ION Rings", desc: "Lock-free SPSC ring buffers for ALL inter-component IPC" },
                                ].map((item) => (
                                  <div key={item.label} className="flex gap-2">
                                    <span className="text-cyberpunk-electric-blue font-mono font-bold min-w-[70px]">{item.label}</span>
                                    <span className="text-cyberpunk-text">{item.desc}</span>
                                  </div>
                                ))}
                              </div>
                            ) : project.id === "janus-lang" ? (
                              <div className="space-y-2 font-mono text-xs">
                                <div className="text-cyberpunk-acid-green mb-2">❯ janus compile --trace</div>
                                {[
                                  "Source → Tokenizer → Parser",
                                  "→ ASTDB (columnar AST database, O(1) access)",
                                  "→ QTJIR (typed SSA IR, PHI nodes)",
                                  "→ LLVM → Native Binary",
                                ].map((step, i) => (
                                  <div key={i} className="text-cyberpunk-text pl-2 border-l border-cyberpunk-acid-green/40">{step}</div>
                                ))}
                                <div className="mt-3 pt-2 border-t border-cyberpunk-border text-cyberpunk-text-dim">
                                  Profiles: :core (complete) → :service → :cluster → :compute → :sovereign
                                </div>
                              </div>
                            ) : project.id === "libertaria" ? (
                              <div className="space-y-2 text-xs">
                                {[
                                  { axiom: "Capsule Doctrine", desc: "Default deny. Permissioned at the edge." },
                                  { axiom: "Kenya Rule", desc: "If a solar-powered phone in Mombasa cannot participate, the protocol fails everywhere." },
                                  { axiom: "Exit Always", desc: "Exit is a constitutional right. Exit costs are bounded. Exit cannot be prevented." },
                                  { axiom: "Protocol vs Chapter", desc: "Protocol is physics (immutable). Chapter is politics (changeable)." },
                                ].map((a) => (
                                  <div key={a.axiom} className="p-2 bg-cyberpunk-surface-dark border border-cyberpunk-neon-magenta/20 rounded">
                                    <span className="text-cyberpunk-neon-magenta font-bold">{a.axiom}:</span>{" "}
                                    <span className="text-cyberpunk-text">{a.desc}</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-cyberpunk-text text-sm md:text-base">
                                {project.impact}
                              </p>
                            )}
                          </DataVisualization>
                        </div>

                        <div className="space-y-4">
                          <DataVisualization>
                            <h4 className="text-base md:text-lg font-bold text-cyberpunk-acid-green mb-2 md:mb-3">
                              TECHNOLOGY STACK
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {project.stack.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2 md:px-3 py-1 bg-cyberpunk-surface-light rounded border border-cyberpunk-border text-cyberpunk-text text-xs md:text-sm"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </DataVisualization>

                          <DataVisualization>
                            <h4 className="text-base md:text-lg font-bold text-cyberpunk-neon-cyan mb-2 md:mb-3">
                              PROJECT STATUS
                            </h4>
                            <div
                              className={`text-lg md:text-xl font-bold ${getStatusColor(project.status)}`}
                            >
                              {project.status}
                            </div>
                            <div className="text-cyberpunk-text-dim text-xs md:text-sm mt-1">
                              Role: {project.role}
                            </div>
                          </DataVisualization>

                          {project.foundationUrl && (
                            <DataVisualization>
                              <h4
                                className="text-base md:text-lg font-bold mb-2 md:mb-3"
                                style={{ color: "var(--cyberpunk-gold)" }}
                              >
                                {currentLanguage === "EN" ? "FOUNDATION SURFACE" : "FOUNDATION-AUFTRITT"}
                              </h4>
                              <a
                                href={project.foundationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={() => CyberpunkAudio.playHoverClick()}
                                onClick={() => CyberpunkAudio.playButtonClick()}
                                className="underline font-mono text-sm md:text-base"
                                style={{ color: "var(--cyberpunk-gold)" }}
                              >
                                {new URL(project.foundationUrl).hostname.replace(/^www\./, "")} ↗
                              </a>
                            </DataVisualization>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-4 md:pt-6 border-t border-cyberpunk-border">
                        {project.id === "nexus-os" ? (
                          <>
                            <a
                              href="https://git.maiwald.work/NexusLabs/livecd-arch-nexus"
                              target="_blank"
                              rel="noopener noreferrer"
                              onMouseEnter={() =>
                                CyberpunkAudio.playHoverClick()
                              }
                              onClick={() => CyberpunkAudio.playButtonClick()}
                              className="cyberpunk-button px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base text-center"
                            >
                              SOURCE CODE
                            </a>
                            <div className="px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base text-center bg-cyberpunk-surface-dark border border-cyberpunk-border text-cyberpunk-text-dim cursor-not-allowed">
                              CURRENTLY IN STEALTH-MODE
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base text-center bg-cyberpunk-surface-dark border border-cyberpunk-border text-cyberpunk-text-dim cursor-not-allowed">
                              CURRENTLY IN STEALTH-MODE
                            </div>
                            <div className="px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base text-center bg-cyberpunk-surface-dark border border-cyberpunk-border text-cyberpunk-text-dim cursor-not-allowed">
                              CURRENTLY IN STEALTH-MODE
                            </div>
                            <div className="px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base text-center bg-cyberpunk-surface-dark border border-cyberpunk-border text-cyberpunk-text-dim cursor-not-allowed">
                              CURRENTLY IN STEALTH-MODE
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </CyberpunkPanel>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
