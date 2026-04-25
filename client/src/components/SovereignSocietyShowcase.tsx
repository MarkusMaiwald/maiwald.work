import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../hooks/useLanguage';
import {
  sovereignSocietyMission,
  sovereignSocietyProperties,
  type SsProperty,
  type SsTier,
} from '../data/sovereignSociety';

interface SovereignSocietyShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
}

const TIER_LABELS: Record<SsTier, { EN: string; DE: string }> = {
  philosophical: { EN: 'TIER 1 — PHILOSOPHICAL', DE: 'TIER 1 — PHILOSOPHISCH' },
  academic: { EN: 'TIER 2 — ACADEMIC', DE: 'TIER 2 — AKADEMISCH' },
  tooling: { EN: 'TIER 3 — TOOLING', DE: 'TIER 3 — WERKZEUGE' },
};

const TIER_ORDER: SsTier[] = ['philosophical', 'academic', 'tooling'];

const GOLD = 'var(--cyberpunk-gold)';
const GOLD_BORDER_30 = 'rgba(245, 184, 0, 0.3)';
const GOLD_BORDER_70 = 'rgba(245, 184, 0, 0.7)';
const GOLD_TINT_10 = 'rgba(245, 184, 0, 0.1)';
const BLUE = 'var(--cyberpunk-electric-blue)';
const BLUE_BORDER_30 = 'rgba(0, 212, 255, 0.3)';
const BLUE_TINT_10 = 'rgba(0, 212, 255, 0.1)';

const hostnameOf = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

function PropertyCard({
  prop,
  currentLanguage,
}: {
  prop: SsProperty;
  currentLanguage: Language;
}) {
  const isEN = currentLanguage === 'EN';

  const handleProjectSiblingClick = (e: React.MouseEvent, projectId: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.dispatchEvent(
      new CustomEvent('openProjectShowcase', { detail: { projectId } }),
    );
  };

  return (
    <div
      className="p-4 rounded-lg bg-black/30 transition-colors flex flex-col gap-3 border"
      style={{ borderColor: GOLD_BORDER_30 }}
    >
      {/* Name + external-link arrow */}
      <div className="flex items-baseline justify-between gap-3">
        <h4 className="font-mono text-base md:text-lg font-bold" style={{ color: GOLD }}>
          {prop.name}
        </h4>
        <a
          href={prop.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-mono"
          style={{ color: GOLD }}
          aria-label={isEN ? `Open ${prop.name}` : `${prop.name} öffnen`}
        >
          ↗
        </a>
      </div>

      {/* Tier (subtle), role badges, optional projectSibling */}
      <div className="flex flex-wrap gap-2 text-[10px] font-mono uppercase tracking-wider items-center">
        <span style={{ color: 'var(--cyberpunk-text-dim)' }}>
          {/* "PHILOSOPHICAL" / "ACADEMIC" / "TOOLING" — drop the "TIER N — " prefix here, the section header has it */}
          {TIER_LABELS[prop.tier][currentLanguage].split(' — ')[1]}
        </span>
        {prop.roles.map((role) => (
          <span
            key={role}
            className="px-1.5 py-0.5 rounded border"
            style={{ color: GOLD, borderColor: GOLD_BORDER_30, backgroundColor: GOLD_TINT_10 }}
          >
            {role}
          </span>
        ))}
        {prop.projectSibling && (
          <button
            onClick={(e) => handleProjectSiblingClick(e, prop.projectSibling!)}
            className="px-1.5 py-0.5 rounded border hover:opacity-90 transition-opacity"
            style={{ color: BLUE, borderColor: BLUE_BORDER_30, backgroundColor: BLUE_TINT_10 }}
            title={isEN ? 'Open the technical project' : 'Technisches Projekt öffnen'}
          >
            {isEN ? `Project ↔ ${prop.projectSibling} →` : `Projekt ↔ ${prop.projectSibling} →`}
          </button>
        )}
      </div>

      {/* Blurb */}
      <p className="text-sm leading-relaxed" style={{ color: 'var(--cyberpunk-text)' }}>
        {prop.blurb[currentLanguage]}
      </p>

      {/* Status (italic, dim) */}
      {prop.status && (
        <div className="text-xs italic font-mono" style={{ color: 'var(--cyberpunk-text-dim)' }}>
          ▸ {prop.status[currentLanguage]}
        </div>
      )}

      {/* Featured items */}
      {prop.featured && prop.featured.length > 0 && (
        <div className="border-t pt-2" style={{ borderColor: GOLD_BORDER_30 }}>
          <div
            className="text-[10px] font-mono uppercase tracking-wider mb-1"
            style={{ color: 'var(--cyberpunk-text-dim)' }}
          >
            {isEN ? 'Featured' : 'Hervorgehoben'}
          </div>
          <ul className="space-y-1">
            {prop.featured.map((item) => (
              <li key={item.href} className="font-mono text-xs" style={{ color: 'var(--cyberpunk-text)' }}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{ color: GOLD }}
                >
                  → {item.title}
                </a>
                {item.note && (
                  <span style={{ color: 'var(--cyberpunk-text-dim)' }}> · {item.note[currentLanguage]}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Canonical-home link, bottom-right */}
      <div className="text-right text-xs font-mono">
        <a
          href={prop.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-90"
          style={{ color: GOLD }}
        >
          {hostnameOf(prop.url)} ↗
        </a>
      </div>
    </div>
  );
}

export const SovereignSocietyShowcase: React.FC<SovereignSocietyShowcaseProps> = ({
  isOpen,
  onClose,
  currentLanguage,
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

  const propsByTier: Record<SsTier, SsProperty[]> = {
    philosophical: [],
    academic: [],
    tooling: [],
  };
  for (const p of sovereignSocietyProperties) propsByTier[p.tier].push(p);

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto border"
        style={{ borderColor: 'rgba(245, 184, 0, 0.4)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="relative p-6 md:p-8 bg-gradient-to-r from-yellow-900/10 to-transparent border-b"
          style={{ borderColor: 'rgba(245, 184, 0, 0.3)' }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-xl font-mono"
            style={{ color: GOLD }}
            aria-label="Close"
          >
            [X]
          </button>
          <div
            className="font-mono text-xs uppercase tracking-wide mb-2"
            style={{ color: GOLD }}
          >
            sovereign-society.dat
          </div>
          <h2
            className="text-2xl md:text-4xl font-bold mb-1 font-mono"
            style={{ color: GOLD }}
          >
            SOVEREIGN SOCIETY SAE
          </h2>
          <div
            className="font-mono text-sm md:text-base mb-3"
            style={{ color: 'var(--cyberpunk-text-dim)' }}
          >
            Libertaria Foundation ·{' '}
            <a
              href="https://sovereign-society.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: GOLD }}
            >
              sovereign-society.org
            </a>
          </div>
          <p className="text-sm md:text-base max-w-3xl" style={{ color: 'var(--cyberpunk-text)' }}>
            {sovereignSocietyMission[currentLanguage]}
          </p>
        </div>

        {/* Tiered cards */}
        <div className="p-6 md:p-8 space-y-8">
          {TIER_ORDER.map((tier) => (
            <section key={tier}>
              <h3
                className="font-mono text-sm uppercase tracking-wider mb-3"
                style={{ color: GOLD }}
              >
                ▸ {TIER_LABELS[tier][currentLanguage]}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {propsByTier[tier].map((p) => (
                  <PropertyCard key={p.id} prop={p} currentLanguage={currentLanguage} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer CTAs */}
        <div
          className="p-6 md:p-8 border-t bg-black/30"
          style={{ borderColor: 'rgba(245, 184, 0, 0.2)' }}
        >
          <div className="flex flex-wrap gap-3 justify-between items-center">
            <a
              href="https://sovereign-society.org/membership"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 font-mono text-xs md:text-sm font-bold uppercase border rounded hover:opacity-90 transition-opacity"
              style={{ color: GOLD, borderColor: GOLD, backgroundColor: GOLD_TINT_10 }}
            >
              {isEN ? 'Membership →' : 'Mitgliedschaft →'}
            </a>
            <a
              href="mailto:markus@maiwald.work?subject=Sovereign%20Society"
              className="px-4 py-2 font-mono text-xs md:text-sm font-bold uppercase border rounded hover:opacity-90 transition-opacity"
              style={{ color: GOLD, borderColor: GOLD, backgroundColor: GOLD_TINT_10 }}
            >
              {isEN ? 'Pitch the Foundation →' : 'Foundation pitchen →'}
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
