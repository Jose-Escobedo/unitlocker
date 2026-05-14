// DELETE THIS FILE before going to production — dev seeding only
import { connectDB } from "@/lib/mongodb";
import Pick from "@/models/Pick";

const SEED_PICKS = [
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
