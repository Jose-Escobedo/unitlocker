'use client';
import BankrollCalendar from '@/components/BankrollCalendar';
import { searchTeams, getTeams } from '@/lib/sportsData';

import {useState, useEffect, useMemo} from 'react';
import {
  TrendingUp, TrendingDown, Plus, X, ChevronDown,
  Trophy, Star, Target, BarChart2, Wallet,
  CheckCircle2, XCircle, MinusCircle, Clock,
  Flame, Zap, Lock, DollarSign, Percent,
  Activity, Award, Crosshair, Layers
} from 'lucide-react';

// ── Mock data — replace with real API calls ──
const MOCK_USER = { name: 'Alex' };
const STARTING_BANKROLL = 1000;

const MOCK_BETS = [
  { id: 1, game: 'Lakers vs Celtics', sport: '🏀 NBA', type: 'Moneyline', odds: -110, stake: 50, pick: 'Lakers', status: 'win', pl: 45.45, date: 'Mar 22' },
  { id: 2, game: 'Chiefs vs Ravens', sport: '🏈 NFL', type: 'Spread', odds: -110, stake: 75, pick: 'Chiefs', status: 'loss', pl: -75, date: 'Mar 21' },
  { id: 3, game: 'Yankees vs Red Sox', sport: '⚾ MLB', type: 'Total (O/U)', odds: +120, stake: 40, pick: 'Over', status: 'win', pl: 48, date: 'Mar 20' },
  { id: 4, game: 'Man City vs Arsenal', sport: '⚽ Soccer', type: 'Moneyline', odds: +150, stake: 30, status: 'push', pl: 0, date: 'Mar 19' },
  { id: 5, game: 'Nuggets vs Warriors', sport: '🏀 NBA', type: 'Spread', odds: -110, stake: 60, pick: 'Nuggets', status: 'pending', pl: 0, date: 'Mar 25' },
  { id: 6, game: 'Maple Leafs vs Bruins', sport: '🏒 NHL', type: 'Moneyline', odds: +105, stake: 45, status: 'win', pl: 47.25, date: 'Mar 18' },
];

const RANKS = [
  { name: 'ROOKIE', min: 0, max: 100 },
  { name: 'GRINDER', min: 100, max: 300 },
  { name: 'SHARPIE', min: 300, max: 600 },
  { name: 'WISEGUY', min: 600, max: 1000 },
  { name: 'WHALE', min: 1000, max: 2000 },
  { name: 'LEGEND', min: 2000, max: Infinity },
];

const ACHIEVEMENTS = [
  { id: 'first_bet', icon: 'target', name: 'First Blood', desc: 'Log your first bet', unlocked: true },
  { id: 'streak_3', icon: 'flame', name: 'Hot Hand', desc: '3-bet win streak', unlocked: true },
  { id: 'streak_5', icon: 'zap', name: 'On Fire', desc: '5-bet win streak', unlocked: false },
  { id: 'ten_bets', icon: 'layers', name: 'Degenerate', desc: 'Log 10 bets', unlocked: false },
  { id: 'doubled', icon: 'trending', name: 'Double Up', desc: 'Double your bankroll', unlocked: false },
  { id: 'fifty_bets', icon: 'trophy', name: 'Hall of Fame', desc: 'Log 50 bets', unlocked: false },
];

const SPORTS = ['🏀 NBA', '🏈 NFL', '⚾ MLB', '🏒 NHL', '⚽ Soccer', '🎾 Tennis', '🥊 MMA', '🏇 Horse', '🎲 Other'];

// ── Helpers ──
function fmt(n) {
  return '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtSigned(n) {
  return (n >= 0 ? '+' : '-') + fmt(n);
}
function americanToDecimal(o) {
  return o > 0 ? o / 100 + 1 : 100 / Math.abs(o) + 1;
}
function calcPotentialWin(odds, stake) {
  return stake * (americanToDecimal(odds) - 1);
}
function getRank(xp) {
  return RANKS.find((r, i) => xp >= r.min && (xp < r.max || i === RANKS.length - 1));
}
function getNextRank(xp) {
  const idx = RANKS.findIndex((r, i) => xp >= r.min && (xp < r.max || i === RANKS.length - 1));
  return RANKS[Math.min(idx + 1, RANKS.length - 1)];
}

// ── Achievement Icon ──
function AchievementIcon({ type, unlocked }) {
  const color = unlocked ? '#f5c842' : '#2a3240';
  const bg = unlocked ? 'rgba(245,200,66,0.1)' : '#181c22';
  const icons = {
    target: <Crosshair size={16} />,
    flame: <Flame size={16} />,
    zap: <Zap size={16} />,
    layers: <Layers size={16} />,
    trending: <TrendingUp size={16} />,
    trophy: <Trophy size={16} />,
  };
  return (
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center"
      style={{ background: bg, border: `1px solid ${unlocked ? 'rgba(245,200,66,0.2)' : '#1e242c'}`, color }}
    >
      {icons[type]}
    </div>
  );
}

// ── Stat Card ──
function StatCard({ label, value, sub, color, icon }) {
  return (
    <div
      className="relative p-5 rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
      style={{ background: '#111418', border: '1px solid #1e242c' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: color }}
      />
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
        style={{ background: `${color}18`, color }}
      >
        {icon}
      </div>
      <div
        className="text-xs font-medium tracking-widest uppercase mb-1"
        style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}
      >
        {label}
      </div>
      <div
        className="text-2xl font-bold leading-none"
        style={{ color, fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}
      >
        {value}
      </div>
      {sub && (
        <div
          className="text-xs mt-1.5"
          style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

// ── Bet Row ──
function BetRow({ bet, onSettle }) {
  const statusColor = { win: '#00e5a0', loss: '#ff4757', push: '#f5c842', pending: '#5a6474' };
  const statusIcon = {
    win: <CheckCircle2 size={13} />,
    loss: <XCircle size={13} />,
    push: <MinusCircle size={13} />,
    pending: <Clock size={13} />,
  };
  return (
    <div
      className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group"
      style={{
        background: '#111418',
        border: '1px solid #1e242c',
        borderLeft: `3px solid ${statusColor[bet.status]}`,
      }}
    >
      {/* Game info */}
      <div className="flex-1 min-w-0">
        <div
          className="font-semibold text-sm truncate"
          style={{ color: '#e8ecf0', fontFamily: "'DM Sans', sans-serif" }}
        >
          {bet.game}
        </div>
        <div
          className="flex items-center gap-3 mt-0.5 flex-wrap"
          style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#5a6474' }}
        >
          <span>{bet.sport}</span>
          <span>{bet.type}</span>
          {bet.pick && (
            <span
              className="px-1.5 py-0.5 rounded"
              style={{ background: 'rgba(0,229,160,0.08)', color: '#00e5a0', border: '1px solid rgba(0,229,160,0.2)' }}
            >
              {bet.pick}
            </span>
          )}
          <span>{bet.odds > 0 ? '+' : ''}{bet.odds}</span>
          <span>{bet.date}</span>
        </div>
      </div>

      {/* Settle buttons for pending */}
      {bet.status === 'pending' && (
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={() => onSettle(bet.id, 'win')}
            className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer"
            style={{ background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.25)', color: '#00e5a0', fontFamily: "'DM Mono', monospace" }}
          >W</button>
          <button
            onClick={() => onSettle(bet.id, 'loss')}
            className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer"
            style={{ background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.25)', color: '#ff4757', fontFamily: "'DM Mono', monospace" }}
          >L</button>
          <button
            onClick={() => onSettle(bet.id, 'push')}
            className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer"
            style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.25)', color: '#f5c842', fontFamily: "'DM Mono', monospace" }}
          >P</button>
        </div>
      )}

      {/* Stake + P&L */}
      <div className="text-right flex-shrink-0">
        <div
          className="font-semibold text-sm"
          style={{ color: '#e8ecf0', fontFamily: "'Inter', sans-serif" }}
        >
          {fmt(bet.stake)}
        </div>
        <div
          className="text-xs mt-0.5 flex items-center justify-end gap-1"
          style={{ color: statusColor[bet.status], fontFamily: "'DM Mono', monospace" }}
        >
          {statusIcon[bet.status]}
          {bet.status === 'pending'
            ? `to win ${fmt(calcPotentialWin(bet.odds, bet.stake))}`
            : fmtSigned(bet.pl)}
        </div>
      </div>
    </div>
  );
}

// ── Log Bet Modal ──
const SPORTS_GRID = [
  { label: 'NBA',     emoji: '🏀' },
  { label: 'NFL',     emoji: '🏈' },
  { label: 'MLB',     emoji: '⚾' },
  { label: 'NHL',     emoji: '🏒' },
  { label: 'Soccer',  emoji: '⚽' },
  { label: 'Tennis',  emoji: '🎾' },
  { label: 'MMA',     emoji: '🥊' },
  { label: 'Horse',   emoji: '🏇' },
  { label: 'Other',   emoji: '🎲' },
];

const QUICK_STAKES = [25, 50, 100, 200];
const BET_TYPES = ['Moneyline', 'Spread', 'Total (O/U)', 'Parlay', 'Prop', 'Futures'];

// Persist last used prefs in localStorage
function getLastPrefs() {
  try {
    const raw = localStorage.getItem('ul_last_prefs');
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}
function saveLastPrefs(prefs) {
  try { localStorage.setItem('ul_last_prefs', JSON.stringify(prefs)); } catch {}
}

function americanToDecimalModal(o) {
  return o > 0 ? (o / 100 + 1) : (100 / Math.abs(o) + 1);
}
function decimalToAmerican(d) {
  if (d >= 2) return Math.round((d - 1) * 100);
  return Math.round(-100 / (d - 1));
}

function LogBetModal({ onClose, onSubmit, bankroll }) {
  const lastPrefs = getLastPrefs();

  const [sport, setSport] = useState(lastPrefs.sport || 'NBA');
  const [betType, setBetType] = useState(lastPrefs.betType || 'Moneyline');
  const [showBetType, setShowBetType] = useState(false);
  const [oddsRaw, setOddsRaw] = useState('');
  const [oddsFormat, setOddsFormat] = useState('american');
  const [stakeRaw, setStakeRaw] = useState(lastPrefs.stake ? String(lastPrefs.stake) : '');
  const [customStake, setCustomStake] = useState(false);
  const [error, setError] = useState('');

  // Pick / Against state
  const [pickQuery, setPickQuery] = useState('');
  const [pick, setPick] = useState('');
  const [showPickSugg, setShowPickSugg] = useState(false);

  const [againstQuery, setAgainstQuery] = useState('');
  const [against, setAgainst] = useState('');
  const [showAgainstSugg, setShowAgainstSugg] = useState(false);

  // Derived game string
  const game = pick && against ? `${pick} vs ${against}` : pick || '';

  // Suggestions
  const pickSuggestions = useMemo(() => searchTeams(pickQuery, sport, 6), [pickQuery, sport]);
  const againstSuggestions = useMemo(() => searchTeams(againstQuery, sport, 6, pick), [againstQuery, sport, pick]);

  // Reset against when pick or sport changes
  useEffect(() => { setAgainst(''); setAgainstQuery(''); }, [pick, sport]);
  useEffect(() => { setPick(''); setPickQuery(''); setAgainst(''); setAgainstQuery(''); }, [sport]);

  // Parse odds to american for calculation
  const oddsAmerican = useMemo(() => {
    const val = parseFloat(oddsRaw);
    if (!val || isNaN(val)) return null;
    if (oddsFormat === 'decimal') return decimalToAmerican(val);
    return val;
  }, [oddsRaw, oddsFormat]);

  const stake = parseFloat(stakeRaw) || 0;
  const potentialWin = oddsAmerican && stake > 0
    ? stake * (americanToDecimalModal(oddsAmerican) - 1)
    : null;

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!pick) { setError('Select your pick.'); return; }
    if (!against) { setError('Select the opponent.'); return; }
    if (!oddsAmerican || isNaN(oddsAmerican)) { setError('Enter valid odds.'); return; }
    if (!stake || stake <= 0) { setError('Enter a valid stake.'); return; }
    if (stake > bankroll) { setError('Stake exceeds available bankroll.'); return; }
    setError('');
    saveLastPrefs({ sport, betType, stake });
    onSubmit({ game: `${pick} vs ${against}`, sport, type: betType, odds: oddsAmerican, stake, pick, against });
    onClose();
  };

  // Enter key submits
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) handleSubmit();
  };

  const inputStyle = {
    background: '#181c22',
    border: '1px solid #1e242c',
    color: '#e8ecf0',
    fontFamily: "'DM Mono', monospace",
    outline: 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s',
  };

  const onFocus = (e) => {
    e.target.style.borderColor = 'rgba(0,229,160,0.4)';
    e.target.style.boxShadow = '0 0 0 3px rgba(0,229,160,0.07)';
  };
  const onBlur = (e) => {
    e.target.style.borderColor = '#1e242c';
    e.target.style.boxShadow = 'none';
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl relative overflow-hidden"
        style={{ background: '#111418', border: '1px solid #1e242c' }}
        onKeyDown={handleKeyDown}
      >
        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #00e5a0, transparent)' }} />

        <div className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-bold text-base" style={{ color: '#e8ecf0', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}>
                Log a bet
              </h2>
              <p className="text-xs mt-0.5" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>
                Available: ${bankroll.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer"
              style={{ background: '#181c22', border: '1px solid #1e242c', color: '#5a6474' }}
              onMouseEnter={e => e.currentTarget.style.color = '#e8ecf0'}
              onMouseLeave={e => e.currentTarget.style.color = '#5a6474'}
            >
              <X size={14} />
            </button>
          </div>

          {/* Pick / Against inputs */}
          <div className="grid grid-cols-2 gap-3 mb-4">

            {/* Pick */}
            <div className="relative">
              <label className="text-xs font-medium tracking-widest uppercase mb-1.5 block" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>
                Pick
              </label>
              <input
                type="text"
                placeholder="Your team"
                value={pick || pickQuery}
                onChange={e => { setPickQuery(e.target.value); setPick(''); setShowPickSugg(true); }}
                autoFocus
                autoComplete="off"
                className="w-full px-3 py-2.5 rounded-lg text-sm"
                style={{
                  ...inputStyle,
                  fontFamily: "'DM Sans', sans-serif",
                  borderColor: pick ? 'rgba(0,229,160,0.4)' : '#1e242c',
                  color: pick ? '#00e5a0' : '#e8ecf0',
                }}
                onFocus={e => { onFocus(e); setShowPickSugg(true); }}
                onBlur={e => { onBlur(e); setTimeout(() => setShowPickSugg(false), 150); }}
              />
              {pick && (
                <button
                  type="button"
                  onClick={() => { setPick(''); setPickQuery(''); }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer mt-2.5"
                  style={{ color: '#5a6474' }}
                >
                  <X size={12} />
                </button>
              )}
              {showPickSugg && pickSuggestions.length > 0 && !pick && (
                <div
                  className="absolute left-0 right-0 top-full mt-1 rounded-xl overflow-hidden z-20"
                  style={{ background: '#181c22', border: '1px solid #1e242c', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
                >
                  {pickSuggestions.map((s, i) => (
                    <button
                      key={i}
                      type="button"
                      onMouseDown={() => { setPick(s); setPickQuery(''); setShowPickSugg(false); }}
                      className="w-full text-left px-3 py-2 text-xs transition-all duration-100 cursor-pointer"
                      style={{
                        color: '#a8b3bf',
                        fontFamily: "'DM Sans', sans-serif",
                        borderBottom: i < pickSuggestions.length - 1 ? '1px solid #1e242c' : 'none',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,229,160,0.07)'; e.currentTarget.style.color = '#e8ecf0'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#a8b3bf'; }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Against */}
            <div className="relative">
              <label className="text-xs font-medium tracking-widest uppercase mb-1.5 block" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>
                Against
              </label>
              <input
                type="text"
                placeholder="Opponent"
                value={against || againstQuery}
                onChange={e => { setAgainstQuery(e.target.value); setAgainst(''); setShowAgainstSugg(true); }}
                autoComplete="off"
                disabled={!pick}
                className="w-full px-3 py-2.5 rounded-lg text-sm"
                style={{
                  ...inputStyle,
                  fontFamily: "'DM Sans', sans-serif",
                  borderColor: against ? 'rgba(0,229,160,0.4)' : '#1e242c',
                  color: against ? '#00e5a0' : '#e8ecf0',
                  opacity: !pick ? 0.4 : 1,
                  cursor: !pick ? 'not-allowed' : 'text',
                }}
                onFocus={e => { onFocus(e); setShowAgainstSugg(true); }}
                onBlur={e => { onBlur(e); setTimeout(() => setShowAgainstSugg(false), 150); }}
              />
              {against && (
                <button
                  type="button"
                  onClick={() => { setAgainst(''); setAgainstQuery(''); }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer mt-2.5"
                  style={{ color: '#5a6474' }}
                >
                  <X size={12} />
                </button>
              )}
              {showAgainstSugg && againstSuggestions.length > 0 && !against && (
                <div
                  className="absolute left-0 right-0 top-full mt-1 rounded-xl overflow-hidden z-20"
                  style={{ background: '#181c22', border: '1px solid #1e242c', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
                >
                  {againstSuggestions.map((s, i) => (
                    <button
                      key={i}
                      type="button"
                      onMouseDown={() => { setAgainst(s); setAgainstQuery(''); setShowAgainstSugg(false); }}
                      className="w-full text-left px-3 py-2 text-xs transition-all duration-100 cursor-pointer"
                      style={{
                        color: '#a8b3bf',
                        fontFamily: "'DM Sans', sans-serif",
                        borderBottom: i < againstSuggestions.length - 1 ? '1px solid #1e242c' : 'none',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,229,160,0.07)'; e.currentTarget.style.color = '#e8ecf0'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#a8b3bf'; }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Matchup preview */}
          {pick && against && (
            <div
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg mb-4 text-xs"
              style={{ background: 'rgba(0,229,160,0.06)', border: '1px solid rgba(0,229,160,0.15)' }}
            >
              <span style={{ color: '#00e5a0', fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{pick}</span>
              <span style={{ color: '#2a3240', fontFamily: "'DM Mono', monospace" }}>vs</span>
              <span style={{ color: '#8a95a3', fontFamily: "'DM Sans', sans-serif" }}>{against}</span>
            </div>
          )}

          {/* Sport grid */}
          <div className="mb-4">
            <label className="text-xs font-medium tracking-widest uppercase mb-1.5 block" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>
              Sport
            </label>
            <div className="grid grid-cols-9 gap-1">
              {SPORTS_GRID.map(s => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setSport(s.label)}
                  className="flex flex-col items-center gap-0.5 py-2 rounded-lg transition-all duration-150 cursor-pointer"
                  style={{
                    background: sport === s.label ? 'rgba(0,229,160,0.12)' : '#181c22',
                    border: `1px solid ${sport === s.label ? 'rgba(0,229,160,0.35)' : '#1e242c'}`,
                  }}
                  title={s.label}
                >
                  <span style={{ fontSize: '1rem', lineHeight: 1 }}>{s.emoji}</span>
                  <span style={{ color: sport === s.label ? '#00e5a0' : '#2a3240', fontFamily: "'DM Mono', monospace", fontSize: '8px' }}>
                    {s.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Odds row */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium tracking-widest uppercase" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>
                Odds
              </label>
              {/* Format toggle */}
              <div className="flex gap-0.5 p-0.5 rounded-lg" style={{ background: '#181c22', border: '1px solid #1e242c' }}>
                {['american', 'decimal'].map(f => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => { setOddsFormat(f); setOddsRaw(''); }}
                    className="px-2 py-0.5 rounded text-xs transition-all duration-150 cursor-pointer"
                    style={{
                      background: oddsFormat === f ? '#111418' : 'transparent',
                      color: oddsFormat === f ? '#e8ecf0' : '#5a6474',
                      fontFamily: "'DM Mono', monospace",
                      border: oddsFormat === f ? '1px solid #1e242c' : '1px solid transparent',
                    }}
                  >
                    {f === 'american' ? 'US' : 'DEC'}
                  </button>
                ))}
              </div>
            </div>
            <input
              type="number"
              placeholder={oddsFormat === 'american' ? '-110' : '1.91'}
              value={oddsRaw}
              onChange={e => setOddsRaw(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg text-sm"
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            {oddsAmerican && oddsRaw && (
              <p className="text-xs mt-1" style={{ color: '#2a3240', fontFamily: "'DM Mono', monospace" }}>
                {oddsFormat === 'decimal'
                  ? `American: ${oddsAmerican > 0 ? '+' : ''}${oddsAmerican}`
                  : `Decimal: ${americanToDecimalModal(oddsAmerican).toFixed(3)}`}
              </p>
            )}
          </div>

          {/* Stake */}
          <div className="mb-4">
            <label className="text-xs font-medium tracking-widest uppercase mb-1.5 block" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>
              Stake
            </label>
            {/* Quick stake buttons */}
            <div className="grid grid-cols-4 gap-1.5 mb-2">
              {QUICK_STAKES.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => { setStakeRaw(String(s)); setCustomStake(false); }}
                  className="py-2 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer"
                  style={{
                    background: !customStake && stakeRaw === String(s) ? 'rgba(0,229,160,0.12)' : '#181c22',
                    border: `1px solid ${!customStake && stakeRaw === String(s) ? 'rgba(0,229,160,0.35)' : '#1e242c'}`,
                    color: !customStake && stakeRaw === String(s) ? '#00e5a0' : '#8a95a3',
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  ${s}
                </button>
              ))}
            </div>
            {/* Custom stake */}
            <div className="relative">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-sm"
                style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}
              >
                $
              </span>
              <input
                type="number"
                placeholder="Custom amount"
                value={customStake ? stakeRaw : ''}
                onChange={e => { setStakeRaw(e.target.value); setCustomStake(true); }}
                onFocus={e => { setCustomStake(true); onFocus(e); }}
                onBlur={onBlur}
                className="w-full pl-7 pr-4 py-2.5 rounded-lg text-sm"
                style={inputStyle}
                min="1"
              />
            </div>
          </div>

          {/* Bet type — collapsed/optional */}
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setShowBetType(!showBetType)}
              className="flex items-center gap-1.5 text-xs cursor-pointer transition-colors duration-150"
              style={{ color: showBetType ? '#00e5a0' : '#2a3240', fontFamily: "'DM Mono', monospace" }}
            >
              <ChevronDown
                size={12}
                style={{ transform: showBetType ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
              />
              Bet type: <span style={{ color: '#5a6474' }}>{betType}</span>
            </button>
            {showBetType && (
              <div className="grid grid-cols-3 gap-1.5 mt-2">
                {BET_TYPES.map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setBetType(t)}
                    className="py-1.5 px-2 rounded-lg text-xs transition-all duration-150 cursor-pointer"
                    style={{
                      background: betType === t ? 'rgba(0,229,160,0.1)' : '#181c22',
                      border: `1px solid ${betType === t ? 'rgba(0,229,160,0.3)' : '#1e242c'}`,
                      color: betType === t ? '#00e5a0' : '#5a6474',
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Potential win preview */}
          {potentialWin !== null && potentialWin > 0 && (
            <div
              className="flex items-center justify-between px-4 py-2.5 rounded-xl mb-4"
              style={{ background: 'rgba(0,229,160,0.06)', border: '1px solid rgba(0,229,160,0.15)' }}
            >
              <span className="text-xs" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>Potential win</span>
              <span className="text-sm font-semibold" style={{ color: '#00e5a0', fontFamily: "'DM Mono', monospace" }}>
                +${potentialWin.toFixed(2)}
              </span>
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="text-xs mb-3" style={{ color: '#ff4757', fontFamily: "'DM Sans', sans-serif" }}>{error}</p>
          )}

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-3 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer"
            style={{ background: '#00e5a0', color: '#0a0c0f', fontFamily: "'DM Sans', sans-serif" }}
            onMouseEnter={e => { e.currentTarget.style.background = '#00f0aa'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,229,160,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#00e5a0'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            Log bet
          </button>

          <p className="text-center text-xs mt-3" style={{ color: '#2a3240', fontFamily: "'DM Mono', monospace" }}>
            Press Enter to submit · Esc to close
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main Dashboard ──
export default function Dashboard() {
  const [tab, setTab] = useState('overview');
  const [bets, setBets] = useState(MOCK_BETS);
  const [showModal, setShowModal] = useState(false);
  const [xp, setXp] = useState(145);

  // Derived stats
  const settled = bets.filter(b => b.status !== 'pending');
  const pending = bets.filter(b => b.status === 'pending');
  const wins = settled.filter(b => b.status === 'win');
  const losses = settled.filter(b => b.status === 'loss');
  const pushes = settled.filter(b => b.status === 'push');
  const totalPL = settled.reduce((a, b) => a + b.pl, 0);
  const totalStaked = settled.reduce((a, b) => a + b.stake, 0);
  const bankroll = STARTING_BANKROLL + totalPL - pending.reduce((a, b) => a + b.stake, 0);
  const roi = totalStaked > 0 ? (totalPL / totalStaked) * 100 : 0;
  const winRate = settled.length > 0 ? (wins.length / settled.length) * 100 : 0;

  // Streak
  let streak = 0;
  for (let i = 0; i < settled.length; i++) {
    if (i === 0) { streak = settled[i].status === 'win' ? 1 : -1; continue; }
    if (settled[i].status === 'win' && streak > 0) streak++;
    else if (settled[i].status === 'loss' && streak < 0) streak--;
    else break;
  }

  // XP / rank
  const rank = getRank(xp);
  const nextRank = getNextRank(xp);
  const xpInRank = xp - rank.min;
  const xpNeeded = nextRank.min - rank.min;
  const xpPct = rank.name === 'LEGEND' ? 100 : Math.min(100, (xpInRank / xpNeeded) * 100);

  const handleSettle = (id, result) => {
    setBets(prev => prev.map(b => {
      if (b.id !== id) return b;
      const pl = result === 'win'
        ? calcPotentialWin(b.odds, b.stake)
        : result === 'loss' ? -b.stake : 0;
      return { ...b, status: result, pl };
    }));
    setXp(x => x + (result === 'win' ? 25 : result === 'loss' ? 5 : 8));
  };

  const handleLogBet = (form) => {
    const newBet = {
      id: Date.now(),
      game: form.game,
      sport: form.sport,
      type: form.type,
      odds: form.odds,
      stake: form.stake,
      pick: form.pick || '',
      against: form.against || '',
      status: 'pending',
      pl: 0,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
    setBets(prev => [newBet, ...prev]);
    setXp(x => x + 10);
  };

  const TABS = [
    { id: 'overview', label: 'Overview' },
    { id: 'bets', label: `Bets${pending.length ? ` (${pending.length})` : ''}` },
    { id: 'stats', label: 'Stats' },
  ];

  return (
    <div className="min-h-screen pt-16" style={{ background: '#0a0c0f' }}>
      {showModal && (
        <LogBetModal
          onClose={() => setShowModal(false)}
          onSubmit={handleLogBet}
          bankroll={bankroll}
        />
      )}

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1
              className="text-2xl font-bold"
              style={{ color: '#e8ecf0', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}
            >
              Welcome back, <span style={{ color: '#00e5a0' }}>{MOCK_USER.name}</span>
            </h1>
            <p className="text-sm mt-0.5" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>
              {rank.name} · {xp} XP
              {rank.name !== 'LEGEND' && ` · ${xpNeeded - xpInRank} XP to ${nextRank.name}`}
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer"
            style={{ background: '#00e5a0', color: '#0a0c0f', fontFamily: "'DM Sans', sans-serif" }}
            onMouseEnter={e => { e.currentTarget.style.background = '#00f0aa'; e.currentTarget.style.boxShadow = '0 0 24px rgba(0,229,160,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#00e5a0'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <Plus size={16} />
            Log bet
          </button>
        </div>

        {/* XP bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>
              {rank.name}
            </span>
            {rank.name !== 'LEGEND' && (
              <span className="text-xs" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>
                {nextRank.name}
              </span>
            )}
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#1e242c' }}>
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

        {/* Tabs */}
        <div
          className="flex gap-1 mb-8 p-1 rounded-xl w-fit"
          style={{ background: '#111418', border: '1px solid #1e242c' }}
        >
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
              style={{
                background: tab === t.id ? '#181c22' : 'transparent',
                color: tab === t.id ? '#e8ecf0' : '#5a6474',
                fontFamily: "'DM Sans', sans-serif",
                border: tab === t.id ? '1px solid #1e242c' : '1px solid transparent',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ── */}
        {tab === 'overview' && (
          <div className="flex flex-col gap-6">

            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard
                label="Bankroll"
                value={fmt(bankroll)}
                sub={`${fmtSigned(totalPL)} all time`}
                color="#00e5a0"
                icon={<Wallet size={16} />}
              />
              <StatCard
                label="Win Rate"
                value={`${winRate.toFixed(0)}%`}
                sub={`${wins.length}W · ${losses.length}L · ${pushes.length}P`}
                color="#ff6b35"
                icon={<Crosshair size={16} />}
              />
              <StatCard
                label="Streak"
                value={streak === 0 ? '—' : streak > 0 ? `W${streak}` : `L${Math.abs(streak)}`}
                sub="current streak"
                color={streak > 0 ? '#00e5a0' : streak < 0 ? '#ff4757' : '#5a6474'}
                icon={<Zap size={16} />}
              />
              <StatCard
                label="ROI"
                value={`${roi.toFixed(1)}%`}
                sub={`${bets.length} total bets`}
                color={roi >= 0 ? '#4d9fff' : '#ff4757'}
                icon={<Activity size={16} />}
              />
            </div>

            {/* Bankroll chart + pending bets */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

              {/* Mini chart */}
              <div
                className="lg:col-span-2 p-5 rounded-2xl"
                style={{ background: '#111418', border: '1px solid #1e242c' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs font-medium tracking-widest uppercase"
                    style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}
                  >
                    Bankroll History
                  </span>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: totalPL >= 0 ? '#00e5a0' : '#ff4757', fontFamily: "'DM Mono', monospace" }}
                  >
                    {fmtSigned(totalPL)}
                  </span>
                </div>
                {/* Bar chart visual */}
                <div className="flex items-end gap-1.5 h-24">
                  {[...Array(20)].map((_, i) => {
                    const heights = [45, 50, 48, 55, 52, 60, 58, 65, 62, 70, 68, 72, 69, 75, 73, 78, 76, 82, 80, 88];
                    const isLast = i === 19;
                    return (
                      <div
                        key={i}
                        className="flex-1 rounded-sm transition-all duration-200"
                        style={{
                          height: `${heights[i]}%`,
                          background: isLast ? '#00e5a0' : `rgba(0,229,160,${0.08 + i * 0.025})`,
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Pending bets */}
              <div
                className="p-5 rounded-2xl flex flex-col"
                style={{ background: '#111418', border: '1px solid #1e242c' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs font-medium tracking-widest uppercase"
                    style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}
                  >
                    Pending
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.2)', color: '#f5c842', fontFamily: "'DM Mono', monospace" }}
                  >
                    {pending.length} open
                  </span>
                </div>
                {pending.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-xs text-center" style={{ color: '#2a3240', fontFamily: "'DM Sans', sans-serif" }}>
                      No pending bets
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 flex-1">
                    {pending.slice(0, 3).map(bet => (
                      <div
                        key={bet.id}
                        className="flex items-center justify-between py-2"
                        style={{ borderBottom: '1px solid #1e242c' }}
                      >
                        <div>
                          <p className="text-xs font-medium truncate max-w-[120px]" style={{ color: '#e8ecf0', fontFamily: "'DM Sans', sans-serif" }}>{bet.game}</p>
                          <p className="text-xs mt-0.5" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>{fmt(bet.stake)}</p>
                        </div>
                        <div className="flex gap-1">
                          <button onClick={() => handleSettle(bet.id, 'win')} className="px-2 py-1 rounded text-xs cursor-pointer" style={{ background: 'rgba(0,229,160,0.1)', color: '#00e5a0', fontFamily: "'DM Mono', monospace" }}>W</button>
                          <button onClick={() => handleSettle(bet.id, 'loss')} className="px-2 py-1 rounded text-xs cursor-pointer" style={{ background: 'rgba(255,71,87,0.1)', color: '#ff4757', fontFamily: "'DM Mono', monospace" }}>L</button>
                        </div>
                      </div>
                    ))}
                    {pending.length > 3 && (
                      <button onClick={() => setTab('bets')} className="text-xs mt-auto cursor-pointer" style={{ color: '#00e5a0', fontFamily: "'DM Mono', monospace" }}>
                        +{pending.length - 3} more →
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Achievements */}
            <div
              className="p-5 rounded-2xl"
              style={{ background: '#111418', border: '1px solid #1e242c' }}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-xs font-medium tracking-widest uppercase"
                  style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}
                >
                  Achievements
                </span>
                <span className="text-xs" style={{ color: '#f5c842', fontFamily: "'DM Mono', monospace" }}>
                  {ACHIEVEMENTS.filter(a => a.unlocked).length} / {ACHIEVEMENTS.length}
                </span>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {ACHIEVEMENTS.map(ach => (
                  <div
                    key={ach.id}
                    className="flex flex-col items-center gap-1.5 p-3 rounded-xl text-center transition-all duration-200"
                    style={{
                      background: ach.unlocked ? 'rgba(245,200,66,0.06)' : '#181c22',
                      border: `1px solid ${ach.unlocked ? 'rgba(245,200,66,0.2)' : '#1e242c'}`,
                    }}
                    title={ach.desc}
                  >
                    <AchievementIcon type={ach.icon} unlocked={ach.unlocked} />
                    <span
                      className="text-xs leading-tight"
                      style={{
                        color: ach.unlocked ? '#f5c842' : '#2a3240',
                        fontFamily: "'DM Mono', monospace",
                        fontSize: '10px',
                      }}
                    >
                      {ach.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── BETS TAB ── */}
        {tab === 'bets' && (
          <div className="flex flex-col gap-3">
            {/* Filter bar */}
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>
                {bets.length} bets total
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer"
                style={{ background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.2)', color: '#00e5a0', fontFamily: "'DM Mono', monospace" }}
              >
                <Plus size={13} />
                Log bet
              </button>
            </div>
            {bets.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-20 rounded-2xl"
                style={{ background: '#111418', border: '1px solid #1e242c' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: '#181c22', border: '1px solid #1e242c' }}>
                  <Layers size={18} style={{ color: '#2a3240' }} />
                </div>
                <p className="text-sm" style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}>No bets yet. Log your first one!</p>
              </div>
            ) : (
              bets.map(bet => (
                <BetRow key={bet.id} bet={bet} onSettle={handleSettle} />
              ))
            )}
          </div>
        )}

        {/* ── STATS TAB ── */}
        {tab === 'stats' && (
          <div className="flex flex-col gap-4">

            {/* Summary row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total bets', value: bets.length, color: '#e8ecf0' },
                { label: 'Total staked', value: fmt(totalStaked), color: '#e8ecf0' },
                { label: 'Total P&L', value: fmtSigned(totalPL), color: totalPL >= 0 ? '#00e5a0' : '#ff4757' },
                { label: 'ROI', value: `${roi.toFixed(1)}%`, color: roi >= 0 ? '#00e5a0' : '#ff4757' },
              ].map((s, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl"
                  style={{ background: '#111418', border: '1px solid #1e242c' }}
                >
                  <p className="text-xs mb-2" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</p>
                  <p className="text-xl font-bold" style={{ color: s.color, fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}>{s.value}</p>
                </div>
              ))}
            </div>

            {/* Win / Loss / Push bars */}
            <div
              className="p-6 rounded-2xl"
              style={{ background: '#111418', border: '1px solid #1e242c' }}
            >
              <p
                className="text-xs font-medium tracking-widest uppercase mb-5"
                style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}
              >
                Record Breakdown
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { label: 'Wins', count: wins.length, color: '#00e5a0' },
                  { label: 'Losses', count: losses.length, color: '#ff4757' },
                  { label: 'Pushes', count: pushes.length, color: '#f5c842' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-4">
                    <span className="w-14 text-xs" style={{ color: '#8a95a3', fontFamily: "'DM Mono', monospace" }}>{item.label}</span>
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: '#1e242c' }}>
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: settled.length > 0 ? `${(item.count / settled.length) * 100}%` : '0%',
                          background: item.color,
                        }}
                      />
                    </div>
                    <span className="w-6 text-xs text-right" style={{ color: '#8a95a3', fontFamily: "'DM Mono', monospace" }}>{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar */}
            <BankrollCalendar />

            {/* Pro analytics teaser */}
            <div
              className="p-6 rounded-2xl relative overflow-hidden"
              style={{ background: '#111418', border: '1px solid rgba(245,200,66,0.2)' }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, #f5c842, transparent)' }}
              />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium mb-3"
                    style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.2)', color: '#f5c842', fontFamily: "'DM Mono', monospace" }}
                  >
                    <Lock size={11} />
                    Pro Analytics
                  </div>
                  <h3
                    className="font-semibold text-base mb-1"
                    style={{ color: '#e8ecf0', fontFamily: "'Inter', sans-serif" }}
                  >
                    Unlock deeper insights
                  </h3>
                  <p
                    className="text-sm leading-relaxed max-w-md"
                    style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
                  >
                    See your performance broken down by sport, bet type, and odds range. Find exactly where you're sharp — and where you're not.
                  </p>
                </div>
                <button
                  className="flex-shrink-0 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer"
                  style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.25)', color: '#f5c842', fontFamily: "'DM Sans', sans-serif" }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,200,66,0.18)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(245,200,66,0.1)'}
                >
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}