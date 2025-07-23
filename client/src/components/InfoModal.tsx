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
      
      {/* Matrix-style background pattern - Enhanced */}
      <div className="absolute inset-0 opacity-40">
        <div className="w-full h-full" style={{
          backgroundImage: `
            radial-gradient(circle, rgba(0, 212, 255, 0.4) 1px, transparent 1px),
            linear-gradient(45deg, rgba(0, 212, 255, 0.15) 25%, rgba(255, 0, 110, 0.15) 75%),
            linear-gradient(-45deg, rgba(57, 255, 20, 0.05) 25%, transparent 75%)
          `,
          backgroundSize: '15px 15px, 80px 80px, 120px 120px',
          animation: 'matrix-drift 8s ease-in-out infinite'
        }} />
      </div>
      
      {/* Cyberpunk grid wallpaper effect - Enhanced */}
      <div className="absolute inset-0 opacity-15">
        <div className="w-full h-full" style={{
          background: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 1px,
              rgba(0, 212, 255, 0.08) 1px,
              rgba(0, 212, 255, 0.08) 3px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 1px,
              rgba(255, 0, 110, 0.06) 1px,
              rgba(255, 0, 110, 0.06) 3px
            ),
            radial-gradient(ellipse at center, rgba(0, 212, 255, 0.02) 40%, transparent 70%)
          `
        }} />
      </div>
      
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none overflow-hidden">
        <div className="matrix-rain-container w-full h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="matrix-column absolute top-0 text-xs font-mono text-cyberpunk-electric-blue"
              style={{
                left: `${i * 8.33}%`,
                width: '20px',
                animation: `matrix-rain ${3 + Math.random() * 4}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: 0.6
              }}
            >
              {Array.from({ length: 30 }).map((_, j) => (
                <div key={j} className="matrix-char" style={{ 
                  color: j < 3 ? '#00ff41' : '#00d4ff',
                  opacity: j < 3 ? 1 : 0.7 - (j * 0.02)
                }}>
                  {Math.random() > 0.5 ? '1' : '0'}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Animated scan lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div style={{
          position: 'absolute',
          top: '20%',
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
          animation: 'scan-line 4s linear infinite',
          animationDelay: '0s'
        }} />
        <div style={{
          position: 'absolute',
          top: '60%',
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #ff006e, transparent)',
          animation: 'scan-line 6s linear infinite',
          animationDelay: '2s'
        }} />
      </div>
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
            onClick={onClose}
            className="font-mono transition-colors"
            style={{
              color: '#a0a0a0',
              fontSize: '14px'
            }}
            onMouseEnter={(e) => e.target.style.color = '#ff006e'}
            onMouseLeave={(e) => e.target.style.color = '#a0a0a0'}
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