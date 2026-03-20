"use client";

import Image from "next/image";
import { useState } from "react";

export default function RecentWins() {
  const [openImage, setOpenImage] = useState(null);

  const tickets = [
    {
      sport: "Counter-Strike 2",
      bet: "Virtus Pro +1.5",
      odds: "-120",
      capper: "Bookie Reaper",
      image: "https://firebasestorage.googleapis.com/v0/b/tortas-bffc7.appspot.com/o/vpslip.jpeg?alt=media&token=d74f9dff-dc8a-45ed-a608-192d5ca7ae53",
      logo: "https://firebasestorage.googleapis.com/v0/b/tortas-bffc7.appspot.com/o/Virtus_pro_logo_new.png?alt=media&token=1f6f1f1a-0ad3-4f07-a39d-096cfe3b97b2", 
    },
    {
      sport: "MLB",
      bet: "Milwaukee Brewers ML",
      odds: "+105",
      capper: "Tommy Winner",
      image: "https://firebasestorage.googleapis.com/v0/b/tortas-bffc7.appspot.com/o/brewersslip.jpeg?alt=media&token=e66fd360-607f-4169-85df-86e92a83114b",
      logo: "https://firebasestorage.googleapis.com/v0/b/tortas-bffc7.appspot.com/o/milwaukee-brewers-logo-transparent.png?alt=media&token=989c87ac-db52-45f7-9b60-af9d094e4aef", 
    },
    {
      sport: "MLB",
      bet: "Athletics ML",
      odds: "+100",
      capper: "Bookie Reaper",
      image: "https://firebasestorage.googleapis.com/v0/b/tortas-bffc7.appspot.com/o/athelticsslip.jpeg?alt=media&token=73546153-6041-4335-bb88-fea75081404b",
      logo: "https://firebasestorage.googleapis.com/v0/b/tortas-bffc7.appspot.com/o/oakland-athletics-logo-transparent.png?alt=media&token=5026f731-5f2e-4a09-91de-f40739391477", 
    },
    {
      sport: "MLB",
      bet: "Chicago Cubs ML",
      odds: "+120",
      capper: "Tommy Winner",
      image: "https://firebasestorage.googleapis.com/v0/b/tortas-bffc7.appspot.com/o/cubsslip.jpeg?alt=media&token=841f2adc-82e9-4522-8af0-daf4a682cc2d",
      logo: "https://firebasestorage.googleapis.com/v0/b/tortas-bffc7.appspot.com/o/chicago-cubs-logo-transparent.png?alt=media&token=1d7996e2-1b52-4d51-9993-30a6c7f2db87", 
    },
  ];

  return (
    <section className="bg-gray-900 text-white py-20 relative">
      {/* Optional gradient to blend with previous section */}
      <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-gray-950 to-gray-900"></div>

      <div className="max-w-6xl mx-auto px-6 text-center relative">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          Recent Wins
        </h2>
        <p className="text-gray-400 text-lg md:text-xl mb-12">
          See what our cappers have been hitting lately. Real results, across multiple sports.
        </p>

        {/* Ticket Grid */}
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
  {tickets.map((ticket, i) => (
    <div
      key={i}
      className="cursor-pointer w-full rounded-3xl overflow-hidden shadow-xl bg-gray-800 transform transition hover:scale-105 hover:shadow-emerald-500/50 duration-300 flex flex-col"
      onClick={() => setOpenImage(ticket.image)}
    >
         <div className="relative w-full h-56 bg-gray-900 p-2 group overflow-hidden rounded-t-3xl">
  <Image
    src={ticket.image}
    alt={`${ticket.sport} Winning Ticket`}
    layout="fill"
    objectFit="contain"
    className="block"
    priority
  />
  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
    <p className="text-white font-semibold text-sm">Click to enlarge</p>
  </div>
</div>





              {/* Text container with logo */}
              <div className="p-4 text-center bg-gray-800 flex flex-col items-center justify-center flex-grow">
                {ticket.logo && (
                  <Image
                    src={ticket.logo}
                    alt={`${ticket.sport} Logo`}
                    width={36}
                    height={36}
                    className="rounded-full mb-2"
                  />
                )}
                <p className="text-green-500 font-semibold text-lg mb-1">{ticket.sport}</p>
                <p className="font-bold text-lg">{ticket.bet}</p>
                <p className="text-gray-300 mt-1">Odds: {ticket.odds}</p>
                <p className="text-gray-400 mt-2 text-sm">Capper: {ticket.capper}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Animated Lightbox */}
        {openImage && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 transition-opacity duration-300 opacity-100"
            onClick={() => setOpenImage(null)}
          >
            <div className="relative w-11/12 max-w-4xl h-auto animate-fadeIn">
              <Image
                src={openImage}
                alt="Winning Ticket"
                layout="responsive"
                width={1024}
                height={768}
                objectFit="contain"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <a
            href="/login"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full text-lg shadow-lg transition transform hover:scale-105"
          >
            Login to Access Full Picks
          </a>
        </div>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}
