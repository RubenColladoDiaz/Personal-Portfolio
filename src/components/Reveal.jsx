import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { EASE, enterDelay } from "../lib/clock";

// Devuelve el retardo con el que debe arrancar la animación cuando el
// elemento entra en pantalla (null mientras no ha entrado). Si la página
// aún está entrando, espera a que termine.
export function useEnter(ref, delay = 0, margin = "0px 0px -2% 0px") {
  const inView = useInView(ref, { once: true, margin });
  const [start, setStart] = useState(null);
  useEffect(() => {
    if (inView && start === null) setStart(enterDelay() + delay);
  }, [inView, start, delay]);
  return start;
}

// Aparición suave: opacidad, un poco de desplazamiento y desenfoque.
export function Fade({ children, delay = 0, y = 14, className = "", as = "div", ...rest }) {
  const ref = useRef(null);
  const start = useEnter(ref, delay);
  const Tag = motion[as];
  return (
    <Tag
      {...rest}
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      animate={
        start !== null
          ? {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 1, ease: EASE, delay: start },
            }
          : undefined
      }
    >
      {children}
    </Tag>
  );
}

// Texto partido en palabras que suben en cascada desde una máscara.
export function SplitText({ text = "", delay = 0, stagger = 0.05, className = "" }) {
  const ref = useRef(null);
  const start = useEnter(ref, delay);
  const words = String(text).split(" ");

  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden className="mask-inline">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "110%" }}
            animate={
              start !== null
                ? { y: "0%", transition: { duration: 1, ease: EASE, delay: start + i * stagger } }
                : undefined
            }
          >
            {word}
            {i < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
