import { connectDB } from "@/lib/mongodb";
import Pick from "@/models/Pick";
import User from "@/models/User";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

async function getAdmin(req) {
  try {
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.token;
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectDB();
    const user = await User.findById(decoded.id).select("role");
    if (!user || user.role !== "admin") return null;
    return decoded;
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  const admin = await getAdmin(req);
  if (!admin) return res.status(401).json({ error: "Unauthorized" });

  await connectDB();

  // ── GET: list all picks (any status) for admin view ──
  if (req.method === "GET") {
    const { status, sport, limit = 50 } = req.query;
    const filter = {};
    if (status && status !== "all") filter.status = status;
    if (sport && sport !== "all") filter.sport = sport;

    const picks = await Pick.find(filter)
      .sort({ createdAt: -1 })
      .limit(Math.min(parseInt(limit), 100))
      .lean();

    return res.status(200).json({ picks });
  }

  // ── POST: create a new pick ──
  if (req.method === "POST") {
    const {
      sport, playerName, playerImage, team, matchup, eventDate,
      stat, line, prediction, isHot, confidence, notes, bookieUrl,
    } = req.body;

    if (!sport || !playerName || !team || !matchup || !eventDate || !stat || !line || !prediction) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const pick = await Pick.create({
      sport,
      playerName: playerName.trim(),
      playerImage: playerImage || null,
      team: team.trim(),
      matchup: matchup.trim(),
      eventDate: new Date(eventDate),
      stat: stat.trim(),
      line: parseFloat(line),
      prediction,
      isHot: !!isHot,
      confidence: parseInt(confidence) || 3,
      notes: notes?.trim() || null,
      bookieUrl: bookieUrl?.trim() || null,
      source: "staff",
      submittedBy: admin.id,
      status: "pending",
    });

    return res.status(201).json({ pick });
  }

  // ── PATCH: settle a pick (won/lost/push) or edit isHot/confidence ──
  if (req.method === "PATCH") {
    const { id, status, result, isHot, confidence, notes, bookieUrl } = req.body;
    if (!id) return res.status(400).json({ error: "Pick id required" });

    const update = {};
    if (status) update.status = status;
    if (result !== undefined) update.result = result;
    if (isHot !== undefined) update.isHot = isHot;
    if (confidence !== undefined) update.confidence = parseInt(confidence);
    if (notes !== undefined) update.notes = notes;
    if (bookieUrl !== undefined) update.bookieUrl = bookieUrl;

    const pick = await Pick.findByIdAndUpdate(id, update, { new: true });
    if (!pick) return res.status(404).json({ error: "Pick not found" });

    return res.status(200).json({ pick });
  }

  // ── DELETE: remove a pick ──
  if (req.method === "DELETE") {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "Pick id required" });

    await Pick.findByIdAndDelete(id);
    return res.status(200).json({ success: true });
  }

  res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}