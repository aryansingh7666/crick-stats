import { motion } from "framer-motion";
import {
  Scatter, ScatterChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip,
  ZAxis, BarChart, Bar, Cell, ReferenceArea,
} from "recharts";
import { BOWLERS, PURPLE_CAP, TEAM_BY_CODE } from "@/data/ipl";
import { TeamBadge } from "@/components/TeamBadge";
import { useMemo, useState, useEffect } from "react";

export const BowlingTab = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scatterData = useMemo(() => BOWLERS.map((b) => ({ ...b, z: b.matches })), []);
  const topWickets = useMemo(() => [...BOWLERS].sort((a, b) => b.wickets - a.wickets).slice(0, 10), []);
  const bestEcon = useMemo(() => [...BOWLERS].filter((b) => b.wickets >= 50).sort((a, b) => a.economy - b.economy).slice(0, 10), []);

  return (
    <div className="space-y-6">
      <Section title={isMobile ? "⭐ ELITE BOWLERS" : "🎯 The Death Zone Chart"} subtitle={isMobile ? "Swipe for top wicket-takers" : "Economy × Wickets — Pace vs Spin"}>
        {isMobile ? (
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide -mx-1 px-1">
            {topWickets.map((b, i) => {
              const team = TEAM_BY_CODE[b.team];
              return (
                <div key={b.short} className="w-[220px] shrink-0 bg-surface border border-white/5 rounded-2xl overflow-hidden shadow-xl">
                  <div className="h-1.5" style={{ backgroundColor: team?.color ?? "#888" }} />
                  <div className="p-4 relative">
                    <div className="absolute right-4 top-2 font-display text-5xl opacity-10 text-white italic">{i + 1}</div>
                    <div className="font-bold text-lg truncate pr-10">{b.name}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-4">{team?.name ?? "Unknown"} • {b.type}</div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <Mini label="Wickets" value={b.wickets} />
                      <Mini label="Eco" value={b.economy} />
                      <Mini label="Mths" value={b.matches} />
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-white/5">
                       <div className="text-[9px] uppercase text-muted-foreground mb-1 font-bold">WICKET DENSITY</div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(b.wickets / 200) * 100}%` }}
                            className="h-full bg-secondary" 
                          />
                       </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={500}>
              <ScatterChart margin={{ left: 10, right: 30, top: 10, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                <XAxis
                  type="number" dataKey="economy" name="Economy" domain={[6, 10]}
                  stroke="hsl(var(--muted-foreground))" fontSize={11}
                  label={{ value: "Economy Rate →", position: "insideBottom", offset: -10, fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                />
                <YAxis
                  type="number" dataKey="wickets" name="Wickets" domain={[80, 220]}
                  stroke="hsl(var(--muted-foreground))" fontSize={11}
                  label={{ value: "↑ Wickets", angle: -90, position: "insideLeft", fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                />
                <ZAxis type="number" dataKey="z" range={[80, 400]} />
                <ReferenceArea x1={6} x2={7.5} y1={140} y2={220} fill="#10B981" fillOpacity={0.08} stroke="#10B981" strokeOpacity={0.4} strokeDasharray="4 4" label={{ value: "🎯 The Sweet Spot", fill: "#10B981", fontSize: 12, position: "insideTopLeft" }} />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  trigger="click"
                  content={({ active, payload }: any) => {
                    if (!active || !payload?.length) return null;
                    const b = payload[0].payload;
                    const team = TEAM_BY_CODE[b.team];
                    return (
                      <div className="rounded-[12px] bg-[#0D0D1A]/95 backdrop-blur-[10px] border border-[rgba(255,107,26,0.4)] shadow-[0_8px_32px_rgba(0,0,0,0.5)] p-[12px_16px] min-w-[220px]" style={{ borderLeft: `3px solid ${team.color}` }}>
                        <div className="flex items-center gap-3">
                          <TeamBadge code={b.team} />
                          <div>
                            <div className="font-bold text-sm text-white">{b.name}</div>
                            <div className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-sans">{team.name} • {b.type}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                          <Mini label="Wickets" value={b.wickets} />
                          <Mini label="Economy" value={b.economy} />
                          <Mini label="Matches" value={b.matches} />
                        </div>
                      </div>
                    );
                  }}
                />
                <Scatter data={scatterData} animationDuration={1400}>
                  {scatterData.map((b) => (
                    <Cell key={b.short} fill={b.type === "Pace" ? "#FF6B1A" : "#0EA5E9"} fillOpacity={0.85} stroke={b.type === "Pace" ? "#FF6B1A" : "#0EA5E9"} strokeWidth={1.5} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-primary" /> Pace</span>
              <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-secondary" /> Spin</span>
              <span className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-success/40 border border-success" /> Sweet spot</span>
            </div>
          </>
        )}
      </Section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Section title="🎯 Wicket Takers" subtitle="Top 10 all-time">
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={isMobile ? 320 : 360}>
              <BarChart data={topWickets} layout="vertical" margin={{ left: 0, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <YAxis type="category" dataKey="short" stroke="hsl(var(--muted-foreground))" fontSize={10} width={60} />
                <Tooltip trigger="click" />
                <Bar dataKey="wickets" radius={[0, 6, 6, 0]} animationDuration={isMobile ? 400 : 1200}>
                  {topWickets.map((b) => <Cell key={b.short} fill={TEAM_BY_CODE[b.team].color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4 px-2">
            {topWickets.slice(0, 5).map((b, i) => (
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

        <Section title="💎 Economy Leaders" subtitle="min 50 wickets">
          <div className="chart-wrapper h-[360px] flex flex-col justify-center">
            <div className="flex justify-between items-center mb-4 px-4 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
              <span>← Better Economy</span>
              <span>Bowling Control</span>
            </div>
            <div className="space-y-4 px-4 overflow-y-auto scrollbar-hide">
              {bestEcon.map((b, i) => {
                const team = TEAM_BY_CODE[b.team];
                const dotColor = b.economy < 7.0 ? "#00D9A3" : b.economy <= 7.5 ? "#FF6B1A" : "#FF4757";
                return (
                  <div key={b.short} className="flex items-center gap-4">
                    <div className="w-28 text-[10px] md:text-xs font-bold truncate">
                      {b.name.length > 15 ? `${b.name.split(' ')[0][0]}. ${b.name.split(' ').slice(1).join(' ')}` : b.name}
                    </div>
                    <div className="flex-1 h-[2px] bg-white/5 relative">
                      <motion.div 
                        initial={{ left: "100%" }}
                        whileInView={{ left: `${((b.economy - 6) / 3) * 100}%` }}
                        viewport={{ once: true }}
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-background z-10"
                        style={{ backgroundColor: dotColor, boxShadow: `0 0 10px ${dotColor}` }}
                      />
                      <div className="absolute top-1/2 -translate-y-1/2 left-0 h-full bg-gradient-to-r from-transparent to-white/10" style={{ width: `${((b.economy - 6) / 3) * 100}%` }} />
                    </div>
                    <div className="w-10 text-right font-mono text-xs font-bold" style={{ color: dotColor }}>{b.economy}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </Section>
      </div>

      <Section title="🟣 Purple Cap Honours" subtitle="Season highest wicket-takers">
        <div className="overflow-x-auto chart-wrapper">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border">
                <th className="text-left p-2">Year</th>
                <th className="text-left p-2">Player</th>
                <th className="text-right p-2">Wickets</th>
                {!isMobile && (
                  <>
                    <th className="text-left p-2">Team</th>
                    <th className="text-right p-2">Economy</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {PURPLE_CAP.map((r, i) => {
                const team = TEAM_BY_CODE[r.team];
                return (
                  <tr key={r.year} className={`border-b border-border/50 transition-colors hover:bg-purple/5 ${i % 2 === 0 ? "bg-surface/30" : ""}`}>
                    <td className="p-2 font-mono text-purple">{r.year}</td>
                    <td className="p-2 font-semibold truncate max-w-[140px]">
                      {r.player.length > 15 ? `${r.player.split(' ')[0][0]}. ${r.player.split(' ').slice(1).join(' ')}` : r.player}
                    </td>
                    <td className="p-2 text-right font-mono font-bold text-gradient-blue">{r.wickets}</td>
                    {!isMobile && (
                      <>
                        <td className="p-2"><TeamBadge code={r.team} className="w-10" /></td>
                        <td className="p-2 text-right font-mono">{r.economy}</td>
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
