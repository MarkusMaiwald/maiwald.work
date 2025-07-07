import { useState, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { MenuBar } from './MenuBar';
import { Terminal, TerminalRef } from './Terminal';
import { Dock } from './Dock';
import { ContactModal } from './ContactModal';
import { InfoModal } from './InfoModal';

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
    <div className="font-system bg-gray-900 h-screen overflow-hidden">
      {/* Desktop Wallpaper */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')`
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
  );
}
