'use client';

import { Lock, BarChart2, TrendingUp, Star, ChevronRight, BarChart, Target, Percent, Trophy } from 'lucide-react';

const freeFeatures = [
  {
    icon: <Lock size={18} />,
    title: 'Bankroll Tracking',
    desc: 'Set your starting balance and watch it update in real time with every bet you log and settle. Always know exactly where you stand.',
    bullets: ['Live balance updates', 'Profit & loss over time', 'Starting vs current bankroll'],
  },
  {
    icon: <BarChart2 size={18} />,
    title: 'Bet Logging & History',
    desc: 'Log any bet in seconds — moneylines, spreads, totals, parlays, props. Your full history in one clean dashboard.',
    bullets: ['Log by sport, odds & stake', 'Win / Loss / Push settling', 'Full searchable history'],
  },
  {
    icon: <TrendingUp size={18} />,
    title: 'Win / Loss / Streak Stats',
    desc: 'Track your record, win rate, ROI, and current streak at a glance. Know if you\'re up or down without doing the math.',
    bullets: ['Win rate & ROI tracking', 'Current & best streaks', 'Performance over time chart'],
  },
  {
    icon: <Star size={18} />,
    title: 'Gamified Progress',
    desc: 'Earn XP for every bet logged and settled. Climb from Rookie to Legend and unlock achievements that reward discipline.',
    bullets: ['6 ranks from Rookie to Legend', 'XP for every action', 'Unlockable achievements'],
  },
];

const proFeatures = [
  {
    icon: <BarChart size={16} />,
    label: 'Performance by sport',
    desc: 'See your ROI, win rate, and profit broken down per sport.',
  },
  {
    icon: <Target size={16} />,
    label: 'Performance by bet type',
    desc: 'Moneyline vs spread vs parlay — find where you\'re actually sharp.',
  },
  {
    icon: <Percent size={16} />,
    label: 'Odds range analysis',
    desc: 'Discover which odds ranges you profit most from historically.',
  },
  {
    icon: <TrendingUp size={16} />,
    label: 'Average stake & odds',
    desc: 'Track your avg stake placed and avg odds taken over time.',
  },
  {
    icon: <BarChart2 size={16} />,
    label: 'Most profitable sport',
    desc: 'Instantly surface your best and worst performing sports.',
  },
  {
    icon: <Trophy size={16} />,
    label: 'Advanced streak data',
    desc: 'Win streaks and loss streaks broken down by sport and bet type.',
  },
];

export default function FeaturesSection() {
  return (
    <section
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

      {/* Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-80px',
          right: '10%',
          width: '500px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(0,229,160,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
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
              Features
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
            Everything you need.{' '}
            <span style={{ color: '#00e5a0' }}>Free to start.</span>
          </h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
          >
            All four core features are included in the free plan. Pro unlocks deep analytics built from your own betting data.
          </p>
        </div>

        {/* Free features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {freeFeatures.map((feature, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl transition-all duration-200 group"
              style={{
                background: '#111418',
                border: '1px solid #1e242c',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(0,229,160,0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#1e242c';
              }}
            >
              {/* Icon + Free badge */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'rgba(0,229,160,0.1)',
                    border: '1px solid rgba(0,229,160,0.2)',
                    color: '#00e5a0',
                  }}
                >
                  {feature.icon}
                </div>
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{
                    background: 'rgba(0,229,160,0.08)',
                    border: '1px solid rgba(0,229,160,0.2)',
                    color: '#00e5a0',
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  Free
                </span>
              </div>

              {/* Title */}
              <h3
                className="font-semibold text-base mb-2"
                style={{ color: '#e8ecf0', fontFamily: "'Inter', sans-serif" }}
              >
                {feature.title}
              </h3>

              {/* Desc */}
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
              >
                {feature.desc}
              </p>

              {/* Bullets */}
              <div className="flex flex-col gap-2">
                {feature.bullets.map((b, j) => (
                  <div key={j} className="flex items-center gap-2.5">
                    <div
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: '#00e5a0' }}
                    />
                    <span
                      className="text-xs"
                      style={{ color: '#8a95a3', fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {b}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pro analytics teaser */}
        <div
          className="rounded-2xl p-8 relative overflow-hidden"
          style={{
            background: '#111418',
            border: '1px solid #1e242c',
          }}
        >
          {/* Top accent */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(0,229,160,0.4) 40%, rgba(0,229,160,0.4) 60%, transparent)',
            }}
          />

          {/* Background watermark */}
          <div
            className="absolute right-8 top-1/2 -translate-y-1/2 font-black select-none pointer-events-none hidden md:block"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '96px',
              color: 'rgba(0,229,160,0.03)',
              letterSpacing: '-0.05em',
            }}
          >
            PRO
          </div>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{
                    background: 'rgba(245,200,66,0.1)',
                    border: '1px solid rgba(245,200,66,0.25)',
                    color: '#f5c842',
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  Coming Soon
                </span>
              </div>
              <h3
                className="text-xl md:text-2xl font-bold tracking-tight"
                style={{
                  color: '#e8ecf0',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '-0.02em',
                }}
              >
                Pro Analytics
              </h3>
              <p
                className="text-sm mt-1"
                style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
              >
                Deep insights built from your own betting history. Find your real edge.
              </p>
            </div>

            <a
              href="/get-started"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex-shrink-0"
              style={{
                background: 'rgba(245,200,66,0.1)',
                border: '1px solid rgba(245,200,66,0.25)',
                color: '#f5c842',
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(245,200,66,0.15)';
                e.currentTarget.style.borderColor = 'rgba(245,200,66,0.4)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(245,200,66,0.1)';
                e.currentTarget.style.borderColor = 'rgba(245,200,66,0.25)';
              }}
            >
              Get notified
              <ChevronRight size={14} />
            </a>
          </div>

          {/* Pro features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {proFeatures.map((f, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{
                  background: '#0a0c0f',
                  border: '1px solid #1e242c',
                }}
              >
                <div
                  className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mt-0.5"
                  style={{
                    background: 'rgba(245,200,66,0.08)',
                    border: '1px solid rgba(245,200,66,0.15)',
                    color: '#f5c842',
                  }}
                >
                  {f.icon}
                </div>
                <div>
                  <div
                    className="text-xs font-semibold mb-0.5"
                    style={{ color: '#8a95a3', fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {f.label}
                  </div>
                  <div
                    className="text-xs leading-relaxed"
                    style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {f.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
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