'use client';

import { Flame, Zap, BarChart2, MessageCircle, Rss, Crosshair, Mail } from 'lucide-react';

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

            {/* Beta notice */}
            <div style={{
              borderRadius: 12,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '16px 18px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
              textAlign: 'center',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,107,53,0.1)', color: '#ff6b35',
              }}>
                <Mail size={16} />
              </div>
              <div>
                <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: '#f5f6f8',
                  fontFamily: "'Inter', sans-serif" }}>
                  Currently in beta testing
                </p>
                <p style={{ margin: 0, fontSize: 11.5, color: 'rgba(245,246,248,0.45)',
                  fontFamily: "'DM Sans', sans-serif", lineHeight: 1.55 }}>
                  Subscriptions aren&apos;t open yet. You&apos;ll be notified at your email when beta launches.
                </p>
              </div>
            </div>
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
