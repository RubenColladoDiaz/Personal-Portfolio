import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

// Bloque de una página larga que avisa cuando ocupa el centro de la
// pantalla (para marcar su tramo en la línea temporal).
export default function Entry({ id, onVisible, className = "", children }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-40% 0px -55% 0px" });

  useEffect(() => {
    if (inView) onVisible(id);
  }, [inView, id, onVisible]);

  return (
    <div ref={ref} id={`entry-${id}`} className={className}>
      {children}
    </div>
  );
}

export function scrollToEntry(lenis, id) {
  const el = document.getElementById(`entry-${id}`);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -140, duration: 1.4 });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 140, behavior: "smooth" });
}
