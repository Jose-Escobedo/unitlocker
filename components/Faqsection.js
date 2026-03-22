'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "What's included in the free plan?",
    a: "The free plan includes everything you need to manage your bankroll effectively — bet logging and history, real-time bankroll tracking, win/loss/streak stats, and the full gamification system including XP, ranks, and achievements. No credit card required, no time limit.",
  },
  {
    q: "How does the gamification work?",
    a: "Every action you take in UnitLocker earns you XP — logging a bet, settling a result, maintaining a streak. As your XP grows you climb through 6 ranks from Rookie all the way to Legend. Along the way you unlock achievements tied to milestones like your first win, a 5-bet win streak, doubling your bankroll, and more. It's designed to keep you accountable and make disciplined betting feel rewarding.",
  },
  {
    q: "When is Pro launching?",
    a: "We're focused on nailing the free experience first. Pro is coming — hit the notify button on the pricing card and we'll let you know the moment it's live. Early signups will be the first to hear.",
  },
  {
    q: "What do I get with the Pro Discord community?",
    a: "Pro members get access to a private Discord server with picks and analysis from verified cappers as well as the wider UnitLocker community. It's a space for serious bettors to share insight, discuss lines, and help each other out.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. There are no long-term commitments on the monthly plan — cancel whenever you want and you keep access until the end of your billing period. On the annual plan you're billed upfront for the year, but you can cancel renewal at any time.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState(null);

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
          background: 'radial-gradient(ellipse, rgba(0,229,160,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
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
              FAQ
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
            Questions?{' '}
            <span style={{ color: '#00e5a0' }}>We&apos;ve got answers.</span>
          </h2>
          <p
            className="text-base"
            style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
          >
            Everything you need to know before getting started.
          </p>
        </div>

        {/* FAQ list */}
        <div className="flex flex-col gap-2">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="rounded-xl overflow-hidden transition-all duration-200"
                style={{
                  background: '#111418',
                  border: `1px solid ${isOpen ? 'rgba(0,229,160,0.2)' : '#1e242c'}`,
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-all duration-200"
                >
                  <span
                    className="font-semibold text-sm md:text-base"
                    style={{
                      color: isOpen ? '#e8ecf0' : '#a8b3bf',
                      fontFamily: "'Inter', sans-serif",
                      transition: 'color 0.2s',
                    }}
                  >
                    {faq.q}
                  </span>
                  <div
                    className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isOpen ? 'rgba(0,229,160,0.1)' : '#181c22',
                      border: `1px solid ${isOpen ? 'rgba(0,229,160,0.2)' : '#1e242c'}`,
                      color: isOpen ? '#00e5a0' : '#5a6474',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    <ChevronDown size={14} />
                  </div>
                </button>

                {/* Answer */}
                <div
                  style={{
                    maxHeight: isOpen ? '300px' : '0px',
                    overflow: 'hidden',
                    transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <div
                    className="px-6 pb-5"
                    style={{
                      borderTop: '1px solid #1e242c',
                      paddingTop: '16px',
                    }}
                  >
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: '#8a95a3', fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom prompt */}
        <div
          className="text-center mt-10 text-sm"
          style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
        >
          Still have questions?{' '}
          <a
            href="/contact"
            className="transition-colors duration-200"
            style={{ color: '#00e5a0' }}
            onMouseEnter={e => e.currentTarget.style.color = '#00f0aa'}
            onMouseLeave={e => e.currentTarget.style.color = '#00e5a0'}
          >
            Get in touch
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