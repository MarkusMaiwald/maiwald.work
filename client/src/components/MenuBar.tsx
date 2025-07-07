import { useState, useEffect } from 'react';
import { Language } from '../hooks/useLanguage';

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
    <div className="fixed top-0 left-0 right-0 h-7 bg-black bg-opacity-20 glass-effect z-60 flex items-center justify-between px-4 text-white text-sm">
      <div className="flex items-center space-x-4">
        <div className="font-bold">🍎</div>
        <span>Terminal</span>
      </div>
      <div className="flex items-center space-x-4">
        <div 
          className="cursor-pointer hover:bg-white hover:bg-opacity-20 px-2 py-1 rounded"
          onClick={onLanguageToggle}
        >
          <span>{currentLanguage}</span>
        </div>
        <div className="text-xs">{currentTime}</div>
      </div>
    </div>
  );
}
