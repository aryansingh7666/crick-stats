import { motion } from "framer-motion";
import { CountUp } from "./CountUp";
import { ReactNode, useState } from "react";

interface Props {
  icon: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  accent: "orange" | "blue" | "green" | "purple" | "gold" | "pink" | "cyan" | "lavender";
  context?: ReactNode;
  delay?: number;
  rawText?: string; // override numeric — e.g. "264"
  contextLabel?: string;
}

const accentMap: Record<Props["accent"], { border: string; glow: string; text: string }> = {
  orange: { border: "border-[#CF6DFC]", glow: "hover:shadow-[0_10px_40px_rgba(207,109,252,0.2)]", text: "text-gradient-lavender" },
  blue:   { border: "border-[#A3E9FF]", glow: "hover:shadow-[0_10px_40px_rgba(163,233,255,0.2)]",  text: "text-gradient-lavender" },
  green:  { border: "border-[#BDB96A]", glow: "hover:shadow-[0_10px_40px_rgba(189,185,106,0.2)]",   text: "text-gradient-green" },
  purple: { border: "border-[#CF6DFC]", glow: "hover:shadow-[0_10px_40px_rgba(207,109,252,0.2)]",  text: "text-gradient-purple" },
  gold:   { border: "border-[#D4CD81]", glow: "hover:shadow-[0_10px_40px_rgba(212,205,129,0.2)]",   text: "text-gradient-gold" },
  pink:   { border: "border-[#FFB3E6]", glow: "hover:shadow-[0_10px_40px_rgba(255,179,230,0.2)]",    text: "text-gradient-purple" },
  cyan:   { border: "border-[#A3E9FF]", glow: "hover:shadow-[0_10px_40px_rgba(163,233,255,0.2)]",   text: "text-gradient-lavender" },
  lavender: { border: "border-[#CF6DFC]", glow: "hover:shadow-[0_10px_40px_rgba(207,109,252,0.2)]", text: "text-gradient-lavender" },
};

export const KpiCard = ({
  icon, label, value, suffix, prefix, decimals, accent, context, delay = 0, rawText, contextLabel,
}: Props) => {
  const [flipped, setFlipped] = useState(false);
  const a = accentMap[accent];

  const formatValue = (val: number) => {
    if (val > 999999) return (val / 1000000).toFixed(1) + "M";
    if (val > 99999) return (val / 1000).toFixed(1) + "K";
    return val.toLocaleString();
  };

  const displayValue = rawText || formatValue(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 + delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="[perspective:1200px] group"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-[110px] md:h-[160px] w-full [transform-style:preserve-3d]"
      >
        {/* FRONT */}
        <div
          className={`absolute inset-0 [backface-visibility:hidden] rounded-2xl bg-glass border-t-2 ${a.border} p-3.5 md:p-5 transition-all duration-300 group-hover:bg-card/90 lg:group-hover:-translate-y-2 ${a.glow} overflow-hidden`}
        >
          <div className="flex items-start justify-between">
            <span className="text-xl md:text-2xl">{icon}</span>
            <span className="text-[8px] md:text-[10px] font-mono text-muted-foreground uppercase tracking-widest truncate ml-2">
              {contextLabel ?? "All Time"}
            </span>
          </div>
          <div className="mt-2 md:mt-3">
            <div className={`font-display text-[clamp(1.4rem,6vw,2.5rem)] leading-none ${a.text} truncate`}>
              {displayValue}
            </div>
          </div>
          <div className="mt-1 md:mt-2 text-[0.65rem] md:text-xs uppercase tracking-wider text-muted-foreground font-medium truncate">
            {label}
          </div>
        </div>

        {/* BACK */}
        <div
          className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl bg-gradient-to-br from-card to-card-hover border border-primary/40 p-4 shadow-card flex flex-col justify-center items-center text-center`}
        >
          <div className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1">
            ⚡ Insight
          </div>
          <div className="text-[0.7rem] md:text-sm text-foreground/90 leading-tight md:leading-relaxed overflow-y-auto">{context}</div>
        </div>
      </motion.div>
    </motion.div>
  );
};
