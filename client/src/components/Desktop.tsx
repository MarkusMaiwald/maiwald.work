import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { MenuBar } from './MenuBar';
import { Terminal, TerminalRef } from './Terminal';
import { Dock } from './Dock';
import { ContactModal } from './ContactModal';
import { InfoModal } from './InfoModal';
import { CyberpunkEffects, MatrixBackground } from './CyberpunkEffects';
import { TerminalRitual } from './TerminalRitual';
import { ProjectShowcase } from './ProjectShowcase';
import { LegalSection } from './LegalSection';
import { ScrollProgress } from './ScrollProgress';
import { EasterEggTerminal } from './EasterEggTerminal';
import { Calculator } from './Calculator';
import { TextEditor } from './TextEditor';
import { SkillsApp } from './SkillsApp';
import { ChatbotApp } from './ChatbotApp';
import { CTOServiceShowcase } from './CTOServiceShowcase';
import { CyberpunkWallpaper } from './CyberpunkWallpaper';
import { SystemMonitor } from './SystemMonitor';

export function Desktop() {
  const { currentLanguage, toggleLanguage, setLanguage } = useLanguage();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('');
  const [showRitual, setShowRitual] = useState(true);
  const [currentView, setCurrentView] = useState<'terminal' | 'projects' | 'manifesto' | 'legal'>('terminal');
  

  const [currentScrollSection, setCurrentScrollSection] = useState(0);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isTextEditorOpen, setIsTextEditorOpen] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isCTOServiceOpen, setIsCTOServiceOpen] = useState(false);
  const [isAmbientAudioPlaying, setIsAmbientAudioPlaying] = useState(false);
  const [isTerminalVisible, setIsTerminalVisible] = useState(true);
  const terminalRef = useRef<TerminalRef>(null);

  const sections = ['NEURAL LINK', 'TERMINAL', 'PROJECTS', 'MANIFESTO', 'LEGAL'];

  useEffect(() => {
    // Auto-hide ritual after first visit
    const hasSeenRitual = localStorage.getItem('maiwald_ritual_seen');
    if (hasSeenRitual) {
      setShowRitual(false);
      setCurrentScrollSection(1);
    }

    // Listen for ambient audio state changes
    const handleAudioStateChange = (event: CustomEvent) => {
      setIsAmbientAudioPlaying(event.detail.isPlaying);
    };

    // Listen for custom events
    const handleOpenContact = () => setIsContactModalOpen(true);
    const handleOpenChatbot = () => setIsChatbotOpen(true);
    const handleOpenCTOService = () => setIsCTOServiceOpen(true);

    window.addEventListener('ambientAudioStateChanged', handleAudioStateChange as EventListener);
    window.addEventListener('openContact', handleOpenContact);
    window.addEventListener('openChatbot', handleOpenChatbot);
    window.addEventListener('openCTOService', handleOpenCTOService);
    
    return () => {
      window.removeEventListener('ambientAudioStateChanged', handleAudioStateChange as EventListener);
      window.removeEventListener('openContact', handleOpenContact);
      window.removeEventListener('openChatbot', handleOpenChatbot);
      window.removeEventListener('openCTOService', handleOpenCTOService);
    };
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

  const handleAboutClick = () => {
    setCurrentSection('about');
    setIsInfoModalOpen(true);
  };

  const handleSectionClick = (section: string) => {
    // Always close contact modal when switching sections
    setIsContactModalOpen(false);
    
    if (section === 'projects') {
      setCurrentView('projects');
      setCurrentScrollSection(2);
      setIsInfoModalOpen(false);
    } else if (section === 'services') {
      // Services should open InfoModal, not manifesto view
      setCurrentSection('services');
      setIsInfoModalOpen(true);
    } else {
      // Open InfoModal for blockchain, cloud, development, and other sections
      setCurrentSection(section);
      setIsInfoModalOpen(true);
    }
  };

  const handleCalculatorClick = () => {
    setIsCalculatorOpen(true);
  };

  const handleTextEditorClick = () => {
    setIsTextEditorOpen(true);
  };

  const handleSkillsClick = () => {
    setIsSkillsOpen(true);
  };

  const handleChatbotClick = () => {
    setIsChatbotOpen(true);
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
    
    // Handle navigation based on section index
    if (index === 0) {
      // Neural Link - show about section
      setCurrentSection('about');
      setIsInfoModalOpen(true);
    } else if (index === 1) {
      setCurrentView('terminal');
      setIsTerminalVisible(true); // Ensure terminal is visible when navigating to it
    } else if (index === 2) {
      setCurrentView('projects');  
    } else if (index === 3) {
      setCurrentView('manifesto');
    } else if (index === 4) {
      setCurrentView('legal');
    }
  };

  return (
    <CyberpunkEffects>
      <div className="font-system h-screen overflow-hidden relative" style={{ background: 'var(--cyberpunk-bg)' }}>
        {/* Blade Runner noir background */}
        <div
          className="fixed inset-0"
          style={{
            background: 'linear-gradient(135deg, #050510 0%, #0a0a1a 30%, #0d0818 60%, #080510 100%)'
          }}
        />
        
        {/* Matrix Background */}
        <MatrixBackground />

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
                onContactClick={handleContactClick}
              />

              {/* Scroll Progress Indicator */}
              <ScrollProgress
                sections={sections}
                currentSection={currentScrollSection}
                onSectionChange={handleScrollSectionChange}
              />

              {/* Dynamic Content */}
              <div className="pt-8 h-full overflow-y-auto pb-24">
                <AnimatePresence mode="wait">
                  {currentView === 'terminal' && isTerminalVisible && (
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
                        onLanguageChange={setLanguage}
                        onOpenChatbot={() => setIsChatbotOpen(true)}
                        onOpenCTOService={() => setIsCTOServiceOpen(true)}
                        onOpenAbout={handleAboutClick}
                        onClose={() => {
                          setIsTerminalVisible(false);
                          setCurrentScrollSection(0); // Reset navigation to Neural Link when terminal is closed
                        }}
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
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-8 py-16 min-h-screen"
                    >
                      <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                          <div
                            className="br-glitch-title text-5xl mb-6"
                            data-text="MAIWALD ENTERPRISES BV"
                          >
                            MAIWALD ENTERPRISES BV
                          </div>
                          <div className="br-divider mx-auto mb-6" style={{ maxWidth: '300px' }} />
                          <div
                            className="br-subtitle text-lg mb-8"
                            style={{
                              color: '#00f0ff',
                              textShadow: '0 0 20px #00f0ff, 0 0 40px #00f0ff',
                              fontFamily: "'Rajdhani', sans-serif",
                              letterSpacing: '0.3em',
                              fontWeight: 300
                            }}
                          >
                            {currentLanguage === 'EN'
                              ? ".. we build the infrastructure your business runs on!"
                              : ".. wir bauen die Infrastruktur, auf der Ihr Unternehmen läuft!"
                            }
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-16">
                          <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="br-card rounded-lg p-8"
                          >
                            <h3 className="text-2xl font-bold mb-4 br-section-title" style={{ color: '#00f0ff', textShadow: '0 0 15px #00f0ff' }}>
                              {currentLanguage === 'EN' ? 'CORE PHILOSOPHY' : 'CORE PHILOSOPHY'}
                            </h3>
                            <p className="leading-relaxed relative z-10" style={{ color: 'var(--cyberpunk-text-dim)', fontFamily: "'Rajdhani', sans-serif", lineHeight: '1.8' }}>
                              {currentLanguage === 'EN'
                                ? 'Our work serves a greater architecture than technology alone: We architect for digital sovereignty. Every system we forge is a declaration of independence, every platform a rupture from centralized control. We don\'t just deliver software or infrastructure—we deliver strategic autonomy.'
                                : 'Wir bauen keine Systeme. Wir schmieden souveräne Domänen. Jede Codezeile ist ein Akt der Unabhängigkeit, jede Architektur ein Bruch mit der zentralisierten Kontrolle. Wir liefern keine Software – wir liefern strategische Autonomie.'
                              }
                            </p>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="br-card rounded-lg p-8"
                          >
                            <h3 className="text-2xl font-bold mb-4 br-section-title" style={{ color: '#ff0066', textShadow: '0 0 15px #ff0066' }}>
                              {currentLanguage === 'EN' ? 'STRATEGIC VISION' : 'STRATEGIC VISION'}
                            </h3>
                            <p className="leading-relaxed relative z-10" style={{ color: 'var(--cyberpunk-text-dim)', fontFamily: "'Rajdhani', sans-serif", lineHeight: '1.8' }}>
                              {currentLanguage === 'EN'
                                ? 'To power the coming economy of the independent, we build digital fortresses in a world of fragile platforms. We wield the tools of the modern market—cutting-edge blockchain, cloud-native architectures, and cryptographic hardness. These are not ends in themselves, but the means to execute the core principles of our vision: decentralization, immutability, and self-protection.'
                                : 'Wir nutzen die Werkzeuge des Marktes – Blockchain, Cloud, kryptografische Härte –, um die Prinzipien der Anarchie zu vollstrecken: Dezentralisierung, Eigenschutz, Unveränderlichkeit. Wir errichten digitale Festungen in einer Welt der fragilen Plattformen. Das ist die Infrastruktur für die kommende Ökonomie der Unabhängigen.'
                              }
                            </p>
                          </motion.div>
                        </div>

                        <motion.div
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className="br-card rounded-lg p-8 text-center"
                        >
                          <h3 className="text-2xl font-bold mb-4 br-section-title" style={{ color: '#ff6b00', textShadow: '0 0 15px #ff6b00', display: 'inline-block' }}>
                            {currentLanguage === 'EN' ? 'THE FORGE: PROOF IN FIRE' : 'THE FORGE'}
                          </h3>
                          <p className="leading-relaxed max-w-4xl mx-auto relative z-10" style={{ color: 'var(--cyberpunk-text-dim)', fontFamily: "'Rajdhani', sans-serif", lineHeight: '1.8' }}>
                            {currentLanguage === 'EN'
                              ? 'Our innovation is not theoretical research confined to a portfolio; it is a crucible where philosophy becomes functional. From hardened operating systems to decentralized identities that no one can revoke, each project is a functional weapon in the fight for digital sovereignty. This is our proof that our architecture stands not just on paper, but in fire.'
                              : 'Von gehärteten Betriebssystemen bis zu dezentralen Identitäten, die niemand widerrufen kann: Unsere Projekte sind keine Forschung. Sie sind funktionierende Waffen im Kampf um digitale Souveränität und der Beweis, dass unsere Architektur nicht nur theoretisch, sondern auch im Feuer besteht.'
                            }
                          </p>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {currentView === 'legal' && (
                    <motion.div
                      key="legal"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.5 }}
                      className="px-8 py-16 min-h-screen"
                    >
                      <LegalSection currentLanguage={currentLanguage} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>



              {/* Contact Modal */}
              <ContactModal 
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
                currentLanguage={currentLanguage}
              />

              {/* Info Modal */}
              <InfoModal 
                key={`${currentSection}-${currentLanguage}`}
                isOpen={isInfoModalOpen}
                onClose={() => setIsInfoModalOpen(false)}
                section={currentSection}
                currentLanguage={currentLanguage}
                onOpenChatbot={() => setIsChatbotOpen(true)}
              />

              {/* Desktop Applications */}
              <AnimatePresence>
                {isCalculatorOpen && (
                  <Calculator
                    onClose={() => setIsCalculatorOpen(false)}
                    onMinimize={() => setIsCalculatorOpen(false)}
                  />
                )}
              </AnimatePresence>

              <AnimatePresence>
                {isTextEditorOpen && (
                  <TextEditor
                    onClose={() => setIsTextEditorOpen(false)}
                    onMinimize={() => setIsTextEditorOpen(false)}
                  />
                )}
              </AnimatePresence>

              <AnimatePresence>
                {isSkillsOpen && (
                  <SkillsApp
                    isOpen={isSkillsOpen}
                    onClose={() => setIsSkillsOpen(false)}
                  />
                )}
              </AnimatePresence>

              <AnimatePresence>
                {isChatbotOpen && (
                  <ChatbotApp
                    isOpen={isChatbotOpen}
                    onClose={() => setIsChatbotOpen(false)}
                  />
                )}
              </AnimatePresence>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Dock - Always visible, even with modals open */}
        {!showRitual && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[100]">
            <Dock
              onTerminalClick={() => {
                setCurrentView('terminal');
                setIsTerminalVisible(true);
                setIsInfoModalOpen(false);
                setIsContactModalOpen(false);
              }}
              onContactClick={() => {
                setIsContactModalOpen(true);
                setIsInfoModalOpen(false);
              }}
              onSectionClick={handleSectionClick}
              onHelpClick={() => {
                setCurrentSection('about');
                setIsInfoModalOpen(true);
                setIsContactModalOpen(false);
              }}
              onCalculatorClick={handleCalculatorClick}
              onTextEditorClick={handleTextEditorClick}
              onSkillsClick={handleSkillsClick}
              onChatbotClick={handleChatbotClick}
              currentLanguage={currentLanguage}
            />
          </div>
        )}

        {/* System Monitor - Fixed position outside scrolling content */}
        {!showRitual && <SystemMonitor />}

        {/* Easter Egg Terminal - Fixed position outside scrolling content */}
        {!showRitual && (
          <EasterEggTerminal 
            currentLanguage={currentLanguage}
            onProjectsReveal={() => {
              setCurrentView('projects');
              setCurrentScrollSection(2);
            }}
          />
        )}



        {/* Fixed UI Elements - Outside all containers for guaranteed visibility */}
        {!showRitual && (
          <>
            {/* Ambient Audio Button */}
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('toggleAmbientAudio'));
              }}
              className="fixed bottom-20 right-4 z-[70] cyberpunk-button p-2 rounded-full"
              style={{ position: 'fixed', bottom: '5rem', right: '1rem', zIndex: 70 }}
              aria-label="Toggle ambient audio"
            >
              {isAmbientAudioPlaying ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
              )}
            </button>

            {/* Easter Egg Terminal Button */}
            <button
              onClick={() => {
                // Dispatch a custom event to trigger the easter egg terminal
                window.dispatchEvent(new CustomEvent('openEasterEgg'));
              }}
              className="fixed bottom-4 right-16 z-[70] w-12 h-12 cyberpunk-button rounded-full flex items-center justify-center text-cyberpunk-electric-blue hover:text-cyberpunk-bg transition-all duration-300"
              style={{ position: 'fixed', bottom: '1rem', right: '4rem', zIndex: 70 }}
              title="Open Easter Egg Terminal (or press ~)"
            >
              <span className="text-xl font-mono">~</span>
            </button>
          </>
        )}
      </div>

      {/* Modals and Overlays */}
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        currentLanguage={currentLanguage}
      />
      
      <InfoModal 
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        currentLanguage={currentLanguage}
        section={currentSection}
        onOpenChatbot={() => setIsChatbotOpen(true)}
      />

      <Calculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      <TextEditor
        isOpen={isTextEditorOpen}
        onClose={() => setIsTextEditorOpen(false)}
        currentLanguage={currentLanguage}
      />

      <SkillsApp
        isOpen={isSkillsOpen}
        onClose={() => setIsSkillsOpen(false)}
        currentLanguage={currentLanguage}
      />

      <ChatbotApp 
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        currentLanguage={currentLanguage}
      />

      <CTOServiceShowcase
        isOpen={isCTOServiceOpen}
        onClose={() => setIsCTOServiceOpen(false)}
      />
    </CyberpunkEffects>
  );
}
