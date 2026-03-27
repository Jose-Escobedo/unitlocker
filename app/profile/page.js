'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  User, Lock, CreditCard, Eye, EyeOff,
  CheckCircle2, Crosshair, Flame, Zap,
  Layers, TrendingUp, Trophy, ChevronRight, LogOut
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// ── Ranks ──
const RANKS = [
  { name: 'ROOKIE',  min: 0,    max: 100  },
  { name: 'GRINDER', min: 100,  max: 300  },
  { name: 'SHARPIE', min: 300,  max: 600  },
  { name: 'WISEGUY', min: 600,  max: 1000 },
  { name: 'WHALE',   min: 1000, max: 2000 },
  { name: 'LEGEND',  min: 2000, max: Infinity },
];

const ACHIEVEMENTS = [
  { id: 'first_bet', icon: 'target',   name: 'First Blood',  desc: 'Log your first bet',      unlocked: true  },
  { id: 'streak_3',  icon: 'flame',    name: 'Hot Hand',     desc: '3-bet win streak',         unlocked: true  },
  { id: 'streak_5',  icon: 'zap',      name: 'On Fire',      desc: '5-bet win streak',         unlocked: false },
  { id: 'ten_bets',  icon: 'layers',   name: 'Degenerate',   desc: 'Log 10 bets',              unlocked: false },
  { id: 'doubled',   icon: 'trending', name: 'Double Up',    desc: 'Double your bankroll',     unlocked: false },
  { id: 'fifty_bets',icon: 'trophy',   name: 'Hall of Fame', desc: 'Log 50 bets',              unlocked: false },
];

function getRank(xp) {
  return RANKS.find((r, i) => xp >= r.min && (xp < r.max || i === RANKS.length - 1));
}
function getNextRank(xp) {
  const idx = RANKS.findIndex((r, i) => xp >= r.min && (xp < r.max || i === RANKS.length - 1));
  return RANKS[Math.min(idx + 1, RANKS.length - 1)];
}

// ── Achievement icon ──
function AchIcon({ type, unlocked }) {
  const color = unlocked ? '#f5c842' : '#2a3240';
  const icons = {
    target:   <Crosshair size={15} />,
    flame:    <Flame size={15} />,
    zap:      <Zap size={15} />,
    layers:   <Layers size={15} />,
    trending: <TrendingUp size={15} />,
    trophy:   <Trophy size={15} />,
  };
  return (
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center"
      style={{
        background: unlocked ? 'rgba(245,200,66,0.1)' : '#181c22',
        border: `1px solid ${unlocked ? 'rgba(245,200,66,0.2)' : '#1e242c'}`,
        color,
      }}
    >
      {icons[type]}
    </div>
  );
}

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
  const { user, setUser } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState('profile');
  const [loggingOut, setLoggingOut] = useState(false);

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

  // Mock XP — replace with real data
  const xp = 145;
  const rank = getRank(xp);
  const nextRank = getNextRank(xp);
  const xpInRank = xp - rank.min;
  const xpNeeded = nextRank.min - rank.min;
  const xpPct = rank.name === 'LEGEND' ? 100 : Math.min(100, (xpInRank / xpNeeded) * 100);

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
                  <a href="mailto:support@unitlocker.com" style={{ color: '#5a6474' }}>support@unitlocker.com</a>
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

            {/* XP & Rank */}
            <Card title="Rank & progress">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="text-2xl font-black"
                      style={{ color: '#00e5a0', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.03em' }}
                    >
                      {rank.name}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>
                      {xp} XP total
                    </p>
                  </div>
                  {rank.name !== 'LEGEND' && (
                    <div className="text-right">
                      <p className="text-xs" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>Next rank</p>
                      <p className="text-sm font-semibold mt-0.5" style={{ color: '#8a95a3', fontFamily: "'Inter', sans-serif" }}>{nextRank.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: '#2a3240', fontFamily: "'DM Mono', monospace" }}>
                        {xpNeeded - xpInRank} XP away
                      </p>
                    </div>
                  )}
                </div>

                {/* XP bar */}
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace' " }}>{rank.name}</span>
                    {rank.name !== 'LEGEND' && <span className="text-xs" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>{nextRank.name}</span>}
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: '#1e242c' }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${xpPct}%`,
                        background: 'linear-gradient(90deg, #00e5a0, #00b87a)',
                        boxShadow: '0 0 8px rgba(0,229,160,0.4)',
                      }}
                    />
                  </div>
                </div>

                {/* All ranks */}
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-1">
                  {RANKS.map((r, i) => {
                    const isActive = r.name === rank.name;
                    const isPast = xp >= r.max;
                    return (
                      <div
                        key={r.name}
                        className="flex flex-col items-center gap-1 py-2 px-1 rounded-lg"
                        style={{
                          background: isActive ? 'rgba(0,229,160,0.08)' : '#181c22',
                          border: `1px solid ${isActive ? 'rgba(0,229,160,0.25)' : '#1e242c'}`,
                        }}
                      >
                        <div
                          className="w-5 h-5 rounded-full"
                          style={{ background: isPast || isActive ? '#00e5a0' : '#1e242c' }}
                        />
                        <span
                          style={{
                            color: isActive ? '#00e5a0' : isPast ? '#8a95a3' : '#2a3240',
                            fontFamily: "'DM Mono', monospace",
                            fontSize: '8px',
                            letterSpacing: '0.05em',
                          }}
                        >
                          {r.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* Achievements */}
            <Card title="Achievements">
              <div className="flex flex-col gap-3">
                {ACHIEVEMENTS.map(ach => (
                  <div
                    key={ach.id}
                    className="flex items-center gap-4 py-3"
                    style={{ borderBottom: '1px solid #1e242c' }}
                  >
                    <AchIcon type={ach.icon} unlocked={ach.unlocked} />
                    <div className="flex-1">
                      <p
                        className="text-sm font-medium"
                        style={{
                          color: ach.unlocked ? '#e8ecf0' : '#2a3240',
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        {ach.name}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {ach.desc}
                      </p>
                    </div>
                    {ach.unlocked && (
                      <CheckCircle2 size={16} style={{ color: '#00e5a0', flexShrink: 0 }} />
                    )}
                  </div>
                ))}
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
                    Permanently delete your account and all betting data. This cannot be undone.
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

            {/* Current plan */}
            <Card title="Current plan">
              <div className="flex items-center justify-between gap-4 pb-5" style={{ borderBottom: '1px solid #1e242c' }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.2)' }}
                  >
                    <CreditCard size={17} style={{ color: '#00e5a0' }} />
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm"
                      style={{ color: '#e8ecf0', fontFamily: "'Inter', sans-serif" }}
                    >
                      Free Plan
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>
                      Free forever
                    </p>
                  </div>
                </div>
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{
                    background: 'rgba(0,229,160,0.08)',
                    border: '1px solid rgba(0,229,160,0.2)',
                    color: '#00e5a0',
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  Active
                </span>
              </div>

              {/* What's included */}
              <div className="pt-4 flex flex-col gap-2.5">
                <p className="text-xs font-medium" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace', textTransform: 'uppercase', letterSpacing: '0.1em'" }}>
                  INCLUDED IN FREE
                </p>
                {[
                  'Bankroll tracking',
                  'Bet logging & history',
                  'Win / loss / streak stats',
                  'Gamification (XP, ranks, achievements)',
                  'All sports supported',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <CheckCircle2 size={14} style={{ color: '#00e5a0', flexShrink: 0 }} />
                    <span className="text-sm" style={{ color: '#8a95a3', fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Pro upsell */}
            <div
              className="rounded-2xl p-6 relative overflow-hidden"
              style={{ background: '#111418', border: '1px solid rgba(245,200,66,0.2)' }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, #f5c842, transparent)' }}
              />
              <div
                className="absolute right-6 top-1/2 -translate-y-1/2 font-black select-none pointer-events-none hidden md:block"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: '80px', color: 'rgba(245,200,66,0.03)', letterSpacing: '-0.05em' }}
              >
                PRO
              </div>

              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full mb-3"
                    style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.2)', color: '#f5c842', fontFamily: "'DM Mono', monospace" }}
                  >
                    Coming Soon
                  </span>
                  <h3
                    className="font-bold text-lg"
                    style={{ color: '#e8ecf0', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}
                  >
                    Upgrade to Pro
                  </h3>
                  <p className="text-sm mt-1" style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}>
                    $9.99 / month &nbsp;·&nbsp; $79.99 / year
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 mb-5">
                {[
                  'Performance breakdown by sport',
                  'Performance by bet type',
                  'Odds range analysis',
                  'Average stake & average odds',
                  'Most profitable sport & bet type',
                  'Premium Discord — picks from cappers & community',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <ChevronRight size={13} style={{ color: '#f5c842', flexShrink: 0 }} />
                    <span className="text-sm" style={{ color: '#8a95a3', fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
                  </div>
                ))}
              </div>

              <button
                className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer"
                style={{
                  background: 'rgba(245,200,66,0.1)',
                  border: '1px solid rgba(245,200,66,0.25)',
                  color: '#f5c842',
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(245,200,66,0.18)';
                  e.currentTarget.style.borderColor = 'rgba(245,200,66,0.4)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(245,200,66,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(245,200,66,0.25)';
                }}
              >
                Notify me at launch
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}