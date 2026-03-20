// Utility to get PST date string YYYYMMDD
function getPSTDateString(offset = 0) {
  const now = new Date();
  // Convert to PST
  const pstString = now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
  const pstDate = new Date(pstString);

  // Offset (0 = today, 1 = tomorrow, etc.)
  pstDate.setDate(pstDate.getDate() + offset);

  const yyyy = pstDate.getFullYear();
  const mm = String(pstDate.getMonth() + 1).padStart(2, "0");
  const dd = String(pstDate.getDate()).padStart(2, "0");

  return `${yyyy}${mm}${dd}`;
}

// Deterministic pseudo-random generator (Mulberry32)
function mulberry32(seed) {
  let t = seed;
  return function () {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

// Shuffle array with seeded RNG
function shuffleArray(array, seed) {
  const rand = mulberry32(seed);
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default async function handler(req, res) {
  try {
    const { day } = req.query; // "today" or "tomorrow"

    // Calculate target date in PST
    const offset = day === "tomorrow" ? 1 : 0;
    const dateStr = getPSTDateString(offset);

    // Fetch ESPN scoreboard
    const espnRes = await fetch(
      `https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard?dates=${dateStr}`
    );
    if (!espnRes.ok) throw new Error("Failed to fetch ESPN scoreboard");
    const espnData = await espnRes.json();

    const games = [];

    for (const event of espnData.events) {
      const competition = event.competitions[0];
      const teamsData = [];

      for (const comp of competition.competitors) {
        const pitcherName = comp.probables?.[0]?.athlete?.displayName || "TBD";
        let whip = null;

        if (pitcherName !== "TBD") {
          const searchRes = await fetch(
            `https://statsapi.mlb.com/api/v1/people/search?names=${encodeURIComponent(pitcherName)}`
          );
          if (searchRes.ok) {
            const searchData = await searchRes.json();
            const playerId = searchData.people?.[0]?.id;

            if (playerId) {
              const statsRes = await fetch(
                `https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=season&season=${new Date().getFullYear()}&group=pitching`
              );
              if (statsRes.ok) {
                const statsData = await statsRes.json();
                whip = statsData.stats?.[0]?.splits?.[0]?.stat?.whip || null;
              }
            }
          }
        }

        teamsData.push({
          team: comp.team.displayName,
          pitcher: pitcherName,
          whip: whip ? parseFloat(whip) : null,
        });
      }

      const [teamA, teamB] = teamsData;
      if (teamA.whip != null && teamB.whip != null) {
        const suggestedPick = teamA.whip < teamB.whip ? teamA.team : teamB.team;

        games.push({
          matchup: `${teamA.team} vs ${teamB.team}`,
          teams: teamsData,
          suggestedPick,
          gameDate: dateStr,
        });
      }
    }


const seed = parseInt(dateStr, 10);


const shuffledGames = shuffleArray(games, seed);


const limitedGames = shuffledGames.slice(0, 6);

res.status(200).json({ games: limitedGames });


  } catch (err) {
    console.error("MLB Picks API Error:", err);
    res.status(500).json({ error: err.message });
  }
}
