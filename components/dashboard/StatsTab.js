'use client';

import { Lock } from 'lucide-react';
import BankrollCalendar from '@/components/BankrollCalendar';
import { fmt, fmtSigned } from '@/lib/betHelpers';

export default function StatsTab({ bets, settled, wins, losses, pushes, totalPL, totalStaked, roi }) {
  return (
    <div className="flex flex-col gap-4">

      {/* Summary row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total bets',   value: bets.length,           color: '#e8ecf0' },
          { label: 'Total staked', value: fmt(totalStaked),       color: '#e8ecf0' },
          { label: 'Total P&L',    value: fmtSigned(totalPL),    color: totalPL >= 0 ? '#00e5a0' : '#ff4757' },
          { label: 'ROI',          value: `${roi.toFixed(1)}%`,  color: roi >= 0 ? '#00e5a0' : '#ff4757' },
        ].map((s, i) => (
          <div key={i} className="p-5 rounded-2xl" style={{ background: '#111418', border: '1px solid #1e242c' }}>
            <p className="text-xs mb-2" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</p>
            <p className="text-xl font-bold" style={{ color: s.color, fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Record breakdown */}
      <div className="p-6 rounded-2xl" style={{ background: '#111418', border: '1px solid #1e242c' }}>
        <p className="text-xs font-medium tracking-widest uppercase mb-5" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>
          Record Breakdown
        </p>
        <div className="flex flex-col gap-4">
          {[
            { label: 'Wins',   count: wins.length,   color: '#00e5a0' },
            { label: 'Losses', count: losses.length, color: '#ff4757' },
            { label: 'Pushes', count: pushes.length, color: '#f5c842' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-4">
              <span className="w-14 text-xs" style={{ color: '#8a95a3', fontFamily: "'DM Mono', monospace" }}>{item.label}</span>
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: '#1e242c' }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: settled.length > 0 ? `${(item.count / settled.length) * 100}%` : '0%', background: item.color }}
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
      <div className="p-6 rounded-2xl relative overflow-hidden" style={{ background: '#111418', border: '1px solid rgba(245,200,66,0.2)' }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #f5c842, transparent)' }} />
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium mb-3" style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.2)', color: '#f5c842', fontFamily: "'DM Mono', monospace" }}>
              <Lock size={11} />
              Pro Analytics
            </div>
            <h3 className="font-semibold text-base mb-1" style={{ color: '#e8ecf0', fontFamily: "'Inter', sans-serif" }}>
              Unlock deeper insights
            </h3>
            <p className="text-sm leading-relaxed max-w-md" style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}>
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
  );
}