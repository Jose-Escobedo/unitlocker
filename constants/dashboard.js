// ── Dashboard Constants ──

export const RANKS = [
  { name: 'ROOKIE',  min: 0,    max: 100  },
  { name: 'GRINDER', min: 100,  max: 300  },
  { name: 'SHARPIE', min: 300,  max: 600  },
  { name: 'WISEGUY', min: 600,  max: 1000 },
  { name: 'WHALE',   min: 1000, max: 2000 },
  { name: 'LEGEND',  min: 2000, max: Infinity },
];

export const ACHIEVEMENTS = [
  { id: 'first_bet',  icon: 'target',   name: 'First Blood',  desc: 'Log your first bet',      unlocked: true  },
  { id: 'streak_3',   icon: 'flame',    name: 'Hot Hand',     desc: '3-bet win streak',         unlocked: true  },
  { id: 'streak_5',   icon: 'zap',      name: 'On Fire',      desc: '5-bet win streak',         unlocked: false },
  { id: 'ten_bets',   icon: 'layers',   name: 'Degenerate',   desc: 'Log 10 bets',              unlocked: false },
  { id: 'doubled',    icon: 'trending', name: 'Double Up',    desc: 'Double your bankroll',     unlocked: false },
  { id: 'fifty_bets', icon: 'trophy',   name: 'Hall of Fame', desc: 'Log 50 bets',              unlocked: false },
];

export const SPORTS_GRID = [
  { label: 'NBA',    emoji: '🏀' },
  { label: 'NFL',    emoji: '🏈' },
  { label: 'MLB',    emoji: '⚾' },
  { label: 'NHL',    emoji: '🏒' },
  { label: 'Soccer', emoji: '⚽' },
  { label: 'Tennis', emoji: '🎾' },
  { label: 'MMA',    emoji: '🥊' },
  { label: 'Horse',  emoji: '🏇' },
  { label: 'Other',  emoji: '🎲' },
];

export const QUICK_STAKES = [25, 50, 100, 200];

export const BET_TYPES = [
  'Moneyline', 'Spread', 'Total (O/U)', 'Parlay', 'Prop', 'Futures',
];

export const STARTING_BANKROLL = 1000;

// Mock data — replace with real API calls
export const MOCK_BETS = [
  { id: 1, game: 'Lakers vs Celtics',    sport: 'NBA', type: 'Moneyline',    odds: -110, stake: 50, pick: 'Lakers',  against: 'Celtics',  status: 'win',     pl: 45.45, date: 'Mar 22' },
  { id: 2, game: 'Chiefs vs Ravens',     sport: 'NFL', type: 'Spread',       odds: -110, stake: 75, pick: 'Chiefs',  against: 'Ravens',   status: 'loss',    pl: -75,   date: 'Mar 21' },
  { id: 3, game: 'Yankees vs Red Sox',   sport: 'MLB', type: 'Total (O/U)',  odds: +120, stake: 40, pick: 'Over',    against: 'Red Sox',  status: 'win',     pl: 48,    date: 'Mar 20' },
  { id: 4, game: 'Man City vs Arsenal',  sport: 'Soccer', type: 'Moneyline', odds: +150, stake: 30, pick: 'Man City',against: 'Arsenal',  status: 'push',    pl: 0,     date: 'Mar 19' },
  { id: 5, game: 'Nuggets vs Warriors',  sport: 'NBA', type: 'Spread',       odds: -110, stake: 60, pick: 'Nuggets', against: 'Warriors', status: 'pending', pl: 0,     date: 'Mar 25' },
  { id: 6, game: 'Maple Leafs vs Bruins',sport: 'NHL', type: 'Moneyline',    odds: +105, stake: 45, pick: 'Maple Leafs',against:'Bruins', status: 'win',     pl: 47.25, date: 'Mar 18' },
];
