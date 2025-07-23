import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CyberpunkPanel, GlitchText, DataVisualization } from './CyberpunkEffects';
import { Language } from '../hooks/useLanguage';

interface Project {
  id: string;
  name: string;
  category: string;
  stack: string[];
  description: string;
  status: 'ACTIVE' | 'R&D' | 'PRODUCTION' | 'SCALING';
  impact: string;
  role: string;
  icon: string;
  color: string;
}

interface ProjectShowcaseProps {
  currentLanguage: Language;
}

export function ProjectShowcase({ currentLanguage }: ProjectShowcaseProps) {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('ALL');

  const projects: Project[] = [
    {
      id: 'maiwald-enterprises',
      name: 'Maiwald Enterprises BV',
      category: 'ENTERPRISE',
      stack: ['Strategic Consulting', 'Cloud Architecture', 'DevOps', 'Security'],
      description: 'Strategic technology consulting firm specializing in foundational infrastructure and digital transformation.',
      status: 'PRODUCTION',
      impact: 'Delivering enterprise-grade solutions and strategic technology guidance',
      role: 'Founder & Strategic Architect',
      icon: '◊',
      color: 'cyberpunk-neon-magenta'
    },
    {
      id: 'nexus-os',
      name: 'NexusOS',
      category: 'SYSTEMS',
      stack: ['Nim', 'Assembly', 'Kernel', 'UEFI', 'SystemD'],
      description: 'Military-grade security and modularity. Fast boot. No bloat. Hardened kernel. Zero GNUs given.',
      status: 'ACTIVE',
      impact: 'Revolutionary OS architecture challenging conventional computing paradigms',
      role: 'Lead Architect & Developer',
      icon: '⬢',
      color: 'cyberpunk-electric-blue'
    },
    {
      id: 'cloud-infrastructure',
      name: 'Cloud-Native Infrastructure',
      category: 'INFRASTRUCTURE',
      stack: ['Kubernetes', 'Docker', 'Terraform', 'AWS', 'GCP'],
      description: 'Scalable cloud infrastructure solutions enabling rapid deployment and operational excellence.',
      status: 'SCALING',
      impact: 'Powering business-critical applications with 99.9% uptime',
      role: 'Infrastructure Architect',
      icon: '◈',
      color: 'cyberpunk-neon-cyan'
    },
    {
      id: 'ttrpg-platform',
      name: 'Decentralized TTRPG Platform',
      category: 'BLOCKCHAIN',
      stack: ['React', 'Blockchain', 'SSI', 'DID', 'Smart Contracts'],
      description: 'Revolutionary gaming platform integrating Self-Sovereign Identity and Decentralized Identifiers for next-gen user experience.',
      status: 'R&D',
      impact: 'Pioneering blockchain integration in gaming ecosystems',
      role: 'Technical Lead & Product Architect',
      icon: '⬡',
      color: 'cyberpunk-acid-green'
    },
    {
      id: 'security-frameworks',
      name: 'Security & Compliance Systems',
      category: 'SECURITY',
      stack: ['Zero Trust', 'IAM', 'Compliance', 'Audit', 'Monitoring'],
      description: 'Comprehensive security frameworks ensuring data protection and regulatory compliance.',
      status: 'PRODUCTION',
      impact: 'Protecting sensitive data and ensuring regulatory compliance across industries',
      role: 'Security Architect',
      icon: '⬟',
      color: 'cyberpunk-orange'
    }
  ];

  const categories = ['ALL', 'SYSTEMS', 'BLOCKCHAIN', 'ENTERPRISE', 'INFRASTRUCTURE', 'SECURITY'];
  const filteredProjects = filter === 'ALL' ? projects : projects.filter(p => p.category === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'text-cyberpunk-acid-green';
      case 'R&D': return 'text-cyberpunk-electric-blue';
      case 'PRODUCTION': return 'text-cyberpunk-neon-magenta';
      case 'SCALING': return 'text-cyberpunk-neon-cyan';
      default: return 'text-cyberpunk-text-dim';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <GlitchText className="text-4xl font-bold cyberpunk-heading mb-4">
          PROJECT PORTFOLIO
        </GlitchText>
        <div className="text-white text-lg font-medium">
          Strategic R&D demonstrating deep technical capabilities
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
              filter === category
                ? 'cyberpunk-button bg-cyberpunk-electric-blue text-cyberpunk-bg'
                : 'cyberpunk-button'
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
                    <div className={`text-xs font-mono px-2 py-1 rounded ${getStatusColor(project.status)}`}>
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
                    <button className="cyberpunk-button text-xs px-2 md:px-3 py-1 rounded flex-1">
                      DETAILS
                    </button>
                    <button className="cyberpunk-button text-xs px-2 md:px-3 py-1 rounded flex-1">
                      MANIFEST
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm p-4 overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const project = projects.find(p => p.id === selectedProject);
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
                          onClick={() => setSelectedProject(null)}
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
                              {project.id === 'nexus-os' ? 'MANIFESTO' : 'PROJECT SCOPE'}
                            </h4>
                            <p className="text-cyberpunk-text text-sm md:text-base">
                              {project.description}
                            </p>
                            {project.id === 'nexus-os' && (
                              <div className="mt-3 md:mt-4 p-3 md:p-4 bg-cyberpunk-surface-dark border border-cyberpunk-electric-blue rounded font-mono text-xs md:text-sm">
                                <div className="text-cyberpunk-electric-blue mb-2">❯ decode ./code_is_manifesto</div>
                                <div className="text-cyberpunk-text leading-relaxed">
                                  NexusOS is not software.<br/>
                                  It is a rebellion encoded.<br/>
                                  Decentralized. Deterministic. Unforgiving.<br/>
                                  This is not for users.<br/>
                                  This is for Operators.
                                </div>
                              </div>
                            )}
                          </DataVisualization>

                          <DataVisualization>
                            <h4 className="text-base md:text-lg font-bold text-cyberpunk-neon-magenta mb-2 md:mb-3">
                              {project.id === 'nexus-os' ? 'SOUL INJECTION' : 'BUSINESS IMPACT'}
                            </h4>
                            <p className="text-cyberpunk-text text-sm md:text-base">
                              {project.id === 'nexus-os' 
                                ? 'Every line of code is an act of digital sovereignty. NexusOS embodies the philosophy that true computing freedom comes from understanding systems at their most fundamental level. Code is manifesto.'
                                : project.impact
                              }
                            </p>
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
                            <div className={`text-lg md:text-xl font-bold ${getStatusColor(project.status)}`}>
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
                        {project.id === 'nexus-os' ? (
                          <>
                            <a 
                              href="https://git.maiwald.work/NexusLabs/livecd-arch-nexus"
                              target="_blank"
                              rel="noopener noreferrer"
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