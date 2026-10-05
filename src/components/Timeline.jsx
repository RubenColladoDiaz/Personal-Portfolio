import { motion } from "framer-motion";
import { useRef } from "react";
import { useLang } from "../lib/lang";
import { yearFraction } from "../lib/dates";
import { EASE } from "../lib/clock";
import { useEnter } from "./Reveal";

const LANE = 22;

// Reparte los tramos en carriles para que no se solapen.
function lanesFor(items) {
  const ends = [];
  return items.map((item) => {
    let lane = ends.findIndex((end) => end <= item.start + 0.01);
    if (lane === -1) lane = ends.length;
    ends[lane] = item.end;
    return lane;
  });
}

// Regla de años con un tramo por elemento. Hacer clic en un tramo (o usar
// las flechas del teclado) lleva a él. Una marca indica el día de hoy.
export default function Timeline({ items, activeId, onSelect }) {
  const { t } = useLang();
  const ref = useRef(null);
  const start = useEnter(ref);

  const chrono = [...items].sort((a, b) => a.start - b.start);
  const lanes = lanesFor(chrono);
  const laneCount = Math.max(...lanes) + 1;
  const now = yearFraction();
  const from = Math.floor(Math.min(...chrono.map((i) => i.start)));
  const to = Math.max(Math.ceil(Math.max(...chrono.map((i) => i.end))), Math.ceil(now));
  const pos = (y) => ((y - from) / (to - from)) * 100;
  const years = Array.from({ length: to - from + 1 }, (_, i) => from + i);
  const dense = years.length > 7;

  const index = items.findIndex((i) => i.id === activeId);
  const go = (step) => {
    const next = items[(index + step + items.length) % items.length];
    onSelect(next.id);
  };

  const enter = (i) =>
    start !== null
      ? { scaleX: 1, transition: { duration: 1.2, ease: EASE, delay: start + 0.15 + i * 0.12 } }
      : undefined;

  return (
    <div ref={ref}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
        className="relative mt-6"
        style={{ height: laneCount * LANE }}
      >
        {chrono.map((item, i) => {
          const active = item.id === activeId;
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={active}
              aria-label={item.label}
              tabIndex={active ? 0 : -1}
              onClick={() => onSelect(item.id)}
              className="group absolute flex items-center"
              style={{
                left: `${pos(item.start)}%`,
                width: `calc(${pos(item.end) - pos(item.start)}% - 3px)`,
                top: lanes[i] * LANE,
                height: LANE,
              }}
            >
              <motion.span
                className={`block w-full origin-left rounded-full transition-[height,background-color] duration-500 ${
                  active ? "h-[5px] bg-accent" : "h-[3px] bg-fg/20 group-hover:bg-fg/50"
                }`}
                initial={{ scaleX: 0 }}
                animate={enter(i)}
              />
              <span
                className={`meta pointer-events-none absolute -top-4 left-0 hidden max-w-full truncate transition-colors duration-300 md:block ${
                  active ? "text-fg" : "group-hover:text-fg"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}

        <motion.div
          className="pointer-events-none absolute -bottom-3 -top-3 w-px bg-fg/40"
          style={{ left: `${pos(now)}%` }}
          initial={{ opacity: 0 }}
          animate={start !== null ? { opacity: 1, transition: { delay: start + 0.8 } } : undefined}
        >
          <span className="live-dot absolute -left-[2.5px] -top-1.5" />
        </motion.div>
      </div>

      <div className="relative mt-5 h-11 border-t border-fg/10">
        {years.map((y, i) => (
          <span
            key={y}
            className={`meta absolute top-2 -translate-x-1/2 ${dense && i % 2 && i !== years.length - 1 ? "hidden sm:block" : ""}`}
            style={{ left: `${pos(y)}%` }}
          >
            <span className="absolute -top-2 left-1/2 h-1.5 w-px bg-fg/25" />
            {i === 0 ? <span className="ml-[50%] block">{y}</span> : i === years.length - 1 ? <span className="-ml-[50%] block">{y}</span> : y}
          </span>
        ))}
        <span className="meta absolute top-7 -translate-x-1/2 text-accent" style={{ left: `${pos(now)}%` }}>
          {t.now}
        </span>
      </div>
    </div>
  );
}
