import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CyberpunkPanel, TypewriterEffect } from './CyberpunkEffects';
import { Language } from '../hooks/useLanguage';

interface EasterEggTerminalProps {
  currentLanguage: Language;
  onProjectsReveal?: () => void;
}

interface CommandHistory {
  command: string;
  output: string[];
  timestamp: string;
}

export function EasterEggTerminal({ currentLanguage, onProjectsReveal }: EasterEggTerminalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Listen for ~ key to toggle terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '~' && !isVisible) {
        e.preventDefault();
        setIsVisible(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      } else if (e.key === 'Escape' && isVisible) {
        setIsVisible(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  const commands = {
    whoami: [
      'markus@maiwald.work',
      'Strategic Technology Architect',
      'Founder, Maiwald Enterprises BV',
      'Location: Netherlands',
      'Specialization: Infrastructure Architecture',
      'Clearance Level: ARCHITECT',
      '',
      'Personal motto: I build stuff',
      'Company motto: We build the infrastructure your business runs on'
    ],
    vision: [
      'LOADING VISION MANIFEST...',
      '████████████████████████████████ 100%',
      '',
      'CORE VISION:',
      '"Every system we architect serves a greater purpose."',
      '"Every line of code contributes to digital sovereignty."',
      '"Every client engagement advances technological evolution."',
      '',
      'MISSION STATEMENT:',
      'To build the robust, scalable infrastructure that powers',
      'the digital economy of tomorrow. We don\'t just solve',
      'problems—we eliminate entire problem classes.',
      '',
      'STATUS: ACTIVE | PRIORITY: MAXIMUM'
    ],
    'run ./manifest.yaml': [
      'Executing manifest.yaml...',
      '',
      'apiVersion: maiwald.enterprises/v1',
      'kind: StrategicManifesto',
      'metadata:',
      '  name: maiwald-enterprise-philosophy',
      '  namespace: strategic-architecture',
      'spec:',
      '  principles:',
      '    - brutalist_minimalism: true',
      '    - terminal_swagger: enabled',
      '    - cold_elegance: maximum',
      '  services:',
      '    - blockchain_integration',
      '    - cloud_native_architecture', 
      '    - security_frameworks',
      '    - custom_os_development',
      '  status: DEPLOYED',
      '  replicas: ∞',
      '',
      'Manifest applied successfully.'
    ],
    'reveal --projects': [
      'Scanning project repositories...',
      'Decrypting portfolio data...',
      '████████████████████████████████ 100%',
      '',
      'PROJECT PORTFOLIO REVEALED:',
      '',
      '┌── SYSTEMS LEVEL ──────────────────┐',
      '│ • Custom OS Development (Nim)     │',
      '│   Status: ACTIVE | Impact: HIGH   │',
      '└───────────────────────────────────┘',
      '',
      '┌── BLOCKCHAIN RESEARCH ────────────┐',
      '│ • TTRPG Platform (SSI/DID)        │',
      '│   Status: R&D | Innovation: MAX   │',
      '└───────────────────────────────────┘',
      '',
      '┌── ENTERPRISE SOLUTIONS ───────────┐',
      '│ • Maiwald Enterprises BV          │',
      '│   Status: PRODUCTION | Scale: ∞   │',
      '└───────────────────────────────────┘',
      '',
      'Switching to visual mode...',
      'NEURAL LINK ESTABLISHED'
    ]
  };

  const handleCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    setIsProcessing(true);
    const timestamp = new Date().toLocaleTimeString();
    
    let output: string[] = [];
    
    if (commands[trimmedCmd as keyof typeof commands]) {
      output = commands[trimmedCmd as keyof typeof commands];
      
      // Special action for reveal --projects
      if (trimmedCmd === 'reveal --projects') {
        setTimeout(() => {
          if (onProjectsReveal) {
            onProjectsReveal();
          }
          setIsVisible(false);
        }, 3000);
      }
    } else if (trimmedCmd === 'help') {
      output = [
        'Available commands:',
        '',
        'whoami              - Display user information',
        'vision              - Show strategic vision',
        'run ./manifest.yaml - Execute enterprise manifest',  
        'reveal --projects   - Reveal project portfolio',
        'clear               - Clear terminal history',
        'exit                - Close terminal',
        '',
        'Tip: Press ~ key to open terminal from anywhere'
      ];
    } else if (trimmedCmd === 'clear') {
      setHistory([]);
      setInput('');
      setIsProcessing(false);
      return;
    } else if (trimmedCmd === 'exit') {
      setIsVisible(false);
      setIsProcessing(false);
      return;
    } else {
      output = [
        `Command not found: ${trimmedCmd}`,
        'Type "help" for available commands'
      ];
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    setHistory(prev => [...prev, {
      command: trimmedCmd,
      output,
      timestamp
    }]);
    
    setInput('');
    setIsProcessing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          className="fixed bottom-8 right-8 z-50 w-96 max-h-96"
        >
          <CyberpunkPanel className="interactive">
            <div className="p-4">
              {/* Terminal Header */}
              <div className="flex justify-between items-center border-b border-cyberpunk-border pb-2 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-cyberpunk-electric-blue rounded-full animate-pulse"></div>
                  <span className="text-sm font-mono text-cyberpunk-electric-blue">
                    EASTER_EGG_TERMINAL v2.1.0
                  </span>
                </div>
                <button
                  onClick={() => setIsVisible(false)}
                  className="text-cyberpunk-text-dim hover:text-cyberpunk-text transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Terminal Content */}
              <div className="space-y-2 max-h-64 overflow-y-auto font-mono text-sm">
                {/* Command History */}
                {history.map((entry, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-cyberpunk-electric-blue">$</span>
                      <span className="text-cyberpunk-text">{entry.command}</span>
                      <span className="text-cyberpunk-text-dim text-xs ml-auto">
                        {entry.timestamp}
                      </span>
                    </div>
                    <div className="ml-4 space-y-1">
                      {entry.output.map((line, lineIndex) => (
                        <motion.div
                          key={lineIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: lineIndex * 0.03 }}
                          className={`${
                            line.includes('████') ? 'text-cyberpunk-acid-green' :
                            line.includes('STATUS') || line.includes('ACTIVE') ? 'text-cyberpunk-neon-magenta' :
                            line.includes('┌──') || line.includes('│') || line.includes('└──') ? 'text-cyberpunk-electric-blue' :
                            line.includes('NEURAL LINK') ? 'text-cyberpunk-acid-green text-glow' :
                            'text-cyberpunk-text'
                          }`}
                        >
                          {line}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Current Input */}
                <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                  <span className="text-cyberpunk-electric-blue">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent text-cyberpunk-text outline-none"
                    placeholder="Enter command..."
                    disabled={isProcessing}
                  />
                  {isProcessing && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="text-cyberpunk-electric-blue"
                    >
                      ▊
                    </motion.span>
                  )}
                </form>
              </div>

              {/* Hint */}
              <div className="text-xs text-cyberpunk-text-dim mt-3 pt-2 border-t border-cyberpunk-border">
                Tip: Type "help" for commands | Press ESC to close
              </div>
            </div>
          </CyberpunkPanel>
        </motion.div>
      )}

      {/* Toggle Button (always visible in bottom corner) */}
      {!isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setIsVisible(true);
            setTimeout(() => inputRef.current?.focus(), 100);
          }}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 cyberpunk-button rounded-full flex items-center justify-center text-cyberpunk-electric-blue hover:text-cyberpunk-bg transition-all duration-300"
          title="Open Easter Egg Terminal (or press ~)"
        >
          <span className="text-xl font-mono">~</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}