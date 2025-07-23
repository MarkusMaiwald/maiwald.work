import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CyberpunkPanel, GlitchText, TypewriterEffect } from './CyberpunkEffects';
import { Language } from '../hooks/useLanguage';

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

  const ritualSequence = [
    {
      command: 'whoami',
      output: [
        'markus@maiwald.work',
        'Strategic Technology Architect',
        'Founder, Maiwald Enterprises BV',
        'Linux/BSD aficionado, platform architect, product developer, crypto-anarchist'
      ]
    },
    {
      command: 'deploy --vision manifest.md',
      output: [
        'Loading corporate manifesto...',
        '████████████████████████████████ 100%',
        'VISION: Building the infrastructure your business runs on',
        'STATUS: ACTIVE',
        'MISSION: Transform digital landscapes through strategic technology'
      ]
    },
    {
      command: 'show --projects --year 2025',
      output: [
        'Scanning project portfolio...',
        '',
        '├── Custom OS Development (Nim/Assembly)',
        '│   └── Status: Core kernel implementation [ACTIVE]',
        '├── TTRPG Platform (React/Blockchain)',
        '│   └── Status: SSI/DID integration [R&D]',
        '├── Maiwald Enterprises BV',
        '│   └── Status: Strategic consulting [PRODUCTION]',
        '└── Infrastructure Services',
        '    └── Status: Cloud-native solutions [SCALING]'
      ]
    },
    {
      command: 'cat core_philosophy.txt',
      output: [
        'THE CODE BEHIND THE CODE',
        '========================',
        '',
        'Every system we build serves a greater architecture.',
        'Every line of code contributes to digital sovereignty.',
        'Every client engagement advances technological evolution.',
        '',
        'We don\'t just deliver software—we architect the future.',
        'We don\'t just solve problems—we eliminate entire problem classes.',
        '',
        'This is the Maiwald way.'
      ]
    },
    {
      command: 'initialize --portfolio-mode',
      output: [
        'Initializing interactive portfolio...',
        'Loading cyberpunk interface...',
        'Establishing neural links...',
        '████████████████████████████████ 100%',
        '',
        'SYSTEM READY',
        'Welcome to the machine.'
      ]
    }
  ];

  useEffect(() => {
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
  }, [currentCommand, isComplete, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95"
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