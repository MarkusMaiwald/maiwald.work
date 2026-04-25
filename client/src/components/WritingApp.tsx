import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../hooks/useLanguage';

interface WritingAppProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
}

interface Piece {
  key: string;
  title: string;
  kind: string;
  blurbEN: string;
  blurbDE: string;
  status: 'draft' | 'wip' | 'public';
}

const pieces: Piece[] = [
  {
    key: 'federation-axioms',
    title: 'Federation Axioms',
    kind: 'manifesto',
    blurbEN: "Libertaria's foundational axiom set. Kenya Rule, Exit Always, Capsule Doctrine, Protocol vs. Chapter. The constitution-as-physics.",
    blurbDE: 'Libertarias grundlegendes Axiomenset. Kenia-Regel, Exit Immer, Kapsel-Doktrin, Protokoll vs. Chapter. Die Verfassung-als-Physik.',
    status: 'wip',
  },
  {
    key: 'skh-paper',
    title: 'SKH — Soul Key Hash',
    kind: 'paper',
    blurbEN: 'Academic treatment of post-quantum identity in the Libertaria stack. Hybrid ED25519 + X25519 + ML-KEM-768 construction, threat model, migration.',
    blurbDE: 'Akademische Behandlung post-quantischer Identität im Libertaria-Stack. Hybride ED25519- + X25519- + ML-KEM-768-Konstruktion, Bedrohungsmodell, Migration.',
    status: 'draft',
  },
  {
    key: 'wigy',
    title: 'Wigy',
    kind: 'essay',
    blurbEN: 'Why "generic you" is a failure mode of modern tooling and software design. Personhood, not persona.',
    blurbDE: 'Warum das "generische Du" ein Fehlermodus moderner Tooling- und Software-Gestaltung ist. Persönlichkeit, keine Persona.',
    status: 'draft',
  },
  {
    key: 'die-fabrik',
    title: 'die_fabrik',
    kind: 'fiction',
    blurbEN: 'A plant worker in a near-future post-state city discovers the plant is also the polity. Short-form; ongoing.',
    blurbDE: 'Ein Arbeiter in einer post-staatlichen Stadt der nahen Zukunft entdeckt, dass die Fabrik gleichzeitig das Gemeinwesen ist. Kurzform; fortlaufend.',
    status: 'wip',
  },
  {
    key: 'op-eds',
    title: 'Op-Eds & Correspondence',
    kind: 'misc',
    blurbEN: 'Occasional pieces on post-state governance, sovereign infrastructure, and why most crypto is just banking in a hoodie.',
    blurbDE: 'Gelegentliche Beiträge zu post-staatlicher Governance, souveräner Infrastruktur und warum die meiste Crypto nur Banking im Hoodie ist.',
    status: 'wip',
  },
];

const statusLabelEN: Record<Piece['status'], string> = {
  draft: 'DRAFT',
  wip: 'WIP',
  public: 'PUBLIC',
};
const statusLabelDE: Record<Piece['status'], string> = {
  draft: 'ENTWURF',
  wip: 'WIP',
  public: 'ÖFFENTLICH',
};

export const WritingApp: React.FC<WritingAppProps> = ({ isOpen, onClose, currentLanguage }) => {
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
  const statusLabel = isEN ? statusLabelEN : statusLabelDE;

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
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-purple-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6 md:p-8 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border-b border-purple-500/30">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-purple-400 hover:text-purple-200 text-xl font-mono"
            aria-label="Close"
          >
            [X]
          </button>
          <div className="text-purple-400 font-mono text-xs uppercase tracking-wide mb-2">
            writing.dat
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-purple-300 mb-2 font-mono">
            WRITING
          </h2>
          <p className="text-gray-300 text-sm md:text-base">
            {isEN
              ? 'Essays, axioms, manifestos, fiction. Deep-linking comes with v2.'
              : 'Essays, Axiome, Manifeste, Fiktion. Deep-Linking kommt mit v2.'}
          </p>
        </div>

        <div className="p-6 md:p-8 space-y-3">
          {pieces.map((p) => (
            <div
              key={p.key}
              className="p-4 rounded-lg border border-purple-500/20 bg-black/30 hover:border-purple-400/60 transition-colors"
            >
              <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm md:text-base font-bold text-purple-300">
                    {p.title}
                  </span>
                  <span className="font-mono text-xs text-gray-500 uppercase">
                    {p.kind}
                  </span>
                </div>
                <span
                  className={`font-mono text-xs px-2 py-0.5 rounded border ${
                    p.status === 'public'
                      ? 'border-green-500/50 text-green-400'
                      : p.status === 'wip'
                        ? 'border-purple-500/50 text-purple-300'
                        : 'border-gray-500/50 text-gray-400'
                  }`}
                >
                  {statusLabel[p.status]}
                </span>
              </div>
              <div className="text-gray-300 text-sm leading-relaxed">
                {isEN ? p.blurbEN : p.blurbDE}
              </div>
            </div>
          ))}

          <div className="mt-6 pt-4 border-t border-purple-500/20 text-center text-xs font-mono text-gray-500">
            {isEN ? 'Want an early read? ping markus@maiwald.work.' : 'Möchtest du früh lesen? ping markus@maiwald.work.'}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
