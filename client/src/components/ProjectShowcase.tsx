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
      id: 'custom-os',
      name: 'Custom Operating System',
      category: 'SYSTEMS',
      stack: ['Nim', 'Assembly', 'Kernel', 'UEFI'],
      description: 'Ground-up OS development demonstrating deep systems architecture knowledge and forward-thinking design principles.',
      status: 'ACTIVE',
      impact: 'Core technology research advancing understanding of operating system fundamentals',
      role: 'Lead Architect & Developer',
      icon: '⬢',
      color: 'cyberpunk-electric-blue'
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
        <div className="text-cyberpunk-subheading">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="p-6 space-y-4">
                  {/* Project Header */}
                  <div className="flex items-start justify-between">
                    <div 
                      className={`text-3xl text-${project.color}`}
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
                    <h3 className="text-lg font-bold cyberpunk-heading mb-2">
                      {project.name}
                    </h3>
                    <div className="text-sm text-cyberpunk-text-dim mb-3">
                      {project.category}
                    </div>
                    <p className="text-sm text-cyberpunk-text leading-relaxed">
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
                  <div className="flex gap-2 pt-2">
                    <button className="cyberpunk-button text-xs px-3 py-1 rounded">
                      DETAILS
                    </button>
                    <button className="cyberpunk-button text-xs px-3 py-1 rounded">
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-4xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const project = projects.find(p => p.id === selectedProject);
                if (!project) return null;

                return (
                  <CyberpunkPanel className="p-8">
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="flex items-start justify-between border-b border-cyberpunk-border pb-6">
                        <div className="flex items-center space-x-4">
                          <div 
                            className={`text-4xl text-${project.color}`}
                            style={{ color: `var(--${project.color})` }}
                          >
                            {project.icon}
                          </div>
                          <div>
                            <GlitchText className="text-2xl font-bold cyberpunk-heading">
                              {project.name}
                            </GlitchText>
                            <div className="text-cyberpunk-text-dim">
                              {project.category} • {project.role}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedProject(null)}
                          className="cyberpunk-button p-2 rounded"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Content */}
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <DataVisualization>
                            <h4 className="text-lg font-bold text-cyberpunk-electric-blue mb-3">
                              PROJECT SCOPE
                            </h4>
                            <p className="text-cyberpunk-text">
                              {project.description}
                            </p>
                          </DataVisualization>

                          <DataVisualization>
                            <h4 className="text-lg font-bold text-cyberpunk-neon-magenta mb-3">
                              BUSINESS IMPACT
                            </h4>
                            <p className="text-cyberpunk-text">
                              {project.impact}
                            </p>
                          </DataVisualization>
                        </div>

                        <div className="space-y-4">
                          <DataVisualization>
                            <h4 className="text-lg font-bold text-cyberpunk-acid-green mb-3">
                              TECHNOLOGY STACK
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {project.stack.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-3 py-1 bg-cyberpunk-surface-light rounded border border-cyberpunk-border text-cyberpunk-text text-sm"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </DataVisualization>

                          <DataVisualization>
                            <h4 className="text-lg font-bold text-cyberpunk-neon-cyan mb-3">
                              PROJECT STATUS
                            </h4>
                            <div className={`text-xl font-bold ${getStatusColor(project.status)}`}>
                              {project.status}
                            </div>
                            <div className="text-cyberpunk-text-dim text-sm mt-1">
                              Role: {project.role}
                            </div>
                          </DataVisualization>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-4 pt-6 border-t border-cyberpunk-border">
                        <button className="cyberpunk-button px-6 py-3 rounded-lg">
                          VIEW LIVE DEMO
                        </button>
                        <button className="cyberpunk-button px-6 py-3 rounded-lg">
                          SOURCE CODE
                        </button>
                        <button className="cyberpunk-button px-6 py-3 rounded-lg">
                          TECHNICAL DEEP-DIVE
                        </button>
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