import { motion } from "framer-motion";
import {
  Scatter, ScatterChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip,
  ZAxis, BarChart, Bar, Cell, RadialBarChart, RadialBar, PolarAngleAxis,
} from "recharts";
import { BATTERS, ORANGE_CAP, TEAM_BY_CODE } from "@/data/ipl";
import { TeamBadge } from "@/components/TeamBadge";
import { useMemo, useState, useEffect } from "react";

export const BattingTab = () => {
  const [hovered, setHovered] = useState<typeof BATTERS[number] | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scatterData = useMemo(() => BATTERS.map((b) => ({ ...b, z: Math.max(b.hundreds * 60 + 60, 80) })), []);
  const topRuns = useMemo(() => [...BATTERS].sort((a, b) => b.runs - a.runs).slice(0, 10), []);
  const topSixes = useMemo(() => [...BATTERS].sort((a, b) => b.sixes - a.sixes).slice(0, 8), []);
  const topSr = useMemo(() => [...BATTERS].sort((a, b) => b.sr - a.sr).slice(0, 12), []);

  const srColor = (sr: number) => (sr >= 150 ? "#8B5CF6" : sr >= 140 ? "#FF6B1A" : "#0EA5E9");

  return (
    <div className="space-y-6">
      {/* Elite Quadrant / BATTING LEGENDS */}
      <Section title={isMobile ? "⭐ BATTING LEGENDS" : "⚡ The Elite Quadrant"} subtitle={isMobile ? "Swipe for legends" : "Strike Rate × Runs × Centuries"}>
        {isMobile ? (
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide -mx-1 px-1">
            {topRuns.map((b, i) => {
              const team = TEAM_BY_CODE[b.team];
              return (
                <div key={b.short} className="w-[240px] shrink-0 bg-surface border border-white/5 rounded-2xl overflow-hidden shadow-xl">
                  <div className="h-1.5" style={{ backgroundColor: team.color }} />
                  <div className="p-4 relative">
                    <div className="absolute right-4 top-2 font-display text-5xl opacity-10 text-white italic">{i + 1}</div>
                    <div className="font-bold text-lg truncate pr-10">{b.name}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-4">{team.name}</div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <Mini label="Runs" value={b.runs.toLocaleString("en-IN")} />
                      <Mini label="Avg" value={b.avg.toFixed(1)} />
                      <Mini label="SR" value={b.sr.toFixed(0)} />
                      <Mini label="50s" value="--" />
                      <Mini label="100s" value={b.hundreds} />
                      <Mini label="Mths" value={b.matches} />
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-white/5">
                       <div className="text-[9px] uppercase text-muted-foreground mb-1 font-bold">LEGEND RATING</div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(b.runs / 8100) * 100}%` }}
                            className="h-full bg-gradient-orange" 
                          />
                       </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="relative">
            {/* Quadrant labels */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none z-0">
              <div className="bg-secondary/[0.04] border-r border-b border-dashed border-border flex items-end p-3">
                <span className="font-display text-3xl text-secondary/30">VOLUME SCORER</span>
              </div>
              <div className="bg-success/[0.05] border-b border-dashed border-border flex items-end justify-end p-3">
                <span className="font-display text-3xl text-success/40">⭐ ELITE ZONE</span>
              </div>
              <div className="border-r border-dashed border-border flex items-start p-3">
                <span className="font-display text-3xl text-muted-foreground/20">DEVELOPING</span>
              </div>
              <div className="bg-primary/[0.05] flex items-start justify-end p-3">
                <span className="font-display text-3xl text-primary/40">POWER HITTER</span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={500}>
              <ScatterChart margin={{ left: 10, right: 30, top: 10, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                <XAxis
                  type="number" dataKey="sr" name="Strike Rate" domain={[110, 200]}
                  stroke="hsl(var(--muted-foreground))" fontSize={11}
                  label={{ value: "Strike Rate →", position: "insideBottom", offset: -10, fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                />
                <YAxis
                  type="number" dataKey="runs" name="Runs" domain={[2000, 8000]}
                  stroke="hsl(var(--muted-foreground))" fontSize={11}
                  label={{ value: "↑ Total Runs", angle: -90, position: "insideLeft", fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                />
                <ZAxis type="number" dataKey="z" range={[80, 600]} />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  trigger="click"
                  content={({ active, payload }: any) => {
                    if (!active || !payload?.length) return null;
                    const b = payload[0].payload;
                    setHovered(b);
                    const team = TEAM_BY_CODE[b.team];
                    return (
                      <div className="rounded-[12px] bg-[#0D0D1A]/95 backdrop-blur-[10px] border border-[rgba(255,107,26,0.4)] shadow-[0_8px_32px_rgba(0,0,0,0.5)] p-[12px_16px] min-w-[220px]" style={{ borderLeft: `3px solid ${team.color}` }}>
                        <div className="flex items-center gap-3">
                          <TeamBadge code={b.team} />
                          <div>
                            <div className="font-bold text-sm text-white">{b.name}</div>
                            <div className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-sans">{team.name} • {b.seasons}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                          <Mini label="Runs" value={b.runs.toLocaleString("en-IN")} />
                          <Mini label="SR" value={b.sr.toFixed(0)} />
                          <Mini label="100s" value={b.hundreds} />
                          <Mini label="Highest" value={b.highest} />
                          <Mini label="Matches" value={b.matches} />
                          <Mini label="Avg" value={b.avg.toFixed(1)} />
                        </div>
                      </div>
                    );
                  }}
                />
                <Scatter data={scatterData} animationDuration={1400}>
                  {scatterData.map((b) => (
                    <Cell key={b.short} fill={TEAM_BY_CODE[b.team].color} fillOpacity={0.85} stroke={TEAM_BY_CODE[b.team].color} strokeWidth={1.5} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        )}
      </Section>

      {/* Three columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Section title="🏏 Run Machines" subtitle="Top 10 scorers">
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={360}>
              <BarChart data={topRuns} layout="vertical" margin={{ left: 0, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <YAxis type="category" dataKey="short" stroke="hsl(var(--muted-foreground))" fontSize={10} width={55} />
                <Tooltip trigger="click" />
                <Bar dataKey="runs" radius={[0, 6, 6, 0]} animationDuration={isMobile ? 400 : 1200}>
                  {topRuns.map((b) => <Cell key={b.short} fill={TEAM_BY_CODE[b.team].color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4 px-2">
            {topRuns.slice(0, 5).map((b, i) => (
              <div key={b.short} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                   <span className="text-muted-foreground w-3">{i+1}</span>
                   <span className="font-bold">{b.name.length > 15 ? `${b.name.split(' ')[0][0]}. ${b.name.split(' ').slice(1).join(' ')}` : b.name}</span>
                </div>
                <TeamBadge code={b.team} className="w-7 h-7 text-[9px]" />
              </div>
            ))}
          </div>
        </Section>

        <Section title="6️⃣ Six Machines" subtitle="Most sixes — top 8">
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={isMobile ? 320 : 360}>
              <RadialBarChart innerRadius="20%" outerRadius="95%" data={topSixes} startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="number" domain={[0, 400]} tick={false} />
                <RadialBar background={{ fill: "hsl(var(--card-hover))" }} dataKey="sixes" cornerRadius={6} animationDuration={isMobile ? 400 : 1400}>
                  {topSixes.map((b) => <Cell key={b.short} fill={TEAM_BY_CODE[b.team].color} />)}
                </RadialBar>
                <Tooltip trigger="click" />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-1.5 mt-2 text-[10px]">
            {topSixes.map((b) => (
              <div key={b.short} className="flex items-center gap-1">
                <TeamBadge code={b.team} className="w-6 h-6 text-[8px]" />
                <span className="font-mono text-white/60">{b.sixes}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="⚡ Strike Rate Leaders" subtitle="Highest SR (qualifier)">
          <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1 scrollbar-hide">
            {topSr.map((b, i) => (
              <motion.div
                key={b.short}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <div className="text-[10px] text-muted-foreground w-4 text-right font-mono">{i + 1}</div>
                <div className="flex items-center gap-2 w-32 md:w-40 truncate">
                  <TeamBadge code={b.team} size={24} />
                  <div className="text-[10px] md:text-[11px] font-bold">
                    {b.name.length > 15 ? `${b.name.split(' ')[0][0]}. ${b.name.split(' ').slice(1).join(' ')}` : b.name}
                  </div>
                </div>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(b.sr - 100) / 0.8}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.04 }}
                    className="h-full rounded-full"
                    style={{ background: srColor(b.sr) }}
                  />
                </div>
                <div className="font-mono text-[10px] font-black w-10 text-right" style={{ color: srColor(b.sr) }}>
                  {b.sr}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>

      {/* Orange Cap Table */}
      <Section title="🟠 Orange Cap Honours" subtitle="Season top scorers">
        <div className="overflow-x-auto chart-wrapper">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border">
                <th className="text-left p-2 font-semibold">Year</th>
                <th className="text-left p-2 font-semibold">Player</th>
                <th className="text-right p-2 font-semibold">Runs</th>
                {!isMobile && (
                  <>
                    <th className="text-left p-2 font-semibold">Team</th>
                    <th className="text-right p-2 font-semibold">SR</th>
                    <th className="text-right p-2 font-semibold">Matches</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {ORANGE_CAP.map((r, i) => {
                const team = TEAM_BY_CODE[r.team];
                return (
                  <tr key={r.year} className={`border-b border-border/50 transition-colors hover:bg-primary/5 ${i % 2 === 0 ? "bg-surface/30" : ""}`}>
                    <td className="p-2 font-mono text-primary">{r.year}</td>
                    <td className="p-2 font-semibold truncate max-w-[140px]">
                      {r.player.length > 15 ? `${r.player.split(' ')[0][0]}. ${r.player.split(' ').slice(1).join(' ')}` : r.player}
                    </td>
                    <td className="p-2 text-right font-mono font-bold text-gradient-orange">{r.runs}</td>
                    {!isMobile && (
                      <>
                        <td className="p-2"><TeamBadge code={r.team} className="w-10" /></td>
                        <td className="p-2 text-right font-mono">{r.sr}</td>
                        <td className="p-2 text-right font-mono">{r.matches}</td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
};

const Mini = ({ label, value }: { label: string; value: any }) => (
  <div className="rounded-md bg-surface/60 p-1.5">
    <div className="text-[9px] uppercase text-muted-foreground">{label}</div>
    <div className="font-mono text-[11px] font-bold text-foreground">{value}</div>
  </div>
);

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
