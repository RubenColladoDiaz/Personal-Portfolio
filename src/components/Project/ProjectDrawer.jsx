import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "../../lib/lang";
import { useMedia } from "../../lib/useMedia";
import { EASE } from "../../lib/clock";
import { useLenis } from "../SmoothScroll";
import { Arrow, pad } from "../Bits";
import Project from "./Project";

// Panel con el detalle de un proyecto: lateral en escritorio, hoja
// inferior (que se cierra arrastrando) en móvil. Flechas ← → para pasar.
export default function ProjectDrawer({ project, index, total, onClose, onStep }) {
  const { t } = useLang();
  const desktop = useMedia("(min-width: 768px)");
  const lenis = useLenis();
  const open = Boolean(project);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis, onClose, onStep]);

  const panel = desktop
    ? {
        className: "fixed bottom-3 right-3 top-3 z-[111] flex w-[440px] flex-col overflow-hidden rounded-3xl border border-fg/10 bg-bg",
        initial: { x: "110%" },
        animate: { x: 0, transition: { duration: 0.7, ease: EASE } },
        exit: { x: "110%", transition: { duration: 0.45, ease: EASE } },
      }
    : {
        className: "fixed inset-x-0 bottom-0 z-[111] flex max-h-[86svh] flex-col overflow-hidden rounded-t-3xl border-t border-fg/10 bg-bg",
        initial: { y: "100%" },
        animate: { y: 0, transition: { duration: 0.6, ease: EASE } },
        exit: { y: "100%", transition: { duration: 0.4, ease: EASE } },
        drag: "y",
        dragConstraints: { top: 0, bottom: 0 },
        dragElastic: { top: 0, bottom: 0.6 },
        onDragEnd: (_, info) => info.offset.y > 90 && onClose(),
      };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[110] bg-bg/50 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside key="panel" role="dialog" aria-modal="true" {...panel}>
            {!desktop && <div className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-fg/20" />}
            <div className="meta flex shrink-0 items-center justify-between px-7 pt-5">
              <span className="flex items-center gap-3">
                <button onClick={() => onStep(-1)} aria-label={t.previous} className="transition-colors hover:text-fg">
                  <Arrow direction="left" className="w-3.5" />
                </button>
                <span className="text-fg">
                  {pad(index + 1)} <span className="text-muted">/ {pad(total)}</span>
                </span>
                <button onClick={() => onStep(1)} aria-label={t.following} className="transition-colors hover:text-fg">
                  <Arrow direction="right" className="w-3.5" />
                </button>
              </span>
              <button onClick={onClose} className="link transition-colors hover:text-fg">
                {t.close}
              </button>
            </div>
            <div data-lenis-prevent className="flex-1 overflow-y-auto px-7 pb-10 pt-10">
              <AnimatePresence mode="wait">
                <Project key={project.id} project={project} />
              </AnimatePresence>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
