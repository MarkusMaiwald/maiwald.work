import { useState, useEffect } from 'react';
import { Language } from '../hooks/useLanguage';
import { GlitchText } from './CyberpunkEffects';

interface MenuBarProps {
  currentLanguage: Language;
  onLanguageToggle: () => void;
  onContactClick?: () => void;
}

export function MenuBar({ currentLanguage, onLanguageToggle, onContactClick }: MenuBarProps) {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      const dateString = now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
      setCurrentTime(timeString);
      setCurrentDate(dateString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-8 cyberpunk-nav z-60 flex items-center justify-between px-4 text-sm">
      <div className="flex items-center space-x-4">
        <div className="text-lg font-bold text-cyan-400">◊</div>
        <div 
          className="text-cyberpunk-text-dim hover:text-cyberpunk-electric-blue text-xs font-mono cursor-pointer transition-colors interactive"
          onClick={onContactClick}
        >
          markus@maiwald.work
        </div>
      </div>
      
      {/* Center - Clock and Date */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-xs font-mono text-cyberpunk-electric-blue text-glow">
          {currentTime}
        </div>
        <div className="text-xs font-mono text-cyberpunk-text-dim -mt-1">
          {currentDate}
        </div>
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
      </div>
    </div>
  );
}
