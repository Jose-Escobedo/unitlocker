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
    stat: "Kills",
    line: 22.5,
    prediction: "Over",
    isHot: true,
    confidence: 5,
    notes: "s1mple averaging 27 kills on LAN this quarter. Spirit's CT side is leaking.",
  },
  {
    sport: "CS2",
    playerName: "ZywOo",
    team: "Vitality",
    matchup: "Vitality vs FaZe",
    eventDate: new Date(),
    stat: "Rating",
    line: 1.15,
    prediction: "Over",
    isHot: false,
    confidence: 4,
    notes: "ZywOo has gone over 1.15 rating in 8 of his last 10 maps.",
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
