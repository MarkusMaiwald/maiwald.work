import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { useTerminal } from '../hooks/useTerminal';
import { Language } from '../hooks/useLanguage';
import { content } from '../data/content';

interface TerminalProps {
  currentLanguage: Language;
  onOpenContact: () => void;
  onLanguageChange: (lang: Language) => void;
}

export interface TerminalRef {
  executeCommand: (command: string) => void;
}

export const Terminal = forwardRef<TerminalRef, TerminalProps>(({ currentLanguage, onOpenContact, onLanguageChange }, ref) => {
  const { 
    lines, 
    currentInput, 
    setCurrentInput, 
    handleKeyDown, 
    focusInput, 
    inputRef,
    processCommand 
  } = useTerminal(currentLanguage, onOpenContact);
  
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
    const result = handleKeyDown(e);
    if (result?.changeLanguage) {
      onLanguageChange(result.changeLanguage);
    }
  };

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-4xl mx-auto px-4 z-30">
      <div className="terminal-window bg-[var(--window-chrome)] rounded-lg shadow-2xl animate-fade-in">
        {/* Window Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-b from-gray-200 to-gray-300 rounded-t-lg">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[var(--mac-red)] rounded-full"></div>
            <div className="w-3 h-3 bg-[var(--mac-yellow)] rounded-full"></div>
            <div className="w-3 h-3 bg-[var(--mac-green)] rounded-full"></div>
          </div>
          <div className="text-sm font-medium text-gray-700">Terminal — bash — 80×24</div>
          <div className="w-16"></div>
        </div>
        
        {/* Terminal Content */}
        <div 
          className="bg-[var(--terminal-bg)] text-[var(--terminal-green)] font-mono text-sm p-4 rounded-b-lg h-96 overflow-y-auto cursor-text"
          onClick={focusInput}
        >
          <div ref={outputRef} className="space-y-1">
            {/* Welcome Message */}
            <div className="text-white mb-4">
              <div className="text-[var(--terminal-green)]">
                Last login: {new Date().toLocaleString()} on ttys000
              </div>
              <div className="mt-2 text-blue-400">
                <div className="text-2xl font-bold">Markus Maiwald</div>
                <div className="text-lg">{content.welcome[currentLanguage]}</div>
                <div className="text-sm mt-1">{content.subtitle[currentLanguage]}</div>
              </div>
            </div>
            
            {/* Initial Prompt */}
            <div className="flex items-center">
              <span className="text-blue-400">markus@maiwald.work:~$</span>
              <span className="ml-2 text-white">{content.prompt[currentLanguage]}</span>
            </div>
            
            {/* Command History */}
            {lines.map((line, index) => (
              <div key={index} className={`whitespace-pre-wrap ${
                line.type === 'command' 
                  ? 'text-blue-400' 
                  : line.type === 'error' 
                  ? 'text-red-400' 
                  : 'text-white'
              }`}>
                {line.content}
              </div>
            ))}
          </div>
          
          {/* Command Input */}
          <div className="flex items-center mt-2">
            <span className="text-blue-400 terminal-text">markus@maiwald.work:~$</span>
            <input 
              ref={inputRef}
              type="text" 
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleTerminalKeyDown}
              className="ml-2 bg-transparent text-[var(--terminal-green)] outline-none flex-1 font-mono"
              autoFocus
            />
            <span className="animate-terminal-blink text-[var(--terminal-green)]">█</span>
          </div>
        </div>
      </div>
    </div>
  );
});

Terminal.displayName = 'Terminal';
