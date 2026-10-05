import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";

const LenisContext = createContext(null);

export function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    let frame;
    const loop = (time) => {
      instance.raf(time);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    setLenis(instance);

    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}

export const useLenis = () => useContext(LenisContext);

export function scrollToTop(lenis, immediate = false) {
  if (lenis) lenis.scrollTo(0, { immediate, force: true, duration: 1.6 });
  else window.scrollTo({ top: 0, behavior: immediate ? "instant" : "smooth" });
}
