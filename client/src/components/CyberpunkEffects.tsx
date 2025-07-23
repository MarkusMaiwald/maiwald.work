import { useEffect, useState } from 'react';
import { useAudio } from '../hooks/useAudio';

// Custom cursor component
export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, .interactive');
      setIsHovering(!!isInteractive);
    };

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${isHovering ? 'hover' : ''} ${isClicking ? 'click' : ''}`}
      style={{
        left: position.x - 10,
        top: position.y - 10,
      }}
    />
  );
}

// Scan line effect
export function ScanLine() {
  return <div className="scan-line" />;
}

// Data stream effects
export function DataStreams() {
  const [streams, setStreams] = useState<Array<{ id: number; left: number; delay: number }>>([]);

  useEffect(() => {
    const generateStreams = () => {
      const newStreams = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 4,
      }));
      setStreams(newStreams);
    };

    generateStreams();
    const interval = setInterval(generateStreams, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {streams.map((stream) => (
        <div
          key={stream.id}
          className="data-stream"
          style={{
            left: `${stream.left}%`,
            animationDelay: `${stream.delay}s`,
          }}
        />
      ))}
    </>
  );
}

// Matrix background effect
export function MatrixBackground() {
  return <div className="matrix-bg" />;
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
  };

  return (
    <button
      onClick={toggleAudio}
      className="fixed bottom-20 right-4 z-[60] cyberpunk-button p-2 rounded-full"
      aria-label={isPlaying ? 'Stop ambient audio' : 'Start ambient audio'}
    >
      {isPlaying ? (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
      )}
    </button>
  );
}

// Main cyberpunk effects wrapper
export function CyberpunkEffects({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-screen overflow-hidden">
      <MatrixBackground />
      <ScanLine />
      <DataStreams />
      <CustomCursor />
      <AmbientAudio />
      {children}
    </div>
  );
}