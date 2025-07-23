import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minimize2, Brain, Users } from 'lucide-react';
import { content } from '../data/content';
import { useLanguage } from '../hooks/useLanguage';
// Note: Audio hooks will be integrated later if needed
// import { useCyberpunkAudio } from '../hooks/useCyberpunkAudio';

interface SkillsAppProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SkillsApp: React.FC<SkillsAppProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'hardskills' | 'softskills'>('hardskills');
  const { currentLanguage } = useLanguage();
  // Audio functionality placeholder
  const playHover = () => {};
  const playClick = () => {};

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const formatContent = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('🧠') || line.startsWith('☁️') || line.startsWith('🧱') || 
          line.startsWith('🌐') || line.startsWith('🔐') || line.startsWith('💾') || 
          line.startsWith('🖥️') || line.startsWith('📡') || line.startsWith('📦') ||
          line.startsWith('🧑‍💼') || line.startsWith('🧩') || line.startsWith('🌍')) {
        return (
          <h3 key={index} className="text-lg font-bold text-cyan-400 mt-6 mb-3 first:mt-0">
            {line}
          </h3>
        );
      }
      if (line.startsWith('•')) {
        return (
          <div key={index} className="ml-4 mb-1 text-gray-300">
            <span className="text-cyan-400 mr-2">▸</span>
            {line.substring(1).trim()}
          </div>
        );
      }
      if (line.trim() === '') {
        return <div key={index} className="h-2" />;
      }
      return (
        <p key={index} className="mb-2 text-gray-300 leading-relaxed">
          {line}
        </p>
      );
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-900/95 border border-cyan-500/30 rounded-lg shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)',
            boxShadow: '0 0 50px rgba(6, 182, 212, 0.3)',
          }}
        >
          {/* Title Bar */}
          <div className="flex items-center justify-between p-4 border-b border-cyan-500/20 bg-gray-800/50">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-cyan-400 font-mono text-sm">SKILLS.exe</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onMouseEnter={playHover}
                onClick={playClick}
                className="p-1 hover:bg-gray-700/50 rounded text-gray-400 hover:text-white transition-colors"
              >
                <Minimize2 size={16} />
              </button>
              <button
                onMouseEnter={playHover}
                onClick={() => {
                  playClick();
                  onClose();
                }}
                className="p-1 hover:bg-red-500/20 rounded text-gray-400 hover:text-red-400 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-cyan-500/20 bg-gray-800/30">
            <button
              onMouseEnter={playHover}
              onClick={() => {
                playClick();
                setActiveTab('hardskills');
              }}
              className={`flex-1 px-6 py-3 text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                activeTab === 'hardskills'
                  ? 'bg-cyan-500/20 text-cyan-400 border-b-2 border-cyan-400'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
              }`}
            >
              <Brain size={18} />
              <span>HARD SKILLS</span>
            </button>
            <button
              onMouseEnter={playHover}
              onClick={() => {
                playClick();
                setActiveTab('softskills');
              }}
              className={`flex-1 px-6 py-3 text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                activeTab === 'softskills'
                  ? 'bg-cyan-500/20 text-cyan-400 border-b-2 border-cyan-400'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
              }`}
            >
              <Users size={18} />
              <span>SOFT SKILLS</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto p-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="prose prose-invert max-w-none"
            >
              <div className="font-mono text-sm leading-relaxed">
                {formatContent(content[activeTab][currentLanguage])}
              </div>
            </motion.div>
          </div>

          {/* Status Bar */}
          <div className="px-4 py-2 border-t border-cyan-500/20 bg-gray-800/50 text-xs text-gray-400 font-mono">
            <div className="flex justify-between items-center">
              <span>STATUS: READY</span>
              <span>NEURAL_LINK: ACTIVE</span>
              <span>MODE: {activeTab.toUpperCase()}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};