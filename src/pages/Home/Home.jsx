import { Link, useNavigate } from "react-router-dom";
import Page, { Loader } from "../../components/Page";
import Footer from "../../components/Footer";
import FieldCanvas from "../../components/FieldCanvas";
import ProximityText from "../../components/ProximityText";
import { Fade } from "../../components/Reveal";
import ProjectCard from "../../components/Project/ProjectCard";
import { Arrow, yearsOf } from "../../components/Bits";
import { useCollection, useDoc, useHeaderInfo } from "../../lib/data";
import { useAllProjects } from "../../lib/github";
import { useLang } from "../../lib/lang";
import { routeLabel } from "../../lib/routes";

const ONGOING = /actualidad|present/i;

function Ext({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-link">
      {children}
    </a>
  );
}

function In({ to, children }) {
  return (
    <Link to={to} className="inline-link">
      {children}
    </Link>
  );
}

function Home() {
  const { lang, t, pick } = useLang();
  const navigate = useNavigate();
  const headerInfo = useHeaderInfo();
  const { status, data: home } = useDoc("home", "main-info");
  const { data: about } = useDoc("about", "personal-info");
  const { data: projects } = useAllProjects();
  const { data: jobs } = useCollection("experience");

  if (status === "loading") {
    return (
      <Page>
        <Loader />
      </Page>
    );
  }

  const name = pick(home, "name") || "Rubén Collado";
  const role = pick(home, "title");
  const city = (pick(about, "location") || "Barcelona").split(",")[0];

  const sorted = [...(jobs || [])].sort(
    (a, b) => (yearsOf(b.period_es)[0] || 0) - (yearsOf(a.period_es)[0] || 0),
  );
  const current = sorted.find((j) => ONGOING.test(j.period_es || ""));
  const previous = sorted.filter((j) => j !== current);
  const label = (key) => routeLabel(key, lang, headerInfo).toLowerCase();
  const count = projects?.length;

  // Una muestra variada: los más completos, sin repetir tecnología principal.
  const featured = [];
  const seen = new Set();
  [...(projects || [])]
    .sort((a, b) => (b.technologies?.length || 0) - (a.technologies?.length || 0) || (b.year || 0) - (a.year || 0))
    .forEach((p) => {
      const main = p.technologies?.[0];
      if (featured.length < 4 && !seen.has(main)) {
        seen.add(main);
        featured.push(p);
      }
    });

  const now =
    lang === "es" ? (
      <>
        {current && (
          <>
            Ahora mismo trabajo como {pick(current, "title")} en{" "}
            <Ext href={current.link}>{current.company}</Ext>.{" "}
          </>
        )}
        {previous[0] && (
          <span className="text-muted">
            Antes fui {pick(previous[0], "title")} en{" "}
            <Ext href={previous[0].link}>{previous[0].company}</Ext>.
          </span>
        )}
      </>
    ) : (
      <>
        {current && (
          <>
            Right now I work as a {pick(current, "title")} at{" "}
            <Ext href={current.link}>{current.company}</Ext>.{" "}
          </>
        )}
        {previous[0] && (
          <span className="text-muted">
            Before that, I was a {pick(previous[0], "title")} at{" "}
            <Ext href={previous[0].link}>{previous[0].company}</Ext>.
          </span>
        )}
      </>
    );

  const tour =
    lang === "es" ? (
      <>
        Por aquí tienes{" "}
        <In to="/myprojects">{count ? `${count} proyectos` : label("projects")}</In>, mi{" "}
        <In to="/experience">{label("experience")}</In>, mis{" "}
        <In to="/studies">{label("education")}</In> y un poco{" "}
        <In to="/about">sobre mí</In>. Si te encaja lo que ves,{" "}
        <In to="/contact">escríbeme</In>.
      </>
    ) : (
      <>
        Around here you&apos;ll find{" "}
        <In to="/myprojects">{count ? `${count} projects` : label("projects")}</In>, my{" "}
        <In to="/experience">{label("experience")}</In>, my{" "}
        <In to="/studies">{label("education")}</In> and a little{" "}
        <In to="/about">about me</In>. If you like what you see,{" "}
        <In to="/contact">drop me a line</In>.
      </>
    );

  return (
    <Page title={role}>
      <section className="relative overflow-hidden">
        <FieldCanvas className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]" />

        <div className="wrap pointer-events-none relative z-10 pb-24 pt-32 md:pb-32 md:pt-44">
          <h1 className="pointer-events-auto text-[clamp(2.75rem,6.4vw,5.6rem)] leading-[0.95] tracking-[-0.045em]">
            <ProximityText text={name} />
          </h1>
          <Fade delay={0.4} as="p" className="mt-4 text-[clamp(1.05rem,1.5vw,1.3rem)] text-muted">
            {role}, {city}.
          </Fade>

          <div className="pointer-events-auto mt-20 grid grid-cols-12 gap-x-6 md:mt-28">
            <div className="col-span-12 md:col-span-9 md:col-start-4">
              <Fade as="p" delay={0.55} className="text-[clamp(1.35rem,2.3vw,2rem)] leading-[1.28] tracking-[-0.025em]">
                {now}
              </Fade>
              <Fade as="p" delay={0.65} className="mt-8 text-[clamp(1.35rem,2.3vw,2rem)] leading-[1.28] tracking-[-0.025em] md:mt-10">
                {tour}
              </Fade>
            </div>
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="wrap mt-8 md:mt-12">
          <Fade className="flex items-baseline justify-between border-t border-fg/10 pt-6">
            <h2 className="text-[15px] font-medium">{t.recent}</h2>
            <Link to="/myprojects" className="group flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-fg">
              <span className="link">{t.seeAll(count)}</span>
              <Arrow direction="right" className="w-3.5 text-accent transition-transform duration-500 ease-expo group-hover:translate-x-0.5" />
            </Link>
          </Fade>
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-5">
            {featured.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onOpen={(p) => navigate("/myprojects", { state: { open: p.id } })}
              />
            ))}
          </ul>
        </section>
      )}

      <Footer />
    </Page>
  );
}

export default Home;
