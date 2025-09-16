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
}

interface ProjectShowcaseProps {
  currentLanguage: Language;
}

export function ProjectShowcase({ currentLanguage }: ProjectShowcaseProps) {
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
          "ENTERPRISE",
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
          "UNTERNEHMEN",
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
      id: "maiwald-enterprises",
      name: "Maiwald Enterprises BV",
      category: currentLanguage === "EN" ? "ENTERPRISE" : "UNTERNEHMEN",
      stack:
        currentLanguage === "EN"
          ? ["Strategic Consulting", "Cloud Architecture", "DevOps", "Security"]
          : [
              "Strategische Beratung",
              "Cloud-Architektur",
              "DevOps",
              "Sicherheit",
            ],
      description:
        currentLanguage === "EN"
          ? "Strategic technology consulting firm specializing in foundational infrastructure and digital transformation."
          : "Strategisches Technologieberatungsunternehmen, spezialisiert auf grundlegende Infrastruktur und digitale Transformation.",
      status: "PRODUCTION",
      impact:
        currentLanguage === "EN"
          ? "Delivering enterprise-grade solutions and strategic technology guidance"
          : "Bereitstellung von Unternehmenslösungen und strategischer Technologieberatung",
      role:
        currentLanguage === "EN"
          ? "Founder & Strategic Architect"
          : "Gründer & Strategischer Architekt",
      icon: "◊",
      color: "cyberpunk-neon-magenta",
      customers: [
        { name: "BC2IP", url: "https://bc2ip.com" },
        { name: "IOP Global", url: "https://iop-global.com" },
        { name: "Group4IT", url: "https://groupforit.de" },
        { name: "IT Qube", url: "https://itqube.gmbh/" },
      ],
    },
    {
      id: "nexus-os",
      name: "NexusOS",
      category: currentLanguage === "EN" ? "SYSTEMS" : "SYSTEME",
      stack: ["Nim", "Assembly", "Kernel", "UEFI", "SystemD"],
      description:
        currentLanguage === "EN"
          ? "Military-grade security and modularity. Fast boot. No bloat. Hardened kernel. Zero GNUs given."
          : "Militärische Sicherheit und Modularität. Schneller Boot. Kein Bloat. Gehärteter Kernel. Null GNUs gegeben.",
      status: "ACTIVE",
      impact:
        currentLanguage === "EN"
          ? "Revolutionary OS architecture challenging conventional computing paradigms"
          : "Revolutionäre OS-Architektur, die herkömmliche Computing-Paradigmen herausfordert",
      role:
        currentLanguage === "EN"
          ? "Lead Architect & Developer"
          : "Lead-Architekt & Entwickler",
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
                                : project.id === "maiwald-enterprises"
                                  ? "CTO/CIO/CSO AS A SERVICE"
                                  : "PROJECT SCOPE"}
                            </h4>
                            {project.id === "maiwald-enterprises" ? (
                              <div
                                className="space-y-3 cursor-pointer hover:bg-cyberpunk-surface-light/20 p-3 rounded-lg transition-all duration-300 border border-transparent hover:border-cyberpunk-electric-blue/30"
                                onClick={() => {
                                  CyberpunkAudio.playButtonClick();
                                  // Close project modal and open CTO modal
                                  setSelectedProject(null);
                                  const event = new CustomEvent(
                                    "openCTOService",
                                  );
                                  window.dispatchEvent(event);
                                }}
                                onMouseEnter={() =>
                                  CyberpunkAudio.playHoverClick()
                                }
                                title="Click to open detailed CTO service information"
                              >
                                <div className="text-cyberpunk-neon-cyan text-lg md:text-xl font-bold">
                                  €1,600/month | 20 hours guaranteed
                                </div>
                                <p className="text-cyberpunk-text text-sm md:text-base">
                                  Strategic technology leadership for founders.
                                  Replace unreliable freelancers and costly
                                  agencies with founder-friendly strategic
                                  technology leadership at a fixed fee.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                                  {[
                                    "🎯 Personal Task Board",
                                    "💰 Keep 100% of Equity",
                                    "📊 Fixed & Predictable Pricing",
                                    "🚀 Unlimited Requests",
                                    "⚡ Fast Turnaround",
                                    "👥 Invite Everyone",
                                    "🏆 Full IP Ownership",
                                    "📈 Flexible & Scalable",
                                  ].map((benefit, index) => (
                                    <div
                                      key={index}
                                      className="text-cyberpunk-acid-green text-xs font-mono"
                                    >
                                      {benefit}
                                    </div>
                                  ))}
                                </div>
                                <div className="text-xs text-cyberpunk-text-dim text-center mt-3 pt-2 border-t border-cyberpunk-border">
                                  💡 Click for detailed CTO service information
                                </div>
                              </div>
                            ) : (
                              <p className="text-cyberpunk-text text-sm md:text-base">
                                {project.description}
                              </p>
                            )}
                            {project.id === "nexus-os" && (
                              <div className="mt-3 md:mt-4 p-3 md:p-4 bg-cyberpunk-surface-dark border border-cyberpunk-electric-blue rounded font-mono text-xs md:text-sm">
                                <div className="text-cyberpunk-electric-blue mb-2">
                                  ❯ decode ./code_is_manifesto
                                </div>
                                <div className="text-cyberpunk-text leading-relaxed">
                                  NexusOS is not software.
                                  <br />
                                  It is a rebellion encoded.
                                  <br />
                                  Decentralized. Deterministic. Unforgiving.
                                  <br />
                                  This is not for users.
                                  <br />
                                  This is for Operators.
                                </div>
                              </div>
                            )}
                          </DataVisualization>

                          <DataVisualization>
                            <h4 className="text-base md:text-lg font-bold text-cyberpunk-neon-magenta mb-2 md:mb-3">
                              {project.id === "nexus-os"
                                ? "SOUL INJECTION"
                                : project.id === "maiwald-enterprises"
                                  ? "CORE SERVICES INCLUDED"
                                  : "BUSINESS IMPACT"}
                            </h4>
                            {project.id === "maiwald-enterprises" ? (
                              <div className="space-y-3">
                                <div className="grid grid-cols-1 gap-2">
                                  {[
                                    "• Strategic technology roadmapping and architecture decisions",
                                    "• MVP development and product-market fit iteration",
                                    "• Team scaling and technical hiring guidance",
                                    "• Code reviews and technical quality assurance",
                                    "• Infrastructure planning and cloud architecture",
                                    "• Security and compliance strategic planning",
                                    "• Vendor evaluation and technology stack decisions",
                                    "• Technical due diligence and risk assessment",
                                  ].map((service, index) => (
                                    <div
                                      key={index}
                                      className="text-cyberpunk-text text-xs"
                                    >
                                      {service}
                                    </div>
                                  ))}
                                </div>
                                <div className="mt-4 pt-3 border-t border-cyberpunk-border">
                                  <div className="text-cyberpunk-electric-blue text-sm font-mono mb-2">
                                    TRUSTED BY:
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {project.customers?.map((customer) => (
                                      <span
                                        key={customer.name}
                                        className="px-2 py-1 bg-cyberpunk-surface-light rounded border border-cyberpunk-border text-cyberpunk-text text-xs"
                                      >
                                        {customer.name}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <p className="text-cyberpunk-text text-sm md:text-base">
                                {project.id === "nexus-os"
                                  ? "Every line of code is an act of digital sovereignty. NexusOS embodies the philosophy that true computing freedom comes from understanding systems at their most fundamental level. Code is manifesto."
                                  : project.impact}
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
                        ) : project.id === "maiwald-enterprises" ? (
                          <>
                            <button
                              onClick={() => {
                                CyberpunkAudio.playButtonClick();
                                // Open contact modal or CTO service
                                const event = new CustomEvent("openContact");
                                window.dispatchEvent(event);
                              }}
                              onMouseEnter={() =>
                                CyberpunkAudio.playHoverClick()
                              }
                              className="cyberpunk-button px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base text-center"
                            >
                              START CTO SERVICE
                            </button>
                            <button
                              onClick={() => {
                                CyberpunkAudio.playButtonClick();
                                // Open chatbot for consultation
                                const event = new CustomEvent("openChatbot");
                                window.dispatchEvent(event);
                              }}
                              onMouseEnter={() =>
                                CyberpunkAudio.playHoverClick()
                              }
                              className="cyberpunk-button-secondary px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base text-center"
                            >
                              STRATEGIC CONSULTATION
                            </button>
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
