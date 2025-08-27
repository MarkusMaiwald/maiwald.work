import { useEffect, useState } from 'react';
import { Language } from '../hooks/useLanguage';
import { content } from '../data/content';
import { MatrixBackground, CyberpunkAudio, CustomCursor } from './CyberpunkEffects';
import markusPhoto from '@assets/Markus_Maiwald_2iextb2iextb2iex_1756293542998.png';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: string;
  currentLanguage: Language;
  onOpenChatbot?: () => void;
}

export function InfoModal({ isOpen, onClose, section, currentLanguage, onOpenChatbot }: InfoModalProps) {
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
  
  // Debug logging
  console.log('InfoModal opened with section:', section, 'onOpenChatbot:', !!onOpenChatbot);

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
      
      {/* Matrix background with proper z-index */}
      <div className="absolute inset-0 z-10">
        <MatrixBackground />
      </div>
      <div 
        className="w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden relative z-20"
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
          className="p-6 overflow-y-auto max-h-[calc(80vh-120px)] relative z-30" 
          style={{
            background: 'linear-gradient(180deg, rgba(18, 18, 18, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* Add photo for about section */}
          {section === 'about' && (
            <div className="flex items-start justify-between gap-6 mb-6">
              <div className="flex-1">
                <h2 className="text-cyberpunk-electric-blue font-bold text-lg uppercase tracking-wide mb-4">
                  About Markus Maiwald
                </h2>
              </div>
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 p-1">
                  <img 
                    src={markusPhoto}
                    alt="Markus Maiwald - Strategic Technology Architect"
                    className="w-full h-full rounded object-cover border border-cyan-400/50"
                  />
                </div>
              </div>
            </div>
          )}

          <div 
            className="text-sm font-mono leading-relaxed formatted-content"
            style={{ color: '#e0e0e0' }}
          >
            {displayContent.split('\n\n').map((paragraph, pIndex) => {
              if (paragraph.trim() === '') return null;
              
              // Check if it's a section header (all caps or has specific patterns)
              if (paragraph.match(/^[A-Z\s&\-()]+$/m) && paragraph.length < 100) {
                return (
                  <h3 key={pIndex} className="text-cyberpunk-electric-blue font-bold mb-3 mt-6 first:mt-0 text-base uppercase tracking-wide">
                    {paragraph.trim()}
                  </h3>
                );
              }
              
              // Check if it's a bullet point section
              if (paragraph.includes('•') || paragraph.match(/^[\-\*]/m)) {  
                const lines = paragraph.split('\n');
                return (
                  <div key={pIndex} className="mb-4">
                    {lines.map((line, lIndex) => {
                      const trimmedLine = line.trim();
                      
                      // URL detection for links
                      const urlRegex = /(https?:\/\/[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/g;
                      
                      if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-') || trimmedLine.startsWith('*')) {
                        const content = trimmedLine.substring(1).trim();
                        const parts = content.split(urlRegex);
                        
                        return (
                          <div key={lIndex} className="flex items-start mb-2 ml-3">
                            <span className="text-cyberpunk-electric-blue mr-3 flex-shrink-0 mt-0.5">•</span>
                            <div className="leading-relaxed">
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
                          </div>
                        );
                      } else if (trimmedLine && !trimmedLine.startsWith('•') && !trimmedLine.startsWith('-') && !trimmedLine.startsWith('*')) {
                        // Sub-header within bullet section
                        return (
                          <div key={lIndex} className="font-bold text-cyberpunk-neon-cyan mb-2 mt-4 first:mt-0">
                            {trimmedLine}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                );
              } else {
                // Regular paragraph with URL detection
                const urlRegex = /(https?:\/\/[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/g;
                const parts = paragraph.split(urlRegex);
                
                return (
                  <p key={pIndex} className="mb-4 leading-relaxed">
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
                  </p>
                );
              }
            })}
          </div>
          
          {/* Chat with AI Button - Always show for testing */}
          <div className="mt-6 pt-4 border-t border-cyberpunk-electric-blue/30">
            <button
              onClick={() => {
                CyberpunkAudio.playButtonClick();
                if (onOpenChatbot) {
                  onOpenChatbot();
                  onClose();
                } else {
                  console.log('onOpenChatbot not provided!');
                }
              }}
              onMouseEnter={() => CyberpunkAudio.playHoverClick()}
              className="w-full px-4 py-3 font-mono text-sm font-bold uppercase transition-all duration-300 hover:scale-105"
              style={{
                background: onOpenChatbot 
                  ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(0, 255, 255, 0.2) 100%)'
                  : 'linear-gradient(135deg, rgba(255, 0, 110, 0.1) 0%, rgba(255, 0, 110, 0.2) 100%)',
                border: onOpenChatbot ? '2px solid #00d4ff' : '2px solid #ff006e',
                borderRadius: '4px',
                color: onOpenChatbot ? '#00d4ff' : '#ff006e',
                textShadow: onOpenChatbot ? '0 0 10px #00d4ff' : '0 0 10px #ff006e',
                boxShadow: onOpenChatbot 
                  ? `0 4px 15px rgba(0, 212, 255, 0.3), inset 0 1px 0 rgba(0, 212, 255, 0.4)`
                  : `0 4px 15px rgba(255, 0, 110, 0.3), inset 0 1px 0 rgba(255, 0, 110, 0.4)`
              }}
            >
              <span className="flex items-center justify-center space-x-2">
                <span>🤖</span>
                <span>
                  {onOpenChatbot 
                    ? (currentLanguage === 'EN' ? 'Chat with my AI' : 'Mit meiner KI chatten')
                    : (currentLanguage === 'EN' ? 'Chat (Debug: No Handler)' : 'Chat (Debug: Kein Handler)')
                  }
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}