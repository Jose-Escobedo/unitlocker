'use client';

import { CheckCircle2, XCircle, MinusCircle, Clock } from 'lucide-react';
import { fmt, fmtSigned, calcPotentialWin } from '@/lib/betHelpers';

const STATUS_COLOR = {
  win:     '#00e5a0',
  loss:    '#ff4757',
  push:    '#f5c842',
  pending: '#5a6474',
};

const STATUS_ICON = {
  win:     <CheckCircle2 size={13} />,
  loss:    <XCircle size={13} />,
  push:    <MinusCircle size={13} />,
  pending: <Clock size={13} />,
};

export default function BetRow({ bet, onSettle }) {
  const color = STATUS_COLOR[bet.status];

  return (
    <div
      className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200"
      style={{
        background: '#111418',
        border: '1px solid #1e242c',
        borderLeft: `3px solid ${color}`,
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
          className="flex items-center gap-2 mt-0.5 flex-wrap"
          style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#5a6474' }}
        >
          <span>{bet.sport}</span>
          <span>{bet.type}</span>
          {bet.pick && (
            <span
              className="px-1.5 py-0.5 rounded"
              style={{
                background: 'rgba(0,229,160,0.08)',
                color: '#00e5a0',
                border: '1px solid rgba(0,229,160,0.2)',
              }}
            >
              {bet.pick}
            </span>
          )}
          <span>{bet.odds > 0 ? '+' : ''}{bet.odds}</span>
          <span>{bet.date}</span>
        </div>
      </div>

      {/* Settle buttons */}
      {bet.status === 'pending' && (
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {[
            { label: 'W', result: 'win',  bg: 'rgba(0,229,160,0.1)',  border: 'rgba(0,229,160,0.25)',  color: '#00e5a0' },
            { label: 'L', result: 'loss', bg: 'rgba(255,71,87,0.1)',  border: 'rgba(255,71,87,0.25)',  color: '#ff4757' },
            { label: 'P', result: 'push', bg: 'rgba(245,200,66,0.1)', border: 'rgba(245,200,66,0.25)', color: '#f5c842' },
          ].map(btn => (
            <button
              key={btn.result}
              onClick={() => onSettle(bet.id, btn.result)}
              className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer"
              style={{ background: btn.bg, border: `1px solid ${btn.border}`, color: btn.color, fontFamily: "'DM Mono', monospace" }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      )}

      {/* Stake + P&L */}
      <div className="text-right flex-shrink-0">
        <div className="font-semibold text-sm" style={{ color: '#e8ecf0', fontFamily: "'Inter', sans-serif" }}>
          {fmt(bet.stake)}
        </div>
        <div
          className="text-xs mt-0.5 flex items-center justify-end gap-1"
          style={{ color, fontFamily: "'DM Mono', monospace" }}
        >
          {STATUS_ICON[bet.status]}
          {bet.status === 'pending'
            ? `to win ${fmt(calcPotentialWin(bet.odds, bet.stake))}`
            : fmtSigned(bet.pl)}
        </div>
      </div>
    </div>
  );
}