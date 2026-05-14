'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

const SPORT_COLOR = {
  CS2: '#ff6b35',
  NBA: '#00e5a0',
  NHL: '#4da6ff',
  MLB: '#f5c842',
  NFL: '#7c3aed',
  Tennis: '#bef264',
};

function BarChart({ data, line }) {
  const W = 400;
  const H = 180;
  const PAD_T = 24;
  const PAD_B = 26;
  const CHART_H = H - PAD_T - PAD_B;

  const values = data.map(d => d.value);
  const rawMin = Math.min(...values, line);
  const rawMax = Math.max(...values, line);
  const pad = Math.max((rawMax - rawMin) * 0.35, rawMax * 0.05);
  const minVal = Math.max(0, rawMin - pad);
  const maxVal = rawMax + pad;
  const range = maxVal - minVal || 1;

  const n = data.length;
  const gap = n > 7 ? 3 : 5;
  const bw = (W - (n - 1) * gap) / n;
  const toY = v => PAD_T + CHART_H - ((v - minVal) / range) * CHART_H;
  const lineY = toY(line);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
      <defs>
        {data.map((_, i) => {
          const isOver = data[i].value >= line;
          return (
            <linearGradient key={i} id={`bar-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isOver ? '#00e5a0' : '#ff4757'} stopOpacity="0.9" />
              <stop offset="100%" stopColor={isOver ? '#00e5a0' : '#ff4757'} stopOpacity="0.25" />
            </linearGradient>
          );
        })}
      </defs>

      {/* Grid lines */}
      {[0.33, 0.66].map(f => (
        <line key={f} x1={0} y1={PAD_T + CHART_H * (1 - f)} x2={W} y2={PAD_T + CHART_H * (1 - f)}
          stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}

      {/* Prop line */}
      <line x1={0} y1={lineY} x2={W} y2={lineY}
        stroke="rgba(255,255,255,0.4)" strokeDasharray="5 3" strokeWidth="1.5" />
      <rect x={W - 36} y={lineY - 10} width={36} height={14} rx={4}
        fill="rgba(255,255,255,0.07)" />
      <text x={W - 18} y={lineY + 1.5} textAnchor="middle" fontSize={8}
        fill="rgba(255,255,255,0.65)" fontFamily="monospace" fontWeight="700">
        {line}
      </text>

      {/* Bars */}
      {data.map((d, i) => {
        const isOver = d.value >= line;
        const x = i * (bw + gap);
        const y = toY(d.value);
        const barH = Math.max(toY(minVal) - y, 2);

        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={barH} rx={3}
              fill={`url(#bar-${i})`} />
            <text x={x + bw / 2} y={y - 5} textAnchor="middle" fontSize={bw > 30 ? 9 : 7.5}
              fill={isOver ? '#00e5a0' : '#ff4757'} fontFamily="monospace" fontWeight="700">
              {d.value}
            </text>
            <text x={x + bw / 2} y={H - 4} textAnchor="middle" fontSize={bw > 30 ? 7.5 : 6.5}
              fill="rgba(245,246,248,0.28)" fontFamily="monospace">
              {d.label.replace(/^vs\s+/i, '').slice(0, 7)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function StatsModal({ pick, onClose }) {
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState('L10');

  useEffect(() => {
    setMounted(true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!mounted) return null;

  const color = SPORT_COLOR[pick.sport] ?? '#ff6b35';
  const stats = pick.stats || {};
  const history = stats.history || [];
  const h2hHistory = stats.h2hHistory || [];

  const TABS = [
    { key: 'L5',  label: 'L5',  data: history.slice(-5) },
    { key: 'L10', label: 'L10', data: history.slice(-10) },
    ...(h2hHistory.length ? [{ key: 'H2H', label: 'H2H', data: h2hHistory }] : []),
  ].filter(t => t.data.length > 0);

  const active = TABS.find(t => t.key === tab) ?? TABS[0];
  if (!active) return null;

  const overCount = active.data.filter(d => d.value >= pick.line).length;
  const isOver = pick.prediction === 'Over';
  const predColor = isOver ? '#00e5a0' : '#ff4757';

  const modal = (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.72)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        animation: 'smFadeIn .2s ease',
      }} />

      <div className="stats-sheet" style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        zIndex: 1001,
        background: 'linear-gradient(180deg, #12141a 0%, #0e1015 100%)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '22px 22px 0 0',
        maxHeight: '84vh',
        display: 'flex',
        flexDirection: 'column',
        animation: 'smSlideUp .3s cubic-bezier(0.22,1,0.36,1)',
        boxShadow: '0 -32px 80px rgba(0,0,0,0.7)',
      }}>

        {/* Drag handle */}
        <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center', padding: '14px 0 6px' }}>
          <div style={{ width: 38, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.1)' }} />
        </div>

        {/* Header */}
        <div style={{ flexShrink: 0, padding: '8px 20px 14px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 10.5, fontFamily: "'DM Mono', monospace", color, letterSpacing: '0.12em', marginBottom: 5, opacity: 0.9 }}>
              {pick.sport} · {pick.stat.toUpperCase()} · HISTORY
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#f5f6f8', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {pick.playerName}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(245,246,248,0.4)', fontFamily: "'DM Sans', sans-serif", marginTop: 3 }}>
              {pick.team} · {pick.matchup}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
            <button onClick={onClose} style={{
              width: 32, height: 32, borderRadius: 10,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'rgba(245,246,248,0.5)',
            }}>
              <X size={14} />
            </button>
            <div style={{
              fontSize: 12, fontFamily: "'DM Mono', monospace",
              color: predColor,
              background: `${predColor}18`,
              border: `1px solid ${predColor}35`,
              padding: '3px 10px', borderRadius: 999,
            }}>
              {pick.prediction.toUpperCase()} {pick.line}
            </div>
          </div>
        </div>

        {/* Tabs + hit rate */}
        <div style={{ flexShrink: 0, padding: '0 20px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              padding: '6px 16px', borderRadius: 8, border: 0,
              cursor: 'pointer',
              fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
              fontFamily: "'DM Mono', monospace",
              background: active.key === t.key ? color : 'rgba(255,255,255,0.05)',
              color: active.key === t.key ? '#07080b' : 'rgba(245,246,248,0.45)',
              transition: 'all .15s',
            }}>
              {t.label}
            </button>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontSize: 16, fontWeight: 700, fontFamily: "'DM Mono', monospace", color: overCount / active.data.length >= 0.6 ? '#00e5a0' : 'rgba(245,246,248,0.7)' }}>
              {overCount}/{active.data.length}
            </span>
            <span style={{ fontSize: 9, fontFamily: "'DM Mono', monospace", color: 'rgba(245,246,248,0.25)', letterSpacing: '0.1em' }}>
              OVER RATE
            </span>
          </div>
        </div>

        {/* Scrollable content */}
        <div style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch', flex: 1, padding: '0 16px' }}>

          {/* Chart */}
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: 16, padding: '16px 10px 6px',
          }}>
            <BarChart data={active.data} line={pick.line} />
          </div>

          {/* Branding */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, margin: '10px 0 4px', opacity: 0.55 }}>
            <div style={{
              width: 24, height: 24, borderRadius: 7, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'linear-gradient(135deg, #ff6b35, #cc3d10)',
              color: '#0b0d12',
              boxShadow: '0 4px 14px rgba(255,107,53,0.35), inset 0 1px 0 rgba(255,255,255,0.25)',
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
                <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
              </svg>
            </div>
            <span style={{ fontWeight: 600, letterSpacing: '0.06em', fontSize: 11, fontFamily: "'Inter', sans-serif", color: '#f5f6f8' }}>
              UNIT<b style={{ fontWeight: 800 }}>LOCKER</b>
            </span>
          </div>

          {/* Summary stats */}
          {(stats.avgL10 != null || stats.diff != null || stats.h2h != null) && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 12 }}>
              {[
                { label: 'AVG L10', value: stats.avgL10 },
                { label: 'DIFF',    value: stats.diff != null ? (stats.diff > 0 ? `+${stats.diff}` : `${stats.diff}`) : null },
                { label: 'H2H',     value: stats.h2h },
              ].filter(s => s.value != null).map(s => (
                <div key={s.label} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 12, padding: '12px 8px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: 9, fontFamily: "'DM Mono', monospace", color: 'rgba(245,246,248,0.3)', letterSpacing: '0.1em', marginBottom: 5 }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 700, fontFamily: "'DM Mono', monospace",
                    color: typeof s.value === 'string' && s.value.includes('%') ? '#00e5a0' : '#f5f6f8' }}>
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ height: 28 }} />
        </div>
      </div>

      <style>{`
        @keyframes smFadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes smSlideUp { from { transform: translateY(100%) } to { transform: translateY(0) } }
        @media (min-width: 640px) {
          .stats-sheet {
            bottom: auto !important;
            top: 50% !important;
            left: 50% !important;
            right: auto !important;
            transform: translate(-50%, -50%) !important;
            width: 100% !important;
            max-width: 480px !important;
            border-radius: 22px !important;
            border: 1px solid rgba(255,255,255,0.09) !important;
            max-height: 88vh !important;
            animation: smFadeScaleIn .25s cubic-bezier(0.22,1,0.36,1) !important;
          }
        }
        @keyframes smFadeScaleIn {
          from { opacity: 0; transform: translate(-50%, calc(-50% + 12px)); }
          to   { opacity: 1; transform: translate(-50%, -50%); }
        }
      `}</style>
    </>
  );

  return createPortal(modal, document.body);
}
