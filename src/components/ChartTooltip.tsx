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
      className="rounded-xl bg-card/95 backdrop-blur border border-border shadow-card p-3 min-w-[160px]"
      style={{ borderLeft: `3px solid ${teamColor}` }}
    >
      {label !== undefined && (
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">
          {label}
        </div>
      )}
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center justify-between gap-3 text-sm">
          <span className="text-muted-foreground">{entry.name ?? valueLabel}</span>
          <span className="font-mono font-bold text-foreground">
            {typeof entry.value === "number" ? entry.value.toLocaleString("en-IN") : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};
