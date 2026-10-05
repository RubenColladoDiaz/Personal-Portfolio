import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "../../lib/lang";
import { EASE } from "../../lib/clock";
import { Arrow, splitTitle } from "../Bits";

// "Portfolio de María Gatell" → "MG", "SkillMap" → "SM", "Mi primera red neuronal" → "RN"
function initialsOf(title) {
  const words = title.replace(/([a-z])([A-Z])/g, "$1 $2").split(/\s+/);
  const caps = words.filter((w) => /^[A-ZÁÉÍÓÚÑ0-9]/.test(w));
  const pool = caps.length >= 2 ? caps : words.filter((w) => w.length > 2);
  return pool.slice(-2).map((w) => w[0]).join("").toUpperCase();
}

// Icono del proyecto sobre una pieza clara, como el icono de una app.
export function ProjectIcon({ project, size = "md" }) {
  const { pick } = useLang();
  const [failed, setFailed] = useState(false);
  const initials = initialsOf(splitTitle(pick(project, "title"))[0]);
  const box = size === "lg" ? "h-20 w-20 rounded-[22px] p-4" : "h-16 w-16 rounded-[18px] p-3 md:h-[72px] md:w-[72px]";

  return (
    <span className={`flex items-center justify-center bg-[#efeee9] shadow-[0_1px_0_rgba(255,255,255,0.4)_inset,0_8px_24px_-12px_rgba(0,0,0,0.5)] ${box}`}>
      {project.cover && !failed ? (
        <img
          src={project.cover}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          className="max-h-full max-w-full object-contain"
        />
      ) : (
        <span className="text-lg font-semibold tracking-tight text-[#151514]">{initials}</span>
      )}
    </span>
  );
}

const ProjectCard = forwardRef(function ProjectCard({ project, index, onOpen }, ref) {
  const { pick } = useLang();
  const [title, detail] = splitTitle(pick(project, "title"));

  return (
    <motion.li
      ref={ref}
      layout
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.8, ease: EASE, delay: Math.min(index, 11) * 0.035 },
      }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25, ease: EASE } }}
      transition={{ layout: { duration: 0.6, ease: EASE } }}
    >
      <button onClick={() => onOpen(project)} className="group block w-full text-left">
        <span className="relative flex aspect-[5/4] items-center justify-center overflow-hidden rounded-2xl bg-fg/[0.045] transition-colors duration-500 group-hover:bg-fg/[0.08]">
          <span className="transition-transform duration-700 ease-expo group-hover:-translate-y-1 group-hover:-rotate-6 group-hover:scale-110">
            <ProjectIcon project={project} />
          </span>
          <span className="meta absolute left-4 top-3.5">
            {project.year}
            {project.source === "github" && " · GitHub"}
          </span>
          <Arrow className="absolute right-4 top-4 w-4 -translate-x-1 translate-y-1 text-accent opacity-0 transition duration-500 ease-expo group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
        </span>
        <span className="mt-3 block text-[15px] font-medium leading-snug tracking-[-0.01em]">
          {title}
          {detail && <span className="font-normal text-muted"> ({detail})</span>}
        </span>
        <span className="meta mt-1 block truncate">{(project.technologies || []).join(" · ")}</span>
      </button>
    </motion.li>
  );
});

export default ProjectCard;
