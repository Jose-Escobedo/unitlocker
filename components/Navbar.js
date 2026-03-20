"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, User} from "lucide-react";
import LogoutButton from "@/components/LogoutButton";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useAuth();

  // Skeleton for auth buttons
  const AuthSkeleton = () => (
    <div className="flex space-x-4">
      <div className="w-24 h-10 bg-gray-700 rounded-full animate-pulse"></div>
      <div className="w-24 h-10 bg-gray-700 rounded-full animate-pulse"></div>
    </div>
  );

  return (
   <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0c0f] shadow-md px-4 md:px-6 py-3 min-h-[115px] font-sans">
<nav className="w-full flex items-center justify-between h-full min-h-[115px]">

  {/* LEFT: Logo */}
  <div className="flex-shrink-0">
    <Link href="/" className="inline-block">
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/tortas-bffc7.appspot.com/o/unitlockerTEXTSPACE.png?alt=media&token=544ec011-bebf-47be-ab3b-d8672af1ff14"
        alt="The Unit Locker Logo"
  width={1280}
  height={720}
className="h-20 md:h-30 w-auto object-contain"
        priority
      />
    </Link>
  </div>

  {/* RIGHT: Everything else */}
  <div className="hidden md:flex items-center space-x-8 text-base text-br-white font-medium">

    {/* Nav Links */}
    <Link href="/vip" className="hover:text-br-gold transition-colors">
      VIP Picks
    </Link>
    <Link href="/about" className="hover:text-br-gold transition-colors">
      About
    </Link>
    <Link href="/contact" className="hover:text-br-gold transition-colors">
      Contact
    </Link>

    {/* Auth Section */}
    {loading ? (
      <AuthSkeleton />
    ) : !user ? (
      <>
        <Link
          href="/get-started"
          className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-500 text-br-black px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:brightness-105 transition-all duration-300"
        >
          Signup
        </Link>
        <Link
          href="/login"
          className="bg-gray-800 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:brightness-110 transition-all duration-300"
        >
          Login
        </Link>
      </>
    ) : (
      <Link
        href="/profile"
        className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center cursor-pointer hover:bg-gray-600 transition"
        title="Profile Settings"
      >
        <User className="h-6 w-6 text-white" />
      </Link>
    )}

  </div>

  {/* Mobile Hamburger (unchanged) */}
  <div className="md:hidden flex items-center ml-auto z-50">
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="text-br-white focus:outline-none"
      aria-label="Toggle menu"
    >
      {isOpen ? <X size={30} /> : <Menu size={30} />}
    </button>
  </div>

</nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="font-sans absolute top-full left-0 w-full bg-br-white bg-opacity-95 text-br-black flex flex-col items-center space-y-6 py-6 border-br-gold/30 shadow-xl backdrop-blur-sm transition-all duration-300 ease-in-out animate-fade-slide md:hidden">
          <Link href="/vip" className="hover:text-br-gold text-lg" onClick={() => setIsOpen(false)}>
            VIP Picks
          </Link>
          <Link href="/about" className="hover:text-br-gold text-lg" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link href="/contact" className="hover:text-br-gold text-lg" onClick={() => setIsOpen(false)}>
            Contact
          </Link>

          {loading ? (
            <AuthSkeleton />
          ) : !user ? (
            <>
              <Link
                href="/get-started"
                className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-500 text-br-black px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:brightness-105 transition-all duration-300 w-2/4 text-center"
                onClick={() => setIsOpen(false)}
              >
                Signup
              </Link>
              <Link
                href="/login"
                className="bg-gray-800 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:brightness-110 transition-all duration-300 w-2/4 text-center"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </>
          ) : (
            <>

            <Link
                href="/profile"
                className="text-lg hover:text-br-gold mt-2"
                onClick={() => setIsOpen(false)}
              >
                Profile Settings
              </Link>
              <LogoutButton />
              
              
            </>
          )}
        </div>
      )}
    </header>
  );
}
