'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import PickCard from '@/components/picks/PickCard';
import Link from 'next/link';
import { Target } from 'lucide-react';

const SPORTS = ['All', 'CS2', 'NBA', 'NHL', 'MLB'];

const SPORT_COLORS = {
  CS2: '#ff6b35',
  NBA: '#00e5a0',
  NHL: '#4da6ff',
  MLB: '#f5c842',
};

function SkeletonCard() {
  return (
    <div
      className="rounded-2xl p-5 animate-pulse"
      style={{ background: '#202228', border: '1px solid #2a2f3a', height: '240px' }}
    />
  );
}

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
        <Link
          href="/signup"
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

export default function PicksPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [picks, setPicks] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [activeSport, setActiveSport] = useState('All');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    async function loadPicks() {
      setFetching(true);
      setError(null);
      try {
        const sport = activeSport === 'All' ? '' : activeSport;
        const res = await fetch(`/api/picks?status=pending${sport ? `&sport=${sport}` : ''}&limit=20`);
        if (!res.ok) throw new Error('Failed to load picks');
        const data = await res.json();
        setPicks(data.picks || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setFetching(false);
      }
    }

    loadPicks();
  }, [user, activeSport]);

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

  if (!user) {
    return <LockScreen />;
  }

  const hotPicks = picks.filter((p) => p.isHot);
  const regularPicks = picks.filter((p) => !p.isHot);

  return (
    <main className="min-h-screen pt-16 pb-20" style={{ background: '#0a0c0f' }}>
      {/* page header */}
      <div
        className="sticky top-0 z-20 px-4 pt-4 pb-3"
        style={{ background: '#0a0c0fee', backdropFilter: 'blur(12px)', borderBottom: '1px solid #1e242c' }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1
                className="text-xl font-black leading-none"
                style={{ color: '#f0f2f5', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.03em' }}
              >
                Hot Picks
              </h1>
              <p
                className="text-xs mt-0.5"
                style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}
              >
                {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </p>
            </div>
            <Link
              href="/dashboard"
              className="text-xs px-3 py-1.5 rounded-lg font-medium"
              style={{
                background: '#181c22',
                color: '#5a6474',
                border: '1px solid #2a2f3a',
                fontFamily: "'DM Mono', monospace",
              }}
            >
              Bankroll →
            </Link>
          </div>

          {/* sport filter tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
            {SPORTS.map((s) => {
              const active = s === activeSport;
              const color = s === 'All' ? '#f0f2f5' : SPORT_COLORS[s];
              return (
                <button
                  key={s}
                  onClick={() => setActiveSport(s)}
                  className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider transition-all duration-150"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    background: active ? (s === 'All' ? '#1e242c' : `${color}22`) : 'transparent',
                    color: active ? color : '#5a6474',
                    border: active ? `1px solid ${color}44` : '1px solid transparent',
                  }}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      </div>

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
      style={{
        background: '#181c22',
        border: '1px solid #2a2f3a',
      }}
    >
      <Target size={20} color="#5a6474" />
    </div>
  </div>

  <p
    className="text-sm"
    style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}
  >
    No picks posted yet for today.
  </p>
</div>
        )}

        {!fetching && !error && picks.length > 0 && (
          <>
            {hotPicks.length > 0 && (
              <section className="mb-6">
                <div
                  className="flex items-center gap-2 mb-3 text-xs font-bold tracking-widest uppercase"
                  style={{ color: '#ff6b35', fontFamily: "'DM Mono', monospace" }}
                >
                  🔥 Fire Picks
                </div>
                <div className="grid gap-4">
                  {hotPicks.map((pick) => (
                    <PickCard key={pick._id} pick={pick} />
                  ))}
                </div>
              </section>
            )}

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
                  {regularPicks.map((pick) => (
                    <PickCard key={pick._id} pick={pick} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
}
