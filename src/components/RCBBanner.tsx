import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const RCBBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem("rcb_banner_dismissed");
    if (!isDismissed) {
      setIsVisible(true);
    }
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("rcb_banner_dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", minHeight: 44, opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="sticky top-0 z-[100] w-full overflow-hidden flex items-center py-2.5 border-b border-[#CF6DFC]/30"
        style={{ 
          background: "linear-gradient(90deg, #FDFBD4 0%, #C1BFFF 50%, #FDFBD4 100%)",
          position: "relative"
        }}
      >
        {/* Animated Shimmer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ x: ["-100%", "250%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-30deg]"
          />
        </div>

        <div className="flex-1 flex items-center justify-between relative z-10 px-4 md:px-8">
          {isMobile ? (
            <div className="flex-1 overflow-hidden">
              <div className="animate-marquee whitespace-nowrap text-[11px] font-black tracking-[0.2em] text-[#2D1B33] uppercase">
                RCB 🏆 CHAMPIONS 2025 • EE SALA CUP NAMDE • FIRST TITLE IN 18 YEARS 🔴 &nbsp;&nbsp;&nbsp; 
                RCB 🏆 CHAMPIONS 2025 • EE SALA CUP NAMDE • FIRST TITLE IN 18 YEARS 🔴
              </div>
            </div>
          ) : (
            <div className="flex-1 text-center text-xs md:text-sm font-black tracking-[0.4em] text-[#2D1B33] uppercase">
              RCB 🏆 CHAMPIONS 2025 • EE SALA CUP NAMDE • FIRST TITLE IN 18 YEARS 🔴
            </div>
          )}

          <button
            onClick={handleDismiss}
            className="ml-4 p-1.5 hover:bg-black/5 rounded-full transition-colors text-[#2D1B33]/40 hover:text-[#2D1B33] shrink-0"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: inline-block;
            animation: marquee 15s linear infinite;
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
};
