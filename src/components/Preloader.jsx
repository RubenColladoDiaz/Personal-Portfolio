import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { EASE, INTRO_MS } from "../lib/clock";

const COUNT_MS = 1150;
const NAME = "Rubén Collado";

// Intro breve: el nombre aparece letra a letra mientras una línea se llena.
// Solo una vez por sesión.
export default function Preloader({ onDone }) {
  const counter = useRef(null);
  const bar = useRef(null);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / COUNT_MS);
      const eased = 1 - Math.pow(1 - p, 3);
      if (counter.current) counter.current.textContent = String(Math.round(eased * 100)).padStart(3, "0");
      if (bar.current) bar.current.style.transform = `scaleX(${eased})`;
      if (p < 1) frame = requestAnimationFrame(tick);
      else setLeaving(true);
    };
    frame = requestAnimationFrame(tick);
    const done = setTimeout(onDone, INTRO_MS);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(done);
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[180] flex items-center justify-center bg-bg"
      animate={leaving ? { opacity: 0, transition: { duration: 0.5, ease: EASE, delay: 0.05 } } : undefined}
    >
      <motion.p
        className="text-lg font-medium tracking-tight"
        animate={leaving ? { y: -10, filter: "blur(6px)", transition: { duration: 0.5, ease: EASE } } : undefined}
      >
        {Array.from(NAME).map((c, i) => (
          <motion.span
            key={i}
            className="inline-block whitespace-pre"
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE, delay: 0.1 + i * 0.035 } }}
          >
            {c}
          </motion.span>
        ))}
      </motion.p>

      <div className="wrap absolute inset-x-0 bottom-8">
        <div className="meta mb-3 flex justify-between">
          <span>Portfolio {new Date().getFullYear()}</span>
          <span ref={counter}>000</span>
        </div>
        <div className="h-px w-full bg-fg/10">
          <div ref={bar} className="h-full origin-left scale-x-0 bg-fg" />
        </div>
      </div>
    </motion.div>
  );
}
