import { useEffect, useState } from 'react';
import { Language } from '../hooks/useLanguage';
import { content } from '../data/content';
import { MatrixBackground, CyberpunkAudio, CustomCursor } from './CyberpunkEffects';

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
  if (!sectionContent) {
    console.error(`Section content not found for: ${section}`);
    return null;
  }

  const displayContent = sectionContent[currentLanguage];
  if (!displayContent) {
    console.error(`Display content not found for section: ${section}, language: ${currentLanguage}`);
    return null;
  }

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50" 
      style={{ 
        background: `
          linear-gradient(135deg, #000514 0%, #001122 50%, #000f1e 100%),
          radial-gradient(ellipse at center, rgba(0, 212, 255, 0.2) 0%, transparent 70%)
        `,
        cursor: 'none',
        backdropFilter: 'blur(5px)'
      }}
    >
      {/* Custom cyberpunk cursor for modal */}
      <div
        className="fixed pointer-events-none z-[60]"
        style={{
          left: cursorPosition.x - 12,
          top: cursorPosition.y - 12,
          width: '24px',
          height: '24px',
          border: '3px solid #00d4ff',
          borderRadius: '50%',
          backgroundColor: 'rgba(0, 212, 255, 0.3)',
          boxShadow: '0 0 20px rgba(0, 212, 255, 0.8), inset 0 0 10px rgba(0, 212, 255, 0.5)',
          transition: 'none'
        }}
      />
      
      {/* Matrix background */}
      <MatrixBackground />
      <div 
        className="w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden relative"
        style={{
          background: 'linear-gradient(135deg, rgba(18, 18, 18, 0.98) 0%, rgba(26, 26, 26, 0.99) 50%, rgba(18, 18, 18, 0.98) 100%)',
          border: '3px solid #00d4ff',
          borderRadius: '8px',
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.8),
            inset 0 2px 0 rgba(0, 212, 255, 0.4),
            0 0 40px rgba(0, 212, 255, 0.6),
            0 0 80px rgba(0, 212, 255, 0.3)
          `,
          backdropFilter: 'blur(20px)'
        }}
      >
        {/* Cyberpunk Header */}
        <div 
          className="flex items-center justify-between p-4 border-b"
          style={{
            borderColor: '#00d4ff',
            background: 'linear-gradient(90deg, rgba(26, 26, 26, 0.9) 0%, rgba(18, 18, 18, 0.95) 100%)'
          }}
        >
          <div className="flex items-center space-x-3">
            <div 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: '#00d4ff' }}
            ></div>
            <div 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: '#00ffff', animationDelay: '0.5s' }}
            ></div>
            <div 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: '#39ff14', animationDelay: '1s' }}
            ></div>
          </div>
          <div 
            className="text-sm font-mono font-bold uppercase"
            style={{
              color: '#00d4ff',
              textShadow: '0 0 10px #00d4ff'
            }}
          >
            {section}.DAT
          </div>
          <button
            onMouseEnter={() => {
              CyberpunkAudio.playHoverClick();
              // @ts-ignore
              event.target.style.color = '#ff006e';
            }}
            onMouseLeave={(e) => {
              // @ts-ignore
              e.target.style.color = '#a0a0a0';
            }}
            onClick={() => {
              CyberpunkAudio.playButtonClick();
              onClose();
            }}
            className="font-mono transition-colors"
            style={{
              color: '#a0a0a0',
              fontSize: '14px'
            }}
          >
            [X]
          </button>
        </div>

        {/* Scan line effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="scan-line"></div>
        </div>

        <div 
          className="p-6 overflow-y-auto max-h-[calc(80vh-120px)] relative z-10" 
          style={{
            background: 'linear-gradient(180deg, rgba(18, 18, 18, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div 
            className="whitespace-pre-wrap text-sm font-mono leading-relaxed"
            style={{ color: '#e0e0e0' }}
          >
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
                          onMouseEnter={() => CyberpunkAudio.playHoverClick()}
                          onClick={() => CyberpunkAudio.playButtonClick()}
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