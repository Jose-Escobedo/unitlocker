'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';

// ── Mock daily P&L data — replace with real data from your API ──
function generateMockData() {
  const data = {};
  const now = new Date();
  let running = 1000;
  for (let m = 0; m < 3; m++) {
    const month = new Date(now.getFullYear(), now.getMonth() - m, 1);
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(month.getFullYear(), month.getMonth(), d);
      if (date > now) continue;
      // ~60% chance of having bets on a given day
      if (Math.random() > 0.4) {
        const pl = Math.round((Math.random() * 200 - 70) * 100) / 100;
        running += pl;
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        data[key] = { pl, running: Math.round(running * 100) / 100, bets: Math.floor(Math.random() * 4) + 1 };
      }
    }
  }
  return data;
}

const MOCK_DAILY = generateMockData();

const VIEWS = [
  { id: 'month', label: 'Month' },
  { id: 'week', label: 'Week' },
  { id: 'day', label: 'Day' },
  { id: 'alltime', label: 'All Time' },
];

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function fmt(n) {
  return '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtSigned(n) {
  return (n >= 0 ? '+' : '-') + fmt(n);
}
function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

// ── Sparkline SVG path from data points ──
function buildPath(points, w, h, padding = 10) {
  if (points.length < 2) return '';
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const xs = points.map((_, i) => padding + (i / (points.length - 1)) * (w - padding * 2));
  const ys = points.map(v => h - padding - ((v - min) / range) * (h - padding * 2));
  let d = `M ${xs[0]} ${ys[0]}`;
  for (let i = 1; i < points.length; i++) {
    const cpx = (xs[i - 1] + xs[i]) / 2;
    d += ` C ${cpx} ${ys[i - 1]}, ${cpx} ${ys[i]}, ${xs[i]} ${ys[i]}`;
  }
  return { path: d, xs, ys, min, max };
}

function buildAreaPath(points, w, h, padding = 10) {
  const result = buildPath(points, w, h, padding);
  if (!result) return '';
  const { path, xs, ys } = result;
  const area = path + ` L ${xs[xs.length - 1]} ${h - padding} L ${xs[0]} ${h - padding} Z`;
  return { ...result, area };
}

// ── Chart component ──
function LineChart({ data, color, height = 120 }) {
  const [hover, setHover] = useState(null);
  const W = 600;
  const H = height;

  if (!data || data.length < 2) {
    return (
      <div className="flex items-center justify-center h-24" style={{ color: '#2a3240', fontSize: '12px', fontFamily: "'DM Mono', monospace" }}>
        Not enough data
      </div>
    );
  }

  const points = data.map(d => d.value);
  const result = buildAreaPath(points, W, H);
  if (!result) return null;
  const { path, area, xs, ys, min, max } = result;
  const isPositive = points[points.length - 1] >= points[0];
  const lineColor = isPositive ? '#00e5a0' : '#ff4757';
  const areaColor = isPositive ? 'rgba(0,229,160,0.08)' : 'rgba(255,71,87,0.08)';

  return (
    <div className="relative w-full" style={{ height: H }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="w-full h-full"
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0.15" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map(p => (
          <line
            key={p}
            x1="10" y1={10 + p * (H - 20)} x2={W - 10} y2={10 + p * (H - 20)}
            stroke="#1e242c" strokeWidth="1"
          />
        ))}

        {/* Area fill */}
        <path d={area} fill="url(#chartGrad)" />

        {/* Line */}
        <path d={path} fill="none" stroke={lineColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Hover interactions */}
        {xs.map((x, i) => (
          <rect
            key={i}
            x={x - (W / xs.length / 2)}
            y={0}
            width={W / xs.length}
            height={H}
            fill="transparent"
            onMouseEnter={() => setHover(i)}
          />
        ))}

        {/* Hover dot + vertical line */}
        {hover !== null && (
          <>
            <line x1={xs[hover]} y1={10} x2={xs[hover]} y2={H - 10} stroke="#1e242c" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx={xs[hover]} cy={ys[hover]} r="4" fill={lineColor} />
            <circle cx={xs[hover]} cy={ys[hover]} r="7" fill={lineColor} fillOpacity="0.2" />
          </>
        )}
      </svg>

      {/* Hover tooltip */}
      {hover !== null && data[hover] && (
        <div
          className="absolute pointer-events-none px-3 py-2 rounded-lg text-xs"
          style={{
            background: '#181c22',
            border: '1px solid #1e242c',
            fontFamily: "'DM Mono', monospace",
            color: '#e8ecf0',
            top: 8,
            left: `clamp(0px, ${(xs[hover] / W) * 100}%, calc(100% - 120px))`,
            zIndex: 10,
            whiteSpace: 'nowrap',
          }}
        >
          <div style={{ color: '#5a6474', fontSize: '10px' }}>{data[hover].label}</div>
          <div style={{ color: data[hover].value >= (hover > 0 ? data[hover - 1].value : data[hover].value) ? '#00e5a0' : '#ff4757' }}>
            {fmt(data[hover].value)}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Monthly calendar view ──
function MonthView({ year, month, dailyData, onDayClick, selectedDay }) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  // Month summary
  const monthEntries = Object.entries(dailyData).filter(([key]) => {
    const [y, m] = key.split('-').map(Number);
    return y === year && m === month + 1;
  });
  const monthPL = monthEntries.reduce((a, [, v]) => a + v.pl, 0);
  const monthBets = monthEntries.reduce((a, [, v]) => a + v.bets, 0);
  const winDays = monthEntries.filter(([, v]) => v.pl > 0).length;
  const lossDays = monthEntries.filter(([, v]) => v.pl < 0).length;

  return (
    <div>
      {/* Month summary strip */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Month P&L', value: fmtSigned(monthPL), color: monthPL >= 0 ? '#00e5a0' : '#ff4757' },
          { label: 'Bet Days', value: monthEntries.length, color: '#e8ecf0' },
          { label: 'Win Days', value: winDays, color: '#00e5a0' },
          { label: 'Loss Days', value: lossDays, color: '#ff4757' },
        ].map((s, i) => (
          <div key={i} className="p-3 rounded-xl text-center" style={{ background: '#181c22', border: '1px solid #1e242c' }}>
            <div className="text-xs mb-1" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</div>
            <div className="font-bold text-sm" style={{ color: s.color, fontFamily: "'Inter', sans-serif" }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1.5 mb-1.5">
        {DAYS.map(d => (
          <div key={d} className="text-center py-1" style={{ color: '#2a3240', fontFamily: "'DM Mono', monospace", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;
          const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const entry = dailyData[key];
          const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
          const isFuture = new Date(year, month, day) > today;
          const isSelected = selectedDay === key;
          const pl = entry?.pl ?? null;

          let bg = '#181c22';
          let border = '#1e242c';
          let textColor = '#2a3240';

          if (!isFuture && pl !== null) {
            if (pl > 0) { bg = 'rgba(0,229,160,0.1)'; border = 'rgba(0,229,160,0.25)'; textColor = '#00e5a0'; }
            else if (pl < 0) { bg = 'rgba(255,71,87,0.08)'; border = 'rgba(255,71,87,0.2)'; textColor = '#ff4757'; }
            else { bg = 'rgba(245,200,66,0.08)'; border = 'rgba(245,200,66,0.2)'; textColor = '#f5c842'; }
          }
          if (isSelected) { border = '#00e5a0'; bg = pl > 0 ? 'rgba(0,229,160,0.18)' : pl < 0 ? 'rgba(255,71,87,0.15)' : '#181c22'; }
          if (isToday && pl === null) { border = 'rgba(0,229,160,0.3)'; }

          return (
            <button
              key={key}
              onClick={() => !isFuture && entry && onDayClick(key)}
              className="rounded-xl p-1.5 flex flex-col items-center transition-all duration-150 cursor-pointer"
              style={{
                background: bg,
                border: `1px solid ${border}`,
                opacity: isFuture ? 0.2 : 1,
                minHeight: '52px',
                cursor: isFuture || !entry ? 'default' : 'pointer',
              }}
            >
              <span
                className="text-xs font-medium"
                style={{
                  color: isToday ? '#00e5a0' : isFuture ? '#2a3240' : pl !== null ? textColor : '#5a6474',
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {day}
              </span>
              {pl !== null && !isFuture && (
                <span
                  className="text-xs font-semibold mt-0.5 leading-none"
                  style={{ color: textColor, fontFamily: "'DM Mono', monospace", fontSize: '9px' }}
                >
                  {pl >= 0 ? '+' : ''}{pl >= 100 || pl <= -100 ? `$${Math.round(pl)}` : `$${pl.toFixed(0)}`}
                </span>
              )}
              {entry && (
                <span style={{ color: textColor, opacity: 0.6, fontFamily: "'DM Mono', monospace", fontSize: '8px' }}>
                  {entry.bets}b
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected day detail */}
      {selectedDay && dailyData[selectedDay] && (() => {
        const d = dailyData[selectedDay];
        const [y, m, day] = selectedDay.split('-');
        return (
          <div className="mt-4 p-4 rounded-xl flex items-center justify-between" style={{ background: '#181c22', border: '1px solid #1e242c' }}>
            <div>
              <p className="text-xs mb-0.5" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>
                {new Date(selectedDay).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-xs" style={{ color: '#8a95a3', fontFamily: "'DM Mono', monospace" }}>{d.bets} bet{d.bets !== 1 ? 's' : ''}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-base" style={{ color: d.pl >= 0 ? '#00e5a0' : '#ff4757', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}>
                {fmtSigned(d.pl)}
              </p>
              <p className="text-xs" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>Bankroll: {fmt(d.running)}</p>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// ── Main Calendar Component ──
export default function BankrollCalendar({ dailyData = MOCK_DAILY }) {
  const today = new Date();
  const [view, setView] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDay, setSelectedDay] = useState(null);

  // Build chart data for different views
  const chartData = useMemo(() => {
    const entries = Object.entries(dailyData).sort(([a], [b]) => a.localeCompare(b));

    if (view === 'day') {
      // Last 24 hours broken into slots — use last 7 days for daily bar feel
      return entries.slice(-7).map(([key, val]) => ({
        label: new Date(key).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        value: val.running,
      }));
    }

    if (view === 'week') {
      return entries.slice(-28).map(([key, val]) => ({
        label: new Date(key).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: val.running,
      }));
    }

    if (view === 'alltime') {
      return entries.map(([key, val]) => ({
        label: new Date(key).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' }),
        value: val.running,
      }));
    }

    return [];
  }, [view, dailyData]);

  // Overall stats
  const allEntries = Object.entries(dailyData).sort(([a], [b]) => a.localeCompare(b));
  const totalPL = allEntries.reduce((a, [, v]) => a + v.pl, 0);
  const currentBankroll = allEntries.length > 0 ? allEntries[allEntries.length - 1][1].running : 1000;
  const isUp = totalPL >= 0;

  const navigate = (dir) => {
    setSelectedDay(null);
    if (view === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + dir, 1));
    } else if (view === 'week') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + dir * 7));
    } else if (view === 'day') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + dir));
    }
  };

  const viewLabel = () => {
    if (view === 'month') return `${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    if (view === 'week') return `Week of ${currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    if (view === 'day') return `Last 7 days`;
    return 'All Time';
  };

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: '#111418', border: '1px solid #1e242c' }}
    >
      {/* Top accent */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,160,0.3), transparent)' }} />

      <div className="p-6">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

          {/* Bankroll ticker */}
          <div className="flex items-center gap-3">
            <div>
              <div className="text-xs mb-0.5" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Bankroll
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="text-2xl font-bold"
                  style={{ color: '#e8ecf0', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.03em' }}
                >
                  {fmt(currentBankroll)}
                </span>
                <div
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    background: isUp ? 'rgba(0,229,160,0.1)' : 'rgba(255,71,87,0.1)',
                    border: `1px solid ${isUp ? 'rgba(0,229,160,0.25)' : 'rgba(255,71,87,0.25)'}`,
                    color: isUp ? '#00e5a0' : '#ff4757',
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {isUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  {fmtSigned(totalPL)}
                </div>
              </div>
            </div>
          </div>

          {/* View toggle */}
          <div
            className="flex gap-1 p-1 rounded-xl"
            style={{ background: '#181c22', border: '1px solid #1e242c' }}
          >
            {VIEWS.map(v => (
              <button
                key={v.id}
                onClick={() => { setView(v.id); setSelectedDay(null); }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer"
                style={{
                  background: view === v.id ? '#111418' : 'transparent',
                  color: view === v.id ? '#e8ecf0' : '#5a6474',
                  border: view === v.id ? '1px solid #1e242c' : '1px solid transparent',
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation (month/week/day only) */}
        {view !== 'alltime' && (
          <div className="flex items-center justify-between mb-5">
            <button
              onClick={() => navigate(-1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer"
              style={{ background: '#181c22', border: '1px solid #1e242c', color: '#5a6474' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#e8ecf0'; e.currentTarget.style.borderColor = '#2a3240'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#5a6474'; e.currentTarget.style.borderColor = '#1e242c'; }}
            >
              <ChevronLeft size={15} />
            </button>
            <span
              className="text-sm font-medium"
              style={{ color: '#e8ecf0', fontFamily: "'DM Sans', sans-serif" }}
            >
              {viewLabel()}
            </span>
            <button
              onClick={() => navigate(1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer"
              style={{ background: '#181c22', border: '1px solid #1e242c', color: '#5a6474' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#e8ecf0'; e.currentTarget.style.borderColor = '#2a3240'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#5a6474'; e.currentTarget.style.borderColor = '#1e242c'; }}
            >
              <ChevronRight size={15} />
            </button>
          </div>
        )}

        {/* Month view */}
        {view === 'month' && (
          <MonthView
            year={currentDate.getFullYear()}
            month={currentDate.getMonth()}
            dailyData={dailyData}
            onDayClick={setSelectedDay}
            selectedDay={selectedDay}
          />
        )}

        {/* Chart views (week / day / alltime) */}
        {view !== 'month' && (
          <div>
            {/* Chart */}
            <LineChart data={chartData} height={160} />

            {/* X-axis labels */}
            <div className="flex justify-between mt-2 px-2">
              {chartData.length > 0 && [0, Math.floor(chartData.length / 2), chartData.length - 1].map(i => (
                <span
                  key={i}
                  className="text-xs"
                  style={{ color: '#2a3240', fontFamily: "'DM Mono', monospace" }}
                >
                  {chartData[i]?.label}
                </span>
              ))}
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-3 gap-3 mt-5">
              {(() => {
                if (chartData.length < 2) return null;
                const start = chartData[0].value;
                const end = chartData[chartData.length - 1].value;
                const change = end - start;
                const changePct = start > 0 ? (change / start) * 100 : 0;
                const high = Math.max(...chartData.map(d => d.value));
                const low = Math.min(...chartData.map(d => d.value));
                return [
                  { label: 'Change', value: fmtSigned(change), color: change >= 0 ? '#00e5a0' : '#ff4757' },
                  { label: 'High', value: fmt(high), color: '#00e5a0' },
                  { label: 'Low', value: fmt(low), color: '#ff4757' },
                ].map((s, i) => (
                  <div key={i} className="p-3 rounded-xl text-center" style={{ background: '#181c22', border: '1px solid #1e242c' }}>
                    <div className="text-xs mb-1" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</div>
                    <div className="font-bold text-sm" style={{ color: s.color, fontFamily: "'Inter', sans-serif" }}>{s.value}</div>
                  </div>
                ));
              })()}
            </div>
          </div>
        )}

        {/* Legend */}
        {view === 'month' && (
          <div className="flex items-center gap-4 mt-4">
            {[
              { color: 'rgba(0,229,160,0.5)', label: 'Profit day' },
              { color: 'rgba(255,71,87,0.5)', label: 'Loss day' },
              { color: 'rgba(245,200,66,0.5)', label: 'Push / even' },
            ].map((l, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: l.color }} />
                <span style={{ color: '#2a3240', fontFamily: "'DM Mono', monospace", fontSize: '10px' }}>{l.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}