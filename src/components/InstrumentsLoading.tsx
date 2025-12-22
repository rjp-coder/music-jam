import { motion } from "motion/react";
import { useInstrumentsLoaded } from "../hooks/useInstrumentsLoaded";
import { useState } from "react";

export const LoadingProgress = () => {
  const { instruments, getProgress, isLoading } = useInstrumentsLoaded();
  const [animationComplete, setAnimationComplete] = useState(false);
  const thisIsABrowser = globalThis.window;
  if (!thisIsABrowser)
    return (
      <p className="text-orange-400 text-xl -mt-4 min-w-80">
        Loading (javascript){" "}
      </p>
    );
  const { loaded, total } = getProgress();
  return (
    <details>
      <motion.summary
        className={`text-xl -mt-4 min-w-80 ${!isLoading() && "visible"}`}
        animate={isLoading() ? {} : { opacity: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        onAnimationComplete={() => setAnimationComplete(true)}
      >
        {animationComplete
          ? ""
          : isLoading()
          ? `Loading instruments (${loaded}/${total})`
          : `All Instruments Loaded!`}
      </motion.summary>
      <motion.ul
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        animate={isLoading() ? {} : { opacity: 0, display: "none" }}
      >
        {Object.entries(instruments).map((il) => {
          const [k, v] = il;
          return (
            <li key={k}>
              {k} {v ? "✅" : "⏳"}
            </li>
          );
        })}
      </motion.ul>
    </details>
  );
};
