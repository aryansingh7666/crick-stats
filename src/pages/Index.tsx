import { lazy, Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar, type TabId } from "@/components/Navbar";
import { Sidebar, FilterControls } from "@/components/Sidebar";
import { LoadingSplash } from "@/components/LoadingSplash";
import { KpiCard } from "@/components/KpiCard";
import { RCBBanner } from "@/components/RCBBanner";
import { BottomNav } from "@/components/BottomNav";
import { KPIS, TEAM_BY_CODE } from "@/data/ipl";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const OverviewTab = lazy(() => import("@/tabs/OverviewTab").then((m) => ({ default: m.OverviewTab })));
const BattingTab = lazy(() => import("@/tabs/BattingTab").then((m) => ({ default: m.BattingTab })));
const BowlingTab = lazy(() => import("@/tabs/BowlingTab").then((m) => ({ default: m.BowlingTab })));
const VenuesTab = lazy(() => import("@/tabs/VenuesTab").then((m) => ({ default: m.VenuesTab })));
const H2HTab = lazy(() => import("@/tabs/H2HTab").then((m) => ({ default: m.H2HTab })));
const PredictorTab = lazy(() => import("@/tabs/PredictorTab").then((m) => ({ default: m.PredictorTab })));
const RecordsWall = lazy(() => import("@/components/RecordsWall").then((m) => ({ default: m.RecordsWall })));
const DreamXI = lazy(() => import("@/components/DreamXI").then((m) => ({ default: m.DreamXI })));
const Quiz = lazy(() => import("@/components/Quiz").then((m) => ({ default: m.Quiz })));

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState<TabId>("overview");
  const [collapsed, setCollapsed] = useState(false);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  // sidebar filter state (filters are visual; data is hardcoded)
  const [seasonRange, setSeasonRange] = useState<[number, number]>([2008, 2024]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedVenue, setSelectedVenue] = useState("all");
  const [matchType, setMatchType] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1700);
    return () => clearTimeout(t);
  }, []);

  const resetFilters = () => {
    setSeasonRange([2008, 2024]);
    setSelectedTeams([]);
    setSelectedVenue("all");
    setMatchType("");
  };

  const hasActiveFilters = selectedTeams.length > 0 || selectedVenue !== "all" || matchType !== "" || seasonRange[0] !== 2008 || seasonRange[1] !== 2024;

  return (
    <>
      <RCBBanner />
      <LoadingSplash done={loaded} />

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar active={tab} onChange={setTab} onOpenFilters={() => setIsFilterSheetOpen(true)} />

        {/* Mobile Active Filter Pills */}
        {hasActiveFilters && (
          <div className="md:hidden flex items-center gap-2 px-4 py-2 overflow-x-auto scrollbar-hide border-b border-white/5 bg-white/5">
            {selectedTeams.map(team => (
              <FilterPill key={team} label={team} onDismiss={() => setSelectedTeams(prev => prev.filter(t => t !== team))} />
            ))}
            {selectedVenue !== "all" && (
              <FilterPill label={selectedVenue} onDismiss={() => setSelectedVenue("all")} />
            )}
            {matchType !== "" && (
              <FilterPill label={matchType} onDismiss={() => setMatchType("")} />
            )}
            {(seasonRange[0] !== 2008 || seasonRange[1] !== 2024) && (
              <FilterPill label={`${seasonRange[0]}-${seasonRange[1]}`} onDismiss={() => setSeasonRange([2008, 2024])} />
            )}
          </div>
        )}

        <div className="flex flex-1 w-full">
          <Sidebar
            collapsed={collapsed}
            onToggle={() => setCollapsed((c) => !c)}
            seasonRange={seasonRange} setSeasonRange={setSeasonRange}
            selectedTeams={selectedTeams} setSelectedTeams={setSelectedTeams}
            selectedVenue={selectedVenue} setSelectedVenue={setSelectedVenue}
            matchType={matchType} setMatchType={setMatchType}
          />

          <main className="flex-1 min-w-0 p-4 lg:p-6 space-y-6 pb-24 md:pb-6">
            {/* HERO */}
            <section className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-glass border-primary/20 p-6 lg:p-10">
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none overflow-hidden">
                <svg viewBox="0 0 1000 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full">
                  <path d="M0 400C150 340 350 310 500 310C650 310 850 340 1000 400H0Z" fill="white"/>
                  <path d="M480 310V280H520V310H480Z" fill="white"/>
                  <path d="M100 360L120 180L160 330" stroke="white" strokeWidth="4"/>
                  <path d="M900 360L880 180L840 330" stroke="white" strokeWidth="4"/>
                  <circle cx="120" cy="180" r="10" fill="white"/>
                  <circle cx="880" cy="180" r="10" fill="white"/>
                </svg>
              </div>
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
              
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                  className="flex items-end justify-between flex-wrap gap-6 mb-10"
                >
                  <div>
                    <h1 className="font-display tracking-tight text-foreground leading-[0.9]">
                      IPL <span className="text-gradient-orange">INTELLIGENCE</span>
                    </h1>
                    <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-[0.4em] mt-3 font-bold">
                      18 seasons · {KPIS.totalMatches} matches · infinite drama
                    </p>
                  </div>
                  <div className="hidden md:flex items-center gap-4 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    <div className="h-2 w-2 rounded-full bg-success pulse-dot" />
                    <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                      Live sync active
                    </div>
                  </div>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 lg:gap-4">
                  <KpiCard icon="🏏" label="Total Matches" value={KPIS.totalMatches} accent="orange" delay={0.0}
                    context="From 59 in 2008 to 74 in 2025 — IPL has reached record scale." />
                  <KpiCard icon="🏆" label="Total Seasons" value={KPIS.totalSeasons} accent="gold" delay={0.05}
                    context="18 seasons of evolution, from Tendulkar's MI to RCB's 2025 glory." contextLabel="2008–25" />
                  <KpiCard icon="6️⃣" label="Total Sixes" value={KPIS.totalSixes} accent="purple" delay={0.10}
                    context="Gayle owns 357 of these — the ultimate maximum machine." />
                  <KpiCard icon="🎯" label="Highest Score" value={287} rawText="287" accent="green" delay={0.15}
                    context={<>SRH vs RCB, 2024 — A historic onslaught of 287/3.</>} contextLabel="One innings" />
                  <KpiCard icon="👑" label="Most Titles" value={5} rawText="5" accent="pink" delay={0.20}
                    context="MI & CSK lead the table with 5 titles each. RCB joined the list in 2025." contextLabel="MI & CSK" />
                  <KpiCard icon="⚡" label="Most Runs" value={KPIS.mostRuns.runs} accent="cyan" delay={0.25}
                    context="Virat Kohli — RCB's one-club legend, 8,100+ runs and counting." contextLabel="V. Kohli" />
                </div>
              </div>
            </section>

            {/* TAB CONTENT */}
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              >
                <Suspense fallback={<TabSkeleton />}>
                  {tab === "overview"  && <OverviewTab />}
                  {tab === "batting"   && <BattingTab />}
                  {tab === "bowling"   && <BowlingTab />}
                  {tab === "venues"    && <VenuesTab />}
                  {tab === "h2h"       && <H2HTab />}
                  {tab === "predictor" && <PredictorTab />}
                  {tab === "records"   && <RecordsWall />}
                  {tab === "dream-xi"  && <DreamXI />}
                  {tab === "quiz"      && <Quiz />}
                </Suspense>
              </motion.div>
            </AnimatePresence>

            <footer className="text-center text-[10px] text-text-muted uppercase tracking-[0.3em] pt-6 pb-2">
              CRCK.IQ · Built for cricket fans, powered by data
            </footer>
          </main>
        </div>

        <BottomNav active={tab} onChange={setTab} />

        {/* Mobile Filter Bottom Sheet */}
        <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
          <SheetContent side="bottom" className="h-[85%] bg-[#0F1520] border-t border-white/10 rounded-t-[16px] p-0 overflow-hidden flex flex-col">
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mt-3 shrink-0" />
            <SheetHeader className="p-6 pb-2">
              <SheetTitle className="text-gradient-orange font-display text-2xl">FILTERS</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto p-6 pt-2 pb-32">
              <FilterControls 
                seasonRange={seasonRange} setSeasonRange={setSeasonRange}
                selectedTeams={selectedTeams} setSelectedTeams={setSelectedTeams}
                selectedVenue={selectedVenue} setSelectedVenue={setSelectedVenue}
                matchType={matchType} setMatchType={setMatchType}
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-[#0F1520] border-t border-white/5 flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 h-12 border-white/10 text-muted-foreground"
                onClick={resetFilters}
              >
                RESET
              </Button>
              <Button 
                className="flex-[2] h-12 bg-gradient-orange text-white font-bold"
                onClick={() => setIsFilterSheetOpen(false)}
              >
                APPLY FILTERS
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

const FilterPill = ({ label, onDismiss }: { label: string; onDismiss: () => void }) => (
  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary whitespace-nowrap">
    <span className="text-[10px] font-black uppercase tracking-wider">{label}</span>
    <button onClick={onDismiss} className="hover:text-white transition-colors">
      <X size={12} />
    </button>
  </div>
);

const TabSkeleton = () => (
  <div className="space-y-4">
    <div className="h-72 rounded-2xl bg-white/5 border border-white/10 shimmer" />
    <div className="grid md:grid-cols-2 gap-4">
      <div className="h-60 rounded-2xl bg-white/5 border border-white/10 shimmer" />
      <div className="h-60 rounded-2xl bg-white/5 border border-white/10 shimmer" />
    </div>
  </div>
);

export default Index;
