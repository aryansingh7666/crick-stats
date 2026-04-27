import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Props {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
  className?: string;
}

export const CountUp = ({
  value,
  duration = 1.6,
  decimals = 0,
  prefix = "",
  suffix = "",
  delay = 0,
  className = "",
}: Props) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) =>
    decimals === 0
      ? Math.round(v).toLocaleString("en-IN")
      : v.toFixed(decimals),
  );
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
    });
    const unsub = rounded.on("change", (v) => setDisplay(String(v)));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, value, duration, delay, mv, rounded]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
};
