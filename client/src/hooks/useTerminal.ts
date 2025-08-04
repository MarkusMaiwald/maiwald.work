import { useState, useCallback, useRef } from 'react';
import { content } from '../data/content';
import { Language } from './useLanguage';
import { useFileSystem } from './useFileSystem';
import { apiRequest } from '../lib/queryClient';

export interface TerminalLine {
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp: number;
}

export function useTerminal(currentLanguage: Language, onOpenContact: () => void, onOpenChatbot?: () => void) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentInput, setCurrentInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  const fileSystem = useFileSystem(currentLanguage);

  const addLine = useCallback((type: TerminalLine['type'], content: string) => {
    setLines(prev => [...prev, { type, content, timestamp: Date.now() }]);
  }, []);

  const executeRealCommand = useCallback(async (command: string) => {
    try {
      const response = await fetch('/api/terminal/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command })
      });

      const data = await response.json();

      if (data.success) {
        if (data.output) {
          addLine('output', data.output);
        }
        if (data.error) {
          addLine('error', data.error);
        }
        return true;
      } else {
        addLine('error', data.message || 'Command execution failed');
        return false;
      }
    } catch (error: any) {
      addLine('error', `Network error: ${error.message || 'Unknown error'}`);
      return false;
    }
  }, [addLine]);

  const processCommand = useCallback(async (command: string) => {
    const trimmedCommand = command.trim();
    if (!trimmedCommand) return;

    // Add to history
    setHistory(prev => [...prev, trimmedCommand]);
    setHistoryIndex(-1);

    // Add command to output with current prompt
    addLine('command', `${fileSystem.getPrompt()} ${trimmedCommand}`);

    // Process command
    const parts = trimmedCommand.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Real Linux commands - execute via backend (except for our file system commands)
    const realCommands = [
      'ping', 'host', 'dig', 'nslookup', 'curl', 'wget',
      'whoami', 'uname', 'uptime', 'date',
      'echo', 'head', 'tail', 'grep', 'find',
      'ps', 'top', 'df', 'free', 'netstat', 'ss',
      'traceroute', 'whois', 'finger', 'telnet'
    ];

    // Special handling for ls and pwd - use real commands instead of simulated
    if (cmd === 'ls') {
      await executeRealCommand(trimmedCommand);
      return;
    }

    if (cmd === 'pwd') {
      await executeRealCommand(trimmedCommand);
      return;
    }

    if (realCommands.includes(cmd)) {
      await executeRealCommand(trimmedCommand);
      return;
    }

    let response = '';

    switch (cmd) {
      case 'help':
        response = content.help[currentLanguage];
        break;

      case 'list':
        response = content.list[currentLanguage];
        break;
      case 'clear':
        setLines([]);
        return;
      case 'ls':
        if (args.length > 0) {
          const items = fileSystem.listDirectory(args[0]);
          if (items.length === 0) {
            response = `ls: cannot access '${args[0]}': No such file or directory`;
          } else {
            response = items.map(item => {
              const prefix = item.type === 'directory' ? 'd' : '-';
              const perms = item.permissions?.substring(1) || 'rw-r--r--';
              const size = item.size?.toString().padStart(8) || '     4096';
              const date = item.modified || '2025-01-23 10:00';
              const name = item.type === 'directory' ? `\x1b[34m${item.name}\x1b[0m` : item.name;
              return `${prefix}${perms} 1 markus markus ${size} ${date} ${name}`;
            }).join('\n');
          }
        } else {
          const items = fileSystem.listDirectory();
          response = items.map(item => {
            const prefix = item.type === 'directory' ? 'd' : '-';
            const perms = item.permissions?.substring(1) || 'rw-r--r--';
            const size = item.size?.toString().padStart(8) || '     4096';
            const date = item.modified || '2025-01-23 10:00';
            const name = item.type === 'directory' ? `\x1b[34m${item.name}\x1b[0m` : item.name;
            return `${prefix}${perms} 1 markus markus ${size} ${date} ${name}`;
          }).join('\n');
        }
        break;
      case 'll':
        const items = fileSystem.listDirectory();
        response = 'total ' + items.length + '\n' + items.map(item => {
          const perms = item.permissions || (item.type === 'directory' ? 'drwxr-xr-x' : '-rw-r--r--');
          const size = item.size?.toString().padStart(8) || '     4096';
          const date = item.modified || '2025-01-23 10:00';
          const name = item.type === 'directory' ? `\x1b[34m${item.name}\x1b[0m` : item.name;
          return `${perms} 1 markus markus ${size} ${date} ${name}`;
        }).join('\n');
        break;
      case 'cd':
        if (args.length === 0) {
          fileSystem.changeDirectory('/home/markus');
        } else {
          const success = fileSystem.changeDirectory(args[0]);
          if (!success) {
            response = `cd: ${args[0]}: No such file or directory`;
          }
        }
        break;
      case 'pwd':
        response = fileSystem.getCurrentPathString();
        break;
      case 'whoami':
        response = content.whoami[currentLanguage];
        break;
      case 'cat':
        if (args.length === 0) {
          response = 'cat: missing file operand';
        } else {
          const fileContent = fileSystem.readFile(args[0]);
          if (fileContent !== null) {
            response = fileContent;
          } else if (content[args[0]]) {
            response = content[args[0]][currentLanguage];
          } else {
            response = `cat: ${args[0]}: No such file or directory`;
          }
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
      case 'hardskills':
        response = content.hardskills[currentLanguage];
        break;
      case 'softskills':
        response = content.softskills[currentLanguage];
        break;
      case 'contact':
        onOpenContact();
        response = content.contactOpening[currentLanguage];
        break;
      case 'chat':
        if (onOpenChatbot) {
          onOpenChatbot();
          response = currentLanguage === 'EN' 
            ? 'Opening AI Chat interface...\nConnecting to Markus Maiwald\'s Digital Attaché...' 
            : 'Öffne KI-Chat Interface...\nVerbinde mit Markus Maiwalds Digitalem Attaché...';
        } else {
          response = currentLanguage === 'EN'
            ? 'AI Chat interface not available in this context.'
            : 'KI-Chat Interface in diesem Kontext nicht verfügbar.';
        }
        break;
      case 'lang':
        if (args[0] === 'en' || args[0] === 'de') {
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
  }, [currentLanguage, addLine, onOpenContact, onOpenChatbot]);

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
