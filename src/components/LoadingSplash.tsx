import { motion, AnimatePresence } from "framer-motion";
import { CricketBall } from "./CricketBall";

export const LoadingSplash = ({ done }: { done: boolean }) => {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-background grid place-items-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: [0, 1, 1, 1],
              scale: [0.6, 1, 1, 0.7],
              x: [0, 0, 0, -200],
              y: [0, 0, 0, -200],
            }}
            transition={{ duration: 1.6, times: [0, 0.15, 0.5, 1], ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <motion.div
              animate={{ boxShadow: ["0 0 0px rgba(72,88,219,0)", "0 0 60px rgba(72,88,219,0.6)", "0 0 30px rgba(72,88,219,0.3)"] }}
              transition={{ duration: 1.2, repeat: Infinity, repeatType: "mirror" }}
              className="rounded-full"
            >
              <CricketBall size={64} />
            </motion.div>
            <div>
              <div className="font-display text-5xl tracking-wider text-gradient-orange leading-none">
                CRCK<span className="text-foreground">.</span>IQ
              </div>
              <div className="text-[10px] mt-1 uppercase tracking-[0.4em] text-muted-foreground">
                Where Cricket Meets Intelligence
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
