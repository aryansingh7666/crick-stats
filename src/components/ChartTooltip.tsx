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
      className="rounded-[16px] bg-white/90 backdrop-blur-[12px] border border-purple-100 shadow-[0_10px_40px_rgba(207,109,252,0.1)] p-[12px_16px] min-w-[160px]"
      style={{ borderLeft: `4px solid ${teamColor}` }}
    >
      {label !== undefined && (
        <div className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-black mb-2 font-sans">
          {label}
        </div>
      )}
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center justify-between gap-4 text-xs">
          <span className="text-foreground/60 font-sans">{entry.name ?? valueLabel}</span>
          <span className="font-mono font-black text-foreground">
            {typeof entry.value === "number" ? entry.value.toLocaleString("en-IN") : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};
