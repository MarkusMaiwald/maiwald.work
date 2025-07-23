import { useEffect, useState, useRef } from 'react';
import { useAudio } from '../hooks/useAudio';

// Custom cursor component - disabled for performance
export function CustomCursor() {
  return null;
}

// Scan line effect
export function ScanLine() {
  return <div className="scan-line" />;
}

// Lightweight data stream effects - removed for performance
export function DataStreams() {
  return null;
}

// Matrix background effect - lightweight blue binary rain
export function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const characters = "01";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];
    
    // Initialize drops
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * canvas.height;
    }
    
    function draw() {
      if (!ctx || !canvas) return;
      
      // Semi-transparent background for fade effect
      ctx.fillStyle = 'rgba(0, 15, 30, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Blue Matrix characters
      ctx.fillStyle = '#0080ff';
      ctx.font = fontSize + 'px "Courier New", monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        const x = i * fontSize;
        const y = drops[i];
        
        ctx.fillText(text, x, y);
        
        // Reset drop to top when it reaches bottom
        if (y > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        
        drops[i] += fontSize;
      }
    }
    
    const interval = setInterval(draw, 100); // Slower animation for better performance
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-60"
      style={{ zIndex: 0 }}
    />
  );
}

// Glitch text component
interface GlitchTextProps {
  children: React.ReactNode;
  className?: string;
  enableHover?: boolean;
}

export function GlitchText({ children, className = '', enableHover = false }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.005) { // 0.5% chance to auto-glitch (very reduced)
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150);
      }
    }, 10000); // Every 10 seconds instead of 5

    return () => clearInterval(interval);
  }, []);

  const handleHover = () => {
    if (enableHover) {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 400);
    }
  };

  return (
    <span 
      className={`glitch-text ${className} ${enableHover ? 'cursor-pointer hover:text-cyberpunk-electric-blue transition-colors' : ''} ${isGlitching ? 'animate-glitch-intense' : ''}`}
      onMouseEnter={handleHover}
      style={{
        textShadow: isGlitching 
          ? '2px 0 #ff006e, -2px 0 #00d4ff, 0 0 20px #ff006e, 0 0 30px #00d4ff' 
          : undefined
      }}
    >
      {children}
    </span>
  );
}

// Neon glow component
interface NeonGlowProps {
  children: React.ReactNode;
  className?: string;
}

export function NeonGlow({ children, className = '' }: NeonGlowProps) {
  return (
    <div className={`neon-glow ${className}`}>
      {children}
    </div>
  );
}

// Typewriter effect
interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export function TypewriterEffect({ text, speed = 50, className = '', onComplete }: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <span className={`typewriter ${className}`}>
      {displayText}
    </span>
  );
}

// Hologram effect component
interface HologramProps {
  children: React.ReactNode;
  className?: string;
}

export function Hologram({ children, className = '' }: HologramProps) {
  return (
    <div className={`hologram ${className}`}>
      {children}
    </div>
  );
}

// Floating animation component
interface FloatingProps {
  children: React.ReactNode;
  className?: string;
}

export function FloatingElement({ children, className = '' }: FloatingProps) {
  return (
    <div className={`float-animation ${className}`}>
      {children}
    </div>
  );
}

// Cyberpunk panel component
interface CyberpunkPanelProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
}

export function CyberpunkPanel({ children, className = '', interactive = false, onClick }: CyberpunkPanelProps) {
  return (
    <div 
      className={`cyberpunk-panel ${interactive ? 'interactive-panel' : ''} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// Data visualization component
interface DataVizProps {
  children: React.ReactNode;
  className?: string;
}

export function DataVisualization({ children, className = '' }: DataVizProps) {
  return (
    <div className={`data-viz ${className}`}>
      {children}
    </div>
  );
}

// Ambient audio component
export function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { createAmbientHum, stopAllAudio, isInitialized } = useAudio();
  const [ambientNode, setAmbientNode] = useState<GainNode | null>(null);

  const toggleAudio = () => {
    if (!isInitialized) return;

    if (isPlaying) {
      setIsPlaying(false);
      if (ambientNode) {
        ambientNode.gain.setValueAtTime(0, ambientNode.context.currentTime);
      }
      stopAllAudio();
      setAmbientNode(null);
    } else {
      setIsPlaying(true);
      const node = createAmbientHum({ volume: 0.15, loop: true });
      setAmbientNode(node);
    }

    // Notify parent about state change
    window.dispatchEvent(new CustomEvent('ambientAudioStateChanged', { 
      detail: { isPlaying: !isPlaying }
    }));
  };

  // Listen for toggle events from the external button
  useEffect(() => {
    const handleToggle = () => toggleAudio();
    window.addEventListener('toggleAmbientAudio', handleToggle);
    return () => window.removeEventListener('toggleAmbientAudio', handleToggle);
  }, [isPlaying, isInitialized, ambientNode]);

  // Don't render the button here anymore - it's handled in Desktop.tsx
  return null;
}

// Main cyberpunk effects wrapper - performance optimized
export function CyberpunkEffects({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-screen overflow-hidden">
      <ScanLine />
      <AmbientAudio />
      {children}
    </div>
  );
}