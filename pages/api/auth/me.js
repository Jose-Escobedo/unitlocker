import jwt from "jsonwebtoken";
import { parse } from "cookie";       // ✅ use named import
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Parse cookies safely (works in Vercel prod + dev)
    const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
    const token = cookies.token;

    if (!token) {
      if (process.env.NODE_ENV !== "production") {
        console.log("No token cookie found");
      }
      return res.status(401).json({ error: "Not authenticated" });
    }

    // Verify JWT
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("JWT verification failed:", err.message);
      }
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    await connectDB();

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Server error in /api/auth/me:", error);
    }
    res.status(500).json({ error: "Server error" });
  }
}
