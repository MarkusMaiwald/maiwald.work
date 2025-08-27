import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { useTerminal } from '../hooks/useTerminal';
import { Language } from '../hooks/useLanguage';
import { content } from '../data/content';
import { CyberpunkPanel, GlitchText, TypewriterEffect, CyberpunkAudio } from './CyberpunkEffects';

interface TerminalProps {
  currentLanguage: Language;
  onOpenContact: () => void;
  onLanguageChange: (lang: Language) => void;
  onClose?: () => void;
  onOpenChatbot?: () => void;
  onOpenCTOService?: () => void;
}

export interface TerminalRef {
  executeCommand: (command: string) => void;
}

export const Terminal = forwardRef<TerminalRef, TerminalProps>(({ currentLanguage, onOpenContact, onLanguageChange, onClose, onOpenChatbot, onOpenCTOService }, ref) => {
  const { 
    lines, 
    currentInput, 
    setCurrentInput, 
    handleKeyDown, 
    focusInput, 
    inputRef,
    processCommand 
  } = useTerminal(currentLanguage, onOpenContact, onOpenChatbot, onOpenCTOService);
  
  const outputRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    executeCommand: (command: string) => {
      processCommand(command);
      focusInput();
    }
  }), [processCommand, focusInput]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  const handleTerminalKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      if (onClose) {
        onClose();
      }
      return;
    }
    
    const result = handleKeyDown(e);
    if (result?.changeLanguage) {
      onLanguageChange(result.changeLanguage);
    }
  };

  return (
    <div className="fixed top-16 left-1/2 transform -translate-x-1/2 w-full max-w-5xl mx-auto px-4 z-30">
      <CyberpunkPanel className="rounded-lg shadow-2xl animate-fade-in interactive">
        {/* Cyberpunk Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-cyberpunk-surface-dark via-cyberpunk-surface to-cyberpunk-surface-dark border-b border-cyberpunk-border">
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity duration-200 p-2 -m-2 rounded"
            onClick={onClose}
            title="Close Terminal"
          >
            <div className="w-3 h-3 rounded-full neon-glow" style={{ background: 'var(--cyberpunk-neon-magenta)' }}></div>
            <div className="w-3 h-3 rounded-full" style={{ background: 'var(--cyberpunk-electric-blue)' }}></div>
            <div className="w-3 h-3 rounded-full" style={{ background: 'var(--cyberpunk-acid-green)' }}></div>
          </div>
          <GlitchText className="text-sm font-mono cyberpunk-heading">
            TERMINAL.EXE — BASH — 110×50
          </GlitchText>

        </div>
        
        {/* Terminal Content */}
        <div 
          className="terminal-text p-6 rounded-b-lg h-[32rem] overflow-y-auto interactive"
          style={{ 
            background: 'var(--cyberpunk-surface)',
            color: 'var(--cyberpunk-text)'
          }}
          onClick={focusInput}
        >
          <div ref={outputRef} className="space-y-2">
            {/* Cyberpunk Welcome Message */}
            <div className="mb-6">
              <div className="text-cyberpunk-acid-green text-glow">
                <TypewriterEffect text={`SYSTEM INITIALIZED ${new Date().toISOString()}`} speed={30} />
              </div>
              <div className="mt-4">
                <GlitchText className="text-3xl font-bold cyberpunk-heading">
                  MARKUS MAIWALD
                </GlitchText>
                <div className="text-lg text-cyberpunk-electric-blue text-glow mt-2">
                  MAIWALD ENTERPRISES BV
                </div>
                <div className="text-sm text-cyberpunk-text-dim mt-1 cyberpunk-subheading">
                  {content.subtitle[currentLanguage]}
                </div>
              </div>
            </div>
            
            {/* Initial Prompt */}
            <div className="flex items-center mb-2">
              <span className="terminal-prompt">markus@maiwald.work:~$</span>
              <span className="ml-2 text-cyberpunk-text">{content.prompt[currentLanguage]}</span>
            </div>
            
            {/* Command History */}
            {lines.map((line, index) => (
              <div key={index} className={`whitespace-pre-wrap ${
                line.type === 'command' 
                  ? 'terminal-prompt' 
                  : line.type === 'error' 
                  ? 'terminal-error' 
                  : 'terminal-output'
              }`}>
                {line.content}
              </div>
            ))}
          </div>
          
          {/* Command Input */}
          <div className="flex items-center mt-4 p-2 rounded bg-cyberpunk-surface-light border border-cyberpunk-border">
            <span className="terminal-prompt">markus@maiwald.work:~$</span>
            <input 
              ref={inputRef}
              type="text" 
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleTerminalKeyDown}
              className="ml-2 bg-transparent text-cyberpunk-electric-blue outline-none flex-1 terminal-text"
              style={{ color: 'var(--cyberpunk-electric-blue)' }}
              autoFocus
            />
            <span className="animate-terminal-blink text-cyberpunk-electric-blue text-glow">▊</span>
          </div>
        </div>
      </CyberpunkPanel>
    </div>
  );
});

Terminal.displayName = 'Terminal';
