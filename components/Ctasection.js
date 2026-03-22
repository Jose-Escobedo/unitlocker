'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';


export default function CTASection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setStatus('loading');
    setErrorMsg('');
    // TODO: wire up to backend / email platform
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 800);
  };

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

      {/* Center glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(0,229,160,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,229,160,0.15) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 100%)',
          opacity: 0.18,
        }}
      />

      <div className="relative max-w-2xl mx-auto text-center">

        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md mb-6"
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
            Get started today
          </span>
        </div>

        {/* Headline */}
        <h2
          className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          style={{
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '-0.03em',
            color: '#e8ecf0',
          }}
        >
          Your bankroll deserves{' '}
          <span style={{ color: '#00e5a0' }}>better than a spreadsheet.</span>
        </h2>

        {/* Subheadline */}
        <p
          className="text-base mb-10 leading-relaxed"
          style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
        >
          Join UnitLocker free. Track your bets, protect your bankroll, and get notified the moment Pro launches.
        </p>

        {/* Email form */}
        {status === 'success' ? (
          <div
            className="inline-flex items-center gap-3 px-6 py-4 rounded-xl"
            style={{
              background: 'rgba(0,229,160,0.08)',
              border: '1px solid rgba(0,229,160,0.25)',
            }}
          >
            <CheckCircle2 size={18} style={{ color: '#00e5a0' }} />
            <span
              className="text-sm font-medium"
              style={{ color: '#00e5a0', fontFamily: "'DM Sans', sans-serif" }}
            >
              You're on the list! We&apos;ll be in touch.
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  setErrorMsg('');
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
                style={{
                  background: '#111418',
                  border: `1px solid ${errorMsg ? 'rgba(255,71,87,0.5)' : '#1e242c'}`,
                  color: '#e8ecf0',
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onFocus={e => {
                  if (!errorMsg) e.target.style.borderColor = 'rgba(0,229,160,0.4)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(0,229,160,0.07)';
                }}
                onBlur={e => {
                  if (!errorMsg) e.target.style.borderColor = '#1e242c';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-200 flex-shrink-0"
              style={{
                background: status === 'loading' ? 'rgba(0,229,160,0.5)' : '#00e5a0',
                color: '#0a0c0f',
                fontFamily: "'DM Sans', sans-serif",
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              }}
              onMouseEnter={e => {
                if (status !== 'loading') {
                  e.currentTarget.style.background = '#00f0aa';
                  e.currentTarget.style.boxShadow = '0 0 24px rgba(0,229,160,0.35)';
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = status === 'loading' ? 'rgba(0,229,160,0.5)' : '#00e5a0';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {status === 'loading' ? 'Joining...' : (
                <>
                  Join free
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>
        )}

        {/* Error message */}
        {errorMsg && (
          <p
            className="text-xs mt-2"
            style={{ color: '#ff4757', fontFamily: "'DM Sans', sans-serif" }}
          >
            {errorMsg}
          </p>
        )}

        {/* Reassurance */}
        <p
          className="text-xs mt-5"
          style={{ color: '#2a3240', fontFamily: "'DM Sans', sans-serif" }}
        >
          No spam. No credit card. Unsubscribe anytime.
        </p>

        {/* Stat strip */}
        <div
          className="flex items-center justify-center gap-8 mt-14 pt-10"
          style={{ borderTop: '1px solid #1e242c' }}
        >
          {[
            { value: '10K+', label: 'Bettors tracking' },
            { value: '$2.4M', label: 'Bankroll tracked' },
            { value: '100%', label: 'Free to start' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span
                className="text-2xl font-bold leading-none"
                style={{
                  color: '#00e5a0',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '-0.03em',
                }}
              >
                {stat.value}
              </span>
              <span
                className="text-xs tracking-wider uppercase mt-1.5"
                style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}
              >
                {stat.label}
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