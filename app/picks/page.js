'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import PickCard from '@/components/picks/PickCard';
import Link from 'next/link';
import { Target, Flame, RefreshCw, Zap, Crosshair, CircleDot, Dribbble, Sword } from 'lucide-react';

const SPORTS = ['All', 'CS2', 'NBA', 'NHL', 'MLB'];

const SPORT_COLORS = {
  CS2: '#ff6b35',
  NBA: '#00e5a0',
  NHL: '#4da6ff',
  MLB: '#f5c842',
};

const SPORT_ICONS = {
  CS2: Crosshair,
  NBA: Dribbble,
  NHL: CircleDot,
  MLB: Sword,
};

function SkeletonCard() {
  return (
    <div style={{
      borderRadius: 18,
      background: 'rgba(20,22,28,0.55)',
      border: '1px solid rgba(255,255,255,0.06)',
      height: 280,
      animation: 'pulse 1.5s ease-in-out infinite',
    }} />
  );
}

function LockScreen() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 16px', textAlign: 'center', background: '#07080b' }}>
      <div style={{
        marginBottom: 16, width: 56, height: 56, borderRadius: 18,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
        background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.2)',
      }}>
        🔒
      </div>
      <h1 style={{ margin: '0 0 8px', fontSize: 26, fontWeight: 800, color: '#f5f6f8', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.03em' }}>
        Hot Picks Feed
      </h1>
      <p style={{ margin: '0 0 24px', fontSize: 13, color: 'rgba(245,246,248,0.55)', fontFamily: "'DM Mono', monospace", maxWidth: 280, lineHeight: 1.6 }}>
        Sign in to access the daily CS2, NBA, NHL &amp; MLB prop picks feed.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 280 }}>
        <Link href="/get-started" style={{
          textAlign: 'center', padding: '12px 0', borderRadius: 12, fontWeight: 700,
          fontSize: 14, background: '#ff6b35', color: '#0a0c0f',
          fontFamily: "'Inter', sans-serif", boxShadow: '0 4px 20px rgba(255,107,53,0.35)',
          textDecoration: 'none',
        }}>
          Get Access
        </Link>
        <Link href="/login" style={{
          textAlign: 'center', padding: '12px 0', borderRadius: 12, fontWeight: 600,
          fontSize: 14, background: 'rgba(255,255,255,0.04)', color: '#f5f6f8',
          border: '1px solid rgba(255,255,255,0.08)', fontFamily: "'Inter', sans-serif",
          textDecoration: 'none',
        }}>
          Log In
        </Link>
      </div>
    </div>
  );
}

function ResultBadge({ result }) {
  const config = {
    won:  { label: 'WIN',  bg: 'rgba(0,229,160,0.12)',  border: 'rgba(0,229,160,0.3)',  color: '#00e5a0' },
    lost: { label: 'LOSS', bg: 'rgba(255,71,87,0.1)',   border: 'rgba(255,71,87,0.3)',  color: '#ff4757' },
    push: { label: 'PUSH', bg: 'rgba(245,200,66,0.1)',  border: 'rgba(245,200,66,0.3)', color: '#f5c842' },
  };
  const c = config[result];
  if (!c) return null;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '2px 8px', borderRadius: 6,
      fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
      background: c.bg, border: `1px solid ${c.border}`, color: c.color,
      fontFamily: "'DM Mono', monospace",
    }}>
      {c.label}
    </span>
  );
}

function RecentResults({ results }) {
  if (!results || results.length === 0) return null;
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12,
        fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', color: 'rgba(245,246,248,0.35)',
        fontFamily: "'DM Mono', monospace",
      }}>
        RECENT RESULTS
      </div>
      <div style={{ borderRadius: 14, overflow: 'hidden', background: 'rgba(20,22,28,0.55)', border: '1px solid rgba(255,255,255,0.06)' }}>
        {results.map((pick, i) => (
          <div key={pick._id} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 16px',
            borderBottom: i < results.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
              <span style={{ fontSize: 11, fontWeight: 700, flexShrink: 0, color: SPORT_COLORS[pick.sport] ?? '#ff6b35', fontFamily: "'DM Mono', monospace" }}>
                {pick.sport}
              </span>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(245,246,248,0.78)', fontFamily: "'DM Sans', sans-serif" }}>
                {pick.playerName}
              </span>
              <span className="hidden sm:block" style={{ fontSize: 11, color: 'rgba(245,246,248,0.35)', fontFamily: "'DM Mono', monospace" }}>
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

function FadeIn({ children, delay = 0 }) {
  return (
    <div style={{ animation: `fadeUp 0.3s ease forwards`, animationDelay: `${delay}ms`, opacity: 0 }}>
      {children}
      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}

function SectionHeader({ icon: Icon, label, count, color = '#ff6b35', lineColor }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        fontSize: 11, fontWeight: 600, letterSpacing: '0.14em',
        color, fontFamily: "'DM Mono', monospace",
      }}>
        <Icon size={13} />
        {label}
        <span style={{
          fontSize: 10, padding: '1px 7px', borderRadius: 999,
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          color: 'rgba(245,246,248,0.35)',
        }}>
          {count}
        </span>
      </div>
      <div style={{
        flex: 1, height: 1,
        background: lineColor || `linear-gradient(90deg, ${color}55, transparent)`,
      }} />
    </div>
  );
}

export default function PicksPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [picks, setPicks] = useState([]);
  const [recentResults, setRecentResults] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [activeSport, setActiveSport] = useState('All');
  const [error, setError] = useState(null);

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
    delete cache.current[activeSport || 'All'];
    loadPicks(activeSport, true);
  };

  const sportCounts = SPORTS.reduce((acc, s) => {
    acc[s] = s === 'All' ? picks.length : picks.filter(p => p.sport === s).length;
    return acc;
  }, {});

  if (authLoading) {
    return (
      <main style={{ minHeight: '100vh', padding: '80px 16px 80px', background: '#07080b' }}>
        <div className="picks-grid" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gap: 18, padding: '0 32px' }}>
          <SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard />
        </div>
        <style>{`.picks-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } @media(max-width:700px){ .picks-grid { grid-template-columns: 1fr; } }`}</style>
        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
      </main>
    );
  }

  if (!user) return <LockScreen />;

  const hotPicks = picks.filter(p => p.isHot);
  const regularPicks = picks.filter(p => !p.isHot);

  return (
    <main style={{ minHeight: '100vh', paddingTop: 64, paddingBottom: 80, background: '#07080b', position: 'relative' }}>

      {/* Atmosphere orbs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden', opacity: 0.7 }} aria-hidden>
        <div style={{
          position: 'absolute', width: 900, height: 900, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,53,0.45) 0%, transparent 65%)',
          filter: 'blur(180px)', top: -200, left: -200,
          animation: 'orbDrift1 24s ease-in-out infinite alternate',
        }} />
        <div style={{
          position: 'absolute', width: 1000, height: 1000, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,180,200,0.35) 0%, transparent 65%)',
          filter: 'blur(180px)', bottom: -300, right: -250,
          animation: 'orbDrift2 30s ease-in-out infinite alternate',
        }} />
      </div>

      {/* Page header */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 32px 0' }}>

          {/* Title row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <h1 style={{
                  margin: 0, fontSize: 34, fontWeight: 700, letterSpacing: '-0.02em',
                  color: '#f5f6f8', fontFamily: "'Inter', sans-serif",
                }}>
                  Hot Picks
                </h1>
                {!fetching && picks.length > 0 && (
                  <span style={{
                    fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 999,
                    background: 'rgba(255,107,53,0.18)', color: '#ffaa80',
                    border: '1px solid rgba(255,107,53,0.3)',
                    fontFamily: "'DM Mono', monospace",
                  }}>
                    {picks.length}
                  </span>
                )}
              </div>
              <p style={{ margin: '6px 0 0', fontSize: 11, color: 'rgba(245,246,248,0.55)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'DM Mono', monospace" }}>
                {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} · LIVE FEED
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* Live indicator */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '7px 12px', borderRadius: 999,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                fontSize: 11, letterSpacing: '0.08em',
                color: 'rgba(245,246,248,0.78)',
                fontFamily: "'DM Mono', monospace",
              }}>
                <span style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: '#00e5a0', boxShadow: '0 0 8px #00e5a0',
                  display: 'inline-block',
                  animation: 'livePulse 1.6s ease-in-out infinite',
                }} />
                LIVE
              </div>
              {/* Refresh */}
              <button
                onClick={handleRefresh}
                disabled={fetching || refreshing}
                style={{
                  width: 36, height: 36, borderRadius: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: refreshing ? '#ff6b35' : 'rgba(245,246,248,0.78)',
                  cursor: 'pointer', transition: 'all .2s',
                }}
                title="Refresh picks"
              >
                <RefreshCw size={15} style={{ animation: refreshing ? 'spin 0.8s linear infinite' : 'none' }} />
              </button>
            </div>
          </div>

          {/* Filter tabs */}
          <div style={{
            display: 'flex', gap: 4,
            padding: 4,
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 12,
            width: 'fit-content',
            overflowX: 'auto',
            marginBottom: 0,
          }}>
            {SPORTS.map((s) => {
              const active = s === activeSport;
              const sportColor = SPORT_COLORS[s];
              const SportIcon = SPORT_ICONS[s];
              const count = sportCounts[s] ?? 0;
              const isEmpty = s !== 'All' && count === 0 && !fetching;
              return (
                <button
                  key={s}
                  onClick={() => setActiveSport(s)}
                  style={{
                    flexShrink: 0,
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    padding: '8px 14px',
                    border: 0,
                    cursor: 'pointer',
                    fontSize: 12.5, fontWeight: 500, borderRadius: 8,
                    color: active ? '#f5f6f8' : isEmpty ? 'rgba(255,255,255,0.2)' : 'rgba(245,246,248,0.55)',
                    background: active
                      ? 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))'
                      : 'transparent',
                    boxShadow: active
                      ? `0 0 0 1px rgba(255,255,255,0.10), 0 0 18px ${sportColor ? sportColor + '26' : 'rgba(255,107,53,0.15)'}`
                      : 'none',
                    transition: 'all .2s',
                    opacity: isEmpty && !active ? 0.5 : 1,
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {SportIcon && (
                    <SportIcon
                      size={11}
                      strokeWidth={2.5}
                      style={{ color: active ? sportColor : 'inherit', flexShrink: 0 }}
                    />
                  )}
                  <span>{s}</span>
                  {!fetching && count > 0 && (
                    <span style={{
                      fontSize: 10.5, padding: '1px 6px', borderRadius: 999,
                      background: active && sportColor ? `${sportColor}33` : 'rgba(255,255,255,0.06)',
                      color: active && sportColor ? sportColor : 'rgba(245,246,248,0.55)',
                      fontFamily: "'DM Mono', monospace",
                    }}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '28px 32px 0' }}>

        {fetching && (
          <div className="picks-grid" style={{ display: 'grid', gap: 18 }}>
            <SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard />
          </div>
        )}

        {!fetching && error && (
          <p style={{ textAlign: 'center', color: '#ff4757', fontFamily: "'DM Mono', monospace", padding: '32px 0', fontSize: 13 }}>
            {error}
          </p>
        )}

        {!fetching && !error && picks.length === 0 && (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <div style={{
              width: 48, height: 48, margin: '0 auto 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 14,
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <Target size={20} color="rgba(245,246,248,0.35)" />
            </div>
            <p style={{ fontSize: 13, color: 'rgba(245,246,248,0.35)', fontFamily: "'DM Mono', monospace", marginBottom: 6 }}>
              No picks posted yet{activeSport !== 'All' ? ` for ${activeSport}` : ' for today'}.
            </p>
            <p style={{ fontSize: 11, color: 'rgba(245,246,248,0.18)', fontFamily: "'DM Mono', monospace" }}>
              Check back soon — picks drop throughout the day.
            </p>
          </div>
        )}

        {!fetching && !error && picks.length > 0 && (
          <>
            {hotPicks.length > 0 && (
              <section style={{ marginBottom: 36 }}>
                <SectionHeader icon={Flame} label="FIRE PICKS" count={hotPicks.length} color="#ff6b35" />
                <div className="picks-grid" style={{ display: 'grid', gap: 18 }}>
                  {hotPicks.map((pick, i) => (
                    <FadeIn key={pick._id} delay={i * 60}>
                      <PickCard pick={pick} />
                    </FadeIn>
                  ))}
                </div>
              </section>
            )}

            {regularPicks.length > 0 && (
              <section style={{ marginTop: hotPicks.length > 0 ? 8 : 0 }}>
                <SectionHeader
                  icon={Zap}
                  label="ALL PICKS"
                  count={regularPicks.length}
                  color="rgba(245,246,248,0.55)"
                  lineColor="linear-gradient(90deg, rgba(255,255,255,0.12), transparent)"
                />
                <div className="picks-grid" style={{ display: 'grid', gap: 18 }}>
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

        {!fetching && activeSport === 'All' && (
          <div style={{ marginTop: 40 }}>
            <RecentResults results={recentResults} />
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes livePulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.85)} }
        @keyframes orbDrift1 { 0%{transform:translate(0,0)scale(1)} 100%{transform:translate(120px,80px)scale(1.1)} }
        @keyframes orbDrift2 { 0%{transform:translate(0,0)scale(1)} 100%{transform:translate(-100px,-60px)scale(1.15)} }
        .picks-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        @media(max-width:700px){ .picks-grid { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  );
}
