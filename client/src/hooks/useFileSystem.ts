import { useState, useCallback } from 'react';
import { Language } from './useLanguage';
import { content } from '../data/content';

export interface FileSystemNode {
  name: string;
  type: 'file' | 'directory';
  content?: string;
  children?: { [key: string]: FileSystemNode };
  permissions?: string;
  size?: number;
  modified?: string;
}

export interface FileSystem {
  [key: string]: FileSystemNode;
}

export function useFileSystem(currentLanguage: Language) {
  const createFileSystem = useCallback((): FileSystem => ({
    'home': {
      name: 'home',
      type: 'directory',
      permissions: 'drwxr-xr-x',
      modified: '2025-01-23 10:00',
      children: {
        'markus': {
          name: 'markus',
          type: 'directory',
          permissions: 'drwxr-xr-x',
          modified: '2025-01-23 10:00',
          children: {
            'about.txt': {
              name: 'about.txt',
              type: 'file',
              content: content.about[currentLanguage],
              permissions: '-rw-r--r--',
              size: content.about[currentLanguage].length,
              modified: '2025-01-23 09:30'
            },
            'projects': {
              name: 'projects',
              type: 'directory',
              permissions: 'drwxr-xr-x',
              modified: '2025-01-23 09:45',
              children: {
                'README.md': {
                  name: 'README.md',
                  type: 'file',
                  content: content.projects[currentLanguage],
                  permissions: '-rw-r--r--',
                  size: content.projects[currentLanguage].length,
                  modified: '2025-01-23 09:45'
                },
                'nexus-os': {
                  name: 'nexus-os',
                  type: 'directory',
                  permissions: 'drwxr-xr-x',
                  modified: '2025-01-22 15:30',
                  children: {
                    'manifest.txt': {
                      name: 'manifest.txt',
                      type: 'file',
                      content: 'NexusOS - Rebellion Encoded\n\nZero GNUs given.\nMilitary-grade security.\nFast boot. No bloat.\n\nRepository: git.maiwald.work/NexusLabs/livecd-arch-nexus',
                      permissions: '-rw-r--r--',
                      size: 120,
                      modified: '2025-01-22 15:30'
                    }
                  }
                }
              }
            },
            'services': {
              name: 'services',
              type: 'directory',
              permissions: 'drwxr-xr-x',
              modified: '2025-01-23 08:00',
              children: {
                'blockchain.md': {
                  name: 'blockchain.md',
                  type: 'file',
                  content: content.blockchain[currentLanguage],
                  permissions: '-rw-r--r--',
                  size: content.blockchain[currentLanguage].length,
                  modified: '2025-01-23 08:00'
                },
                'cloud.md': {
                  name: 'cloud.md',
                  type: 'file',
                  content: content.cloud[currentLanguage],
                  permissions: '-rw-r--r--',
                  size: content.cloud[currentLanguage].length,
                  modified: '2025-01-23 08:15'
                },
                'development.md': {
                  name: 'development.md',
                  type: 'file',
                  content: content.development[currentLanguage],
                  permissions: '-rw-r--r--',
                  size: content.development[currentLanguage].length,
                  modified: '2025-01-23 08:30'
                },
                'overview.md': {
                  name: 'overview.md',
                  type: 'file',
                  content: content.services[currentLanguage],
                  permissions: '-rw-r--r--',
                  size: content.services[currentLanguage].length,
                  modified: '2025-01-23 07:45'
                }
              }
            },
            'config': {
              name: 'config',
              type: 'directory',
              permissions: 'drwxr-xr-x',
              modified: '2025-01-23 06:00',
              children: {
                '.bashrc': {
                  name: '.bashrc',
                  type: 'file',
                  content: '# Markus Maiwald - Terminal Configuration\nexport PS1="markus@maiwald.work:\\w$ "\nalias ll="ls -la"\nalias projects="cd ~/projects && ls"\nalias services="cd ~/services && ls"',
                  permissions: '-rw-r--r--',
                  size: 150,
                  modified: '2025-01-23 06:00'
                },
                'ssh_config': {
                  name: 'ssh_config',
                  type: 'file',
                  content: 'Host git.maiwald.work\n    HostName git.maiwald.work\n    User git\n    Port 22\n    IdentityFile ~/.ssh/maiwald_rsa',
                  permissions: '-rw-------',
                  size: 95,
                  modified: '2025-01-20 14:00'
                }
              }
            }
          }
        }
      }
    },
    'var': {
      name: 'var',
      type: 'directory',
      permissions: 'drwxr-xr-x',
      modified: '2025-01-23 10:00',
      children: {
        'log': {
          name: 'log',
          type: 'directory',
          permissions: 'drwxr-xr-x',
          modified: '2025-01-23 10:00',
          children: {
            'system.log': {
              name: 'system.log',
              type: 'file',
              content: '[2025-01-23 10:00:00] SYSTEM: Terminal initialized\n[2025-01-23 10:00:01] AUTH: User markus authenticated\n[2025-01-23 10:00:02] NET: Connected to maiwald.work',
              permissions: '-rw-r--r--',
              size: 180,
              modified: '2025-01-23 10:00'
            }
          }
        }
      }
    },
    'tmp': {
      name: 'tmp',
      type: 'directory',
      permissions: 'drwxrwxrwx',
      modified: '2025-01-23 10:00',
      children: {}
    }
  }), [currentLanguage]);

  const [fileSystem] = useState<FileSystem>(createFileSystem);
  const [currentPath, setCurrentPath] = useState<string[]>(['home', 'markus']);

  const getCurrentDirectory = useCallback((): FileSystemNode | null => {
    let current: any = fileSystem;
    
    for (const segment of currentPath) {
      if (current && typeof current === 'object' && 'children' in current && current.children) {
        current = current.children[segment];
      } else if (current && typeof current === 'object' && segment in current) {
        current = current[segment];
      } else {
        return null;
      }
    }
    
    return current as FileSystemNode;
  }, [fileSystem, currentPath]);

  const getNode = useCallback((path: string[]): FileSystemNode | null => {
    let current: any = fileSystem;
    
    for (const segment of path) {
      if (current && typeof current === 'object' && 'children' in current && current.children) {
        current = current.children[segment];
      } else if (current && typeof current === 'object' && segment in current) {
        current = current[segment];
      } else {
        return null;
      }
    }
    
    return current as FileSystemNode;
  }, [fileSystem]);

  const resolvePath = useCallback((inputPath: string): string[] => {
    if (inputPath.startsWith('/')) {
      // Absolute path
      return inputPath.split('/').filter(Boolean);
    } else {
      // Relative path
      const segments = inputPath.split('/').filter(Boolean);
      const newPath = [...currentPath];
      
      for (const segment of segments) {
        if (segment === '..') {
          if (newPath.length > 0) {
            newPath.pop();
          }
        } else if (segment !== '.') {
          newPath.push(segment);
        }
      }
      
      return newPath;
    }
  }, [currentPath]);

  const changeDirectory = useCallback((path: string): boolean => {
    const resolvedPath = resolvePath(path);
    const node = getNode(resolvedPath);
    
    if (node && node.type === 'directory') {
      setCurrentPath(resolvedPath);
      return true;
    }
    
    return false;
  }, [resolvePath, getNode]);

  const listDirectory = useCallback((path?: string): FileSystemNode[] => {
    const targetPath = path ? resolvePath(path) : currentPath;
    const node = getNode(targetPath);
    
    if (node && node.type === 'directory' && node.children) {
      return Object.values(node.children).sort((a, b) => {
        if (a.type !== b.type) {
          return a.type === 'directory' ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      });
    }
    
    return [];
  }, [currentPath, resolvePath, getNode]);

  const readFile = useCallback((path: string): string | null => {
    const resolvedPath = resolvePath(path);
    const node = getNode(resolvedPath);
    
    if (node && node.type === 'file') {
      return node.content || '';
    }
    
    return null;
  }, [resolvePath, getNode]);

  const getCurrentPathString = useCallback((): string => {
    if (currentPath.length === 0) {
      return '/';
    }
    return '/' + currentPath.join('/');
  }, [currentPath]);

  const getPrompt = useCallback((): string => {
    const pathStr = currentPath.length > 0 ? currentPath[currentPath.length - 1] : '/';
    return `markus@maiwald.work:~${pathStr === 'markus' ? '' : '/' + pathStr}$`;
  }, [currentPath]);

  return {
    fileSystem,
    currentPath,
    getCurrentDirectory,
    getNode,
    resolvePath,
    changeDirectory,
    listDirectory,
    readFile,
    getCurrentPathString,
    getPrompt
  };
}