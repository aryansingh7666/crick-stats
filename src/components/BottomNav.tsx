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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[64px] bg-[#0F1520] border-t border-[#1E2D45] z-50 px-2 shadow-[0_-4px_20px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between h-full max-w-md mx-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className="flex flex-col items-center justify-center flex-1 transition-all duration-300"
            >
              <motion.div
                animate={{ scale: isActive ? 1.15 : 1 }}
                className={isActive ? "text-[#FF6B1A]" : "text-[#3D5470]"}
              >
                <Icon size={22} />
              </motion.div>
              <span 
                className={`text-[9px] mt-1 font-bold uppercase tracking-tighter ${
                  isActive ? "text-[#FF6B1A]" : "text-[#3D5470]"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
