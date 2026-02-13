import { Language } from '../hooks/useLanguage';
import { CyberpunkAudio } from './CyberpunkEffects';
import { useEffect } from 'react';

interface DockProps {
  onTerminalClick: () => void;
  onContactClick: () => void;
  onSectionClick: (section: string) => void;
  onHelpClick: () => void;
  onCalculatorClick: () => void;
  onTextEditorClick: () => void;
  onSkillsClick: () => void;
  onChatbotClick: () => void;
  currentLanguage: Language;
}

export function Dock({ onTerminalClick, onContactClick, onSectionClick, onHelpClick, onCalculatorClick, onTextEditorClick, onSkillsClick, onChatbotClick, currentLanguage }: DockProps) {
  // Initialize audio on first render
  useEffect(() => {
    const initAudio = () => {
      CyberpunkAudio.initializeAudio();
      document.removeEventListener('click', initAudio);
    };
    document.addEventListener('click', initAudio, { once: true });
    return () => document.removeEventListener('click', initAudio);
  }, []);
  const apps = [
    {
      id: 'terminal',
      title: 'TERMINAL',
      icon: '💻',
      color: 'from-cyberpunk-surface via-cyberpunk-electric-blue to-cyberpunk-surface text-cyberpunk-electric-blue',
      action: onTerminalClick
    },
    {
      id: 'contact',
      title: 'CONTACT',
      icon: '📧',
      color: 'from-cyberpunk-surface via-cyberpunk-neon-magenta to-cyberpunk-surface text-cyberpunk-neon-magenta',
      action: onContactClick
    },
    {
      id: 'services',
      title: 'SERVICES',
      icon: '🛠️',
      color: 'from-cyberpunk-surface via-cyberpunk-purple to-cyberpunk-surface text-cyberpunk-purple',
      action: () => onSectionClick('services')
    },
    {
      id: 'cloud',
      title: 'CLOUD',
      icon: '☁️',
      color: 'from-cyberpunk-surface via-cyberpunk-neon-cyan to-cyberpunk-surface text-cyberpunk-neon-cyan',
      action: () => onSectionClick('cloud')
    },
    {
      id: 'projects',
      title: 'PROJECTS',
      icon: '📁',
      color: 'from-cyberpunk-surface via-cyberpunk-orange to-cyberpunk-surface text-cyberpunk-orange',
      action: () => onSectionClick('projects')
    },
    {
      id: 'development',
      title: 'DEV',
      icon: '⚡',
      color: 'from-cyberpunk-surface via-cyberpunk-electric-blue to-cyberpunk-surface text-cyberpunk-electric-blue',
      action: () => onSectionClick('development')
    },
    {
      id: 'skills',
      title: 'SKILLS',
      icon: '🎯',
      color: 'from-cyberpunk-surface via-cyberpunk-acid-green to-cyberpunk-surface text-cyberpunk-acid-green',
      action: onSkillsClick
    },
    {
      id: 'chatbot',
      title: 'AI CHAT',
      icon: '🤖',
      color: 'from-cyberpunk-surface via-cyberpunk-neon-magenta to-cyberpunk-surface text-cyberpunk-neon-magenta',
      action: onChatbotClick
    },
    {
      id: 'blockchain',
      title: 'BLOCKCHAIN',
      icon: '🔗',
      color: 'from-cyberpunk-surface via-cyberpunk-acid-green to-cyberpunk-surface text-cyberpunk-acid-green',
      action: () => onSectionClick('blockchain')
    },
    {
      id: 'calculator',
      title: 'CALC',
      icon: '🔢',
      color: 'from-cyberpunk-surface via-cyberpunk-electric-blue to-cyberpunk-surface text-cyberpunk-electric-blue',
      action: onCalculatorClick
    },
    {
      id: 'text-editor',
      title: 'EDITOR',
      icon: '📝',
      color: 'from-cyberpunk-surface via-cyberpunk-neon-magenta to-cyberpunk-surface text-cyberpunk-neon-magenta',
      action: onTextEditorClick
    },
    {
      id: 'help',
      title: 'HELP',
      icon: '❓',
      color: 'from-cyberpunk-surface via-cyberpunk-text-dim to-cyberpunk-surface text-cyberpunk-text-dim',
      action: onHelpClick
    }
  ];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div
        className="rounded-2xl p-3"
        style={{
          background: 'rgba(10, 10, 20, 0.88)',
          border: '1px solid rgba(0, 240, 255, 0.15)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 240, 255, 0.08)'
        }}
      >
        <div className="flex items-end space-x-1">
          {apps.map((app) => (
            <div
              key={app.id}
              className="dock-icon cursor-pointer"
              title={app.title}
              onMouseEnter={() => CyberpunkAudio.playHoverClick()}
              onClick={() => {
                CyberpunkAudio.playButtonClick();
                app.action();
              }}
            >
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center text-2xl font-bold transition-all duration-300"
                style={{
                  background: 'rgba(15, 15, 25, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.4)';
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 240, 255, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {app.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
