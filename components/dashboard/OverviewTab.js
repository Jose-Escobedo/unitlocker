'use client';

import { Wallet, Zap, Activity } from 'lucide-react';
import { Crosshair } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import AchievementIcon from '@/components/dashboard/AchievementIcon';
import { fmt, fmtSigned } from '@/lib/betHelpers';
import { ACHIEVEMENTS } from '@/constants/dashboard';

export default function OverviewTab({ bankroll, totalPL, winRate, wins, losses, pushes, streak, roi, bets, pending, onSettle, onTabChange }) {
  return (
    <div className="flex flex-col gap-6">

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Bankroll"  value={fmt(bankroll)}             sub={`${fmtSigned(totalPL)} all time`}              color="#00e5a0" icon={<Wallet size={16} />} />
        <StatCard label="Win Rate"  value={`${winRate.toFixed(0)}%`}  sub={`${wins}W · ${losses}L · ${pushes}P`}         color="#ff6b35" icon={<Crosshair size={16} />} />
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
          sub={`${bets} total bets`}
          color={roi >= 0 ? '#4d9fff' : '#ff4757'}
          icon={<Activity size={16} />}
        />
      </div>

      {/* Bankroll chart + pending */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Mini chart */}
        <div className="lg:col-span-2 p-5 rounded-2xl" style={{ background: '#111418', border: '1px solid #1e242c' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>Bankroll History</span>
            <span className="text-xs font-semibold" style={{ color: totalPL >= 0 ? '#00e5a0' : '#ff4757', fontFamily: "'DM Mono', monospace" }}>{fmtSigned(totalPL)}</span>
          </div>
          <div className="flex items-end gap-1.5 h-24">
            {[...Array(20)].map((_, i) => {
              const heights = [45,50,48,55,52,60,58,65,62,70,68,72,69,75,73,78,76,82,80,88];
              return (
                <div key={i} className="flex-1 rounded-sm" style={{ height: `${heights[i]}%`, background: i === 19 ? '#00e5a0' : `rgba(0,229,160,${0.08 + i * 0.025})` }} />
              );
            })}
          </div>
        </div>

        {/* Pending */}
        <div className="p-5 rounded-2xl flex flex-col" style={{ background: '#111418', border: '1px solid #1e242c' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>Pending</span>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.2)', color: '#f5c842', fontFamily: "'DM Mono', monospace" }}>
              {pending.length} open
            </span>
          </div>
          {pending.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-xs text-center" style={{ color: '#2a3240', fontFamily: "'DM Sans', sans-serif" }}>No pending bets</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2 flex-1">
              {pending.slice(0, 3).map(bet => (
                <div key={bet.id} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid #1e242c' }}>
                  <div>
                    <p className="text-xs font-medium truncate max-w-[120px]" style={{ color: '#e8ecf0', fontFamily: "'DM Sans', sans-serif" }}>{bet.game}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>{fmt(bet.stake)}</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => onSettle(bet.id, 'win')}  className="px-2 py-1 rounded text-xs cursor-pointer" style={{ background: 'rgba(0,229,160,0.1)',  color: '#00e5a0', fontFamily: "'DM Mono', monospace" }}>W</button>
                    <button onClick={() => onSettle(bet.id, 'loss')} className="px-2 py-1 rounded text-xs cursor-pointer" style={{ background: 'rgba(255,71,87,0.1)',  color: '#ff4757', fontFamily: "'DM Mono', monospace" }}>L</button>
                  </div>
                </div>
              ))}
              {pending.length > 3 && (
                <button onClick={() => onTabChange('bets')} className="text-xs mt-auto cursor-pointer" style={{ color: '#00e5a0', fontFamily: "'DM Mono', monospace" }}>
                  +{pending.length - 3} more →
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Achievements */}
      <div className="p-5 rounded-2xl" style={{ background: '#111418', border: '1px solid #1e242c' }}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>Achievements</span>
          <span className="text-xs" style={{ color: '#f5c842', fontFamily: "'DM Mono', monospace" }}>
            {ACHIEVEMENTS.filter(a => a.unlocked).length} / {ACHIEVEMENTS.length}
          </span>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {ACHIEVEMENTS.map(ach => (
            <div
              key={ach.id}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl text-center transition-all duration-200"
              style={{ background: ach.unlocked ? 'rgba(245,200,66,0.06)' : '#181c22', border: `1px solid ${ach.unlocked ? 'rgba(245,200,66,0.2)' : '#1e242c'}` }}
              title={ach.desc}
            >
              <AchievementIcon type={ach.icon} unlocked={ach.unlocked} />
              <span style={{ color: ach.unlocked ? '#f5c842' : '#2a3240', fontFamily: "'DM Mono', monospace", fontSize: '10px' }}>
                {ach.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}