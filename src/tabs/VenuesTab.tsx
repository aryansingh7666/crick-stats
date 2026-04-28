import { motion } from "framer-motion";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceLine } from "recharts";
import { VENUES } from "@/data/ipl";
import { ChartTooltip } from "@/components/ChartTooltip";
import { MapPin } from "lucide-react";
import { useState, useEffect } from "react";

export const VenuesTab = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const avgScore = Math.round(VENUES.reduce((s, v) => s + v.avgScore, 0) / VENUES.length);

  const tagFor = (v: typeof VENUES[number]) => {
    if (v.batFirstWinPct >= 55) return { label: "🏏 Batting Paradise", color: "#10B981" };
    if (v.batFirstWinPct <= 45) return { label: "🎯 Bowler's Heaven", color: "#EC1C24" };
    return { label: "⚖️ Balanced", color: "#7A92B0" };
  };

  return (
    <div className="space-y-6">
      <h3 className="font-heading text-lg md:text-xl flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
        🏟️ Venue Intelligence
        <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider font-normal">Every fortress, decoded</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {VENUES.map((v, i) => {
          const tag = tagFor(v);
          const winPctColor = v.batFirstWinPct >= 55 ? "#10B981" : v.batFirstWinPct <= 45 ? "#EC1C24" : "#7A92B0";
          return (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="group rounded-2xl bg-card border border-border p-4 md:p-5 shadow-card hover:border-primary/50 transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <MapPin className="h-6 w-6 text-primary shrink-0" strokeWidth={1.5} />
                <span className="text-[9px] md:text-[10px] px-2 py-0.5 rounded-full font-bold border" style={{ background: tag.color + "20", color: tag.color, borderColor: tag.color + "40" }}>
                  {tag.label}
                </span>
              </div>
              <h4 className="font-heading text-base md:text-lg leading-tight truncate">{v.name}</h4>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-card-hover text-muted-foreground font-sans">{v.city}</span>
                {v.name.includes("Arun Jaitley") && (
                  <span className="text-[9px] text-muted-foreground/60 italic">(formerly Feroz Shah Kotla)</span>
                )}
              </div>

              {/* Stats Grid */}
              <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-3'} gap-3 md:gap-2 mt-4 text-center`}>
                <div className="bg-white/5 rounded-xl p-2 md:bg-transparent">
                  <div className="font-display text-2xl text-gradient-orange">{v.matches}</div>
                  <div className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">Matches</div>
                </div>
                <div className="bg-white/5 rounded-xl p-2 md:bg-transparent">
                  <div className="font-display text-2xl text-gradient-blue">{v.avgScore}</div>
                  <div className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">Avg Score</div>
                </div>
                <div className="bg-white/5 rounded-xl p-2 md:bg-transparent">
                  <div className="font-display text-2xl text-foreground">{(v.capacity / 1000).toFixed(0)}K</div>
                  <div className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">Capacity</div>
                </div>
                {isMobile && (
                  <div className="bg-white/5 rounded-xl p-2">
                    <div className="font-display text-2xl text-success">{v.batFirstWinPct}%</div>
                    <div className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">Bat 1st Win</div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-2 border-t border-white/5 md:border-none">
                <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                  <span>Win Balance</span>
                  <span className="font-mono font-bold" style={{ color: winPctColor }}>{v.batFirstWinPct}% Bat 1st</span>
                </div>
                <div className="h-1.5 bg-card-hover rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${v.batFirstWinPct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.05 }}
                    className="h-full rounded-full"
                    style={{ background: winPctColor }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Section title="🪙 Toss Win % by Venue" subtitle="Toss winners' victory rate">
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={isMobile ? 280 : 340}>
              <BarChart data={VENUES} margin={{ left: -10, right: 10, bottom: isMobile ? 40 : 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="city" stroke="hsl(var(--muted-foreground))" fontSize={9} angle={-45} textAnchor="end" interval={0} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} domain={[40, 60]} />
                <Tooltip content={<ChartTooltip />} trigger="click" />
                <Bar dataKey="tossWinPct" fill="#0EA5E9" radius={[6, 6, 0, 0]} animationDuration={isMobile ? 400 : 1200} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>

        <Section title="📊 Avg First Innings Score" subtitle={`League avg: ${avgScore}`}>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={isMobile ? 280 : 340}>
              <BarChart data={VENUES} margin={{ left: -10, right: 10, bottom: isMobile ? 40 : 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="city" stroke="hsl(var(--muted-foreground))" fontSize={9} angle={-45} textAnchor="end" interval={0} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} domain={[140, 190]} />
                <Tooltip content={<ChartTooltip />} trigger="click" />
                <ReferenceLine y={avgScore} stroke="#EC1C24" strokeDasharray="4 4" label={{ value: `Avg ${avgScore}`, fill: "#EC1C24", fontSize: 10, position: "right" }} />
                <Bar dataKey="avgScore" fill="#FF6B1A" radius={[6, 6, 0, 0]} animationDuration={isMobile ? 400 : 1200} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>
      </div>
    </div>
  );
};

const Section = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5 }}
    className="rounded-2xl bg-card border border-border p-4 md:p-5 shadow-card"
  >
    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-1">
      <h3 className="font-heading text-lg">{title}</h3>
      {subtitle && <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">{subtitle}</span>}
    </div>
    {children}
  </motion.section>
);
