import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { TeamBadge } from "./TeamBadge";

const records = [
  {
    id: 1,
    category: "BATTING",
    title: "Highest Individual Score",
    value: "175*",
    player: "Chris Gayle",
    context: "RCB vs PBKS • Bengaluru • 2013",
    detail: "66 balls • 17 sixes • 13 fours",
    color: "#FF6B1A",
    glow: "rgba(255,107,26,0.3)",
    icon: "🏏"
  },
  {
    id: 2,
    category: "BOWLING",
    title: "Best Bowling Figures",
    value: "6/14",
    player: "Sohail Tanvir",
    context: "RR vs CSK • Jaipur • 2008",
    detail: "4 overs • 0 maidens • 6 wickets",
    color: "#0EA5E9",
    glow: "rgba(14,165,233,0.3)",
    icon: "🎯"
  },
  {
    id: 3,
    category: "TEAM",
    title: "Highest Team Total",
    value: "287/2",
    player: "Royal Challengers Bengaluru",
    context: "vs PBKS • Bengaluru • 2013",
    detail: "Gayle 175* • Dilshan 33",
    color: "#EC1C24",
    glow: "rgba(236,28,36,0.3)",
    icon: "📊"
  },
  {
    id: 4,
    category: "TEAM",
    title: "Lowest Team Total",
    value: "49",
    player: "Royal Challengers Bengaluru",
    context: "vs KKR • Kolkata • 2017",
    detail: "All out in 9.4 overs",
    color: "#8B5CF6",
    glow: "rgba(139,92,246,0.3)",
    icon: "📉"
  },
  {
    id: 5,
    category: "BATTING",
    title: "Most Sixes in an Innings",
    value: "17",
    player: "Chris Gayle",
    context: "RCB vs PBKS • 2013",
    detail: "Part of his 175* knock",
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.3)",
    icon: "6️⃣"
  },
  {
    id: 6,
    category: "BATTING",
    title: "Fastest Fifty",
    value: "8 balls",
    player: "KL Rahul",
    context: "PBKS vs DC • 2018",
    detail: "Fastest in IPL history",
    color: "#10B981",
    glow: "rgba(16,185,129,0.3)",
    icon: "⚡"
  },
  {
    id: 7,
    category: "BOWLING",
    title: "Most Expensive Over",
    value: "37 runs",
    player: "Ishant Sharma",
    context: "vs MI • 2013",
    detail: "6 sixes in one over by Pollard",
    color: "#EF4444",
    glow: "rgba(239,68,68,0.3)",
    icon: "💸"
  },
  {
    id: 8,
    category: "BATTING",
    title: "Highest Partnership",
    value: "215*",
    player: "Gayle & Dilshan",
    context: "RCB vs DD • 2011",
    detail: "Unbroken opening stand",
    color: "#FF6B1A",
    glow: "rgba(255,107,26,0.3)",
    icon: "🤝"
  },
  {
    id: 9,
    category: "SEASON",
    title: "Most Runs in a Season",
    value: "973",
    player: "Virat Kohli",
    context: "RCB • IPL 2016",
    detail: "16 matches • 4 centuries • Avg 81.08",
    color: "#EC1C24",
    glow: "rgba(236,28,36,0.3)",
    icon: "👑"
  },
  {
    id: 10,
    category: "SEASON",
    title: "Most Wickets in a Season",
    value: "32",
    player: "Dwayne Bravo / Harshal Patel",
    context: "CSK 2013 / RCB 2021",
    detail: "Joint record — never broken",
    color: "#0EA5E9",
    glow: "rgba(14,165,233,0.3)",
    icon: "🏆"
  },
  {
    id: 11,
    category: "BATTING",
    title: "Most IPL Runs — All Time",
    value: "8,100+",
    player: "Virat Kohli",
    context: "RCB • 2008-2025",
    detail: "252 matches • 8 centuries",
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.3)",
    icon: "⭐"
  },
  {
    id: 12,
    category: "BOWLING",
    title: "Most IPL Wickets — All Time",
    value: "205+",
    player: "Yuzvendra Chahal",
    context: "RCB/RR • 2008-2025",
    detail: "160 matches • Eco 7.59",
    color: "#8B5CF6",
    glow: "rgba(139,92,246,0.3)",
    icon: "🎳"
  }
];

const categories = ["ALL", "BATTING", "BOWLING", "TEAM", "SEASON"];

const RenderContext = ({ text }: { text: string }) => {
  const parts = text.split(" ");
  return (
    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[10px] md:text-[0.75rem] text-[#7A92B0] font-bold uppercase tracking-wider">
      {parts.map((word, i) => {
        const cleanWord = word.replace(/[^A-Z]/g, "");
        const isTeam = ["MI", "CSK", "KKR", "RCB", "SRH", "DC", "RR", "PBKS", "GT", "LSG", "DCH"].includes(cleanWord);
        if (isTeam) {
          return (
            <div key={i} className="flex items-center gap-1">
              <TeamBadge code={cleanWord} size={16} />
              {word !== cleanWord && <span>{word.replace(cleanWord, "")}</span>}
            </div>
          );
        }
        return <span key={i}>{word}</span>;
      })}
    </div>
  );
};

export const RecordsWall = () => {
  const [filter, setFilter] = useState("ALL");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filteredRecords = records.filter(r => filter === "ALL" || r.category === filter);

  return (
    <div className="space-y-6 md:space-y-8 p-1">
      <div className="space-y-1 md:space-y-2">
        <h2 className="font-display text-3xl md:text-[2.5rem] text-white leading-tight">The Records Wall</h2>
        <p className="text-[0.75rem] md:text-[0.85rem] text-muted-foreground uppercase tracking-widest font-bold">
          18 Seasons of IPL History Decoded
        </p>
      </div>

      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide -mx-2 px-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-[10px] font-black transition-all duration-300 whitespace-nowrap tracking-wider ${
              filter === cat
                ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(255,107,26,0.3)]"
                : "bg-surface border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredRecords.map((r) => (
            <motion.div
              key={r.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              whileHover={!isMobile ? { y: -4, boxShadow: `0 15px 40px -5px ${r.glow}` } : {}}
              className="relative group rounded-2xl bg-[#161E2E] border p-5 md:p-6 overflow-hidden transition-all duration-300 flex flex-col"
              style={{ 
                borderColor: `${r.color}44`,
                boxShadow: isMobile ? `0 4px 20px -5px ${r.glow}` : `0 0 20px ${r.glow}`
              }}
            >
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <span className="text-xl md:text-2xl">{r.icon}</span>
                <span 
                  className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest"
                  style={{ backgroundColor: `${r.color}20`, color: r.color }}
                >
                  {r.category}
                </span>
              </div>

              <div className="flex-1 space-y-1 mb-6 md:mb-8">
                <div className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-1 opacity-70">
                  {r.title}
                </div>
                <div 
                  className="font-display text-[2.5rem] leading-[0.9] md:text-[3.5rem] lg:text-[4rem]"
                  style={{ color: r.color }}
                >
                  {r.value}
                </div>
                <div className="text-lg md:text-[1.1rem] font-bold text-white mt-4 md:mt-5 truncate">
                  {r.player}
                </div>
                <RenderContext text={r.context} />
              </div>

              <div className="pt-3 md:pt-4 border-t border-white/5">
                <div className="font-mono text-[9px] md:text-[0.7rem] text-muted-foreground/80 tracking-tight font-bold">
                  {r.detail}
                </div>
              </div>

              <div 
                className="absolute -right-4 -bottom-4 w-24 h-24 md:w-32 md:h-32 blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500 rounded-full"
                style={{ background: r.color }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
