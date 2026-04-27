import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CyberpunkPanel, GlitchText, TypewriterEffect } from './CyberpunkEffects';
import { Language } from '../hooks/useLanguage';
import { useAudio } from '../hooks/useAudio';

interface TerminalRitualProps {
  currentLanguage: Language;
  onComplete?: () => void;
}

interface CommandOutput {
  command: string;
  output: string[];
  completed: boolean;
}

export function TerminalRitual({ currentLanguage, onComplete }: TerminalRitualProps) {
  const [commands, setCommands] = useState<CommandOutput[]>([]);
  const [currentCommand, setCurrentCommand] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { createCracklingSound, isInitialized } = useAudio();
  const [audioTriggered, setAudioTriggered] = useState(false);

  // Trigger audio on first user interaction if not already playing
  const handleInteraction = () => {
    if (!audioTriggered) {
      console.log('User interaction detected, playing initialization sound...');
      setAudioTriggered(true);
      // Force audio initialization and play sound
      setTimeout(() => {
        if (createCracklingSound) {
          console.log('Creating crackling sound with duration:', 4000, 'config:', { volume: 0.4 });
          createCracklingSound(4000, { volume: 0.4 });
        } else {
          console.log('Audio not initialized yet, waiting for user interaction');
        }
      }, 500);
    }
  };

  const ritualSequence = [
    {
      command: 'whoami',
      output: [
        'markus@maiwald.work',
        'Systems Architect',
        'President, Sovereign Society SAE — Libertaria Foundation (sovereign-society.org)',
        'Leader, Chapter ZERO — Libertaria genesis polity',
        'Builder of sovereign infrastructure. Linux/BSD, crypto-anarchist, post-state systems.'
      ]
    },
    {
      command: 'cat manifesto.md',
      output: [
        'Loading manifesto...',
        '████████████████████████████████ 100%',
        'POSTURE: I do not sell time. I build and own.',
        'FILTER: Equity, vision, or both. Nothing else.',
        'STACK: Janus → Nexus OS → Graf → Libertaria'
      ]
    },
    {
      command: 'show --ecosystem --libertaria',
      output: [
        'Scanning Libertaria ecosystem...',
        '',
        '├── Janus (systems language)        [ACTIVE]',
        '│   └── :core profile 100% complete',
        '├── Nexus OS (sovereign hybrid OS)  [ACTIVE]',
        '│   └── 33 development phases done',
        '├── Graf (cryptographic VCS)        [ACTIVE]',
        '│   └── BLAKE3 + Merkle, 101 tests green',
        '├── Libertaria Protocol (L0-L3)     [R&D]',
        '│   └── Post-quantum, Kenya-Rule, exit-always',
        '├── SoulKey / SKH (PQ identity)     [R&D]',
        '├── Sovereign Society SAE           [HOSTING]',
        '│   └── Foundation · sovereign-society.org · AGI/ASI-era projects',
        '└── Chapter ZERO (genesis polity)   [LEADING]',
        '    └── Leader'
      ]
    },
    {
      command: 'cat core_philosophy.txt',
      output: [
        'THE CODE BEHIND THE CODE',
        '========================',
        '',
        'I do not rent my brain. I invest it.',
        'I do not sell time. I build and own.',
        'I filter on values first, alignment second, capability third.',
        '',
        'The filter is the feature.',
        'The positioning is the firewall.',
        '',
        'Bring equity. Bring vision. Bring both.'
      ]
    },
    {
      command: 'initialize --portfolio-mode',
      output: [
        'Mounting desktop shell...',
        'Loading cyberpunk interface...',
        'Establishing neural links...',
        '████████████████████████████████ 100%',
        '',
        'SYSTEM READY',
        'Welcome to the forge.'
      ]
    }
  ];

  useEffect(() => {
    console.log('Audio context initialized');
    console.log('Audio not initialized yet, waiting for user interaction');
    console.log('Attempting to play initialization sound...');
    console.log('Creating crackling sound with duration:', 4000, 'config:', { volume: 0.4 });
    console.log('Retrying audio initialization...');
    
    // Play crackling connection sound when starting
    if (currentCommand === 0) {
      // Always try to trigger audio, even if not initialized yet
      if (isInitialized && !audioTriggered) {
        createCracklingSound(4000, { volume: 0.4 });
        setAudioTriggered(true);
      } else if (!audioTriggered) {
        // Set up to trigger when user interacts
        setAudioTriggered(false);
      }
    }

    if (currentCommand < ritualSequence.length) {
      const timer = setTimeout(() => {
        const newCommand = {
          command: ritualSequence[currentCommand].command,
          output: ritualSequence[currentCommand].output,
          completed: true
        };
        
        setCommands(prev => [...prev, newCommand]);
        setCurrentCommand(prev => prev + 1);
      }, currentCommand === 0 ? 1000 : 2000);

      return () => clearTimeout(timer);
    } else if (currentCommand === ritualSequence.length && !isComplete) {
      const timer = setTimeout(() => {
        setIsComplete(true);
        if (onComplete) {
          setTimeout(onComplete, 1500);
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentCommand, isComplete, onComplete, isInitialized, createCracklingSound]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95"
      onClick={handleInteraction}
    >
      <CyberpunkPanel className="w-full max-w-4xl mx-4 p-8 max-h-[80vh] overflow-y-auto">
        <div className="space-y-4">
          {/* Terminal Header */}
          <div className="border-b border-cyberpunk-border pb-4 mb-6">
            <GlitchText className="text-2xl font-bold cyberpunk-heading">
              SYSTEM INITIALIZATION
            </GlitchText>
            <div className="text-cyberpunk-text-dim text-sm mt-2">
              Establishing secure connection to maiwald.work
            </div>
            {!audioTriggered && (
              <div className="text-cyberpunk-acid-green text-xs mt-2 animate-pulse">
                Click anywhere to enable audio experience
              </div>
            )}
            {audioTriggered && (
              <div className="text-cyberpunk-electric-blue text-xs mt-2">
                🔊 Audio active
              </div>
            )}
          </div>

          {/* Command Output */}
          <div className="font-mono text-sm space-y-3">
            <AnimatePresence>
              {commands.map((cmd, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-2"
                >
                  {/* Command Line */}
                  <div className="flex items-center space-x-2">
                    <span className="text-cyberpunk-electric-blue">markus@maiwald.work:~$</span>
                    <TypewriterEffect 
                      text={cmd.command}
                      speed={50}
                      className="text-cyberpunk-text"
                    />
                  </div>
                  
                  {/* Command Output */}
                  {cmd.completed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                      className="ml-4 space-y-1"
                    >
                      {cmd.output.map((line, lineIndex) => (
                        <motion.div
                          key={lineIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: lineIndex * 0.1 }}
                          className={`${
                            line.includes('████') ? 'text-cyberpunk-acid-green' :
                            line.includes('STATUS') || line.includes('ACTIVE') || line.includes('PRODUCTION') ? 'text-cyberpunk-neon-magenta' :
                            line.includes('├──') || line.includes('│') || line.includes('└──') ? 'text-cyberpunk-electric-blue' :
                            line.includes('THE CODE') || line.includes('===') ? 'text-cyberpunk-neon-cyan text-glow' :
                            'text-cyberpunk-text'
                          }`}
                        >
                          {line}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Current Command Input */}
            {currentCommand < ritualSequence.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center space-x-2"
              >
                <span className="text-cyberpunk-electric-blue">markus@maiwald.work:~$</span>
                <span className="text-cyberpunk-text">
                  {currentCommand < ritualSequence.length ? ritualSequence[currentCommand].command : ''}
                </span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="text-cyberpunk-electric-blue"
                >
                  ▊
                </motion.span>
              </motion.div>
            )}
          </div>

          {/* Completion Message */}
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center pt-8 border-t border-cyberpunk-border"
            >
              <GlitchText className="text-xl text-cyberpunk-acid-green text-glow">
                NEURAL LINK ESTABLISHED
              </GlitchText>
              <div className="text-cyberpunk-text-dim mt-2">
                Entering interactive mode...
              </div>
            </motion.div>
          )}
        </div>
      </CyberpunkPanel>
    </motion.div>
  );
}