import { useLang } from "../../lib/lang";
import { Fade } from "../Reveal";
import { Arrow, joinNatural, pad } from "../Bits";

const Study = ({ study, index, total }) => {
  const { lang, t, pick } = useLang();
  const subjects = pick(study, "technologies") || [];
  const place = study.location?.split(",").slice(-2).join(",").trim();

  return (
    <article className="grid grid-cols-12 gap-x-6 gap-y-8 border-t border-fg/10 pt-8">
      <Fade className="col-span-12 space-y-4 md:col-span-4">
        <p className="meta">
          {pad(index + 1)} / {pad(total)}
        </p>
        <p className="meta text-fg/80">{pick(study, "period")}</p>
        <p className="text-[15px]">{study.institution}</p>
        <div className="flex flex-col items-start gap-2 text-[13px]">
          {study.url && (
            <a href={study.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-1.5">
              <span className="link">{pick(study, "visit_website")}</span>
              <Arrow className="w-3.5 text-accent transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          )}
          {study.location && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(study.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              title={study.location}
              className="group flex items-center gap-1.5 text-muted transition-colors hover:text-fg"
            >
              <span className="link">{place}</span>
              <Arrow className="w-3.5 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          )}
        </div>
      </Fade>

      <div className="col-span-12 md:col-span-8">
        <Fade as="h2" delay={0.05} className="text-[clamp(1.7rem,3vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.035em]">
          {pick(study, "title")}
        </Fade>
        <Fade as="p" delay={0.1} className="mt-6 max-w-xl text-lg leading-relaxed text-fg/75">
          {pick(study, "description")}
        </Fade>
        {subjects.length > 0 && (
          <Fade as="p" delay={0.15} className="mt-8 max-w-xl text-[15px] leading-relaxed">
            <span className="text-muted">{t.subjects} — </span>
            {joinNatural(subjects, lang)}.
          </Fade>
        )}
      </div>
    </article>
  );
};

export default Study;
