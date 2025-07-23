import { Language } from '../hooks/useLanguage';
import { CyberpunkPanel } from './CyberpunkEffects';

interface DockProps {
  onTerminalClick: () => void;
  onContactClick: () => void;
  onSectionClick: (section: string) => void;
  onHelpClick: () => void;
  onCalculatorClick: () => void;
  onTextEditorClick: () => void;
  currentLanguage: Language;
}

export function Dock({ onTerminalClick, onContactClick, onSectionClick, onHelpClick, onCalculatorClick, onTextEditorClick, currentLanguage }: DockProps) {
  const apps = [
    {
      id: 'terminal',
      title: 'TERMINAL',
      icon: '◊',
      color: 'from-cyberpunk-surface via-cyberpunk-electric-blue to-cyberpunk-surface text-cyberpunk-electric-blue',
      action: onTerminalClick
    },
    {
      id: 'contact',
      title: 'CONTACT',
      icon: '⟐',
      color: 'from-cyberpunk-surface via-cyberpunk-neon-magenta to-cyberpunk-surface text-cyberpunk-neon-magenta',
      action: onContactClick
    },
    {
      id: 'services',
      title: 'SERVICES',
      icon: '⬢',
      color: 'from-cyberpunk-surface via-cyberpunk-purple to-cyberpunk-surface text-cyberpunk-purple',
      action: () => onSectionClick('services')
    },
    {
      id: 'blockchain',
      title: 'BLOCKCHAIN',
      icon: '⬡',
      color: 'from-cyberpunk-surface via-cyberpunk-acid-green to-cyberpunk-surface text-cyberpunk-acid-green',
      action: () => onSectionClick('blockchain')
    },
    {
      id: 'cloud',
      title: 'CLOUD',
      icon: '◈',
      color: 'from-cyberpunk-surface via-cyberpunk-neon-cyan to-cyberpunk-surface text-cyberpunk-neon-cyan',
      action: () => onSectionClick('cloud')
    },
    {
      id: 'projects',
      title: 'PROJECTS',
      icon: '⬟',
      color: 'from-cyberpunk-surface via-cyberpunk-orange to-cyberpunk-surface text-cyberpunk-orange',
      action: () => onSectionClick('projects')
    },
    {
      id: 'development',
      title: 'DEV',
      icon: '⬣',
      color: 'from-cyberpunk-surface via-cyberpunk-electric-blue to-cyberpunk-surface text-cyberpunk-electric-blue',
      action: () => onSectionClick('development')
    },
    {
      id: 'calculator',
      title: 'CALC',
      icon: '≡',
      color: 'from-cyberpunk-surface via-cyberpunk-electric-blue to-cyberpunk-surface text-cyberpunk-electric-blue',
      action: onCalculatorClick
    },
    {
      id: 'text-editor',
      title: 'EDITOR',
      icon: '⌨',
      color: 'from-cyberpunk-surface via-cyberpunk-neon-magenta to-cyberpunk-surface text-cyberpunk-neon-magenta',
      action: onTextEditorClick
    },
    {
      id: 'help',
      title: 'HELP',
      icon: '?',
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
            onClick={app.action}
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
