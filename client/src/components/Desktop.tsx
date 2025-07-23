import { useState, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { MenuBar } from './MenuBar';
import { Terminal, TerminalRef } from './Terminal';
import { Dock } from './Dock';
import { ContactModal } from './ContactModal';
import { InfoModal } from './InfoModal';
import { CyberpunkEffects, GlitchText, TypewriterEffect } from './CyberpunkEffects';

export function Desktop() {
  const { currentLanguage, toggleLanguage, setLanguage } = useLanguage();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('');
  const terminalRef = useRef<TerminalRef>(null);

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
    // Show info modal for the section
    setCurrentSection(section);
    setIsInfoModalOpen(true);
  };

  const handleHelpClick = () => {
    // Execute help command in terminal
    if (terminalRef.current) {
      terminalRef.current.executeCommand('help');
    }
  };

  const handleLanguageChange = (lang: typeof currentLanguage) => {
    setLanguage(lang);
  };

  return (
    <CyberpunkEffects>
      <div className="font-system h-screen overflow-hidden" style={{ background: 'var(--cyberpunk-bg)' }}>
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

      {/* Menu Bar */}
      <MenuBar 
        currentLanguage={currentLanguage} 
        onLanguageToggle={toggleLanguage}
      />

      {/* Terminal Window */}
      <Terminal 
        ref={terminalRef}
        currentLanguage={currentLanguage}
        onOpenContact={handleContactClick}
        onLanguageChange={handleLanguageChange}
      />

      {/* Dock */}
      <Dock 
        onTerminalClick={handleTerminalClick}
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
      </div>
    </CyberpunkEffects>
  );
}
