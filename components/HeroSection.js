'use client';

import Link from 'next/link';
import { Flame } from 'lucide-react';

export default function HeroSection() {
  return (
   <section
  className="relative text-white mt-41 py-20 px-6 md:px-12 overflow-hidden 
             bg-center bg-cover bg-no-repeat md:bg-fixed"
  style={{
    backgroundImage:
      "url('https://firebasestorage.googleapis.com/v0/b/tortas-bffc7.appspot.com/o/baseball%20stadium-min.jpg?alt=media&token=10a30402-7422-4e56-b801-f458d0cf3f7b')",
  }}
>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative max-w-6xl mx-auto text-center flex flex-col items-center">
        <div className="flex items-center space-x-2 mb-4">
          <Flame className="text-br-gold" size={28} />
          <span className="text-br-gold uppercase tracking-widest font-medium text-sm">
            The Bookie Reaper
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Crush the Books. <br className="hidden md:block" />
          Bet with Confidence.
        </h1>

        <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-8">
          Join the exclusive community of sports bettors who get daily high-confidence picks, real-time updates, and insight.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/get-started"
            className="bg-br-gold text-br-black px-6 py-3 rounded-md font-semibold text-lg hover:bg-yellow-500 transition"
          >
            Get Started
          </Link>
          <Link
            href="/vip"
            className="text-br-gold border border-br-gold px-6 py-3 rounded-md font-semibold text-lg hover:bg-br-gold hover:text-br-black transition"
          >
            Explore VIP
          </Link>
        </div>
      </div>
    </section>
  );
}
