'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  Plus, X, Check, Trash2, Flame, ChevronDown,
  Crosshair, CircleDot, Zap, Sword, AlertTriangle,
  Edit3, RefreshCw,
} from 'lucide-react';

// ── Constants ──
const SPORTS = ['CS2', 'NBA', 'NHL', 'MLB'];
const PREDICTIONS = ['Over', 'Under'];
const STATUSES = ['all', 'pending', 'won', 'lost', 'push'];

const SPORT_STATS = {
  CS2: ['Kills', 'Headshots', 'Assists', 'Deaths', 'ADR', 'Rating'],
  NBA: ['Points', 'Rebounds', 'Assists', '3-Pointers', 'Steals', 'Blocks', 'Pts+Reb+Ast'],
  NHL: ['Goals', 'Assists', 'Points', 'Shots on Goal', 'Saves'],
  MLB: ['Strikeouts', 'Hits', 'Home Runs', 'RBI', 'Walks', 'Total Bases', 'Pitcher Outs'],
};

const SPORT_COLORS = {
  CS2: '#ff6b35',
  NBA: '#00e5a0',
  NHL: '#4da6ff',
  MLB: '#f5c842',
};

const STATUS_CONFIG = {
  pending: { label: 'Pending', color: '#5a6474',  bg: '#1e242c' },
  won:     { label: 'Won',     color: '#00e5a0',  bg: 'rgba(0,229,160,0.12)' },
  lost:    { label: 'Lost',    color: '#ff4757',  bg: 'rgba(255,71,87,0.1)' },
  push:    { label: 'Push',    color: '#f5c842',  bg: 'rgba(245,200,66,0.1)' },
};

const EMPTY_FORM = {
  sport: 'CS2',
  playerName: '',
  team: '',
  matchup: '',
  eventDate: new Date().toISOString().split('T')[0],
  stat: 'Kills',
  line: '',
  prediction: 'Over',
  isHot: false,
  confidence: 3,
  notes: '',
  bookieUrl: '',
};

// ── Small helpers ──
function SportIcon({ sport, size = 14 }) {
  const icons = { CS2: Crosshair, NBA: Zap, NHL: CircleDot, MLB: Sword };
  const Icon = icons[sport] ?? Crosshair;
  return <Icon size={size} strokeWidth={2.5} />;
}

function StatusBadge({ status }) {
  const c = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold tracking-wider"
      style={{
        background: c.bg,
        color: c.color,
        fontFamily: "'DM Mono', monospace",
        border: `1px solid ${c.color}33`,
      }}
    >
      {c.label.toUpperCase()}
    </span>
  );
}

function ConfidenceDots({ value, color = '#ff6b35' }) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(i => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: i <= value ? color : '#2a2f3a' }}
        />
      ))}
    </div>
  );
}

// ── Form field ──
function Field({ label, children, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-xs font-medium tracking-widest uppercase flex items-center gap-1"
        style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}
      >
        {label}
        {required && <span style={{ color: '#ff4757' }}>*</span>}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  background: '#181c22',
  border: '1px solid #1e242c',
  color: '#e8ecf0',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '14px',
  borderRadius: '8px',
  padding: '10px 12px',
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.15s',
};

function Input({ value, onChange, placeholder, type = 'text', onFocus, onBlur, ...rest }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={inputStyle}
      onFocus={e => { e.target.style.borderColor = 'rgba(255,107,53,0.4)'; onFocus?.(e); }}
      onBlur={e => { e.target.style.borderColor = '#1e242c'; onBlur?.(e); }}
      {...rest}
    />
  );
}

function Select({ value, onChange, children }) {
  return (
    <select
      value={value}
      onChange={onChange}
      style={{
        ...inputStyle,
        appearance: 'none',
        cursor: 'pointer',
      }}
      onFocus={e => e.target.style.borderColor = 'rgba(255,107,53,0.4)'}
      onBlur={e => e.target.style.borderColor = '#1e242c'}
    >
      {children}
    </select>
  );
}

// ── Settle modal ──
function SettleModal({ pick, onClose, onSettle }) {
  const [status, setStatus] = useState('won');
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    setLoading(true);
    await onSettle(pick._id, status);
    setLoading(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-sm rounded-2xl overflow-hidden"
        style={{ background: '#111418', border: '1px solid #1e242c' }}
      >
        <div className="h-px w-full" style={{ background: '#ff6b35' }} />
        <div className="p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-base" style={{ color: '#e8ecf0', fontFamily: "'Inter', sans-serif" }}>
              Settle Pick
            </h3>
            <button onClick={onClose} style={{ color: '#5a6474' }}>
              <X size={16} />
            </button>
          </div>

          <div
            className="p-3 rounded-xl mb-5"
            style={{ background: '#181c22', border: '1px solid #1e242c' }}
          >
            <p className="text-sm font-semibold" style={{ color: '#e8ecf0', fontFamily: "'DM Sans', sans-serif" }}>
              {pick.playerName}
            </p>
            <p className="text-xs mt-0.5" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>
              {pick.prediction} {pick.line} {pick.stat} · {pick.sport}
            </p>
          </div>

          <Field label="Result">
            <div className="grid grid-cols-3 gap-2">
              {['won', 'lost', 'push'].map(s => {
                const c = STATUS_CONFIG[s];
                const active = status === s;
                return (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className="py-2.5 rounded-xl font-bold text-xs tracking-wider transition-all duration-150"
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      background: active ? c.bg : '#181c22',
                      color: active ? c.color : '#5a6474',
                      border: `1px solid ${active ? c.color + '55' : '#1e242c'}`,
                    }}
                  >
                    {c.label.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </Field>

          <button
            onClick={handle}
            disabled={loading}
            className="w-full mt-5 py-3 rounded-xl font-bold text-sm transition-all duration-200"
            style={{
              background: loading ? 'rgba(255,107,53,0.4)' : '#ff6b35',
              color: '#0a0c0f',
              fontFamily: "'DM Sans', sans-serif",
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Saving...' : 'Confirm Result'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Delete confirm modal ──
function DeleteModal({ pick, onClose, onDelete }) {
  const [loading, setLoading] = useState(false);
  const handle = async () => {
    setLoading(true);
    await onDelete(pick._id);
    setLoading(false);
    onClose();
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-sm rounded-2xl overflow-hidden"
        style={{ background: '#111418', border: '1px solid rgba(255,71,87,0.3)' }}
      >
        <div className="h-px w-full" style={{ background: '#ff4757' }} />
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,71,87,0.1)', color: '#ff4757' }}
            >
              <AlertTriangle size={16} />
            </div>
            <h3 className="font-bold text-base" style={{ color: '#e8ecf0', fontFamily: "'Inter', sans-serif" }}>
              Delete Pick
            </h3>
          </div>
          <p className="text-sm mb-5" style={{ color: '#8a95a3', fontFamily: "'DM Sans', sans-serif" }}>
            Delete <strong style={{ color: '#e8ecf0' }}>{pick.playerName}</strong> — {pick.prediction} {pick.line} {pick.stat}? This cannot be undone.
          </p>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl font-semibold text-sm"
              style={{ background: '#181c22', color: '#8a95a3', border: '1px solid #1e242c', fontFamily: "'DM Sans', sans-serif" }}
            >
              Cancel
            </button>
            <button
              onClick={handle}
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-all duration-150"
              style={{
                background: loading ? 'rgba(255,71,87,0.4)' : 'rgba(255,71,87,0.15)',
                color: '#ff4757',
                border: '1px solid rgba(255,71,87,0.3)',
                fontFamily: "'DM Sans', sans-serif",
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Pick row ──
function PickRow({ pick, onSettle, onDelete, onToggleHot }) {
  const color = SPORT_COLORS[pick.sport] ?? '#ff6b35';
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 transition-colors duration-150"
      style={{ borderBottom: '1px solid #1e242c' }}
      onMouseEnter={e => e.currentTarget.style.background = '#181c22'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      {/* Sport badge */}
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}18`, color }}
      >
        <SportIcon sport={pick.sport} size={13} />
      </div>

      {/* Main info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-sm font-semibold"
            style={{ color: '#e8ecf0', fontFamily: "'DM Sans', sans-serif" }}
          >
            {pick.playerName}
          </span>
          {pick.isHot && <Flame size={12} style={{ color: '#ff6b35', flexShrink: 0 }} />}
          <StatusBadge status={pick.status} />
        </div>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          <span
            className="text-xs"
            style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}
          >
            {pick.prediction} {pick.line} {pick.stat}
          </span>
          <span style={{ color: '#2a3240', fontSize: '10px' }}>·</span>
          <span
            className="text-xs"
            style={{ color: '#2a3240', fontFamily: "'DM Mono', monospace" }}
          >
            {pick.matchup}
          </span>
        </div>
      </div>

      {/* Confidence */}
      <div className="hidden sm:block flex-shrink-0">
        <ConfidenceDots value={pick.confidence} color={color} />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {/* Toggle hot */}
        <button
          onClick={() => onToggleHot(pick._id, !pick.isHot)}
          className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150"
          style={{
            background: pick.isHot ? 'rgba(255,107,53,0.15)' : 'transparent',
            color: pick.isHot ? '#ff6b35' : '#2a3240',
            border: `1px solid ${pick.isHot ? 'rgba(255,107,53,0.3)' : 'transparent'}`,
          }}
          title={pick.isHot ? 'Remove hot' : 'Mark hot'}
        >
          <Flame size={12} />
        </button>

        {/* Settle (only for pending) */}
        {pick.status === 'pending' && (
          <button
            onClick={() => onSettle(pick)}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150"
            style={{ background: 'rgba(0,229,160,0.08)', color: '#00e5a0', border: '1px solid rgba(0,229,160,0.2)' }}
            title="Settle pick"
          >
            <Check size={12} />
          </button>
        )}

        {/* Delete */}
        <button
          onClick={() => onDelete(pick)}
          className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150"
          style={{ background: 'transparent', color: '#2a3240', border: '1px solid transparent' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,71,87,0.08)'; e.currentTarget.style.color = '#ff4757'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#2a3240'; }}
          title="Delete"
        >
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  );
}

// ── Main admin page ──
export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [picks, setPicks] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [filterStatus, setFilterStatus] = useState('pending');
  const [filterSport, setFilterSport] = useState('all');

  // Form state
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formMsg, setFormMsg] = useState(null);
  const [formOpen, setFormOpen] = useState(true);

  // Modals
  const [settleTarget, setSettleTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // ── Auth guard ──
  useEffect(() => {
    if (!authLoading && !user) router.replace('/login');
    if (!authLoading && user && user.role !== 'admin') router.replace('/picks');
  }, [user, authLoading, router]);

  // ── Load picks ──
  const loadPicks = useCallback(async () => {
    setFetching(true);
    try {
      const params = new URLSearchParams();
      if (filterStatus !== 'all') params.set('status', filterStatus);
      if (filterSport !== 'all') params.set('sport', filterSport);
      params.set('limit', '100');
      const res = await fetch(`/api/admin/picks?${params}`);
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setPicks(data.picks || []);
    } catch {
      setPicks([]);
    } finally {
      setFetching(false);
    }
  }, [filterStatus, filterSport]);

  useEffect(() => {
    if (user?.role === 'admin') loadPicks();
  }, [user, loadPicks]);

  // ── Form handlers ──
  const setField = (key, val) => {
    setForm(f => ({
      ...f,
      [key]: val,
      // Reset stat when sport changes
      ...(key === 'sport' ? { stat: SPORT_STATS[val]?.[0] ?? '' } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormMsg(null);
    try {
      const res = await fetch('/api/admin/picks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setFormMsg({ type: 'success', text: `Pick posted — ${data.pick.playerName} ${data.pick.prediction} ${data.pick.line}` });
      setForm(EMPTY_FORM);
      // Refresh list if showing pending
      if (filterStatus === 'pending' || filterStatus === 'all') loadPicks();
    } catch (err) {
      setFormMsg({ type: 'error', text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSettle = async (id, status) => {
    await fetch('/api/admin/picks', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    loadPicks();
  };

  const handleDelete = async (id) => {
    await fetch('/api/admin/picks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    loadPicks();
  };

  const handleToggleHot = async (id, isHot) => {
    await fetch('/api/admin/picks', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, isHot }),
    });
    setPicks(prev => prev.map(p => p._id === id ? { ...p, isHot } : p));
  };

  // ── Stats bar ──
  const stats = {
    total: picks.length,
    hot: picks.filter(p => p.isHot).length,
    won: picks.filter(p => p.status === 'won').length,
    lost: picks.filter(p => p.status === 'lost').length,
  };

  if (authLoading || !user) return null;
  if (user.role !== 'admin') return null;

  return (
    <div className="min-h-screen pt-16" style={{ background: '#0a0c0f' }}>

      {/* Modals */}
      {settleTarget && (
        <SettleModal
          pick={settleTarget}
          onClose={() => setSettleTarget(null)}
          onSettle={handleSettle}
        />
      )}
      {deleteTarget && (
        <DeleteModal
          pick={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onDelete={handleDelete}
        />
      )}

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div
              className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md mb-2"
              style={{ background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.2)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#ff6b35' }} />
              <span
                className="text-xs font-medium tracking-widest uppercase"
                style={{ color: '#ff6b35', fontFamily: "'DM Mono', monospace" }}
              >
                Admin
              </span>
            </div>
            <h1
              className="text-2xl font-black"
              style={{ color: '#e8ecf0', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}
            >
              Picks Dashboard
            </h1>
          </div>
          <button
            onClick={loadPicks}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
            style={{ background: '#111418', border: '1px solid #1e242c', color: '#5a6474' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#e8ecf0'; e.currentTarget.style.borderColor = '#2a3240'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#5a6474'; e.currentTarget.style.borderColor = '#1e242c'; }}
            title="Refresh"
          >
            <RefreshCw size={15} />
          </button>
        </div>

        {/* ── POST PICK FORM ── */}
        <div
          className="rounded-2xl overflow-hidden mb-6"
          style={{ background: '#111418', border: '1px solid #1e242c' }}
        >
          <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #ff6b35 40%, #ff6b35 60%, transparent)' }} />

          {/* Collapsible header */}
          <button
            onClick={() => setFormOpen(v => !v)}
            className="w-full flex items-center justify-between px-6 py-4 text-left"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(255,107,53,0.1)', color: '#ff6b35', border: '1px solid rgba(255,107,53,0.2)' }}
              >
                <Plus size={16} />
              </div>
              <span
                className="font-semibold text-sm"
                style={{ color: '#e8ecf0', fontFamily: "'Inter', sans-serif" }}
              >
                Post New Pick
              </span>
            </div>
            <ChevronDown
              size={16}
              style={{
                color: '#5a6474',
                transform: formOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}
            />
          </button>

          {formOpen && (
            <form onSubmit={handleSubmit} className="px-6 pb-6">
              <div
                className="h-px mb-6"
                style={{ background: '#1e242c' }}
              />

              {/* Row 1: Sport + Player + Team */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <Field label="Sport" required>
                  <Select value={form.sport} onChange={e => setField('sport', e.target.value)}>
                    {SPORTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </Select>
                </Field>
                <Field label="Player Name" required>
                  <Input
                    value={form.playerName}
                    onChange={e => setField('playerName', e.target.value)}
                    placeholder="e.g. s1mple"
                  />
                </Field>
                <Field label="Team" required>
                  <Input
                    value={form.team}
                    onChange={e => setField('team', e.target.value)}
                    placeholder="e.g. NAVI"
                  />
                </Field>
              </div>

              {/* Row 2: Matchup + Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Field label="Matchup" required>
                  <Input
                    value={form.matchup}
                    onChange={e => setField('matchup', e.target.value)}
                    placeholder="e.g. NAVI vs Spirit"
                  />
                </Field>
                <Field label="Event Date" required>
                  <Input
                    type="date"
                    value={form.eventDate}
                    onChange={e => setField('eventDate', e.target.value)}
                  />
                </Field>
              </div>

              {/* Row 3: Stat + Line + Prediction */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <Field label="Stat" required>
                  <Select value={form.stat} onChange={e => setField('stat', e.target.value)}>
                    {(SPORT_STATS[form.sport] ?? []).map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </Select>
                </Field>
                <Field label="Line" required>
                  <Input
                    type="number"
                    step="0.5"
                    value={form.line}
                    onChange={e => setField('line', e.target.value)}
                    placeholder="e.g. 22.5"
                  />
                </Field>
                <Field label="Prediction" required>
                  <Select value={form.prediction} onChange={e => setField('prediction', e.target.value)}>
                    {PREDICTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                  </Select>
                </Field>
              </div>

              {/* Row 4: Confidence + isHot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Field label="Confidence (1–5u)">
                  <div className="flex items-center gap-3 h-10">
                    <div className="flex gap-2">
                      {[1,2,3,4,5].map(i => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setField('confidence', i)}
                          className="w-8 h-8 rounded-lg font-bold text-xs transition-all duration-150"
                          style={{
                            background: i <= form.confidence ? 'rgba(255,107,53,0.15)' : '#181c22',
                            color: i <= form.confidence ? '#ff6b35' : '#2a3240',
                            border: `1px solid ${i <= form.confidence ? 'rgba(255,107,53,0.3)' : '#1e242c'}`,
                            fontFamily: "'DM Mono', monospace",
                          }}
                        >
                          {i}
                        </button>
                      ))}
                    </div>
                    <span
                      className="text-xs"
                      style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}
                    >
                      {['', 'Risky', 'Lean', 'Solid', 'Strong', 'Lock'][form.confidence]}
                    </span>
                  </div>
                </Field>

                <Field label="Fire Pick">
                  <div className="flex items-center gap-3 h-10">
                    <button
                      type="button"
                      onClick={() => setField('isHot', !form.isHot)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg font-semibold text-xs transition-all duration-150"
                      style={{
                        background: form.isHot ? 'rgba(255,107,53,0.15)' : '#181c22',
                        color: form.isHot ? '#ff6b35' : '#5a6474',
                        border: `1px solid ${form.isHot ? 'rgba(255,107,53,0.3)' : '#1e242c'}`,
                        fontFamily: "'DM Mono', monospace",
                      }}
                    >
                      <Flame size={13} />
                      {form.isHot ? 'Hot — pinned to top' : 'Mark as Fire Pick'}
                    </button>
                  </div>
                </Field>
              </div>

              {/* Row 5: Notes + Bookie URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Field label="Notes (optional)">
                  <textarea
                    value={form.notes}
                    onChange={e => setField('notes', e.target.value)}
                    placeholder="e.g. averaging 27 kills in last 10..."
                    rows={3}
                    style={{
                      ...inputStyle,
                      resize: 'vertical',
                      lineHeight: '1.5',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(255,107,53,0.4)'}
                    onBlur={e => e.target.style.borderColor = '#1e242c'}
                  />
                </Field>
                <Field label="Bookie URL (optional)">
                  <Input
                    value={form.bookieUrl}
                    onChange={e => setField('bookieUrl', e.target.value)}
                    placeholder="https://..."
                  />
                  <p
                    className="text-xs mt-1"
                    style={{ color: '#2a3240', fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Link to the exact prop on PrizePicks/Sleeper/etc.
                  </p>
                </Field>
              </div>

              {/* Message */}
              {formMsg && (
                <div
                  className="px-4 py-3 rounded-lg text-sm mb-4"
                  style={{
                    background: formMsg.type === 'success' ? 'rgba(0,229,160,0.08)' : 'rgba(255,71,87,0.08)',
                    border: `1px solid ${formMsg.type === 'success' ? 'rgba(0,229,160,0.25)' : 'rgba(255,71,87,0.25)'}`,
                    color: formMsg.type === 'success' ? '#00e5a0' : '#ff4757',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {formMsg.text}
                </div>
              )}

              {/* Submit */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200"
                  style={{
                    background: submitting ? 'rgba(255,107,53,0.4)' : '#ff6b35',
                    color: '#0a0c0f',
                    fontFamily: "'DM Sans', sans-serif",
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    boxShadow: submitting ? 'none' : '0 4px 20px rgba(255,107,53,0.3)',
                  }}
                >
                  <Plus size={15} />
                  {submitting ? 'Posting...' : 'Post Pick'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* ── PICKS LIST ── */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: '#111418', border: '1px solid #1e242c' }}
        >
          {/* List header + filters */}
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4"
            style={{ borderBottom: '1px solid #1e242c' }}
          >
            <div className="flex items-center gap-3">
              <h2
                className="font-semibold text-sm"
                style={{ color: '#e8ecf0', fontFamily: "'Inter', sans-serif" }}
              >
                Picks
              </h2>
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: '#181c22',
                  color: '#5a6474',
                  fontFamily: "'DM Mono', monospace",
                  border: '1px solid #1e242c',
                }}
              >
                {picks.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Status filter */}
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                style={{
                  background: '#181c22',
                  border: '1px solid #1e242c',
                  color: '#a8b3bf',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '12px',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                {STATUSES.map(s => (
                  <option key={s} value={s}>{s === 'all' ? 'All statuses' : s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>

              {/* Sport filter */}
              <select
                value={filterSport}
                onChange={e => setFilterSport(e.target.value)}
                style={{
                  background: '#181c22',
                  border: '1px solid #1e242c',
                  color: '#a8b3bf',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '12px',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="all">All sports</option>
                {SPORTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Stats strip */}
          <div
            className="grid grid-cols-4 divide-x"
            style={{ borderBottom: '1px solid #1e242c', divideColor: '#1e242c' }}
          >
            {[
              { label: 'Showing', value: stats.total },
              { label: 'Hot', value: stats.hot, color: '#ff6b35' },
              { label: 'Won', value: stats.won, color: '#00e5a0' },
              { label: 'Lost', value: stats.lost, color: '#ff4757' },
            ].map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center py-3"
                style={{ borderRight: i < 3 ? '1px solid #1e242c' : 'none' }}
              >
                <span
                  className="text-lg font-black leading-none"
                  style={{ color: s.color ?? '#e8ecf0', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}
                >
                  {s.value}
                </span>
                <span
                  className="text-xs mt-0.5"
                  style={{ color: '#2a3240', fontFamily: "'DM Mono', monospace" }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Picks rows */}
          {fetching && (
            <div className="flex items-center justify-center py-12">
              <div
                className="w-6 h-6 rounded-full animate-spin"
                style={{ border: '2px solid #1e242c', borderTopColor: '#ff6b35' }}
              />
            </div>
          )}

          {!fetching && picks.length === 0 && (
            <div className="text-center py-12">
              <p
                className="text-sm"
                style={{ color: '#2a3240', fontFamily: "'DM Mono', monospace" }}
              >
                No picks found.
              </p>
            </div>
          )}

          {!fetching && picks.map(pick => (
            <PickRow
              key={pick._id}
              pick={pick}
              onSettle={setSettleTarget}
              onDelete={setDeleteTarget}
              onToggleHot={handleToggleHot}
            />
          ))}
        </div>
      </div>
    </div>
  );
}