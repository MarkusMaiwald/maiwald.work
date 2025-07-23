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
            'active-projects': {
              name: 'active-projects',
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
                },
                'maiwald-enterprises': {
                  name: 'maiwald-enterprises',
                  type: 'directory',
                  permissions: 'drwxr-xr-x',
                  modified: '2025-01-23 10:30',
                  children: {
                    'company-profile.md': {
                      name: 'company-profile.md',
                      type: 'file',
                      content: '# Maiwald Enterprises B.V.\n\n## Company Information\n- **Legal Name**: Maiwald Enterprises B.V.\n- **KVK Number**: 78035902\n- **BTW Number**: NL861240716B01\n- **Founded**: 2019\n- **Headquarters**: Netherlands\n\n## Strategic Focus\nTechnology consulting and enterprise infrastructure solutions for strategic digital transformation.\n\n## Active Clients\n- BC2IP (Blockchain Infrastructure)\n- IOP Global (International Operations)\n- Group4IT (IT Solutions)\n- IT Qube (Enterprise Technology)\n\n## Core Competencies\n- Cloud Architecture & Migration\n- DevOps & Automation\n- Security & Compliance\n- Digital Transformation Strategy',
                      permissions: '-rw-r--r--',
                      size: 680,
                      modified: '2025-01-23 10:30'
                    }
                  }
                },
                'blockchain-sovereignty': {
                  name: 'blockchain-sovereignty',
                  type: 'directory',
                  permissions: 'drwxr-xr-x',
                  modified: '2025-01-23 09:15',
                  children: {
                    'digital-identity.md': {
                      name: 'digital-identity.md',
                      type: 'file',
                      content: '# Digital Identity & Sovereignty\n\n## Self-Sovereign Identity (SSI) Framework\n\nStrategic implementation of decentralized identity systems for enterprise organizations.\n\n### Technical Architecture\n- Decentralized Identifiers (DIDs)\n- Verifiable Credentials (VCs)\n- Zero-Knowledge Proofs\n- Blockchain-Agnostic Infrastructure\n\n### Enterprise Benefits\n- Reduced Identity Management Costs\n- Enhanced Privacy Protection\n- Regulatory Compliance (GDPR, eIDAS)\n- Interoperability Across Systems\n\n### Implementation Strategy\n1. Identity Architecture Assessment\n2. Pilot Program Development\n3. Integration with Existing Systems\n4. Staff Training & Change Management\n5. Full Production Deployment',
                      permissions: '-rw-r--r--',
                      size: 720,
                      modified: '2025-01-23 09:15'
                    }
                  }
                }
              }
            },
            'strategic-consulting': {
              name: 'strategic-consulting',
              type: 'directory',
              permissions: 'drwxr-xr-x',
              modified: '2025-01-23 08:00',
              children: {
                'blockchain-sovereignty.md': {
                  name: 'blockchain-sovereignty.md',
                  type: 'file',
                  content: content.blockchain[currentLanguage],
                  permissions: '-rw-r--r--',
                  size: content.blockchain[currentLanguage].length,
                  modified: '2025-01-23 08:00'
                },
                'cloud-architecture.md': {
                  name: 'cloud-architecture.md',
                  type: 'file',
                  content: content.cloud[currentLanguage],
                  permissions: '-rw-r--r--',
                  size: content.cloud[currentLanguage].length,
                  modified: '2025-01-23 08:15'
                },
                'digital-transformation.md': {
                  name: 'digital-transformation.md',
                  type: 'file',
                  content: content.development[currentLanguage],
                  permissions: '-rw-r--r--',
                  size: content.development[currentLanguage].length,
                  modified: '2025-01-23 08:30'
                },
                'enterprise-consulting.md': {
                  name: 'enterprise-consulting.md',
                  type: 'file',
                  content: content.services[currentLanguage],
                  permissions: '-rw-r--r--',
                  size: content.services[currentLanguage].length,
                  modified: '2025-01-23 07:45'
                },
                'technology-assessment.md': {
                  name: 'technology-assessment.md',
                  type: 'file',
                  content: '# Technology Assessment Framework\n\n## Strategic Technology Evaluation\n\nMaiwald Enterprises provides comprehensive technology assessments for enterprise organizations looking to modernize their infrastructure and optimize their technology stack.\n\n### Assessment Areas\n- Current State Analysis\n- Technology Stack Review\n- Security Posture Evaluation\n- Scalability Assessment\n- Cost-Benefit Analysis\n- Risk Management Review\n\n### Deliverables\n- Executive Summary Report\n- Technical Recommendations\n- Implementation Roadmap\n- ROI Projections\n- Risk Mitigation Strategies',
                  permissions: '-rw-r--r--',
                  size: 620,
                  modified: '2025-01-23 08:45'
                }
              }
            },
            'infrastructure-blueprints': {
              name: 'infrastructure-blueprints',
              type: 'directory',
              permissions: 'drwxr-xr-x',
              modified: '2025-01-23 06:00',
              children: {
                'system-architecture.yaml': {
                  name: 'system-architecture.yaml',
                  type: 'file',
                  content: '# Maiwald Enterprises Infrastructure Blueprint\napiVersion: v1\nkind: SystemArchitecture\nmetadata:\n  name: enterprise-stack\n  author: markus@maiwald.work\nspec:\n  compute:\n    - kubernetes-clusters\n    - container-orchestration\n    - serverless-functions\n  security:\n    - zero-trust-network\n    - end-to-end-encryption\n    - identity-management\n  data:\n    - distributed-databases\n    - real-time-analytics\n    - backup-strategies',
                  permissions: '-rw-r--r--',
                  size: 420,
                  modified: '2025-01-23 06:00'
                },
                'network-topology.conf': {
                  name: 'network-topology.conf',
                  type: 'file',
                  content: '# Network Infrastructure Configuration\n# Maiwald Enterprises BV - Network Topology\n\n[CORE_INFRASTRUCTURE]\nload_balancers = nginx, haproxy\nfirewalls = pfsense, iptables\nmonitoring = prometheus, grafana\n\n[SECURITY_LAYERS]\nvpn_gateways = wireguard, openvpn\nids_ips = suricata, snort\nsiem = elastic_stack, splunk\n\n[CONNECTIVITY]\ncdn = cloudflare, aws_cloudfront\ndns = bind9, cloudflare_dns\nssl_termination = certbot, letsencrypt',
                  permissions: '-rw-------',
                  size: 385,
                  modified: '2025-01-22 16:30'
                },
                'deployment-manifests.yaml': {
                  name: 'deployment-manifests.yaml',
                  type: 'file',
                  content: '# Kubernetes Deployment Manifests\n# Strategic deployment configurations for enterprise clients\n\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: enterprise-application\n  namespace: production\nspec:\n  replicas: 3\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      maxSurge: 1\n      maxUnavailable: 0\n  selector:\n    matchLabels:\n      app: enterprise-app\n  template:\n    metadata:\n      labels:\n        app: enterprise-app\n    spec:\n      containers:\n      - name: app\n        image: registry.maiwald.work/enterprise-app:latest\n        ports:\n        - containerPort: 8080\n        resources:\n          limits:\n            cpu: 500m\n            memory: 512Mi\n          requests:\n            cpu: 250m\n            memory: 256Mi',
                  permissions: '-rw-r--r--',
                  size: 680,
                  modified: '2025-01-23 07:15'
                },
                'security-framework.conf': {
                  name: 'security-framework.conf',
                  type: 'file',
                  content: '# Security Framework Configuration\n# Maiwald Enterprises - Enterprise Security Standards\n\n[AUTHENTICATION]\nmulti_factor = required\npassword_policy = complex\nsession_timeout = 30_minutes\n\n[AUTHORIZATION]\nrole_based_access = enabled\nleast_privilege = enforced\naudit_logging = comprehensive\n\n[ENCRYPTION]\ndata_at_rest = aes_256\ndata_in_transit = tls_1_3\nkey_management = vault_enterprise\n\n[COMPLIANCE]\nstandards = iso_27001, soc2_type2\nregulations = gdpr, ccpa\nauditing = quarterly_reviews',
                  permissions: '-rw-------',
                  size: 495,
                  modified: '2025-01-23 05:45'
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