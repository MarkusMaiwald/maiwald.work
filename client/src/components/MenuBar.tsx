import { useState, useEffect } from 'react';
import { Language } from '../hooks/useLanguage';
import { CyberpunkAudio } from './CyberpunkEffects';
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
    <div
      className="fixed top-0 left-0 right-0 h-8 z-60 flex items-center justify-between px-4 text-sm"
      style={{
        background: 'rgba(10, 10, 18, 0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 240, 255, 0.15)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
      }}
    >
      <div className="flex items-center space-x-4">
        <div className="text-lg font-bold neon-flicker" style={{ color: '#00f0ff', textShadow: '0 0 10px #00f0ff' }}>◊</div>
        <div
          className="hover:text-cyberpunk-electric-blue text-xs cursor-pointer transition-colors interactive"
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            color: 'var(--cyberpunk-text-dim)',
            letterSpacing: '0.05em'
          }}
          onMouseEnter={() => CyberpunkAudio.playHoverClick()}
          onClick={() => {
            CyberpunkAudio.playButtonClick();
            onContactClick?.();
          }}
        >
          markus@maiwald.work
        </div>
      </div>

      {/* Center - Clock and Date */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-xs font-mono" style={{ color: 'var(--cyberpunk-electric-blue)', textShadow: '0 0 10px var(--cyberpunk-electric-blue)' }}>
          {currentTime}
        </div>
        <div className="text-xs font-mono -mt-1" style={{ color: 'var(--cyberpunk-text-dim)' }}>
          {currentDate}
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="text-xs" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'var(--cyberpunk-text-dim)' }}>
          STATUS: <span style={{ color: '#39ff14', textShadow: '0 0 8px #39ff14' }}>ONLINE</span>
        </div>
        <div
          className="text-xs interactive cursor-pointer transition-colors"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            color: 'var(--cyberpunk-text-dim)',
            padding: '0.25rem 0.5rem',
            border: '1px solid rgba(0, 240, 255, 0.2)',
          }}
          onMouseEnter={() => CyberpunkAudio.playHoverClick()}
          onClick={() => {
            CyberpunkAudio.playButtonClick();
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
