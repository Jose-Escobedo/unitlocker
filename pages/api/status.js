import { connectDB } from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    await connectDB();
    res.status(200).json({ status: "ok", message: "Server is running and MongoDB is connected" });
  } catch (err) {
    res.status(500).json({ status: "error", message: "MongoDB connection failed", error: err.message });
  }
}
