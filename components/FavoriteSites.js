'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Info } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function FavoriteSites() {
  const [showTooltip, setShowTooltip] = useState(false);
  const disclosureRef = useRef(null);

  const handleMouseEnter = () => {
    if (window.innerWidth >= 768) setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) setShowTooltip(false);
  };

  const handleClick = () => {
    if (window.innerWidth < 768) setShowTooltip((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (disclosureRef.current && !disclosureRef.current.contains(e.target)) {
        setShowTooltip(false);
      }
    }
    function handleScroll() {
      setShowTooltip(false);
    }

    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="py-20 px-6 md:px-12 bg-br-white text-center">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-br-black mb-12">
          Our Favorite Betting Sites
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
          {/* Bovada Card (Rank 1) */}
          <div className="relative group rounded-2xl overflow-hidden p-8 bg-[#1a1a1a] border border-br-gray hover:border-br-gold transition transform hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(212,175,55,0.4)] flex flex-col items-center">
            {/* Rank Badge */}
            <div className="absolute top-0 left-0 bg-gradient-to-r from-orange-600 to-orange-400 text-white px-3 py-1 rounded-br-md font-extrabold text-2xl shadow-md">
              1
            </div>

            {/* Bonus Badge */}
            <div className="absolute top-0 right-0 bg-orange-500 text-white px-3 py-1 rounded-bl-md font-semibold text-xs shadow-md">
              Bonus 100% Up To $1000 With BV1000
            </div>

            <Image
              src="https://firebasestorage.googleapis.com/v0/b/tortas-bffc7.appspot.com/o/logo_main_bovada.svg?alt=media&token=0c61dfe0-721c-4aff-b8e3-377b785b3d2f"
              alt="Bovada Logo"
              width={200}
              height={56}
              className="h-14 mx-auto mb-6 transition-transform group-hover:scale-105 p-1"
              priority
            />
            <p className="text-white/80 text-lg mb-6">
              Popular betting platform known for smooth user experience and bonuses.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
              <a
                href="https://www.bovada.lv/welcome/PJ8CGIA/join?extcmpid=rafcopy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-br-gold text-br-black px-3 py-2 rounded-md font-semibold text-base hover:bg-yellow-500 transition"
              >
                Play Now
              </a>
              <Link
                href="/reviews/bovada"
                className="flex-1 border border-br-gold text-br-gold px-3 py-2 rounded-md font-semibold text-base hover:bg-br-gold hover:text-br-black transition"
              >
                Read Reviews
              </Link>
            </div>
          </div>

          {/* BetOnline Card (Rank 2) */}
          <div className="relative group rounded-2xl overflow-hidden p-8 bg-[#1a1a1a] border border-br-gray hover:border-br-gold transition transform hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(212,175,55,0.4)] flex flex-col items-center">
            {/* Rank Badge */}
            <div className="absolute top-0 left-0 bg-gray-500 text-white px-3 py-1 rounded-br-md font-extrabold text-2xl shadow-md">
              2
            </div>

            {/* Bonus Badge */}
            <div className="absolute top-0 right-0 bg-orange-500 text-white px-3 py-1 rounded-bl-md font-semibold text-xs shadow-md">
              Bonus 50% Up To $1000
            </div>

            <Image
              src="https://firebasestorage.googleapis.com/v0/b/tortas-bffc7.appspot.com/o/betonline_logo.svg?alt=media&token=6aacb2b7-75fc-4f8d-969e-9d1d73b4ff70"
              alt="BetOnline Logo"
              width={200}
              height={56}
              className="h-14 mx-auto mb-6 transition-transform group-hover:scale-105"
            />
            <p className="text-white/80 text-lg mb-6">
              Trusted sportsbook offering competitive lines and fast payouts.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
              <a
                href="https://www.betonline.ag/?RAF=A11CD6E5&product=SPO"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-br-gold text-br-black px-3 py-2 rounded-md font-semibold text-base hover:bg-yellow-500 transition"
              >
                Play Now
              </a>
              <Link
                href="/reviews/betonline"
                className="flex-1 border border-br-gold text-br-gold px-3 py-2 rounded-md font-semibold text-base hover:bg-br-gold hover:text-br-black transition"
              >
                Read Reviews
              </Link>
            </div>
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <div
          className="flex justify-center items-center relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          ref={disclosureRef}
        >
          <Info size={16} className="text-gray-500 mr-1 cursor-pointer" />
          <span className="text-sm text-gray-600 cursor-pointer">
            Affiliate Disclosure
          </span>

          {showTooltip && (
            <div className="absolute bottom-full mb-2 w-64 bg-white text-gray-800 text-sm rounded-lg shadow-lg p-3 border border-gray-200 z-20">
              <div className="absolute -bottom-2 left-3 w-3 h-3 bg-white border-l border-b border-gray-200 rotate-45"></div>
              <p>
                This page contains affiliate links. If you make a deposit through one of these links, we may earn a commission at no extra cost to you. These commissions support content creation and ensure we can continue to provide up-to-date information.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
