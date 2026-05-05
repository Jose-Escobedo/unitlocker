'use client';

import { useState } from 'react';
import { UserPlus, Rss, LineChart, CheckCircle, ExternalLink, Trophy } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Create your account',
    desc: 'Sign up in seconds and get instant access to the full picks feed.',
    detail: 'Join UnitLocker and get access to the daily picks feed — CS2, NBA, NHL, and MLB props posted by staff and the community.',
    stat: '< 1 min',
    statLabel: 'to get access',
  },
  {
    number: '02',
    icon: Rss,
    title: 'Browse the feed',
    desc: 'Fresh prop picks posted daily. Filter by sport, see the line, and check the confidence rating.',
    detail: 'The feed shows every pick card with the player, stat, line, and an Over/Under call. Filter by CS2, NBA, NHL, or MLB. Fire Picks are pinned to the top.',
    stat: 'Daily',
    statLabel: 'fresh picks',
  },
  {
    number: '03',
    icon: LineChart,
    title: 'Check the pick',
    desc: 'See the line, the Over/Under call, and the confidence rating. Some picks include notes.',
    detail: 'Each card shows the player, stat, line, and a 1–5u confidence rating. Staff picks and community picks may include context notes — but the rating tells you how strong the call is.',
    stat: '1–5u',
    statLabel: 'confidence system',
  },
 {
  number: '04',
  icon: CheckCircle,
  title: 'Clear pick breakdown',
  desc: 'See the exact play, odds, and context instantly so you can place it fast on your book.',
  detail: 'Every pick card is structured so you know exactly what to bet without second guessing. No digging, no confusion — just open your book and place it confidently.',
  stat: '0 confusion',
  statLabel: 'when placing picks',
},
  {
    number: '05',
    icon: Trophy,
    title: 'Track what hit',
    desc: 'See which picks won, lost, or pushed. Watch your read improve over time.',
    detail: 'Settled picks update with results. You can see the full history of what was posted, what hit, and how the confidence ratings held up — so you get smarter every session.',
    stat: 'Full',
    statLabel: 'result history',
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
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, #1e242c 20%, #1e242c 80%, transparent)',
        }}
      />

      <div
        className="absolute pointer-events-none"
        style={{
          top: '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(255,107,53,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md mb-5"
            style={{
              background: 'rgba(255,107,53,0.08)',
              border: '1px solid rgba(255,107,53,0.2)',
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#ff6b35' }} />
            <span
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: '#ff6b35', fontFamily: "'DM Mono', monospace" }}
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
            From signup to{' '}
            <span style={{ color: '#ff6b35' }}>locked pick.</span>
          </h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
          >
            Five steps. No complexity. Browse the feed, trust the analysis, lock the line.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
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
                    border: `1px solid ${isActive ? 'rgba(255,107,53,0.25)' : 'transparent'}`,
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
                        color: isActive ? '#ff6b35' : '#2a3240',
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
                        background: isActive ? '#ff6b35' : 'transparent',
                        boxShadow: isActive ? '0 0 8px rgba(255,107,53,0.5)' : 'none',
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

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
                  background: 'linear-gradient(90deg, transparent, #ff6b35 40%, #ff6b35 60%, transparent)',
                }}
              />
              <div
                className="absolute bottom-4 right-6 font-bold select-none pointer-events-none"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '120px',
                  lineHeight: 1,
                  color: 'rgba(255,107,53,0.03)',
                  letterSpacing: '-0.05em',
                }}
              >
                {steps[active].number}
              </div>

              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-6"
                style={{
                  background: 'rgba(255,107,53,0.1)',
                  border: '1px solid rgba(255,107,53,0.2)',
                  color: '#ff6b35',
                }}
              >
                {(() => { const Icon = steps[active].icon; return <Icon size={18} />; })()}
              </div>

              <div
                className="text-xs font-medium tracking-widest uppercase mb-2"
                style={{ color: '#ff6b35', fontFamily: "'DM Mono', monospace" }}
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
                    background: 'rgba(255,107,53,0.08)',
                    border: '1px solid rgba(255,107,53,0.15)',
                  }}
                >
                  <div
                    className="text-2xl font-bold leading-none"
                    style={{
                      color: '#ff6b35',
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
                        background: active === i ? '#ff6b35' : '#1e242c',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <p
            className="text-sm mb-4"
            style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
          >
            Ready to see today&apos;s picks?
          </p>
          <a
            href="/get-started"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200"
            style={{
              background: '#ff6b35',
              color: '#0a0c0f',
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: '0 4px 20px rgba(255,107,53,0.3)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 0 28px rgba(255,107,53,0.5)';
              e.currentTarget.style.background = '#ff7d4d';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,107,53,0.3)';
              e.currentTarget.style.background = '#ff6b35';
            }}
          >
            Join UnitLocker
          </a>
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
