import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { MenuBar } from './MenuBar';
import { Terminal, TerminalRef } from './Terminal';
import { Dock } from './Dock';
import { ContactModal } from './ContactModal';
import { InfoModal } from './InfoModal';
import { CyberpunkEffects, GlitchText, TypewriterEffect } from './CyberpunkEffects';
import { TerminalRitual } from './TerminalRitual';
import { ProjectShowcase } from './ProjectShowcase';
import { ParticleField } from './ParticleField';
import { ScrollProgress } from './ScrollProgress';
import { EasterEggTerminal } from './EasterEggTerminal';

export function Desktop() {
  const { currentLanguage, toggleLanguage, setLanguage } = useLanguage();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('');
  const [showRitual, setShowRitual] = useState(true);
  const [currentView, setCurrentView] = useState<'terminal' | 'projects' | 'manifesto'>('terminal');
  const [currentScrollSection, setCurrentScrollSection] = useState(0);
  const terminalRef = useRef<TerminalRef>(null);

  const sections = ['NEURAL LINK', 'TERMINAL', 'PROJECTS', 'MANIFESTO'];

  useEffect(() => {
    // Auto-hide ritual after first visit
    const hasSeenRitual = localStorage.getItem('maiwald_ritual_seen');
    if (hasSeenRitual) {
      setShowRitual(false);
      setCurrentScrollSection(1);
    }
  }, []);

  const handleTerminalClick = () => {
    // Focus terminal input
    const terminalInput = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (terminalInput) {
      terminalInput.focus();
    }
  };

  const handleContactClick = () => {
    setIsContactModalOpen(true);
  };

  const handleSectionClick = (section: string) => {
    if (section === 'projects') {
      setCurrentView('projects');
      setCurrentScrollSection(2);
    } else if (section === 'services' || section === 'development') {
      setCurrentView('manifesto');
      setCurrentScrollSection(3);
    } else {
      // Open InfoModal for blockchain, cloud, and other sections
      setCurrentSection(section);
      setIsInfoModalOpen(true);
    }
  };

  const handleHelpClick = () => {
    // Switch to terminal view and execute help command
    setCurrentView('terminal');
    setCurrentScrollSection(1);
    
    // Small delay to ensure terminal is visible before executing command
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.executeCommand('help');
      }
    }, 100);
  };

  const handleLanguageChange = (lang: typeof currentLanguage) => {
    setLanguage(lang);
  };

  const handleRitualComplete = () => {
    setShowRitual(false);
    localStorage.setItem('maiwald_ritual_seen', 'true');
    setCurrentScrollSection(1);
  };

  const handleScrollSectionChange = (index: number) => {
    setCurrentScrollSection(index);
    if (index === 1) setCurrentView('terminal');
    if (index === 2) setCurrentView('projects');
    if (index === 3) setCurrentView('manifesto');
  };

  return (
    <CyberpunkEffects>
      <div className="font-system h-screen overflow-auto relative" style={{ background: 'var(--cyberpunk-bg)' }}>
        {/* Particle Field Background */}
        <ParticleField />
        
        {/* Cyberpunk Background Effects */}
        <div 
          className="fixed inset-0" 
          style={{
            background: `
              radial-gradient(circle at 25% 25%, rgba(0, 212, 255, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(255, 0, 110, 0.08) 0%, transparent 50%),
              linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(18, 18, 18, 0.9) 100%)
            `
          }}
        />

        {/* Terminal Ritual */}
        <AnimatePresence>
          {showRitual && (
            <TerminalRitual 
              currentLanguage={currentLanguage}
              onComplete={handleRitualComplete}
            />
          )}
        </AnimatePresence>

        {/* Main Interface */}
        <AnimatePresence>
          {!showRitual && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="h-full"
            >
              {/* Menu Bar */}
              <MenuBar 
                currentLanguage={currentLanguage} 
                onLanguageToggle={toggleLanguage}
              />

              {/* Scroll Progress Indicator */}
              <ScrollProgress
                sections={sections}
                currentSection={currentScrollSection}
                onSectionChange={handleScrollSectionChange}
              />

              {/* Dynamic Content */}
              <div className="pt-8">
                <AnimatePresence mode="wait">
                  {currentView === 'terminal' && (
                    <motion.div
                      key="terminal"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Terminal 
                        ref={terminalRef}
                        currentLanguage={currentLanguage}
                        onOpenContact={handleContactClick}
                        onLanguageChange={handleLanguageChange}
                      />
                    </motion.div>
                  )}

                  {currentView === 'projects' && (
                    <motion.div
                      key="projects"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.5 }}
                      className="px-8 py-16 min-h-screen"
                    >
                      <ProjectShowcase currentLanguage={currentLanguage} />
                    </motion.div>
                  )}

                  {currentView === 'manifesto' && (
                    <motion.div
                      key="manifesto"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.5 }}
                      className="px-8 py-16 min-h-screen"
                    >
                      <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                          <GlitchText className="text-5xl font-bold cyberpunk-heading mb-6" enableHover={true}>
                            MAIWALD ENTERPRISES BV
                          </GlitchText>
                          <TypewriterEffect 
                            text="We build the infrastructure your business runs on"
                            className="text-xl text-white font-medium"
                            speed={40}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-16">
                          <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="cyberpunk-panel p-8"
                          >
                            <h3 className="text-2xl font-bold text-cyberpunk-electric-blue mb-4 text-glow">
                              CORE PHILOSOPHY
                            </h3>
                            <p className="text-cyberpunk-text leading-relaxed">
                              Every system we build serves a greater architecture. Every line of code contributes to digital sovereignty. 
                              Every client engagement advances technological evolution. We don't just deliver software—we architect the future.
                            </p>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="cyberpunk-panel p-8"
                          >
                            <h3 className="text-2xl font-bold text-cyberpunk-neon-magenta mb-4 text-glow">
                              STRATEGIC VISION
                            </h3>
                            <p className="text-cyberpunk-text leading-relaxed">
                              We combine cutting-edge blockchain technology, cloud-native architectures, and robust security frameworks 
                              to create resilient infrastructure that powers the digital economy of tomorrow.
                            </p>
                          </motion.div>
                        </div>

                        <motion.div
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className="cyberpunk-panel p-8 text-center"
                        >
                          <h3 className="text-2xl font-bold text-cyberpunk-acid-green mb-4 text-glow">
                            INNOVATION PIPELINE
                          </h3>
                          <p className="text-cyberpunk-text leading-relaxed max-w-4xl mx-auto">
                            From custom operating systems to decentralized identity platforms, our R&D portfolio demonstrates 
                            deep technical capabilities and forward-thinking innovation. Each project serves as both strategic 
                            research and proof of our architectural philosophy.
                          </p>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Dock */}
              <Dock 
                onTerminalClick={() => {
                  setCurrentView('terminal');
                  setCurrentScrollSection(1);
                }}
                onContactClick={handleContactClick}
                onSectionClick={handleSectionClick}
                onHelpClick={handleHelpClick}
                currentLanguage={currentLanguage}
              />

              {/* Contact Modal */}
              <ContactModal 
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
                currentLanguage={currentLanguage}
              />

              {/* Info Modal */}
              <InfoModal 
                isOpen={isInfoModalOpen}
                onClose={() => setIsInfoModalOpen(false)}
                section={currentSection}
                currentLanguage={currentLanguage}
              />

              {/* Easter Egg Terminal */}
              <EasterEggTerminal 
                currentLanguage={currentLanguage}
                onProjectsReveal={() => {
                  setCurrentView('projects');
                  setCurrentScrollSection(2);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </CyberpunkEffects>
  );
}
