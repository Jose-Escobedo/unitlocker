'use client';

import { useState } from 'react';
import { Crosshair, CircleDot, Dribbble, Sword, Users } from 'lucide-react';

const SPORT_CONFIG = {
  CS2: { label: 'CS2', color: '#ff6b35', secondary: '#cc3d10', glow: 'rgba(255,107,53,0.35)', bg: '#ff6b3518', Icon: Crosshair },
  NBA: { label: 'NBA', color: '#00e5a0', secondary: '#00a878', glow: 'rgba(0,229,160,0.35)', bg: '#00e5a018', Icon: Dribbble },
  NHL: { label: 'NHL', color: '#4da6ff', secondary: '#1a75e0', glow: 'rgba(77,166,255,0.35)', bg: '#4da6ff18', Icon: CircleDot },
  MLB: { label: 'MLB', color: '#f5c842', secondary: '#c49a1a', glow: 'rgba(245,200,66,0.35)', bg: '#f5c84218', Icon: Sword },
};

const CONFIDENCE_LABELS = ['', 'Risky', 'Lean', 'Solid', 'Strong', 'Lock'];
const UNIT_CHIPS = [0.5, 1, 1.5, 2, 3, 5];

function FireIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c-.5 2-2 3.5-3.5 5C7 8.5 6 10 6 12c0 3.3 2.7 6 6 6s6-2.7 6-6c0-1.5-.5-2.8-1.3-3.8C15.5 7 14 5.5 12 2z" />
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
      <polyline points="6 9 12 15 18 9" />
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

function ConfidenceBars({ value, color, glow }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }} aria-label={`Confidence ${value} of 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} style={{
          display: 'block',
          width: 4, height: 14,
          borderRadius: 2,
          background: i < value
            ? `linear-gradient(180deg, ${color}, ${glow.replace('0.35', '0.7')})`
            : 'rgba(255,255,255,0.08)',
          boxShadow: i < value ? `0 0 6px ${glow}` : 'none',
        }} />
      ))}
      <span style={{
        fontFamily: "'DM Mono', monospace", fontSize: 11,
        color: 'rgba(245,246,248,0.35)', marginLeft: 6,
      }}>
        {value}<small style={{ fontSize: 9, opacity: 0.6 }}>/5</small>
      </span>
    </div>
  );
}

export default function PickCard({ pick }) {
  const [calcOpen, setCalcOpen] = useState(false);
  const [units, setUnits] = useState(1);
  const [bankroll, setBankroll] = useState(1000);
  const [hovered, setHovered] = useState(false);

  const sport = SPORT_CONFIG[pick.sport] ?? SPORT_CONFIG.CS2;
  const isOver = pick.prediction === 'Over';
  const predColor = isOver ? '#00e5a0' : '#ff4757';

  // Unit calculator math
  const unitDollar = bankroll * 0.01;
  const stake = unitDollar * units;
  const odds = pick.odds || -110;
  const profit = odds > 0 ? stake * (odds / 100) : stake * (100 / Math.abs(odds));
  const payout = stake + profit;

  const stepUnits = (delta) =>
    setUnits((u) => Math.min(10, Math.max(0.5, +(u + delta).toFixed(1))));

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
            {pick.source === 'community' && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '4px 9px', borderRadius: 999,
                fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em',
                background: '#4da6ff18', color: '#4da6ff',
                border: '1px solid #4da6ff30',
                fontFamily: "'DM Mono', monospace",
              }}>
                <Users size={10} strokeWidth={2.5} /> COMMUNITY
              </span>
            )}
          </div>
          <ConfidenceBars value={pick.confidence} color={sport.color} glow={sport.glow} />
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

        {/* Notes */}
        {pick.notes && (
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
        )}

        {/* Unit Calculator */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <button
            onClick={() => setCalcOpen((v) => !v)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              width: '100%', padding: '11px 14px',
              background: calcOpen ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: calcOpen ? '10px 10px 0 0' : 10,
              borderBottomColor: calcOpen ? 'transparent' : 'rgba(255,255,255,0.06)',
              color: calcOpen ? '#f5f6f8' : 'rgba(245,246,248,0.78)',
              fontSize: 11, letterSpacing: '0.1em', fontWeight: 500,
              cursor: 'pointer', transition: 'all .2s',
              fontFamily: "'DM Mono', monospace",
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M4 19V10M10 19V5M16 19v-7M22 19H2" />
              </svg>
              UNIT CALCULATOR
            </span>
            <ChevronIcon open={calcOpen} />
          </button>

          <div style={{
            overflow: 'hidden',
            maxHeight: calcOpen ? 280 : 0,
            transition: 'max-height 0.3s ease',
          }}>
            <div style={{
              padding: 14,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderTop: '1px dashed rgba(255,255,255,0.10)',
              borderRadius: '0 0 10px 10px',
              display: 'flex', flexDirection: 'column', gap: 12,
            }}>
              {/* Stepper + Bankroll row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 10, padding: 3,
                }}>
                  <button
                    onClick={() => stepUnits(-0.5)}
                    style={{
                      width: 28, height: 28, borderRadius: 7,
                      background: 'transparent', border: 0, cursor: 'pointer',
                      color: 'rgba(245,246,248,0.78)', fontSize: 16, fontWeight: 500,
                    }}
                    aria-label="Decrease"
                  >−</button>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 10px', minWidth: 56 }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 16, fontWeight: 600, color: '#f5f6f8', lineHeight: 1.1 }}>
                      {units.toFixed(1)}
                    </span>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: 'rgba(245,246,248,0.35)', letterSpacing: '0.1em' }}>
                      UNIT{units !== 1 ? 'S' : ''}
                    </span>
                  </div>
                  <button
                    onClick={() => stepUnits(0.5)}
                    style={{
                      width: 28, height: 28, borderRadius: 7,
                      background: 'transparent', border: 0, cursor: 'pointer',
                      color: 'rgba(245,246,248,0.78)', fontSize: 16, fontWeight: 500,
                    }}
                    aria-label="Increase"
                  >+</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
                  <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: 'rgba(245,246,248,0.35)', letterSpacing: '0.1em' }}>
                    BANKROLL
                  </label>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    padding: '5px 10px',
                    background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 8, fontFamily: "'DM Mono', monospace",
                  }}>
                    <span style={{ color: 'rgba(245,246,248,0.35)', fontSize: 12 }}>$</span>
                    <input
                      type="number"
                      value={bankroll}
                      step="50"
                      min="100"
                      onChange={(e) => setBankroll(Math.max(100, Number(e.target.value) || 100))}
                      style={{
                        width: 70, background: 'transparent', border: 0, outline: 'none',
                        color: '#f5f6f8', fontFamily: "'DM Mono', monospace",
                        fontSize: 13, fontWeight: 500, textAlign: 'right',
                        MozAppearance: 'textfield',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Unit chips */}
              <div style={{ display: 'flex', gap: 4 }}>
                {UNIT_CHIPS.map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnits(u)}
                    style={{
                      flex: 1, padding: '6px 4px', fontSize: 11, fontWeight: 500,
                      background: units === u
                        ? `linear-gradient(180deg, ${sport.glow}, transparent)`
                        : 'rgba(255,255,255,0.025)',
                      border: `1px solid ${units === u ? sport.color : 'rgba(255,255,255,0.06)'}`,
                      borderRadius: 7,
                      color: units === u ? '#f5f6f8' : 'rgba(245,246,248,0.55)',
                      cursor: 'pointer',
                      boxShadow: units === u ? `0 0 12px ${sport.glow}` : 'none',
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {u}u
                  </button>
                ))}
              </div>

              {/* Summary row */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                paddingTop: 10, borderTop: '1px dashed rgba(255,255,255,0.08)',
              }}>
                {[
                  { label: 'STAKE', value: `$${stake.toFixed(2)}`, highlight: false },
                  { label: 'TO WIN', value: `$${profit.toFixed(2)}`, highlight: false },
                  { label: 'PAYOUT', value: `$${payout.toFixed(2)}`, highlight: true },
                ].map(({ label, value, highlight }) => (
                  <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: 'rgba(245,246,248,0.35)', letterSpacing: '0.1em' }}>
                      {label}
                    </span>
                    <b style={{
                      fontSize: 14, fontWeight: 600,
                      color: highlight ? '#00e5a0' : '#f5f6f8',
                      fontFamily: "'DM Mono', monospace",
                      textShadow: highlight ? '0 0 12px rgba(0,229,160,0.3)' : 'none',
                    }}>
                      {value}
                    </b>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        {pick.bookieUrl ? (
          <a
            href={pick.bookieUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: 'relative',
              padding: '13px 18px',
              borderRadius: 12,
              border: `1px solid ${sport.color}`,
              cursor: 'pointer',
              fontSize: 13.5, fontWeight: 600, letterSpacing: '0.01em',
              background: `linear-gradient(180deg, ${sport.glow}, rgba(0,0,0,0))`,
              color: '#f5f6f8',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              textDecoration: 'none',
              boxShadow: `0 4px 20px ${sport.glow}`,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Lock Pick
          </a>
        ) : (
          <div style={{
            padding: '13px 18px', borderRadius: 12,
            border: '1px solid rgba(0,229,160,0.4)',
            background: 'linear-gradient(180deg, rgba(0,229,160,0.18), rgba(0,229,160,0.05))',
            color: '#00e5a0',
            boxShadow: '0 0 24px rgba(0,229,160,0.18), inset 0 1px 0 rgba(0,229,160,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            fontSize: 13.5, fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12l5 5 9-11" />
            </svg>
            Pick Posted
          </div>
        )}
      </div>

      <style>{`
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
      `}</style>
    </article>
  );
}
