import { Language } from '../hooks/useLanguage';
import { content } from '../data/content';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: string;
  currentLanguage: Language;
}

export function InfoModal({ isOpen, onClose, section, currentLanguage }: InfoModalProps) {
  if (!isOpen) return null;

  const sectionContent = content[section];
  if (!sectionContent) return null;

  const displayContent = sectionContent[currentLanguage];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="cyberpunk-panel w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden relative">
        {/* Cyberpunk Header */}
        <div className="flex items-center justify-between p-4 border-b border-cyberpunk-border bg-cyberpunk-surface-light">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-cyberpunk-electric-blue rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-cyberpunk-neon-cyan rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-2 h-2 bg-cyberpunk-acid-green rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          <div className="text-sm font-mono font-bold text-cyberpunk-electric-blue uppercase">
            {section}.DAT
          </div>
          <button
            onClick={onClose}
            className="text-cyberpunk-text-dim hover:text-cyberpunk-neon-magenta transition-colors font-mono"
          >
            [X]
          </button>
        </div>

        {/* Scan line effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="scan-line"></div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)] bg-cyberpunk-bg relative z-10">
          <pre className="whitespace-pre-wrap text-sm text-cyberpunk-text font-mono leading-relaxed">
            {displayContent}
          </pre>
        </div>
      </div>
    </div>
  );
}