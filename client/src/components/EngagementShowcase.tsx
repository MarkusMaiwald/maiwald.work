import React from 'react';
import { motion } from 'framer-motion';
import { Ban, Handshake, Sparkles, Users, Target, Scale } from 'lucide-react';
import { Language } from '../hooks/useLanguage';

interface EngagementShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
  onOpenContact?: () => void;
}

export const EngagementShowcase: React.FC<EngagementShowcaseProps> = ({
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

  const openTo = isEN
    ? [
        { icon: Handshake, title: 'Co-founder', desc: 'Founding-level equity, long horizon.' },
        { icon: Scale, title: 'Equity-based Advisor', desc: 'Board seats paid in equity or tokens.' },
        { icon: Target, title: 'Strategic Partner', desc: 'Architecture + delivery paid in ownership.' },
        { icon: Sparkles, title: 'Investment-backed Architect', desc: 'Paid from the cap table, not a retainer.' },
        { icon: Users, title: 'Project Rescue', desc: 'Turnaround engagements: equity + success fee.' },
        { icon: Handshake, title: 'Revenue-share Partnerships', desc: 'On products where my contribution is structural.' },
      ]
    : [
        { icon: Handshake, title: 'Mitgründer', desc: 'Gründungsebene-Equity, langer Horizont.' },
        { icon: Scale, title: 'Equity-basierter Advisor', desc: 'Beiratssitze, bezahlt in Equity oder Token.' },
        { icon: Target, title: 'Strategischer Partner', desc: 'Architektur + Delivery, in Eigentum bezahlt.' },
        { icon: Sparkles, title: 'Investment-gestützter Architekt', desc: 'Bezahlung aus dem Cap-Table, nicht per Retainer.' },
        { icon: Users, title: 'Projekt-Rettung', desc: 'Turnaround-Engagements: Equity plus Erfolgsanteil.' },
        { icon: Handshake, title: 'Revenue-Share-Partnerschaften', desc: 'Bei Produkten, zu denen mein Beitrag strukturell ist.' },
      ];

  const notTo = isEN
    ? [
        'Hourly consulting',
        'Fixed-monthly retainers (incl. €1,500/mo CTO-as-a-service)',
        'Bodyshopping / agency middleware',
        '"Fractional CTO" theatre without ownership',
        'Exclusive availability without cap-table recognition',
        'Projects I cannot publicly align with',
      ]
    : [
        'Beratung auf Stundenbasis',
        'Feste monatliche Retainer (inkl. 1.500-€/Monat-CTO-as-a-Service)',
        'Bodyshopping / Agentur-Zwischenschicht',
        '"Fractional CTO"-Theater ohne Eigentum',
        'Exklusivität ohne Cap-Table-Anerkennung',
        'Projekte, mit denen ich mich nicht öffentlich identifizieren kann',
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
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto border border-cyan-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 md:p-8 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border-b border-cyan-500/30">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-cyan-400 hover:text-cyan-200 text-xl font-mono"
            aria-label="Close"
          >
            [X]
          </button>
          <div className="text-cyan-400 font-mono text-xs uppercase tracking-wide mb-2">
            engagement.dat
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-cyan-300 mb-2 font-mono">
            {isEN ? 'I DON\'T RENT MY BRAIN. I INVEST IT.' : 'ICH VERMIETE MEIN HIRN NICHT. ICH INVESTIERE ES.'}
          </h2>
          <p className="text-gray-300 text-sm md:text-base max-w-3xl">
            {isEN
              ? 'No hourly. No fixed monthly retainers. No fractional-CTO theatre. The filter is the feature.'
              : 'Keine Stundensätze. Keine festen monatlichen Retainer. Kein Fractional-CTO-Theater. Der Filter ist das Feature.'}
          </p>
        </div>

        {/* Open to */}
        <div className="p-6 md:p-8 border-b border-cyan-500/20">
          <h3 className="text-cyan-400 font-mono text-sm uppercase tracking-wider mb-4">
            {isEN ? '▸ WHAT I AM OPEN TO' : '▸ WAS OFFEN IST'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {openTo.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-4 rounded-lg border border-cyan-500/20 bg-black/30 hover:border-cyan-400/60 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-5 h-5 text-cyan-400" />
                  <div className="font-mono text-sm font-bold text-cyan-300">{title}</div>
                </div>
                <div className="text-gray-300 text-xs md:text-sm leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Not to */}
        <div className="p-6 md:p-8 border-b border-cyan-500/20">
          <h3 className="text-pink-400 font-mono text-sm uppercase tracking-wider mb-4">
            {isEN ? '▸ WHAT I WON\'T DO' : '▸ WAS ICH NICHT MACHE'}
          </h3>
          <ul className="space-y-2">
            {notTo.map((line) => (
              <li key={line} className="flex items-start gap-3 text-sm md:text-base text-gray-200">
                <Ban className="w-4 h-4 text-pink-400 flex-shrink-0 mt-1" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="p-6 md:p-8">
          <div className="font-mono text-sm text-gray-400 mb-3">
            {isEN ? '> Bring equity, vision, or both.' : '> Bring Equity, Vision oder beides mit.'}
          </div>
          <div className="font-mono text-xs md:text-sm text-gray-500 mb-6">
            {isEN
              ? 'If this page reads as "hostile", you are the wrong founder. If it reads as "finally", introduce yourself.'
              : 'Wenn diese Seite "feindselig" klingt, bist du der falsche Gründer. Wenn sie "endlich" klingt, stell dich vor.'}
          </div>
          <button
            onClick={() => {
              if (onOpenContact) onOpenContact();
              onClose();
            }}
            className="w-full md:w-auto px-6 py-3 font-mono text-sm font-bold uppercase bg-cyan-500/10 border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-500/20 transition-colors rounded"
          >
            {isEN ? 'Pitch me →' : 'Pitche mich →'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
