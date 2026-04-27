import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { H2H, RECENT_FORM, TEAMS, TEAM_BY_CODE, VENUES } from "@/data/ipl";
import { CricketBall } from "@/components/CricketBall";
import { Sparkles, Zap, MapPin, TrendingUp, Coins, CheckCircle2, ChevronRight } from "lucide-react";

type Decision = "Bat" | "Field";

export const PredictorTab = () => {
  const [teamA, setTeamA] = useState("MI");
  const [teamB, setTeamB] = useState("CSK");
  const [venue, setVenue] = useState(VENUES[0].name);
  const [tossWinner, setTossWinner] = useState<string>("");
  const [decision, setDecision] = useState<Decision | "">("");
  const [phase, setPhase] = useState<"idle" | "analyzing" | "result">("idle");
  const [result, setResult] = useState<{ a: number; b: number } | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const A = TEAM_BY_CODE[teamA];
  const B = TEAM_BY_CODE[teamB];
  const v = VENUES.find((x) => x.name === venue)!;

  const handlePredict = () => {
    if (!tossWinner || !decision) return;
    setPhase("analyzing");
    setTimeout(() => {
      const h2h = H2H[teamA]?.[teamB] ?? { wins: 1, losses: 1 };
      const totalH2H = h2h.wins + h2h.losses;
      const aH2H = totalH2H > 0 ? h2h.wins / totalH2H : 0.5;

      const venueFactor = v.batFirstWinPct / 100;
      const aVenue = decision === "Bat" && tossWinner === teamA ? venueFactor
        : decision === "Field" && tossWinner === teamA ? 1 - venueFactor
        : decision === "Bat" && tossWinner === teamB ? 1 - venueFactor
        : venueFactor;

      const tossEffect = tossWinner === teamA ? 0.55 : 0.45;
      const formA = RECENT_FORM[teamA].filter((x) => x === "W").length / 5;
      const formB = RECENT_FORM[teamB].filter((x) => x === "W").length / 5;
      const formScore = (formA + (1 - formB)) / 2;

      let aScore = 0.35 * aH2H + 0.30 * aVenue + 0.20 * tossEffect + 0.15 * formScore;
      aScore += (Math.random() - 0.5) * 0.1;
      aScore = Math.min(0.92, Math.max(0.08, aScore));
      const aPct = Math.round(aScore * 100);
      setResult({ a: aPct, b: 100 - aPct });
      setPhase("result");
    }, 1200);
  };

  const reset = () => { setPhase("idle"); setResult(null); };

  const confidence = result ? Math.abs(result.a - 50) : 0;
  const confLabel = confidence >= 20 ? { text: "HIGH CONFIDENCE", cls: "text-success bg-success/10 border-success/30" }
                  : confidence >= 10 ? { text: "MODERATE", cls: "text-gold bg-gold/10 border-gold/30" }
                  : { text: "TOSS-UP", cls: "text-muted-foreground bg-muted border-border" };

  const winner = result && result.a > result.b ? A : result ? B : null;

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
      {/* LEFT — Configure */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-card border border-border p-5 md:p-6 shadow-card order-1">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-heading text-lg md:text-xl">Configure the Match</h3>
        </div>
        <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest mb-6 font-bold">Predict the outcome</p>

        {/* Teams */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-3">
          <TeamCard team={teamA} setTeam={setTeamA} other={teamB} />
          <div className="font-display text-xl md:text-3xl text-gradient-rainbow">VS</div>
          <TeamCard team={teamB} setTeam={setTeamB} other={teamA} />
        </div>

        {/* Venue */}
        <div className="mt-6">
          <Label icon={MapPin}>Match Venue</Label>
          <select value={venue} onChange={(e) => setVenue(e.target.value)} className="w-full mt-2 bg-surface border border-border rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-primary/50 transition-colors">
            {VENUES.map((x) => <option key={x.name} value={x.name}>{x.name}, {x.city}</option>)}
          </select>
        </div>

        {/* Toss & Decision - 2x2 on Mobile */}
        <div className={`mt-6 grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-6`}>
           <div>
              <Label icon={Coins}>Toss Winner</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {[teamA, teamB].map((t) => {
                  const team = TEAM_BY_CODE[t];
                  const active = tossWinner === t;
                  return (
                    <button key={t} onClick={() => setTossWinner(t)}
                      className={`p-2.5 md:p-3 rounded-xl border-2 transition-all flex items-center gap-2 ${active ? "scale-[1.02]" : "border-border hover:border-primary/30"}`}
                      style={active ? { borderColor: team.color, background: team.color + "15" } : {}}>
                      <div className="h-7 w-7 md:h-8 md:w-8 rounded-full grid place-items-center font-black text-white text-[10px]" style={{ background: team.color }}>{team.short.slice(0, 2)}</div>
                      <span className="font-bold text-xs md:text-sm">{team.short}</span>
                    </button>
                  );
                })}
              </div>
           </div>

           <div>
              <Label icon={Zap}>Decision</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {(["Bat", "Field"] as Decision[]).map((d) => {
                  const active = decision === d;
                  return (
                    <button key={d} onClick={() => setDecision(d)}
                      className={`p-2.5 md:p-3 rounded-xl border-2 transition-all font-bold text-xs md:text-sm ${active ? "border-primary bg-primary/15 text-primary scale-[1.02]" : "border-border text-muted-foreground hover:border-primary/30"}`}>
                      {d === "Bat" ? "🏏" : "🎯"} {d}
                    </button>
                  );
                })}
              </div>
           </div>
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
          onClick={handlePredict}
          disabled={!tossWinner || !decision || phase === "analyzing"}
          className="mt-8 w-full py-4 rounded-xl bg-gradient-orange font-heading text-lg text-white shadow-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all relative overflow-hidden flex items-center justify-center gap-2"
        >
          <span className="relative z-10 uppercase">Analyze Match</span>
          <ChevronRight className="h-5 w-5 relative z-10" />
          {phase !== "analyzing" && <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
            className="absolute inset-0 w-1/2 bg-white/20 skew-x-[-20deg]" />}
        </motion.button>

        {phase === "result" && (
          <button onClick={reset} className="mt-4 w-full py-2 text-[10px] text-muted-foreground hover:text-primary transition uppercase tracking-[0.2em] font-bold">
            ↺ Re-simulate Match
          </button>
        )}
      </motion.div>

      {/* RIGHT — Verdict */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-card border border-border p-5 md:p-6 shadow-card min-h-[400px] flex flex-col order-2">
        <AnimatePresence mode="wait">
          {phase === "idle" && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center text-center py-10">
              <CricketBall size={isMobile ? 80 : 120} spinning />
              <div className="mt-6 font-heading text-lg md:text-xl text-foreground">Waiting for parameters</div>
              <div className="text-xs text-muted-foreground mt-1 max-w-[200px] mx-auto">Input the match details to begin high-performance simulation.</div>
            </motion.div>
          )}

          {phase === "analyzing" && (
            <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center text-center py-10">
              <CricketBall size={80} spinning />
              <div className="mt-6 font-mono text-primary text-base md:text-lg">
                <TypingText text="Analyzing dynamics..." />
              </div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-2 font-bold">Processing historical data</div>
            </motion.div>
          )}

          {phase === "result" && result && winner && (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }} className="flex-1 flex flex-col">
              <div className="text-center">
                <div className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground font-black">AI Prediction</div>
                <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                  className="font-display text-5xl md:text-6xl mt-2" style={{ color: winner.color }}>
                  {winner.short}
                </motion.div>
                <div className={`inline-block mt-3 px-3 py-0.5 rounded-full text-[10px] font-black border ${confLabel.cls}`}>{confLabel.text}</div>
              </div>

              {/* Gauges or Stacked Bars on Mobile */}
              {isMobile ? (
                 <div className="mt-8 space-y-4">
                    <MobileProbabilityBar label={A.short} pct={result.a} color={A.color} />
                    <MobileProbabilityBar label={B.short} pct={result.b} color={B.color} />
                 </div>
              ) : (
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <Gauge pct={result.a} color={A.color} label={A.short} />
                  <Gauge pct={result.b} color={B.color} label={B.short} />
                </div>
              )}

              {/* Factors - 1 col on mobile */}
              <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-3 mt-8`}>
                <Factor icon="⚡" name="Historical H2H" impact="High" pos />
                <Factor icon="🏟️" name="Venue Edge" impact="Medium" pos />
              </div>

              {/* Recommendation */}
              <div className="mt-6 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-white/5 p-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10"><Swords className="h-12 w-12" /></div>
                <div className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-2">Verdict Insight</div>
                <p className="text-xs md:text-sm text-foreground/80 leading-relaxed relative z-10">
                   Historically, <span className="text-foreground font-bold">{winner.short}</span> thrives in {v.city}'s conditions. 
                   With a {Math.max(result.a, result.b)}% probability, they are strong favorites to win this clash.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const TeamCard = ({ team, setTeam, other }: { team: string; setTeam: (t: string) => void; other: string }) => {
  const t = TEAM_BY_CODE[team];
  const form = RECENT_FORM[team];
  return (
    <div className="rounded-xl bg-surface/40 border border-border p-2 md:p-3 w-full" style={{ borderColor: t.color + "30" }}>
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 md:h-10 md:w-10 rounded-full grid place-items-center font-black text-white text-[10px] shrink-0" style={{ background: t.color }}>{t.short.slice(0, 2)}</div>
        <select value={team} onChange={(e) => setTeam(e.target.value)} className="bg-transparent text-xs md:text-sm font-bold outline-none flex-1 cursor-pointer min-w-0">
          {TEAMS.filter((x) => x.code !== other).map((x) => <option key={x.code} value={x.code} className="bg-card">{x.short}</option>)}
        </select>
      </div>
      <div className="mt-2 flex items-center gap-1 overflow-hidden">
        {form.map((r, i) => (
          <span key={i} className={`h-3.5 w-3.5 md:h-4 md:w-4 shrink-0 grid place-items-center rounded text-[8px] font-black ${r === "W" ? "bg-success/20 text-success border border-success/30" : "bg-destructive/20 text-destructive border border-destructive/30"}`}>{r}</span>
        ))}
      </div>
    </div>
  );
};

const Label = ({ icon: Icon, children }: { icon: any; children: React.ReactNode }) => (
  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground font-black">
    <Icon className="h-3.5 w-3.5 text-primary" />{children}
  </div>
);

const MobileProbabilityBar = ({ label, pct, color }: { label: string; pct: number; color: string }) => (
  <div>
    <div className="flex justify-between items-end mb-1">
      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className="font-display text-xl" style={{ color }}>{pct}%</span>
    </div>
    <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="h-full rounded-full" 
        style={{ backgroundColor: color }} 
      />
    </div>
  </div>
);

const Gauge = ({ pct, color, label }: { pct: number; color: string; label: string }) => {
  const r = 60;
  const c = Math.PI * r;
  const dash = (pct / 100) * c;
  return (
    <div className="text-center">
      <svg viewBox="0 0 140 80" className="w-full">
        <path d={`M 10 70 A ${r} ${r} 0 0 1 130 70`} fill="none" stroke="hsl(var(--card-hover))" strokeWidth="10" strokeLinecap="round" />
        <motion.path
          d={`M 10 70 A ${r} ${r} 0 0 1 130 70`}
          fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={c} initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - dash }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="-mt-4">
        <CountUpFlash value={pct} color={color} />
        <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold mt-1">{label}</div>
      </div>
    </div>
  );
};

const CountUpFlash = ({ value, color }: { value: number; color: string }) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0; const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / 1200);
      setV(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <div className="font-display text-4xl md:text-5xl" style={{ color }}>{v}<span className="text-base md:text-lg align-top">%</span></div>;
};

const Factor = ({ icon, name, impact, pos }: { icon: string; name: string; impact: string; pos: boolean }) => (
  <div className="rounded-xl bg-surface/40 border border-border p-3">
    <div className="flex items-center justify-between mb-2">
       <div className="flex items-center gap-2">
          <span className="text-base">{icon}</span>
          <span className="text-xs font-bold">{name}</span>
       </div>
      {pos
        ? <CheckCircle2 className="h-3.5 w-3.5 text-success" />
        : <span className="h-3.5 w-3.5 grid place-items-center text-destructive font-black text-[10px]">✕</span>}
    </div>
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1 bg-card-hover rounded-full overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: impact === "High" ? "90%" : impact === "Medium" ? "60%" : "40%" }}
          transition={{ duration: 1, delay: 0.3 }} className="h-full bg-gradient-orange rounded-full" />
      </div>
      <span className="text-[8px] uppercase tracking-widest text-muted-foreground font-black">{impact}</span>
    </div>
  </div>
);

const TypingText = ({ text }: { text: string }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => { i++; setN(i); if (i >= text.length) clearInterval(id); }, 40);
    return () => clearInterval(id);
  }, [text]);
  return <span>{text.slice(0, n)}<span className="animate-pulse">▎</span></span>;
};
