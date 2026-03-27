"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div
        className="flex flex-col justify-center items-center min-h-screen px-4 pt-16"
        style={{ background: '#0a0c0f' }}
      >
        {/* Glow orb */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(ellipse, rgba(0,229,160,0.05) 0%, transparent 70%)',
          }}
        />

        {/* Logo mark */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 relative"
          style={{ background: '#00e5a0' }}
        >
          <svg width="22" height="25" viewBox="0 0 16 18" fill="none">
            <path
              d="M4.5 7.5V5a3.5 3.5 0 0 1 7 0v2.5"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x="1.5" y="7.5" width="13" height="9" rx="2.5" fill="white" />
            <circle cx="8" cy="12" r="1.5" fill="#00e5a0" />
            <rect x="7.25" y="12" width="1.5" height="2.5" rx="0.75" fill="#00e5a0" />
          </svg>
        </div>

        {/* Spinner */}
        <div
          className="w-8 h-8 rounded-full animate-spin mb-4"
          style={{
            border: '2px solid #1e242c',
            borderTopColor: '#00e5a0',
          }}
        />

        {/* Label */}
        <p
          className="text-sm"
          style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace", letterSpacing: '0.1em' }}
        >
          Loading...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}