import { useCallback, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Page, { Loader } from "../../components/Page";
import Footer from "../../components/Footer";
import ProjectCard from "../../components/Project/ProjectCard";
import ProjectDrawer from "../../components/Project/ProjectDrawer";
import { Fade, SplitText } from "../../components/Reveal";
import { sortProjects } from "../../lib/data";
import { useAllProjects } from "../../lib/github";
import { useLang } from "../../lib/lang";
import { EASE } from "../../lib/clock";

const TOP_FILTERS = 10;
const IGNORED = new Set(["Frontend"]);
const ALIASES = { Semaphores: "Semaphore" };
const techsOf = (p) => (p.technologies || []).map((tech) => ALIASES[tech] || tech);

function MyProjects() {
  const { t, pick } = useLang();
  const location = useLocation();
  const { status, data } = useAllProjects();
  const [filter, setFilter] = useState(null);
  const [allFilters, setAllFilters] = useState(false);
  // Si venimos de la portada con un proyecto elegido, se abre directamente.
  const [openId, setOpenId] = useState(() => location.state?.open ?? null);

  const projects = useMemo(() => sortProjects(data), [data]);

  // Todas las tecnologías sirven de filtro, de la más usada a la menos.
  const filters = useMemo(() => {
    const count = {};
    projects.forEach((p) =>
      new Set(techsOf(p)).forEach((tech) => (count[tech] = (count[tech] || 0) + 1)),
    );
    return Object.entries(count)
      .filter(([tech]) => !IGNORED.has(tech))
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [projects]);

  const visible = useMemo(
    () => (filter ? projects.filter((p) => techsOf(p).includes(filter)) : projects),
    [projects, filter],
  );

  const openIndex = visible.findIndex((p) => p.id === openId);
  const step = useCallback(
    (dir) => {
      if (openIndex === -1) return;
      setOpenId(visible[(openIndex + dir + visible.length) % visible.length].id);
    },
    [openIndex, visible],
  );
  const close = useCallback(() => setOpenId(null), []);

  if (status === "loading") {
    return (
      <Page>
        <Loader />
      </Page>
    );
  }

  const title = pick(projects.find((p) => p.page_title_es), "page_title") || t.projects;

  return (
    <Page title={title}>
      <section className="wrap pt-32 md:pt-40">
        <h1 className="title">
          <SplitText text={title} />
          <Fade as="sup" delay={0.3} y={0} className="meta ml-2 align-super tracking-normal">
            {projects.length}
          </Fade>
        </h1>

        <Fade delay={0.15} className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px]">
          <span className="text-muted">{t.filter}</span>
          <AnimatePresence initial={false}>
            {[[null, projects.length], ...filters]
              .filter(([tech], i) => allFilters || i <= TOP_FILTERS || tech === filter)
              .map(([tech, n], i) => {
                const on = filter === tech;
                return (
                  <motion.button
                    layout="position"
                    key={tech ?? "all"}
                    initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: { duration: 0.4, ease: EASE, delay: i > TOP_FILTERS ? (i - TOP_FILTERS) * 0.012 : 0 },
                    }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    onClick={() => setFilter(tech)}
                    aria-pressed={on}
                    className={`relative transition-colors duration-300 ${on ? "text-fg" : "text-muted hover:text-fg"}`}
                  >
                    {tech ?? t.all}
                    <sup className="ml-0.5 text-[9px] opacity-60">{n}</sup>
                    {on && (
                      <motion.span
                        layoutId="filter-line"
                        className="absolute -bottom-1 left-0 h-px w-full bg-accent"
                        transition={{ duration: 0.5, ease: EASE }}
                      />
                    )}
                  </motion.button>
                );
              })}
          </AnimatePresence>
          {filters.length > TOP_FILTERS && (
            <motion.button
              layout="position"
              onClick={() => setAllFilters((v) => !v)}
              aria-expanded={allFilters}
              className="text-accent transition-opacity hover:opacity-70"
            >
              {allFilters ? t.fewer : t.more(filters.length - TOP_FILTERS)}
            </motion.button>
          )}
        </Fade>
      </section>

      <section className="wrap mt-12 md:mt-16">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} onOpen={(p) => setOpenId(p.id)} />
            ))}
          </AnimatePresence>
        </ul>
      </section>

      <ProjectDrawer
        project={openIndex === -1 ? null : visible[openIndex]}
        index={openIndex}
        total={visible.length}
        onClose={close}
        onStep={step}
      />
      <Footer />
    </Page>
  );
}

export default MyProjects;
