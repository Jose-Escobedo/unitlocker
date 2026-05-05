'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
 {
  q: "What sports does UnitLocker cover?",
  a: "We post picks for CS2, NBA, NHL, MLB, NFL, and tennis. NBA, NHL, MLB, NFL, and tennis picks are posted during their active seasons. More sports may be added over time.",
},
  {
    q: "What is the confidence rating system?",
    a: "Every pick is rated 1–5 units. A 1u pick is a lean — lower confidence, smaller suggested stake. A 5u pick is a lock — our highest confidence call. Fire Picks are pinned to the top of the feed and represent the strongest plays of the day.",
  },
  {
    q: "When is UnitLocker Pro launching?",
    a: "We're focused on delivering the best pick feed experience first. Pro is on the roadmap — hit the notify button on the pricing section and you'll be first to know when it drops. Early members get priority access.",
  },
  {
    q: "Can community members post picks?",
    a: "Yes. The feed is community-driven — members can submit picks alongside staff picks. Community picks are labeled so you always know the source. The confidence rating system applies to all picks regardless of who posted them.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Monthly plan — cancel whenever you like, access continues until end of billing period. Annual plan — billed upfront, cancel renewal anytime. No long-term commitments.",
  },
  {
    q: "What picks do you post for CS2?",
    a: "We focus on player props from tier-1 and major tournaments — primarily kills and headshots. Picks come from both staff and the community. Some include context notes, others are a straight line with a confidence rating.",
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
          background: 'radial-gradient(ellipse, rgba(255,107,53,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
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
            <span style={{ color: '#ff6b35' }}>We&apos;ve got answers.</span>
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
                  border: `1px solid ${isOpen ? 'rgba(255,107,53,0.2)' : '#1e242c'}`,
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
                      background: isOpen ? 'rgba(255,107,53,0.1)' : '#181c22',
                      border: `1px solid ${isOpen ? 'rgba(255,107,53,0.2)' : '#1e242c'}`,
                      color: isOpen ? '#ff6b35' : '#5a6474',
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
            style={{ color: '#ff6b35' }}
            onMouseEnter={e => e.currentTarget.style.color = '#ff7d4d'}
            onMouseLeave={e => e.currentTarget.style.color = '#ff6b35'}
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