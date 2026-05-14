'use client';

import { useState } from 'react';
import { Crosshair, CircleDot, Dribbble, Sword, BarChart2 } from 'lucide-react';
import StatsModal from './StatsModal';

const SPORT_CONFIG = {
  CS2: { label: 'CS2', color: '#ff6b35', secondary: '#cc3d10', glow: 'rgba(255,107,53,0.35)', bg: '#ff6b3518', Icon: Crosshair },
  NBA: { label: 'NBA', color: '#00e5a0', secondary: '#00a878', glow: 'rgba(0,229,160,0.35)', bg: '#00e5a018', Icon: Dribbble },
  NHL: { label: 'NHL', color: '#4da6ff', secondary: '#1a75e0', glow: 'rgba(77,166,255,0.35)', bg: '#4da6ff18', Icon: CircleDot },
  MLB: { label: 'MLB', color: '#f5c842', secondary: '#c49a1a', glow: 'rgba(245,200,66,0.35)', bg: '#f5c84218', Icon: Sword },
};

const STATS_CONFIG = [
  { key: 'avgL10', label: 'Avg L10' },
  { key: 'diff',   label: 'Diff'    },
  { key: 'l5',     label: 'L5'      },
  { key: 'l10',    label: 'L10'     },
  { key: 'h2h',    label: 'H2H'     },
];

function FireIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c-.5 2-2 3.5-3.5 5C7 8.5 6 10 6 12c0 3.3 2.7 6 6 6s6-2.7 6-6c0-1.5-.5-2.8-1.3-3.8C15.5 7 14 5.5 12 2z" />
    </svg>
  );
}

function ArrowIcon({ direction }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      {direction === 'Over'
        ? <path d="M12 19V5M5 12l7-7 7 7" />
        : <path d="M12 5v14M5 12l7 7 7-7" />}
    </svg>
  );
}


function StatsGrid({ stats }) {
  const cols = STATS_CONFIG.filter(s => stats[s.key] != null);
  if (cols.length === 0) return null;

  return (
    <div style={{
      borderRadius: 10,
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.06)',
    }}>
      {/* Header row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols.length}, 1fr)`,
        background: 'rgba(255,255,255,0.03)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        {cols.map((s, i) => (
          <div key={s.key} style={{
            padding: '6px 4px',
            textAlign: 'center',
            fontSize: 9.5,
            fontWeight: 500,
            letterSpacing: '0.07em',
            color: 'rgba(245,246,248,0.4)',
            fontFamily: "'DM Mono', monospace",
            borderRight: i < cols.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
          }}>
            {s.label}
          </div>
        ))}
      </div>

      {/* Value row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols.length}, 1fr)`,
      }}>
        {cols.map((s, i) => {
          const val = stats[s.key];
          const isPercent = typeof val === 'string' && val.includes('%');
          return (
            <div key={s.key} style={{
              padding: '9px 4px',
              textAlign: 'center',
              fontSize: 13,
              fontWeight: 600,
              color: isPercent ? '#00e5a0' : '#f5f6f8',
              fontFamily: "'DM Mono', monospace",
              background: isPercent
                ? 'linear-gradient(180deg, rgba(0,229,160,0.12) 0%, rgba(0,229,160,0.04) 100%)'
                : 'transparent',
              borderRight: i < cols.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            }}>
              {val}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function PickCard({ pick }) {
  const [hovered, setHovered] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);
  const hasHistory = pick.stats?.history?.length > 0;

  const sport = SPORT_CONFIG[pick.sport] ?? SPORT_CONFIG.CS2;
  const isOver = pick.prediction === 'Over';
  const predColor = isOver ? '#00e5a0' : '#ff4757';

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: 18,
        background: 'rgba(20, 22, 28, 0.55)',
        backdropFilter: 'blur(14px) saturate(140%)',
        WebkitBackdropFilter: 'blur(14px) saturate(140%)',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: hovered
          ? `0 1px 0 rgba(255,255,255,0.06) inset, 0 0 0 1px rgba(255,255,255,0.06) inset, 0 28px 70px -20px rgba(0,0,0,0.8), 0 0 40px -10px ${sport.glow}`
          : `0 1px 0 rgba(255,255,255,0.04) inset, 0 0 0 1px rgba(255,255,255,0.04) inset, 0 24px 60px -20px rgba(0,0,0,0.7)`,
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      }}
    >
      {/* Gradient border glow */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 'inherit',
        padding: 1,
        background: `linear-gradient(135deg, ${sport.color}, transparent 40%, transparent 60%, ${sport.secondary})`,
        WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
        mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        opacity: 0.55,
        pointerEvents: 'none',
      }} />

      {/* Top glow radial */}
      <div style={{
        position: 'absolute', inset: -1, borderRadius: 'inherit',
        background: `radial-gradient(60% 80% at 50% 0%, ${sport.glow}, transparent 60%)`,
        opacity: 0.5, pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Header: badges + confidence */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'inline-flex', gap: 6, flexWrap: 'wrap' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '4px 9px', borderRadius: 999,
              fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em',
              background: 'rgba(255,255,255,0.04)',
              color: 'rgba(245,246,248,0.78)',
              border: '1px solid rgba(255,255,255,0.06)',
              fontFamily: "'DM Mono', monospace",
            }}>
              <sport.Icon size={11} strokeWidth={2.5} />
              {sport.label}
            </span>
            {pick.isHot && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '4px 9px', borderRadius: 999,
                fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em',
                background: 'rgba(255,107,53,0.16)',
                color: 'oklch(0.88 0.15 65)',
                border: '1px solid rgba(255,107,53,0.32)',
                boxShadow: '0 0 14px rgba(255,107,53,0.18)',
                fontFamily: "'DM Mono', monospace",
              }}>
                <FireIcon /> HOT
              </span>
            )}
          </div>
        </div>

        {/* Body: player + stat */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'flex-start' }}>
          <div>
            <h3 style={{
              margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.015em',
              color: '#f5f6f8', fontFamily: "'Inter', sans-serif",
            }}>
              {pick.playerName}
            </h3>
            <p style={{
              margin: '4px 0 0', fontSize: 12.5,
              color: 'rgba(245,246,248,0.55)',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: "'DM Sans', sans-serif",
            }}>
              <span style={{ color: 'rgba(245,246,248,0.78)', fontWeight: 500 }}>{pick.team}</span>
              <span style={{ color: 'rgba(245,246,248,0.18)' }}>·</span>
              <span>{pick.matchup}</span>
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2, textAlign: 'right' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              fontSize: 10.5, fontWeight: 600, color: predColor, letterSpacing: '0.1em',
              fontFamily: "'DM Mono', monospace",
            }}>
              <ArrowIcon direction={pick.prediction} />
              <span>{pick.prediction.toUpperCase()}</span>
            </div>
            <div style={{
              fontSize: 32, fontWeight: 600, color: predColor,
              letterSpacing: '-0.015em', lineHeight: 1,
              textShadow: isOver ? '0 0 18px rgba(0,229,160,0.35)' : '0 0 18px rgba(255,71,87,0.35)',
              fontFamily: "'DM Mono', monospace",
            }}>
              {pick.line}
            </div>
            <div style={{
              fontSize: 10.5, fontWeight: 500, color: 'rgba(245,246,248,0.55)',
              letterSpacing: '0.1em', fontFamily: "'DM Mono', monospace",
            }}>
              {pick.stat.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Notes + Stats */}
        {pick.notes && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{
              position: 'relative',
              padding: '10px 12px 10px 16px',
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 10,
            }}>
              <div style={{
                position: 'absolute', left: 0, top: 8, bottom: 8, width: 2,
                background: `linear-gradient(180deg, ${sport.color}, transparent)`,
                borderRadius: 2,
                boxShadow: `0 0 6px ${sport.glow}`,
              }} />
              <p style={{
                margin: 0, fontSize: 12, color: 'rgba(245,246,248,0.78)',
                lineHeight: 1.55, fontFamily: "'DM Mono', monospace",
              }}>
                {pick.notes}
              </p>
            </div>

            {pick.stats && <StatsGrid stats={pick.stats} />}
          </div>
        )}

        {/* View history button */}
        {hasHistory && (
          <button
            onClick={() => setStatsOpen(true)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
              width: '100%', padding: '10px',
              background: 'transparent',
              border: `1px solid rgba(255,255,255,0.07)`,
              borderRadius: 10,
              cursor: 'pointer',
              fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
              color: 'rgba(245,246,248,0.4)',
              fontFamily: "'DM Mono', monospace",
              transition: 'all .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `${sport.color}60`; e.currentTarget.style.color = sport.color; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(245,246,248,0.4)'; }}
          >
            <BarChart2 size={12} strokeWidth={2} />
            VIEW PLAYER HISTORY
          </button>
        )}

        {statsOpen && <StatsModal pick={pick} onClose={() => setStatsOpen(false)} />}
      </div>
    </article>
  );
}
