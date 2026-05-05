'use client';

import Link from 'next/link';
import { ArrowRight, Crosshair, Zap, Flame } from 'lucide-react';

export default function CTASection() {
  return (
    <section
      className="relative py-28 px-6 md:px-12 overflow-hidden"
      style={{ background: '#0a0c0f' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, #1e242c 20%, #1e242c 80%, transparent)',
        }}
      />

      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(255,107,53,0.06) 0%, transparent 70%)',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,107,53,0.13) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 100%)',
          opacity: 0.15,
        }}
      />

      <div className="relative max-w-2xl mx-auto text-center">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md mb-6"
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
            Picks dropping now
          </span>
        </div>

        <h2
          className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          style={{
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '-0.03em',
            color: '#e8ecf0',
          }}
        >
          The feed is live.{' '}
          <span style={{ color: '#ff6b35' }}>Don&apos;t miss the pick.</span>
        </h2>

        <p
          className="text-base mb-10 leading-relaxed"
          style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
        >
          Join UnitLocker and get daily CS2, NBA, NHL &amp; MLB picks — with analysis, confidence ratings, and one-tap locking.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link
            href="/get-started"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg font-bold text-sm transition-all duration-200"
            style={{
              background: '#ff6b35',
              color: '#0a0c0f',
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: '0 4px 24px rgba(255,107,53,0.4)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#ff7d4d';
              e.currentTarget.style.boxShadow = '0 4px 32px rgba(255,107,53,0.55)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#ff6b35';
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(255,107,53,0.4)';
            }}
          >
            Join UnitLocker
            <ArrowRight size={15} />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200"
            style={{
              background: '#111418',
              border: '1px solid #1e242c',
              color: '#8a95a3',
              fontFamily: "'DM Sans', sans-serif",
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
            Log in
          </Link>
        </div>

        <p
          className="text-xs mb-0"
          style={{ color: '#2a3240', fontFamily: "'DM Sans', sans-serif" }}
        >
          CS2 · NBA · NHL · MLB · Daily picks.
        </p>

        <div
          className="flex items-center justify-center gap-8 mt-14 pt-10"
          style={{ borderTop: '1px solid #1e242c' }}
        >
          {[
            { icon: <Crosshair size={14} />, value: 'CS2', label: 'Primary sport' },
            { icon: <Zap size={14} />, value: 'Daily', label: 'Fresh picks' },
            { icon: <Flame size={14} />, value: 'Pro', label: 'Members only' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div style={{ color: '#ff6b35' }}>{stat.icon}</div>
              <span
                className="text-sm font-bold leading-none"
                style={{
                  color: '#ff6b35',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '-0.03em',
                }}
              >
                {stat.value}
              </span>
              <span
                className="text-xs tracking-wider uppercase"
                style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, #1e242c 20%, #1e242c 80%, transparent)',
        }}
      />
    </section>
  );
}
