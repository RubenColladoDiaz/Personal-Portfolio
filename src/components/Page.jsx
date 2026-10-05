import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { EASE, PAGE_IN_MS, setEnterIn } from "../lib/clock";
import { useLang } from "../lib/lang";

export default function Page({ title, children }) {
  const location = useLocation();
  // React Router marca la primera ruta cargada con la clave "default".
  const firstVisit = location.key === "default";

  useState(() => {
    if (!firstVisit) setEnterIn(PAGE_IN_MS);
  });

  useEffect(() => {
    document.title = title ? `${title} — Rubén Collado` : "Rubén Collado";
  }, [title]);

  return (
    <motion.main
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        y: -12,
        filter: "blur(6px)",
        transition: { duration: 0.4, ease: EASE },
      }}
    >
      {children}
    </motion.main>
  );
}

export function Loader() {
  const { t } = useLang();
  return (
    <div className="flex h-[100svh] items-center justify-center">
      <span className="meta">
        {t.loading}
        <span className="blink">…</span>
      </span>
    </div>
  );
}
