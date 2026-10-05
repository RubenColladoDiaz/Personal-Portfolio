import { motion } from "framer-motion";
import { useLang } from "../../lib/lang";
import { EASE } from "../../lib/clock";
import { Arrow, splitTitle } from "../Bits";
import { ProjectIcon } from "./ProjectCard";

const item = (i) => ({
  initial: { opacity: 0, y: 10, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE, delay: 0.1 + i * 0.05 } },
  exit: { opacity: 0, y: -6, filter: "blur(4px)", transition: { duration: 0.2, ease: EASE } },
});

// Contenido del panel de un proyecto.
const Project = ({ project }) => {
  const { t, pick } = useLang();
  const [title, detail] = splitTitle(pick(project, "title"));
  const techs = project.technologies || [];

  return (
    <motion.article initial="initial" animate="animate" exit="exit">
      <motion.div {...item(0)}>
        <ProjectIcon project={project} size="lg" />
      </motion.div>

      <motion.h2 {...item(1)} className="mt-8 text-[1.75rem] font-medium leading-[1.1] tracking-[-0.03em]">
        {title}
      </motion.h2>
      {detail && (
        <motion.p {...item(1)} className="mt-1 text-muted">
          {detail}
        </motion.p>
      )}

      <motion.p {...item(2)} className="mt-6 text-[1.05rem] leading-relaxed text-fg/75">
        {pick(project, "description")}
      </motion.p>

      <motion.dl {...item(3)} className="mt-8 grid grid-cols-[5rem_1fr] gap-y-3 border-t border-fg/10 pt-6 text-[14px]">
        <dt className="text-muted">{t.year}</dt>
        <dd>{project.year}</dd>
        <dt className="text-muted">{t.stack}</dt>
        <dd>{techs.join(", ")}</dd>
      </motion.dl>

      {project.link && (
        <motion.a
          {...item(4)}
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-[14px] font-medium text-bg transition-colors duration-300 hover:bg-accent"
        >
          {pick(project, "button_text") || t.open}
          <Arrow className="w-3.5 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </motion.a>
      )}
    </motion.article>
  );
};

export default Project;
