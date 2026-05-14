'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Rss, Crosshair, Zap, Flame, BarChart2, MessageCircle, ArrowRight, Shield } from 'lucide-react';

const proFeatures = [
  { icon: <Rss size={14} />,        label: 'Full picks feed — CS2, NBA, NHL, MLB, NFL & Tennis' },
  { icon: <Crosshair size={14} />,  label: 'Daily CS2 kills & headshots props'                  },
  { icon: <Zap size={14} />,        label: 'Multi-sport coverage, updated daily'                },
  { icon: <BarChart2 size={14} />,  label: 'Player history charts — L5, L10 & H2H'             },
  { icon: <Flame size={14} />,      label: 'Fire Picks — auto-detected at 90%+ L10'            },
  { icon: <MessageCircle size={14} />, label: 'Premium Discord community'                       },
];

export default function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section
      id="pricing"
      className="relative py-28 px-6 md:px-12 overflow-hidden"
      style={{ background: '#0a0c0f' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #1e242c 20%, #1e242c 80%, transparent)' }} />

      <div className="absolute pointer-events-none"
        style={{ bottom: '-60px', left: '5%', width: '500px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(255,107,53,0.05) 0%, transparent 70%)' }} />

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md mb-5"
            style={{ background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.2)' }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#ff6b35' }} />
            <span className="text-xs font-medium tracking-widest uppercase"
              style={{ color: '#ff6b35', fontFamily: "'DM Mono', monospace" }}>Pricing</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.03em', color: '#e8ecf0' }}>
            One plan.{' '}<span style={{ color: '#ff6b35' }}>Full access.</span>
          </h2>
          <p className="text-base max-w-lg mx-auto mb-8"
            style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}>
            Everything in the feed — picks, analysis, player history charts, and Fire Pick alerts. One subscription.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3">
            <span className="text-sm" style={{ color: annual ? '#5a6474' : '#e8ecf0', fontFamily: "'DM Sans', sans-serif", transition: 'color 0.2s' }}>
              Monthly
            </span>
            <button onClick={() => setAnnual(!annual)}
              className="relative cursor-pointer w-11 h-6 rounded-full transition-all duration-200 flex-shrink-0"
              style={{ background: annual ? '#ff6b35' : '#1e242c' }}>
              <div className="absolute top-1 w-4 h-4 rounded-full transition-all duration-200"
                style={{ background: '#e8ecf0', left: annual ? 'calc(100% - 20px)' : '4px' }} />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm" style={{ color: annual ? '#e8ecf0' : '#5a6474', fontFamily: "'DM Sans', sans-serif", transition: 'color 0.2s' }}>
                Annual
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.2)', color: '#ff6b35', fontFamily: "'DM Mono', monospace" }}>
                Save 33%
              </span>
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="max-w-md mx-auto">
          <div className="rounded-2xl p-8 flex flex-col relative overflow-hidden"
            style={{ background: '#111418', border: '1px solid rgba(255,107,53,0.25)' }}>
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #ff6b35 40%, #ff6b35 60%, transparent)' }} />

            {/* Price */}
            <div className="mb-6">
              <div className="text-xs font-medium tracking-widest uppercase mb-3"
                style={{ color: '#ff6b35', fontFamily: "'DM Mono', monospace" }}>
                UnitLocker Pro
              </div>
              <div className="flex items-end gap-2">
                <div className="text-5xl font-black tracking-tight leading-none"
                  style={{ color: '#e8ecf0', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.04em' }}>
                  {annual ? '$6.67' : '$9.99'}
                </div>
                <div className="text-sm mb-1.5" style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}>
                  / month
                </div>
              </div>
              <div className="text-xs mt-1" style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}>
                {annual ? 'Billed $79.99 / year · cancel anytime' : 'Billed monthly · cancel anytime'}
              </div>
            </div>

            <div className="h-px mb-6" style={{ background: '#1e242c' }} />

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {proFeatures.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center"
                    style={{ background: 'rgba(255,107,53,0.1)', color: '#ff6b35' }}>
                    {item.icon}
                  </div>
                  <span className="text-sm" style={{ color: '#8a95a3', fontFamily: "'DM Sans', sans-serif" }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/get-started"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #ff6b35, #cc3d10)',
                color: '#0a0c0f',
                fontFamily: "'DM Sans', sans-serif",
                boxShadow: '0 4px 20px rgba(255,107,53,0.35)',
                textDecoration: 'none',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 28px rgba(255,107,53,0.55)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,107,53,0.35)'}
            >
              Get Access
              <ArrowRight size={14} />
            </Link>

            <p className="text-xs text-center mt-3" style={{ color: '#2a3240', fontFamily: "'DM Mono', monospace" }}>
              Secure checkout via Stripe · Cancel anytime
            </p>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-10">
          {[
            { icon: <Shield size={13} />, label: 'Stripe-secured payments' },
            { icon: <ArrowRight size={13} style={{ transform: 'rotate(45deg)' }} />, label: 'Cancel anytime' },
            { icon: <Flame size={13} />, label: 'Instant feed access' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span style={{ color: '#ff6b35' }}>{item.icon}</span>
              <span className="text-sm" style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #1e242c 20%, #1e242c 80%, transparent)' }} />
    </section>
  );
}
