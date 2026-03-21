'use client';

import Link from 'next/link';
import { Lock, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative text-white mt-16 py-24 px-6 md:px-12 overflow-hidden min-h-[90vh] flex items-center">

      {/* Base background */}
      <div className="absolute inset-0" style={{ background: '#0a0c0f' }} />

      {/* Radial glow mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 70% 20%, rgba(0,229,160,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 10% 80%, rgba(0,229,160,0.04) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 90% 90%, rgba(255,107,53,0.03) 0%, transparent 50%)
          `,
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,229,160,0.18) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          opacity: 0.2,
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0,229,160,0.4) 40%, rgba(0,229,160,0.4) 60%, transparent)',
        }}
      />

      {/* Corner brackets — desktop only */}
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
            <path d={b.d} stroke="rgba(0,229,160,0.18)" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
      ))}

      {/* ── Content ── */}
      <div className="relative max-w-6xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Left: Text */}
          <div className="flex-1 text-center lg:text-left">

            {/* Eyebrow — desktop only pill, mobile just a clean label */}
            <div className="hidden sm:inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-md"
              style={{
                background: 'rgba(0,229,160,0.08)',
                border: '1px solid rgba(0,229,160,0.2)',
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00e5a0' }} />
              <span
                className="text-xs font-medium tracking-widest uppercase"
                style={{ color: '#00e5a0', fontFamily: "'DM Mono', monospace" }}
              >
                Bankroll Management
              </span>
            </div>

            {/* Headline — clean SaaS weight */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-5"
              style={{
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '-0.03em',
                color: '#e8ecf0',
              }}
            >
              Lock in your bankroll.
              <br />
              <span style={{ color: '#00e5a0' }}>Own your edge.</span>
            </h1>

            {/* Subheadline */}
            <p
              className="text-base md:text-lg max-w-lg mb-10 leading-relaxed lg:mx-0 mx-auto"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: '#8a95a3',
              }}
            >
              The smarter way to manage your sports betting bankroll. Track bets, protect your units, and build long-term profit with data-driven discipline.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 lg:justify-start justify-center">
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200"
                style={{
                  background: '#00e5a0',
                  color: '#0a0c0f',
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 0 28px rgba(0,229,160,0.35)';
                  e.currentTarget.style.background = '#00f0aa';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.background = '#00e5a0';
                }}
              >
                Start for free
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
                  e.currentTarget.style.borderColor = 'rgba(0,229,160,0.3)';
                  e.currentTarget.style.color = '#e8ecf0';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#1e242c';
                  e.currentTarget.style.color = '#8a95a3';
                }}
              >
                See how it works
              </button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6 mt-10 lg:justify-start justify-center">
              {[
                { value: '10K+', label: 'Bettors' },
                { value: '$2.4M', label: 'Tracked' },
                { value: '94%', label: 'Retention' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-6">
                  {i > 0 && <div className="w-px h-7" style={{ background: '#1e242c' }} />}
                  <div className="flex flex-col">
                    <span
                      className="text-xl font-bold leading-none"
                      style={{ color: '#00e5a0', fontFamily: "'Inter', sans-serif" }}
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

          {/* Right: Cards */}
          <div className="flex-shrink-0 w-full lg:w-[340px] flex flex-col gap-3">
            {[
              {
                icon: <Lock size={15} />,
                title: 'Bankroll Protection',
                desc: 'Keep your units safe and maximize long-term growth.',
              },
              {
                icon: <TrendingUp size={15} />,
                title: 'ROI Tracking',
                desc: 'Real-time performance charts, win rates, and streak analysis.',
              },
              {
                icon: <ShieldCheck size={15} />,
                title: 'Gamified Progress',
                desc: 'Rank up, unlock achievements, and build your betting discipline.',
              },
            ].map((card, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-xl transition-all duration-200"
                style={{ background: '#111418', border: '1px solid #1e242c' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(0,229,160,0.25)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#1e242c';
                }}
              >
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: 'rgba(0,229,160,0.1)',
                    border: '1px solid rgba(0,229,160,0.2)',
                    color: '#00e5a0',
                  }}
                >
                  {card.icon}
                </div>
                <div>
                  <div
                    className="font-semibold text-sm mb-1"
                    style={{ color: '#e8ecf0', fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {card.title}
                  </div>
                  <div
                    className="text-xs leading-relaxed"
                    style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {card.desc}
                  </div>
                </div>
              </div>
            ))}

            {/* Live bankroll card */}
            <div
              className="p-5 rounded-xl mt-1 relative overflow-hidden"
              style={{
                background: '#111418',
                border: '1px solid rgba(0,229,160,0.2)',
              }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background: 'linear-gradient(90deg, transparent, #00e5a0, transparent)',
                }}
              />
              <div
                className="text-xs tracking-widest uppercase mb-3"
                style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}
              >
                Live Bankroll
              </div>
              <div
                className="text-3xl font-bold leading-none mb-1"
                style={{
                  color: '#00e5a0',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '-0.03em',
                }}
              >
                $1,284.50
              </div>
              <div
                className="text-xs mt-1"
                style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}
              >
                +$284.50 · +28.4% ROI · W12 streak
              </div>
              <div className="flex items-end gap-1 mt-4 h-8">
                {[40, 55, 45, 70, 60, 80, 65, 90, 75, 100].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{
                      height: `${h}%`,
                      background: i === 9 ? '#00e5a0' : `rgba(0,229,160,${0.1 + i * 0.07})`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}