import { spawn, exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Allowed commands for security
const ALLOWED_COMMANDS = [
  'ping', 'host', 'dig', 'nslookup', 'curl', 'wget',
  'ls', 'pwd', 'whoami', 'uname', 'uptime', 'date',
  'echo', 'cat', 'head', 'tail', 'grep', 'find',
  'ps', 'top', 'df', 'free', 'netstat', 'ss',
  'traceroute', 'whois', 'finger', 'telnet'
];

// Restricted paths and patterns
const RESTRICTED_PATTERNS = [
  /rm\s+/i, /sudo/i, /su\s+/i, /passwd/i, /shadow/i,
  /\/etc\/passwd/i, /\/etc\/shadow/i, /chmod/i, /chown/i,
  /mount/i, /umount/i, /fdisk/i, /mkfs/i, /dd\s+/i
];

export interface TerminalCommand {
  command: string;
  args: string[];
  cwd?: string;
}

export interface TerminalResponse {
  output: string;
  error?: string;
  exitCode: number;
  duration: number;
}

export class CyberpunkTerminal {
  private static instance: CyberpunkTerminal;
  private currentDirectory: string = process.cwd();

  static getInstance(): CyberpunkTerminal {
    if (!CyberpunkTerminal.instance) {
      CyberpunkTerminal.instance = new CyberpunkTerminal();
    }
    return CyberpunkTerminal.instance;
  }

  private isCommandAllowed(command: string): boolean {
    const baseCommand = command.split(' ')[0].toLowerCase();
    
    // Check if base command is in allowed list
    if (!ALLOWED_COMMANDS.includes(baseCommand)) {
      return false;
    }

    // Check for restricted patterns
    for (const pattern of RESTRICTED_PATTERNS) {
      if (pattern.test(command)) {
        return false;
      }
    }

    return true;
  }

  private sanitizeCommand(input: string): string {
    // Remove dangerous characters and sequences
    return input
      .replace(/[;&|`$(){}[\]]/g, '') // Remove shell metacharacters
      .replace(/\.\./g, '') // Remove directory traversal
      .trim();
  }

  async executeCommand(input: string): Promise<TerminalResponse> {
    const startTime = Date.now();
    
    try {
      const sanitizedInput = this.sanitizeCommand(input);
      
      if (!this.isCommandAllowed(sanitizedInput)) {
        return {
          output: '',
          error: `Command '${input.split(' ')[0]}' is not allowed or is restricted for security reasons.`,
          exitCode: 1,
          duration: Date.now() - startTime
        };
      }

      // Handle built-in commands
      if (sanitizedInput.startsWith('cd ')) {
        return this.handleCdCommand(sanitizedInput);
      }

      if (sanitizedInput === 'pwd') {
        return {
          output: this.currentDirectory,
          exitCode: 0,
          duration: Date.now() - startTime
        };
      }

      // Execute external command with timeout
      const { stdout, stderr } = await execAsync(sanitizedInput, {
        cwd: this.currentDirectory,
        timeout: 30000, // 30 second timeout
        maxBuffer: 1024 * 1024 // 1MB buffer
      });

      return {
        output: stdout || '',
        error: stderr || undefined,
        exitCode: 0,
        duration: Date.now() - startTime
      };

    } catch (error: any) {
      return {
        output: '',
        error: error.message || 'Command execution failed',
        exitCode: error.code || 1,
        duration: Date.now() - startTime
      };
    }
  }

  private handleCdCommand(command: string): TerminalResponse {
    const startTime = Date.now();
    const path = command.substring(3).trim() || process.env.HOME || '/';
    
    try {
      process.chdir(path);
      this.currentDirectory = process.cwd();
      
      return {
        output: '',
        exitCode: 0,
        duration: Date.now() - startTime
      };
    } catch (error: any) {
      return {
        output: '',
        error: `cd: ${error.message}`,
        exitCode: 1,
        duration: Date.now() - startTime
      };
    }
  }

  getCurrentDirectory(): string {
    return this.currentDirectory;
  }

  // Get system information for cyberpunk terminal startup
  async getSystemInfo(): Promise<string> {
    try {
      const { stdout: hostname } = await execAsync('hostname');
      const { stdout: kernel } = await execAsync('uname -r');
      const { stdout: arch } = await execAsync('uname -m');
      
      return `
╔══════════════════════════════════════════════════════════════╗
║                    NEXUS TERMINAL v2.1.7                    ║
║                 Secure Command Execution Layer              ║
╠══════════════════════════════════════════════════════════════╣
║ HOST: ${hostname.trim().padEnd(50)} ║
║ KERNEL: ${kernel.trim().padEnd(47)} ║
║ ARCH: ${arch.trim().padEnd(49)} ║
║ STATUS: OPERATIONAL                                          ║
╚══════════════════════════════════════════════════════════════╝

Available commands: ${ALLOWED_COMMANDS.join(', ')}
Type 'help' for more information.
      `.trim();
    } catch {
      return `
╔══════════════════════════════════════════════════════════════╗
║                    NEXUS TERMINAL v2.1.7                    ║
║                 Secure Command Execution Layer              ║
╠══════════════════════════════════════════════════════════════╣
║ STATUS: OPERATIONAL                                          ║
╚══════════════════════════════════════════════════════════════╝

Available commands: ${ALLOWED_COMMANDS.join(', ')}
Type 'help' for more information.
      `.trim();
    }
  }
}