import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CricketBall } from "./CricketBall";
import { Trophy, BarChart3, Target, MapPin, Swords, Sparkles, Search, Menu, X, Zap } from "lucide-react";
import { Button } from "./ui/button";

export type TabId = "overview" | "batting" | "bowling" | "venues" | "h2h" | "predictor" | "records" | "dream-xi" | "quiz";

const TABS: { id: TabId; label: string; icon: any }[] = [
  { id: "overview",  label: "Overview",  icon: Trophy },
  { id: "batting",   label: "Batting",   icon: BarChart3 },
  { id: "bowling",   label: "Bowling",   icon: Target },
  { id: "records",   label: "Records",   icon: Trophy },
  { id: "dream-xi",  label: "Dream XI",  icon: Sparkles },
  { id: "venues",    label: "Venues",    icon: MapPin },
  { id: "h2h",       label: "H2H",       icon: Swords },
  { id: "predictor", label: "Predictor", icon: Sparkles },
  { id: "quiz",      label: "Quiz",      icon: Zap },
];

interface Props {
  active: TabId;
  onChange: (t: TabId) => void;
  onOpenFilters?: () => void;
}

export const Navbar = ({ active, onChange, onOpenFilters }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 bg-[#FDFBD4]/40 backdrop-blur-2xl border-b border-purple-100"
    >
      <div className="h-16 lg:h-20 px-4 lg:px-8 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 lg:gap-3 shrink-0 group cursor-pointer" onClick={() => onChange("overview")}>
          <div className="relative">
            <div className="absolute inset-0 bg-primary blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
            <CricketBall size={window.innerWidth < 768 ? 28 : 36} />
          </div>
          <div className="font-display text-[1.1rem] lg:text-3xl tracking-tighter text-gradient-lavender leading-none">
            CRCK<span className="text-foreground">.</span>IQ
          </div>
        </div>

        {/* Desktop Tab pills */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1.5 backdrop-blur-md">
          {TABS.map((t) => {
            const Icon = t.icon;
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onChange(t.id)}
                className={`relative px-5 py-2.5 rounded-full text-[11px] uppercase tracking-widest font-black transition-all duration-300 flex items-center gap-2.5 ${
                  isActive
                    ? "text-white"
                    : "text-text-muted hover:text-primary"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#CF6DFC] to-[#C1BFFF] shadow-[0_4px_20px_rgba(207,109,252,0.3)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className={`relative z-10 h-3.5 w-3.5 ${isActive ? "animate-pulse" : ""}`} />
                <span className="relative z-10">{t.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right meta (Desktop) / Icons (Mobile) */}
        <div className="flex items-center gap-2 lg:gap-3 shrink-0">
          {/* Mobile Icons */}
          <div className="flex md:hidden items-center gap-1">
            <button 
              onClick={onOpenFilters}
              className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
            >
              <Search size={20} />
            </button>
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Desktop Only */}
          <div className="hidden md:flex items-center gap-3">
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-card border border-border text-muted-foreground">
              IPL 2008–2025
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 border border-success/30">
              <span className="h-2 w-2 rounded-full bg-success pulse-dot" />
              <span className="text-[10px] font-bold text-success tracking-wider">LIVE DATA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient line */}
      <div className="h-[2px] bg-gradient-to-r from-[#CF6DFC] via-[#BDB96A] to-[#C1BFFF] opacity-60" />

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-[95%] bg-[#FDFBD4] z-[100] border-l border-purple-100 shadow-2xl md:hidden"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <CricketBall size={32} />
                  <div className="font-display text-2xl text-gradient-lavender">CRCK.IQ</div>
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-muted-foreground"
                >
                  <X size={28} />
                </button>
              </div>

              <nav className="space-y-2">
                {TABS.map((t) => {
                  const Icon = t.icon;
                  const isActive = active === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        onChange(t.id);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all border-b border-purple-50 ${
                        isActive ? "bg-primary/10 text-primary border-primary/20 shadow-sm" : "text-foreground/80"
                      }`}
                    >
                      <Icon size={24} className={isActive ? "text-primary" : "text-muted-foreground"} />
                      <span className="text-lg font-bold tracking-tight">{t.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
