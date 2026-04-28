import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, X, Filter } from "lucide-react";
import { useState } from "react";
import { TEAMS } from "@/data/ipl";
import { CricketBall } from "./CricketBall";

interface Props {
  collapsed: boolean;
  onToggle: () => void;
  seasonRange: [number, number];
  setSeasonRange: (r: [number, number]) => void;
  selectedTeams: string[];
  setSelectedTeams: (t: string[]) => void;
  selectedVenue: string;
  setSelectedVenue: (v: string) => void;
  matchType: string;
  setMatchType: (m: string) => void;
}

export const FilterControls = (p: Omit<Props, "collapsed" | "onToggle">) => {
  return (
    <div className="space-y-8">
      <div>
        <SectionTitle>Season Span</SectionTitle>
        <div className="mt-4 bg-[#F1EFFF] border border-purple-100 rounded-2xl p-4">
          <div className="flex items-center justify-between font-mono text-sm mb-4">
            <span className="text-primary font-bold">{p.seasonRange[0]}</span>
            <span className="text-purple-300">⟶</span>
            <span className="text-primary font-bold">{p.seasonRange[1]}</span>
          </div>
          <div className="space-y-4">
            <input
              type="range"
              min={2008}
              max={2025}
              value={p.seasonRange[0]}
              onChange={(e) => p.setSeasonRange([+e.target.value, p.seasonRange[1]])}
              className="w-full accent-primary h-1 bg-purple-200 rounded-full appearance-none cursor-pointer"
            />
            <input
              type="range"
              min={2008}
              max={2025}
              value={p.seasonRange[1]}
              onChange={(e) => p.setSeasonRange([p.seasonRange[0], +e.target.value])}
              className="w-full accent-primary h-1 bg-purple-200 rounded-full appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div>
        <SectionTitle>Franchise selection</SectionTitle>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {TEAMS.map((t) => {
            const active = p.selectedTeams.includes(t.code);
            return (
              <button
                key={t.code}
                onClick={() =>
                  p.setSelectedTeams(
                    active
                      ? p.selectedTeams.filter((x) => x !== t.code)
                      : [...p.selectedTeams, t.code],
                  )
                }
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all duration-300 border ${
                  active
                    ? "bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(207,109,252,0.1)]"
                    : "bg-white border-purple-50 text-muted-foreground hover:bg-purple-50 hover:border-purple-100"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: t.color, boxShadow: `0 0 8px ${t.color}` }} />
                {t.short}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <SectionTitle>Match Venue</SectionTitle>
        <select
          value={p.selectedVenue}
          onChange={(e) => p.setSelectedVenue(e.target.value)}
          className="w-full mt-4 bg-white border border-purple-100 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-primary/40 outline-none transition-all"
        >
          <option value="all" className="bg-white">All Venues</option>
          <option value="Wankhede Stadium" className="bg-white">Wankhede</option>
          <option value="Eden Gardens" className="bg-white">Eden Gardens</option>
          <option value="M Chinnaswamy Stadium" className="bg-white">Chinnaswamy</option>
          <option value="MA Chidambaram Stadium" className="bg-white">Chepauk</option>
        </select>
      </div>

      <div>
        <SectionTitle>Match Type</SectionTitle>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {["T20", "Playoffs", "Finals"].map((type) => (
            <button
              key={type}
              onClick={() => p.setMatchType(p.matchType === type ? "" : type)}
              className={`px-3 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                p.matchType === type 
                  ? "bg-primary/20 border-primary text-primary" 
                  : "bg-white border-purple-50 text-muted-foreground"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Sidebar = (p: Props) => {
  const collapsed = p.collapsed;

  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1, width: collapsed ? 64 : 280 }}
      transition={{ delay: 2.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="hidden lg:flex flex-col bg-background/20 backdrop-blur-3xl border-r border-white/5 shrink-0 sticky top-20 h-[calc(100vh-5rem)] overflow-hidden"
    >
      <div className="flex items-center justify-between p-5 border-b border-purple-100">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_rgba(207,109,252,0.5)]" />
            <span className="font-display text-xl tracking-tighter text-gradient-lavender">FILTERS</span>
          </div>
        )}
        <button
          onClick={p.onToggle}
          className="ml-auto h-9 w-9 grid place-items-center rounded-xl bg-white border border-purple-100 hover:bg-purple-50 text-muted-foreground hover:text-primary transition-all duration-300 shadow-sm"
          aria-label="Toggle sidebar"
        >
          <ChevronLeft className={`h-4 w-4 transition-transform duration-500 ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!collapsed ? (
          <motion.div
            key="full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide"
          >
            <FilterControls {...p} />

            <div className="pt-8 space-y-3">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/20 group hover:border-primary/40 transition-all cursor-default">
                <div className="font-mono text-success text-[10px] font-black uppercase tracking-widest">🤖 Neural Network</div>
                <div className="text-muted-foreground text-xs mt-1 leading-relaxed">Predictive analytics engine processing match history.</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="font-mono text-secondary text-[10px] font-black uppercase tracking-widest">📊 1,171 Matches</div>
                <div className="text-muted-foreground text-xs mt-1 leading-relaxed">Dataset updated for 18 seasons (2008–25).</div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="mini"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center pt-8 gap-5"
          >
            <div className="p-2 rounded-xl bg-primary/10 border border-primary/30">
              <Filter className="h-5 w-5 text-primary" />
            </div>
            {TEAMS.slice(0, 8).map((t) => (
              <div key={t.code} className="h-7 w-7 grid place-items-center rounded-full border border-white/10 shadow-lg" style={{ background: t.color }}>
                <span className="text-[9px] font-black text-white">{t.short.slice(0, 2)}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
};

export const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">{children}</div>
);
