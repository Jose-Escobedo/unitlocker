'use client';

import {
  Rss, Crosshair, Flame, Calculator, ExternalLink, ChevronRight,
  BarChart2, Bell, Shield, Zap,
} from 'lucide-react';

const coreFeatures = [
  {
    icon: <Rss size={18} />,
    title: 'Live Picks Feed',
    desc: 'A clean, scrollable feed of daily prop picks across CS2, NBA, NHL, and MLB — posted fresh every day.',
    bullets: ['Staff & community picks', 'Organized by sport', 'Fire Picks pinned at top'],
    color: '#ff6b35',
  },
  {
    icon: <Crosshair size={18} />,
    title: 'CS2 Props',
    desc: 'Kills, headshots, rating — CS2 player props from the biggest tournaments, with matchup context.',
    bullets: ['Major & tier-1 tournaments', 'Staff & community picks', 'Over / Under calls'],
    color: '#ff6b35',
  },
  {
    icon: <Zap size={18} />,
    title: 'NBA · NFL · MLB · NHL · TENNIS ',
    desc: 'Full multi-sport coverage. Points, assists, rebounds, strikeouts, goals — all in one feed.',
    bullets: ['Points, PRA, rebounds, assists', 'Pitcher strikeouts & hits', 'Goals, assists, shots on goal'],
    color: '#00e5a0',
  },
  {
    icon: <Flame size={18} />,
    title: 'Confidence System',
    desc: 'Every pick is rated 1–5 units. See instantly how strong the call is before you lock anything.',
    bullets: ['1u = lean, 5u = lock', 'Hot badge on fire picks', 'At-a-glance strength signal'],
    color: '#f5c842',
  },
  {
    icon: <Calculator size={18} />,
    title: 'Unit Calculator',
    desc: 'Built into every card. Enter your bankroll and instantly see the suggested bet size.',
    bullets: ['Inline, no page change', 'Auto-scales to your bankroll', 'Unit-based sizing'],
    color: '#4da6ff',
  },
  {
  icon: <Zap size={18} />,
  title: 'Fast Picks Feed',
  desc: 'Get straight to the play. No fluff, no digging. Just the picks you need, when you need them.',
  bullets: ['Updated daily', 'Clean, scrollable feed', 'No distractions'],
  color: '#ff6b35',
},
];

const proFeatures = [
  {
    icon: <BarChart2 size={16} />,
    label: 'Full pick history',
    desc: 'Every settled pick with results — see what hit and what missed over time.',
  },
  {
    icon: <Bell size={16} />,
    label: 'Pick alerts',
    desc: 'Get notified the moment a new Fire Pick drops, before the line moves.',
  },
  {
    icon: <Shield size={16} />,
    label: 'Alpha picks',
    desc: 'Exclusive high-confidence picks not posted to the public feed.',
  },
  {
    icon: <Flame size={16} />,
    label: 'Early access',
    desc: 'See picks hours before they go live on the main feed.',
  },
  {
    icon: <Crosshair size={16} />,
    label: 'Deep CS2 stats',
    desc: 'Map-by-map breakdowns, opponent tendencies, and recent LAN form.',
  },
  {
    icon: <Zap size={16} />,
    label: 'Discord community',
    desc: 'Premium channel access — live discussion, line movement alerts, real-time takes.',
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
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
          top: '-80px',
          right: '10%',
          width: '500px',
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
            <span style={{ color: '#ff6b35' }}>In one feed.</span>
          </h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
          >
           The full picks feed, unit calculator, and a fast betting workflow — all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {coreFeatures.map((feature, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl transition-all duration-200"
              style={{
                background: '#111418',
                border: '1px solid #1e242c',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${feature.color}33`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#1e242c';
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${feature.color}14`,
                    border: `1px solid ${feature.color}2a`,
                    color: feature.color,
                  }}
                >
                  {feature.icon}
                </div>
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: feature.color, boxShadow: `0 0 6px ${feature.color}88` }}
                />
              </div>

              <h3
                className="font-semibold text-base mb-2"
                style={{ color: '#e8ecf0', fontFamily: "'Inter', sans-serif" }}
              >
                {feature.title}
              </h3>

              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
              >
                {feature.desc}
              </p>

              <div className="flex flex-col gap-2">
                {feature.bullets.map((b, j) => (
                  <div key={j} className="flex items-center gap-2.5">
                    <div
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: feature.color }}
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
