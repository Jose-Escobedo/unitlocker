import { serialize } from "cookie"; 

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Clear the JWT cookie
  res.setHeader(
    "Set-Cookie",
    serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0), // expire immediately
      sameSite: "strict",
      path: "/",
    })
  );

  res.status(200).json({ message: "Logged out successfully" });
}
