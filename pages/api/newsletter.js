import { connectDB } from "@/lib/mongodb";
import Email from "@/models/Email";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    await connectDB();

    // Check if email already exists
    const existing = await Email.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ error: "This email is already subscribed." });
    }

    const newEmail = await Email.create({ email });
    res.status(201).json({ message: "Subscribed successfully!", email: newEmail });
  } catch (error) {
    console.error("Newsletter signup error:", error);
    res.status(500).json({ error: "Server error" });
  }
}
