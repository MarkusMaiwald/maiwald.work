import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Minus } from 'lucide-react';
import { CyberpunkPanel, GlitchText, CyberpunkAudio } from './CyberpunkEffects';

interface CalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Calculator({ isOpen, onClose }: CalculatorProps) {
  if (!isOpen) return null;
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperator);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  const percentage = () => {
    const value = parseFloat(display) / 100;
    setDisplay(String(value));
  };

  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(-value));
  };

  const Button = ({ onClick, className = '', children, isOperator = false }: {
    onClick: () => void;
    className?: string;
    children: React.ReactNode;
    isOperator?: boolean;
  }) => (
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)' }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => CyberpunkAudio.playHoverClick()}
      onClick={() => {
        CyberpunkAudio.playButtonClick();
        onClick();
      }}
      className={`
        h-12 rounded-lg font-mono text-sm font-bold transition-all duration-200
        ${isOperator 
          ? 'bg-gradient-to-br from-cyberpunk-electric-blue to-cyberpunk-neon-magenta text-cyberpunk-bg hover:from-cyberpunk-neon-magenta hover:to-cyberpunk-electric-blue' 
          : 'cyberpunk-button text-cyberpunk-text hover:text-cyberpunk-electric-blue'
        }
        ${className}
      `}
    >
      {children}
    </motion.button>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full max-w-sm"
        style={{ cursor: 'default' }}
      >
      <CyberpunkPanel className="w-80 shadow-2xl">
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-cyberpunk-surface-dark via-cyberpunk-surface to-cyberpunk-surface-dark border-b border-cyberpunk-border">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-cyberpunk-electric-blue animate-pulse"></div>
            <GlitchText className="text-cyberpunk-electric-blue font-mono text-sm font-bold">
              CALC.EXE
            </GlitchText>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onMouseEnter={() => CyberpunkAudio.playHoverClick()}
              onClick={() => {
                CyberpunkAudio.playButtonClick();
                console.log('minimize');
              }}
              className="w-6 h-6 rounded bg-cyberpunk-surface-dark hover:bg-yellow-500 transition-colors flex items-center justify-center"
            >
              <Minus size={12} className="text-cyberpunk-text" />
            </button>
            <button
              onMouseEnter={() => CyberpunkAudio.playHoverClick()}
              onClick={() => {
                CyberpunkAudio.playButtonClick();
                onClose();
              }}
              className="w-6 h-6 rounded bg-cyberpunk-surface-dark hover:bg-red-500 transition-colors flex items-center justify-center"
            >
              <X size={12} className="text-cyberpunk-text" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Display */}
          <div className="cyberpunk-button p-4 text-right">
            <div className="text-2xl font-mono text-cyberpunk-electric-blue font-bold overflow-hidden">
              {display}
            </div>
          </div>

          {/* Button Grid */}
          <div className="grid grid-cols-4 gap-2">
            {/* Row 1 */}
            <Button onClick={clear} className="col-span-2">AC</Button>
            <Button onClick={clearEntry}>CE</Button>
            <Button onClick={() => inputOperator('÷')} isOperator>÷</Button>

            {/* Row 2 */}
            <Button onClick={() => inputNumber('7')}>7</Button>
            <Button onClick={() => inputNumber('8')}>8</Button>
            <Button onClick={() => inputNumber('9')}>9</Button>
            <Button onClick={() => inputOperator('×')} isOperator>×</Button>

            {/* Row 3 */}
            <Button onClick={() => inputNumber('4')}>4</Button>
            <Button onClick={() => inputNumber('5')}>5</Button>
            <Button onClick={() => inputNumber('6')}>6</Button>
            <Button onClick={() => inputOperator('-')} isOperator>−</Button>

            {/* Row 4 */}
            <Button onClick={() => inputNumber('1')}>1</Button>
            <Button onClick={() => inputNumber('2')}>2</Button>
            <Button onClick={() => inputNumber('3')}>3</Button>
            <Button onClick={() => inputOperator('+')} isOperator>+</Button>

            {/* Row 5 */}
            <Button onClick={toggleSign}>±</Button>
            <Button onClick={() => inputNumber('0')}>0</Button>
            <Button onClick={() => inputNumber('.')}>.</Button>
            <Button onClick={performCalculation} isOperator>=</Button>
          </div>
        </div>

        {/* Cyberpunk Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyberpunk-electric-blue to-transparent opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyberpunk-neon-magenta to-transparent opacity-50"></div>
        </div>
      </CyberpunkPanel>
      </motion.div>
    </div>
  );
}