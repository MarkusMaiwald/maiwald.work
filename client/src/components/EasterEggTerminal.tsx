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

  // Listen for ~ key to toggle terminal and custom event
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

    const handleOpenEasterEgg = () => {
      setIsVisible(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('openEasterEgg', handleOpenEasterEgg);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('openEasterEgg', handleOpenEasterEgg);
    };
  }, [isVisible]);

  const commands = {
    whoami: [
      'markus@maiwald.work',
      'Systems Architect',
      'President, Sovereign Society SAE — Libertaria Foundation',
      '  → sovereign-society.org · AGI/ASI-era project portfolio',
      'Leader, Chapter ZERO — Libertaria genesis polity',
      'Base: Lemiers, NL (Aachen–Maastricht triangle)',
      'Specialization: sovereign infrastructure, protocols, languages',
      'Clearance Level: ARCHITECT',
      '',
      'Posture: I don\'t sell time. I build and own.',
      'Filter: Equity, vision, or both. Nothing else.'
    ],
    vision: [
      'LOADING VISION MANIFEST...',
      '████████████████████████████████ 100%',
      '',
      'CORE VISION:',
      '"Store meaning, not artifacts."',
      '"Build the stack post-state communities will run on."',
      '"Protocol is physics. Chapter is politics."',
      '',
      'MISSION STATEMENT:',
      'Architect and build a coherent sovereign stack from',
      'kernel to protocol. Then run the first polity on it.',
      '',
      'STATUS: ACTIVE | PRIORITY: MAXIMUM'
    ],
    'run ./manifest.yaml': [
      'Executing manifest.yaml...',
      '',
      'apiVersion: libertaria.protocol/v1',
      'kind: ArchitecturalManifesto',
      'metadata:',
      '  name: sovereign-stack',
      '  namespace: libertaria',
      'spec:',
      '  principles:',
      '    - kenya_rule: enforced',
      '    - exit_always: enforced',
      '    - capsule_doctrine: default_deny',
      '    - protocol_vs_chapter: strict',
      '  layers:',
      '    - janus (language)',
      '    - nexus_os (kernel)',
      '    - graf (vcs)',
      '    - soulkey (pq_identity)',
      '    - libertaria_protocol (coordination)',
      '    - chapter_zero (polity)',
      '  status: BUILDING',
      '',
      'Manifest applied successfully.'
    ],
    'reveal --projects': [
      'Scanning Libertaria ecosystem...',
      '████████████████████████████████ 100%',
      '',
      'BODY OF WORK REVEALED:',
      '',
      '┌── LANGUAGES ──────────────────────┐',
      '│ • Janus (systems language)        │',
      '│   :core 100% | tests 477/478      │',
      '└───────────────────────────────────┘',
      '',
      '┌── SYSTEMS ────────────────────────┐',
      '│ • Nexus OS (unikernel+hypervisor) │',
      '│   33 phases | 65+ specs           │',
      '│ • Graf (cryptographic VCS)        │',
      '│   BLAKE3 + Merkle | 101 tests     │',
      '└───────────────────────────────────┘',
      '',
      '┌── PROTOCOL / IDENTITY ────────────┐',
      '│ • Libertaria Protocol (L0–L3)     │',
      '│ • SoulKey / SKH (PQ identity)     │',
      '│ • Internet of People (IoP)        │',
      '└───────────────────────────────────┘',
      '',
      '┌── FOUNDATION ─────────────────────┐',
      '│ • Sovereign Society SAE           │',
      '│   sovereign-society.org           │',
      '│   AGI/ASI-era project portfolio   │',
      '└───────────────────────────────────┘',
      '',
      '┌── POLITY ─────────────────────────┐',
      '│ • Chapter ZERO (genesis)          │',
      '│   Leader                          │',
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
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          style={{ cursor: 'default' }}
          onClick={(e) => {
            // Close on backdrop click, but not on modal content
            if (e.target === e.currentTarget) {
              setIsVisible(false);
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
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
        </div>
      )}
    </AnimatePresence>
  );
}