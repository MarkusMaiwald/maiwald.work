import React from 'react';
import { Language } from '../hooks/useLanguage';
import { devlogEntries } from '../data/devlog';

interface DevlogWidgetProps {
  currentLanguage: Language;
}

const GREEN = 'var(--cyberpunk-acid-green)';
const DIM = 'var(--cyberpunk-text-dim)';
const TEXT = 'var(--cyberpunk-text)';

/**
 * Compact desktop preview of the latest devlog entry. Sits below the Terminal.
 * Click anywhere on the widget dispatches `openDevlog` — Desktop already listens
 * for that event and opens the full DevlogApp modal. No new wiring required.
 */
export const DevlogWidget: React.FC<DevlogWidgetProps> = ({ currentLanguage }) => {
  const latest = devlogEntries[0];
  if (!latest) return null;

  const isEN = currentLanguage === 'EN';

  const open = () => {
    window.dispatchEvent(new CustomEvent('openDevlog'));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={onKeyDown}
      title={isEN ? 'Open the full devlog' : 'Vollständiges Devlog öffnen'}
      className="cursor-pointer p-3 md:p-4 rounded-lg border bg-black/40 hover:bg-black/60 transition-colors"
      style={{ borderColor: 'rgba(57, 255, 20, 0.3)' }}
    >
      <div className="flex items-baseline justify-between gap-3 mb-1">
        <div className="flex items-baseline gap-2 text-[10px] md:text-xs font-mono uppercase tracking-wider min-w-0">
          <span style={{ color: GREEN }}>devlog</span>
          <span style={{ color: DIM }}>·</span>
          <span style={{ color: DIM }}>{latest.date}</span>
          <span style={{ color: DIM }}>·</span>
          <span style={{ color: GREEN }} className="truncate">
            [{latest.project}]
          </span>
        </div>
        <span className="text-[10px] md:text-xs font-mono shrink-0" style={{ color: DIM }}>
          {isEN ? 'open →' : 'öffnen →'}
        </span>
      </div>
      <div className="font-mono text-sm md:text-base font-bold leading-snug" style={{ color: TEXT }}>
        {latest.title[currentLanguage]}
      </div>
      <div
        className="text-xs md:text-sm leading-relaxed mt-1 line-clamp-2"
        style={{ color: DIM }}
      >
        {latest.summary[currentLanguage]}
      </div>
    </div>
  );
};
