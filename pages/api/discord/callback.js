import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { code } = req.query;
  if (!code) return res.status(400).send("No code provided");

  // Get JWT from cookies
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  const token = cookies.token;
  if (!token) return res.status(401).send("Not logged in");

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.status(401).send("Invalid token");
  }

  // Exchange code for Discord access token
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    grant_type: "authorization_code",
    code,
    redirect_uri: process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI,
    scope: "identify",
  });

  const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    body: params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (!tokenRes.ok) return res.status(500).send("Failed to get Discord token");

  const tokenJson = await tokenRes.json();
  const accessToken = tokenJson.access_token;

  // Fetch Discord user info
  const userRes = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!userRes.ok) return res.status(500).send("Failed to get Discord user");

  const discordUser = await userRes.json();

  // Connect to DB and link Discord ID
  await connectDB();
  await User.findByIdAndUpdate(decoded.id, {
    discordId: discordUser.id,
    discordUsername: discordUser.username,
  });

  // Redirect to profile
  res.redirect("/profile");
}
