import { motion } from "framer-motion";
import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
  PieChart, Pie, Cell, AreaChart, Area, Legend,
} from "recharts";
import { CHAMPIONS, SEASON_MATCHES, TEAM_BY_CODE, TEAMS, TOSS_IMPACT } from "@/data/ipl";
import { ChartTooltip } from "@/components/ChartTooltip";
import { TeamBadge } from "@/components/TeamBadge";
import { Trophy, Zap, ChevronRight } from "lucide-react";
import { useState, useMemo, useEffect } from "react";

export const OverviewTab = () => {
  const [activeYear, setActiveYear] = useState<number>(2025);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const dynastyData = [
    { team: "MI", wins: 144, color: "#1E88E5", fullName: "Mumbai Indians" },
    { team: "CSK", wins: 138, color: "#FDD835", fullName: "Chennai Super Kings" },
    { team: "RCB", wins: 118, color: "#E53935", fullName: "Royal Challengers Bengaluru" },
    { team: "KKR", wins: 112, color: "#7B1FA2", fullName: "Kolkata Knight Riders" },
    { team: "SRH", wins: 98, color: "#FB8C00", fullName: "Sunrisers Hyderabad" },
    { team: "DC", wins: 95, color: "#1565C0", fullName: "Delhi Capitals" },
    { team: "RR", wins: 88, color: "#E91E8C", fullName: "Rajasthan Royals" },
    { team: "PBKS", wins: 85, color: "#EF5350", fullName: "Punjab Kings" },
    { team: "GT", wins: 42, color: "#00ACC1", fullName: "Gujarat Titans" },
    { team: "LSG", wins: 38, color: "#26A69A", fullName: "Lucknow Super Giants" },
    { team: "DCH", wins: 28, color: "#78909C", fullName: "Deccan Chargers" },
  ].sort((a, b) => b.wins - a.wins);

  const titleData = useMemo(
    () => TEAMS.filter((t) => t.titles > 0).sort((a, b) => b.titles - a.titles),
    [],
  );
  const activeChamp = CHAMPIONS.find((c) => c.year === activeYear)!;

  return (
    <div className="space-y-6">
      {/* Championship timeline */}
      <Section title="🏆 Championship Timeline" subtitle="18 years of glory">
        {isMobile ? (
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
            {[...CHAMPIONS].reverse().map((c) => {
              const team = TEAM_BY_CODE[c.champion];
              const isActive = c.year === activeYear;
              return (
                <button
                  key={c.year}
                  onClick={() => setActiveYear(c.year)}
                  className={`w-full flex items-center gap-4 p-3 rounded-xl border transition-all ${
                    isActive ? "bg-primary/20 border-primary shadow-[0_4px_15px_rgba(207,109,252,0.15)]" : "bg-white border-purple-50"
                  }`}
                >
                  <div className="w-12 text-left font-mono text-sm font-bold text-muted-foreground">{c.year}</div>
                  <div className="h-8 w-8 rounded-full grid place-items-center" style={{ backgroundColor: `${team.color}33` }}>
                    <Trophy className="h-4 w-4" style={{ color: team.color }} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-bold text-foreground">{team.name}</div>
                    <div className="text-[10px] text-muted-foreground">vs {TEAM_BY_CODE[c.runnerUp].short}</div>
                  </div>
                  {isActive && <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-hide pb-2">
            <div className="flex items-center gap-2 min-w-max px-1">
              {CHAMPIONS.map((c, i) => {
                const team = TEAM_BY_CODE[c.champion];
                const isActive = c.year === activeYear;
                const isRCB2025 = c.year === 2025 && c.champion === "RCB";
                return (
                  <motion.button
                    key={c.year}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => setActiveYear(c.year)}
                    className="group relative flex flex-col items-center w-[72px] shrink-0"
                  >
                    <div
                      className={`h-12 w-12 grid place-items-center rounded-full border-2 transition-all ${
                      isActive ? "scale-110 shadow-[0_8px_20px_rgba(207,109,252,0.3)]" : "group-hover:scale-110"
                    } ${isRCB2025 ? "animate-pulse shadow-[0_0_25px_#EC1C24]" : ""}`}
                      style={{
                        background: isRCB2025 ? "#EC1C2433" : `${team.color}22`,
                        borderColor: isRCB2025 ? "#EC1C24" : isActive ? "hsl(var(--primary))" : team.color,
                      }}
                    >
                      {isRCB2025 ? (
                        <div className="relative">
                          <Trophy className="h-5 w-5 text-[#FFD700]" />
                          <motion.div
                            initial={{ rotate: -20, y: -8 }}
                            animate={{ rotate: 20, y: -10 }}
                            transition={{ repeat: Infinity, repeatType: "mirror", duration: 1 }}
                            className="absolute -top-3 -right-2 text-xs"
                          >
                            👑
                          </motion.div>
                        </div>
                      ) : (
                        <Trophy className="h-5 w-5" style={{ color: team.color }} />
                      )}
                    </div>
                    <div className="mt-2 font-mono text-[10px] text-muted-foreground">{c.year}</div>
                    <TeamBadge code={c.champion} className="mt-1" />
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* Active year detail */}
        <motion.div
          key={activeYear}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3"
        >
          <Stat label="Champion" value={TEAM_BY_CODE[activeChamp.champion].name} accent={TEAM_BY_CODE[activeChamp.champion].color} />
          <Stat label="Runner-up" value={TEAM_BY_CODE[activeChamp.runnerUp].name} accent={TEAM_BY_CODE[activeChamp.runnerUp].color} />
          <Stat label="Final Venue" value={activeChamp.venue} />
          {activeChamp.score ? (
            <Stat label="Result" value={activeChamp.score} />
          ) : (
            <Stat label="Player of Match" value={activeChamp.potm} />
          )}
        </motion.div>
      </Section>

      {/* Dynasty + Title distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Section title="👑 Dynasty Chart" subtitle="All-time wins by franchise">
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={isMobile ? 320 : 380}>
              <BarChart data={dynastyData} layout="vertical" margin={{ left: 0, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={isMobile ? 10 : 11} />
                <YAxis type="category" dataKey="team" stroke="hsl(var(--muted-foreground))" fontSize={isMobile ? 10 : 12} width={40} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "hsl(var(--card-hover) / 0.5)" }} trigger="click" />
                <Bar dataKey="wins" radius={[0, 8, 8, 0]} animationDuration={isMobile ? 400 : 1200}>
                  {dynastyData.map((t) => <Cell key={t.team} fill={t.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>

        <Section title="🏆 Title Distribution" subtitle="Trophies among champions">
          {isMobile ? (
            <div className="space-y-4">
              {titleData.map((t) => (
                <div key={t.code} className="flex items-center gap-4">
                  <div className="w-10 text-xs font-bold text-muted-foreground">{t.short}</div>
                  <div className="flex-1 h-3 bg-purple-50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(t.titles / 5) * 100}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full" 
                      style={{ backgroundColor: t.color }} 
                    />
                  </div>
                  <div className="w-12 text-right text-xs font-black">{t.titles} {t.titles === 1 ? 'TITLE' : 'TITLES'}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative h-[380px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={titleData}
                    dataKey="titles"
                    nameKey="short"
                    innerRadius={80}
                    outerRadius={140}
                    paddingAngle={2}
                    animationDuration={1400}
                  >
                    {titleData.map((t) => <Cell key={t.code} fill={t.color} stroke="hsl(var(--background))" strokeWidth={3} />)}
                  </Pie>
                  <Tooltip content={<ChartTooltip />} trigger="click" />
                  <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 10 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <Trophy className="inline h-10 w-10 text-gold" />
                <div className="text-xs text-muted-foreground mt-1 uppercase tracking-widest">18 Seasons</div>
              </div>
            </div>
          )}
        </Section>
      </div>

      {/* Season growth + Toss impact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Section title="📈 Season Growth" subtitle="Matches played per year">
          <div className="chart-wrapper" style={{ height: '280px', paddingBottom: '20px', overflow: 'visible' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SEASON_MATCHES}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#CF6DFC" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#CF6DFC" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={isMobile ? 9 : 11} tick={{ angle: isMobile ? -45 : 0, textAnchor: isMobile ? 'end' : 'middle' } as any} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={isMobile ? 9 : 11} />
                <Tooltip content={<ChartTooltip />} trigger="click" />
                <Area type="monotone" dataKey="matches" stroke="#CF6DFC" strokeWidth={2.5} fill="url(#areaGrad)" animationDuration={isMobile ? 400 : 1400} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Section>

        <Section title="🪙 Toss Impact" subtitle="Bat first vs Chase wins">
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={isMobile ? 280 : 300}>
              <BarChart data={TOSS_IMPACT} stackOffset="expand">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={isMobile ? 9 : 11} tick={{ angle: isMobile ? -45 : 0, textAnchor: isMobile ? 'end' : 'middle' } as any} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={isMobile ? 9 : 11} tickFormatter={(v) => `${Math.round(v * 100)}%`} />
                <Tooltip content={<ChartTooltip />} trigger="click" />
                <Legend wrapperStyle={{ fontSize: 10 }} verticalAlign="bottom" />
                <Bar dataKey="batFirst" stackId="a" fill="#CF6DFC" name="Bat First" />
                <Bar dataKey="chase" stackId="a" fill="#BDB96A" name="Chase" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Insight text="MI & CSK lead the dynasty era with 5 titles each — accounting for 55% of all IPL crowns." />
        <Insight text="Chasing remains dominant — 2025 saw a high chase-win ratio at the Narendra Modi Stadium." />
        <Insight text="2022 expansion to 10 teams pushed total matches to 74, the highest in IPL history." />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="rounded-xl bg-gradient-to-br from-[#CF6DFC] to-[#9B4DE0] p-4 text-white shadow-xl flex flex-col justify-center border-2 border-purple-100 relative overflow-hidden"
        >
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <Trophy className="h-24 w-24 text-white" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-black uppercase tracking-tighter bg-white/20 px-1.5 py-0.5 rounded">HISTORIC MOMENT</span>
            </div>
            <h4 className="font-heading text-lg leading-tight">RCB's Maiden Title — 2025</h4>
            <p className="text-[10px] opacity-90 mt-1 uppercase font-bold tracking-widest">18 Years. Finally. Champions.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Section = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    className="rounded-2xl bg-card border border-border p-4 md:p-5 shadow-card"
  >
    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-1">
      <h3 className="font-heading text-lg text-foreground">{title}</h3>
      {subtitle && <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">{subtitle}</span>}
    </div>
    {children}
  </motion.section>
);

const Stat = ({ label, value, accent }: { label: string; value: string; accent?: string }) => (
  <div className="rounded-xl bg-surface/60 border border-border p-3">
    <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{label}</div>
    <div className="text-xs md:text-sm font-bold mt-1 truncate" style={accent ? { color: accent } : {}}>{value}</div>
  </div>
);

const Insight = ({ text }: { text: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="rounded-xl bg-card border border-border p-4 border-l-4 border-l-primary flex gap-3"
  >
    <Zap className="h-5 w-5 text-primary shrink-0 mt-0.5" />
    <p className="text-sm text-foreground/90">{text}</p>
  </motion.div>
);
