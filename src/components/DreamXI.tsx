import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, X, Share2, RotateCcw, Check, Users, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

interface Player {
  id: number;
  name: string;
  team: string;
  role: "Batsman" | "Wicketkeeper" | "Allrounder" | "Bowler";
  rating: number;
  runs?: number;
  avg?: number;
  sr?: number;
  wickets?: number;
  economy?: number;
  color: string;
}

const allPlayers: Player[] = [
  // BATSMEN
  { id:1, name:"Virat Kohli", team:"RCB", role:"Batsman", rating:95, runs:8100, avg:37.2, sr:130, color:"#EC1C24" },
  { id:2, name:"Rohit Sharma", team:"MI", role:"Batsman", rating:92, runs:6211, avg:29.8, sr:130, color:"#004BA0" },
  { id:3, name:"David Warner", team:"SRH", role:"Batsman", rating:91, runs:6564, avg:41.9, sr:140, color:"#F7A721" },
  { id:4, name:"Shikhar Dhawan", team:"DC", role:"Batsman", rating:88, runs:6769, avg:34.9, sr:127, color:"#0078BC" },
  { id:5, name:"AB de Villiers", team:"RCB", role:"Batsman", rating:97, runs:5162, avg:39.7, sr:151, color:"#EC1C24" },
  { id:6, name:"Chris Gayle", team:"RCB", role:"Batsman", rating:93, runs:4965, avg:40.5, sr:148, color:"#EC1C24" },
  { id:7, name:"Jos Buttler", team:"RR", role:"Batsman", rating:90, runs:3582, avg:46.5, sr:149, color:"#EA1A85" },
  { id:8, name:"KL Rahul", team:"LSG", role:"Batsman", rating:89, runs:4863, avg:47.2, sr:136, color:"#A2EDFF" },
  { id:9, name:"Suresh Raina", team:"CSK", role:"Batsman", rating:87, runs:5528, avg:32.5, sr:136, color:"#F9CD05" },
  { id:10, name:"Faf du Plessis", team:"RCB", role:"Batsman", rating:85, runs:3500, avg:35.0, sr:135, color:"#EC1C24" },

  // WICKET KEEPERS
  { id:11, name:"MS Dhoni", team:"CSK", role:"Wicketkeeper", rating:96, runs:5243, avg:38.1, sr:135, color:"#F9CD05" },
  { id:12, name:"Rishabh Pant", team:"DC", role:"Wicketkeeper", rating:88, runs:3284, avg:35.0, sr:148, color:"#0078BC" },
  { id:13, name:"Ishan Kishan", team:"MI", role:"Wicketkeeper", rating:82, runs:2644, avg:30.0, sr:136, color:"#004BA0" },
  { id:14, name:"Sanju Samson", team:"RR", role:"Wicketkeeper", rating:84, runs:3321, avg:28.0, sr:139, color:"#EA1A85" },

  // ALL ROUNDERS
  { id:15, name:"Hardik Pandya", team:"MI", role:"Allrounder", rating:89, runs:2670, avg:28.0, sr:145, color:"#004BA0" },
  { id:16, name:"Andre Russell", team:"KKR", role:"Allrounder", rating:92, runs:2626, avg:30.0, sr:178, color:"#3B1F76" },
  { id:17, name:"Kieron Pollard", team:"MI", role:"Allrounder", rating:88, runs:3412, avg:28.5, sr:147, color:"#004BA0" },
  { id:18, name:"Sunil Narine", team:"KKR", role:"Allrounder", rating:87, runs:1500, avg:20.0, sr:160, color:"#3B1F76" },
  { id:19, name:"Krunal Pandya", team:"RCB", role:"Allrounder", rating:80, runs:1800, avg:22.0, sr:130, color:"#EC1C24" },

  // BOWLERS
  { id:20, name:"Lasith Malinga", team:"MI", role:"Bowler", rating:94, wickets:170, economy:7.14, avg:19.8, color:"#004BA0" },
  { id:21, name:"Jasprit Bumrah", team:"MI", role:"Bowler", rating:95, wickets:159, economy:7.36, avg:21.2, color:"#004BA0" },
  { id:22, name:"Yuzvendra Chahal", team:"RR", role:"Bowler", rating:91, wickets:205, economy:7.59, avg:21.4, color:"#EA1A85" },
  { id:23, name:"Rashid Khan", team:"GT", role:"Bowler", rating:93, wickets:142, economy:6.33, avg:18.7, color:"#1B2133" },
  { id:24, name:"Dwayne Bravo", team:"CSK", role:"Bowler", rating:88, wickets:183, economy:8.38, avg:24.3, color:"#F9CD05" },
  { id:25, name:"Bhuvneshwar Kumar", team:"SRH", role:"Bowler", rating:87, wickets:181, economy:7.32, avg:23.1, color:"#F7A721" },
  { id:26, name:"Mohammed Shami", team:"GT", role:"Bowler", rating:86, wickets:115, economy:8.03, avg:24.6, color:"#1B2133" },
  { id:27, name:"Amit Mishra", team:"DC", role:"Bowler", rating:83, wickets:166, economy:7.35, avg:23.2, color:"#0078BC" },
];

const QUOTAS = {
  Batsman: 5,
  Wicketkeeper: 2,
  Allrounder: 3,
  Bowler: 4
};

const ROLES = ["ALL", "BAT", "WK", "AR", "BOWL"];
const ROLE_MAP: Record<string, string> = {
  BAT: "Batsman",
  WK: "Wicketkeeper",
  AR: "Allrounder",
  BOWL: "Bowler"
};

export const DreamXI = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [activeRole, setActiveRole] = useState("ALL");
  const [view, setView] = useState<"pool" | "xi">("pool");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const selectedPlayers = useMemo(() => 
    selectedIds.map(id => allPlayers.find(p => p.id === id)!)
  , [selectedIds]);

  const filteredPool = useMemo(() => {
    return allPlayers.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesRole = activeRole === "ALL" || p.role === ROLE_MAP[activeRole];
      return matchesSearch && matchesRole;
    });
  }, [search, activeRole]);

  const togglePlayer = (p: Player) => {
    if (selectedIds.includes(p.id)) {
      setSelectedIds(prev => prev.filter(id => id !== p.id));
    } else {
      if (selectedIds.length >= 11) {
        toast.error("Your Dream XI is full!");
        return;
      }
      const roleCount = selectedPlayers.filter(sp => sp.role === p.role).length;
      if (roleCount >= QUOTAS[p.role]) {
        toast.error(`Maximum ${QUOTAS[p.role]} ${p.role}s allowed!`);
        return;
      }
      setSelectedIds(prev => [...prev, p.id]);
    }
  };

  const strengths = useMemo(() => {
    const bats = selectedPlayers.filter(p => p.role === "Batsman" || p.role === "Allrounder");
    const bowls = selectedPlayers.filter(p => p.role === "Bowler" || p.role === "Allrounder");
    
    const batStrength = bats.length ? bats.reduce((a, b) => a + b.rating, 0) / bats.length : 0;
    const bowlStrength = bowls.length ? bowls.reduce((a, b) => a + b.rating, 0) / bowls.length : 0;
    
    const roleMix = new Set(selectedPlayers.map(p => p.role)).size;
    const balance = (roleMix / 4) * 100;
    
    const overall = selectedPlayers.length ? selectedPlayers.reduce((a, b) => a + b.rating, 0) / selectedPlayers.length : 0;

    return { batStrength, bowlStrength, balance, overall };
  }, [selectedPlayers]);

  const predictedScore = useMemo(() => {
    if (selectedPlayers.length < 5) return "N/A";
    const avgSr = selectedPlayers.reduce((a, b) => a + (b.sr || 130), 0) / selectedPlayers.length;
    const base = 140 + (avgSr - 130) * 2;
    return `${Math.round(base - 10)}-${Math.round(base + 10)}`;
  }, [selectedPlayers]);

  const copyTeam = () => {
    const teamText = `⭐ My All-Time IPL Dream XI\n━━━━━━━━━━━━━━━━━━━━━\n${selectedPlayers.map((p, i) => `${i + 1}. ${p.name} (${p.team})`).join("\n")}\n━━━━━━━━━━━━━━━━━━━━━\nOverall Rating: ${strengths.overall.toFixed(1)}/100\nBuilt on CRCK.IQ`;
    navigator.clipboard.writeText(teamText);
    toast.success("Copied to clipboard! ✓");
  };

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[380px_1fr] gap-6">
      {/* Mobile Tab Switcher */}
      {isMobile && (
        <div className="flex bg-card border border-border rounded-xl p-1 gap-1">
          <button 
            onClick={() => setView("pool")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-black transition-all ${view === 'pool' ? 'bg-primary text-primary-foreground shadow-lg' : 'text-muted-foreground'}`}
          >
            <Users className="h-4 w-4" /> PLAYER POOL
          </button>
          <button 
            onClick={() => setView("xi")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-black transition-all ${view === 'xi' ? 'bg-primary text-primary-foreground shadow-lg' : 'text-muted-foreground'}`}
          >
            <ShieldCheck className="h-4 w-4" /> MY DREAM XI
            <span className="ml-1 bg-white/20 px-1.5 rounded-full">{selectedIds.length}</span>
          </button>
        </div>
      )}

      {/* LEFT PANEL: Player Pool */}
      {(!isMobile || view === "pool") && (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4 bg-card border border-border rounded-2xl p-4 md:p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg">Selection Pool</h3>
            <button 
              onClick={() => setSelectedIds([])}
              className="text-[10px] uppercase tracking-widest font-black text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Clear
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-background/50 border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div className="flex overflow-x-auto gap-1 pb-1 scrollbar-hide">
            {ROLES.map(role => (
              <button
                key={role}
                onClick={() => setActiveRole(role)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-tight transition-all whitespace-nowrap ${
                  activeRole === role ? "bg-primary text-primary-foreground" : "bg-surface border border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          <div className="space-y-1.5 h-[500px] overflow-y-auto pr-1 scrollbar-hide">
            {filteredPool.map(p => {
              const isSelected = selectedIds.includes(p.id);
              const isFull = selectedIds.length >= 11;
              const roleCount = selectedPlayers.filter(sp => sp.role === p.role).length;
              const quotaReached = roleCount >= QUOTAS[p.role];

              return (
                <div 
                  key={p.id}
                  className={`group flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                    isSelected ? "bg-primary/5 border-primary/40 shadow-sm" : "bg-surface/40 border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full grid place-items-center font-black text-white text-[10px]" style={{ backgroundColor: p.color }}>
                      {p.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-none">{p.name}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[8px] uppercase tracking-tighter font-black opacity-60" style={{ color: p.color }}>{p.role}</span>
                        <span className="text-[8px] font-mono text-gold font-bold">★ {p.rating}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => togglePlayer(p)}
                    disabled={!isSelected && (isFull || quotaReached)}
                    className={`h-7 w-7 rounded-full grid place-items-center transition-all ${
                      isSelected ? "bg-primary text-white" : "bg-card-hover border border-border hover:bg-primary/20 disabled:opacity-30"
                    }`}
                  >
                    {isSelected ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </button>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* RIGHT PANEL: Dream XI */}
      {(!isMobile || view === "xi") && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-2xl md:text-3xl tracking-tight">Battle Formation</h2>
            <div className="font-mono text-[10px] md:text-sm text-primary uppercase font-bold tracking-widest">
              {selectedIds.length}/11 Legends
            </div>
          </div>

          {/* CRICKET FIELD - Responsive scale */}
          <div className="relative aspect-[4/5] w-full max-w-[480px] mx-auto bg-[#0a2e0a] rounded-[15%] md:rounded-[100%] border-[6px] md:border-[8px] border-[#ffffff10] shadow-2xl overflow-hidden p-4 md:p-8 flex flex-col justify-between items-center transition-all">
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:16px_16px] md:bg-[length:24px_24px] opacity-20" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30px] md:w-[40px] h-[120px] md:h-[160px] bg-[#d2b48c] border-x border-[#ffffff15] opacity-30 rounded-sm" />
            
            <SlotRow players={selectedPlayers.slice(0, 2)} roles={["Opener", "Opener"]} onRemove={(p) => togglePlayer(p)} isMobile={isMobile} />
            <SlotRow players={selectedPlayers.slice(2, 4)} roles={["No.3", "No.4"]} onRemove={(p) => togglePlayer(p)} isMobile={isMobile} />
            <SlotRow players={selectedPlayers.slice(4, 6)} roles={["No.5", "Wicketkeeper"]} onRemove={(p) => togglePlayer(p)} isMobile={isMobile} />
            <SlotRow players={selectedPlayers.slice(6, 8)} roles={["Allrounder", "Allrounder"]} onRemove={(p) => togglePlayer(p)} isMobile={isMobile} />
            <SlotRow players={selectedPlayers.slice(8, 11)} roles={["Bowler", "Bowler", "Bowler"]} onRemove={(p) => togglePlayer(p)} isMobile={isMobile} />
          </div>

          {/* TEAM STRENGTH */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <StrengthBar label="Batting" value={strengths.batStrength} color="from-orange-500 to-red-500" />
            <StrengthBar label="Bowling" value={strengths.bowlStrength} color="from-blue-500 to-indigo-500" />
            <StrengthBar label="Balance" value={strengths.balance} color="from-green-500 to-emerald-500" />
            <StrengthBar label="Overall" value={strengths.overall} color="from-yellow-400 to-orange-500" />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-card border border-border rounded-2xl shadow-lg gap-4">
            <div>
              <div className="text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em] mb-1">Predicted Score</div>
              <div className="text-2xl font-display text-primary">{predictedScore}</div>
            </div>
            <button
              onClick={copyTeam}
              disabled={selectedIds.length < 11}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-orange text-white font-black rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-40 disabled:grayscale uppercase text-xs tracking-widest"
            >
              <Share2 className="h-4 w-4" /> Share Dream XI
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const SlotRow = ({ players, roles, onRemove, isMobile }: { players: Player[], roles: string[], onRemove: (p: Player) => void, isMobile: boolean }) => (
  <div className={`flex justify-center ${isMobile ? 'gap-4' : 'gap-8'} w-full`}>
    {roles.map((role, i) => {
      const player = players[i];
      const size = isMobile ? 'h-10 w-10' : 'h-12 w-12';
      return (
        <div key={i} className={`flex flex-col items-center gap-1 ${isMobile ? 'w-12' : 'w-16'}`}>
          <div className="relative group">
            {player ? (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`${size} rounded-full border-2 border-white/40 shadow-xl grid place-items-center font-black text-white relative text-[10px] md:text-xs`}
                style={{ backgroundColor: player.color }}
              >
                {player.name.split(" ").map(n => n[0]).join("")}
                <button 
                  onClick={() => onRemove(player)}
                  className="absolute -top-1.5 -right-1.5 h-4 w-4 md:h-5 md:w-5 bg-red-600 rounded-full grid place-items-center text-[10px] shadow-lg md:opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-2.5 w-2.5" />
                </button>
              </motion.div>
            ) : (
              <div className={`${size} rounded-full border-2 border-dashed border-white/20 grid place-items-center animate-pulse shadow-[inset_0_0_15px_rgba(255,107,26,0.1)]`}>
                <Plus className="h-3 w-3 md:h-4 md:w-4 text-white/20" />
              </div>
            )}
          </div>
          <div className="text-[7px] md:text-[8px] font-black text-center text-white/50 uppercase tracking-tighter truncate w-full">
            {player ? player.name : role}
          </div>
        </div>
      );
    })}
  </div>
);

const StrengthBar = ({ label, value, color }: { label: string, value: number, color: string }) => (
  <div className="bg-surface/30 border border-border/50 rounded-xl p-3">
    <div className="flex justify-between items-center mb-1.5">
      <span className="text-[9px] font-black uppercase text-muted-foreground">{label}</span>
      <span className="text-[10px] font-mono font-bold text-primary">{Math.round(value)}%</span>
    </div>
    <div className="h-1 bg-background rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8 }}
        className={`h-full bg-gradient-to-r ${color}`}
      />
    </div>
  </div>
);
