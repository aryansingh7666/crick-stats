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
        className="sticky top-0 z-[100] w-full overflow-hidden flex items-center py-2 px-4 md:px-8 border-b border-[#EC1C24]/20"
        style={{ 
          background: "linear-gradient(135deg, #1A0000, #2D0000)",
          boxShadow: "inset 10px 0 40px rgba(236, 28, 36, 0.2), -5px 0 20px rgba(236, 28, 36, 0.3)"
        }}
      >
        {/* Confetti Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(isMobile ? 8 : 20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: "-5%", y: Math.random() * 100 + "%" }}
              animate={{ 
                x: "105%",
                y: [
                  (Math.random() * 100) + "%", 
                  (Math.random() * 100) + "%", 
                  (Math.random() * 100) + "%"
                ]
              }}
              transition={{
                duration: Math.random() * 5 + 3, // 3-8s random
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
              className="absolute w-[4px] h-[4px] rounded-full opacity-60"
              style={{
                backgroundColor: ["#EC1C24", "#F59E0B", "#FFFFFF"][i % 3],
              }}
            />
          ))}
        </div>

        <div className="flex-1 flex items-center justify-between relative z-10">
          {/* LEFT TEXT */}
          <div className="hidden sm:block text-[clamp(0.6rem,2vw,0.75rem)] font-bold tracking-[0.15em] text-[#F59E0B] uppercase">
            🏆 IPL 2025 CHAMPIONS
          </div>

          {/* CENTER TEXT */}
          <div className="flex-1 text-center">
            <h2 className="font-display text-[clamp(1.1rem,4vw,1.4rem)] tracking-wider leading-none bg-clip-text text-transparent bg-gradient-to-r from-[#EC1C24] to-[#FF6B6B]">
              <span className="hidden min-[375px]:inline">Royal Challengers Bengaluru</span>
              <span className="min-[375px]:hidden">🏆 RCB Champions 2025 🔴</span>
            </h2>
          </div>

          {/* RIGHT TEXT */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="text-[0.75rem] italic text-[#FF6B6B] font-medium">
              Ee Sala Cup Namde 🔴
            </div>
          </div>
        </div>

        {/* DISMISS BUTTON */}
        <button
          onClick={handleDismiss}
          className="relative z-10 ml-2 md:ml-4 p-1.5 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white shrink-0"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
