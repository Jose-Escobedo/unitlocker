'use client';

import Link from 'next/link';

function LogoMark({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
    </svg>
  );
}

const links = {
  Product: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
  ],
  Company: [
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-use' },
  ],
  Community: [
    { label: 'Discord', href: 'https://discord.gg/', external: true },
  ],
};

export default function Footer() {
  return (
    <footer
      className="relative px-6 md:px-12 pt-16 pb-8 overflow-hidden"
      style={{
        background: '#07080b',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Subtle glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '200px',
          background: 'radial-gradient(ellipse, rgba(255,107,53,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-12 mb-14">

          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-xs">
            <Link href="/" className="inline-flex items-center gap-2.5 w-fit" style={{ textDecoration: 'none' }}>
              <div style={{
                width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg, #ff6b35, #cc3d10)',
                color: '#0b0d12',
                boxShadow: '0 4px 14px rgba(255,107,53,0.35), inset 0 1px 0 rgba(255,255,255,0.25)',
              }}>
                <LogoMark size={18} />
              </div>
              <span style={{
                fontWeight: 600, letterSpacing: '0.06em', fontSize: 14,
                fontFamily: "'Inter', sans-serif", color: '#f5f6f8',
              }}>
                UNIT<b style={{ fontWeight: 800 }}>LOCKER</b>
              </span>
            </Link>

            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: 'rgba(245,246,248,0.35)', fontFamily: "'DM Sans', sans-serif" }}>
              Stop guessing. Start locking.
            </p>

            {/* Discord CTA */}
            <a
              href="https://discord.gg/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 w-fit px-3.5 py-2 rounded-lg text-xs font-medium transition-all duration-200"
              style={{
                background: 'rgba(88,101,242,0.1)',
                border: '1px solid rgba(88,101,242,0.25)',
                color: '#8b9cf4',
                fontFamily: "'DM Sans', sans-serif",
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(88,101,242,0.18)';
                e.currentTarget.style.borderColor = 'rgba(88,101,242,0.4)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(88,101,242,0.1)';
                e.currentTarget.style.borderColor = 'rgba(88,101,242,0.25)';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.055a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
              </svg>
              Join our Discord
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group} className="flex flex-col gap-4">
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.20)', fontFamily: "'DM Mono', monospace" }}>
                {group}
              </div>
              <div className="flex flex-col gap-3">
                {items.map(({ label, href, external }) =>
                  external ? (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm transition-colors duration-200 w-fit"
                      style={{ color: 'rgba(245,246,248,0.35)', fontFamily: "'DM Sans', sans-serif", textDecoration: 'none' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#ff6b35')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,246,248,0.35)')}
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      key={label}
                      href={href}
                      className="text-sm transition-colors duration-200 w-fit"
                      style={{ color: 'rgba(245,246,248,0.35)', fontFamily: "'DM Sans', sans-serif", textDecoration: 'none' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#ff6b35')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,246,248,0.35)')}
                    >
                      {label}
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p style={{ margin: 0, fontSize: 12, color: 'rgba(245,246,248,0.18)', fontFamily: "'DM Mono', monospace" }}>
            © {new Date().getFullYear()} UnitLocker. All rights reserved.
          </p>
          <p style={{ margin: 0, fontSize: 12, color: 'rgba(245,246,248,0.18)', fontFamily: "'DM Mono', monospace" }}>
            Built for bettors who play the long game.
          </p>
        </div>
      </div>
    </footer>
  );
}
