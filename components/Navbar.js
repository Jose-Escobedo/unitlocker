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
    <header className="fixed top-0 left-0 w-full z-50 bg-br-white shadow-md px-6 md:px-12 py-6 min-h-[115px] font-sans">
      <nav className="relative max-w-7xl mx-auto flex items-center justify-between h-full min-h-[115px]">
        {/* Left Links */}
        <div className="hidden md:flex space-x-8 text-base text-br-black font-medium flex-shrink-0 max-w-[280px] items-center">
          <Link href="/vip" className="whitespace-nowrap hover:text-br-gold transition-colors">
            VIP Picks
          </Link>
          <Link href="/about" className="whitespace-nowrap hover:text-br-gold transition-colors">
            About
          </Link>
          <Link href="/contact" className="whitespace-nowrap hover:text-br-gold transition-colors">
            Contact
          </Link>
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-shrink-0">
          <Link href="/" className="inline-block">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/tortas-bffc7.appspot.com/o/bookie%20reaper%20FIRST%20EDITION%20CLIP.png?alt=media&token=dae042e5-6e99-434e-ac92-1f3b1c4e9e2e"
              alt="The Bookie Reaper Logo"
              width={160}
              height={160}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Right nav - desktop */}
        <div className="hidden md:flex text-base font-medium justify-end flex-shrink-0 max-w-[280px] space-x-4 items-center">
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
            <>

              <Link
  href="/profile"
  className="ml-4 w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center cursor-pointer hover:bg-gray-600 transition"
  title="Profile Settings"
>
  <User className="h-6 w-6 text-white" />
</Link>
              
           
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center ml-auto z-50">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-br-black focus:outline-none"
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
