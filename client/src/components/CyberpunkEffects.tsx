import { useEffect, useState, useRef } from 'react';
import { useAudio } from '../hooks/useAudio';

// Cyberpunk Audio Effects
export class CyberpunkAudio {
  private static audioContext: AudioContext | null = null;
  
  private static getAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  // Generate cyberpunk hover click sound
  static playHoverClick() {
    try {
      const ctx = this.getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Create sharp, digital click sound
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);

      // High-pass filter for crisp digital sound
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(200, ctx.currentTime);
      filter.Q.setValueAtTime(5, ctx.currentTime);

      // Sharp attack, quick decay
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      // Connect nodes
      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Play sound
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.08);
    } catch (error) {
      console.log('Audio hover effect failed:', error);
    }
  }

  // Generate cyberpunk button click sound
  static playButtonClick() {
    try {
      const ctx = this.getAudioContext();
      const oscillator1 = ctx.createOscillator();
      const oscillator2 = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Dual oscillator for richer sound
      oscillator1.type = 'square';
      oscillator1.frequency.setValueAtTime(1200, ctx.currentTime);
      oscillator1.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);

      oscillator2.type = 'sawtooth';
      oscillator2.frequency.setValueAtTime(300, ctx.currentTime);
      oscillator2.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.15);

      // Band-pass filter for cyberpunk character
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.Q.setValueAtTime(3, ctx.currentTime);

      // Sharp attack with longer decay
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

      // Connect nodes
      oscillator1.connect(filter);
      oscillator2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Play sound
      oscillator1.start(ctx.currentTime);
      oscillator2.start(ctx.currentTime);
      oscillator1.stop(ctx.currentTime + 0.2);
      oscillator2.stop(ctx.currentTime + 0.2);
    } catch (error) {
      console.log('Audio click effect failed:', error);
    }
  }

  // Initialize audio context on first user interaction
  static initializeAudio() {
    try {
      const ctx = this.getAudioContext();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
    } catch (error) {
      console.log('Audio initialization failed:', error);
    }
  }
}

// Custom cursor component - simple cyberpunk circle
export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isOverInteractive, setIsOverInteractive] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if cursor is over interactive elements
      const target = e.target as Element;
      const isInteractive = target.closest('button, [role="button"], .dock-icon, [role="dialog"], .modal-overlay, .calculator, .text-editor, .skills-app, .chatbot-app, .system-monitor, [data-system-monitor], .cyberpunk-panel');
      setIsOverInteractive(!!isInteractive);
      
      // Only hide cursor when NOT over interactive elements
      if (isInteractive) {
        document.body.style.cursor = 'auto';
      } else {
        document.body.style.cursor = 'none';
      }
    };

    document.addEventListener('mousemove', updateCursor);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.body.style.cursor = 'auto'; // Restore default cursor
    };
  }, []);

  // Don't show custom cursor over interactive elements
  if (isOverInteractive) {
    return null;
  }

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: position.x - 8,
        top: position.y - 8,
        width: '16px',
        height: '16px',
        border: '2px solid #00d4ff',
        borderRadius: '50%',
        backgroundColor: 'rgba(0, 212, 255, 0.2)',
        boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
        transition: 'none'
      }}
    />
  );
}

// Scan line effect
export function ScanLine() {
  return <div className="scan-line" />;
}

// Lightweight data stream effects - removed for performance
export function DataStreams() {
  return null;
}

// Blade Runner Rain Effect - atmospheric rain drops
export function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    interface Raindrop {
      x: number;
      y: number;
      speed: number;
      length: number;
      opacity: number;
      width: number;
    }

    let raindrops: Raindrop[] = [];
    let animationId: number;

    function createRaindrop(): Raindrop {
      return {
        x: Math.random() * canvas!.width,
        y: Math.random() * -canvas!.height,
        speed: Math.random() * 8 + 12,
        length: Math.random() * 20 + 10,
        opacity: Math.random() * 0.3 + 0.1,
        width: Math.random() * 1.5 + 0.5
      };
    }

    function initRain() {
      raindrops = [];
      const dropCount = Math.floor((canvas!.width * canvas!.height) / 18000);
      for (let i = 0; i < Math.min(dropCount, 180); i++) {
        raindrops.push(createRaindrop());
      }
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      raindrops.forEach(drop => {
        drop.y += drop.speed;
        if (drop.y > canvas!.height) {
          drop.x = Math.random() * canvas!.width;
          drop.y = Math.random() * -canvas!.height;
        }

        ctx!.beginPath();
        ctx!.moveTo(drop.x, drop.y);
        ctx!.lineTo(drop.x + drop.width * 0.5, drop.y + drop.length);
        ctx!.strokeStyle = `rgba(150, 200, 255, ${drop.opacity})`;
        ctx!.lineWidth = drop.width;
        ctx!.lineCap = 'round';
        ctx!.stroke();
      });

      animationId = requestAnimationFrame(animate);
    }

    initRain();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initRain();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 5, opacity: 0.7 }}
    />
  );
}

// Film Grain Overlay
export function FilmGrain() {
  return <div className="film-grain" />;
}

// CRT Scanlines Overlay
export function CRTScanlines() {
  return <div className="crt-scanlines" />;
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

  // Reset animation when text changes
  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
  }, [text]);

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

// Main cyberpunk effects wrapper - Blade Runner noir
export function CyberpunkEffects({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-screen overflow-hidden">
      <FilmGrain />
      <CRTScanlines />
      <ScanLine />
      <CustomCursor />
      <AmbientAudio />
      {children}
    </div>
  );
}