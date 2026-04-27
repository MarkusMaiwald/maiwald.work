import { Language } from '../hooks/useLanguage';
import { CyberpunkPanel, CyberpunkAudio } from './CyberpunkEffects';
import { useEffect } from 'react';

interface DockProps {
  onTerminalClick: () => void;
  onContactClick: () => void;
  onSectionClick: (section: string) => void;
  onHelpClick: () => void;
  onSkillsClick: () => void;
  onChatbotClick: () => void;
  onEngagementClick: () => void;
  onChapterZeroClick: () => void;
  onSovereignSocietyClick: () => void;
  onWritingClick: () => void;
  currentLanguage: Language;
}

export function Dock({ onTerminalClick, onContactClick, onSectionClick, onHelpClick, onSkillsClick, onChatbotClick, onEngagementClick, onChapterZeroClick, onSovereignSocietyClick, onWritingClick, currentLanguage }: DockProps) {
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
      id: 'projects',
      title: 'PROJECTS',
      icon: '📁',
      color: 'from-cyberpunk-surface via-cyberpunk-orange to-cyberpunk-surface text-cyberpunk-orange',
      action: () => onSectionClick('projects')
    },
    {
      id: 'chapter-zero',
      title: 'CHAPTER ZERO',
      icon: '⚑',
      color: 'from-cyberpunk-surface via-cyberpunk-neon-magenta to-cyberpunk-surface text-cyberpunk-neon-magenta',
      action: onChapterZeroClick
    },
    {
      id: 'sovereign-society',
      title: 'SOCIETY',
      icon: '⚜',
      color: 'from-cyberpunk-surface via-cyberpunk-gold to-cyberpunk-surface text-cyberpunk-gold',
      action: onSovereignSocietyClick
    },
    {
      id: 'engagement',
      title: 'ENGAGEMENT',
      icon: '◆',
      color: 'from-cyberpunk-surface via-cyberpunk-purple to-cyberpunk-surface text-cyberpunk-purple',
      action: onEngagementClick
    },
    {
      id: 'writing',
      title: 'WRITING',
      icon: '✎',
      color: 'from-cyberpunk-surface via-cyberpunk-purple to-cyberpunk-surface text-cyberpunk-purple',
      action: onWritingClick
    },
    {
      id: 'skills',
      title: 'SKILLS',
      icon: '🧠',
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
      id: 'contact',
      title: 'CONTACT',
      icon: '📧',
      color: 'from-cyberpunk-surface via-cyberpunk-neon-magenta to-cyberpunk-surface text-cyberpunk-neon-magenta',
      action: onContactClick
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
      <CyberpunkPanel className="rounded-2xl p-3 interactive">
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
              <div className={`w-14 h-14 bg-gradient-to-br ${app.color} rounded-lg flex items-center justify-center text-2xl font-bold border border-transparent hover:border-current transition-all duration-300 cyberpunk-button`}>
                {app.icon}
              </div>
            </div>
          ))}
        </div>
      </CyberpunkPanel>
    </div>
  );
}
