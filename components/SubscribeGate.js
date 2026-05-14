'use client';

import { useState } from 'react';
import { Flame, Zap, BarChart2, MessageCircle, Rss, Crosshair } from 'lucide-react';

const FEATURES = [
  { icon: Rss,       text: 'Full picks feed — CS2, NBA, NHL, MLB, NFL & Tennis' },
  { icon: Flame,     text: 'Fire Picks — auto-detected at 90%+ L10' },
  { icon: BarChart2, text: 'Player history charts — L5, L10 & H2H' },
  { icon: Crosshair, text: 'Daily CS2 kills & headshots props' },
  { icon: Zap,       text: 'Multi-sport coverage, updated daily' },
  { icon: MessageCircle, text: 'Premium Discord community' },
];

function SkeletonRow() {
  return (
    <div style={{
      borderRadius: 18,
      background: 'rgba(20,22,28,0.55)',
      border: '1px solid rgba(255,255,255,0.06)',
      height: 220,
    }} />
  );
}

export default function SubscribeGate() {
  const [plan, setPlan] = useState('monthly');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const price = plan === 'annual' ? '$79.99 / year' : '$9.99 / month';
  const sub   = plan === 'annual' ? '($6.67 / mo · save 33%)' : 'Cancel anytime';

  const handleSubscribe = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError('Something went wrong. Please try again.');
        setLoading(false);
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: 480 }}>

      {/* Blurred fake picks beneath */}
      <div style={{ filter: 'blur(6px)', opacity: 0.25, pointerEvents: 'none', display: 'grid', gap: 18 }}
        className="picks-grid">
        <SkeletonRow /><SkeletonRow /><SkeletonRow /><SkeletonRow />
      </div>

      {/* Gate overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        paddingTop: 24,
        background: 'linear-gradient(180deg, transparent 0%, rgba(7,8,11,0.7) 30%)',
      }}>
        <div style={{
          width: '100%', maxWidth: 440,
          background: 'linear-gradient(180deg, #12141a 0%, #0e1015 100%)',
          border: '1px solid rgba(255,107,53,0.2)',
          borderRadius: 22,
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,107,53,0.08)',
        }}>
          {/* Top accent line */}
          <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, #ff6b35 40%, #ff6b35 60%, transparent)' }} />

          <div style={{ padding: '28px 28px 24px' }}>
            {/* Label */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 16,
              padding: '4px 10px', borderRadius: 999,
              background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.2)' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff6b35',
                animation: 'sgPulse 1.6s ease-in-out infinite' }} />
              <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.1em', color: '#ff6b35',
                fontFamily: "'DM Mono', monospace" }}>UNLOCK THE FEED</span>
            </div>

            <h2 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 700, color: '#f5f6f8',
              fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}>
              Start seeing today&apos;s picks
            </h2>
            <p style={{ margin: '0 0 22px', fontSize: 13, color: 'rgba(245,246,248,0.45)',
              fontFamily: "'DM Sans', sans-serif", lineHeight: 1.55 }}>
              Daily CS2, NBA, NHL, MLB, NFL &amp; Tennis props — with player history and fire pick detection.
            </p>

            {/* Plan toggle */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 22 }}>
              {['monthly', 'annual'].map(p => (
                <button key={p} onClick={() => setPlan(p)} style={{
                  flex: 1, padding: '11px 8px', borderRadius: 12, border: 0, cursor: 'pointer',
                  position: 'relative', overflow: 'hidden',
                  background: plan === p ? 'rgba(255,107,53,0.12)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${plan === p ? 'rgba(255,107,53,0.4)' : 'rgba(255,255,255,0.07)'}`,
                  transition: 'all .2s',
                }}>
                  {p === 'annual' && (
                    <div style={{ position: 'absolute', top: 6, right: 6,
                      fontSize: 8.5, fontWeight: 700, letterSpacing: '0.06em',
                      padding: '2px 5px', borderRadius: 4,
                      background: 'rgba(245,200,66,0.15)', color: '#f5c842',
                      border: '1px solid rgba(245,200,66,0.25)',
                      fontFamily: "'DM Mono', monospace" }}>SAVE 33%</div>
                  )}
                  <div style={{ fontSize: plan === p ? 18 : 16, fontWeight: 700,
                    color: plan === p ? '#f5f6f8' : 'rgba(245,246,248,0.4)',
                    fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}>
                    {p === 'monthly' ? '$9.99' : '$79.99'}
                  </div>
                  <div style={{ fontSize: 10.5, color: plan === p ? 'rgba(245,246,248,0.5)' : 'rgba(245,246,248,0.25)',
                    fontFamily: "'DM Mono', monospace", marginTop: 2 }}>
                    {p === 'monthly' ? '/ month' : '/ year'}
                  </div>
                </button>
              ))}
            </div>

            {/* Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 22 }}>
              {FEATURES.map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,107,53,0.1)', color: '#ff6b35' }}>
                    <Icon size={12} />
                  </div>
                  <span style={{ fontSize: 12.5, color: 'rgba(245,246,248,0.65)',
                    fontFamily: "'DM Sans', sans-serif" }}>{text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={handleSubscribe}
              disabled={loading}
              style={{
                width: '100%', padding: '14px',
                borderRadius: 12, border: 0, cursor: loading ? 'not-allowed' : 'pointer',
                background: loading ? 'rgba(255,107,53,0.5)' : 'linear-gradient(135deg, #ff6b35, #cc3d10)',
                color: '#0a0c0f', fontSize: 14, fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                boxShadow: loading ? 'none' : '0 4px 24px rgba(255,107,53,0.4)',
                transition: 'all .2s',
              }}
            >
              {loading ? 'Redirecting to checkout…' : `Unlock the Feed — ${price}`}
            </button>

            {error && (
              <p style={{ margin: '10px 0 0', fontSize: 12, color: '#ff4757',
                fontFamily: "'DM Mono', monospace", textAlign: 'center' }}>{error}</p>
            )}

            <p style={{ margin: '10px 0 0', fontSize: 11, color: 'rgba(245,246,248,0.25)',
              fontFamily: "'DM Mono', monospace", textAlign: 'center' }}>
              {sub} · Secure checkout via Stripe
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes sgPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }
        .picks-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        @media(max-width:700px){ .picks-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
