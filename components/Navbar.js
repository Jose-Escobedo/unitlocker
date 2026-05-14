"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, User } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";
import { useAuth } from "@/context/AuthContext";

function LogoMark({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
    </svg>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useAuth();
  const pathname = usePathname();

  const AuthSkeleton = () => (
    <div className="flex space-x-3">
      <div className="w-20 h-9 rounded-lg animate-pulse" style={{ background: "rgba(255,255,255,0.04)" }} />
      <div className="w-20 h-9 rounded-lg animate-pulse" style={{ background: "rgba(255,255,255,0.04)" }} />
    </div>
  );

  const NavSkeleton = () => (
    <div className="hidden md:flex items-center gap-8">
      {[64, 48, 52].map((w, i) => (
        <div key={i} className="h-3.5 rounded-full animate-pulse" style={{ width: w, background: "rgba(255,255,255,0.04)" }} />
      ))}
    </div>
  );

  const guestLinks = [
    { href: "/#features", label: "Features" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
  ];

  const authLinks = [
    { href: "/picks", label: "Picks" },
    { href: "/blog", label: "Blog" },
  ];

  const navLinks = user ? authLinks : guestLinks;

  const isActive = (href) => !href.includes('#') && (pathname === href || (href !== "/" && pathname.startsWith(href)));

  return (
    <header
      className="fixed top-0 left-0 w-full z-50"
      style={{
        background: "rgba(7,8,11,0.85)",
        backdropFilter: "blur(20px) saturate(150%)",
        WebkitBackdropFilter: "blur(20px) saturate(150%)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 flex items-center h-16 gap-6">

        {/* Logo — left */}
        <Link href={user ? "/picks" : "/"} className="inline-flex items-center gap-2.5 flex-shrink-0 mr-auto md:mr-0">
          <div style={{
            width: 32, height: 32, borderRadius: 9, flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "linear-gradient(135deg, #ff6b35, #cc3d10)",
            color: "#0b0d12",
            boxShadow: "0 4px 14px rgba(255,107,53,0.35), inset 0 1px 0 rgba(255,255,255,0.25)",
          }}>
            <LogoMark size={18} />
          </div>
          <span style={{
            fontWeight: 600, letterSpacing: "0.06em", fontSize: 14,
            fontFamily: "'Inter', sans-serif", color: "#f5f6f8",
          }}>
            UNIT<b style={{ fontWeight: 800 }}>LOCKER</b>
          </span>
        </Link>

        {/* Nav tabs — center (desktop only) */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-1">
          {loading ? (
            <NavSkeleton />
          ) : (
            navLinks.map(({ href, label }) => {
              const active = isActive(href);
              return (
                <a
                  key={href}
                  href={href}
                  style={{
                    position: "relative",
                    padding: "8px 14px",
                    textDecoration: "none",
                    color: active ? "#f5f6f8" : "rgba(245,246,248,0.55)",
                    fontSize: 13.5, fontWeight: 500,
                    borderRadius: 8,
                    transition: "color .2s",
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = "#f5f6f8"}
                  onMouseLeave={e => { if (!isActive(href)) e.currentTarget.style.color = "rgba(245,246,248,0.55)"; }}
                >
                  {label}
                  {active && (
                    <span style={{
                      position: "absolute", left: 14, right: 14, bottom: 2, height: 2,
                      background: "linear-gradient(90deg, transparent, #ff6b35, transparent)",
                      borderRadius: 2,
                      boxShadow: "0 0 8px rgba(255,107,53,0.6)",
                    }} />
                  )}
                </a>
              );
            })
          )}
        </div>

        {/* Right: auth + mobile hamburger */}
        <div className="flex items-center gap-3 ml-auto md:ml-0">
          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              <AuthSkeleton />
            ) : !user ? (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
                  style={{
                    color: "rgba(245,246,248,0.55)",
                    fontFamily: "'DM Sans', sans-serif",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.color = "#f5f6f8";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.color = "rgba(245,246,248,0.55)";
                  }}
                >
                  Log in
                </Link>
                <Link
                  href="/get-started"
                  className="px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200"
                  style={{
                    background: "linear-gradient(135deg, #ff6b35, #cc3d10)",
                    color: "#0a0c0f",
                    fontFamily: "'DM Sans', sans-serif",
                    boxShadow: "0 4px 14px rgba(255,107,53,0.35)",
                  }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(255,107,53,0.5)"}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 14px rgba(255,107,53,0.35)"}
                >
                  Get Started
                </Link>
              </>
            ) : (
              <Link
                href="/profile"
                className="flex items-center justify-center transition-all duration-200"
                style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                title="Profile"
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(255,107,53,0.1)";
                  e.currentTarget.style.borderColor = "rgba(255,107,53,0.3)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                <User size={16} style={{ color: "rgba(245,246,248,0.78)" }} />
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(245,246,248,0.78)",
            }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="md:hidden pb-6 pt-2 flex flex-col gap-1 px-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className="px-3 py-3 text-sm font-medium rounded-lg transition-colors duration-200"
              style={{
                color: isActive(href) ? "#f5f6f8" : "rgba(245,246,248,0.55)",
                fontFamily: "'DM Sans', sans-serif",
                textDecoration: "none",
              }}
            >
              {label}
            </a>
          ))}

          <div className="flex flex-col gap-2 mt-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {loading ? (
              <AuthSkeleton />
            ) : !user ? (
              <>
                <Link
                  href="/get-started"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-3 text-sm font-semibold rounded-lg"
                  style={{
                    background: "linear-gradient(135deg, #ff6b35, #cc3d10)",
                    color: "#0a0c0f",
                    fontFamily: "'DM Sans', sans-serif",
                    boxShadow: "0 4px 14px rgba(255,107,53,0.35)",
                  }}
                >
                  Get Started
                </Link>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-3 text-sm font-medium rounded-lg"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(245,246,248,0.78)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Log in
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-3 text-sm font-medium rounded-lg"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(245,246,248,0.78)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Profile Settings
                </Link>
                <LogoutButton />
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
