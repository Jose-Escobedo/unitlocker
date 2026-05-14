// DELETE THIS FILE before going to production — dev seeding only
import { connectDB } from "@/lib/mongodb";
import Pick from "@/models/Pick";

const SEED_PICKS = [
  {
    sport: "CS2",
    playerName: "molodoy",
    team: "FURIA",
    matchup: "FURIA vs FAL",
    eventDate: new Date("2026-05-16T07:00:00"),
    stat: "Kills Maps 1+2",
    line: 31.5,
    prediction: "Over",
    isHot: false,
    confidence: 4,
    notes: "molodoy on a 5-game Over streak averaging 36.4 kills. Market-favorite at 59.1% Over. H2H vs FAL averages 32.86 across 7 games — blowout risk is the only concern.",
    stats: {
      avgL10: 31.50,
      diff: 0.00,
      l5: '100%',
      l10: '70%',
      l15: '60%',
      h2h: '57%',
      history: [
        { label: 'vs NAVI',  value: 21 },
        { label: 'vs MOUZ',  value: 33 },
        { label: 'vs VIT',   value: 19 },
        { label: 'vs FAL',   value: 28 },
        { label: 'vs GL',    value: 32 },
        { label: 'vs FaZe',  value: 37 },
        { label: 'vs MNTE',  value: 32 },
        { label: 'vs HERO',  value: 35 },
        { label: 'vs TS',    value: 42 },
        { label: 'vs M8',    value: 36 },
      ],
      h2hHistory: [
        { label: 'vs FAL 7/28', value: 23 },
        { label: 'vs FAL 9/20', value: 48 },
        { label: 'vs FAL 11/8', value: 32 },
        { label: 'vs FAL 11/16', value: 24 },
        { label: 'vs FAL 2/16', value: 38 },
        { label: 'vs FAL 3/23', value: 37 },
        { label: 'vs FAL 4/19', value: 28 },
      ],
    },
  },
  {
    sport: "CS2",
    playerName: "b1t",
    team: "NAVI",
    matchup: "NAVI vs VIT",
    eventDate: new Date("2026-05-16T13:30:00"),
    stat: "Headshots Maps 1+2",
    line: 15.5,
    prediction: "Over",
    isHot: false,
    confidence: 4,
    notes: "b1t averaging 18.2 HS over L10 (80% HR). H2H vs VIT is split — blowout maps suppressed recent games, but went over in 3 of 6 lifetime matchups at 17.33 avg.",
    stats: {
      avgL10: 18.20,
      diff: 2.70,
      l5: '100%',
      l10: '80%',
      l15: '60%',
      h2h: '67%',
      history: [
        { label: 'vs HOTU', value: 19 },
        { label: 'vs AUR',  value: 14 },
        { label: 'vs VIT',  value: 13 },
        { label: 'vs FaZe', value: 22 },
        { label: 'vs GL',   value: 19 },
        { label: 'vs FaZe', value: 16 },
        { label: 'vs VIT',  value: 20 },
        { label: 'vs PSSN', value: 20 },
        { label: 'vs GL',   value: 19 },
        { label: 'vs LGC',  value: 20 },
      ],
      h2hHistory: [
        { label: 'vs VIT 8/18', value: 22 },
        { label: 'vs VIT 6/20', value: 18 },
        { label: 'vs VIT 12/6', value: 17 },
        { label: 'vs VIT 3/29', value: 14 },
        { label: 'vs VIT 4/17', value: 13 },
        { label: 'vs VIT 5/3',  value: 20 },
      ],
    },
  },
  {
    sport: "CS2",
    playerName: "s1mple",
    team: "NAVI",
    matchup: "NAVI vs Team Spirit",
    eventDate: new Date(),
    stat: "Kills Maps 1+2",
    line: 22.5,
    prediction: "Over",
    isHot: true,
    confidence: 5,
    notes: "s1mple averaging 27 kills on LAN this quarter. Spirit's CT side is leaking.",
    stats: {
      avgL10: 27.3, diff: 4.8, l5: '80%', l10: '90%', h2h: '75%',
      history: [
        { label: 'vs NaVi',    value: 28 }, { label: 'vs Spirit',  value: 31 },
        { label: 'vs MOUZ',    value: 19 }, { label: 'vs G2',      value: 26 },
        { label: 'vs Liquid',  value: 30 }, { label: 'vs Vitality', value: 22 },
        { label: 'vs FaZe',   value: 29 }, { label: 'vs Cloud9',  value: 17 },
        { label: 'vs Spirit',  value: 28 }, { label: 'vs Spirit',  value: 25 },
      ],
      h2hHistory: [
        { label: 'vs Spirit', value: 22 }, { label: 'vs Spirit', value: 28 }, { label: 'vs Spirit', value: 25 },
      ],
    },
  },
  {
    sport: "CS2",
    playerName: "ZywOo",
    team: "Vitality",
    matchup: "Vitality vs FaZe",
    eventDate: new Date(),
    stat: "Headshots Maps 1+2",
    line: 82.5,
    prediction: "Over",
    isHot: false,
    confidence: 4,
    notes: "ZywOo has gone over 82.5 ADR in 8 of his last 10 maps against FaZe.",
    stats: {
      avgL10: 89.1, diff: 6.6, l5: '100%', l10: '80%', h2h: '66.7%',
      history: [
        { label: 'vs Spirit', value: 91 }, { label: 'vs FaZe',   value: 85 },
        { label: 'vs MOUZ',   value: 74 }, { label: 'vs NaVi',   value: 97 },
        { label: 'vs G2',     value: 88 }, { label: 'vs Liquid', value: 86 },
        { label: 'vs Cloud9', value: 79 }, { label: 'vs Spirit', value: 94 },
        { label: 'vs ENCE',   value: 90 }, { label: 'vs FaZe',   value: 81 },
      ],
      h2hHistory: [
        { label: 'vs FaZe', value: 85 }, { label: 'vs FaZe', value: 94 }, { label: 'vs FaZe', value: 81 },
      ],
    },
  },
  {
    sport: "NBA",
    playerName: "Nikola Jokic",
    team: "Nuggets",
    matchup: "Nuggets vs Lakers",
    eventDate: new Date(),
    stat: "Pts+Reb+Ast",
    line: 54.5,
    prediction: "Over",
    isHot: true,
    confidence: 4,
    notes: "Jokic feasting on Lakers. Averaged 62 PRA in last 3 matchups.",
    stats: {
      avgL10: 61.2, diff: 6.7, l5: '100%', l10: '90%', h2h: '100%',
      history: [
        { label: 'vs BOS', value: 58 }, { label: 'vs GSW', value: 67 },
        { label: 'vs LAL', value: 72 }, { label: 'vs PHX', value: 48 },
        { label: 'vs MIL', value: 61 }, { label: 'vs MIA', value: 55 },
        { label: 'vs OKC', value: 63 }, { label: 'vs LAL', value: 59 },
        { label: 'vs LAC', value: 71 }, { label: 'vs LAL', value: 64 },
      ],
      h2hHistory: [
        { label: 'vs LAL', value: 72 }, { label: 'vs LAL', value: 59 }, { label: 'vs LAL', value: 64 },
      ],
    },
  },
  {
    sport: "MLB",
    playerName: "Gerrit Cole",
    team: "Yankees",
    matchup: "Yankees vs Red Sox",
    eventDate: new Date(),
    stat: "Strikeouts",
    line: 7.5,
    prediction: "Over",
    isHot: false,
    confidence: 3,
  },
  {
    sport: "NHL",
    playerName: "Nathan MacKinnon",
    team: "Avalanche",
    matchup: "Avalanche vs Golden Knights",
    eventDate: new Date(),
    stat: "Points",
    line: 0.5,
    prediction: "Over",
    isHot: false,
    confidence: 4,
    notes: "MacKinnon has a point in 9 straight games.",
    stats: {
      avgL10: 1.4, diff: 0.9, l5: '100%', l10: '90%', h2h: '83.3%',
      history: [
        { label: 'vs VGK', value: 2 }, { label: 'vs EDM', value: 1 },
        { label: 'vs DAL', value: 0 }, { label: 'vs NYR', value: 1 },
        { label: 'vs STL', value: 2 }, { label: 'vs MIN', value: 1 },
        { label: 'vs CGY', value: 1 }, { label: 'vs SJS', value: 1 },
        { label: 'vs ANA', value: 0 }, { label: 'vs VGK', value: 2 },
      ],
      h2hHistory: [
        { label: 'vs VGK', value: 2 }, { label: 'vs VGK', value: 1 }, { label: 'vs VGK', value: 2 },
      ],
    },
  },
];

export default async function handler(req, res) {
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ error: "Not available in production" });
  }

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  await connectDB();
  await Pick.deleteMany({ status: "pending" });
  const inserted = await Pick.insertMany(SEED_PICKS);

  res.status(200).json({ inserted: inserted.length, message: "Seeded successfully" });
}
