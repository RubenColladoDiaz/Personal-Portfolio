import { useEffect, useState } from "react";

// Flecha de trazo fino.
export function Arrow({ className = "", direction = "up-right" }) {
  const rotate = { "up-right": 0, right: 45, down: 135, up: -45, left: -135 }[direction];
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined }}
      aria-hidden
    >
      <path d="M7 17 17 7M9 7h8v8" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

const formatter = new Intl.DateTimeFormat("es-ES", {
  timeZone: "Europe/Madrid",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export function useNow(interval = 1000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), interval);
    return () => clearInterval(id);
  }, [interval]);
  return now;
}

// Hora de Barcelona en directo, con los dos puntos parpadeando.
export function LocalTime({ seconds = false, prefix = "BCN", className = "" }) {
  const now = useNow();
  const parts = Object.fromEntries(
    formatter.formatToParts(now).map((p) => [p.type, p.value]),
  );

  return (
    <span className={`tabular-nums ${className}`}>
      {prefix && `${prefix} `}
      {parts.hour}
      <span className="blink">:</span>
      {parts.minute}
      {seconds && <span className="opacity-50">:{parts.second}</span>}
    </span>
  );
}

export const pad = (n) => String(n).padStart(2, "0");

// "Título (detalle)" → ["Título", "detalle"]
export function splitTitle(title = "") {
  const m = title.match(/^(.*?)\s*\((.+)\)\s*$/);
  return m ? [m[1], m[2]] : [title, null];
}

export function yearsOf(period = "") {
  return (period.match(/\d{4}/g) || []).map(Number);
}

// Une palabras como en una frase: "a, b y c" / "a, b and c".
export function joinNatural(items, lang) {
  if (items.length < 2) return items.join("");
  const last = items[items.length - 1];
  return `${items.slice(0, -1).join(", ")} ${lang === "en" ? "and" : "y"} ${last}`;
}
