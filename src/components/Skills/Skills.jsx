import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "../../lib/lang";
import { EASE } from "../../lib/clock";
import { Fade } from "../Reveal";

// Todas las tecnologías en un único párrafo. Al elegir una categoría,
// sus palabras se quedan y el resto se apaga.
const Skills = ({ skills }) => {
  const { t, pick } = useLang();
  const [active, setActive] = useState(null);

  if (!skills?.length) return null;

  const words = skills.flatMap((skill) =>
    (skill.technologies || []).map((tech) => ({ skill: skill.id, tech })),
  );

  return (
    <section className="wrap mt-32 grid grid-cols-12 gap-x-6 md:mt-48" aria-label={t.toolkit}>
      <div className="col-span-12 md:col-span-4">
        <Fade as="h2" className="text-xl font-medium tracking-[-0.02em]">
          {t.toolkit}
        </Fade>
        <Fade
          delay={0.1}
          className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[13px] md:flex-col md:items-start"
          onMouseLeave={() => setActive(null)}
        >
          {skills.map((skill) => {
            const on = active === skill.id;
            return (
              <button
                key={skill.id}
                onMouseEnter={() => setActive(skill.id)}
                onFocus={() => setActive(skill.id)}
                onClick={() => setActive((a) => (a === skill.id ? null : skill.id))}
                className={`relative transition-colors duration-300 ${on ? "text-fg" : "text-muted hover:text-fg"}`}
              >
                {pick(skill, "category")}
                <sup className="ml-0.5 text-[9px] opacity-60">{skill.technologies?.length}</sup>
                {on && (
                  <motion.span
                    layoutId="skill-line"
                    className="absolute -bottom-0.5 left-0 h-px w-full bg-accent"
                    transition={{ duration: 0.45, ease: EASE }}
                  />
                )}
              </button>
            );
          })}
        </Fade>
      </div>

      <Fade delay={0.15} className="col-span-12 mt-10 md:col-span-8 md:mt-0">
        <p className="text-[clamp(1.35rem,2.3vw,2rem)] leading-[1.32] tracking-[-0.025em]">
          {words.map(({ skill, tech }, i) => {
            const lit = !active || active === skill;
            return (
              <span key={`${skill}-${tech}-${i}`}>
                <span
                  className={`transition-[color,opacity] duration-500 ${lit ? "opacity-100" : "opacity-[0.12]"} ${
                    active === skill ? "text-accent" : ""
                  }`}
                >
                  {tech}
                </span>
                {i < words.length - 1 && <span className="text-fg/20">, </span>}
              </span>
            );
          })}
        </p>
      </Fade>
    </section>
  );
};

export default Skills;
