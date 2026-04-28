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
      <div className="md:hidden fixed bottom-[64px] left-0 right-0 h-12 bg-gradient-to-t from-[#0D0D1A]/80 to-transparent pointer-events-none z-40" />
      
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[64px] bg-[#0D0D1A]/95 backdrop-blur-[20px] border-t border-white/10 z-50 px-2">
        <div className="flex items-center justify-between h-full max-w-md mx-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChange(item.id)}
                className="flex flex-col items-center justify-center flex-1 transition-all duration-300 relative h-full"
              >
                <motion.div
                  animate={{ scale: isActive ? 1.1 : 1, y: isActive ? -2 : 0 }}
                  className={isActive ? "text-[#FF6B1A] drop-shadow-[0_0_8px_rgba(255,107,26,0.6)]" : "text-white/30"}
                >
                  <Icon size={20} />
                </motion.div>
                
                {isActive && (
                  <motion.div 
                    layoutId="activeDot"
                    className="absolute bottom-2 w-1 h-1 bg-[#FF6B1A] rounded-full shadow-[0_0_10px_#FF6B1A]" 
                  />
                )}

                <span 
                  className={`text-[8px] mt-1 font-bold uppercase tracking-widest ${
                    isActive ? "text-[#FF6B1A]" : "text-white/30"
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
