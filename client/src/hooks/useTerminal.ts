import { useState, useCallback, useRef } from 'react';
import { content } from '../data/content';
import { Language } from './useLanguage';

export interface TerminalLine {
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp: number;
}

export function useTerminal(currentLanguage: Language, onOpenContact: () => void) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentInput, setCurrentInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const addLine = useCallback((type: TerminalLine['type'], content: string) => {
    setLines(prev => [...prev, { type, content, timestamp: Date.now() }]);
  }, []);

  const processCommand = useCallback((command: string) => {
    const trimmedCommand = command.trim();
    if (!trimmedCommand) return;

    // Add to history
    setHistory(prev => [...prev, trimmedCommand]);
    setHistoryIndex(-1);

    // Add command to output
    addLine('command', `markus@maiwald.work:~$ ${trimmedCommand}`);

    // Process command
    const parts = trimmedCommand.toLowerCase().split(' ');
    const cmd = parts[0];
    const arg = parts[1];

    let response = '';

    switch (cmd) {
      case 'help':
        response = content.help[currentLanguage];
        break;
      case 'clear':
        setLines([]);
        return;
      case 'ls':
        response = content.ls[currentLanguage];
        break;
      case 'whoami':
        response = content.whoami[currentLanguage];
        break;
      case 'cat':
        if (arg && content[arg]) {
          response = content[arg][currentLanguage];
        } else if (arg) {
          response = `cat: ${arg}: No such file or directory`;
        } else {
          response = `${content.usage[currentLanguage]}: cat [section]`;
        }
        break;
      case 'projects':
        response = content.projects[currentLanguage];
        break;
      case 'blockchain':
        response = content.blockchain[currentLanguage];
        break;
      case 'cloud':
        response = content.cloud[currentLanguage];
        break;
      case 'services':
        response = content.services[currentLanguage];
        break;
      case 'development':
        response = content.development[currentLanguage];
        break;
      case 'about':
        response = content.about[currentLanguage];
        break;
      case 'contact':
        onOpenContact();
        response = content.contactOpening[currentLanguage];
        break;
      case 'lang':
        if (arg === 'en' || arg === 'de') {
          // This will be handled by the parent component
          response = content.languageChanged[currentLanguage];
        } else {
          response = `${content.usage[currentLanguage]}: lang [en|de]`;
        }
        break;
      default:
        response = `bash: ${cmd}: ${content.commandNotFound[currentLanguage]}`;
        break;
    }

    if (response) {
      addLine('output', response);
    }
  }, [currentLanguage, addLine, onOpenContact]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = currentInput;
      setCurrentInput('');
      
      // Check for lang command to handle language change
      const parts = command.trim().toLowerCase().split(' ');
      if (parts[0] === 'lang' && (parts[1] === 'en' || parts[1] === 'de')) {
        return { command, changeLanguage: parts[1].toUpperCase() as Language };
      }
      
      processCommand(command);
      return { command };
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(history[newIndex]);
        }
      }
    }
  }, [currentInput, history, historyIndex, processCommand]);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return {
    lines,
    currentInput,
    setCurrentInput,
    handleKeyDown,
    focusInput,
    inputRef,
    processCommand
  };
}
