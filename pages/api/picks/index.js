import { connectDB } from "@/lib/mongodb";
import Pick from "@/models/Pick";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

function getUser(req) {
  try {
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.token;
    if (!token) return null;
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const { sport, status = "pending", limit = 20 } = req.query;

    const filter = { status };
    if (sport) filter.sport = sport;

    const picks = await Pick.find(filter)
      .sort({ isHot: -1, eventDate: 1, createdAt: -1 })
      .limit(Math.min(parseInt(limit), 50))
      .lean();

    return res.status(200).json({ picks });
  }

  if (req.method === "POST") {
    const user = getUser(req);
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const {
      sport, playerName, playerImage, team, matchup, eventDate,
      stat, line, prediction, isHot, confidence, notes, bookieUrl,
    } = req.body;

    if (!sport || !playerName || !team || !matchup || !eventDate || !stat || !line || !prediction) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const pick = await Pick.create({
      sport, playerName, playerImage, team, matchup,
      eventDate: new Date(eventDate),
      stat, line, prediction, isHot, confidence, notes, bookieUrl,
      source: 'community',
      submittedBy: user.id,
    });

    return res.status(201).json({ pick });
  }

  if (req.method === "PATCH") {
    const user = getUser(req);
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const { id, status, result } = req.body;
    if (!id) return res.status(400).json({ error: "Pick id required" });

    const pick = await Pick.findByIdAndUpdate(
      id,
      { status, result },
      { new: true }
    );
    if (!pick) return res.status(404).json({ error: "Pick not found" });

    return res.status(200).json({ pick });
  }

  res.setHeader("Allow", ["GET", "POST", "PATCH"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
