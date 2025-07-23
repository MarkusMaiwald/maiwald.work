import { useState, useEffect, useRef } from 'react';

export interface AudioConfig {
  volume?: number;
  loop?: boolean;
}

export function useAudio() {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const activeNodes = useRef<AudioNode[]>([]);

  useEffect(() => {
    const initAudio = async () => {
      if (!isInitialized) {
        try {
          const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
          if (ctx.state === 'suspended') {
            await ctx.resume();
          }
          setAudioContext(ctx);
          setIsInitialized(true);
        } catch (error) {
          console.warn('Audio initialization failed:', error);
        }
      }
    };

    // Initialize on first user interaction
    const handleUserInteraction = () => {
      initAudio();
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [isInitialized]);

  const createCracklingSound = (duration: number = 3000, config: AudioConfig = {}) => {
    if (!audioContext) return null;

    const { volume = 0.3, loop = false } = config;
    
    // Main gain node
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
    gainNode.connect(audioContext.destination);

    // Create crackling noise using multiple oscillators and filters
    const cracklingNodes: AudioNode[] = [];

    // Base static noise
    const bufferSize = audioContext.sampleRate * 2;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.1;
    }

    const staticSource = audioContext.createBufferSource();
    staticSource.buffer = buffer;
    staticSource.loop = true;
    
    const staticFilter = audioContext.createBiquadFilter();
    staticFilter.type = 'highpass';
    staticFilter.frequency.setValueAtTime(2000, audioContext.currentTime);
    
    const staticGain = audioContext.createGain();
    staticGain.gain.setValueAtTime(0.4, audioContext.currentTime);
    
    staticSource.connect(staticFilter);
    staticFilter.connect(staticGain);
    staticGain.connect(gainNode);
    
    cracklingNodes.push(staticSource, staticFilter, staticGain);

    // Add periodic pops and crackles
    for (let i = 0; i < 8; i++) {
      const popSource = audioContext.createBufferSource();
      const popBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.1, audioContext.sampleRate);
      const popData = popBuffer.getChannelData(0);
      
      for (let j = 0; j < popData.length; j++) {
        const decay = 1 - (j / popData.length);
        popData[j] = (Math.random() * 2 - 1) * decay * 0.8;
      }
      
      popSource.buffer = popBuffer;
      const popGain = audioContext.createGain();
      popGain.gain.setValueAtTime(0, audioContext.currentTime);
      
      const startTime = audioContext.currentTime + Math.random() * (duration / 1000);
      popGain.gain.setValueAtTime(0.6, startTime);
      popGain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);
      
      popSource.connect(popGain);
      popGain.connect(gainNode);
      
      popSource.start(startTime);
      cracklingNodes.push(popSource, popGain);
    }

    // Low frequency connection hum
    const humOsc = audioContext.createOscillator();
    humOsc.type = 'sawtooth';
    humOsc.frequency.setValueAtTime(60, audioContext.currentTime);
    
    const humFilter = audioContext.createBiquadFilter();
    humFilter.type = 'lowpass';
    humFilter.frequency.setValueAtTime(120, audioContext.currentTime);
    
    const humGain = audioContext.createGain();
    humGain.gain.setValueAtTime(0.2, audioContext.currentTime);
    
    humOsc.connect(humFilter);
    humFilter.connect(humGain);
    humGain.connect(gainNode);
    
    cracklingNodes.push(humOsc, humFilter, humGain);

    // Start all sources
    staticSource.start();
    humOsc.start();

    // Stop after duration if not looping
    if (!loop) {
      setTimeout(() => {
        cracklingNodes.forEach(node => {
          if ('stop' in node) {
            try {
              (node as AudioScheduledSourceNode).stop();
            } catch (e) {
              // Already stopped
            }
          }
          if ('disconnect' in node) {
            node.disconnect();
          }
        });
      }, duration);
    }

    activeNodes.current.push(...cracklingNodes);
    
    return gainNode;
  };

  const createAmbientHum = (config: AudioConfig = {}) => {
    if (!audioContext) return null;

    const { volume = 0.1, loop = true } = config;
    
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
    gainNode.connect(audioContext.destination);

    const oscillator = audioContext.createOscillator();
    const filter = audioContext.createBiquadFilter();

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(60, audioContext.currentTime);
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, audioContext.currentTime);

    oscillator.connect(filter);
    filter.connect(gainNode);

    oscillator.start();
    
    if (!loop) {
      setTimeout(() => {
        oscillator.stop();
        oscillator.disconnect();
        filter.disconnect();
        gainNode.disconnect();
      }, 10000);
    }

    activeNodes.current.push(oscillator, filter, gainNode);
    
    return gainNode;
  };

  const stopAllAudio = () => {
    activeNodes.current.forEach(node => {
      if ('stop' in node) {
        try {
          (node as AudioScheduledSourceNode).stop();
        } catch (e) {
          // Already stopped
        }
      }
      if ('disconnect' in node) {
        node.disconnect();
      }
    });
    activeNodes.current = [];
  };

  return {
    audioContext,
    isInitialized,
    createCracklingSound,
    createAmbientHum,
    stopAllAudio
  };
}