// ── Sports Teams Database ──
// Used for game event autocomplete in the log bet modal

export const TEAMS = {
  NBA: [
    'Atlanta Hawks', 'Boston Celtics', 'Brooklyn Nets', 'Charlotte Hornets',
    'Chicago Bulls', 'Cleveland Cavaliers', 'Dallas Mavericks', 'Denver Nuggets',
    'Detroit Pistons', 'Golden State Warriors', 'Houston Rockets', 'Indiana Pacers',
    'LA Clippers', 'Los Angeles Lakers', 'Memphis Grizzlies', 'Miami Heat',
    'Milwaukee Bucks', 'Minnesota Timberwolves', 'New Orleans Pelicans', 'New York Knicks',
    'Oklahoma City Thunder', 'Orlando Magic', 'Philadelphia 76ers', 'Phoenix Suns',
    'Portland Trail Blazers', 'Sacramento Kings', 'San Antonio Spurs', 'Toronto Raptors',
    'Utah Jazz', 'Washington Wizards',
  ],
  NFL: [
    'Arizona Cardinals', 'Atlanta Falcons', 'Baltimore Ravens', 'Buffalo Bills',
    'Carolina Panthers', 'Chicago Bears', 'Cincinnati Bengals', 'Cleveland Browns',
    'Dallas Cowboys', 'Denver Broncos', 'Detroit Lions', 'Green Bay Packers',
    'Houston Texans', 'Indianapolis Colts', 'Jacksonville Jaguars', 'Kansas City Chiefs',
    'Las Vegas Raiders', 'Los Angeles Chargers', 'Los Angeles Rams', 'Miami Dolphins',
    'Minnesota Vikings', 'New England Patriots', 'New Orleans Saints', 'New York Giants',
    'New York Jets', 'Philadelphia Eagles', 'Pittsburgh Steelers', 'San Francisco 49ers',
    'Seattle Seahawks', 'Tampa Bay Buccaneers', 'Tennessee Titans', 'Washington Commanders',
  ],
  MLB: [
    'Arizona Diamondbacks', 'Atlanta Braves', 'Baltimore Orioles', 'Boston Red Sox',
    'Chicago Cubs', 'Chicago White Sox', 'Cincinnati Reds', 'Cleveland Guardians',
    'Colorado Rockies', 'Detroit Tigers', 'Houston Astros', 'Kansas City Royals',
    'Los Angeles Angels', 'Los Angeles Dodgers', 'Miami Marlins', 'Milwaukee Brewers',
    'Minnesota Twins', 'New York Mets', 'New York Yankees', 'Oakland Athletics',
    'Philadelphia Phillies', 'Pittsburgh Pirates', 'San Diego Padres', 'San Francisco Giants',
    'Seattle Mariners', 'St. Louis Cardinals', 'Tampa Bay Rays', 'Texas Rangers',
    'Toronto Blue Jays', 'Washington Nationals',
  ],
  NHL: [
    'Anaheim Ducks', 'Arizona Coyotes', 'Boston Bruins', 'Buffalo Sabres',
    'Calgary Flames', 'Carolina Hurricanes', 'Chicago Blackhawks', 'Colorado Avalanche',
    'Columbus Blue Jackets', 'Dallas Stars', 'Detroit Red Wings', 'Edmonton Oilers',
    'Florida Panthers', 'Los Angeles Kings', 'Minnesota Wild', 'Montreal Canadiens',
    'Nashville Predators', 'New Jersey Devils', 'New York Islanders', 'New York Rangers',
    'Ottawa Senators', 'Philadelphia Flyers', 'Pittsburgh Penguins', 'San Jose Sharks',
    'Seattle Kraken', 'St. Louis Blues', 'Tampa Bay Lightning', 'Toronto Maple Leafs',
    'Utah Hockey Club', 'Vancouver Canucks', 'Vegas Golden Knights', 'Washington Capitals',
    'Winnipeg Jets',
  ],
  Soccer: [
    // MLS
    'Atlanta United', 'Austin FC', 'Charlotte FC', 'Chicago Fire',
    'Colorado Rapids', 'Columbus Crew', 'D.C. United', 'FC Cincinnati',
    'FC Dallas', 'Houston Dynamo', 'Inter Miami', 'LA Galaxy',
    'LAFC', 'Minnesota United', 'Montreal Impact', 'Nashville SC',
    'New England Revolution', 'New York City FC', 'New York Red Bulls', 'Orlando City',
    'Philadelphia Union', 'Portland Timbers', 'Real Salt Lake', 'San Jose Earthquakes',
    'Seattle Sounders', 'Sporting Kansas City', 'St. Louis City', 'Toronto FC',
    'Vancouver Whitecaps',
    // Premier League
    'Arsenal', 'Aston Villa', 'Bournemouth', 'Brentford',
    'Brighton', 'Chelsea', 'Crystal Palace', 'Everton',
    'Fulham', 'Ipswich Town', 'Leicester City', 'Liverpool',
    'Manchester City', 'Manchester United', 'Newcastle United', 'Nottingham Forest',
    'Southampton', 'Tottenham Hotspur', 'West Ham United', 'Wolverhampton',
    // La Liga
    'Athletic Bilbao', 'Atletico Madrid', 'Barcelona', 'Celta Vigo',
    'Getafe', 'Girona', 'Las Palmas', 'Leganes',
    'Mallorca', 'Osasuna', 'Rayo Vallecano', 'Real Betis',
    'Real Madrid', 'Real Sociedad', 'Real Valladolid', 'Sevilla',
    'Espanyol', 'Valencia', 'Villarreal',
    // Serie A
    'AC Milan', 'Atalanta', 'Bologna', 'Cagliari',
    'Como', 'Empoli', 'Fiorentina', 'Genoa',
    'Hellas Verona', 'Inter Milan', 'Juventus', 'Lazio',
    'Lecce', 'Monza', 'Napoli', 'Parma',
    'Roma', 'Torino', 'Udinese', 'Venezia',
    // Bundesliga
    'Augsburg', 'Bayer Leverkusen', 'Bayern Munich', 'Borussia Dortmund',
    'Borussia Monchengladbach', 'Eintracht Frankfurt', 'Freiburg', 'Hoffenheim',
    'Holstein Kiel', 'Mainz', 'RB Leipzig', 'St. Pauli',
    'Stuttgart', 'Union Berlin', 'Werder Bremen', 'Wolfsburg',
    // Ligue 1
    'Angers', 'AS Monaco', 'Auxerre', 'Brest',
    'Le Havre', 'Lens', 'Lille', 'Lyon',
    'Marseille', 'Montpellier', 'Nantes', 'Nice',
    'Paris Saint-Germain', 'Reims', 'Rennes', 'Saint-Etienne',
    'Strasbourg', 'Toulouse',
  ],
  Tennis: [
    // ATP Top players
    'Novak Djokovic', 'Carlos Alcaraz', 'Jannik Sinner', 'Daniil Medvedev',
    'Alexander Zverev', 'Andrey Rublev', 'Holger Rune', 'Casper Ruud',
    'Stefanos Tsitsipas', 'Grigor Dimitrov', 'Taylor Fritz', 'Ben Shelton',
    'Frances Tiafoe', 'Tommy Paul', 'Ugo Humbert', 'Sebastian Korda',
    'Alex de Minaur', 'Felix Auger-Aliassime', 'Nick Kyrgios', 'Denis Shapovalov',
    // WTA Top players
    'Aryna Sabalenka', 'Iga Swiatek', 'Coco Gauff', 'Elena Rybakina',
    'Jessica Pegula', 'Mirra Andreeva', 'Emma Navarro', 'Daria Kasatkina',
    'Barbora Krejcikova', 'Jelena Ostapenko', 'Madison Keys', 'Danielle Collins',
    'Elina Svitolina', 'Beatriz Haddad Maia', 'Victoria Azarenka', 'Caroline Wozniacki',
  ],
  MMA: [
    // UFC Champions & Top Contenders
    'Jon Jones', 'Stipe Miocic', 'Tom Aspinall', 'Ciryl Gane',
    'Alex Pereira', 'Magomed Ankalaev', 'Jan Blachowicz', 'Jamahal Hill',
    'Dricus du Plessis', 'Sean Strickland', 'Israel Adesanya', 'Robert Whittaker',
    'Islam Makhachev', 'Dustin Poirier', 'Justin Gaethje', 'Max Holloway',
    'Ilia Topuria', 'Brian Ortega', 'Alexander Volkanovski', 'Yair Rodriguez',
    'Umar Nurmagomedov', 'Sean O\'Malley', 'Merab Dvalishvili', 'Cory Sandhagen',
    'Leon Edwards', 'Belal Muhammad', 'Jack Della Maddalena', 'Colby Covington',
    'Kamaru Usman', 'Shavkat Rakhimov', 'Aljamain Sterling', 'Henry Cejudo',
    // Bellator / PFL notable fighters
    'Patricio Pitbull', 'AJ McKee', 'Vadim Nemkov', 'Ryan Bader',
  ],
};

// ── Sport key map — matches modal sport labels to TEAMS keys ──
export const SPORT_KEY_MAP = {
  'NBA':    'NBA',
  'NFL':    'NFL',
  'MLB':    'MLB',
  'NHL':    'NHL',
  'Soccer': 'Soccer',
  'Tennis': 'Tennis',
  'MMA':    'MMA',
};

// ── Search teams/players by query ──
export function searchTeams(query, sport, maxResults = 6, exclude = '') {
  if (!query || query.length < 1) return [];
  const key = SPORT_KEY_MAP[sport];
  if (!key || !TEAMS[key]) return [];
  const q = query.toLowerCase();
  return TEAMS[key]
    .filter(t => t.toLowerCase().includes(q) && t !== exclude)
    .slice(0, maxResults);
}

// ── Get all teams for a sport (for opponent list) ──
export function getTeams(sport, exclude = '') {
  const key = SPORT_KEY_MAP[sport];
  if (!key || !TEAMS[key]) return [];
  return TEAMS[key].filter(t => t !== exclude);
}