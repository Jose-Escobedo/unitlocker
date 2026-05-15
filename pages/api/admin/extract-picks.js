import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '15mb',
    },
  },
};

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

const EXTRACTION_PROMPT = `You are extracting structured prop bet data from a PickFinder app screenshot.

I will give you 1 or 2 screenshots of the SAME player and SAME prop line. If 2 screenshots, the second one has the "Opponent" dropdown filtered to a specific team — that one contains the H2H (head-to-head) data.

Today's date is: {TODAY}

Extract the following JSON structure (return ONLY valid JSON, nothing else, no markdown fences):

{
  "playerName": "string",
  "team": "string (e.g. NAVI)",
  "matchup": "string (e.g. NAVI vs VIT)",
  "eventDate": "ISO datetime string — resolve relative dates like 'Fri @ 1:30PM' to the upcoming occurrence",
  "stat": "string (e.g. 'Kills Maps 1+2' or 'Headshots Maps 1+2'). The header says 'Maps 1-2 HS' which means 'Headshots Maps 1+2'. 'Maps 1-2 K' means 'Kills Maps 1+2'",
  "line": number,
  "sport": "CS2 | NBA | NHL | MLB (infer from the game/players shown)",
  "stats": {
    "avgL10": number (the Avg shown in the L10 box, e.g. 18.20),
    "l5": "string with % sign (e.g. '100%')",
    "l10": "string with % sign (e.g. '80%')",
    "l15": "string with % sign (e.g. '60%')",
    "h2h": "string with % sign if visible, else null",
    "history": [
      { "date": "MM/DD/YY ISO string", "value": number, "label": "opponent abbreviation" }
    ],
    "h2hHistory": [
      { "date": "MM/DD/YY ISO string", "value": number, "label": "opponent abbreviation" }
    ]
  }
}

CRITICAL RULES FOR THE BAR CHART:
1. Each bar has a NUMBER ON TOP (total value for that game) and a DATE + OPPONENT below it.
2. Extract the TOP number as "value". Ignore the smaller numbers INSIDE the bar (those are map-by-map splits).
3. GREEN bars hit the line (value >= line for Over), RED bars missed.
4. SKIP any bar that appears cut off at the edge of the screenshot.
5. Order bars left-to-right (oldest to newest).
6. The history array goes in "history" for the first/unfiltered screenshot.
7. If a second screenshot exists with the Opponent dropdown filtered, its bars go in "h2hHistory" — also extract the H2H% and h2h Avg from the L5/L10/L15/H2H box.

DATE RESOLUTION:
- For "Fri @ 1:30PM" with today as ${'{TODAY}'}, pick the NEXT upcoming Friday at 13:30.
- For bar chart dates like "4/15", assume current year unless year is shown (e.g. "8/18/24" = 2024-08-18).

If a field cannot be determined, use null. Return ONLY the JSON object.`;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const admin = await getAdmin(req);
  if (!admin) return res.status(401).json({ error: "Unauthorized" });

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: "ANTHROPIC_API_KEY not configured" });
  }

  const { images } = req.body;
  if (!images || !Array.isArray(images) || images.length === 0) {
    return res.status(400).json({ error: "No images provided" });
  }
  if (images.length > 2) {
    return res.status(400).json({ error: "Maximum 2 images" });
  }

  // Build content blocks for Anthropic API
  const today = new Date().toISOString().split('T')[0];
  const prompt = EXTRACTION_PROMPT.replace(/\{TODAY\}/g, today);

  const content = [];
  images.forEach((img, idx) => {
    // img comes as data URL: "data:image/png;base64,..."
    const match = img.match(/^data:(image\/[^;]+);base64,(.+)$/);
    if (!match) return;
    const [, mediaType, data] = match;
    content.push({
      type: "text",
      text: idx === 0
        ? "Screenshot 1 (regular / unfiltered):"
        : "Screenshot 2 (filtered to specific opponent = H2H view):",
    });
    content.push({
      type: "image",
      source: { type: "base64", media_type: mediaType, data },
    });
  });
  content.push({ type: "text", text: prompt });

  try {
    const apiRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 4096,
        messages: [{ role: "user", content }],
      }),
    });

    if (!apiRes.ok) {
      const errText = await apiRes.text();
      console.error("Anthropic API error:", errText);
      return res.status(500).json({ error: "Vision API failed", detail: errText });
    }

    const data = await apiRes.json();
    const rawText = data.content?.[0]?.text ?? "";

    // Strip any markdown fences just in case
    const cleaned = rawText.replace(/```json\s*/g, "").replace(/```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      console.error("Failed to parse JSON from Claude:", cleaned);
      return res.status(500).json({ error: "Could not parse extracted data", raw: cleaned });
    }

    return res.status(200).json({ extracted: parsed });
  } catch (err) {
    console.error("Extraction error:", err);
    return res.status(500).json({ error: err.message });
  }
}
