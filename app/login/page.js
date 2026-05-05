"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, CheckCircle, Crosshair, Flame, Rss } from "lucide-react";
import Link from "next/link";

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
    if (user) router.replace("/picks");
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
      setMessage({ type: "error", text: "Please fix the errors in the form." });
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
        setMessage({ type: "success", text: "Logged in! Redirecting..." });
        setTimeout(() => router.push("/picks"), 1000);
      } else {
        setMessage({ type: "error", text: data?.error || "Something went wrong." });
      }
    } catch {
      setMessage({ type: "error", text: "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  if (user) return null;

  return (
    <div className="min-h-screen flex pt-16" style={{ background: '#0a0c0f' }}>

      {/* ── Left panel ── */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: '#111418', borderRight: '1px solid #1e242c' }}
      >
        <div
          className="absolute pointer-events-none"
          style={{
            top: '-100px', right: '-100px', width: '500px', height: '500px',
            background: 'radial-gradient(ellipse, rgba(255,107,53,0.07) 0%, transparent 65%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,107,53,0.14) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
            opacity: 0.15,
          }}
        />

        {/* Logo */}
        <div className="relative">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#ff6b35' }}>
              <Crosshair size={18} color="white" strokeWidth={2.5} />
            </div>
            <span className="font-black text-xl leading-none" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.5px', color: '#e8ecf0' }}>
              <span style={{ color: '#ff6b35' }}>UNIT</span>LOCKER
            </span>
          </Link>
        </div>

        {/* Center content */}
        <div className="relative flex flex-col gap-6">
          <h2
            className="text-4xl font-bold leading-tight"
            style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.03em', color: '#e8ecf0' }}
          >
            Welcome back.
            <br />
            <span style={{ color: '#ff6b35' }}>Picks are live.</span>
          </h2>
          <p className="text-sm leading-relaxed max-w-sm" style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}>
            Log in and get straight to the feed — CS2, NBA, NHL &amp; MLB picks posted daily by staff and the community.
          </p>

          <div className="flex flex-col gap-3 mt-2">
            {[
              { icon: <Rss size={12} />, text: 'Daily picks feed — CS2, NBA, NHL, MLB' },
              { icon: <Flame size={12} />, text: 'Fire Picks highlighted at the top' },
              { icon: <Crosshair size={12} />, text: 'Staff and community picks' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.2)', color: '#ff6b35' }}
                >
                  {item.icon}
                </div>
                <span className="text-sm" style={{ color: '#8a95a3', fontFamily: "'DM Sans', sans-serif" }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs" style={{ color: '#2a3240', fontFamily: "'DM Mono', monospace" }}>
          © {new Date().getFullYear()} UnitLocker. All rights reserved.
        </p>
      </div>

      {/* ── Right panel: form ── */}
      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex justify-center mb-8 lg:hidden">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#ff6b35' }}>
                <Crosshair size={16} color="white" strokeWidth={2.5} />
              </div>
              <span className="font-black text-xl leading-none" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.5px', color: '#e8ecf0' }}>
                <span style={{ color: '#ff6b35' }}>UNIT</span>LOCKER
              </span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em', color: '#e8ecf0' }}>
              Log in to your account
            </h1>
            <p className="text-sm" style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}>
              Don&apos;t have an account?{' '}
              <Link
                href="/get-started"
                className="font-medium transition-colors duration-200"
                style={{ color: '#ff6b35' }}
                onMouseEnter={e => e.currentTarget.style.color = '#ff7d4d'}
                onMouseLeave={e => e.currentTarget.style.color = '#ff6b35'}
              >
                Sign up
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium tracking-widest uppercase" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>
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
                  maxLength={MAX_EMAIL}
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
                  style={{
                    background: '#111418',
                    border: `1px solid ${getEmailMessage() ? 'rgba(255,71,87,0.5)' : '#1e242c'}`,
                    color: '#e8ecf0',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = 'rgba(255,107,53,0.4)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(255,107,53,0.07)';
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
                <p className="text-xs" style={{ color: '#ff4757', fontFamily: "'DM Sans', sans-serif" }}>{getEmailMessage()}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium tracking-widest uppercase" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs transition-colors duration-200"
                  style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
                  onMouseEnter={e => e.currentTarget.style.color = '#ff6b35'}
                  onMouseLeave={e => e.currentTarget.style.color = '#5a6474'}
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Min. 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  minLength={MIN_PASSWORD}
                  maxLength={MAX_PASSWORD}
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200 pr-10"
                  style={{
                    background: '#111418',
                    border: `1px solid ${getPasswordMessage() ? 'rgba(255,71,87,0.5)' : '#1e242c'}`,
                    color: '#e8ecf0',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = 'rgba(255,107,53,0.4)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(255,107,53,0.07)';
                  }}
                  onBlurCapture={e => {
                    if (!getPasswordMessage()) e.target.style.borderColor = '#1e242c';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                  style={{ color: '#5a6474' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#a8b3bf'}
                  onMouseLeave={e => e.currentTarget.style.color = '#5a6474'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {getPasswordMessage() && (
                <p className="text-xs" style={{ color: '#ff4757', fontFamily: "'DM Sans', sans-serif" }}>{getPasswordMessage()}</p>
              )}
            </div>

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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-sm transition-all duration-200 mt-1"
              style={{
                background: loading ? 'rgba(255,107,53,0.5)' : '#ff6b35',
                color: '#0a0c0f',
                fontFamily: "'DM Sans', sans-serif",
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
              onMouseEnter={e => {
                if (!loading) {
                  e.currentTarget.style.background = '#ff7d4d';
                  e.currentTarget.style.boxShadow = '0 0 24px rgba(255,107,53,0.35)';
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = loading ? 'rgba(255,107,53,0.5)' : '#ff6b35';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}>
            Don&apos;t have an account?{' '}
            <Link
              href="/get-started"
              className="font-medium transition-colors duration-200"
              style={{ color: '#ff6b35' }}
              onMouseEnter={e => e.currentTarget.style.color = '#ff7d4d'}
              onMouseLeave={e => e.currentTarget.style.color = '#ff6b35'}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
