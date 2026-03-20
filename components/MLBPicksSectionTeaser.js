"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

function getPSTLabel(offset = 0) {
  const now = new Date();
  const pstString = now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
  const pstDate = new Date(pstString);
  pstDate.setDate(pstDate.getDate() + offset);

  return pstDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function MLBPicksTeaser() {
  const [day, setDay] = useState("today");

  const teaserGames = [
    { teams: ["LAD", "SF"], pitcher: ["Buehler", "Gonsolin"] },
    { teams: ["NYY", "BOS"], pitcher: ["Cortez", "Eovaldi"] },
    { teams: ["CHC", "STL"], pitcher: ["Lester", "Wainwright"] },
  ];

  return (
    <section className="text-white py-16 px-6 mx-auto flex flex-col bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="flex flex-col items-center mb-4">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/tortas-bffc7.appspot.com/o/Major_League_Baseball_logo.svg?alt=media&token=ae09fcf5-09a4-47d2-93c3-19e52f8d9dc2"
          alt="MLB Logo"
          width={172}
          height={93}
          className="w-40 h-auto md:w-44"
        />
        <h2 className="text-3xl mb-4 text-white md:text-4xl font-bold text-center mt-2">
          MLB Edge Preview: {day === "today" ? getPSTLabel(0) : getPSTLabel(1)}
        </h2>
        <p className="text-gray-400 text-center mb-8 max-w-xl">
          Get a sneak peek of our premium MLB Edge Picks! Sign up to unlock full access to daily picks, projections, and insights.
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setDay("today")}
          className={`px-6 py-2 rounded-full cursor-pointer font-semibold transition ${
            day === "today"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          {getPSTLabel(0)}
        </button>
        <button
          onClick={() => setDay("tomorrow")}
          className={`px-6 py-2 rounded-full cursor-pointer font-semibold transition ${
            day === "tomorrow"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          {getPSTLabel(1)}
        </button>
      </div>

      {/* Teaser Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {teaserGames.map((game, i) => (
          <div
            key={i}
            className="relative bg-gray-800 rounded-2xl p-4 shadow-xl flex flex-col justify-between overflow-hidden group"
          >
            {/* Fake data blurred */}
            <div className="text-center mb-4 opacity-70">
              <div className="flex justify-around mt-2 blur-sm">
                {game.teams.map((team, j) => (
                  <div key={j} className="text-center">
                    <p className="text-gray-300 font-semibold">{team}</p>
                    <p className="text-gray-400 text-sm">{game.pitcher[j]}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-center mt-4 text-green-500 font-bold blur-sm opacity-70">
              Suggested Pick: TBD
            </p>

            {/* Lock Premium badge + Link */}
            <Link href="/get-started" className="absolute inset-0 flex items-center justify-center pointer-events-auto">
              <div className="bg-gray-900 bg-opacity-50 rounded-xl px-4 py-2 group-hover:bg-opacity-70 transition-all">
                <span className="text-yellow-400 font-bold text-2xl">🔒 Premium</span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Unlock CTA Button */}
      <div className="flex justify-center">
        <Link
          href="/get-started"
          className="bg-green-600 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:brightness-105 transition-all duration-300"
        >
         Get Started
        </Link>
      </div>
    </section>
  );
}
