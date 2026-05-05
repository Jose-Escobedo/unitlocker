'use client';

import Link from 'next/link';
import { ArrowRight, Flame, ChevronUp, ChevronDown, ExternalLink, Crosshair, Zap } from 'lucide-react';

function MockPickCard() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: '#202228',
        border: '1px solid #2a2f3a',
        boxShadow: '0 0 32px rgba(255,107,53,0.15)',
      }}
    >
      <div className="h-0.5 w-full" style={{ background: '#ff6b35' }} />
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold tracking-wider"
              style={{ background: 'rgba(255,107,53,0.15)', color: '#ff6b35', fontFamily: "'DM Mono', monospace" }}
            >
              <Crosshair size={11} />
              CS2
            </span>
            <span
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold"
              style={{ background: 'rgba(255,107,53,0.12)', color: '#ff6b35', fontFamily: "'DM Mono', monospace" }}
            >
              <Flame size={11} />
              HOT
            </span>
          </div>
          <div className="flex gap-1">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: i <= 5 ? '#ff6b35' : '#2a2f3a' }} />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="font-bold text-lg" style={{ color: '#f0f2f5', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}>
              s1mple
            </div>
            <div className="text-xs mt-0.5" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>
              NAVI · NAVI vs Spirit
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-1.5" style={{ color: '#00e5a0' }}>
              <ChevronUp size={18} strokeWidth={3} />
              <span className="text-3xl font-black" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.03em' }}>
                22.5
              </span>
            </div>
            <div className="text-xs font-bold tracking-wider mt-0.5" style={{ color: '#00e5a0', fontFamily: "'DM Mono', monospace" }}>
              OVER KILLS
            </div>
          </div>
        </div>

        <p className="text-xs leading-relaxed mb-4 border-l-2 pl-3" style={{ color: '#7a8494', borderColor: '#ff6b35', fontFamily: "'DM Mono', monospace" }}>
          s1mple averaging 27 kills in his last 10. 
        </p>

        <div className="flex items-center justify-between py-2 px-3 rounded-xl mb-3" style={{ background: '#181c22', border: '1px solid #2a2f3a' }}>
          <span className="text-xs" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>5u suggested</span>
          <span className="text-sm font-bold" style={{ color: '#ff6b35', fontFamily: "'DM Mono', monospace" }}>$50.00</span>
        </div>

        <div
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-bold text-sm"
          style={{
            background: '#ff6b35',
            color: '#0a0c0f',
            fontFamily: "'Inter', sans-serif",
            boxShadow: '0 4px 20px rgba(255,107,53,0.4)',
          }}
        >
          Lock Pick
          <ExternalLink size={13} />
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative text-white mt-16 py-24 px-6 md:px-12 overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute inset-0" style={{ background: '#0a0c0f' }} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 70% 20%, rgba(255,107,53,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 10% 80%, rgba(0,229,160,0.04) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 90% 90%, rgba(255,107,53,0.04) 0%, transparent 50%)
          `,
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,107,53,0.14) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          opacity: 0.18,
        }}
      />

      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,107,53,0.4) 40%, rgba(255,107,53,0.4) 60%, transparent)',
        }}
      />

      {[
        { top: 10, left: 10, d: 'M0 40 L0 0 L40 0' },
        { top: 10, right: 10, d: 'M40 40 L40 0 L0 0' },
        { bottom: 10, left: 10, d: 'M0 0 L0 40 L40 40' },
        { bottom: 10, right: 10, d: 'M40 0 L40 40 L0 40' },
      ].map((b, i) => (
        <div
          key={i}
          className="absolute pointer-events-none hidden md:block"
          style={{ top: b.top, left: b.left, right: b.right, bottom: b.bottom }}
        >
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
            <path d={b.d} stroke="rgba(255,107,53,0.18)" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
      ))}

      <div className="relative max-w-6xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          <div className="flex-1 text-center lg:text-left">
            <div
              className="hidden sm:inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-md"
              style={{
                background: 'rgba(255,107,53,0.08)',
                border: '1px solid rgba(255,107,53,0.22)',
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#ff6b35' }} />
              <span
                className="text-xs font-medium tracking-widest uppercase"
                style={{ color: '#ff6b35', fontFamily: "'DM Mono', monospace" }}
              >
                Live Picks Feed
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-5"
              style={{
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '-0.03em',
                color: '#e8ecf0',
              }}
            >
              Stop guessing.
              <br />
              <span style={{ color: '#ff6b35' }}>Lock the line.</span>
            </h1>

            <p
              className="text-base md:text-lg max-w-lg mb-10 leading-relaxed lg:mx-0 mx-auto"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: '#8a95a3',
              }}
            >
              Daily CS2, NBA, NHL &amp; MLB prop picks — curated and posted to the feed. See the lines worth watching, size your bet, and lock it in one tap.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 lg:justify-start justify-center">
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200"
                style={{
                  background: '#ff6b35',
                  color: '#0a0c0f',
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: '0 4px 24px rgba(255,107,53,0.35)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#ff7d4d';
                  e.currentTarget.style.boxShadow = '0 4px 32px rgba(255,107,53,0.5)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#ff6b35';
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(255,107,53,0.35)';
                }}
              >
                View Today&apos;s Picks
                <ArrowRight size={15} />
              </Link>
              <button
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex cursor-pointer items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  background: '#111418',
                  border: '1px solid #1e242c',
                  color: '#8a95a3',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,107,53,0.3)';
                  e.currentTarget.style.color = '#e8ecf0';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#1e242c';
                  e.currentTarget.style.color = '#8a95a3';
                }}
              >
                How it works
              </button>
            </div>

            <div className="flex items-center gap-6 mt-10 lg:justify-start justify-center">
              {[
                { value: 'CS2 · NBA', label: 'NHL · MLB' },
                { value: 'Daily', label: 'Fresh picks' },
                { value: 'Members', label: 'Only' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-6">
                  {i > 0 && <div className="w-px h-7" style={{ background: '#1e242c' }} />}
                  <div className="flex flex-col">
                    <span
                      className="text-sm font-bold leading-none"
                      style={{ color: '#ff6b35', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.01em' }}
                    >
                      {stat.value}
                    </span>
                    <span
                      className="text-xs tracking-wider uppercase mt-1"
                      style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}
                    >
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-shrink-0 w-full lg:w-[340px] flex flex-col gap-3">
            <MockPickCard />

            <div
              className="p-4 rounded-xl flex items-center gap-3"
              style={{ background: '#111418', border: '1px solid #1e242c' }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.2)', color: '#00e5a0' }}
              >
                <Zap size={15} />
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ color: '#e8ecf0', fontFamily: "'DM Sans', sans-serif" }}>
                  NBA · NHL · MLB
                </div>
                <div className="text-xs" style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}>
                  Multi-sport coverage, posted daily
                </div>
              </div>
            </div>

            <div
              className="p-4 rounded-xl flex items-center gap-3"
              style={{ background: '#111418', border: '1px solid #1e242c' }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.2)', color: '#ff6b35' }}
              >
                <Flame size={15} />
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ color: '#e8ecf0', fontFamily: "'DM Sans', sans-serif" }}>
                  Confidence Rated
                </div>
                <div className="text-xs" style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}>
                  1–5 unit rating on every pick
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
