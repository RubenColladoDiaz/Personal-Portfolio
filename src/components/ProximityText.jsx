import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { EASE, enterDelay } from "../lib/clock";

// Cada letra gana peso y se estrecha según lo cerca que esté el cursor
// (ejes wght y wdth de la fuente variable). En táctil, una ola lenta
// recorre el texto.
export default function ProximityText({ text, className = "", radius = 220 }) {
  const root = useRef(null);
  const letters = useRef([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const pointer = { x: -9999, y: -9999 };
    const state = letters.current.map(() => ({ w: 0 }));
    let frame;

    const move = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };

    const loop = (t) => {
      letters.current.forEach((el, i) => {
        if (!el) return;
        let target;
        if (fine) {
          const r = el.getBoundingClientRect();
          const d = Math.hypot(pointer.x - (r.left + r.width / 2), pointer.y - (r.top + r.height / 2));
          target = Math.max(0, 1 - d / radius);
        } else {
          target = (Math.sin(t * 0.0016 - i * 0.45) + 1) / 2;
          target = target * target * 0.8;
        }
        const s = state[i];
        s.w += (target - s.w) * 0.12;
        const e = s.w * s.w * (3 - 2 * s.w);
        el.style.fontVariationSettings = `"wght" ${Math.round(470 + e * 230)}, "wdth" ${Math.round(100 - e * 22)}`;
      });
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move, { passive: true });
    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
    };
  }, [radius]);

  const delay = enterDelay();

  return (
    <span ref={root} className={className} aria-label={text}>
      {Array.from(text).map((char, i) => (
        <span key={i} aria-hidden className="mask-inline">
          <motion.span
            ref={(el) => (letters.current[i] = el)}
            className="inline-block whitespace-pre"
            style={{ fontVariationSettings: '"wght" 470, "wdth" 100' }}
            initial={{ y: "110%" }}
            animate={{ y: "0%", transition: { duration: 1.1, ease: EASE, delay: delay + i * 0.03 } }}
          >
            {char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
