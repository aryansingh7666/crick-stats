import { motion } from "framer-motion";

interface Props {
  size?: number;
  className?: string;
  spinning?: boolean;
}

export const CricketBall = ({ size = 24, className = "", spinning = false }: Props) => {
  const Comp: any = spinning ? motion.svg : "svg";
  const animProps = spinning
    ? { animate: { rotate: 360 }, transition: { duration: 3, repeat: Infinity, ease: "linear" } }
    : {};

  return (
    <Comp
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...animProps}
    >
      <defs>
        <radialGradient id="ball-grad" cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#7B89F0" />
          <stop offset="60%" stopColor="#4858DB" />
          <stop offset="100%" stopColor="#2A37A0" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="28" fill="url(#ball-grad)" />
      <path d="M 12 32 Q 32 24 52 32" stroke="#fff" strokeWidth="1.5" fill="none" strokeDasharray="2 3" opacity="0.85" />
      <path d="M 12 32 Q 32 40 52 32" stroke="#fff" strokeWidth="1.5" fill="none" strokeDasharray="2 3" opacity="0.85" />
      <path d="M 12 32 Q 32 28 52 32" stroke="#fff" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M 12 32 Q 32 36 52 32" stroke="#fff" strokeWidth="1" fill="none" opacity="0.6" />
      <circle cx="22" cy="22" r="5" fill="#fff" opacity="0.18" />
    </Comp>
  );
};
