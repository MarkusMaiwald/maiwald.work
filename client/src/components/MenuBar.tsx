import { useState, useEffect } from 'react';
import { Language } from '../hooks/useLanguage';
import { GlitchText } from './CyberpunkEffects';

interface MenuBarProps {
  currentLanguage: Language;
  onLanguageToggle: () => void;
}

export function MenuBar({ currentLanguage, onLanguageToggle }: MenuBarProps) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-8 cyberpunk-nav z-60 flex items-center justify-between px-4 text-sm">
      <div className="flex items-center space-x-4">
        <div className="text-lg font-bold text-cyan-400">◊</div>
        <GlitchText className="text-cyberpunk-electric-blue font-mono text-xs" enableHover={true}>
          MARKUS.MAIWALD/SYSTEM
        </GlitchText>
      </div>
      <div className="flex items-center space-x-6">
        <div className="text-cyberpunk-text-dim text-xs font-mono">
          STATUS: <span className="text-cyberpunk-acid-green">ONLINE</span>
        </div>
        <div 
          className="nav-link text-xs font-mono interactive cursor-pointer hover:text-cyberpunk-electric-blue transition-colors"
          onClick={() => {
            console.log('Language toggle clicked, current:', currentLanguage);
            onLanguageToggle();
          }}
        >
          LANG: {currentLanguage.toUpperCase()}
        </div>
        <div className="text-xs font-mono text-cyberpunk-electric-blue text-glow">
          {currentTime}
        </div>
      </div>
    </div>
  );
}
