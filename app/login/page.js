"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const { user, fetchUser } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const MAX_EMAIL = 100;
  const MIN_PASSWORD = 8;
  const MAX_PASSWORD = 128;

  const sanitizeInput = (str) => str.replace(/[<>]/g, "");

  useEffect(() => {
    if (user) router.replace("/vip");
  }, [user, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: sanitizeInput(value) });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidEmail = validateEmail(formData.email) && formData.email.length <= MAX_EMAIL;
  const isValidPassword = formData.password.length >= MIN_PASSWORD && formData.password.length <= MAX_PASSWORD;

  const getEmailMessage = () => {
    if (!touched.email) return "";
    if (!formData.email) return "Email is required.";
    if (!validateEmail(formData.email)) return "Email is invalid.";
    if (formData.email.length > MAX_EMAIL) return `Email cannot exceed ${MAX_EMAIL} characters.`;
    return "";
  };

  const getPasswordMessage = () => {
    if (!touched.password) return "";
    if (!formData.password) return "Password is required.";
    if (formData.password.length < MIN_PASSWORD) return `Password must be at least ${MIN_PASSWORD} characters.`;
    if (formData.password.length > MAX_PASSWORD) return `Password cannot exceed ${MAX_PASSWORD} characters.`;
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (!isValidEmail || !isValidPassword) {
      setMessage({ type: "error", text: "❌ Please fix the errors in the form." });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        await fetchUser();
        setMessage({ type: "success", text: "✅ Logged in! Redirecting..." });
        setTimeout(() => router.push("/vip"), 1000);
      } else {
        setMessage({ type: "error", text: "❌ " + (data?.error || "Something went wrong.") });
      }
    } catch {
      setMessage({ type: "error", text: "❌ Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full p-3 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-br-gold pr-12";

  if (user) return null;

  return (
    <div className="min-h-screen pt-47 flex bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Left side (brand panel) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center text-center px-12 bg-[url('/stadium-blur.jpg')] bg-cover bg-center bg-opacity-20">
        <Image src="https://firebasestorage.googleapis.com/v0/b/tortas-bffc7.appspot.com/o/bookie%20reaper%20white.png?alt=media&token=6698de0a-4e62-4e2b-8a66-91bb8e2933e2" alt="Bookie Reaper" width={100} height={100} />
        <h1 className="text-4xl font-bold text-white mt-6">The Bookie Reaper</h1>
        <p className="text-gray-400 text-lg mt-2">Crush the books. Claim your edge.</p>
      </div>

      {/* Right side (login card) */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-gray-950 border border-gray-800 rounded-2xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold text-white text-center mb-6">Welcome Back</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                maxLength={MAX_EMAIL}
                className={inputClass}
              />
              {isValidEmail && touched.email && (
                <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400" size={20} />
              )}
              {getEmailMessage() && <p className="mt-1 text-xs text-red-400">{getEmailMessage()}</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                minLength={MIN_PASSWORD}
                maxLength={MAX_PASSWORD}
                className={inputClass}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {getPasswordMessage() && <p className="mt-1 text-xs text-red-400">{getPasswordMessage()}</p>}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full cursor-pointer py-3 rounded-xl font-semibold text-white transition ${
                loading
                  ? "bg-green-700 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800"
              }`}
            >
              {loading ? "Logging in..." : "Login 🔑"}
            </button>
          </form>

          {message && (
            <p className={`mt-4 text-center text-sm ${message.type === "success" ? "text-green-400" : "text-red-400"}`}>
              {message.text}
            </p>
          )}

          {/* Links */}
          <p className="mt-6 text-xs text-gray-400 text-center">
            Don&apos;t have an account?{" "}
            <Link href="/get-started" className="text-br-gold underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
