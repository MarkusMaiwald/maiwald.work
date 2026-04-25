import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../hooks/useLanguage';

interface DevlogAppProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
}

const feeds = [
  { key: 'janus', label: 'Janus' },
  { key: 'nexus', label: 'Nexus OS' },
  { key: 'graf', label: 'Graf' },
  { key: 'libertaria', label: 'Libertaria Protocol' },
  { key: 'chapter-zero', label: 'Chapter ZERO' },
  { key: 'cross', label: 'Cross-project' },
];

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

        <div className="p-6 md:p-8 space-y-6">
          <div className="rounded-lg border border-green-500/20 bg-black/40 p-6 text-center">
            <div className="text-green-400 font-mono text-xs uppercase tracking-wider mb-2">
              ● status
            </div>
            <div className="text-green-300 font-mono text-lg md:text-xl">
              {isEN ? 'STUB — coming with v2 structural reforge' : 'PLATZHALTER – kommt mit v2-Strukturumbau'}
            </div>
            <div className="text-gray-400 text-xs md:text-sm mt-3">
              {isEN
                ? 'Until then, the raw stream is on git.maiwald.work.'
                : 'Bis dahin liegt der Rohstream auf git.maiwald.work.'}
            </div>
          </div>

          <section>
            <h3 className="text-green-400 font-mono text-sm uppercase tracking-wider mb-3">
              {isEN ? '▸ PLANNED FEEDS' : '▸ GEPLANTE FEEDS'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {feeds.map((f) => (
                <div
                  key={f.key}
                  className="p-3 rounded border border-green-500/20 bg-black/30 text-center"
                >
                  <div className="font-mono text-sm text-green-300">{f.label}</div>
                  <div className="text-gray-500 text-xs mt-1 font-mono">— pending —</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-green-400 font-mono text-sm uppercase tracking-wider mb-3">
              {isEN ? '▸ FORMAT (WHEN LIVE)' : '▸ FORMAT (SOBALD LIVE)'}
            </h3>
            <p className="text-gray-300 text-sm md:text-base">
              {isEN
                ? 'Concise entries. What shipped, what broke, what got ported. No "we" where "I" is the truth.'
                : 'Knappe Einträge. Was ausgeliefert wurde, was kaputtging, was portiert wurde. Kein "wir", wenn "ich" die Wahrheit ist.'}
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
};
