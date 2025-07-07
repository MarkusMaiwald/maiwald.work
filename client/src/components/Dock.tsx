import { Language } from '../hooks/useLanguage';

interface DockProps {
  onTerminalClick: () => void;
  onContactClick: () => void;
  onSectionClick: (section: string) => void;
  onHelpClick: () => void;
  currentLanguage: Language;
}

export function Dock({ onTerminalClick, onContactClick, onSectionClick, onHelpClick, currentLanguage }: DockProps) {
  const apps = [
    {
      id: 'terminal',
      title: 'Terminal',
      icon: '>_',
      color: 'bg-black text-[var(--terminal-green)]',
      action: onTerminalClick
    },
    {
      id: 'contact',
      title: 'Contact',
      icon: '✉️',
      color: 'bg-blue-500 text-white',
      action: onContactClick
    },
    {
      id: 'services',
      title: 'Services',
      icon: '⚙️',
      color: 'bg-purple-500 text-white',
      action: () => onSectionClick('services')
    },
    {
      id: 'security',
      title: 'Security',
      icon: '🔒',
      color: 'bg-red-500 text-white',
      action: () => onSectionClick('security')
    },
    {
      id: 'cloud',
      title: 'Cloud',
      icon: '☁️',
      color: 'bg-blue-400 text-white',
      action: () => onSectionClick('cloud')
    },
    {
      id: 'storage',
      title: 'Storage',
      icon: '💾',
      color: 'bg-yellow-500 text-white',
      action: () => onSectionClick('storage')
    },
    {
      id: 'development',
      title: 'Development',
      icon: '💻',
      color: 'bg-green-500 text-white',
      action: () => onSectionClick('development')
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: '⚙️',
      color: 'bg-gray-500 text-white',
      action: onHelpClick
    }
  ];

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-[var(--dock-bg)] glass-effect rounded-2xl p-2 flex items-end space-x-2">
        {apps.map((app) => (
          <div
            key={app.id}
            className="dock-icon cursor-pointer"
            title={app.title}
            onClick={app.action}
          >
            <div className={`w-12 h-12 ${app.color} rounded-lg flex items-center justify-center text-xl font-bold`}>
              {app.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
