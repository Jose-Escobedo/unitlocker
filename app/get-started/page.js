"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, CheckCircle, Lock } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const { user, fetchUser, setUser } = useAuth();

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [touched, setTouched] = useState({ name: false, email: false, password: false });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) router.replace("/vip");
  }, [user, router]);

  const MAX_NAME = 50;
  const MAX_EMAIL = 100;
  const MIN_PASSWORD = 8;
  const MAX_PASSWORD = 128;

  const sanitizeInput = (str) => str.replace(/[<>]/g, "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: sanitizeInput(value) });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidName = formData.name.length > 0 && formData.name.length <= MAX_NAME;
  const isValidEmail = validateEmail(formData.email) && formData.email.length <= MAX_EMAIL;
  const isValidPassword = formData.password.length >= MIN_PASSWORD && formData.password.length <= MAX_PASSWORD;

  const getNameMessage = () => {
    if (!touched.name) return "";
    if (!formData.name) return "Name is required.";
    if (formData.name.length > MAX_NAME) return `Name cannot exceed ${MAX_NAME} characters.`;
    return "";
  };

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

  // ── all backend logic unchanged ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true });

    if (!agreed) {
      setMessage({ type: "error", text: "You must agree to the Terms and Privacy Policy." });
      return;
    }
    if (!isValidName || !isValidEmail || !isValidPassword) {
      setMessage({ type: "error", text: "Please fix the errors in the form." });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Account created! Redirecting..." });
        await fetchUser();
        setTimeout(() => router.replace("/vip"), 500);
      } else {
        setMessage({ type: "error", text: data?.error || "Something went wrong." });
      }
    } catch {
      setMessage({ type: "error", text: "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex pt-16"
      style={{ background: '#0a0c0f' }}
    >
      {/* ── Left panel ── */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: '#111418', borderRight: '1px solid #1e242c' }}
      >
        {/* Glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(ellipse, rgba(0,229,160,0.06) 0%, transparent 65%)',
          }}
        />

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(0,229,160,0.15) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
            opacity: 0.18,
          }}
        />

        {/* Logo */}
        <div className="relative">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: '#00e5a0' }}
            >
              <svg width="17" height="19" viewBox="0 0 16 18" fill="none">
                <path d="M4.5 7.5V5a3.5 3.5 0 0 1 7 0v2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="1.5" y="7.5" width="13" height="9" rx="2.5" fill="white"/>
                <circle cx="8" cy="12" r="1.5" fill="#00e5a0"/>
                <rect x="7.25" y="12" width="1.5" height="2.5" rx="0.75" fill="#00e5a0"/>
              </svg>
            </div>
            <span
              className="font-black text-xl leading-none"
              style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.5px', color: '#e8ecf0' }}
            >
              <span style={{ color: '#00e5a0' }}>UNIT</span>LOCKER
            </span>
          </Link>
        </div>

        {/* Center content */}
        <div className="relative flex flex-col gap-6">
          <h2
            className="text-4xl font-bold leading-tight"
            style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.03em', color: '#e8ecf0' }}
          >
            Lock in your bankroll.
            <br />
            <span style={{ color: '#00e5a0' }}>Own your edge.</span>
          </h2>
          <p
            className="text-sm leading-relaxed max-w-sm"
            style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
          >
            Track every bet, protect your units, and build long-term profit with data-driven discipline. Free to start.
          </p>

          {/* Feature bullets */}
          <div className="flex flex-col gap-3 mt-2">
            {[
              'Bankroll tracking & bet history',
              'Win / loss / streak stats',
              'XP, ranks & achievements',
              'Advanced analytics with Pro',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.2)' }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00e5a0' }} />
                </div>
                <span
                  className="text-sm"
                  style={{ color: '#8a95a3', fontFamily: "'DM Sans', sans-serif" }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <p
          className="relative text-xs"
          style={{ color: '#2a3240', fontFamily: "'DM Mono', monospace" }}
        >
          © {new Date().getFullYear()} UnitLocker. All rights reserved.
        </p>
      </div>

      {/* ── Right panel: form ── */}
      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex justify-center mb-8 lg:hidden">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: '#00e5a0' }}
              >
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                  <path d="M4.5 7.5V5a3.5 3.5 0 0 1 7 0v2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="1.5" y="7.5" width="13" height="9" rx="2.5" fill="white"/>
                  <circle cx="8" cy="12" r="1.5" fill="#00e5a0"/>
                  <rect x="7.25" y="12" width="1.5" height="2.5" rx="0.75" fill="#00e5a0"/>
                </svg>
              </div>
              <span
                className="font-black text-xl leading-none"
                style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.5px', color: '#e8ecf0' }}
              >
                <span style={{ color: '#00e5a0' }}>UNIT</span>LOCKER
              </span>
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1
              className="text-2xl font-bold mb-1"
              style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em', color: '#e8ecf0' }}
            >
              Create your account
            </h1>
            <p
              className="text-sm"
              style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
            >
              Free forever. No credit card required.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Name */}
            <div className="flex flex-col gap-1">
              <label
                className="text-xs font-medium tracking-widest uppercase"
                style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}
              >
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
                  style={{
                    background: '#111418',
                    border: `1px solid ${getNameMessage() ? 'rgba(255,71,87,0.5)' : '#1e242c'}`,
                    color: '#e8ecf0',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = 'rgba(0,229,160,0.4)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0,229,160,0.07)';
                  }}
                  onBlurCapture={e => {
                    if (!getNameMessage()) e.target.style.borderColor = '#1e242c';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {isValidName && touched.name && (
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2" size={16} style={{ color: '#00e5a0' }} />
                )}
              </div>
              {getNameMessage() && (
                <p className="text-xs" style={{ color: '#ff4757', fontFamily: "'DM Sans', sans-serif" }}>
                  {getNameMessage()}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label
                className="text-xs font-medium tracking-widest uppercase"
                style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
                  style={{
                    background: '#111418',
                    border: `1px solid ${getEmailMessage() ? 'rgba(255,71,87,0.5)' : '#1e242c'}`,
                    color: '#e8ecf0',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = 'rgba(0,229,160,0.4)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0,229,160,0.07)';
                  }}
                  onBlurCapture={e => {
                    if (!getEmailMessage()) e.target.style.borderColor = '#1e242c';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {isValidEmail && touched.email && (
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2" size={16} style={{ color: '#00e5a0' }} />
                )}
              </div>
              {getEmailMessage() && (
                <p className="text-xs" style={{ color: '#ff4757', fontFamily: "'DM Sans', sans-serif" }}>
                  {getEmailMessage()}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label
                className="text-xs font-medium tracking-widest uppercase"
                style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Min. 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200 pr-10"
                  style={{
                    background: '#111418',
                    border: `1px solid ${getPasswordMessage() ? 'rgba(255,71,87,0.5)' : '#1e242c'}`,
                    color: '#e8ecf0',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = 'rgba(0,229,160,0.4)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0,229,160,0.07)';
                  }}
                  onBlurCapture={e => {
                    if (!getPasswordMessage()) e.target.style.borderColor = '#1e242c';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                  style={{ color: '#5a6474' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#a8b3bf'}
                  onMouseLeave={e => e.currentTarget.style.color = '#5a6474'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {getPasswordMessage() && (
                <p className="text-xs" style={{ color: '#ff4757', fontFamily: "'DM Sans', sans-serif" }}>
                  {getPasswordMessage()}
                </p>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer mt-1">
              <div className="relative flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className="w-4 h-4 rounded flex items-center justify-center transition-all duration-200"
                  style={{
                    background: agreed ? '#00e5a0' : '#111418',
                    border: `1px solid ${agreed ? '#00e5a0' : '#1e242c'}`,
                  }}
                >
                  {agreed && (
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                      <path d="M1 3.5L3.5 6L8 1" stroke="#0a0c0f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </div>
              <span
                className="text-xs leading-relaxed"
                style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
              >
                I agree to the{' '}
                <Link href="/terms" className="transition-colors duration-200" style={{ color: '#00e5a0' }}>
                  Terms of Use
                </Link>{' '}
                and{' '}
                <Link href="/privacy-policy" className="transition-colors duration-200" style={{ color: '#00e5a0' }}>
                  Privacy Policy
                </Link>
              </span>
            </label>

            {/* Error / success message */}
            {message && (
              <div
                className="px-4 py-3 rounded-lg text-sm"
                style={{
                  background: message.type === 'success' ? 'rgba(0,229,160,0.08)' : 'rgba(255,71,87,0.08)',
                  border: `1px solid ${message.type === 'success' ? 'rgba(0,229,160,0.25)' : 'rgba(255,71,87,0.25)'}`,
                  color: message.type === 'success' ? '#00e5a0' : '#ff4757',
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {message.text}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-sm transition-all duration-200 mt-1"
              style={{
                background: loading ? 'rgba(0,229,160,0.5)' : '#00e5a0',
                color: '#0a0c0f',
                fontFamily: "'DM Sans', sans-serif",
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
              onMouseEnter={e => {
                if (!loading) {
                  e.currentTarget.style.background = '#00f0aa';
                  e.currentTarget.style.boxShadow = '0 0 24px rgba(0,229,160,0.3)';
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = loading ? 'rgba(0,229,160,0.5)' : '#00e5a0';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          {/* Login link */}
          <p
            className="text-center text-sm mt-6"
            style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
          >
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-medium transition-colors duration-200"
              style={{ color: '#00e5a0' }}
              onMouseEnter={e => e.currentTarget.style.color = '#00f0aa'}
              onMouseLeave={e => e.currentTarget.style.color = '#00e5a0'}
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}