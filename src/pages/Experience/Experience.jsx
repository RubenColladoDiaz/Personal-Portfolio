import { useMemo, useState } from "react";
import Page, { Loader } from "../../components/Page";
import Footer from "../../components/Footer";
import Skills from "../../components/Skills/Skills";
import Timeline from "../../components/Timeline";
import Entry, { scrollToEntry } from "../../components/Entry";
import { useLenis } from "../../components/SmoothScroll";
import { Fade, SplitText } from "../../components/Reveal";
import { Arrow, pad } from "../../components/Bits";
import { useCollection } from "../../lib/data";
import { useLang } from "../../lib/lang";
import { parsePeriod } from "../../lib/dates";

function Job({ job, index, total }) {
  const { lang, t, pick } = useLang();

  return (
    <article className="grid grid-cols-12 gap-x-6 gap-y-8 border-t border-fg/10 pt-8">
      <Fade className="col-span-12 space-y-4 md:col-span-4">
        <p className="meta">
          {pad(index + 1)} / {pad(total)}
        </p>
        <p className="meta text-fg/80">{pick(job, "period")}</p>
        {job.ongoing && (
          <p className="flex items-center gap-2.5 text-[13px]">
            <span className="live-dot" />
            {t.current}
          </p>
        )}
        <a href={job.link} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-1.5 pt-2">
          <span className="link text-[15px]">{job.company}</span>
          <Arrow className="w-3.5 text-accent transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </Fade>

      <div className="col-span-12 md:col-span-8">
        <Fade as="h2" delay={0.05} className="text-[clamp(1.7rem,3vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.035em]">
          {pick(job, "title")}
          <span className="text-muted">
            {" "}
            {lang === "es" ? "en" : "at"} {job.company}
          </span>
        </Fade>
        <Fade as="p" delay={0.1} className="mt-6 max-w-xl text-lg leading-relaxed text-fg/75">
          {pick(job, "description")}
        </Fade>
        <Fade as="p" delay={0.15} className="mt-8 max-w-xl text-[15px]">
          <span className="text-muted">{t.stack} — </span>
          {(job.technologies || []).join(", ")}
        </Fade>
        <Fade delay={0.2}>
          <a
            href="https://www.linkedin.com/in/ruben-collado-8aaa93211/"
            target="_blank"
            rel="noopener noreferrer"
            className="meta link mt-8 inline-block transition-colors hover:text-fg"
          >
            {pick(job, "more_info")} ↗
          </a>
        </Fade>
      </div>
    </article>
  );
}

function Experience() {
  const { pick } = useLang();
  const lenis = useLenis();
  const { status: jobsStatus, data: jobs } = useCollection("experience");
  const { status: skillsStatus, data: skills } = useCollection("skills");
  const [visibleId, setVisibleId] = useState(null);

  // Lo más reciente primero, con su tramo en la línea temporal.
  const sorted = useMemo(
    () =>
      (jobs || [])
        .map((j) => ({ ...j, ...parsePeriod(j.period_es) }))
        .filter((j) => j.start)
        .sort((a, b) => b.start - a.start),
    [jobs],
  );

  if (jobsStatus === "loading" || skillsStatus === "loading") {
    return (
      <Page>
        <Loader />
      </Page>
    );
  }

  const title = pick(sorted[0], "page_title");
  const activeId = visibleId || sorted[0]?.id;

  return (
    <Page title={title}>
      <section className="wrap pt-32 md:pt-40">
        <h1 className="title">
          <SplitText text={title} />
          <Fade as="sup" delay={0.3} y={0} className="meta ml-2 align-super tracking-normal">
            {sorted.length}
          </Fade>
        </h1>

        {sorted.length > 0 && (
          <Fade delay={0.15} className="mt-12 md:mt-16">
            <Timeline
              items={sorted.map((j) => ({ id: j.id, start: j.start, end: j.end, label: j.company }))}
              activeId={activeId}
              onSelect={(id) => scrollToEntry(lenis, id)}
            />
          </Fade>
        )}
      </section>

      <section className="wrap mt-12 space-y-24 md:mt-16 md:space-y-32">
        {sorted.map((job, i) => (
          <Entry key={job.id} id={job.id} onVisible={setVisibleId}>
            <Job job={job} index={i} total={sorted.length} />
          </Entry>
        ))}
      </section>

      <Skills skills={skills} />
      <Footer />
    </Page>
  );
}

export default Experience;
