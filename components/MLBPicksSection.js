"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Helper: get PST date string in format "Mon, Sep 16"
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


export default function MLBPicksSection() {
  const [day, setDay] = useState("today"); // "today" or "tomorrow"
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);

  const fetchPicks = async (selectedDay) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/picks/mlb?day=${selectedDay}`);
      if (!res.ok) throw new Error("Failed to fetch MLB picks");
      const data = await res.json();
      setGames(data.games || []);
    } catch (err) {
      console.error(err);
      setError("Could not load MLB picks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPicks(day);
  }, [day]);

  return (
    <section className="text-white py-16 px-6 max-w-6xl mx-auto">
     <div className="flex flex-col items-center mb-4">
  <Image
    src="https://firebasestorage.googleapis.com/v0/b/tortas-bffc7.appspot.com/o/Major_League_Baseball_logo.svg?alt=media&token=ae09fcf5-09a4-47d2-93c3-19e52f8d9dc2"
    alt="MLB Logo"
    width={172}
    height={93}
    className="w-40 h-auto md:w-44"
  />
  <h2 className="text-3xl text-white-800 md:text-4xl font-bold text-center mt-2">
  MLB Pitcher Edge: {day === "today" ? getPSTLabel(0) : getPSTLabel(1)}
</h2>

</div>

      <p className="text-gray-400 text-center mb-8">
        Our data-driven model highlights pitching matchups and projected edges for{" "}
        {day === "today" ? "today's MLB slate" : "tomorrow's MLB slate"}.
      </p>

      <p className="text-gray-400 text-center mb-8 text-sm">
        Picks are based on pitchers and which pitcher should statiscally outperform the other.
        Suggested picks are based off solely on pitcher data this season.
      </p>

      {/* Toggle Buttons */}
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
  {/* Disclaimer */}
{!loading && !error && (
  <p className="text-sm pb-10 text-yellow-400 text-center mt-8 max-w-2xl mx-auto">
    ⚠️ Suggested picks may change closer to game time, as teams sometimes
    adjust their starting pitchers.
  </p>
)}

{loading && (
  <div className="flex justify-center items-center py-6">
    <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
    <span className="ml-3 text-gray-400">Loading picks...</span>
  </div>
)}

   {/* Games Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {!loading && !error && games.length === 0 && (
    <p className="text-center text-gray-400 col-span-full">
      No suggested picks for this date.
    </p>
  )}



  {!loading &&
    !error &&
    games.map((game, i) => (
      <div
        key={i}
        className="bg-gray-800 rounded-2xl p-4 shadow-xl hover:scale-105 transform transition duration-300 flex flex-col justify-between"
      >
        <div className="text-center mb-4">
          <div className="flex justify-around mt-2">
            {game.teams.map((team, j) => (
              <div key={j} className="text-center">
                <p className="text-gray-300 font-semibold">{team.team}</p>
                <p className="text-gray-400 text-sm">{team.pitcher}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center mt-4 text-green-500 font-bold">
          Suggested Pick: {game.suggestedPick}
        </p>
      </div>
    ))}
</div>



    </section>
  );
}
