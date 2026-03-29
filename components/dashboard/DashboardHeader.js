'use client';

import { Plus } from 'lucide-react';

export default function DashboardHeader({ user, rank, nextRank, xp, xpPct, onLogBet }) {
  const xpInRank = xp - rank.min;
  const xpNeeded = nextRank.min - rank.min;

  return (
    <div className="mb-8">
      {/* Top row */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: '#e8ecf0', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}
          >
            Welcome back,{' '}
            <span style={{ color: '#00e5a0' }}>{user?.name || 'Bettor'}</span>
          </h1>
          <p className="text-sm mt-0.5" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>
            {rank.name} · {xp} XP
            {rank.name !== 'LEGEND' && ` · ${xpNeeded - xpInRank} XP to ${nextRank.name}`}
          </p>
        </div>
        <button
          onClick={onLogBet}
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
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>{rank.name}</span>
          {rank.name !== 'LEGEND' && (
            <span className="text-xs" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>{nextRank.name}</span>
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
    </div>
  );
}