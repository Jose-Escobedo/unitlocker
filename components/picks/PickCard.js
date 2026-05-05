'use client';

import { useState } from 'react';
import { Crosshair, CircleDot, Dribbble, Sword, Users } from 'lucide-react';

const SPORT_CONFIG = {
  CS2: { label: 'CS2', color: '#ff6b35', bg: '#ff6b3518', Icon: Crosshair },
  NBA: { label: 'NBA', color: '#00e5a0', bg: '#00e5a018', Icon: Dribbble },
  NHL: { label: 'NHL', color: '#4da6ff', bg: '#4da6ff18', Icon: CircleDot },
  MLB: { label: 'MLB', color: '#f5c842', bg: '#f5c84218', Icon: Sword },
};

const CONFIDENCE_LABELS = ['', 'Risky', 'Lean', 'Solid', 'Strong', 'Lock'];

function FireIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c-.5 2-2 3.5-3.5 5C7 8.5 6 10 6 12c0 3.3 2.7 6 6 6s6-2.7 6-6c0-1.5-.5-2.8-1.3-3.8C15.5 7 14 5.5 12 2z" />
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ArrowIcon({ direction }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      {direction === 'Over'
        ? <polyline points="18 15 12 9 6 15" />
        : <polyline points="6 9 12 15 18 9" />}
    </svg>
  );
}

export default function PickCard({ pick }) {
  const [calcOpen, setCalcOpen] = useState(false);
  const [bankroll, setBankroll] = useState('');

  const sport = SPORT_CONFIG[pick.sport] ?? SPORT_CONFIG.CS2;
  const isOver = pick.prediction === 'Over';
  const predColor = isOver ? '#00e5a0' : '#ff4757';

  const unitSuggested =
    bankroll && !isNaN(Number(bankroll))
      ? ((Number(bankroll) / 100) * pick.confidence).toFixed(2)
      : null;

  return (
    <article
      className="relative rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
      style={{
        background: '#202228',
        border: '1px solid #2a2f3a',
        boxShadow: pick.isHot ? `0 0 20px ${sport.color}22` : 'none',
      }}
    >
      {/* top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: sport.color }} />

      <div className="p-4 sm:p-5">
        {/* header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {/* sport badge */}
            <span
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-bold tracking-wider"
              style={{ background: sport.bg, color: sport.color, fontFamily: "'DM Mono', monospace" }}
            >
              <sport.Icon size={11} strokeWidth={2.5} />
              {sport.label}
            </span>
            {/* hot badge */}
            {pick.isHot && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold tracking-wider"
                style={{ background: '#ff6b3522', color: '#ff6b35', fontFamily: "'DM Mono', monospace" }}
              >
                <FireIcon /> HOT
              </span>
            )}
            {/* community badge */}
            {pick.source === 'community' && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold tracking-wider"
                style={{ background: '#4da6ff18', color: '#4da6ff', fontFamily: "'DM Mono', monospace" }}
              >
                <Users size={10} strokeWidth={2.5} /> COMMUNITY
              </span>
            )}
          </div>
          {/* confidence dots */}
          <div className="flex items-center gap-1 flex-shrink-0" title={`Confidence: ${CONFIDENCE_LABELS[pick.confidence]}`}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: i <= pick.confidence ? sport.color : '#2a2f3a' }}
              />
            ))}
          </div>
        </div>

        {/* player + pick */}
        <div className="flex items-center justify-between gap-4 mb-2">
          <div>
            <div
              className="text-lg font-bold leading-tight"
              style={{ color: '#f0f2f5', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}
            >
              {pick.playerName}
            </div>
            <div
              className="text-xs mt-0.5"
              style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}
            >
              {pick.team} · {pick.matchup}
            </div>
          </div>

          {/* line + prediction */}
          <div className="text-right flex-shrink-0">
            <div
              className="flex items-center justify-end gap-1.5"
              style={{ color: predColor }}
            >
              <ArrowIcon direction={pick.prediction} />
              <span
                className="text-2xl font-black leading-none"
                style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.03em' }}
              >
                {pick.line}
              </span>
            </div>
            <div
              className="text-xs font-semibold tracking-wider mt-0.5"
              style={{ color: predColor, fontFamily: "'DM Mono', monospace" }}
            >
              {pick.prediction.toUpperCase()} {pick.stat.toUpperCase()}
            </div>
          </div>
        </div>

        {/* notes */}
        {pick.notes && (
          <p
            className="text-xs leading-relaxed mb-3 border-l-2 pl-3"
            style={{ color: '#7a8494', borderColor: sport.color, fontFamily: "'DM Mono', monospace" }}
          >
            {pick.notes}
          </p>
        )}

        {/* unit calculator accordion */}
        <div
          className="mt-3 rounded-xl overflow-hidden"
          style={{ background: '#181c22', border: '1px solid #2a2f3a' }}
        >
          <button
            onClick={() => setCalcOpen((v) => !v)}
            className="w-full flex items-center justify-between px-3 py-2 text-left"
            style={{ color: '#5a6474' }}
          >
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Unit Calculator
            </span>
            <ChevronIcon open={calcOpen} />
          </button>

          {calcOpen && (
            <div className="px-3 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>$</span>
                <input
                  type="number"
                  placeholder="Bankroll"
                  value={bankroll}
                  onChange={(e) => setBankroll(e.target.value)}
                  className="flex-1 bg-transparent text-sm outline-none min-w-0"
                  style={{
                    color: '#f0f2f5',
                    borderBottom: '1px solid #2a2f3a',
                    paddingBottom: '4px',
                    fontFamily: "'DM Mono', monospace",
                  }}
                />
              </div>
              {unitSuggested && (
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>
                    {pick.confidence}u suggested
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: sport.color, fontFamily: "'DM Mono', monospace" }}
                  >
                    ${unitSuggested}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* CTA */}
        {pick.bookieUrl ? (
          <a
            href={pick.bookieUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-150 active:scale-95"
            style={{
              background: sport.color,
              color: '#0a0c0f',
              fontFamily: "'Inter', sans-serif",
              boxShadow: `0 4px 20px ${sport.color}44`,
            }}
          >
            Lock Pick
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </a>
        ) : (
          <div
            className="mt-3 flex items-center justify-center w-full py-2.5 rounded-xl font-bold text-sm tracking-wide"
            style={{
              background: `${sport.color}18`,
              color: sport.color,
              border: `1px solid ${sport.color}33`,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Pick Posted
          </div>
        )}
      </div>
    </article>
  );
}
