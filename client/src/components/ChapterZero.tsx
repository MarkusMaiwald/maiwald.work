import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../hooks/useLanguage';

interface ChapterZeroProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
  onOpenContact?: () => void;
}

export const ChapterZero: React.FC<ChapterZeroProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onOpenContact,
}) => {
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

  const axioms = isEN
    ? [
        { name: 'Kenya Rule', desc: 'If a solar-powered phone in Mombasa cannot participate, the protocol fails.' },
        { name: 'Exit Always', desc: 'Exit is a constitutional right. Exit costs are bounded. Exit cannot be prevented.' },
        { name: 'Capsule Doctrine', desc: 'Default deny. Permissioned at the edge.' },
        { name: 'Protocol vs. Chapter', desc: 'Protocol is physics (immutable). Chapter is politics (changeable).' },
      ]
    : [
        { name: 'Kenia-Regel', desc: 'Wenn ein solarbetriebenes Telefon in Mombasa nicht teilnehmen kann, scheitert das Protokoll.' },
        { name: 'Exit Immer', desc: 'Exit ist ein verfassungsmäßiges Recht. Exit-Kosten sind begrenzt. Exit kann nicht verhindert werden.' },
        { name: 'Kapsel-Doktrin', desc: 'Standard-Verweigerung. Berechtigung am Rand.' },
        { name: 'Protokoll vs. Chapter', desc: 'Protokoll ist Physik (unveränderlich). Chapter ist Politik (veränderbar).' },
      ];

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
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-pink-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6 md:p-8 bg-gradient-to-r from-pink-600/20 to-purple-600/20 border-b border-pink-500/30">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-pink-400 hover:text-pink-200 text-xl font-mono"
            aria-label="Close"
          >
            [X]
          </button>
          <div className="text-pink-400 font-mono text-xs uppercase tracking-wide mb-2">
            chapter-zero.dat
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-pink-300 mb-2 font-mono">
            CHAPTER ZERO – LIBERTARIA
          </h2>
          <p className="text-gray-300 text-sm md:text-base">
            {isEN
              ? 'The genesis chapter. First living polity running on the Libertaria Protocol.'
              : 'Das Genesis-Chapter. Das erste lebende Gemeinwesen, das auf dem Libertaria-Protokoll läuft.'}
          </p>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          <section>
            <h3 className="text-pink-400 font-mono text-sm uppercase tracking-wider mb-3">
              {isEN ? '▸ WHAT CHAPTER ZERO IS' : '▸ WAS CHAPTER ZERO IST'}
            </h3>
            <p className="text-gray-200 leading-relaxed text-sm md:text-base">
              {isEN
                ? 'A federation of sovereign individuals coordinating through the Libertaria Protocol. Voluntary, exit-always, post-geographic. We set the operational rituals, cultural tone, and vetting bar that other chapters will inherit or reject.'
                : 'Eine Föderation souveräner Individuen, die über das Libertaria-Protokoll koordinieren. Freiwillig, Exit-immer, post-geografisch. Wir setzen die operativen Rituale, den kulturellen Ton und die Prüfhürde, die andere Chapter übernehmen oder ablehnen werden.'}
            </p>
          </section>

          <section>
            <h3 className="text-pink-400 font-mono text-sm uppercase tracking-wider mb-3">
              {isEN ? '▸ CORE AXIOMS' : '▸ KERN-AXIOME'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {axioms.map((a) => (
                <div
                  key={a.name}
                  className="p-4 rounded-lg border border-pink-500/20 bg-black/30"
                >
                  <div className="font-mono text-sm font-bold text-pink-300 mb-1">{a.name}</div>
                  <div className="text-gray-300 text-xs md:text-sm leading-relaxed">{a.desc}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-pink-400 font-mono text-sm uppercase tracking-wider mb-3">
              {isEN ? '▸ WHAT LEADERSHIP MEANS HERE' : '▸ WAS LEITUNG HIER BEDEUTET'}
            </h3>
            <p className="text-gray-200 leading-relaxed text-sm md:text-base">
              {isEN
                ? 'Not management. Stewardship. As Leader of Chapter ZERO, I set the vetting bar, run the onboarding ritual, and keep the chapter aligned with the protocol\'s axioms while it grows its own culture. I am accountable to the membership, not above it. (President-level work happens one floor up – at Sovereign Society SAE / Libertaria Foundation.)'
                : 'Kein Management. Stewardship. Als Leiter von Chapter ZERO setze ich die Prüfhürde, führe das Onboarding-Ritual und halte das Chapter mit den Axiomen des Protokolls ausgerichtet, während es seine eigene Kultur entwickelt. Ich bin der Mitgliedschaft gegenüber verantwortlich, nicht über ihr. (Präsidiale Arbeit findet eine Ebene höher statt – bei der Sovereign Society SAE / Libertaria Foundation.)'}
            </p>
          </section>

          <section className="border-t border-pink-500/20 pt-6">
            <h3 className="text-pink-400 font-mono text-sm uppercase tracking-wider mb-3">
              {isEN
                ? '▸ THINK YOU BELONG IN CHAPTER ZERO?'
                : '▸ GLAUBST DU, DU GEHÖRST IN CHAPTER ZERO?'}
            </h3>
            <p className="text-gray-300 text-sm md:text-base mb-4">
              {isEN
                ? 'Pitch me. This is not a signup form. It is an application to a sovereign polity.'
                : 'Pitche mich. Das ist kein Anmeldeformular. Es ist eine Bewerbung bei einem souveränen Gemeinwesen.'}
            </p>
            <button
              onClick={() => {
                if (onOpenContact) onOpenContact();
                onClose();
              }}
              className="w-full md:w-auto px-6 py-3 font-mono text-sm font-bold uppercase bg-pink-500/10 border-2 border-pink-400 text-pink-300 hover:bg-pink-500/20 transition-colors rounded"
            >
              {isEN ? 'Apply to Chapter ZERO →' : 'Bei Chapter ZERO bewerben →'}
            </button>
            <div className="text-xs font-mono text-gray-500 mt-3">
              {isEN
                ? 'subject: "Chapter ZERO" → markus@maiwald.work'
                : 'Betreff: "Chapter ZERO" → markus@maiwald.work'}
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
};
