'use client';

import Link from 'next/link';
import { ArrowRight, Flame, ChevronUp, Zap, Crosshair } from 'lucide-react';

// s1mple last 5 kills maps 1+2, line 22.5
const L5_DATA = [
  { label: 'NaVi',     value: 28 },
  { label: 'FaZe',     value: 29 },
  { label: 'G2',       value: 26 },
  { label: 'Spirit',   value: 31 },
  { label: 'Liquid',   value: 25 },
];
const LINE = 22.5;

function MiniChart() {
  const W = 280, H = 88, PAD_T = 20, PAD_B = 20;
  const CHART_H = H - PAD_T - PAD_B;
  const values = L5_DATA.map(d => d.value);
  const rawMin = Math.min(...values, LINE);
  const rawMax = Math.max(...values, LINE);
  const pad = (rawMax - rawMin) * 0.4;
  const minV = Math.max(0, rawMin - pad);
  const maxV = rawMax + pad;
  const range = maxV - minV;
  const n = L5_DATA.length;
  const gap = 8;
  const bw = (W - (n - 1) * gap) / n;
  const toY = v => PAD_T + CHART_H - ((v - minV) / range) * CHART_H;
  const lineY = toY(LINE);

  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12, padding: '12px 10px 6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, padding: '0 2px' }}>
        <span style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(245,246,248,0.35)', fontFamily: "'DM Mono', monospace" }}>L5 HISTORY</span>
        <span style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: '0.08em', color: '#00e5a0', fontFamily: "'DM Mono', monospace" }}>100% L5</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        <defs>
          {L5_DATA.map((d, i) => {
            const over = d.value >= LINE;
            return (
              <linearGradient key={i} id={`mc-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={over ? '#00e5a0' : '#ff4757'} stopOpacity="0.9" />
                <stop offset="100%" stopColor={over ? '#00e5a0' : '#ff4757'} stopOpacity="0.2" />
              </linearGradient>
            );
          })}
        </defs>

        {/* Prop line */}
        <line x1={0} y1={lineY} x2={W} y2={lineY}
          stroke="rgba(255,255,255,0.35)" strokeDasharray="4 3" strokeWidth="1.2" />
        <rect x={W - 30} y={lineY - 9} width={30} height={13} rx={3} fill="rgba(255,255,255,0.07)" />
        <text x={W - 15} y={lineY + 1} textAnchor="middle" fontSize={7.5} fill="rgba(255,255,255,0.6)" fontFamily="monospace" fontWeight="700">{LINE}</text>

        {/* Bars */}
        {L5_DATA.map((d, i) => {
          const over = d.value >= LINE;
          const x = i * (bw + gap);
          const y = toY(d.value);
          const barH = Math.max(toY(minV) - y, 2);
          return (
            <g key={i}>
              <rect x={x} y={y} width={bw} height={barH} rx={3} fill={`url(#mc-${i})`} />
              <text x={x + bw / 2} y={y - 4} textAnchor="middle" fontSize={8.5}
                fill={over ? '#00e5a0' : '#ff4757'} fontFamily="monospace" fontWeight="700">{d.value}</text>
              <text x={x + bw / 2} y={H - 2} textAnchor="middle" fontSize={7}
                fill="rgba(245,246,248,0.25)" fontFamily="monospace">{d.label}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function MockPickCard() {
  return (
    <div style={{
      position: 'relative',
      borderRadius: 18,
      background: 'rgba(20, 22, 28, 0.65)',
      backdropFilter: 'blur(14px) saturate(140%)',
      WebkitBackdropFilter: 'blur(14px) saturate(140%)',
      border: '1px solid rgba(255,255,255,0.06)',
      boxShadow: '0 24px 60px -20px rgba(0,0,0,0.7), 0 0 40px -10px rgba(255,107,53,0.25)',
    }}>
      {/* Gradient border glow */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 'inherit',
        padding: 1,
        background: 'linear-gradient(135deg, #ff6b35, transparent 40%, transparent 60%, #cc3d10)',
        WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
        mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
        WebkitMaskComposite: 'xor', maskComposite: 'exclude',
        opacity: 0.6, pointerEvents: 'none',
      }} />
      {/* Top radial glow */}
      <div style={{
        position: 'absolute', inset: -1, borderRadius: 'inherit',
        background: 'radial-gradient(60% 80% at 50% 0%, rgba(255,107,53,0.3), transparent 60%)',
        opacity: 0.5, pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'inline-flex', gap: 6 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '4px 9px', borderRadius: 999,
              fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em',
              background: 'rgba(255,255,255,0.04)', color: 'rgba(245,246,248,0.78)',
              border: '1px solid rgba(255,255,255,0.06)',
              fontFamily: "'DM Mono', monospace",
            }}>
              <Crosshair size={11} strokeWidth={2.5} />
              CS2
            </span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '4px 9px', borderRadius: 999,
              fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em',
              background: 'rgba(255,107,53,0.16)', color: 'oklch(0.88 0.15 65)',
              border: '1px solid rgba(255,107,53,0.32)',
              boxShadow: '0 0 14px rgba(255,107,53,0.18)',
              fontFamily: "'DM Mono', monospace",
            }}>
              <Flame size={10} /> HOT
            </span>
          </div>
          {/* L10 hit rate badge */}
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '4px 9px', borderRadius: 999,
            fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em',
            background: 'rgba(0,229,160,0.1)', color: '#00e5a0',
            border: '1px solid rgba(0,229,160,0.22)',
            fontFamily: "'DM Mono', monospace",
          }}>
            9/10 L10
          </span>
        </div>

        {/* Player + stat */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'flex-start' }}>
          <div>
            <div style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: '-0.015em', color: '#f5f6f8', fontFamily: "'Inter', sans-serif" }}>
              s1mple
            </div>
            <div style={{ marginTop: 4, fontSize: 12, color: 'rgba(245,246,248,0.55)', fontFamily: "'DM Mono', monospace" }}>
              <span style={{ color: 'rgba(245,246,248,0.78)', fontWeight: 500 }}>BC Game</span>
              <span style={{ color: 'rgba(245,246,248,0.18)', margin: '0 6px' }}>·</span>
              BC Game vs Vitality
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10.5, fontWeight: 600, color: '#00e5a0', letterSpacing: '0.1em', fontFamily: "'DM Mono', monospace" }}>
              <ChevronUp size={12} strokeWidth={2.5} /> OVER
            </div>
            <div style={{ fontSize: 32, fontWeight: 600, color: '#00e5a0', letterSpacing: '-0.015em', lineHeight: 1, textShadow: '0 0 18px rgba(0,229,160,0.35)', fontFamily: "'DM Mono', monospace" }}>
              22.5
            </div>
            <div style={{ fontSize: 10.5, fontWeight: 500, color: 'rgba(245,246,248,0.55)', letterSpacing: '0.1em', fontFamily: "'DM Mono', monospace" }}>
              KILLS
            </div>
          </div>
        </div>

        {/* Note */}
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
              background: 'linear-gradient(180deg, #ff6b35, transparent)',
              borderRadius: 2, boxShadow: '0 0 6px rgba(255,107,53,0.35)',
            }} />
            <p style={{ margin: 0, fontSize: 12, color: 'rgba(245,246,248,0.78)', lineHeight: 1.55, fontFamily: "'DM Mono', monospace" }}>
              s1mple averaging 27 kills maps 1+2 this tournament. Statement match vs ZywOo — BC Game need the win.
            </p>
          </div>

          {/* Stats grid */}
          <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
              background: 'rgba(255,255,255,0.03)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
              {['Avg L10','Diff','L5','L10','H2H'].map((h, i, arr) => (
                <div key={h} style={{
                  padding: '6px 4px', textAlign: 'center',
                  fontSize: 9.5, fontWeight: 500, letterSpacing: '0.07em',
                  color: 'rgba(245,246,248,0.4)', fontFamily: "'DM Mono', monospace",
                  borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                }}>{h}</div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
              {[
                { v: '27.3', pct: false }, { v: '4.8', pct: false },
                { v: '100%',  pct: true  }, { v: '90%', pct: true  },
                { v: '75%',  pct: true  },
              ].map(({ v, pct }, i, arr) => (
                <div key={i} style={{
                  padding: '9px 4px', textAlign: 'center',
                  fontSize: 13, fontWeight: 600, fontFamily: "'DM Mono', monospace",
                  color: pct ? '#00e5a0' : '#f5f6f8',
                  background: pct ? 'linear-gradient(180deg, rgba(0,229,160,0.12), rgba(0,229,160,0.04))' : 'transparent',
                  borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                }}>{v}</div>
              ))}
            </div>
          </div>
        </div>

        {/* L5 mini chart */}
        <MiniChart />
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, iconColor, iconBg, iconBorder, title, subtitle }) {
  return (
    <div style={{
      position: 'relative',
      padding: '14px 16px',
      borderRadius: 14,
      background: 'rgba(20, 22, 28, 0.55)',
      backdropFilter: 'blur(14px) saturate(140%)',
      WebkitBackdropFilter: 'blur(14px) saturate(140%)',
      border: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', alignItems: 'center', gap: 12,
      boxShadow: '0 8px 24px -8px rgba(0,0,0,0.5)',
    }}>
      <div style={{
        width: 34, height: 34, borderRadius: 9, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: iconBg, border: `1px solid ${iconBorder}`, color: iconColor,
      }}>
        <Icon size={15} />
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#f5f6f8', fontFamily: "'DM Sans', sans-serif" }}>{title}</div>
        <div style={{ fontSize: 11.5, color: 'rgba(245,246,248,0.45)', fontFamily: "'DM Sans', sans-serif", marginTop: 1 }}>{subtitle}</div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative text-white mt-16 overflow-hidden min-h-[90vh] flex items-center" style={{ background: '#07080b' }}>

      {/* Atmosphere orbs */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.65 }} aria-hidden>
        <div style={{
          position: 'absolute', width: 800, height: 800, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,53,0.5) 0%, transparent 65%)',
          filter: 'blur(160px)', top: -200, right: -100,
          animation: 'heroOrb1 20s ease-in-out infinite alternate',
        }} />
        <div style={{
          position: 'absolute', width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,180,200,0.35) 0%, transparent 65%)',
          filter: 'blur(160px)', bottom: -200, left: -100,
          animation: 'heroOrb2 26s ease-in-out infinite alternate',
        }} />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,107,53,0.12) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        opacity: 0.2,
      }} />

      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{
        background: 'linear-gradient(90deg, transparent, rgba(255,107,53,0.35) 40%, rgba(255,107,53,0.35) 60%, transparent)',
      }} />

      {/* Corner brackets */}
      {[
        { top: 10, left: 10, d: 'M0 40 L0 0 L40 0' },
        { top: 10, right: 10, d: 'M40 40 L40 0 L0 0' },
        { bottom: 10, left: 10, d: 'M0 0 L0 40 L40 40' },
        { bottom: 10, right: 10, d: 'M40 0 L40 40 L0 40' },
      ].map((b, i) => (
        <div key={i} className="absolute pointer-events-none hidden md:block"
          style={{ top: b.top, left: b.left, right: b.right, bottom: b.bottom }}>
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
            <path d={b.d} stroke="rgba(255,107,53,0.2)" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
      ))}

      <div className="relative max-w-6xl mx-auto w-full px-6 md:px-12 py-24">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Left: copy */}
          <div className="flex-1 text-center lg:text-left">

            {/* Live badge */}
            <div className="hidden sm:inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full" style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                background: '#00e5a0', boxShadow: '0 0 8px #00e5a0',
                display: 'inline-block', animation: 'livePulse 1.6s ease-in-out infinite',
              }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(245,246,248,0.78)', fontFamily: "'DM Mono', monospace" }}>
                LIVE PICKS FEED
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] mb-5" style={{
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.03em',
              color: '#f5f6f8',
            }}>
              Stop guessing.
              <br />
              <span style={{ color: '#ff6b35' }}>Lock the line.</span>
            </h1>

            <p className="text-base md:text-lg max-w-lg mb-10 leading-relaxed lg:mx-0 mx-auto" style={{
              fontFamily: "'DM Sans', sans-serif",
              color: 'rgba(245,246,248,0.55)',
            }}>
              Daily CS2, NBA, NHL, MLB, NFL &amp; Tennis prop picks — curated and posted to the feed. Player history, hit rates, and fire pick detection on every card.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 lg:justify-start justify-center">
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #ff6b35, #cc3d10)',
                  color: '#0a0c0f',
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: '0 4px 24px rgba(255,107,53,0.4)',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 32px rgba(255,107,53,0.55)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 24px rgba(255,107,53,0.4)'}
              >
                View Today&apos;s Picks
                <ArrowRight size={15} />
              </Link>
              <button
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex cursor-pointer items-center justify-center px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(245,246,248,0.55)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,107,53,0.3)';
                  e.currentTarget.style.color = '#f5f6f8';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.color = 'rgba(245,246,248,0.55)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                }}
              >
                How it works
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 mt-10 lg:justify-start justify-center">
              {[
                { value: 'CS2 · NBA', label: 'NHL · MLB · NFL · Tennis' },
                { value: 'Daily', label: 'Fresh picks' },
                { value: 'Members', label: 'Only' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-6">
                  {i > 0 && <div className="w-px h-7" style={{ background: 'rgba(255,255,255,0.06)' }} />}
                  <div className="flex flex-col">
                    <span className="text-sm font-bold leading-none" style={{ color: '#ff6b35', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.01em' }}>
                      {stat.value}
                    </span>
                    <span className="text-xs tracking-wider uppercase mt-1" style={{ color: 'rgba(245,246,248,0.35)', fontFamily: "'DM Mono', monospace" }}>
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: mock card + feature cards */}
          <div className="flex-shrink-0 w-full lg:w-[340px] flex flex-col gap-3">
            <MockPickCard />
            <FeatureCard
              icon={Zap}
              iconColor="#00e5a0"
              iconBg="rgba(0,229,160,0.1)"
              iconBorder="rgba(0,229,160,0.2)"
              title="6 Sports · Daily Feed"
              subtitle="CS2, NBA, NHL, MLB, NFL & Tennis"
            />
            <FeatureCard
              icon={Flame}
              iconColor="#ff6b35"
              iconBg="rgba(255,107,53,0.1)"
              iconBorder="rgba(255,107,53,0.2)"
              title="Player History & Hit Rates"
              subtitle="L5 · L10 · H2H charts on every pick"
            />
          </div>

        </div>
      </div>

      <style>{`
        @keyframes heroOrb1 { 0%{transform:translate(0,0)scale(1)} 100%{transform:translate(-80px,60px)scale(1.1)} }
        @keyframes heroOrb2 { 0%{transform:translate(0,0)scale(1)} 100%{transform:translate(80px,-60px)scale(1.12)} }
        @keyframes livePulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.85)} }
      `}</style>
    </section>
  );
}
