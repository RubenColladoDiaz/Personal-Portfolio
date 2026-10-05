import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

const current = () =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";

function apply(next) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* modo privado */
  }
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", next === "light" ? "#ece7dd" : "#0f0e0c");
  window.dispatchEvent(new Event("themechange"));
}

export function useTheme() {
  const [theme, setTheme] = useState(current);

  useEffect(() => {
    const sync = () => setTheme(current());
    window.addEventListener("themechange", sync);
    return () => window.removeEventListener("themechange", sync);
  }, []);

  // El nuevo tema se expande en círculo desde el punto donde se ha hecho clic.
  const toggle = (event) => {
    const next = current() === "dark" ? "light" : "dark";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!document.startViewTransition || reduced) {
      apply(next);
      return;
    }

    const x = event?.clientX ?? window.innerWidth / 2;
    const y = event?.clientY ?? 0;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(() => {
      flushSync(() => apply(next));
    });
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 900,
          easing: "cubic-bezier(0.87, 0, 0.13, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  };

  return { theme, toggle };
}
