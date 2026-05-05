"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, User, Crosshair } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useAuth();

  // VAULT navy palette
  // #0a0c0f  — page bg / nav bg
  // #111418  — surface / card
  // #181c22  — surface2 / inputs
  // #1e242c  — borders
  // #5a6474  — muted text
  // #8a95a3  — dim text
  // #e8ecf0  — primary text
  // #ff6b35  — accent green

  const AuthSkeleton = () => (
    <div className="flex space-x-3">
      <div className="w-20 h-9 rounded-lg animate-pulse" style={{ background: "#181c22" }} />
      <div className="w-20 h-9 rounded-lg animate-pulse" style={{ background: "#181c22" }} />
    </div>
  );

  const NavSkeleton = () => (
    <div className="hidden md:flex items-center gap-8">
      {[64, 48, 52, 56].map((w, i) => (
        <div
          key={i}
          className="h-3.5 rounded-full animate-pulse"
          style={{ width: w, background: "#181c22" }}
        />
      ))}
    </div>
  );

  const guestLinks = [
    { href: "/#features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const authLinks = [
    { href: "/picks", label: "Picks" },
    { href: "/blog", label: "Blog" },
  ];

  const navLinks = user ? authLinks : guestLinks;

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 px-6 md:px-10"
      style={{
        background: "rgba(10, 12, 15, 0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid #1e242c",
      }}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between h-16">

        {/* Logo */}
        <Link href={user ? "/picks" : "/"} className="inline-flex items-center gap-2.5 flex-shrink-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "#ff6b35" }}
          >
            <Crosshair size={16} color="white" strokeWidth={2.5} />
          </div>
          <span
            className="font-black text-xl leading-none"
            style={{
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "-0.5px",
              color: "#e8ecf0",
            }}
          >
            <span style={{ color: "#ff6b35" }}>UNIT</span>LOCKER
          </span>
        </Link>

        {/* Desktop nav links */}
        {loading ? (
          <NavSkeleton />
        ) : (
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium transition-colors duration-200"
                style={{
                  color: "#a8b3bf",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#ff6b35")}
                onMouseLeave={e => (e.currentTarget.style.color = "#a8b3bf")}
              >
                {label}
              </Link>
            ))}
          </div>
        )}

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
                  color: "#8a95a3",
                  fontFamily: "'DM Sans', sans-serif",
                  background: "#111418",
                  border: "1px solid #1e242c",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#181c22";
                  e.currentTarget.style.borderColor = "#2a3240";
                  e.currentTarget.style.color = "#e8ecf0";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "#111418";
                  e.currentTarget.style.borderColor = "#1e242c";
                  e.currentTarget.style.color = "#8a95a3";
                }}
              >
                Log in
              </Link>
              <Link
                href="/get-started"
                className="px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200"
                style={{
                  background: "#ff6b35",
                  color: "#0a0c0f",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = "0 0 24px rgba(255,107,53,0.35)";
                  e.currentTarget.style.background = "#ff7d4d";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.background = "#ff6b35";
                }}
              >
                Get Started
              </Link>
            </>
          ) : (
            <Link
              href="/profile"
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{
                background: "#111418",
                border: "1px solid #1e242c",
              }}
              title="Profile"
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(255,107,53,0.1)";
                e.currentTarget.style.borderColor = "rgba(255,107,53,0.3)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "#111418";
                e.currentTarget.style.borderColor = "#1e242c";
              }}
            >
              <User size={16} style={{ color: "#8a95a3" }} />
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200"
          style={{
            background: "#111418",
            border: "1px solid #1e242c",
            color: "#8a95a3",
          }}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="md:hidden pb-6 pt-2 flex flex-col gap-1"
          style={{
            borderTop: "1px solid #1e242c",
          }}
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className="px-3 py-3 text-sm font-medium rounded-lg transition-colors duration-200"
              style={{
                color: "#a8b3bf",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "#ff6b35";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "#a8b3bf";
              }}
            >
              {label}
            </Link>
          ))}

          <div
            className="flex flex-col gap-2 mt-3 pt-4"
            style={{ borderTop: "1px solid #1e242c" }}
          >
            {loading ? (
              <AuthSkeleton />
            ) : !user ? (
              <>
                <Link
                  href="/get-started"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-3 text-sm font-semibold rounded-lg transition-all duration-200"
                  style={{
                    background: "#ff6b35",
                    color: "#0a0c0f",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Get Started
                </Link>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-3 text-sm font-medium rounded-lg transition-all duration-200"
                  style={{
                    background: "#111418",
                    border: "1px solid #1e242c",
                    color: "#8a95a3",
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
                  className="w-full text-center py-3 text-sm font-medium rounded-lg transition-all duration-200"
                  style={{
                    background: "#111418",
                    border: "1px solid #1e242c",
                    color: "#8a95a3",
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