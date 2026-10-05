import { useMemo, useState } from "react";
import Page, { Loader } from "../../components/Page";
import Footer from "../../components/Footer";
import Study from "../../components/Study/Study";
import Timeline from "../../components/Timeline";
import Entry, { scrollToEntry } from "../../components/Entry";
import { useLenis } from "../../components/SmoothScroll";
import { Fade, SplitText } from "../../components/Reveal";
import { useCollection } from "../../lib/data";
import { useLang } from "../../lib/lang";
import { parsePeriod } from "../../lib/dates";

function Studies() {
  const { pick } = useLang();
  const lenis = useLenis();
  const { status, data } = useCollection("studies");
  const [visibleId, setVisibleId] = useState(null);

  // Lo más reciente primero: por fin y, si empatan, por inicio.
  const studies = useMemo(
    () =>
      (data || [])
        .map((s) => ({ ...s, ...parsePeriod(s.period_es) }))
        .filter((s) => s.start)
        .sort((a, b) => b.end - a.end || b.start - a.start),
    [data],
  );

  if (status === "loading") {
    return (
      <Page>
        <Loader />
      </Page>
    );
  }

  const title = pick(studies.find((s) => s.page_title_es), "page_title") || "Estudios";
  const activeId = visibleId || studies[0]?.id;

  return (
    <Page title={title}>
      <section className="wrap pt-32 md:pt-40">
        <h1 className="title">
          <SplitText text={title} />
          <Fade as="sup" delay={0.3} y={0} className="meta ml-2 align-super tracking-normal">
            {studies.length}
          </Fade>
        </h1>

        {studies.length > 0 && (
          <Fade delay={0.15} className="mt-12 md:mt-16">
            <Timeline
              items={studies.map((s) => ({ id: s.id, start: s.start, end: s.end, label: s.institution }))}
              activeId={activeId}
              onSelect={(id) => scrollToEntry(lenis, id)}
            />
          </Fade>
        )}
      </section>

      <section className="wrap mt-12 space-y-24 md:mt-16 md:space-y-32">
        {studies.map((study, i) => (
          <Entry key={study.id} id={study.id} onVisible={setVisibleId}>
            <Study study={study} index={i} total={studies.length} />
          </Entry>
        ))}
      </section>

      <Footer />
    </Page>
  );
}

export default Studies;
