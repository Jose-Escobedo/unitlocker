'use client';

import { useState } from 'react';
import { PlusCircle, CheckCircle2, TrendingUp, Trophy, Wallet } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Wallet,
    title: 'Set your bankroll',
    desc: 'Enter your starting balance. UnitLocker sets your baseline and tracks every dollar from day one.',
    detail: 'Whether you start with $100 or $10,000 — UnitLocker sets your baseline and keeps a running total of your bankroll as you log bets and settle results.',
    stat: '$1,000',
    statLabel: 'avg starting bankroll',
  },
  {
    number: '02',
    icon: PlusCircle,
    title: 'Log your bets',
    desc: 'Add bets in seconds. Pick the sport, enter your odds and stake, and keep your full history in one place.',
    detail: 'Log moneylines, spreads, totals, parlays and props across any sport. Your entire bet history is stored, searchable, and always up to date — no spreadsheets needed.',
    stat: '< 10s',
    statLabel: 'to log a bet',
  },
  {
    number: '03',
    icon: CheckCircle2,
    title: 'Settle and track',
    desc: 'Mark bets as Win, Loss, or Push with one tap. Your bankroll updates instantly and your stats refresh in real time.',
    detail: 'Every settled bet feeds your win rate, streak tracker, and ROI — giving you a live picture of exactly where your bankroll stands at all times.',
    stat: '1 tap',
    statLabel: 'to settle a bet',
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Analyse your edge',
    desc: 'See exactly where you make and lose money. Break down performance by sport, bet type, and odds range.',
    detail: 'Most bettors lose because they don\'t know where they\'re sharp. UnitLocker\'s stats surface the patterns hiding in your bet history so you can double down on what works.',
    stat: '+18%',
    statLabel: 'avg ROI improvement',
  },
  {
    number: '05',
    icon: Trophy,
    title: 'Level up',
    desc: 'Earn XP, climb ranks from Rookie to Legend, and unlock achievements as your discipline and bankroll grow.',
    detail: 'Gamification keeps you accountable. Streaks, milestones, and rank progression turn smart betting into a habit — not a grind.',
    stat: '6',
    statLabel: 'ranks to climb',
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="how-it-works"
      className="relative py-28 px-6 md:px-12 overflow-hidden"
      style={{ background: '#0a0c0f' }}
    >
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, #1e242c 20%, #1e242c 80%, transparent)',
        }}
      />

      {/* Subtle green glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(0,229,160,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md mb-5"
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
              How it works
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
            From first bet to{' '}
            <span style={{ color: '#00e5a0' }}>consistent profit.</span>
          </h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
          >
            Five steps. No complexity. Just a clear system that keeps your bankroll growing.
          </p>
        </div>

        {/* Step layout: left list + right detail */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Left: step list */}
          <div className="flex flex-col gap-2 lg:w-[420px] flex-shrink-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = active === i;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="text-left w-full px-5 py-4 rounded-xl transition-all duration-200"
                  style={{
                    background: isActive ? '#111418' : 'transparent',
                    border: `1px solid ${isActive ? 'rgba(0,229,160,0.25)' : 'transparent'}`,
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = '#111418';
                      e.currentTarget.style.borderColor = '#1e242c';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                    }
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="text-xs font-medium flex-shrink-0"
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        color: isActive ? '#00e5a0' : '#2a3240',
                        transition: 'color 0.2s',
                      }}
                    >
                      {step.number}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div
                        className="font-semibold text-sm mb-0.5"
                        style={{
                          color: isActive ? '#e8ecf0' : '#5a6474',
                          fontFamily: "'DM Sans', sans-serif",
                          transition: 'color 0.2s',
                        }}
                      >
                        {step.title}
                      </div>
                      <div
                        className="text-xs leading-relaxed"
                        style={{
                          color: isActive ? '#8a95a3' : '#2a3240',
                          fontFamily: "'DM Sans', sans-serif",
                          transition: 'color 0.2s',
                        }}
                      >
                        {step.desc}
                      </div>
                    </div>
                    <div
                      className="w-1 h-8 rounded-full flex-shrink-0 transition-all duration-200"
                      style={{
                        background: isActive ? '#00e5a0' : 'transparent',
                        boxShadow: isActive ? '0 0 8px rgba(0,229,160,0.5)' : 'none',
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: detail panel */}
          <div className="flex-1">
            <div
              className="rounded-2xl p-8 h-full relative overflow-hidden"
              style={{
                background: '#111418',
                border: '1px solid #1e242c',
                minHeight: '320px',
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background: 'linear-gradient(90deg, transparent, #00e5a0 40%, #00e5a0 60%, transparent)',
                }}
              />
              <div
                className="absolute bottom-4 right-6 font-bold select-none pointer-events-none"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '120px',
                  lineHeight: 1,
                  color: 'rgba(0,229,160,0.03)',
                  letterSpacing: '-0.05em',
                }}
              >
                {steps[active].number}
              </div>

              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-6"
                style={{
                  background: 'rgba(0,229,160,0.1)',
                  border: '1px solid rgba(0,229,160,0.2)',
                  color: '#00e5a0',
                }}
              >
                {(() => { const Icon = steps[active].icon; return <Icon size={18} />; })()}
              </div>

              <div
                className="text-xs font-medium tracking-widest uppercase mb-2"
                style={{ color: '#00e5a0', fontFamily: "'DM Mono', monospace" }}
              >
                Step {steps[active].number}
              </div>

              <h3
                className="text-2xl md:text-3xl font-bold tracking-tight mb-4"
                style={{
                  color: '#e8ecf0',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '-0.02em',
                }}
              >
                {steps[active].title}
              </h3>

              <p
                className="text-sm leading-relaxed mb-8 max-w-md"
                style={{ color: '#8a95a3', fontFamily: "'DM Sans', sans-serif" }}
              >
                {steps[active].detail}
              </p>

              <div className="flex items-center gap-4">
                <div
                  className="px-4 py-3 rounded-xl"
                  style={{
                    background: 'rgba(0,229,160,0.08)',
                    border: '1px solid rgba(0,229,160,0.15)',
                  }}
                >
                  <div
                    className="text-2xl font-bold leading-none"
                    style={{
                      color: '#00e5a0',
                      fontFamily: "'Inter', sans-serif",
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {steps[active].stat}
                  </div>
                  <div
                    className="text-xs mt-1"
                    style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}
                  >
                    {steps[active].statLabel}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-2">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className="rounded-full transition-all duration-200"
                      style={{
                        width: active === i ? '20px' : '6px',
                        height: '6px',
                        background: active === i ? '#00e5a0' : '#1e242c',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p
            className="text-sm mb-4"
            style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
          >
            Ready to take control of your bankroll?
          </p>
          <a
            href="/get-started"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200"
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
            Get started free
          </a>
        </div>
      </div>

      {/* Bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, #1e242c 20%, #1e242c 80%, transparent)',
        }}
      />
    </section>
  );
}