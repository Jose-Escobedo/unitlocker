"use client";

import { useAuth } from "@/context/AuthContext";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ProfilePage() {
  const { user, loading } = useAuth();

  return (
    <ProtectedRoute>
    <section className="flex flex-col min-h-screen px-4 pt-47 bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-3xl mx-auto flex flex-col items-center mt-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Your Profile</h1>
        <p className="text-gray-400 mb-8 text-center">
          Manage your account and link your Discord to access our exclusive discord server.
        </p>

        {/* Profile Card */}
        <div className="bg-gray-900 rounded-2xl shadow-xl p-8 w-full flex flex-col items-center space-y-6">
          {/* User Info */}
          {loading ? (
            <div className="w-48 h-48 bg-gray-700 rounded-full animate-pulse mb-4"></div>
          ) : (
            <div className="flex flex-col items-center space-y-3">
              <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center text-3xl font-bold">
                {user?.name?.[0] || "U"}
              </div>
              <h2 className="text-xl font-semibold">{user?.name || "User"}</h2>
              <p className="text-gray-400">{user?.email}</p>
            </div>
          )}

  {/* Discord Linking */}
{!loading && (
  <>
    {!user?.discordId ? (
      <>
        <Link
          href={`https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI)}&response_type=code&scope=identify`}
          className="bg-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition"
        >
          Link Discord
        </Link>

        <p className="text-sm pb-6 text-yellow-400 text-center mt-4 max-w-xs">
          ⚠️ Make sure you use the correct Discord account. Once linked, it will be tied to your profile and cannot be changed.
        </p>
      </>
    ) : (
      <p className="text-green-400 font-medium text-center">
        ✅ Discord Linked: {user.discordUsername || "Connected"}
      </p>
    )}
  </>
)}



          {/* Logout */}
          {!loading && (
            <LogoutButton className="mt-4 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full transition" />
          )}
        </div>
      </div>
    </section>
    </ProtectedRoute>
  );
}
