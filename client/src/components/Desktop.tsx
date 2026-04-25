import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { MenuBar } from './MenuBar';
import { Terminal, TerminalRef } from './Terminal';
import { Dock } from './Dock';
import { ContactModal } from './ContactModal';
import { InfoModal } from './InfoModal';
import { CyberpunkEffects, GlitchText, TypewriterEffect, MatrixBackground } from './CyberpunkEffects';
import { TerminalRitual } from './TerminalRitual';
import { ProjectShowcase } from './ProjectShowcase';
import { LegalSection } from './LegalSection';
import { ParticleField } from './ParticleField';
import { ScrollProgress } from './ScrollProgress';
import { EasterEggTerminal } from './EasterEggTerminal';
import { Calculator } from './Calculator';
import { TextEditor } from './TextEditor';
import { SkillsApp } from './SkillsApp';
import { ChatbotApp } from './ChatbotApp';
import { EngagementShowcase } from './EngagementShowcase';
import { ChapterZero } from './ChapterZero';
import { SovereignSocietyShowcase } from './SovereignSocietyShowcase';
import { DevlogApp } from './DevlogApp';
import { DevlogWidget } from './DevlogWidget';
import { WritingApp } from './WritingApp';
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
  const [isEngagementOpen, setIsEngagementOpen] = useState(false);
  const [isChapterZeroOpen, setIsChapterZeroOpen] = useState(false);
  const [isSovereignSocietyOpen, setIsSovereignSocietyOpen] = useState(false);
  const [projectShowcaseInitialId, setProjectShowcaseInitialId] = useState<string | undefined>(undefined);
  const [isDevlogOpen, setIsDevlogOpen] = useState(false);
  const [isWritingOpen, setIsWritingOpen] = useState(false);
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

    // Listen for custom events.
    //
    // Two pathways exist for opening any of these modals — by design:
    //   1. Direct setter props (used by Dock buttons + other Desktop-direct children).
    //      These reach the setter without going through the event bus.
    //   2. Custom DOM events (used by callers that can't reach Desktop's setters —
    //      the Terminal hook, dispatched-from-deep-inside-a-modal cross-links, etc.).
    //      Each event below has a matching listener registration + cleanup pair.
    //
    // Adding a new modal? Wire BOTH pathways so terminal commands and direct dock
    // clicks behave identically. The setter is the single source of truth.
    const handleOpenContact = () => setIsContactModalOpen(true);
    const handleOpenChatbot = () => setIsChatbotOpen(true);
    const handleOpenEngagement = () => setIsEngagementOpen(true);
    const handleOpenChapterZero = () => setIsChapterZeroOpen(true);
    const handleOpenDevlog = () => setIsDevlogOpen(true);
    const handleOpenWriting = () => setIsWritingOpen(true);
    const handleOpenSovereignSociety = () => setIsSovereignSocietyOpen(true);
    const handleOpenProjectShowcase = (event: Event) => {
      const detail = (event as CustomEvent<{ projectId?: string }>).detail;
      const projectId = detail?.projectId;
      // Close the SS modal so the user sees the cross-link transition.
      setIsSovereignSocietyOpen(false);
      setCurrentView('projects');
      if (projectId) {
        // Force a fresh prop value even if the same id is requested twice in a row.
        setProjectShowcaseInitialId(undefined);
        setTimeout(() => setProjectShowcaseInitialId(projectId), 0);
      }
    };

    window.addEventListener('ambientAudioStateChanged', handleAudioStateChange as EventListener);
    window.addEventListener('openContact', handleOpenContact);
    window.addEventListener('openChatbot', handleOpenChatbot);
    window.addEventListener('openEngagement', handleOpenEngagement);
    window.addEventListener('openChapterZero', handleOpenChapterZero);
    window.addEventListener('openDevlog', handleOpenDevlog);
    window.addEventListener('openWriting', handleOpenWriting);
    window.addEventListener('openSovereignSociety', handleOpenSovereignSociety);
    window.addEventListener('openProjectShowcase', handleOpenProjectShowcase);

    return () => {
      window.removeEventListener('ambientAudioStateChanged', handleAudioStateChange as EventListener);
      window.removeEventListener('openContact', handleOpenContact);
      window.removeEventListener('openChatbot', handleOpenChatbot);
      window.removeEventListener('openEngagement', handleOpenEngagement);
      window.removeEventListener('openChapterZero', handleOpenChapterZero);
      window.removeEventListener('openDevlog', handleOpenDevlog);
      window.removeEventListener('openWriting', handleOpenWriting);
      window.removeEventListener('openSovereignSociety', handleOpenSovereignSociety);
      window.removeEventListener('openProjectShowcase', handleOpenProjectShowcase);
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
    } else if (section === 'services' || section === 'engagement') {
      // Legacy 'services' click routes to the new engagement modal.
      setIsEngagementOpen(true);
    } else if (section === 'chapter-zero') {
      setIsChapterZeroOpen(true);
    } else if (section === 'sovereign-society') {
      setIsSovereignSocietyOpen(true);
    } else if (section === 'devlog') {
      setIsDevlogOpen(true);
    } else if (section === 'writing') {
      setIsWritingOpen(true);
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
        {/* Simple dark blue background */}
        <div 
          className="fixed inset-0" 
          style={{
            background: 'linear-gradient(135deg, #000f1e 0%, #001829 100%)'
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
                      className="fixed top-16 left-1/2 transform -translate-x-1/2 w-full max-w-5xl px-4 z-30 space-y-3"
                    >
                      <Terminal
                        ref={terminalRef}
                        currentLanguage={currentLanguage}
                        onOpenContact={handleContactClick}
                        onLanguageChange={setLanguage}
                        onOpenChatbot={() => setIsChatbotOpen(true)}
                        onOpenEngagement={() => setIsEngagementOpen(true)}
                        onOpenChapterZero={() => setIsChapterZeroOpen(true)}
                        onOpenSovereignSociety={() => setIsSovereignSocietyOpen(true)}
                        onOpenDevlog={() => setIsDevlogOpen(true)}
                        onOpenWriting={() => setIsWritingOpen(true)}
                        onOpenAbout={handleAboutClick}
                        onClose={() => {
                          setIsTerminalVisible(false);
                          setCurrentScrollSection(0); // Reset navigation to Neural Link when terminal is closed
                        }}
                      />
                      <DevlogWidget currentLanguage={currentLanguage} />
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
                      <ProjectShowcase
                        currentLanguage={currentLanguage}
                        initialProjectId={projectShowcaseInitialId}
                      />
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
                          <GlitchText className="text-5xl font-bold cyberpunk-heading mb-6" enableHover={true}>
                            {currentLanguage === 'EN'
                              ? "I DON'T SELL TIME – I BUILD AND OWN."
                              : 'ICH VERKAUFE KEINE ZEIT – ICH BAUE UND BESITZE.'}
                          </GlitchText>
                          <div
                            className="text-2xl font-bold mb-8"
                            style={{
                              color: '#00d4ff',
                              textShadow: '0 0 20px #00d4ff, 0 0 40px #00d4ff',
                              display: 'block',
                              opacity: 1,
                              visibility: 'visible',
                              position: 'relative',
                              zIndex: 10,
                              fontFamily: 'Space Grotesk, sans-serif',
                              letterSpacing: '0.05em'
                            }}
                          >
                            {currentLanguage === 'EN'
                              ? 'Systems Architect · President, Sovereign Society SAE (Libertaria Foundation) · Leader, Chapter ZERO'
                              : 'Systems Architect · Präsident, Sovereign Society SAE (Libertaria Foundation) · Leiter, Chapter ZERO'}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-16">
                          <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="cyberpunk-panel p-8"
                          >
                            <h3 className="text-2xl font-bold text-cyberpunk-electric-blue mb-4 text-glow">
                              {currentLanguage === 'EN' ? 'POSTURE' : 'HALTUNG'}
                            </h3>
                            <p className="text-cyberpunk-text leading-relaxed whitespace-pre-line">
                              {currentLanguage === 'EN'
                                ? 'I do not rent my brain. I invest it.\n\nNo hourly. No fixed monthly retainers. No fractional-CTO theatre. No bodyshopping. No "embedded advisor" roleplay for VC-funded ghost ships.\n\nThe filter is the feature. The positioning is the firewall.'
                                : 'Ich vermiete mein Hirn nicht. Ich investiere es.\n\nKeine Stundensätze. Keine festen monatlichen Retainer. Kein Fractional-CTO-Theater. Kein Bodyshopping. Kein "Embedded Advisor"-Rollenspiel für VC-finanzierte Geisterschiffe.\n\nDer Filter ist das Feature. Die Positionierung ist die Firewall.'}
                            </p>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="cyberpunk-panel p-8"
                          >
                            <h3 className="text-2xl font-bold text-cyberpunk-neon-magenta mb-4 text-glow">
                              {currentLanguage === 'EN' ? 'THE UNIFIED STACK' : 'DER VEREINIGTE STACK'}
                            </h3>
                            <p className="text-cyberpunk-text leading-relaxed whitespace-pre-line">
                              {currentLanguage === 'EN'
                                ? 'Janus – the language you code in.\nNexus OS – the kernel underneath.\nGraf – cryptographic VCS for source and history.\nSoulKey / SKH – post-quantum identity nobody can revoke.\nLibertaria Protocol – human coordination without central authority.\nChapter ZERO – the first living polity running on all of it.\n\nOne body of work. Not a service portfolio.'
                                : 'Janus – die Sprache, in der du programmierst.\nNexus OS – der Kernel darunter.\nGraf – kryptografisches VCS für Quellcode und Historie.\nSoulKey / SKH – post-quantische Identität, die niemand widerrufen kann.\nLibertaria-Protokoll – menschliche Koordination ohne zentrale Autorität.\nChapter ZERO – das erste lebende Gemeinwesen, das auf alldem läuft.\n\nEin Werkskorpus. Kein Dienstleistungsportfolio.'}
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
                            {currentLanguage === 'EN' ? 'WANT ME?' : 'WILLST DU MICH?'}
                          </h3>
                          <p className="text-cyberpunk-text leading-relaxed max-w-4xl mx-auto">
                            {currentLanguage === 'EN'
                              ? 'Bring equity. Bring vision. Bring both. Everything else is a time-waster for both of us.'
                              : 'Bring Equity mit. Bring Vision mit. Bring beides mit. Alles andere ist Zeitverschwendung für uns beide.'}
                          </p>
                          <div className="flex flex-wrap gap-3 justify-center mt-6">
                            <button
                              onClick={() => setIsEngagementOpen(true)}
                              className="cyberpunk-button px-6 py-3 rounded-lg font-mono text-sm"
                            >
                              {currentLanguage === 'EN' ? 'ENGAGEMENT TERMS →' : 'ENGAGEMENT-BEDINGUNGEN →'}
                            </button>
                            <button
                              onClick={() => setIsChapterZeroOpen(true)}
                              className="cyberpunk-button px-6 py-3 rounded-lg font-mono text-sm"
                            >
                              {currentLanguage === 'EN' ? 'CHAPTER ZERO →' : 'CHAPTER ZERO →'}
                            </button>
                            <button
                              onClick={handleContactClick}
                              className="cyberpunk-button px-6 py-3 rounded-lg font-mono text-sm"
                            >
                              {currentLanguage === 'EN' ? 'PITCH ME →' : 'PITCHE MICH →'}
                            </button>
                          </div>
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
              onHelpClick={handleHelpClick}
              onSkillsClick={handleSkillsClick}
              onChatbotClick={handleChatbotClick}
              onEngagementClick={() => setIsEngagementOpen(true)}
              onChapterZeroClick={() => setIsChapterZeroOpen(true)}
              onSovereignSocietyClick={() => setIsSovereignSocietyOpen(true)}
              onDevlogClick={() => setIsDevlogOpen(true)}
              onWritingClick={() => setIsWritingOpen(true)}
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
      />

      <ChatbotApp
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
      />

      <EngagementShowcase
        isOpen={isEngagementOpen}
        onClose={() => setIsEngagementOpen(false)}
        currentLanguage={currentLanguage}
        onOpenContact={() => setIsContactModalOpen(true)}
      />

      <ChapterZero
        isOpen={isChapterZeroOpen}
        onClose={() => setIsChapterZeroOpen(false)}
        currentLanguage={currentLanguage}
        onOpenContact={() => setIsContactModalOpen(true)}
      />

      <SovereignSocietyShowcase
        isOpen={isSovereignSocietyOpen}
        onClose={() => setIsSovereignSocietyOpen(false)}
        currentLanguage={currentLanguage}
      />

      <DevlogApp
        isOpen={isDevlogOpen}
        onClose={() => setIsDevlogOpen(false)}
        currentLanguage={currentLanguage}
      />

      <WritingApp
        isOpen={isWritingOpen}
        onClose={() => setIsWritingOpen(false)}
        currentLanguage={currentLanguage}
      />
    </CyberpunkEffects>
  );
}
