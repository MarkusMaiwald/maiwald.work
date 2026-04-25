import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../hooks/useLanguage';
import { devlogEntries } from '../data/devlog';

interface DevlogAppProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
}

export const DevlogApp: React.FC<DevlogAppProps> = ({ isOpen, onClose, currentLanguage }) => {
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isEN = currentLanguage === 'EN';

  return (
    <div
      className="modal-cursor fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-green-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6 md:p-8 bg-gradient-to-r from-green-600/20 to-cyan-600/20 border-b border-green-500/30">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-green-400 hover:text-green-200 text-xl font-mono"
            aria-label="Close"
          >
            [X]
          </button>
          <div className="text-green-400 font-mono text-xs uppercase tracking-wide mb-2">
            devlog.dat
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-green-300 mb-2 font-mono">
            DEVLOG
          </h2>
          <p className="text-gray-300 text-sm md:text-base">
            {isEN
              ? 'Hand-rolled from graf checkpoints. No auto-scraping, no cheerleading.'
              : 'Handgeschrieben aus graf-Checkpoints. Kein Auto-Scraping, kein Schönreden.'}
          </p>
        </div>

        <div className="p-6 md:p-8 space-y-4">
          <div className="text-green-400 font-mono text-xs uppercase tracking-wider">
            {isEN
              ? `▸ ${devlogEntries.length} entries · newest first`
              : `▸ ${devlogEntries.length} Einträge · neueste zuerst`}
          </div>

          {devlogEntries.map((entry) => (
            <article
              key={entry.id}
              className="p-4 md:p-5 rounded-lg border border-green-500/20 bg-black/40 hover:border-green-500/50 transition-colors"
            >
              <header className="flex items-baseline justify-between gap-3 mb-2 flex-wrap">
                <div className="flex items-baseline gap-2 text-xs font-mono uppercase tracking-wider">
                  <time className="text-green-300" dateTime={entry.date}>
                    {entry.date}
                  </time>
                  <span className="text-gray-500">·</span>
                  <span className="text-green-400">[{entry.project}]</span>
                </div>
              </header>
              <h4 className="font-mono text-base md:text-lg font-bold text-gray-100 mb-2 leading-snug">
                {entry.title[currentLanguage]}
              </h4>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {entry.summary[currentLanguage]}
              </p>
            </article>
          ))}

          <div className="border-t border-green-500/20 pt-4 mt-2 text-center text-xs font-mono text-gray-500">
            {isEN
              ? 'Hand-rolled from graf checkpoints · raw stream at git.maiwald.work'
              : 'Handgeschrieben aus graf-Checkpoints · Rohstream auf git.maiwald.work'}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
