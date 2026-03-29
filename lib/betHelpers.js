// ── Bet Helper Utilities ──
// Shared across dashboard, profile, analytics

export function fmt(n) {
  return '$' + Math.abs(n).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function fmtSigned(n) {
  return (n >= 0 ? '+' : '-') + fmt(n);
}

export function americanToDecimal(odds) {
  return odds > 0 ? odds / 100 + 1 : 100 / Math.abs(odds) + 1;
}

export function decimalToAmerican(d) {
  if (d >= 2) return Math.round((d - 1) * 100);
  return Math.round(-100 / (d - 1));
}

export function calcPotentialWin(odds, stake) {
  return stake * (americanToDecimal(odds) - 1);
}

export function getRank(xp, ranks) {
  return ranks.find((r, i) => xp >= r.min && (xp < r.max || i === ranks.length - 1));
}

export function getNextRank(xp, ranks) {
  const idx = ranks.findIndex((r, i) => xp >= r.min && (xp < r.max || i === ranks.length - 1));
  return ranks[Math.min(idx + 1, ranks.length - 1)];
}

export function calcStreak(settled) {
  let streak = 0;
  for (let i = 0; i < settled.length; i++) {
    if (i === 0) { streak = settled[i].status === 'win' ? 1 : -1; continue; }
    if (settled[i].status === 'win' && streak > 0) streak++;
    else if (settled[i].status === 'loss' && streak < 0) streak--;
    else break;
  }
  return streak;
}

// localStorage prefs
export function getLastPrefs() {
  try {
    const raw = localStorage.getItem('ul_last_prefs');
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

export function saveLastPrefs(prefs) {
  try { localStorage.setItem('ul_last_prefs', JSON.stringify(prefs)); } catch {}
}