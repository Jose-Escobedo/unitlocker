'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import LogBetModal      from '@/components/dashboard/LogBetModal';
import DashboardHeader  from '@/components/dashboard/DashboardHeader';
import OverviewTab      from '@/components/dashboard/OverviewTab';
import BetsTab          from '@/components/dashboard/BetsTab';
import StatsTab         from '@/components/dashboard/StatsTab';
import { calcPotentialWin, calcStreak, getRank, getNextRank } from '@/lib/betHelpers';
import { RANKS, MOCK_BETS, STARTING_BANKROLL } from '@/constants/dashboard';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'bets',     label: 'Bets' },
  { id: 'stats',    label: 'Stats' },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [tab, setTab]           = useState('overview');
  const [bets, setBets]         = useState(MOCK_BETS);
  const [showModal, setShowModal] = useState(false);
  const [xp, setXp]             = useState(145);

  // ── Derived stats ──
  const settled     = bets.filter(b => b.status !== 'pending');
  const pending     = bets.filter(b => b.status === 'pending');
  const wins        = settled.filter(b => b.status === 'win');
  const losses      = settled.filter(b => b.status === 'loss');
  const pushes      = settled.filter(b => b.status === 'push');
  const totalPL     = settled.reduce((a, b) => a + b.pl, 0);
  const totalStaked = settled.reduce((a, b) => a + b.stake, 0);
  const bankroll    = STARTING_BANKROLL + totalPL - pending.reduce((a, b) => a + b.stake, 0);
  const roi         = totalStaked > 0 ? (totalPL / totalStaked) * 100 : 0;
  const winRate     = settled.length > 0 ? (wins.length / settled.length) * 100 : 0;
  const streak      = calcStreak(settled);

  // ── XP / rank ──
  const rank     = getRank(xp, RANKS);
  const nextRank = getNextRank(xp, RANKS);
  const xpInRank = xp - rank.min;
  const xpNeeded = nextRank.min - rank.min;
  const xpPct    = rank.name === 'LEGEND' ? 100 : Math.min(100, (xpInRank / xpNeeded) * 100);

  // ── Handlers ──
  const handleSettle = (id, result) => {
    setBets(prev => prev.map(b => {
      if (b.id !== id) return b;
      const pl = result === 'win' ? calcPotentialWin(b.odds, b.stake) : result === 'loss' ? -b.stake : 0;
      return { ...b, status: result, pl };
    }));
    setXp(x => x + (result === 'win' ? 25 : result === 'loss' ? 5 : 8));
  };

  const handleLogBet = (form) => {
    setBets(prev => [{
      id: Date.now(),
      game:    form.game,
      sport:   form.sport,
      type:    form.type,
      odds:    form.odds,
      stake:   form.stake,
      pick:    form.pick    || '',
      against: form.against || '',
      status:  'pending',
      pl:      0,
      date:    new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    }, ...prev]);
    setXp(x => x + 10);
  };

  const tabLabel = (t) => t.id === 'bets' && pending.length
    ? `Bets (${pending.length})`
    : t.label;

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

        <DashboardHeader
          user={user}
          rank={rank}
          nextRank={nextRank}
          xp={xp}
          xpPct={xpPct}
          onLogBet={() => setShowModal(true)}
        />

        {/* Tab bar */}
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
                color:      tab === t.id ? '#e8ecf0' : '#5a6474',
                fontFamily: "'DM Sans', sans-serif",
                border:     tab === t.id ? '1px solid #1e242c' : '1px solid transparent',
              }}
            >
              {tabLabel(t)}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === 'overview' && (
          <OverviewTab
            bankroll={bankroll}
            totalPL={totalPL}
            winRate={winRate}
            wins={wins.length}
            losses={losses.length}
            pushes={pushes.length}
            streak={streak}
            roi={roi}
            bets={bets.length}
            pending={pending}
            onSettle={handleSettle}
            onTabChange={setTab}
          />
        )}

        {tab === 'bets' && (
          <BetsTab
            bets={bets}
            onSettle={handleSettle}
            onLogBet={() => setShowModal(true)}
          />
        )}

        {tab === 'stats' && (
          <StatsTab
            bets={bets}
            settled={settled}
            wins={wins}
            losses={losses}
            pushes={pushes}
            totalPL={totalPL}
            totalStaked={totalStaked}
            roi={roi}
          />
        )}
      </div>
    </div>
  );
}