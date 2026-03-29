'use client';

import { Plus, Layers } from 'lucide-react';
import BetRow from '@/components/dashboard/BetRow';

export default function BetsTab({ bets, onSettle, onLogBet }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>
          {bets.length} bets total
        </p>
        <button
          onClick={onLogBet}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer"
          style={{ background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.2)', color: '#00e5a0', fontFamily: "'DM Mono', monospace" }}
        >
          <Plus size={13} />
          Log bet
        </button>
      </div>

      {bets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-2xl" style={{ background: '#111418', border: '1px solid #1e242c' }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: '#181c22', border: '1px solid #1e242c' }}>
            <Layers size={18} style={{ color: '#2a3240' }} />
          </div>
          <p className="text-sm" style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}>
            No bets yet. Log your first one!
          </p>
        </div>
      ) : (
        bets.map(bet => (
          <BetRow key={bet.id} bet={bet} onSettle={onSettle} />
        ))
      )}
    </div>
  );
}