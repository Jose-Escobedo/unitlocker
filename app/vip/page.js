"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import VIPIntroSection from "@/components/VIPIntroSection";
import MLBPicksSection from "@/components/MLBPicksSection";

export default function VIPPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Optional: for more control, we can track local loading state
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (!loading) {
      setCheckingAuth(false);
    }
  }, [loading]);

  return (
    <div className="flex flex-col min-h-screen px-4 min-h-screen pt-47 bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center text-center">
        {checkingAuth ? (
          // Spinner while checking auth
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white mt-4">Checking authentication...</p>
          </div>
        ) : user ? (
          // Authenticated content
          <div className="max-w-6xl w-full">
            
            <VIPIntroSection />
            <MLBPicksSection />
          </div>
        ) : (
          // Unauthenticated content
          <div className="max-w-3xl mx-auto text-center space-y-6 ">
            <h1 className="text-4xl font-bold text-white">
              Unlock VIP Access
            </h1>
            <p className="text-gray-300 text-lg">
              Sign up now to get access to our exclusive MLB betting edge, data-driven picks, and insights.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
              <button
                onClick={() => router.push("/get-started")}
                className="px-6 py-3 cursor-pointer bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-500 text-black font-semibold rounded-full hover:brightness-105 transition"
              >
                Sign Up
              </button>
              <button
                onClick={() => router.push("/login")}
                className="px-6 cursor-pointer py-3 bg-gray-800 text-white font-semibold rounded-full hover:brightness-110 transition"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
