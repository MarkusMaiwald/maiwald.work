import { useEffect } from 'react';
import { Language } from '../hooks/useLanguage';
import { content } from '../data/content';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: string;
  currentLanguage: Language;
}

export function InfoModal({ isOpen, onClose, section, currentLanguage }: InfoModalProps) {
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      return () => document.removeEventListener('keydown', handleEscKey);
    }
  }, [isOpen, onClose]);

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
          <div className="whitespace-pre-wrap text-sm text-cyberpunk-text font-mono leading-relaxed">
            {displayContent.split('\n').map((line, index) => {
              // Check if line contains a URL
              const urlRegex = /(https?:\/\/[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/g;
              const parts = line.split(urlRegex);
              
              return (
                <div key={index}>
                  {parts.map((part, partIndex) => {
                    if (urlRegex.test(part)) {
                      const url = part.startsWith('http') ? part : `https://${part}`;
                      return (
                        <a
                          key={partIndex}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyberpunk-electric-blue hover:text-cyberpunk-neon-cyan underline cursor-pointer transition-colors"
                        >
                          {part}
                        </a>
                      );
                    }
                    return part;
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}