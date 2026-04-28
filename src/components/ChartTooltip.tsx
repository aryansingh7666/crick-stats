// Premium reusable chart tooltip
import { TEAM_BY_CODE } from "@/data/ipl";

export const ChartTooltip = ({ active, payload, label, valueLabel = "Value", colorKey }: any) => {
  if (!active || !payload || !payload.length) return null;
  const p = payload[0];
  const teamColor = colorKey && p.payload?.[colorKey]
    ? (TEAM_BY_CODE[p.payload[colorKey]]?.color ?? "hsl(var(--primary))")
    : (p.color || p.fill || "hsl(var(--primary))");

  return (
    <div
      className="rounded-[12px] bg-[#0D0D1A]/95 backdrop-blur-[10px] border border-[rgba(255,107,26,0.4)] shadow-[0_8px_32px_rgba(0,0,0,0.5)] p-[12px_16px] min-w-[160px]"
      style={{ borderLeft: `3px solid ${teamColor}` }}
    >
      {label !== undefined && (
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-black mb-2 font-sans">
          {label}
        </div>
      )}
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center justify-between gap-4 text-xs">
          <span className="text-white/60 font-sans">{entry.name ?? valueLabel}</span>
          <span className="font-mono font-black text-white">
            {typeof entry.value === "number" ? entry.value.toLocaleString("en-IN") : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};
