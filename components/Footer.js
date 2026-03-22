'use client';

import Link from 'next/link';

const links = {
  Product: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
  ],
  Company: [
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
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
        background: '#0a0c0f',
        borderTop: '1px solid #1e242c',
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
          background: 'radial-gradient(ellipse, rgba(0,229,160,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-12 mb-14">

          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-xs">
            {/* Logo mark */}
            <Link href="/" className="inline-flex items-center gap-2.5 w-fit">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: '#00e5a0' }}
              >
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                  <path
                    d="M4.5 7.5V5a3.5 3.5 0 0 1 7 0v2.5"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect x="1.5" y="7.5" width="13" height="9" rx="2.5" fill="white" />
                  <circle cx="8" cy="12" r="1.5" fill="#00e5a0" />
                  <rect x="7.25" y="12" width="1.5" height="2.5" rx="0.75" fill="#00e5a0" />
                </svg>
              </div>
              <span
                className="font-black text-xl leading-none"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '-0.5px',
                  color: '#e8ecf0',
                }}
              >
                <span style={{ color: '#00e5a0' }}>UNIT</span>LOCKER
              </span>
            </Link>

            <p
              className="text-sm leading-relaxed"
              style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
            >
              Bankroll management for sports bettors who are serious about long-term profit.
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
              {/* Discord icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.055a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
              </svg>
              Join our Discord
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group} className="flex flex-col gap-4">
              <div
                className="text-xs font-medium tracking-widest uppercase"
                style={{ color: '#2a3240', fontFamily: "'DM Mono', monospace" }}
              >
                {group}
              </div>
              <div className="flex flex-col gap-3">
                {items.map(({ label, href, external }) => (
                  external ? (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm transition-colors duration-200 w-fit"
                      style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
                      onMouseEnter={e => e.currentTarget.style.color = '#00e5a0'}
                      onMouseLeave={e => e.currentTarget.style.color = '#5a6474'}
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      key={label}
                      href={href}
                      className="text-sm transition-colors duration-200 w-fit"
                      style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
                      onMouseEnter={e => e.currentTarget.style.color = '#00e5a0'}
                      onMouseLeave={e => e.currentTarget.style.color = '#5a6474'}
                    >
                      {label}
                    </Link>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid #1e242c' }}
        >
          <p
            className="text-xs"
            style={{ color: '#2a3240', fontFamily: "'DM Mono', monospace" }}
          >
            © {new Date().getFullYear()} UnitLocker. All rights reserved.
          </p>
          <p
            className="text-xs"
            style={{ color: '#2a3240', fontFamily: "'DM Mono', monospace" }}
          >
            Built for bettors who play the long game.
          </p>
        </div>
      </div>
    </footer>
  );
}