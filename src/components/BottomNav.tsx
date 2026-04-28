import { motion } from "framer-motion";
import { Home, BarChart3, Target, MapPin, Swords, Sparkles } from "lucide-react";
import { TabId } from "./Navbar";

interface Props {
  active: TabId;
  onChange: (t: TabId) => void;
}

const NAV_ITEMS: { id: TabId; label: string; icon: any }[] = [
  { id: "overview",  label: "Home",    icon: Home },
  { id: "batting",   label: "Batting", icon: BarChart3 },
  { id: "bowling",   label: "Bowling", icon: Target },
  { id: "venues",    label: "Venue",   icon: MapPin },
  { id: "h2h",       label: "H2H",     icon: Swords },
  { id: "predictor", label: "Predict", icon: Sparkles },
];

export const BottomNav = ({ active, onChange }: Props) => {
  return (
    <>
      {/* Subtle gradient above nav */}
      <div className="md:hidden fixed bottom-[64px] left-0 right-0 h-16 bg-gradient-to-t from-[#05050A]/90 to-transparent pointer-events-none z-40" />
      
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[64px] bg-[#05050A]/95 backdrop-blur-[24px] border-t border-white/5 z-50 px-2">
        <div className="flex items-center justify-between h-full max-w-md mx-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChange(item.id)}
                className="flex flex-col items-center justify-center flex-1 transition-all duration-400 relative h-full"
              >
                <motion.div
                  animate={{ scale: isActive ? 1.15 : 1, y: isActive ? -3 : 0 }}
                  className={isActive ? "text-[#FF5E00] drop-shadow-[0_0_12px_rgba(255,94,0,0.8)]" : "text-white/20"}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                </motion.div>
                
                {isActive && (
                  <motion.div 
                    layoutId="activeDot"
                    className="absolute bottom-1.5 w-1 h-1 bg-[#FF5E00] rounded-full shadow-[0_0_12px_#FF5E00]" 
                  />
                )}

                <span 
                  className={`text-[7px] mt-1.5 font-black uppercase tracking-[0.2em] transition-colors duration-300 ${
                    isActive ? "text-[#FF5E00]" : "text-white/20"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
