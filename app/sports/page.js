export default function SportsSection() {
  const sports = [
    { name: "NFL", icon: "🏈", desc: "Weekly player props, spreads, and totals." },
    { name: "NCAAF", icon: "🎓", desc: "College football picks and value lines." },
    { name: "NCAAB", icon: "🏀", desc: "College basketball picks & March Madness plays." },
    { name: "Counter-Strike 2", icon: "🎯", desc: "Esports betting edges and team props." },
    { name: "NHL", icon: "🏒", desc: "Daily goal, assist, and shot props." },
    { name: "MLB", icon: "⚾", desc: "Strikeout props, run lines, and sharp over/unders." },
    { name: "Boxing", icon: "🥊", desc: "Fight breakdowns, round props, and moneyline edges." },
    { name: "Soccer", icon: "⚽", desc: "Premier League, Champions League, and more." },
  ];

  return (
    <section className="py-50 bg-[#0a0a0a] text-white" id="sports">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Sports We Cover
        </h2>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          From pro leagues to esports, The Bookie Reaper delivers
          betting insights across multiple sports.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {sports.map((sport) => (
            <div
              key={sport.name}
              className="bg-[#121212] hover:bg-[#1e1e1e] transition-all rounded-2xl p-6 flex flex-col items-center text-center shadow-lg"
            >
              <div className="text-5xl mb-3">{sport.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{sport.name}</h3>
              <p className="text-sm text-gray-400">{sport.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
