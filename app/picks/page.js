'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import PickCard from '@/components/picks/PickCard';
import Link from 'next/link';
import { Target, Flame, RefreshCw } from 'lucide-react';

const SPORTS = ['All', 'CS2', 'NBA', 'NHL', 'MLB'];

const SPORT_COLORS = {
  CS2: '#ff6b35',
  NBA: '#00e5a0',
  NHL: '#4da6ff',
  MLB: '#f5c842',
};

// ── Skeleton card ──
function SkeletonCard() {
  return (
    <div
      className="rounded-2xl p-5 animate-pulse"
      style={{ background: '#202228', border: '1px solid #2a2f3a', height: '240px' }}
    />
  );
}

// ── Lock screen shown to logged-out users ──
function LockScreen() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ background: '#0a0c0f' }}
    >
      <div
        className="mb-4 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
        style={{ background: '#ff6b3518', border: '1px solid #ff6b3533' }}
      >
        🔒
      </div>
      <h1
        className="text-2xl font-black mb-2"
        style={{ color: '#f0f2f5', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.03em' }}
      >
        Hot Picks Feed
      </h1>
      <p
        className="text-sm mb-6 max-w-xs"
        style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}
      >
        Sign in to access the daily CS2, NBA, NHL &amp; MLB prop picks feed.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
        {/* ✅ Fixed: was /signup, correct route is /get-started */}
        <Link
          href="/get-started"
          className="flex-1 text-center py-3 rounded-xl font-bold text-sm tracking-wide"
          style={{
            background: '#ff6b35',
            color: '#0a0c0f',
            fontFamily: "'Inter', sans-serif",
            boxShadow: '0 4px 20px #ff6b3544',
          }}
        >
          Get Access
        </Link>
        <Link
          href="/login"
          className="flex-1 text-center py-3 rounded-xl font-bold text-sm tracking-wide"
          style={{
            background: '#202228',
            color: '#f0f2f5',
            border: '1px solid #2a2f3a',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Log In
        </Link>
      </div>
    </div>
  );
}

// ── Result badge for settled picks ──
function ResultBadge({ result }) {
  const config = {
    won:  { label: 'WIN',  bg: 'rgba(0,229,160,0.12)',  border: 'rgba(0,229,160,0.3)',  color: '#00e5a0' },
    lost: { label: 'LOSS', bg: 'rgba(255,71,87,0.1)',   border: 'rgba(255,71,87,0.3)',  color: '#ff4757' },
    push: { label: 'PUSH', bg: 'rgba(245,200,66,0.1)',  border: 'rgba(245,200,66,0.3)', color: '#f5c842' },
  };
  const c = config[result];
  if (!c) return null;
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold tracking-widest"
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        color: c.color,
        fontFamily: "'DM Mono', monospace",
      }}
    >
      {c.label}
    </span>
  );
}

// ── Recent Results row (settled picks) ──
function RecentResults({ results }) {
  if (!results || results.length === 0) return null;
  return (
    <div className="mb-6">
      <div
        className="flex items-center gap-2 mb-3 text-xs font-bold tracking-widest uppercase"
        style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}
      >
        Recent Results
      </div>
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: '#111418', border: '1px solid #1e242c' }}
      >
        {results.map((pick, i) => (
          <div
            key={pick._id}
            className="flex items-center justify-between px-4 py-3"
            style={{
              borderBottom: i < results.length - 1 ? '1px solid #1e242c' : 'none',
            }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span
                className="text-xs font-bold flex-shrink-0"
                style={{
                  color: SPORT_COLORS[pick.sport] ?? '#ff6b35',
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {pick.sport}
              </span>
              <span
                className="text-sm font-semibold truncate"
                style={{ color: '#a8b3bf', fontFamily: "'DM Sans', sans-serif" }}
              >
                {pick.playerName}
              </span>
              <span
                className="text-xs truncate hidden sm:block"
                style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}
              >
                {pick.prediction} {pick.line} {pick.stat}
              </span>
            </div>
            <ResultBadge result={pick.status} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Fade-in wrapper ──
function FadeIn({ children, delay = 0 }) {
  return (
    <div
      style={{
        animation: `fadeUp 0.3s ease forwards`,
        animationDelay: `${delay}ms`,
        opacity: 0,
      }}
    >
      {children}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ── Main page ──
export default function PicksPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [picks, setPicks] = useState([]);
  const [recentResults, setRecentResults] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [activeSport, setActiveSport] = useState('All');
  const [error, setError] = useState(null);

  // Cache per sport so switching tabs doesn't re-fetch
  const cache = useRef({});

  const loadPicks = async (sport, force = false) => {
    const key = sport || 'All';

    if (!force && cache.current[key]) {
      setPicks(cache.current[key]);
      return;
    }

    setFetching(true);
    setError(null);

    try {
      const sportParam = sport === 'All' ? '' : sport;
      const [pendingRes, settledRes] = await Promise.all([
        fetch(`/api/picks?status=pending${sportParam ? `&sport=${sportParam}` : ''}&limit=20`),
        fetch(`/api/picks?status=won&limit=5`),
      ]);

      if (!pendingRes.ok) throw new Error('Failed to load picks');

      const pendingData = await pendingRes.json();
      const settledData = settledRes.ok ? await settledRes.json() : { picks: [] };

      // Also fetch lost picks and merge + sort by date
      const lostRes = await fetch(`/api/picks?status=lost&limit=5`);
      const lostData = lostRes.ok ? await lostRes.json() : { picks: [] };
      const pushRes = await fetch(`/api/picks?status=push&limit=5`);
      const pushData = pushRes.ok ? await pushRes.json() : { picks: [] };

      const allSettled = [
        ...(settledData.picks || []),
        ...(lostData.picks || []),
        ...(pushData.picks || []),
      ].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 5);

      cache.current[key] = pendingData.picks || [];
      setPicks(pendingData.picks || []);
      if (sport === 'All' || !sport) setRecentResults(allSettled);
    } catch (e) {
      setError(e.message);
    } finally {
      setFetching(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    loadPicks(activeSport);
  }, [user, activeSport]);

  const handleRefresh = () => {
    setRefreshing(true);
    // Bust cache for current sport
    delete cache.current[activeSport || 'All'];
    loadPicks(activeSport, true);
  };

  // ── Count picks per sport for tab badges ──
  const sportCounts = SPORTS.reduce((acc, s) => {
    if (s === 'All') {
      acc[s] = picks.length;
    } else {
      acc[s] = picks.filter(p => p.sport === s).length;
    }
    return acc;
  }, {});

  if (authLoading) {
    return (
      <main className="min-h-screen p-4 max-w-2xl mx-auto" style={{ background: '#0a0c0f' }}>
        <div className="grid gap-4 mt-8">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </main>
    );
  }

  if (!user) return <LockScreen />;

  const hotPicks = picks.filter(p => p.isHot);
  const regularPicks = picks.filter(p => !p.isHot);

  return (
    <main className="min-h-screen pt-16 pb-20" style={{ background: '#0a0c0f' }}>

      {/* ── Sticky header ── */}
      <div
      className="sticky top-16 z-20 px-4 pt-4 pb-3"
        style={{
          background: '#0a0c0fee',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #1e242c',
        }}
      >
        <div className="max-w-2xl mx-auto">

          {/* Title row */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2">
                <h1
                  className="text-xl font-black leading-none"
                  style={{ color: '#f0f2f5', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.03em' }}
                >
                  Hot Picks
                </h1>
                {/* ✅ Pick count badge */}
                {!fetching && picks.length > 0 && (
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: 'rgba(255,107,53,0.12)',
                      color: '#ff6b35',
                      border: '1px solid rgba(255,107,53,0.2)',
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {picks.length}
                  </span>
                )}
              </div>
              <p
                className="text-xs mt-0.5"
                style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}
              >
                {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* ✅ Refresh button */}
              <button
                onClick={handleRefresh}
                disabled={fetching || refreshing}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{
                  background: '#181c22',
                  border: '1px solid #2a2f3a',
                  color: refreshing ? '#ff6b35' : '#5a6474',
                }}
                title="Refresh picks"
              >
                <RefreshCw
                  size={14}
                  style={{
                    animation: refreshing ? 'spin 0.8s linear infinite' : 'none',
                  }}
                />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </button>
            </div>
          </div>

          {/* ✅ Sport filter tabs with counts */}
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
            {SPORTS.map(s => {
              const active = s === activeSport;
              const color = s === 'All' ? '#f0f2f5' : SPORT_COLORS[s];
              const count = sportCounts[s] ?? 0;
              // Dim tabs with no picks (except All and active tab)
              const isEmpty = s !== 'All' && count === 0 && !fetching;
              return (
                <button
                  key={s}
                  onClick={() => setActiveSport(s)}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider transition-all duration-150"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    background: active ? (s === 'All' ? '#1e242c' : `${color}22`) : 'transparent',
                    color: active ? color : isEmpty ? '#2a3240' : '#5a6474',
                    border: active ? `1px solid ${color}44` : '1px solid transparent',
                    opacity: isEmpty && !active ? 0.5 : 1,
                  }}
                >
                  {s}
                  {/* Count pill — only show when > 0 */}
                  {!fetching && count > 0 && (
                    <span
                      className="text-xs rounded-full px-1.5 leading-none py-0.5"
                      style={{
                        background: active ? `${color}33` : '#1e242c',
                        color: active ? color : '#5a6474',
                        fontFamily: "'DM Mono', monospace",
                        fontSize: '10px',
                      }}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-2xl mx-auto px-4 pt-5">

        {fetching && (
          <div className="grid gap-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {!fetching && error && (
          <p
            className="text-center text-sm py-8"
            style={{ color: '#ff4757', fontFamily: "'DM Mono', monospace" }}
          >
            {error}
          </p>
        )}

        {!fetching && !error && picks.length === 0 && (
          <div className="text-center py-16">
            <div className="flex justify-center mb-4">
              <div
                className="w-12 h-12 flex items-center justify-center rounded-xl"
                style={{ background: '#181c22', border: '1px solid #2a2f3a' }}
              >
                <Target size={20} color="#5a6474" />
              </div>
            </div>
            <p
              className="text-sm mb-1"
              style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}
            >
              No picks posted yet
              {activeSport !== 'All' ? ` for ${activeSport}` : ' for today'}.
            </p>
            <p
              className="text-xs"
              style={{ color: '#2a3240', fontFamily: "'DM Mono', monospace" }}
            >
              Check back soon — picks drop throughout the day.
            </p>
          </div>
        )}

        {!fetching && !error && picks.length > 0 && (
          <>
            {/* ✅ Fire Picks — uses Flame icon instead of emoji */}
            {hotPicks.length > 0 && (
              <section className="mb-6">
                <div
                  className="flex items-center gap-2 mb-3 text-xs font-bold tracking-widest uppercase"
                  style={{ color: '#ff6b35', fontFamily: "'DM Mono', monospace" }}
                >
                  <Flame size={13} />
                  Fire Picks
                </div>
                <div className="grid gap-4">
                  {hotPicks.map((pick, i) => (
                    <FadeIn key={pick._id} delay={i * 60}>
                      <PickCard pick={pick} />
                    </FadeIn>
                  ))}
                </div>
              </section>
            )}

            {/* Regular picks */}
            {regularPicks.length > 0 && (
              <section>
                {hotPicks.length > 0 && (
                  <div
                    className="flex items-center gap-2 mb-3 text-xs font-bold tracking-widest uppercase"
                    style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}
                  >
                    All Picks
                  </div>
                )}
                <div className="grid gap-4">
                  {regularPicks.map((pick, i) => (
                    <FadeIn key={pick._id} delay={(hotPicks.length + i) * 60}>
                      <PickCard pick={pick} />
                    </FadeIn>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* ✅ Recent Results section — only on All tab */}
        {!fetching && activeSport === 'All' && (
          <div className="mt-8">
            <RecentResults results={recentResults} />
          </div>
        )}
      </div>
    </main>
  );
}