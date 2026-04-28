import { TEAM_BY_CODE } from "@/data/ipl";

interface Props {
  code: string;
  size?: number;
  className?: string;
}

export const TeamBadge = ({ code, size = 32, className = "" }: Props) => {
  const team = TEAM_BY_CODE[code];
  if (!team) return <span className={className}>{code}</span>;

  return (
    <div 
      className={`inline-flex items-center justify-center shrink-0 rounded-full border font-bold select-none ${className}`}
      style={{ 
        width: `${size}px`, 
        height: `${size}px`, 
        backgroundColor: `${team.color}33`, // 20% opacity
        borderColor: team.color,
        color: team.color,
        fontSize: `${size * 0.35}px`,
        lineHeight: "1",
        borderWidth: size > 24 ? "2px" : "1px"
      }}
    >
      {code}
    </div>
  );
};
