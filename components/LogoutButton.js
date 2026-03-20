"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LogoutButton() {
  const router = useRouter();
  const { fetchUser } = useAuth(); // refresh context after logout

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    await fetchUser(); // update context to null
    router.push("/login"); // redirect to login
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-br-black cursor-pointer text-br-white px-5 py-2 rounded-md font-semibold hover:bg-gray-800 transition"
    >
      Logout
    </button>
  );
}
