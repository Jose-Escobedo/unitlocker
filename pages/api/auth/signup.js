import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") 
    return res.status(405).json({ error: "Method not allowed" });

  let { name, email, password } = req.body;

  // Sanitize input
  const sanitize = (str) => str?.replace(/[<>]/g, "")?.trim();
  name = sanitize(name);
  email = sanitize(email);
  password = sanitize(password);

  const MAX_NAME = 50, MAX_EMAIL = 100, MIN_PASSWORD = 8, MAX_PASSWORD = 128;
  const errors = {};

  if (!name) errors.name = "Name is required.";
  else if (name.length > MAX_NAME) errors.name = `Name cannot exceed ${MAX_NAME} characters.`;

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

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ errors: { email: "Email already in use" } });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashedPassword });

    // Generate JWT
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Set cookie
    res.setHeader("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict; Secure=${process.env.NODE_ENV === "production"}`);

    res.status(201).json({ message: "User created successfully", user: { name: newUser.name, email: newUser.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}
