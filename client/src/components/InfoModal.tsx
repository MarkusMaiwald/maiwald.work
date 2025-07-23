import { useEffect, useState } from 'react';
import { Language } from '../hooks/useLanguage';
import { content } from '../data/content';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: string;
  currentLanguage: Language;
}

export function InfoModal({ isOpen, onClose, section, currentLanguage }: InfoModalProps) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (isOpen) {
        setCursorPosition({ x: event.clientX, y: event.clientY });
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.addEventListener('mousemove', handleMouseMove);
      return () => {
        document.removeEventListener('keydown', handleEscKey);
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sectionContent = content[section];
  if (!sectionContent) return null;

  const displayContent = sectionContent[currentLanguage];

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50" 
      style={{ 
        background: 'linear-gradient(135deg, #000f1e 0%, #001829 100%)',
        cursor: 'none' // Hide default cursor in modal
      }}
    >
      {/* Custom cyberpunk cursor for modal */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: cursorPosition.x - 8,
          top: cursorPosition.y - 8,
          width: '16px',
          height: '16px',
          border: '2px solid #00d4ff',
          borderRadius: '50%',
          backgroundColor: 'rgba(0, 212, 255, 0.2)',
          boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
          transition: 'none'
        }}
      />
      
      {/* Matrix-style background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle, rgba(0, 212, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          animation: 'matrix-drift 8s linear infinite'
        }} />
      </div>
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