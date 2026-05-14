'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  User, Lock, CreditCard, Eye, EyeOff,
  CheckCircle2, Crosshair, Flame, Zap, BarChart2,
  Rss, MessageCircle, LogOut,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const PRO_FEATURES = [
  { icon: Rss,         text: 'Full picks feed — CS2, NBA, NHL, MLB, NFL & Tennis' },
  { icon: Flame,       text: 'Fire Picks — auto-detected at 90%+ L10'             },
  { icon: BarChart2,   text: 'Player history charts — L5, L10 & H2H'              },
  { icon: Crosshair,   text: 'Daily CS2 kills & headshots props'                  },
  { icon: Zap,         text: 'Multi-sport coverage, updated daily'                },
  { icon: MessageCircle, text: 'Premium Discord community'                        },
];

// ── Input ──
function Input({ label, type = 'text', value, onChange, placeholder, disabled, rightEl }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          className="text-xs font-medium tracking-widest uppercase"
          style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all duration-200"
          style={{
            background: disabled ? '#0a0c0f' : '#181c22',
            border: '1px solid #1e242c',
            color: disabled ? '#5a6474' : '#e8ecf0',
            fontFamily: "'DM Sans', sans-serif",
            cursor: disabled ? 'not-allowed' : 'text',
          }}
          onFocus={e => {
            if (!disabled) {
              e.target.style.borderColor = 'rgba(0,229,160,0.4)';
              e.target.style.boxShadow = '0 0 0 3px rgba(0,229,160,0.07)';
            }
          }}
          onBlur={e => {
            e.target.style.borderColor = '#1e242c';
            e.target.style.boxShadow = 'none';
          }}
        />
        {rightEl && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightEl}</div>
        )}
      </div>
    </div>
  );
}

// ── Save button ──
function SaveBtn({ loading, label = 'Save changes' }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer"
      style={{
        background: loading ? 'rgba(0,229,160,0.5)' : '#00e5a0',
        color: '#0a0c0f',
        fontFamily: "'DM Sans', sans-serif",
        cursor: loading ? 'not-allowed' : 'pointer',
      }}
      onMouseEnter={e => {
        if (!loading) {
          e.currentTarget.style.background = '#00f0aa';
          e.currentTarget.style.boxShadow = '0 0 20px rgba(0,229,160,0.3)';
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = loading ? 'rgba(0,229,160,0.5)' : '#00e5a0';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {loading ? 'Saving...' : label}
    </button>
  );
}

// ── Message banner ──
function Banner({ message }) {
  if (!message) return null;
  const isSuccess = message.type === 'success';
  return (
    <div
      className="px-4 py-3 rounded-lg text-sm"
      style={{
        background: isSuccess ? 'rgba(0,229,160,0.08)' : 'rgba(255,71,87,0.08)',
        border: `1px solid ${isSuccess ? 'rgba(0,229,160,0.25)' : 'rgba(255,71,87,0.25)'}`,
        color: isSuccess ? '#00e5a0' : '#ff4757',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {message.text}
    </div>
  );
}

// ── Section card ──
function Card({ title, children }) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: '#111418', border: '1px solid #1e242c' }}
    >
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,160,0.2), transparent)' }} />
      <div className="p-6">
        {title && (
          <h3
            className="font-semibold text-base mb-5"
            style={{ color: '#e8ecf0', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.01em' }}
          >
            {title}
          </h3>
        )}
        {children}
      </div>
    </div>
  );
}

const TABS = [
  { id: 'profile', label: 'Profile', icon: <User size={15} /> },
  { id: 'security', label: 'Security', icon: <Lock size={15} /> },
  { id: 'plan', label: 'Plan', icon: <CreditCard size={15} /> },
];

export default function ProfilePage() {
  const { user, setUser, fetchUser } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState('profile');
  const [loggingOut, setLoggingOut] = useState(false);
  const [plan, setPlan] = useState('monthly');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      router.replace('/login');
    } catch {
      setLoggingOut(false);
    }
  };

  const handleSubscribe = async () => {
    setCheckoutLoading(true);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setCheckoutLoading(false);
    } catch {
      setCheckoutLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    setPortalLoading(true);
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setPortalLoading(false);
    } catch {
      setPortalLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('from') === 'portal') {
      fetchUser();
      window.history.replaceState({}, '', '/profile');
    }
  }, []);

  const isActive = user?.subscriptionStatus === 'active';
  const periodEnd = user?.subscriptionEndsAt
    ? new Date(user.subscriptionEndsAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : null;
  const isCancelling = user?.cancelAtPeriodEnd === true;

  // Password form state
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });
  const [showPw, setShowPw] = useState({ current: false, newPw: false, confirm: false });
  const [pwLoading, setPwLoading] = useState(false);
  const [pwMessage, setPwMessage] = useState(null);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!pwForm.current) { setPwMessage({ type: 'error', text: 'Enter your current password.' }); return; }
    if (pwForm.newPw.length < 8) { setPwMessage({ type: 'error', text: 'New password must be at least 8 characters.' }); return; }
    if (pwForm.newPw !== pwForm.confirm) { setPwMessage({ type: 'error', text: 'Passwords do not match.' }); return; }
    setPwLoading(true);
    setPwMessage(null);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: pwForm.current, newPassword: pwForm.newPw }),
      });
      const data = await res.json();
      if (res.ok) {
        setPwMessage({ type: 'success', text: 'Password updated successfully.' });
        setPwForm({ current: '', newPw: '', confirm: '' });
      } else {
        setPwMessage({ type: 'error', text: data?.error || 'Something went wrong.' });
      }
    } catch {
      setPwMessage({ type: 'error', text: 'Something went wrong.' });
    } finally {
      setPwLoading(false);
    }
  };

  const togglePw = (field) => setShowPw(prev => ({ ...prev, [field]: !prev[field] }));

  return (
    <div className="min-h-screen pt-16" style={{ background: '#0a0c0f' }}>
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-10">

        {/* Page header */}
        <div className="mb-8">
          <h1
            className="text-2xl font-bold mb-1"
            style={{ color: '#e8ecf0', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}
          >
            Account
          </h1>
          <p className="text-sm" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>
            Manage your profile, security, and plan
          </p>
        </div>

        {/* Tabs */}
        <div
          className="flex gap-1 mb-8 p-1 rounded-xl w-fit"
          style={{ background: '#111418', border: '1px solid #1e242c' }}
        >
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
              style={{
                background: tab === t.id ? '#181c22' : 'transparent',
                color: tab === t.id ? '#e8ecf0' : '#5a6474',
                border: tab === t.id ? '1px solid #1e242c' : '1px solid transparent',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <span style={{ color: tab === t.id ? '#00e5a0' : '#5a6474' }}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── PROFILE TAB ── */}
        {tab === 'profile' && (
          <div className="flex flex-col gap-4">

            {/* Account info */}
            <Card title="Account info">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 pb-5" style={{ borderBottom: '1px solid #1e242c' }}>
                  {/* Avatar initials */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 font-bold text-lg"
                    style={{ background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.2)', color: '#00e5a0', fontFamily: "'Inter', sans-serif" }}
                  >
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p
                      className="font-semibold text-base"
                      style={{ color: '#e8ecf0', fontFamily: "'Inter', sans-serif" }}
                    >
                      {user?.name || 'Your Name'}
                    </p>
                    <p className="text-sm mt-0.5" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>
                      {user?.email || 'your@email.com'}
                    </p>
                  </div>
                </div>

                <Input
                  label="Full name"
                  value={user?.name || ''}
                  disabled
                  placeholder="Your name"
                />
                <Input
                  label="Email"
                  value={user?.email || ''}
                  disabled
                  placeholder="your@email.com"
                />
                <p className="text-xs" style={{ color: '#2a3240', fontFamily: "'DM Sans', sans-serif" }}>
                  To update your name or email contact{' '}
                  <a href="mailto:unitlocker@gmail.com" style={{ color: '#5a6474' }}>unitlocker@gmail.com</a>
                </p>

                <div className="pt-4" style={{ borderTop: '1px solid #1e242c' }}>
                  <button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
                    style={{
                      background: 'rgba(255,71,87,0.06)',
                      border: '1px solid rgba(255,71,87,0.15)',
                      color: '#ff4757',
                      fontFamily: "'DM Sans', sans-serif",
                      cursor: loggingOut ? 'not-allowed' : 'pointer',
                      opacity: loggingOut ? 0.6 : 1,
                    }}
                    onMouseEnter={e => {
                      if (!loggingOut) {
                        e.currentTarget.style.background = 'rgba(255,71,87,0.12)';
                        e.currentTarget.style.borderColor = 'rgba(255,71,87,0.3)';
                      }
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,71,87,0.06)';
                      e.currentTarget.style.borderColor = 'rgba(255,71,87,0.15)';
                    }}
                  >
                    <LogOut size={15} />
                    {loggingOut ? 'Signing out...' : 'Sign out'}
                  </button>
                </div>
              </div>
            </Card>

          </div>
        )}

        {/* ── SECURITY TAB ── */}
        {tab === 'security' && (
          <div className="flex flex-col gap-4">
            <Card title="Change password">
              <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
                <Input
                  label="Current password"
                  type={showPw.current ? 'text' : 'password'}
                  value={pwForm.current}
                  onChange={e => setPwForm({ ...pwForm, current: e.target.value })}
                  placeholder="Enter current password"
                  rightEl={
                    <button
                      type="button"
                      onClick={() => togglePw('current')}
                      className="cursor-pointer transition-colors duration-200"
                      style={{ color: '#5a6474' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#a8b3bf'}
                      onMouseLeave={e => e.currentTarget.style.color = '#5a6474'}
                    >
                      {showPw.current ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  }
                />
                <Input
                  label="New password"
                  type={showPw.newPw ? 'text' : 'password'}
                  value={pwForm.newPw}
                  onChange={e => setPwForm({ ...pwForm, newPw: e.target.value })}
                  placeholder="Min. 8 characters"
                  rightEl={
                    <button
                      type="button"
                      onClick={() => togglePw('newPw')}
                      className="cursor-pointer transition-colors duration-200"
                      style={{ color: '#5a6474' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#a8b3bf'}
                      onMouseLeave={e => e.currentTarget.style.color = '#5a6474'}
                    >
                      {showPw.newPw ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  }
                />
                <Input
                  label="Confirm new password"
                  type={showPw.confirm ? 'text' : 'password'}
                  value={pwForm.confirm}
                  onChange={e => setPwForm({ ...pwForm, confirm: e.target.value })}
                  placeholder="Repeat new password"
                  rightEl={
                    <button
                      type="button"
                      onClick={() => togglePw('confirm')}
                      className="cursor-pointer transition-colors duration-200"
                      style={{ color: '#5a6474' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#a8b3bf'}
                      onMouseLeave={e => e.currentTarget.style.color = '#5a6474'}
                    >
                      {showPw.confirm ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  }
                />

                <Banner message={pwMessage} />

                <div className="flex justify-end pt-1">
                  <SaveBtn loading={pwLoading} label="Update password" />
                </div>
              </form>
            </Card>

            {/* Danger zone */}
            <Card title="Danger zone">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: '#e8ecf0', fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Delete account
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Permanently delete your account and all data. This cannot be undone.
                  </p>
                </div>
                <button
                  className="flex-shrink-0 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer"
                  style={{
                    background: 'rgba(255,71,87,0.08)',
                    border: '1px solid rgba(255,71,87,0.25)',
                    color: '#ff4757',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,71,87,0.15)';
                    e.currentTarget.style.borderColor = 'rgba(255,71,87,0.4)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,71,87,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(255,71,87,0.25)';
                  }}
                >
                  Delete account
                </button>
              </div>
            </Card>
          </div>
        )}

        {/* ── PLAN TAB ── */}
        {tab === 'plan' && (
          <div className="flex flex-col gap-4">
            {isActive ? (
              /* ── Active subscriber ── */
              <Card title="Current plan">
                <div className="flex items-center justify-between gap-4 pb-5" style={{ borderBottom: '1px solid #1e242c' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.2)' }}>
                      <CreditCard size={17} style={{ color: '#ff6b35' }} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: '#e8ecf0', fontFamily: "'Inter', sans-serif" }}>
                        UnitLocker Pro
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: isCancelling ? '#f5c842' : '#5a6474', fontFamily: "'DM Mono', monospace" }}>
                        {isCancelling
                          ? `Cancels ${periodEnd ?? 'at period end'}`
                          : periodEnd ? `Renews ${periodEnd}` : 'Active subscription'}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{
                      background: isCancelling ? 'rgba(245,200,66,0.08)' : 'rgba(0,229,160,0.08)',
                      border: `1px solid ${isCancelling ? 'rgba(245,200,66,0.25)' : 'rgba(0,229,160,0.2)'}`,
                      color: isCancelling ? '#f5c842' : '#00e5a0',
                      fontFamily: "'DM Mono', monospace",
                    }}>
                    {isCancelling ? 'Cancelling' : 'Active'}
                  </span>
                </div>

                <div className="pt-5 flex flex-col gap-3">
                  <p className="text-xs font-medium tracking-widest uppercase" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>
                    What&apos;s included
                  </p>
                  {PRO_FEATURES.map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(255,107,53,0.1)', color: '#ff6b35' }}>
                        <Icon size={12} />
                      </div>
                      <span className="text-sm" style={{ color: '#8a95a3', fontFamily: "'DM Sans', sans-serif" }}>{text}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-5 mt-1" style={{ borderTop: '1px solid #1e242c' }}>
                  <button
                    onClick={handleManageSubscription}
                    disabled={portalLoading}
                    className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid #1e242c',
                      color: portalLoading ? '#5a6474' : '#8a95a3',
                      fontFamily: "'DM Sans', sans-serif",
                      cursor: portalLoading ? 'not-allowed' : 'pointer',
                    }}
                    onMouseEnter={e => { if (!portalLoading) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#e8ecf0'; } }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e242c'; e.currentTarget.style.color = portalLoading ? '#5a6474' : '#8a95a3'; }}
                  >
                    {portalLoading ? 'Opening portal…' : 'Manage subscription'}
                  </button>
                  <p className="text-xs text-center mt-2" style={{ color: '#2a3240', fontFamily: "'DM Mono', monospace" }}>
                    Cancel, update payment method, or view invoices via Stripe
                  </p>
                </div>
              </Card>
            ) : (
              /* ── No active subscription ── */
              <div className="rounded-2xl overflow-hidden relative"
                style={{ background: '#111418', border: '1px solid rgba(255,107,53,0.2)' }}>
                <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #ff6b35, transparent)' }} />

                <div className="p-6">
                  {/* Status row */}
                  <div className="flex items-center justify-between mb-6 pb-5" style={{ borderBottom: '1px solid #1e242c' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #1e242c' }}>
                        <CreditCard size={17} style={{ color: '#5a6474' }} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: '#e8ecf0', fontFamily: "'Inter', sans-serif" }}>No active plan</p>
                        <p className="text-xs mt-0.5" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>Subscribe to access the picks feed</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #1e242c', color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>
                      Inactive
                    </span>
                  </div>

                  {/* Plan toggle */}
                  <div className="flex gap-3 mb-5">
                    {[
                      { key: 'monthly', price: '$9.99', per: '/ month', badge: null },
                      { key: 'annual',  price: '$79.99', per: '/ year', badge: 'SAVE 33%' },
                    ].map(p => (
                      <button key={p.key} onClick={() => setPlan(p.key)}
                        className="flex-1 p-4 rounded-xl text-left cursor-pointer transition-all duration-200 relative overflow-hidden"
                        style={{
                          background: plan === p.key ? 'rgba(255,107,53,0.08)' : '#181c22',
                          border: `1px solid ${plan === p.key ? 'rgba(255,107,53,0.35)' : '#1e242c'}`,
                        }}>
                        {p.badge && (
                          <span className="absolute top-2 right-2 text-xs font-bold px-1.5 py-0.5 rounded"
                            style={{ background: 'rgba(245,200,66,0.12)', color: '#f5c842', fontFamily: "'DM Mono', monospace", fontSize: '9px' }}>
                            {p.badge}
                          </span>
                        )}
                        <p className="font-bold text-lg leading-none mb-1"
                          style={{ color: plan === p.key ? '#f5f6f8' : '#5a6474', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}>
                          {p.price}
                        </p>
                        <p className="text-xs" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>{p.per}</p>
                      </button>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="flex flex-col gap-2.5 mb-6">
                    {PRO_FEATURES.map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-3">
                        <CheckCircle2 size={14} style={{ color: '#00e5a0', flexShrink: 0 }} />
                        <span className="text-sm" style={{ color: '#8a95a3', fontFamily: "'DM Sans', sans-serif" }}>{text}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button onClick={handleSubscribe} disabled={checkoutLoading}
                    className="w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer"
                    style={{
                      background: checkoutLoading ? 'rgba(255,107,53,0.5)' : 'linear-gradient(135deg, #ff6b35, #cc3d10)',
                      color: '#0a0c0f', fontFamily: "'DM Sans', sans-serif",
                      boxShadow: checkoutLoading ? 'none' : '0 4px 20px rgba(255,107,53,0.35)',
                      cursor: checkoutLoading ? 'not-allowed' : 'pointer',
                    }}
                    onMouseEnter={e => { if (!checkoutLoading) e.currentTarget.style.boxShadow = '0 4px 28px rgba(255,107,53,0.5)'; }}
                    onMouseLeave={e => { if (!checkoutLoading) e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,107,53,0.35)'; }}
                  >
                    {checkoutLoading ? 'Redirecting to checkout…' : `Unlock the Feed — ${plan === 'annual' ? '$79.99 / year' : '$9.99 / month'}`}
                  </button>

                  <p className="text-xs text-center mt-3" style={{ color: '#2a3240', fontFamily: "'DM Mono', monospace" }}>
                    {plan === 'annual' ? '$6.67 / mo · billed annually · ' : 'Billed monthly · '}cancel anytime · Secure checkout via Stripe
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}