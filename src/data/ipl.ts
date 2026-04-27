// CRCK.IQ — All hardcoded IPL data (2008–2025)
// Stats are based on real IPL career numbers (updated for 2025).

export type TeamCode =
  | "MI" | "CSK" | "KKR" | "RCB" | "SRH" | "DC" | "RR" | "PBKS" | "GT" | "LSG"
  | "DCH" | "PWI" | "GL" | "RPS" | "KTK";

export interface Team {
  code: TeamCode;
  name: string;
  short: string;
  color: string;
  city: string;
  titles: number;
  totalWins: number;
}

export const TEAMS: Team[] = [
  { code: "MI",   name: "Mumbai Indians",        short: "MI",   color: "#004BA0", city: "Mumbai",     titles: 5, totalWins: 144 },
  { code: "CSK",  name: "Chennai Super Kings",   short: "CSK",  color: "#F9CD05", city: "Chennai",    titles: 5, totalWins: 138 },
  { code: "KKR",  name: "Kolkata Knight Riders", short: "KKR",  color: "#3B1F76", city: "Kolkata",    titles: 3, totalWins: 124 },
  { code: "RCB",  name: "Royal Challengers Bengaluru", short: "RCB",  color: "#EC1C24", city: "Bengaluru",  titles: 1, totalWins: 135 },
  { code: "SRH",  name: "Sunrisers Hyderabad",   short: "SRH",  color: "#F7A721", city: "Hyderabad",  titles: 1, totalWins: 88  },
  { code: "DC",   name: "Delhi Capitals",        short: "DC",   color: "#0078BC", city: "Delhi",      titles: 0, totalWins: 109 },
  { code: "RR",   name: "Rajasthan Royals",      short: "RR",   color: "#EA1A85", city: "Jaipur",     titles: 1, totalWins: 112 },
  { code: "PBKS", name: "Punjab Kings",          short: "PBKS", color: "#ED1B24", city: "Mohali",     titles: 0, totalWins: 107 },
  { code: "GT",   name: "Gujarat Titans",        short: "GT",   color: "#1B2133", city: "Ahmedabad",  titles: 1, totalWins: 28  },
  { code: "LSG",  name: "Lucknow Super Giants",  short: "LSG",  color: "#A2EDFF", city: "Lucknow",    titles: 0, totalWins: 24  },
  { code: "DCH",  name: "Deccan Chargers",       short: "DCH",  color: "#334155", city: "Hyderabad",  titles: 1, totalWins: 29  },
  { code: "RPS",  name: "Rising Pune Supergiant", short: "RPS",  color: "#D111D1", city: "Pune",       titles: 0, totalWins: 15  },
  { code: "GL",   name: "Gujarat Lions",         short: "GL",   color: "#E63946", city: "Rajkot",     titles: 0, totalWins: 13  },
  { code: "PWI",  name: "Pune Warriors India",   short: "PWI",  color: "#2B2D42", city: "Pune",       titles: 0, totalWins: 12  },
  { code: "KTK",  name: "Kochi Tuskers Kerala",  short: "KTK",  color: "#8338EC", city: "Kochi",      titles: 0, totalWins: 6   },
];

export const TEAM_BY_CODE: Record<string, Team> = TEAMS.reduce(
  (acc, t) => ({ ...acc, [t.code]: t }),
  {} as Record<string, Team>,
);

// Champions per season
export interface Champion {
  year: number;
  champion: TeamCode;
  runnerUp: TeamCode;
  venue: string;
  potm: string;
  captain?: string;
  score?: string;
  note?: string;
}

export const CHAMPIONS: Champion[] = [
  { year: 2008, champion: "RR",   runnerUp: "CSK",  venue: "DY Patil Stadium",        potm: "Yusuf Pathan", captain: "Shane Warne" },
  { year: 2009, champion: "DCH",  runnerUp: "RCB",  venue: "Wanderers, South Africa", potm: "Anil Kumble", captain: "Adam Gilchrist" },
  { year: 2010, champion: "CSK",  runnerUp: "MI",   venue: "DY Patil Stadium",        potm: "Suresh Raina", captain: "MS Dhoni" },
  { year: 2011, champion: "CSK",  runnerUp: "RCB",  venue: "MA Chidambaram Stadium",  potm: "Murali Vijay", captain: "MS Dhoni" },
  { year: 2012, champion: "KKR",  runnerUp: "CSK",  venue: "MA Chidambaram Stadium",  potm: "Manvinder Bisla", captain: "Gautam Gambhir" },
  { year: 2013, champion: "MI",   runnerUp: "CSK",  venue: "Eden Gardens",            potm: "Kieron Pollard", captain: "Rohit Sharma" },
  { year: 2014, champion: "KKR",  runnerUp: "PBKS", venue: "M Chinnaswamy Stadium",   potm: "Manish Pandey", captain: "Gautam Gambhir" },
  { year: 2015, champion: "MI",   runnerUp: "CSK",  venue: "Eden Gardens",            potm: "Rohit Sharma", captain: "Rohit Sharma" },
  { year: 2016, champion: "SRH",  runnerUp: "RCB",  venue: "IS Bindra Stadium",       potm: "Ben Cutting", captain: "David Warner" },
  { year: 2017, champion: "MI",   runnerUp: "RPS",  venue: "Rajiv Gandhi Intl Stadium", potm: "Krunal Pandya", captain: "Rohit Sharma" },
  { year: 2018, champion: "CSK",  runnerUp: "SRH",  venue: "Wankhede Stadium",        potm: "Shane Watson", captain: "MS Dhoni" },
  { year: 2019, champion: "MI",   runnerUp: "CSK",  venue: "Rajiv Gandhi Intl Stadium", potm: "Jasprit Bumrah", captain: "Rohit Sharma" },
  { year: 2020, champion: "MI",   runnerUp: "DC",   venue: "Dubai International Stadium", potm: "Ishan Kishan", captain: "Rohit Sharma" },
  { year: 2021, champion: "CSK",  runnerUp: "KKR",  venue: "Dubai International Stadium", potm: "Faf du Plessis", captain: "MS Dhoni" },
  { year: 2022, champion: "GT",   runnerUp: "RR",   venue: "Narendra Modi Stadium",    potm: "Hardik Pandya", captain: "Hardik Pandya" },
  { year: 2023, champion: "CSK",  runnerUp: "GT",   venue: "Narendra Modi Stadium",    potm: "Devon Conway", captain: "MS Dhoni" },
  { year: 2024, champion: "KKR",  runnerUp: "SRH",  venue: "MA Chidambaram Stadium",  potm: "Mitchell Starc", captain: "Shreyas Iyer" },
  { year: 2025, champion: "RCB",  runnerUp: "PBKS", venue: "Narendra Modi Stadium, Ahmedabad", potm: "Krunal Pandya", captain: "Rajat Patidar", score: "RCB 190/9 beat PBKS 184/7 by 6 runs", note: "RCB's maiden title after 18 years" },
];

// Season match counts (realistic)
export const SEASON_MATCHES: { year: number; matches: number; note?: string }[] = [
  { year: 2008, matches: 59 },
  { year: 2009, matches: 57 },
  { year: 2010, matches: 60 },
  { year: 2011, matches: 74, note: "2 new teams added" },
  { year: 2012, matches: 76 },
  { year: 2013, matches: 76 },
  { year: 2014, matches: 60, note: "2 teams removed" },
  { year: 2015, matches: 59 },
  { year: 2016, matches: 60 },
  { year: 2017, matches: 59 },
  { year: 2018, matches: 60 },
  { year: 2019, matches: 60 },
  { year: 2020, matches: 60 },
  { year: 2021, matches: 60 },
  { year: 2022, matches: 74, note: "2 new franchises" },
  { year: 2023, matches: 74 },
  { year: 2024, matches: 74 },
  { year: 2025, matches: 74, note: "RCB Maiden Title" },
];

// Toss bat-first vs chase wins by year
export const TOSS_IMPACT = [
  { year: 2008, batFirst: 33, chase: 26 },
  { year: 2009, batFirst: 30, chase: 27 },
  { year: 2010, batFirst: 31, chase: 29 },
  { year: 2011, batFirst: 38, chase: 36 },
  { year: 2012, batFirst: 36, chase: 40 },
  { year: 2013, batFirst: 34, chase: 42 },
  { year: 2014, batFirst: 26, chase: 34 },
  { year: 2015, batFirst: 27, chase: 32 },
  { year: 2016, batFirst: 28, chase: 32 },
  { year: 2017, batFirst: 25, chase: 34 },
  { year: 2018, batFirst: 27, chase: 33 },
  { year: 2019, batFirst: 26, chase: 34 },
  { year: 2020, batFirst: 22, chase: 38 },
  { year: 2021, batFirst: 24, chase: 36 },
  { year: 2022, batFirst: 32, chase: 42 },
  { year: 2023, batFirst: 30, chase: 44 },
  { year: 2024, batFirst: 35, chase: 39 },
  { year: 2025, batFirst: 31, chase: 43 },
];

// Batters
export interface Batter {
  name: string;
  short: string;
  team: TeamCode;
  runs: number;
  sr: number;
  matches: number;
  hundreds: number;
  highest: number;
  sixes: number;
  avg: number;
  seasons: string;
}

export const BATTERS: Batter[] = [
  { name: "Virat Kohli",      short: "Kohli",     team: "RCB",  runs: 8100, sr: 130.4, matches: 252, hundreds: 8, highest: 113, sixes: 278, avg: 37.2, seasons: "2008–25" },
  { name: "Shikhar Dhawan",   short: "Dhawan",    team: "PBKS", runs: 6769, sr: 127.4, matches: 226, hundreds: 2, highest: 106, sixes: 152, avg: 34.9, seasons: "2008–24" },
  { name: "David Warner",     short: "Warner",    team: "DC",   runs: 6564, sr: 140.0, matches: 184, hundreds: 4, highest: 126, sixes: 236, avg: 41.9, seasons: "2009–24" },
  { name: "Rohit Sharma",     short: "Rohit",     team: "MI",   runs: 6211, sr: 130.6, matches: 243, hundreds: 2, highest: 109, sixes: 257, avg: 29.8, seasons: "2008–24" },
  { name: "Suresh Raina",     short: "Raina",     team: "CSK",  runs: 5528, sr: 136.7, matches: 205, hundreds: 1, highest: 100, sixes: 203, avg: 32.5, seasons: "2008–21" },
  { name: "AB de Villiers",   short: "ABD",       team: "RCB",  runs: 5162, sr: 151.7, matches: 184, hundreds: 3, highest: 133, sixes: 251, avg: 39.7, seasons: "2008–21" },
  { name: "MS Dhoni",         short: "Dhoni",     team: "CSK",  runs: 5243, sr: 135.9, matches: 250, hundreds: 0, highest: 84,  sixes: 252, avg: 38.1, seasons: "2008–25" },
  { name: "KL Rahul",         short: "Rahul",     team: "LSG",  runs: 4863, sr: 136.3, matches: 132, hundreds: 4, highest: 132, sixes: 197, avg: 47.2, seasons: "2013–24" },
  { name: "Jos Buttler",      short: "Buttler",   team: "RR",   runs: 3582, sr: 149.1, matches: 83,  hundreds: 6, highest: 124, sixes: 161, avg: 46.5, seasons: "2016–24" },
  { name: "Sai Sudharsan",    short: "Sai",       team: "GT",   runs: 1904, sr: 138.5, matches: 50,  hundreds: 2, highest: 103, sixes: 64,  avg: 43.2, seasons: "2022–25" },
  { name: "Faf du Plessis",   short: "Faf",       team: "RCB",  runs: 4510, sr: 136.2, matches: 160, hundreds: 1, highest: 96,  sixes: 165, avg: 35.8, seasons: "2012–25" },
  { name: "Sanju Samson",     short: "Samson",    team: "RR",   runs: 4210, sr: 140.5, matches: 168, hundreds: 3, highest: 119, sixes: 182, avg: 31.2, seasons: "2013–25" },
];

// Bowlers
export interface Bowler {
  name: string;
  short: string;
  team: TeamCode;
  wickets: number;
  economy: number;
  matches: number;
  type: "Pace" | "Spin";
  potm?: string;
}

export const BOWLERS: Bowler[] = [
  { name: "Yuzvendra Chahal",     short: "Chahal",   team: "RR",  wickets: 205, economy: 7.59, matches: 160, type: "Spin" },
  { name: "Dwayne Bravo",         short: "Bravo",    team: "CSK", wickets: 183, economy: 8.38, matches: 161, type: "Pace" },
  { name: "Lasith Malinga",       short: "Malinga",  team: "MI",  wickets: 170, economy: 7.14, matches: 122, type: "Pace" },
  { name: "Bhuvneshwar Kumar",    short: "Bhuvi",    team: "SRH", wickets: 181, economy: 7.32, matches: 176, type: "Pace" },
  { name: "Amit Mishra",          short: "Mishra",   team: "DC",  wickets: 166, economy: 7.35, matches: 154, type: "Spin" },
  { name: "Piyush Chawla",        short: "Chawla",   team: "KKR", wickets: 157, economy: 7.86, matches: 165, type: "Spin" },
  { name: "Harbhajan Singh",      short: "Bhajji",   team: "MI",  wickets: 150, economy: 7.04, matches: 163, type: "Spin" },
  { name: "Jasprit Bumrah",       short: "Bumrah",   team: "MI",  wickets: 159, economy: 7.36, matches: 135, type: "Pace" },
  { name: "Harshal Patel",        short: "Harshal",  team: "PBKS", wickets: 156, economy: 8.55, matches: 118, type: "Pace" },
  { name: "Rashid Khan",          short: "Rashid",   team: "GT",  wickets: 142, economy: 6.33, matches: 120, type: "Spin" },
  { name: "Prasidh Krishna",      short: "Prasidh",  team: "RCB", wickets: 109, economy: 8.82, matches: 87,  type: "Pace" },
  { name: "Mohammed Shami",       short: "Shami",    team: "GT",  wickets: 115, economy: 8.03, matches: 104, type: "Pace" },
];

// Orange & Purple Caps
export const ORANGE_CAP = [
  { year: 2008, player: "Shaun Marsh",      team: "PBKS" as TeamCode, runs: 616, sr: 139.7, matches: 11 },
  { year: 2009, player: "Matthew Hayden",   team: "CSK" as TeamCode,  runs: 572, sr: 144.8, matches: 12 },
  { year: 2010, player: "Sachin Tendulkar", team: "MI" as TeamCode,   runs: 618, sr: 132.6, matches: 15 },
  { year: 2011, player: "Chris Gayle",      team: "RCB" as TeamCode,  runs: 608, sr: 183.1, matches: 12 },
  { year: 2012, player: "Chris Gayle",      team: "RCB" as TeamCode,  runs: 733, sr: 160.7, matches: 15 },
  { year: 2013, player: "Michael Hussey",   team: "CSK" as TeamCode,  runs: 733, sr: 129.5, matches: 17 },
  { year: 2014, player: "Robin Uthappa",    team: "KKR" as TeamCode,  runs: 660, sr: 137.8, matches: 16 },
  { year: 2015, player: "David Warner",     team: "SRH" as TeamCode,  runs: 562, sr: 156.5, matches: 14 },
  { year: 2016, player: "Virat Kohli",      team: "RCB" as TeamCode,  runs: 973, sr: 152.0, matches: 16 },
  { year: 2017, player: "David Warner",     team: "SRH" as TeamCode,  runs: 641, sr: 141.8, matches: 14 },
  { year: 2018, player: "Kane Williamson",  team: "SRH" as TeamCode,  runs: 735, sr: 142.4, matches: 17 },
  { year: 2019, player: "David Warner",     team: "SRH" as TeamCode,  runs: 692, sr: 143.9, matches: 12 },
  { year: 2020, player: "KL Rahul",         team: "PBKS" as TeamCode, runs: 670, sr: 129.3, matches: 14 },
  { year: 2021, player: "Ruturaj Gaikwad",  team: "CSK" as TeamCode,  runs: 635, sr: 136.3, matches: 16 },
  { year: 2022, player: "Jos Buttler",      team: "RR" as TeamCode,   runs: 863, sr: 149.0, matches: 17 },
  { year: 2023, player: "Shubman Gill",     team: "GT" as TeamCode,   runs: 890, sr: 157.8, matches: 17 },
  { year: 2024, player: "Virat Kohli",      team: "RCB" as TeamCode,  runs: 741, sr: 154.7, matches: 15 },
  { year: 2025, player: "Sai Sudharsan",    team: "GT" as TeamCode,   runs: 759, sr: 148.5, matches: 16 },
];

export const PURPLE_CAP = [
  { year: 2008, player: "Sohail Tanvir",     team: "RR" as TeamCode,   wickets: 22, economy: 6.46 },
  { year: 2009, player: "RP Singh",          team: "DCH" as TeamCode,  wickets: 23, economy: 6.98 },
  { year: 2010, player: "Pragyan Ojha",      team: "DCH" as TeamCode,  wickets: 21, economy: 7.29 },
  { year: 2011, player: "Lasith Malinga",    team: "MI" as TeamCode,   wickets: 28, economy: 5.95 },
  { year: 2012, player: "Morne Morkel",      team: "DC" as TeamCode,   wickets: 25, economy: 7.19 },
  { year: 2013, player: "Dwayne Bravo",      team: "CSK" as TeamCode,  wickets: 32, economy: 7.95 },
  { year: 2014, player: "Mohit Sharma",      team: "CSK" as TeamCode,  wickets: 23, economy: 8.39 },
  { year: 2015, player: "Dwayne Bravo",      team: "CSK" as TeamCode,  wickets: 26, economy: 8.14 },
  { year: 2016, player: "Bhuvneshwar Kumar", team: "SRH" as TeamCode,  wickets: 23, economy: 7.42 },
  { year: 2017, player: "Bhuvneshwar Kumar", team: "SRH" as TeamCode,  wickets: 26, economy: 7.05 },
  { year: 2018, player: "Andrew Tye",        team: "PBKS" as TeamCode, wickets: 24, economy: 8.00 },
  { year: 2019, player: "Imran Tahir",       team: "CSK" as TeamCode,  wickets: 26, economy: 6.69 },
  { year: 2020, player: "Kagiso Rabada",     team: "DC" as TeamCode,   wickets: 30, economy: 8.34 },
  { year: 2021, player: "Harshal Patel",     team: "RCB" as TeamCode,  wickets: 32, economy: 8.14 },
  { year: 2022, player: "Yuzvendra Chahal",  team: "RR" as TeamCode,   wickets: 27, economy: 7.75 },
  { year: 2023, player: "Mohammed Shami",    team: "GT" as TeamCode,   wickets: 28, economy: 8.03 },
  { year: 2024, player: "Harshal Patel",     team: "PBKS" as TeamCode, wickets: 24, economy: 9.71 },
  { year: 2025, player: "Prasidh Krishna",   team: "RCB" as TeamCode,  wickets: 25, economy: 8.12 },
];

// Venues
export interface Venue {
  name: string;
  city: string;
  matches: number;
  avgScore: number;
  capacity: number;
  batFirstWinPct: number;
  tossWinPct: number;
}

export const VENUES: Venue[] = [
  { name: "Wankhede Stadium",                city: "Mumbai",     matches: 109, avgScore: 175, capacity: 33000, batFirstWinPct: 58, tossWinPct: 51 },
  { name: "Eden Gardens",                    city: "Kolkata",    matches: 92,  avgScore: 168, capacity: 68000, batFirstWinPct: 47, tossWinPct: 52 },
  { name: "M Chinnaswamy Stadium",           city: "Bengaluru",  matches: 89,  avgScore: 178, capacity: 40000, batFirstWinPct: 56, tossWinPct: 49 },
  { name: "Feroz Shah Kotla",                city: "Delhi",      matches: 81,  avgScore: 162, capacity: 41820, batFirstWinPct: 44, tossWinPct: 53 },
  { name: "MA Chidambaram Stadium",          city: "Chennai",    matches: 85,  avgScore: 159, capacity: 38000, batFirstWinPct: 53, tossWinPct: 50 },
  { name: "Rajiv Gandhi Intl Stadium",       city: "Hyderabad",  matches: 77,  avgScore: 165, capacity: 55000, batFirstWinPct: 50, tossWinPct: 51 },
  { name: "Sawai Mansingh Stadium",          city: "Jaipur",     matches: 58,  avgScore: 161, capacity: 30000, batFirstWinPct: 49, tossWinPct: 47 },
  { name: "Punjab Cricket Association",      city: "Mohali",     matches: 56,  avgScore: 170, capacity: 26950, batFirstWinPct: 42, tossWinPct: 50 },
  { name: "DY Patil Stadium",                city: "Mumbai",     matches: 48,  avgScore: 167, capacity: 55000, batFirstWinPct: 46, tossWinPct: 52 },
  { name: "Brabourne Stadium",               city: "Mumbai",     matches: 41,  avgScore: 172, capacity: 20000, batFirstWinPct: 51, tossWinPct: 49 },
  { name: "Narendra Modi Stadium",           city: "Ahmedabad",  matches: 54,  avgScore: 176, capacity: 132000,batFirstWinPct: 55, tossWinPct: 50 },
  { name: "BRSABV Ekana Stadium",            city: "Lucknow",    matches: 32,  avgScore: 158, capacity: 50000, batFirstWinPct: 41, tossWinPct: 48 },
];

// Head-to-Head matrix (approx wins of row vs column)
export const H2H: Record<string, Record<string, { wins: number; losses: number }>> = {
  MI:   { CSK:{wins:20,losses:18}, KKR:{wins:23,losses:9},  RCB:{wins:18,losses:15}, SRH:{wins:11,losses:11}, DC:{wins:19,losses:13}, RR:{wins:15,losses:13}, PBKS:{wins:17,losses:14}, GT:{wins:1,losses:5},  LSG:{wins:2,losses:3} },
  CSK:  { MI:{wins:18,losses:20}, KKR:{wins:17,losses:9},  RCB:{wins:20,losses:13}, SRH:{wins:13,losses:6},  DC:{wins:18,losses:9},  RR:{wins:16,losses:11}, PBKS:{wins:15,losses:13}, GT:{wins:3,losses:3},  LSG:{wins:3,losses:2} },
  KKR:  { MI:{wins:9,losses:23},  CSK:{wins:9,losses:17},  RCB:{wins:15,losses:16}, SRH:{wins:9,losses:11},  DC:{wins:18,losses:13}, RR:{wins:14,losses:10}, PBKS:{wins:18,losses:13}, GT:{wins:1,losses:3},  LSG:{wins:2,losses:1} },
  RCB:  { MI:{wins:15,losses:18}, CSK:{wins:13,losses:20}, KKR:{wins:16,losses:15}, SRH:{wins:12,losses:13}, DC:{wins:15,losses:13}, RR:{wins:16,losses:13}, PBKS:{wins:19,losses:18}, GT:{wins:4,losses:3},  LSG:{wins:4,losses:3} },
  SRH:  { MI:{wins:11,losses:11}, CSK:{wins:6,losses:13},  KKR:{wins:11,losses:9},  RCB:{wins:13,losses:12}, DC:{wins:13,losses:9},  RR:{wins:10,losses:10}, PBKS:{wins:11,losses:11}, GT:{wins:2,losses:3},  LSG:{wins:3,losses:1} },
  DC:   { MI:{wins:13,losses:19}, CSK:{wins:9,losses:18},  KKR:{wins:13,losses:18}, RCB:{wins:13,losses:15}, SRH:{wins:9,losses:13}, RR:{wins:13,losses:13}, PBKS:{wins:16,losses:15}, GT:{wins:1,losses:3},  LSG:{wins:2,losses:3} },
  RR:   { MI:{wins:13,losses:15}, CSK:{wins:11,losses:16}, KKR:{wins:10,losses:14}, RCB:{wins:13,losses:16}, SRH:{wins:10,losses:10}, DC:{wins:13,losses:13}, PBKS:{wins:13,losses:14}, GT:{wins:3,losses:3},  LSG:{wins:2,losses:2} },
  PBKS: { MI:{wins:14,losses:17}, CSK:{wins:13,losses:15}, KKR:{wins:13,losses:18}, RCB:{wins:18,losses:19}, SRH:{wins:11,losses:11}, DC:{wins:15,losses:16}, RR:{wins:14,losses:13}, GT:{wins:1,losses:3},  LSG:{wins:1,losses:3} },
  GT:   { MI:{wins:5,losses:1},   CSK:{wins:3,losses:3},   KKR:{wins:3,losses:1},   RCB:{wins:3,losses:4},   SRH:{wins:3,losses:2},   DC:{wins:3,losses:1},   RR:{wins:3,losses:3},   PBKS:{wins:3,losses:1}, LSG:{wins:3,losses:1} },
  LSG:  { MI:{wins:3,losses:2},   CSK:{wins:2,losses:3},   KKR:{wins:1,losses:2},   RCB:{wins:3,losses:4},   SRH:{wins:1,losses:3},   DC:{wins:3,losses:2},   RR:{wins:2,losses:2},   PBKS:{wins:3,losses:1}, GT:{wins:1,losses:3} },
};

// Recent form (last 5)
export const RECENT_FORM: Record<string, ("W"|"L")[]> = {
  MI:   ["L","W","L","L","W"],
  CSK:  ["W","W","L","W","W"],
  KKR:  ["W","W","W","L","W"],
  RCB:  ["W","W","W","W","W"],
  SRH:  ["L","W","W","L","W"],
  DC:   ["L","L","W","W","L"],
  RR:   ["W","L","W","L","W"],
  PBKS: ["L","L","W","L","L"],
  GT:   ["W","L","W","L","L"],
  LSG:  ["L","W","L","W","L"],
};

// KPIs
export const KPIS = {
  totalMatches: 1171,
  totalSeasons: 18,
  totalSixes: 13620,
  highestScore: { score: 287, teams: "SRH vs RCB" },
  mostTitles: { team: "MI & CSK", titles: 5 },
  mostRuns: { player: "V. Kohli", runs: 8100 },
};
