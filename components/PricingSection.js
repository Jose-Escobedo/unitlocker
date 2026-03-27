'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Check, Lock, BarChart2, TrendingUp, Star, BarChart, Target, Percent, Trophy, Bell, MessageCircle } from 'lucide-react';

const freeTier = [
  { icon: <Lock size={14} />, label: 'Bankroll tracking' },
  { icon: <BarChart2 size={14} />, label: 'Bet logging & history' },
  { icon: <TrendingUp size={14} />, label: 'Win / loss / streak stats' },
  { icon: <Star size={14} />, label: 'Gamification (XP, ranks, achievements)' },
  
];

const proTier = [
  { icon: <Check size={14} />, label: 'Everything in Free' },
  { icon: <BarChart size={14} />, label: 'Performance breakdown by sport' },
  { icon: <Target size={14} />, label: 'Performance by bet type' },
  { icon: <Percent size={14} />, label: 'Odds range analysis' },
  { icon: <TrendingUp size={14} />, label: 'Average stake & average odds' },
  { icon: <BarChart2 size={14} />, label: 'Most profitable sport & bet type' },
  { icon: <MessageCircle size={14} />, label: 'Premium Discord Access' },
];

export default function PricingSection() {
  const [annual, setAnnual] = useState(false);

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

      {/* Glow left */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-60px',
          left: '5%',
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
              Pricing
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
            Start free.{' '}
            <span style={{ color: '#00e5a0' }}>Upgrade when you&apos;re ready.</span>
          </h2>
          <p
            className="text-base max-w-lg mx-auto mb-8"
            style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
          >
            No credit card required. Pro unlocks advanced features, analytics and access to our premium discord when it launches.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3">
            <span
              className="text-sm"
              style={{ color: annual ? '#5a6474' : '#e8ecf0', fontFamily: "'DM Sans', sans-serif", transition: 'color 0.2s' }}
            >
              Monthly
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className="relative cursor-pointer w-11 h-6 rounded-full transition-all duration-200 flex-shrink-0"
              style={{ background: annual ? '#00e5a0' : '#1e242c' }}
            >
              <div
                className="absolute top-1 w-4 h-4 rounded-full transition-all duration-200"
                style={{
                  background: '#e8ecf0',
                  left: annual ? 'calc(100% - 20px)' : '4px',
                }}
              />
            </button>
            <div className="flex items-center gap-2">
              <span
                className="text-sm"
                style={{ color: annual ? '#e8ecf0' : '#5a6474', fontFamily: "'DM Sans', sans-serif", transition: 'color 0.2s' }}
              >
                Annual
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{
                  background: 'rgba(0,229,160,0.1)',
                  border: '1px solid rgba(0,229,160,0.2)',
                  color: '#00e5a0',
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                Save 33%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">

          {/* Free card */}
          <div
            className="rounded-2xl p-7 flex flex-col relative overflow-hidden transition-all duration-200"
            style={{
              background: '#111418',
              border: '1px solid #1e242c',
            }}
          >
            {/* Plan label */}
            <div className="mb-6">
              <div
                className="text-xs font-medium tracking-widest uppercase mb-3"
                style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}
              >
                Free
              </div>
              <div
                className="text-4xl font-bold tracking-tight leading-none mb-1"
                style={{
                  color: '#e8ecf0',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '-0.03em',
                }}
              >
                $0
              </div>
              <div
                className="text-sm mt-2"
                style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
              >
                No credit card needed.
              </div>
            </div>

            {/* Divider */}
            <div className="h-px mb-6" style={{ background: '#1e242c' }} />

            {/* Features */}
            <div className="flex flex-col gap-3 flex-1 mb-8">
              {freeTier.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center"
                    style={{
                      background: 'rgba(0,229,160,0.1)',
                      color: '#00e5a0',
                    }}
                  >
                    {item.icon}
                  </div>
                  <span
                    className="text-sm"
                    style={{ color: '#8a95a3', fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/get-started"
              className="w-full flex items-center justify-center py-3 rounded-lg font-semibold text-sm transition-all duration-200"
              style={{
                background: '#00e5a0',
                color: '#0a0c0f',
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#00f0aa';
                e.currentTarget.style.boxShadow = '0 0 24px rgba(0,229,160,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#00e5a0';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Get started free
            </Link>
          </div>

          {/* Pro card */}
          <div
            className="rounded-2xl p-7 flex flex-col relative overflow-hidden transition-all duration-200"
            style={{
              background: '#111418',
              border: '1px solid rgba(245,200,66,0.2)',
            }}
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: 'linear-gradient(90deg, transparent, #f5c842 40%, #f5c842 60%, transparent)',
              }}
            />

            {/* Coming soon badge */}
            <div
              className="absolute top-5 right-5 text-xs font-medium px-2.5 py-1 rounded-full"
              style={{
                background: 'rgba(245,200,66,0.1)',
                border: '1px solid rgba(245,200,66,0.25)',
                color: '#f5c842',
                fontFamily: "'DM Mono', monospace",
              }}
            >
              Coming Soon
            </div>

            {/* Plan label */}
            <div className="mb-6">
              <div
                className="text-xs font-medium tracking-widest uppercase mb-3"
                style={{ color: '#f5c842', fontFamily: "'DM Mono', monospace" }}
              >
                Pro
              </div>
              <div className="flex items-end gap-2">
                <div
                  className="text-4xl font-bold tracking-tight leading-none"
                  style={{
                    color: '#e8ecf0',
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: '-0.03em',
                  }}
                >
                  {annual ? '$6.67' : '$9.99'}
                </div>
                <div
                  className="text-sm mb-1"
                  style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
                >
                  / month
                </div>
              </div>
              <div
                className="text-xs mt-1"
                style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
              >
                {annual ? 'Billed $79.99/year' : 'Billed monthly'}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px mb-6" style={{ background: '#1e242c' }} />

            {/* Features */}
            <div className="flex flex-col gap-3 flex-1 mb-8">
              {proTier.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center"
                    style={{
                      background: 'rgba(245,200,66,0.08)',
                      color: '#f5c842',
                    }}
                  >
                    {item.icon}
                  </div>
                  <span
                    className="text-sm"
                    style={{
                      color: i === 0 ? '#e8ecf0' : '#8a95a3',
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA — notify me */}
            <button
              className="w-full cursor-pointer flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm transition-all duration-200"
              style={{
                background: 'rgba(245,200,66,0.08)',
                border: '1px solid rgba(245,200,66,0.25)',
                color: '#f5c842',
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(245,200,66,0.14)';
                e.currentTarget.style.borderColor = 'rgba(245,200,66,0.4)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(245,200,66,0.08)';
                e.currentTarget.style.borderColor = 'rgba(245,200,66,0.25)';
              }}
            >
              <Bell size={14} />
              Notify me at launch
            </button>
          </div>
        </div>

        {/* Reassurance strip */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-12">
          {[
            'No credit card required',
            'Cancel anytime',
           
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00e5a0' }} />
              <span
                className="text-sm"
                style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
              >
                {item}
              </span>
            </div>
          ))}
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