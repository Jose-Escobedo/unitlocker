import { serialize } from "cookie";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  let { email, password } = req.body;

  // Sanitize input
  const sanitize = (str) => str?.replace(/[<>]/g, "")?.trim();
  email = sanitize(email);
  password = password?.replace(/[<>]/g, "").trim();

  const MAX_EMAIL = 100;
  const MIN_PASSWORD = 8;
  const MAX_PASSWORD = 128;

  const errors = {};

  // Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) errors.email = "Email is required.";
  else if (!emailRegex.test(email)) errors.email = "Email is invalid.";
  else if (email.length > MAX_EMAIL) errors.email = `Email cannot exceed ${MAX_EMAIL} characters.`;

  if (!password) errors.password = "Password is required.";
  else if (password.length < MIN_PASSWORD) errors.password = `Password must be at least ${MIN_PASSWORD} characters.`;
  else if (password.length > MAX_PASSWORD) errors.password = `Password cannot exceed ${MAX_PASSWORD} characters.`;

  if (Object.keys(errors).length > 0) return res.status(400).json({ errors });

  try {
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ errors: { email: "Invalid credentials" } });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ errors: { password: "Invalid credentials" } });

    // Create JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    // Set cookie
   res.setHeader(
  "Set-Cookie",
  serialize("token", token, {
    httpOnly: true, // can't be accessed via JS
    secure: process.env.NODE_ENV === "production", // HTTPS only in prod
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax", // allows OAuth callbacks to send the cookie
    path: "/", // accessible on all paths
  })
);

    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}
