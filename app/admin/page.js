'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  Plus, X, Check, Trash2, Flame, ChevronDown,
  Crosshair, CircleDot, Zap, Sword, AlertTriangle,
  Edit3, RefreshCw, Clock, BarChart2,
} from 'lucide-react';
import ScreenshotExtractor from '@/components/admin/ScreenshotExtractor';

// ── Constants ──
const SPORTS = ['CS2', 'NBA', 'NHL', 'MLB'];
const PREDICTIONS = ['Over', 'Under'];
const STATUSES = ['all', 'pending', 'won', 'lost', 'push'];

const SPORT_STATS = {
  CS2: ['Kills Maps 1+2', 'Headshots Maps 1+2'],
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
  pending: { label: 'Pending', color: '#5a6474', bg: '#1e242c' },
  won:     { label: 'Won',     color: '#00e5a0', bg: 'rgba(0,229,160,0.12)' },
  lost:    { label: 'Lost',    color: '#ff4757', bg: 'rgba(255,71,87,0.1)' },
  push:    { label: 'Push',    color: '#f5c842', bg: 'rgba(245,200,66,0.1)' },
};

function toDatetimeLocal(isoStr) {
  if (!isoStr) return '';
  const d = new Date(isoStr);
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const EMPTY_FORM = {
  sport: 'CS2',
  playerName: '',
  team: '',
  matchup: '',
  eventDate: '',
  stat: 'Kills Maps 1+2',
  line: '',
  prediction: 'Over',
  isHot: false,
  confidence: 3,
  notes: '',
  bookieUrl: '',
  avgL10: '',
  diff: '',
  l5: '',
  l10: '',
  l15: '',
  h2h: '',
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
      style={{
        display: 'inline-flex', alignItems: 'center',
        padding: '2px 7px', borderRadius: 6,
        fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
        background: c.bg, color: c.color,
        border: `1px solid ${c.color}33`,
        fontFamily: "'DM Mono', monospace",
      }}
    >
      {c.label.toUpperCase()}
    </span>
  );
}

function ConfidenceDots({ value, color = '#ff6b35' }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} style={{
          width: 6, height: 6, borderRadius: '50%',
          background: i <= value ? color : '#2a2f3a',
        }} />
      ))}
    </div>
  );
}

// ── Form primitives ──
function Field({ label, children, required }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{
        fontSize: 10.5, fontWeight: 600, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: '#5a6474',
        fontFamily: "'DM Mono', monospace",
        display: 'flex', alignItems: 'center', gap: 4,
      }}>
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
  boxSizing: 'border-box',
};

function Input({ value, onChange, placeholder, type = 'text', ...rest }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={inputStyle}
      onFocus={e => (e.target.style.borderColor = 'rgba(255,107,53,0.4)')}
      onBlur={e => (e.target.style.borderColor = '#1e242c')}
      {...rest}
    />
  );
}

function Select({ value, onChange, children }) {
  return (
    <select
      value={value}
      onChange={onChange}
      style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
      onFocus={e => (e.target.style.borderColor = 'rgba(255,107,53,0.4)')}
      onBlur={e => (e.target.style.borderColor = '#1e242c')}
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
      style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div style={{ width: '100%', maxWidth: 360, borderRadius: 20, overflow: 'hidden', background: '#111418', border: '1px solid #1e242c' }}>
        <div style={{ height: 2, background: '#ff6b35' }} />
        <div style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#e8ecf0', fontFamily: "'Inter', sans-serif" }}>Settle Pick</h3>
            <button onClick={onClose} style={{ color: '#5a6474', background: 'none', border: 'none', cursor: 'pointer' }}><X size={16} /></button>
          </div>
          <div style={{ padding: '10px 14px', borderRadius: 12, marginBottom: 20, background: '#181c22', border: '1px solid #1e242c' }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#e8ecf0', fontFamily: "'DM Sans', sans-serif" }}>{pick.playerName}</p>
            <p style={{ margin: '3px 0 0', fontSize: 11, color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>
              {pick.prediction} {pick.line} · {pick.stat} · {pick.sport}
            </p>
          </div>
          <Field label="Result">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {['won', 'lost', 'push'].map(s => {
                const c = STATUS_CONFIG[s];
                const active = status === s;
                return (
                  <button key={s} onClick={() => setStatus(s)} style={{
                    padding: '10px 0', borderRadius: 10, fontWeight: 700, fontSize: 11,
                    letterSpacing: '0.08em', cursor: 'pointer', border: `1px solid ${active ? c.color + '55' : '#1e242c'}`,
                    background: active ? c.bg : '#181c22', color: active ? c.color : '#5a6474',
                    fontFamily: "'DM Mono', monospace",
                  }}>
                    {c.label.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </Field>
          <button onClick={handle} disabled={loading} style={{
            width: '100%', marginTop: 20, padding: '12px 0', borderRadius: 12,
            fontWeight: 700, fontSize: 13, cursor: loading ? 'not-allowed' : 'pointer',
            background: loading ? 'rgba(255,107,53,0.4)' : '#ff6b35', color: '#0a0c0f',
            border: 'none', fontFamily: "'DM Sans', sans-serif",
          }}>
            {loading ? 'Saving...' : 'Confirm Result'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Delete modal ──
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
      style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div style={{ width: '100%', maxWidth: 360, borderRadius: 20, overflow: 'hidden', background: '#111418', border: '1px solid rgba(255,71,87,0.3)' }}>
        <div style={{ height: 2, background: '#ff4757' }} />
        <div style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'rgba(255,71,87,0.1)', color: '#ff4757' }}>
              <AlertTriangle size={16} />
            </div>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#e8ecf0', fontFamily: "'Inter', sans-serif" }}>Delete Pick</h3>
          </div>
          <p style={{ margin: '0 0 20px', fontSize: 13, color: '#8a95a3', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>
            Delete <strong style={{ color: '#e8ecf0' }}>{pick.playerName}</strong> — {pick.prediction} {pick.line} {pick.stat}? This cannot be undone.
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={onClose} style={{ flex: 1, padding: '10px 0', borderRadius: 10, fontWeight: 600, fontSize: 13, background: '#181c22', color: '#8a95a3', border: '1px solid #1e242c', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
              Cancel
            </button>
            <button onClick={handle} disabled={loading} style={{ flex: 1, padding: '10px 0', borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: loading ? 'not-allowed' : 'pointer', background: loading ? 'rgba(255,71,87,0.4)' : 'rgba(255,71,87,0.15)', color: '#ff4757', border: '1px solid rgba(255,71,87,0.3)', fontFamily: "'DM Sans', sans-serif" }}>
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Pick row ──
function PickRow({ pick, onEdit, onSettle, onDelete, onToggleHot }) {
  const color = SPORT_COLORS[pick.sport] ?? '#ff6b35';
  const eventDate = pick.eventDate ? new Date(pick.eventDate) : null;
  const dateStr = eventDate
    ? eventDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    : null;
  const timeStr = eventDate
    ? eventDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    : null;

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderBottom: '1px solid #1e242c', transition: 'background 0.15s' }}
      onMouseEnter={e => (e.currentTarget.style.background = '#181c22')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      {/* Sport icon */}
      <div style={{ width: 34, height: 34, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: `${color}18`, color }}>
        <SportIcon sport={pick.sport} size={13} />
      </div>

      {/* Main info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#e8ecf0', fontFamily: "'DM Sans', sans-serif" }}>
            {pick.playerName}
          </span>
          {pick.isHot && <Flame size={11} style={{ color: '#ff6b35', flexShrink: 0 }} />}
          <StatusBadge status={pick.status} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>
            {pick.prediction} {pick.line} · {pick.stat}
          </span>
          <span style={{ color: '#2a3240', fontSize: 9 }}>·</span>
          <span style={{ fontSize: 11, color: '#2a3240', fontFamily: "'DM Mono', monospace" }}>{pick.matchup}</span>
        </div>
        {dateStr && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
            <Clock size={9} style={{ color: '#2a3240', flexShrink: 0 }} />
            <span style={{ fontSize: 10, color: '#2a3240', fontFamily: "'DM Mono', monospace" }}>
              {dateStr} · {timeStr}
            </span>
          </div>
        )}
      </div>

      {/* Confidence */}
      <div style={{ flexShrink: 0, display: 'none' }} className="sm-show">
        <ConfidenceDots value={pick.confidence} color={color} />
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
        {/* Hot toggle */}
        <button
          onClick={() => onToggleHot(pick._id, !pick.isHot)}
          title={pick.isHot ? 'Remove hot' : 'Mark hot'}
          style={{
            width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: pick.isHot ? 'rgba(255,107,53,0.15)' : 'transparent',
            color: pick.isHot ? '#ff6b35' : '#2a3240',
            border: `1px solid ${pick.isHot ? 'rgba(255,107,53,0.3)' : 'transparent'}`,
            cursor: 'pointer', transition: 'all 0.15s',
          }}
        >
          <Flame size={11} />
        </button>

        {/* Edit */}
        <button
          onClick={() => onEdit(pick)}
          title="Edit pick"
          style={{
            width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'transparent', color: '#2a3240', border: '1px solid transparent',
            cursor: 'pointer', transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(77,166,255,0.08)'; e.currentTarget.style.color = '#4da6ff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#2a3240'; }}
        >
          <Edit3 size={11} />
        </button>

        {/* Settle (pending only) */}
        {pick.status === 'pending' && (
          <button
            onClick={() => onSettle(pick)}
            title="Settle pick"
            style={{
              width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(0,229,160,0.08)', color: '#00e5a0', border: '1px solid rgba(0,229,160,0.2)',
              cursor: 'pointer',
            }}
          >
            <Check size={11} />
          </button>
        )}

        {/* Delete */}
        <button
          onClick={() => onDelete(pick)}
          title="Delete"
          style={{
            width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'transparent', color: '#2a3240', border: '1px solid transparent',
            cursor: 'pointer', transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,71,87,0.08)'; e.currentTarget.style.color = '#ff4757'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#2a3240'; }}
        >
          <Trash2 size={11} />
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

  const [form, setForm] = useState(EMPTY_FORM);
  const [extractedHistory, setExtractedHistory] = useState({ history: [], h2hHistory: [] });
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formMsg, setFormMsg] = useState(null);
  const [formOpen, setFormOpen] = useState(true);
  const [statsOpen, setStatsOpen] = useState(false);

  const [settleTarget, setSettleTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    if (!authLoading && !user) router.replace('/login');
    if (!authLoading && user && user.role !== 'admin') router.replace('/picks');
  }, [user, authLoading, router]);

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

  const setField = (key, val) =>
    setForm(f => ({
      ...f,
      [key]: val,
      ...(key === 'sport' ? { stat: SPORT_STATS[val]?.[0] ?? '' } : {}),
    }));

  const handleEdit = (pick) => {
    setForm({
      sport: pick.sport,
      playerName: pick.playerName,
      team: pick.team,
      matchup: pick.matchup,
      eventDate: toDatetimeLocal(pick.eventDate),
      stat: pick.stat,
      line: pick.line,
      prediction: pick.prediction,
      isHot: pick.isHot,
      confidence: pick.confidence,
      notes: pick.notes || '',
      bookieUrl: pick.bookieUrl || '',
      avgL10: pick.stats?.avgL10 ?? '',
      diff: pick.stats?.diff ?? '',
      l5: pick.stats?.l5 ?? '',
      l10: pick.stats?.l10 ?? '',
      l15: pick.stats?.l15 ?? '',
      h2h: pick.stats?.h2h ?? '',
    });
    setExtractedHistory({
      history:    pick.stats?.history    ?? [],
      h2hHistory: pick.stats?.h2hHistory ?? [],
    });
    setEditingId(pick._id);
    setFormOpen(true);
    setStatsOpen(!!(pick.stats?.l5 || pick.stats?.l10 || pick.stats?.avgL10));
    setFormMsg(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setExtractedHistory({ history: [], h2hHistory: [] });
    setFormMsg(null);
    setStatsOpen(false);
  };

  const buildStatsPayload = () => {
    const { avgL10, diff, l5, l10, l15, h2h } = form;
    const hasStats = [avgL10, diff, l5, l10, l15, h2h].some(v => v !== '');
    const hasHistory = extractedHistory.history.length > 0 || extractedHistory.h2hHistory.length > 0;
    if (!hasStats && !hasHistory) return undefined;
    const obj = {};
    if (avgL10 !== '') obj.avgL10 = parseFloat(avgL10);
    if (diff   !== '') obj.diff   = parseFloat(diff);
    if (l5     !== '') obj.l5     = l5;
    if (l10    !== '') obj.l10    = l10;
    if (l15    !== '') obj.l15    = l15;
    if (h2h    !== '') obj.h2h    = h2h;
    if (extractedHistory.history.length)    obj.history    = extractedHistory.history;
    if (extractedHistory.h2hHistory.length) obj.h2hHistory = extractedHistory.h2hHistory;
    return obj;
  };

  const handleExtracted = (data) => {
    setForm(f => ({
      ...f,
      sport:      data.sport      ?? f.sport,
      playerName: data.playerName ?? f.playerName,
      team:       data.team       ?? f.team,
      matchup:    data.matchup    ?? f.matchup,
      eventDate:  data.eventDate ? toDatetimeLocal(data.eventDate) : f.eventDate,
      stat:       data.stat       ?? f.stat,
      line:       data.line       ?? f.line,
      avgL10:     data.stats?.avgL10 ?? '',
      l5:         data.stats?.l5     ?? '',
      l10:        data.stats?.l10    ?? '',
      l15:        data.stats?.l15    ?? '',
      h2h:        data.stats?.h2h    ?? '',
    }));
    setExtractedHistory({
      history:    data.stats?.history    ?? [],
      h2hHistory: data.stats?.h2hHistory ?? [],
    });
    setStatsOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormMsg(null);
    try {
      const statsPayload = buildStatsPayload();
      const body = {
        sport: form.sport,
        playerName: form.playerName,
        team: form.team,
        matchup: form.matchup,
        eventDate: form.eventDate,
        stat: form.stat,
        line: form.line,
        prediction: form.prediction,
        isHot: form.isHot,
        confidence: form.confidence,
        notes: form.notes,
        bookieUrl: form.bookieUrl,
        stats: statsPayload,
      };

      let res, data;
      if (editingId) {
        res = await fetch('/api/admin/picks', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...body }),
        });
        data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed');
        setFormMsg({ type: 'success', text: `Updated — ${data.pick.playerName} ${data.pick.prediction} ${data.pick.line}` });
        setEditingId(null);
        setForm(EMPTY_FORM);
        setStatsOpen(false);
      } else {
        res = await fetch('/api/admin/picks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed');
        setFormMsg({ type: 'success', text: `Posted — ${data.pick.playerName} ${data.pick.prediction} ${data.pick.line}` });
        setForm(EMPTY_FORM);
        setStatsOpen(false);
      }
      loadPicks();
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
    if (editingId === id) handleCancelEdit();
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

  const statsSummary = {
    total: picks.length,
    hot: picks.filter(p => p.isHot).length,
    won: picks.filter(p => p.status === 'won').length,
    lost: picks.filter(p => p.status === 'lost').length,
  };

  const accentColor = editingId ? '#4da6ff' : '#ff6b35';

  if (authLoading || !user) return null;
  if (user.role !== 'admin') return null;

  return (
    <div style={{ minHeight: '100vh', paddingTop: 64, background: '#0a0c0f' }}>

      {settleTarget && (
        <SettleModal pick={settleTarget} onClose={() => setSettleTarget(null)} onSettle={handleSettle} />
      )}
      {deleteTarget && (
        <DeleteModal pick={deleteTarget} onClose={() => setDeleteTarget(null)} onDelete={handleDelete} />
      )}

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 16px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px',
              borderRadius: 6, marginBottom: 8,
              background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.2)',
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff6b35' }} />
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', color: '#ff6b35', fontFamily: "'DM Mono', monospace" }}>
                ADMIN
              </span>
            </div>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: '#e8ecf0', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}>
              Picks Dashboard
            </h1>
          </div>
          <button
            onClick={loadPicks}
            title="Refresh"
            style={{
              width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: '#111418', border: '1px solid #1e242c', color: '#5a6474', cursor: 'pointer',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#e8ecf0'; e.currentTarget.style.borderColor = '#2a3240'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#5a6474'; e.currentTarget.style.borderColor = '#1e242c'; }}
          >
            <RefreshCw size={14} />
          </button>
        </div>

        <ScreenshotExtractor onExtracted={handleExtracted} />

        {/* ── FORM ── */}
        <div style={{ borderRadius: 20, overflow: 'hidden', marginBottom: 20, background: '#111418', border: `1px solid ${editingId ? 'rgba(77,166,255,0.25)' : '#1e242c'}` }}>
          <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${accentColor} 40%, ${accentColor} 60%, transparent)` }} />

          {/* Form header */}
          <button
            onClick={() => setFormOpen(v => !v)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 24px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `${accentColor}18`, color: accentColor, border: `1px solid ${accentColor}33`,
              }}>
                {editingId ? <Edit3 size={15} /> : <Plus size={15} />}
              </div>
              <div>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#e8ecf0', fontFamily: "'Inter', sans-serif" }}>
                  {editingId ? 'Edit Pick' : 'Post New Pick'}
                </span>
                {editingId && (
                  <span style={{ marginLeft: 8, fontSize: 11, color: '#4da6ff', fontFamily: "'DM Mono', monospace" }}>
                    · {form.playerName || 'editing'}
                  </span>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {editingId && (
                <button
                  onClick={e => { e.stopPropagation(); handleCancelEdit(); }}
                  style={{
                    padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                    background: 'rgba(255,71,87,0.08)', color: '#ff4757',
                    border: '1px solid rgba(255,71,87,0.2)', cursor: 'pointer',
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  Cancel edit
                </button>
              )}
              <ChevronDown size={15} style={{ color: '#5a6474', transform: formOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </div>
          </button>

          {formOpen && (
            <form onSubmit={handleSubmit} style={{ padding: '0 24px 24px' }}>
              <div style={{ height: 1, background: '#1e242c', marginBottom: 24 }} />

              {/* Row 1: Sport + Player + Team */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 14 }} className="admin-grid-3">
                <Field label="Sport" required>
                  <Select value={form.sport} onChange={e => setField('sport', e.target.value)}>
                    {SPORTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </Select>
                </Field>
                <Field label="Player Name" required>
                  <Input value={form.playerName} onChange={e => setField('playerName', e.target.value)} placeholder="e.g. b1t" />
                </Field>
                <Field label="Team" required>
                  <Input value={form.team} onChange={e => setField('team', e.target.value)} placeholder="e.g. NAVI" />
                </Field>
              </div>

              {/* Row 2: Matchup + Event Date/Time */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }} className="admin-grid-2">
                <Field label="Matchup" required>
                  <Input value={form.matchup} onChange={e => setField('matchup', e.target.value)} placeholder="e.g. NAVI vs VIT" />
                </Field>
                <Field label="Match Date & Time" required>
                  <Input
                    type="datetime-local"
                    value={form.eventDate}
                    onChange={e => setField('eventDate', e.target.value)}
                  />
                </Field>
              </div>

              {/* Row 3: Stat + Line + Prediction */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 14 }} className="admin-grid-3">
                <Field label="Stat" required>
                  <Select value={form.stat} onChange={e => setField('stat', e.target.value)}>
                    {(SPORT_STATS[form.sport] ?? []).map(s => <option key={s} value={s}>{s}</option>)}
                  </Select>
                </Field>
                <Field label="Line" required>
                  <Input type="number" step="0.5" value={form.line} onChange={e => setField('line', e.target.value)} placeholder="e.g. 15.5" />
                </Field>
                <Field label="Prediction" required>
                  <Select value={form.prediction} onChange={e => setField('prediction', e.target.value)}>
                    {PREDICTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                  </Select>
                </Field>
              </div>

              {/* Row 4: Confidence + Hot */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }} className="admin-grid-2">
                <Field label="Confidence (1–5u)">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 42 }}>
                    {[1, 2, 3, 4, 5].map(i => (
                      <button key={i} type="button" onClick={() => setField('confidence', i)} style={{
                        width: 32, height: 32, borderRadius: 8, fontWeight: 700, fontSize: 11,
                        cursor: 'pointer', transition: 'all 0.15s', fontFamily: "'DM Mono', monospace",
                        background: i <= form.confidence ? 'rgba(255,107,53,0.15)' : '#181c22',
                        color: i <= form.confidence ? '#ff6b35' : '#2a3240',
                        border: `1px solid ${i <= form.confidence ? 'rgba(255,107,53,0.3)' : '#1e242c'}`,
                      }}>{i}</button>
                    ))}
                    <span style={{ fontSize: 10.5, color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>
                      {['', 'Risky', 'Lean', 'Solid', 'Strong', 'Lock'][form.confidence]}
                    </span>
                  </div>
                </Field>
                <Field label="Fire Pick">
                  <div style={{ display: 'flex', alignItems: 'center', height: 42 }}>
                    <button type="button" onClick={() => setField('isHot', !form.isHot)} style={{
                      display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 9,
                      fontWeight: 600, fontSize: 12, cursor: 'pointer', transition: 'all 0.15s',
                      fontFamily: "'DM Mono', monospace',",
                      background: form.isHot ? 'rgba(255,107,53,0.15)' : '#181c22',
                      color: form.isHot ? '#ff6b35' : '#5a6474',
                      border: `1px solid ${form.isHot ? 'rgba(255,107,53,0.3)' : '#1e242c'}`,
                    }}>
                      <Flame size={13} />
                      {form.isHot ? 'Hot — pinned to top' : 'Mark as Fire Pick'}
                    </button>
                  </div>
                </Field>
              </div>

              {/* Notes */}
              <div style={{ marginBottom: 14 }}>
                <Field label="Analysis / Notes">
                  <textarea
                    value={form.notes}
                    onChange={e => setField('notes', e.target.value)}
                    placeholder="e.g. averaging 18.2 HS over L10 (80% HR). H2H vs VIT split — blowout risk is the main concern..."
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.55 }}
                    onFocus={e => (e.target.style.borderColor = 'rgba(255,107,53,0.4)')}
                    onBlur={e => (e.target.style.borderColor = '#1e242c')}
                  />
                </Field>
              </div>

              {/* ── Stats section (collapsible) ── */}
              <div style={{ borderRadius: 12, border: '1px solid #1e242c', marginBottom: 20, overflow: 'hidden' }}>
                <button
                  type="button"
                  onClick={() => setStatsOpen(v => !v)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 16px', background: '#181c22', border: 'none', cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <BarChart2 size={13} style={{ color: '#5a6474' }} />
                    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>
                      STATS GRID (optional)
                    </span>
                    {(form.l5 || form.l10 || form.avgL10) && (
                      <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 4, background: 'rgba(255,107,53,0.1)', color: '#ff6b35', fontFamily: "'DM Mono', monospace" }}>
                        filled
                      </span>
                    )}
                  </div>
                  <ChevronDown size={13} style={{ color: '#5a6474', transform: statsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>

                {statsOpen && (
                  <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <p style={{ margin: 0, fontSize: 11, color: '#2a3240', fontFamily: "'DM Sans', sans-serif" }}>
                      Populates the stats grid on the pick card. Percentages shown in green (e.g. &quot;80%&quot;), numbers in white.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }} className="admin-grid-3">
                      <Field label="Avg L10">
                        <Input type="number" step="0.01" value={form.avgL10} onChange={e => setField('avgL10', e.target.value)} placeholder="e.g. 18.20" />
                      </Field>
                      <Field label="Diff">
                        <Input type="number" step="0.01" value={form.diff} onChange={e => setField('diff', e.target.value)} placeholder="e.g. 2.70" />
                      </Field>
                      <Field label="L5 %">
                        <Input value={form.l5} onChange={e => setField('l5', e.target.value)} placeholder="e.g. 100%" />
                      </Field>
                      <Field label="L10 %">
                        <Input value={form.l10} onChange={e => setField('l10', e.target.value)} placeholder="e.g. 80%" />
                      </Field>
                      <Field label="L15 %">
                        <Input value={form.l15} onChange={e => setField('l15', e.target.value)} placeholder="e.g. 60%" />
                      </Field>
                      <Field label="H2H %">
                        <Input value={form.h2h} onChange={e => setField('h2h', e.target.value)} placeholder="e.g. 67%" />
                      </Field>
                    </div>
                  </div>
                )}
              </div>

              {/* Message */}
              {formMsg && (
                <div style={{
                  padding: '10px 14px', borderRadius: 10, marginBottom: 16, fontSize: 13,
                  background: formMsg.type === 'success' ? 'rgba(0,229,160,0.08)' : 'rgba(255,71,87,0.08)',
                  border: `1px solid ${formMsg.type === 'success' ? 'rgba(0,229,160,0.25)' : 'rgba(255,71,87,0.25)'}`,
                  color: formMsg.type === 'success' ? '#00e5a0' : '#ff4757',
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  {formMsg.text}
                </div>
              )}

              {/* Submit */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                {editingId && (
                  <button type="button" onClick={handleCancelEdit} style={{
                    padding: '10px 20px', borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: 'pointer',
                    background: '#181c22', color: '#8a95a3', border: '1px solid #1e242c',
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    Cancel
                  </button>
                )}
                <button type="submit" disabled={submitting} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '10px 24px', borderRadius: 10, fontWeight: 700, fontSize: 13,
                  cursor: submitting ? 'not-allowed' : 'pointer', border: 'none',
                  background: submitting ? `${accentColor}66` : accentColor,
                  color: '#0a0c0f', fontFamily: "'DM Sans', sans-serif",
                  boxShadow: submitting ? 'none' : `0 4px 20px ${accentColor}44`,
                  transition: 'all 0.2s',
                }}>
                  {editingId ? <Edit3 size={14} /> : <Plus size={14} />}
                  {submitting ? (editingId ? 'Saving...' : 'Posting...') : (editingId ? 'Save Changes' : 'Post Pick')}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* ── PICKS LIST ── */}
        <div style={{ borderRadius: 20, overflow: 'hidden', background: '#111418', border: '1px solid #1e242c' }}>

          {/* List header + filters */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 20px', borderBottom: '1px solid #1e242c', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h2 style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#e8ecf0', fontFamily: "'Inter', sans-serif" }}>Picks</h2>
              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: '#181c22', color: '#5a6474', border: '1px solid #1e242c', fontFamily: "'DM Mono', monospace" }}>
                {picks.length}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { val: filterStatus, set: setFilterStatus, opts: STATUSES, label: s => s === 'all' ? 'All statuses' : s.charAt(0).toUpperCase() + s.slice(1) },
                { val: filterSport,  set: setFilterSport,  opts: ['all', ...SPORTS], label: s => s === 'all' ? 'All sports' : s },
              ].map((cfg, i) => (
                <select key={i} value={cfg.val} onChange={e => cfg.set(e.target.value)} style={{
                  background: '#181c22', border: '1px solid #1e242c', color: '#a8b3bf',
                  fontFamily: "'DM Mono', monospace", fontSize: 11, borderRadius: 8,
                  padding: '6px 10px', outline: 'none', cursor: 'pointer',
                }}>
                  {cfg.opts.map(s => <option key={s} value={s}>{cfg.label(s)}</option>)}
                </select>
              ))}
            </div>
          </div>

          {/* Stats strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: '1px solid #1e242c' }}>
            {[
              { label: 'Showing', value: statsSummary.total },
              { label: 'Hot',     value: statsSummary.hot,  color: '#ff6b35' },
              { label: 'Won',     value: statsSummary.won,  color: '#00e5a0' },
              { label: 'Lost',    value: statsSummary.lost, color: '#ff4757' },
            ].map((s, i) => (
              <div key={i} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 0',
                borderRight: i < 3 ? '1px solid #1e242c' : 'none',
              }}>
                <span style={{ fontSize: 18, fontWeight: 800, lineHeight: 1, color: s.color ?? '#e8ecf0', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}>
                  {s.value}
                </span>
                <span style={{ fontSize: 10, marginTop: 3, color: '#2a3240', fontFamily: "'DM Mono', monospace" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Rows */}
          {fetching && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 0' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', border: '2px solid #1e242c', borderTopColor: '#ff6b35', animation: 'adminSpin 0.7s linear infinite' }} />
            </div>
          )}

          {!fetching && picks.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <p style={{ fontSize: 12, color: '#2a3240', fontFamily: "'DM Mono', monospace" }}>No picks found.</p>
            </div>
          )}

          {!fetching && picks.map(pick => (
            <PickRow
              key={pick._id}
              pick={pick}
              onEdit={handleEdit}
              onSettle={setSettleTarget}
              onDelete={setDeleteTarget}
              onToggleHot={handleToggleHot}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes adminSpin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) {
          .admin-grid-3 { grid-template-columns: 1fr !important; }
          .admin-grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
