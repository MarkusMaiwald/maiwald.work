import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface WallpaperNode {
  id: string;
  x: number;
  y: number;
  label: string;
  type: 'project' | 'network' | 'system';
  connections: string[];
  isActive: boolean;
}

interface WallpaperConnection {
  from: string;
  to: string;
  isActive: boolean;
}

export function CyberpunkWallpaper() {
  const [nodes, setNodes] = useState<WallpaperNode[]>([]);
  const [connections, setConnections] = useState<WallpaperConnection[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Initialize network topology
    const networkNodes: WallpaperNode[] = [
      { id: 'nexus', x: 20, y: 30, label: 'NexusOS', type: 'project', connections: ['kernel', 'security'], isActive: false },
      { id: 'kernel', x: 35, y: 15, label: 'KERNEL', type: 'system', connections: ['memory', 'io'], isActive: false },
      { id: 'security', x: 40, y: 45, label: 'SEC', type: 'system', connections: ['crypto', 'auth'], isActive: false },
      { id: 'crypto', x: 65, y: 35, label: 'CRYPTO', type: 'system', connections: ['blockchain'], isActive: false },
      { id: 'blockchain', x: 80, y: 20, label: 'IOP', type: 'network', connections: ['did'], isActive: false },
      { id: 'did', x: 85, y: 50, label: 'DID', type: 'network', connections: ['identity'], isActive: false },
      { id: 'identity', x: 70, y: 70, label: 'SSI', type: 'project', connections: ['ttrpg'], isActive: false },
      { id: 'ttrpg', x: 45, y: 80, label: 'TTRPG', type: 'project', connections: ['ai'], isActive: false },
      { id: 'ai', x: 25, y: 65, label: 'AI.GM', type: 'system', connections: ['nexus'], isActive: false },
      { id: 'memory', x: 15, y: 50, label: 'MEM', type: 'system', connections: ['storage'], isActive: false },
      { id: 'storage', x: 10, y: 70, label: 'STOR', type: 'system', connections: ['ai'], isActive: false },
      { id: 'io', x: 50, y: 10, label: 'I/O', type: 'system', connections: ['network'], isActive: false },
      { id: 'network', x: 70, y: 5, label: 'NET', type: 'system', connections: ['blockchain'], isActive: false },
      { id: 'auth', x: 55, y: 60, label: 'AUTH', type: 'system', connections: ['did'], isActive: false },
      { id: 'libertaria', x: 90, y: 80, label: 'LIBERTARIA', type: 'network', connections: ['identity'], isActive: false }
    ];

    const networkConnections: WallpaperConnection[] = [];
    networkNodes.forEach(node => {
      node.connections.forEach(targetId => {
        if (networkNodes.find(n => n.id === targetId)) {
          networkConnections.push({
            from: node.id,
            to: targetId,
            isActive: false
          });
        }
      });
    });

    setNodes(networkNodes);
    setConnections(networkConnections);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawNetwork = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections (circuit traces)
      connections.forEach(connection => {
        const fromNode = nodes.find(n => n.id === connection.from);
        const toNode = nodes.find(n => n.id === connection.to);
        
        if (fromNode && toNode) {
          const fromX = (fromNode.x / 100) * canvas.width;
          const fromY = (fromNode.y / 100) * canvas.height;
          const toX = (toNode.x / 100) * canvas.width;
          const toY = (toNode.y / 100) * canvas.height;

          ctx.beginPath();
          ctx.moveTo(fromX, fromY);
          
          // Create curved connections for more organic feel
          const midX = (fromX + toX) / 2;
          const midY = (fromY + toY) / 2;
          const offsetX = (Math.random() - 0.5) * 100;
          const offsetY = (Math.random() - 0.5) * 100;
          
          ctx.quadraticCurveTo(midX + offsetX, midY + offsetY, toX, toY);
          
          const isHighlighted = hoveredNode === connection.from || hoveredNode === connection.to;
          const opacity = isHighlighted ? 0.6 : 0.15;
          const color = isHighlighted ? '#00d4ff' : '#1a1a1a';
          
          ctx.strokeStyle = color;
          ctx.globalAlpha = opacity;
          ctx.lineWidth = isHighlighted ? 2 : 1;
          ctx.stroke();
          
          // Add subtle glow effect for highlighted connections
          if (isHighlighted) {
            ctx.shadowColor = color;
            ctx.shadowBlur = 10;
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      });

      // Draw grid pattern (very subtle)
      ctx.globalAlpha = 0.03;
      ctx.strokeStyle = '#00d4ff';
      ctx.lineWidth = 1;
      
      for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      ctx.globalAlpha = 1;
    };

    const animate = () => {
      drawNetwork();
      
      // Random flicker effect
      if (Math.random() < 0.02 && nodes.length > 0) {
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        if (randomNode) {
          setNodes(prev => prev.map(node => 
            node.id === randomNode.id 
              ? { ...node, isActive: !node.isActive }
              : node
          ));
          
          setTimeout(() => {
            setNodes(prev => prev.map(node => 
              node.id === randomNode.id 
                ? { ...node, isActive: false }
                : node
            ));
          }, 200);
        }
      }
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [nodes, connections, hoveredNode]);

  const handleNodeHover = (nodeId: string | null) => {
    setHoveredNode(nodeId);
    
    if (nodeId && connections.length > 0) {
      // Activate connections
      setConnections(prev => prev.map(conn => ({
        ...conn,
        isActive: conn.from === nodeId || conn.to === nodeId
      })));
    } else {
      // Deactivate all connections
      setConnections(prev => prev.map(conn => ({
        ...conn,
        isActive: false
      })));
    }
  };

  const getNodeColor = (type: string, isHovered: boolean, isActive: boolean) => {
    const baseColors = {
      project: '#ff006e',  // Neon magenta
      network: '#00d4ff',  // Electric blue
      system: '#39ff14'    // Acid green
    };
    
    if (isHovered || isActive) {
      return baseColors[type as keyof typeof baseColors];
    }
    
    return '#1a1a1a';
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Canvas for circuit traces */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-80"
      />
      
      {/* Network nodes */}
      <div className="absolute inset-0">
        {nodes.map(node => (
          <motion.div
            key={node.id}
            className="absolute pointer-events-auto cursor-pointer"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: hoveredNode === node.id || node.isActive ? 0.8 : 0.3,
              scale: hoveredNode === node.id ? 1.2 : 1
            }}
            transition={{ duration: 0.3 }}
            onMouseEnter={() => handleNodeHover(node.id)}
            onMouseLeave={() => handleNodeHover(null)}
          >
            <div className="relative">
              {/* Node glow */}
              <div
                className="absolute inset-0 rounded-full blur-md"
                style={{
                  backgroundColor: getNodeColor(node.type, hoveredNode === node.id, node.isActive),
                  opacity: hoveredNode === node.id || node.isActive ? 0.6 : 0.1
                }}
              />
              
              {/* Node core */}
              <div
                className="relative w-3 h-3 rounded-full border border-current"
                style={{
                  color: getNodeColor(node.type, hoveredNode === node.id, node.isActive),
                  backgroundColor: hoveredNode === node.id || node.isActive 
                    ? getNodeColor(node.type, true, false) 
                    : 'transparent'
                }}
              />
              
              {/* Node label */}
              {(hoveredNode === node.id || node.isActive) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                >
                  <div 
                    className="px-2 py-1 rounded text-xs font-mono font-bold"
                    style={{
                      backgroundColor: 'rgba(18, 18, 18, 0.9)',
                      color: getNodeColor(node.type, true, false),
                      textShadow: `0 0 10px ${getNodeColor(node.type, true, false)}`
                    }}
                  >
                    {node.label}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Scan lines effect */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyberpunk-electric-blue to-transparent"
            style={{
              top: '30%',
              opacity: 0.1
            }}
            animate={{
              y: typeof window !== 'undefined' ? window.innerHeight : 800,
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: 8,
              delay: i * 2.5,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>
      
      {/* Terminal cursor in corner */}
      <motion.div
        className="absolute top-4 right-4 font-mono text-xs text-cyberpunk-electric-blue"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-cyberpunk-text-dim">system@maiwald.work</span>
        <span className="text-cyberpunk-acid-green ml-2">█</span>
      </motion.div>
    </div>
  );
}