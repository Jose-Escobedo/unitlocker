'use client';

import Link from 'next/link';
import { ArrowRight, Flame, ChevronUp, Zap, Crosshair } from 'lucide-react';

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
          {/* Confidence bars */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
            {[0,1,2,3,4].map(i => (
              <span key={i} style={{
                display: 'block', width: 4, height: 14, borderRadius: 2,
                background: i < 5
                  ? 'linear-gradient(180deg, #ff6b35, rgba(255,107,53,0.7))'
                  : 'rgba(255,255,255,0.08)',
                boxShadow: i < 5 ? '0 0 6px rgba(255,107,53,0.35)' : 'none',
              }} />
            ))}
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'rgba(245,246,248,0.35)', marginLeft: 6 }}>
              5<small style={{ fontSize: 9, opacity: 0.6 }}>/5</small>
            </span>
          </div>
        </div>

        {/* Player + stat */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'flex-start' }}>
          <div>
            <div style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: '-0.015em', color: '#f5f6f8', fontFamily: "'Inter', sans-serif" }}>
              s1mple
            </div>
            <div style={{ marginTop: 4, fontSize: 12, color: 'rgba(245,246,248,0.55)', fontFamily: "'DM Mono', monospace" }}>
              <span style={{ color: 'rgba(245,246,248,0.78)', fontWeight: 500 }}>NAVI</span>
              <span style={{ color: 'rgba(245,246,248,0.18)', margin: '0 6px' }}>·</span>
              NAVI vs Spirit
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
            s1mple averaging 27 kills on LAN this quarter. Spirit&apos;s CT side is leaking.
          </p>
        </div>

        {/* Unit calc preview */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 14px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 10,
        }}>
          {[
            { label: 'STAKE', value: '$10.00' },
            { label: 'TO WIN', value: '$9.26' },
            { label: 'PAYOUT', value: '$19.26', green: true },
          ].map(({ label, value, green }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: 'rgba(245,246,248,0.35)', letterSpacing: '0.1em' }}>{label}</span>
              <b style={{ fontSize: 13, fontWeight: 600, color: green ? '#00e5a0' : '#f5f6f8', fontFamily: "'DM Mono', monospace", textShadow: green ? '0 0 12px rgba(0,229,160,0.3)' : 'none' }}>{value}</b>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          padding: '13px 18px', borderRadius: 12,
          border: '1px solid rgba(0,229,160,0.4)',
          background: 'linear-gradient(180deg, rgba(0,229,160,0.18), rgba(0,229,160,0.05))',
          color: '#00e5a0',
          boxShadow: '0 0 24px rgba(0,229,160,0.18), inset 0 1px 0 rgba(0,229,160,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          fontSize: 13.5, fontWeight: 600, fontFamily: "'Inter', sans-serif",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12l5 5 9-11" />
          </svg>
          Pick Posted
        </div>
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
              Daily CS2, NBA, NHL &amp; MLB prop picks — curated and posted to the feed. See the lines worth watching, size your bet, and lock it in one tap.
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
                { value: 'CS2 · NBA', label: 'NHL · MLB' },
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
              title="NBA · NHL · MLB"
              subtitle="Multi-sport coverage, posted daily"
            />
            <FeatureCard
              icon={Flame}
              iconColor="#ff6b35"
              iconBg="rgba(255,107,53,0.1)"
              iconBorder="rgba(255,107,53,0.2)"
              title="Confidence Rated"
              subtitle="1–5 unit rating on every pick"
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
