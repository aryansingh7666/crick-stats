import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { H2H, TEAMS, TEAM_BY_CODE, VENUES } from "@/data/ipl";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Flame, Swords } from "lucide-react";

export const H2HTab = () => {
  const [teamA, setTeamA] = useState<string>("MI");
  const [teamB, setTeamB] = useState<string>("CSK");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const stats = useMemo(() => {
    const aWins = H2H[teamA]?.[teamB]?.wins ?? 0;
    const bWins = H2H[teamA]?.[teamB]?.losses ?? 0;
    const total = aWins + bWins;
    return { aWins, bWins, total };
  }, [teamA, teamB]);

  const A = TEAM_BY_CODE[teamA];
  const B = TEAM_BY_CODE[teamB];

  // Generate fake last-10 results
  const last10 = useMemo(() => {
    const seed = teamA.charCodeAt(0) + teamB.charCodeAt(0);
    return Array.from({ length: 10 }).map((_, i) => {
      const winner = ((seed + i * 7) % 10) < (stats.aWins / Math.max(1, stats.total) * 10) ? teamA : teamB;
      const margin = 5 + ((seed + i * 13) % 60);
      const venue = VENUES[(seed + i * 3) % VENUES.length];
      const isRuns = i % 2 === 0;
      return {
        season: 2024 - i,
        venue: `${venue.name}, ${venue.city}`,
        winner,
        margin: isRuns ? `${margin} runs` : `${Math.min(8, 1 + (margin % 8))} wkts`,
        potm: ["V. Kohli", "MS Dhoni", "Bumrah", "Rashid", "Hardik", "Pant", "Gill", "Russell", "Bhuvi", "Ashwin"][i],
      };
    });
  }, [teamA, teamB, stats]);

  const avgMargin = useMemo(() => Math.round(last10.reduce((s, m) => s + parseInt(m.margin), 0) / last10.length), [last10]);

  const pieData = [
    { name: A.short, value: stats.aWins, color: A.color },
    { name: B.short, value: stats.bWins, color: B.color },
  ];

  const recentA = last10.slice(0, 5).filter((m) => m.winner === teamA).length;
  const insight = recentA >= 4
    ? `🔥 ${A.short} has dominated recent meetings — winning ${recentA} of the last 5 clashes.`
    : recentA <= 1
    ? `⚡ ${B.short} has flipped the rivalry — winning ${5 - recentA} of the last 5.`
    : `🎯 The rivalry is razor-tight — last 5 meetings split nearly down the middle.`;

  return (
    <div className="space-y-6">
      {/* Selectors */}
      <div className="flex flex-col md:grid md:grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-4">
        <TeamSelector value={teamA} onChange={setTeamA} other={teamB} accent="orange" isMobile={isMobile} />
        <div className="grid place-items-center h-8 md:h-auto">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="font-display text-2xl md:text-4xl text-gradient-rainbow"
          >
            VS
          </motion.div>
        </div>
        <TeamSelector value={teamB} onChange={setTeamB} other={teamA} accent="blue" isMobile={isMobile} />
      </div>

      {/* Stat strip */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-3">
        <StripStat label={`${A.short} Wins`} value={stats.aWins} highlight={stats.aWins > stats.bWins} color={A.color} />
        <StripStat label="Meetings" value={stats.total} />
        <StripStat label={`${B.short} Wins`} value={stats.bWins} highlight={stats.bWins > stats.aWins} color={B.color} />
        <StripStat label="Avg Margin" value={`${avgMargin}`} suffix=" runs" className={isMobile ? "col-span-1" : ""} />
        <StripStat label="Last Winner" value={last10[0].winner} color={TEAM_BY_CODE[last10[0].winner].color} className={isMobile ? "col-span-2" : ""} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut */}
        <Section title="📊 Rivalry Split">
          <div className="relative">
            <ResponsiveContainer width="100%" height={isMobile ? 240 : 320}>
              <PieChart>
                <Pie data={pieData} dataKey="value" innerRadius={isMobile ? 55 : 80} outerRadius={isMobile ? 90 : 130} paddingAngle={3} animationDuration={isMobile ? 400 : 1200}>
                  {pieData.map((d) => <Cell key={d.name} fill={d.color} stroke="hsl(var(--background))" strokeWidth={3} />)}
                </Pie>
                <Tooltip trigger="click" />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 grid place-items-center pointer-events-none">
              <div className="text-center">
                <Swords className="h-6 w-6 text-muted-foreground mx-auto mb-1 opacity-20" />
                <div className="text-[9px] uppercase tracking-widest text-muted-foreground">{stats.total} MTGS</div>
              </div>
            </div>
          </div>
        </Section>

        {/* Rivalry insight */}
        <Section title="🔥 Rivalry Pulse">
          <div className="space-y-4">
            <div className="rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 p-4 md:p-5">
              <Flame className="h-6 w-6 md:h-7 md:w-7 text-primary mb-2" />
              <p className="text-sm md:text-base text-foreground/90 leading-relaxed">{insight}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-card-hover/40 border border-border p-3">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{A.short} Win %</div>
                <div className="font-display text-2xl md:text-3xl mt-1" style={{ color: A.color }}>
                  {stats.total > 0 ? Math.round((stats.aWins / stats.total) * 100) : 0}%
                </div>
              </div>
              <div className="rounded-xl bg-card-hover/40 border border-border p-3">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{B.short} Win %</div>
                <div className="font-display text-2xl md:text-3xl mt-1" style={{ color: B.color }}>
                  {stats.total > 0 ? Math.round((stats.bWins / stats.total) * 100) : 0}%
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* Results Timeline */}
      <Section title="⏱️ Match Timeline">
        <div className={`flex ${isMobile ? 'flex-col gap-3 max-h-[400px] overflow-y-auto pr-2' : 'gap-2 overflow-x-auto pb-2 scrollbar-hide'}`}>
          {last10.map((m, i) => {
            const w = TEAM_BY_CODE[m.winner];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isMobile ? -20 : 0, y: isMobile ? 0 : 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`${isMobile ? 'w-full flex items-center justify-between' : 'w-32 shrink-0'} rounded-xl border p-3 transition hover:border-primary/50`}
                style={{ background: w.color + "12", borderColor: w.color + "30" }}
              >
                <div className={isMobile ? 'flex items-center gap-4' : ''}>
                   <div className="text-[10px] font-mono text-muted-foreground">{m.season}</div>
                   <div className={`font-display ${isMobile ? 'text-lg' : 'text-xl mt-1'}`} style={{ color: w.color }}>{m.winner}</div>
                </div>
                <div className={`text-[10px] font-bold ${isMobile ? 'text-foreground' : 'text-foreground/70 mt-1 truncate'}`}>{m.margin}</div>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* Last 10 table */}
      <Section title="📋 Last 10 Meetings">
        <div className="overflow-x-auto chart-wrapper">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border">
                <th className="text-left p-2">Season</th>
                <th className="text-left p-2">Winner</th>
                <th className="text-left p-2">Margin</th>
                {!isMobile && <th className="text-left p-2">Venue</th>}
                {!isMobile && <th className="text-left p-2">Player of Match</th>}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="wait">
                {last10.map((m, i) => {
                  const w = TEAM_BY_CODE[m.winner];
                  return (
                    <motion.tr
                      key={`${teamA}-${teamB}-${i}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-border/40"
                      style={{ background: w.color + "08" }}
                    >
                      <td className="p-2 font-mono text-xs">{m.season}</td>
                      <td className="p-2 font-bold text-xs" style={{ color: w.color }}>{w.short}</td>
                      <td className="p-2 font-mono text-[10px]">{m.margin}</td>
                      {!isMobile && <td className="p-2 text-muted-foreground text-xs">{m.venue}</td>}
                      {!isMobile && <td className="p-2 text-xs">{m.potm}</td>}
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
};

const TeamSelector = ({ value, onChange, other, accent, isMobile }: { value: string; onChange: (v: string) => void; other: string; accent: "orange" | "blue"; isMobile: boolean }) => {
  const team = TEAM_BY_CODE[value];
  const ringClass = accent === "orange" ? "ring-primary/20" : "ring-secondary/20";
  return (
    <div className={`rounded-2xl bg-card border border-border ring-4 ${ringClass} p-3 md:p-4 transition-all w-full`}
         style={{ borderColor: team.color + "40" }}>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 md:h-14 md:w-14 rounded-full grid place-items-center font-black text-white text-base md:text-lg shrink-0 shadow-lg" style={{ background: team.color }}>
          {team.short.slice(0, 2)}
        </div>
        <div className="flex-1 min-w-0">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-transparent w-full font-heading text-base md:text-lg outline-none cursor-pointer"
          >
            {TEAMS.filter((t) => t.code !== other).map((t) => (
              <option key={t.code} value={t.code} className="bg-card">{t.name}</option>
            ))}
          </select>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">{team.titles} titles • {team.totalWins} wins</div>
        </div>
      </div>
    </div>
  );
};

const StripStat = ({ label, value, highlight, color, suffix, className }: { label: string; value: any; highlight?: boolean; color?: string; suffix?: string; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
    className={`rounded-xl border p-2 md:p-3 text-center ${highlight ? "border-primary/50 bg-primary/5" : "border-border bg-card"} ${className}`}
    style={highlight && color ? { borderColor: color + "80", background: color + "10" } : {}}
  >
    <div className="text-[8px] md:text-[10px] uppercase tracking-widest text-muted-foreground font-black truncate">{label}</div>
    <div className="font-display text-xl md:text-3xl mt-1 truncate" style={color ? { color } : {}}>{value}{suffix}</div>
  </motion.div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
    className="rounded-2xl bg-card border border-border p-4 md:p-5 shadow-card"
  >
    <h3 className="font-heading text-base md:text-lg mb-4">{title}</h3>
    {children}
  </motion.section>
);
