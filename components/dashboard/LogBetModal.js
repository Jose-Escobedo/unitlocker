'use client';

import { useState, useEffect, useMemo } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { searchTeams } from '@/lib/sportsData';
import { americanToDecimal, decimalToAmerican, calcPotentialWin, getLastPrefs, saveLastPrefs } from '@/lib/betHelpers';
import { SPORTS_GRID, QUICK_STAKES, BET_TYPES } from '@/constants/dashboard';

export default function LogBetModal({ onClose, onSubmit, bankroll }) {
  const lastPrefs = getLastPrefs();

  const [sport, setSport]               = useState(lastPrefs.sport || 'NBA');
  const [betType, setBetType]           = useState(lastPrefs.betType || 'Moneyline');
  const [showBetType, setShowBetType]   = useState(false);
  const [oddsRaw, setOddsRaw]           = useState('');
  const [oddsFormat, setOddsFormat]     = useState('american');
  const [stakeRaw, setStakeRaw]         = useState(lastPrefs.stake ? String(lastPrefs.stake) : '');
  const [customStake, setCustomStake]   = useState(false);
  const [error, setError]               = useState('');

  // Pick / Against
  const [pickQuery, setPickQuery]           = useState('');
  const [pick, setPick]                     = useState('');
  const [showPickSugg, setShowPickSugg]     = useState(false);
  const [againstQuery, setAgainstQuery]     = useState('');
  const [against, setAgainst]               = useState('');
  const [showAgainstSugg, setShowAgainstSugg] = useState(false);

  const pickSuggestions    = useMemo(() => searchTeams(pickQuery, sport, 6), [pickQuery, sport]);
  const againstSuggestions = useMemo(() => searchTeams(againstQuery, sport, 6, pick), [againstQuery, sport, pick]);

  useEffect(() => { setAgainst(''); setAgainstQuery(''); }, [pick, sport]);
  useEffect(() => { setPick(''); setPickQuery(''); setAgainst(''); setAgainstQuery(''); }, [sport]);

  // Odds conversion
  const oddsAmerican = useMemo(() => {
    const val = parseFloat(oddsRaw);
    if (!val || isNaN(val)) return null;
    return oddsFormat === 'decimal' ? decimalToAmerican(val) : val;
  }, [oddsRaw, oddsFormat]);

  const stake = parseFloat(stakeRaw) || 0;
  const potentialWin = oddsAmerican && stake > 0
    ? stake * (americanToDecimal(oddsAmerican) - 1)
    : null;

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleSubmit = () => {
    if (!pick)    { setError('Select your pick.'); return; }
    if (!against) { setError('Select the opponent.'); return; }
    if (!oddsAmerican || isNaN(oddsAmerican)) { setError('Enter valid odds.'); return; }
    if (!stake || stake <= 0) { setError('Enter a valid stake.'); return; }
    if (stake > bankroll)     { setError('Stake exceeds available bankroll.'); return; }
    setError('');
    saveLastPrefs({ sport, betType, stake });
    onSubmit({
      game: `${pick} vs ${against}`,
      sport, type: betType,
      odds: oddsAmerican, stake,
      pick, against,
    });
    onClose();
  };

  const inputStyle = {
    background: '#181c22',
    border: '1px solid #1e242c',
    color: '#e8ecf0',
    fontFamily: "'DM Mono', monospace",
    outline: 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s',
  };
  const onFocus = (e) => { e.target.style.borderColor = 'rgba(0,229,160,0.4)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,229,160,0.07)'; };
  const onBlur  = (e) => { e.target.style.borderColor = '#1e242c'; e.target.style.boxShadow = 'none'; };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl relative overflow-hidden"
        style={{ background: '#111418', border: '1px solid #1e242c' }}
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

          {/* Sport grid */}
          <div className="mb-4">
            <label className="text-xs font-medium tracking-widest uppercase mb-1.5 block" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>Sport</label>
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

          {/* Pick / Against */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Pick */}
            <div className="relative">
              <label className="text-xs font-medium tracking-widest uppercase mb-1.5 block" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>Pick</label>
              <input
                type="text"
                placeholder="Your team"
                value={pick || pickQuery}
                onChange={e => { setPickQuery(e.target.value); setPick(''); setShowPickSugg(true); }}
                autoFocus
                autoComplete="off"
                className="w-full px-3 py-2.5 rounded-lg text-sm"
                style={{ ...inputStyle, fontFamily: "'DM Sans', sans-serif", borderColor: pick ? 'rgba(0,229,160,0.4)' : '#1e242c', color: pick ? '#00e5a0' : '#e8ecf0' }}
                onFocus={e => { onFocus(e); setShowPickSugg(true); }}
                onBlur={e => { onBlur(e); setTimeout(() => setShowPickSugg(false), 150); }}
              />
              {pick && (
                <button type="button" onClick={() => { setPick(''); setPickQuery(''); }} className="absolute right-2.5 top-9 cursor-pointer" style={{ color: '#5a6474' }}>
                  <X size={12} />
                </button>
              )}
              {showPickSugg && pickSuggestions.length > 0 && !pick && (
                <div className="absolute left-0 right-0 top-full mt-1 rounded-xl overflow-hidden z-20" style={{ background: '#181c22', border: '1px solid #1e242c', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
                  {pickSuggestions.map((s, i) => (
                    <button
                      key={i} type="button"
                      onMouseDown={() => { setPick(s); setPickQuery(''); setShowPickSugg(false); }}
                      className="w-full text-left px-3 py-2 text-xs transition-all duration-100 cursor-pointer"
                      style={{ color: '#a8b3bf', fontFamily: "'DM Sans', sans-serif", borderBottom: i < pickSuggestions.length - 1 ? '1px solid #1e242c' : 'none' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,229,160,0.07)'; e.currentTarget.style.color = '#e8ecf0'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#a8b3bf'; }}
                    >{s}</button>
                  ))}
                </div>
              )}
            </div>

            {/* Against */}
            <div className="relative">
              <label className="text-xs font-medium tracking-widest uppercase mb-1.5 block" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>Against</label>
              <input
                type="text"
                placeholder="Opponent"
                value={against || againstQuery}
                onChange={e => { setAgainstQuery(e.target.value); setAgainst(''); setShowAgainstSugg(true); }}
                autoComplete="off"
                disabled={!pick}
                className="w-full px-3 py-2.5 rounded-lg text-sm"
                style={{ ...inputStyle, fontFamily: "'DM Sans', sans-serif", borderColor: against ? 'rgba(0,229,160,0.4)' : '#1e242c', color: against ? '#00e5a0' : '#e8ecf0', opacity: !pick ? 0.4 : 1, cursor: !pick ? 'not-allowed' : 'text' }}
                onFocus={e => { onFocus(e); setShowAgainstSugg(true); }}
                onBlur={e => { onBlur(e); setTimeout(() => setShowAgainstSugg(false), 150); }}
              />
              {against && (
                <button type="button" onClick={() => { setAgainst(''); setAgainstQuery(''); }} className="absolute right-2.5 top-9 cursor-pointer" style={{ color: '#5a6474' }}>
                  <X size={12} />
                </button>
              )}
              {showAgainstSugg && againstSuggestions.length > 0 && !against && (
                <div className="absolute left-0 right-0 top-full mt-1 rounded-xl overflow-hidden z-20" style={{ background: '#181c22', border: '1px solid #1e242c', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
                  {againstSuggestions.map((s, i) => (
                    <button
                      key={i} type="button"
                      onMouseDown={() => { setAgainst(s); setAgainstQuery(''); setShowAgainstSugg(false); }}
                      className="w-full text-left px-3 py-2 text-xs transition-all duration-100 cursor-pointer"
                      style={{ color: '#a8b3bf', fontFamily: "'DM Sans', sans-serif", borderBottom: i < againstSuggestions.length - 1 ? '1px solid #1e242c' : 'none' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,229,160,0.07)'; e.currentTarget.style.color = '#e8ecf0'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#a8b3bf'; }}
                    >{s}</button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Matchup preview */}
          {pick && against && (
            <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg mb-4 text-xs" style={{ background: 'rgba(0,229,160,0.06)', border: '1px solid rgba(0,229,160,0.15)' }}>
              <span style={{ color: '#00e5a0', fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{pick}</span>
              <span style={{ color: '#2a3240', fontFamily: "'DM Mono', monospace" }}>vs</span>
              <span style={{ color: '#8a95a3', fontFamily: "'DM Sans', sans-serif" }}>{against}</span>
            </div>
          )}

          {/* Odds */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium tracking-widest uppercase" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>Odds</label>
              <div className="flex gap-0.5 p-0.5 rounded-lg" style={{ background: '#181c22', border: '1px solid #1e242c' }}>
                {['american', 'decimal'].map(f => (
                  <button key={f} type="button" onClick={() => { setOddsFormat(f); setOddsRaw(''); }}
                    className="px-2 py-0.5 rounded text-xs transition-all duration-150 cursor-pointer"
                    style={{ background: oddsFormat === f ? '#111418' : 'transparent', color: oddsFormat === f ? '#e8ecf0' : '#5a6474', fontFamily: "'DM Mono', monospace", border: oddsFormat === f ? '1px solid #1e242c' : '1px solid transparent' }}>
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
              onFocus={onFocus} onBlur={onBlur}
            />
            {oddsAmerican && oddsRaw && (
              <p className="text-xs mt-1" style={{ color: '#2a3240', fontFamily: "'DM Mono', monospace" }}>
                {oddsFormat === 'decimal' ? `American: ${oddsAmerican > 0 ? '+' : ''}${oddsAmerican}` : `Decimal: ${americanToDecimal(oddsAmerican).toFixed(3)}`}
              </p>
            )}
          </div>

          {/* Stake */}
          <div className="mb-4">
            <label className="text-xs font-medium tracking-widest uppercase mb-1.5 block" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>Stake</label>
            <div className="grid grid-cols-4 gap-1.5 mb-2">
              {QUICK_STAKES.map(s => (
                <button key={s} type="button" onClick={() => { setStakeRaw(String(s)); setCustomStake(false); }}
                  className="py-2 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer"
                  style={{ background: !customStake && stakeRaw === String(s) ? 'rgba(0,229,160,0.12)' : '#181c22', border: `1px solid ${!customStake && stakeRaw === String(s) ? 'rgba(0,229,160,0.35)' : '#1e242c'}`, color: !customStake && stakeRaw === String(s) ? '#00e5a0' : '#8a95a3', fontFamily: "'DM Mono', monospace" }}>
                  ${s}
                </button>
              ))}
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>$</span>
              <input
                type="number" placeholder="Custom amount"
                value={customStake ? stakeRaw : ''}
                onChange={e => { setStakeRaw(e.target.value); setCustomStake(true); }}
                onFocus={e => { setCustomStake(true); onFocus(e); }} onBlur={onBlur}
                className="w-full pl-7 pr-4 py-2.5 rounded-lg text-sm"
                style={inputStyle} min="1"
              />
            </div>
          </div>

          {/* Bet type */}
          <div className="mb-4">
            <button type="button" onClick={() => setShowBetType(!showBetType)}
              className="flex items-center gap-1.5 text-xs cursor-pointer transition-colors duration-150"
              style={{ color: showBetType ? '#00e5a0' : '#2a3240', fontFamily: "'DM Mono', monospace" }}>
              <ChevronDown size={12} style={{ transform: showBetType ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
              Bet type: <span style={{ color: '#5a6474' }}>{betType}</span>
            </button>
            {showBetType && (
              <div className="grid grid-cols-3 gap-1.5 mt-2">
                {BET_TYPES.map(t => (
                  <button key={t} type="button" onClick={() => setBetType(t)}
                    className="py-1.5 px-2 rounded-lg text-xs transition-all duration-150 cursor-pointer"
                    style={{ background: betType === t ? 'rgba(0,229,160,0.1)' : '#181c22', border: `1px solid ${betType === t ? 'rgba(0,229,160,0.3)' : '#1e242c'}`, color: betType === t ? '#00e5a0' : '#5a6474', fontFamily: "'DM Mono', monospace" }}>
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Potential win */}
          {potentialWin !== null && potentialWin > 0 && (
            <div className="flex items-center justify-between px-4 py-2.5 rounded-xl mb-4" style={{ background: 'rgba(0,229,160,0.06)', border: '1px solid rgba(0,229,160,0.15)' }}>
              <span className="text-xs" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>Potential win</span>
              <span className="text-sm font-semibold" style={{ color: '#00e5a0', fontFamily: "'DM Mono', monospace" }}>+${potentialWin.toFixed(2)}</span>
            </div>
          )}

          {error && <p className="text-xs mb-3" style={{ color: '#ff4757', fontFamily: "'DM Sans', sans-serif" }}>{error}</p>}

          <button
            type="button" onClick={handleSubmit}
            className="w-full py-3 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer"
            style={{ background: '#00e5a0', color: '#0a0c0f', fontFamily: "'DM Sans', sans-serif" }}
            onMouseEnter={e => { e.currentTarget.style.background = '#00f0aa'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,229,160,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#00e5a0'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            Log bet
          </button>
          <p className="text-center text-xs mt-3" style={{ color: '#2a3240', fontFamily: "'DM Mono', monospace" }}>
            Enter to submit · Esc to close
          </p>
        </div>
      </div>
    </div>
  );
}