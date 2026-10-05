import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Page, { Loader } from "../../components/Page";
import Footer from "../../components/Footer";
import FieldCanvas from "../../components/FieldCanvas";
import { Fade, SplitText, useEnter } from "../../components/Reveal";
import { useCollection, useDoc } from "../../lib/data";
import { GITHUB_USER } from "../../lib/github";
import { ONGOING } from "../../lib/dates";
import { Arrow } from "../../components/Bits";
import { useLang } from "../../lib/lang";
import { EASE_IN_OUT } from "../../lib/clock";

// La foto va en /public: los enlaces de LinkedIn caducan.
const LOCAL_PHOTO = "/ruben-collado.jpg";
const BIRTH = new Date(2004, 9, 30);
const YEAR_MS = 365.2425 * 864e5;

// Edad con nueve decimales, avanzando en directo.
function LiveAge() {
  const { lang } = useLang();
  const ref = useRef(null);

  useEffect(() => {
    let frame;
    const tick = () => {
      const value = ((Date.now() - BIRTH.getTime()) / YEAR_MS).toFixed(9);
      if (ref.current) ref.current.textContent = lang === "es" ? value.replace(".", ",") : value;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [lang]);

  return <span ref={ref} className="tabular-nums" />;
}

function daysToBirthday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let next = new Date(today.getFullYear(), BIRTH.getMonth(), BIRTH.getDate());
  if (next < today) next = new Date(today.getFullYear() + 1, BIRTH.getMonth(), BIRTH.getDate());
  return Math.round((next - today) / 864e5);
}

// Prueba cada foto en orden; si ninguna carga, muestra el campo de puntos.
function Portrait({ sources, alt }) {
  const ref = useRef(null);
  const start = useEnter(ref, 0.2);
  const [attempt, setAttempt] = useState(0);
  const list = sources.filter(Boolean);
  const src = list[attempt];
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const hasPhoto = Boolean(src);

  return (
    <motion.div
      ref={ref}
      className="group relative aspect-square w-full overflow-hidden rounded-full bg-fg/[0.04]"
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      animate={start !== null ? { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.3, ease: EASE_IN_OUT, delay: start } } : undefined}
    >
      {hasPhoto ? (
        <motion.img
          src={src}
          alt={alt}
          onError={() => setAttempt((a) => a + 1)}
          style={{ y }}
          className="absolute -top-[6%] left-0 h-[112%] w-full object-cover"
        />
      ) : (
        <>
          <FieldCanvas className="absolute inset-0" />
          <span className="pointer-events-none absolute bottom-4 left-4 text-sm font-medium">RC</span>
        </>
      )}
    </motion.div>
  );
}

// Párrafo cuyas palabras se van encendiendo con el scroll.
function ScrollWords({ text, className }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}

function Row({ label, children }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-3 border-t border-fg/10 py-3">
      <dt className="text-muted">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

const About = () => {
  const { lang, t, pick } = useLang();
  const { status, data: about } = useDoc("about", "personal-info");
  const { data: home } = useDoc("home", "main-info");
  const { data: jobs } = useCollection("experience");
  const { data: links } = useDoc("contact", "social-links");
  const { data: contact } = useDoc("contact", "contact-info");

  if (status === "loading") {
    return (
      <Page>
        <Loader />
      </Page>
    );
  }

  const title = pick(about, "page_title");
  const [lead, ...paragraphs] = pick(about, "description") || [];
  const days = daysToBirthday();
  const current = (jobs || []).find((j) => ONGOING.test(j.period_es || ""));

  const profiles = [
    ["LinkedIn", links?.linkedin],
    ["GitHub", `https://github.com/${GITHUB_USER}`],
    ["GitLab", links?.gitlab],
    ["X", links?.twitter],
  ].filter(([, url]) => url);

  return (
    <Page title={title}>
      <section className="wrap grid grid-cols-12 gap-x-6 gap-y-14 pt-32 md:pt-40">
        <div className="col-span-12 md:col-span-4">
          <h1 className="title">
            <SplitText text={title} />
          </h1>

          <Fade delay={0.2} className="mt-10 flex items-center gap-5 md:block">
            <div className="w-28 shrink-0 md:w-[220px]">
              <Portrait sources={[LOCAL_PHOTO, about.photo]} alt={about.name} />
            </div>
            <div className="md:mt-6">
              <p className="text-[17px] font-medium tracking-[-0.01em]">{about.name}</p>
              <p className="text-muted">{pick(home, "title")}</p>
            </div>
          </Fade>

          {current && (
            <Fade delay={0.3} as="p" className="mt-8 flex items-start gap-2.5 text-[14px] leading-snug">
              <span className="live-dot mt-[7px] shrink-0" />
              <span>
                <span className="text-muted">{lang === "es" ? "Ahora: " : "Now: "}</span>
                {pick(current, "title")} {lang === "es" ? "en" : "at"}{" "}
                <a href={current.link} target="_blank" rel="noopener noreferrer" className="inline-link">
                  {current.company}
                </a>
              </span>
            </Fade>
          )}

          <Fade delay={0.35} as="dl" className="mt-8 border-b border-fg/10 text-[14px]">
            <Row label={t.born}>{pick(about, "birthDate")}</Row>
            <Row label={t.base}>{pick(about, "location")}</Row>
            <Row label={t.age}>
              <LiveAge /> <span className="text-muted">{t.years}</span>
              <span className="meta block">{days === 0 ? t.birthdayToday : t.birthdayIn(days)}</span>
            </Row>
            {contact?.email && (
              <Row label="Email">
                <a href={`mailto:${contact.email}`} className="link">
                  {contact.email}
                </a>
              </Row>
            )}
          </Fade>

          <Fade delay={0.4} className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[14px]">
            {profiles.map(([name, url]) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-1">
                <span className="link">{name}</span>
                <Arrow className="w-3 text-accent transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </Fade>
        </div>

        <div className="col-span-12 md:col-span-7 md:col-start-6 md:pt-[5.5rem]">
          {lead && (
            <ScrollWords
              text={lead}
              className="text-[clamp(1.45rem,2.5vw,2.15rem)] leading-[1.28] tracking-[-0.025em]"
            />
          )}

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {paragraphs.map((p, i) => (
              <Fade key={i} delay={i * 0.08} as="p" className="leading-relaxed text-fg/70">
                {p}
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </Page>
  );
};

export default About;
