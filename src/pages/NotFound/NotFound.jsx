import { Link } from "react-router-dom";
import Page from "../../components/Page";
import FieldCanvas from "../../components/FieldCanvas";
import ProximityText from "../../components/ProximityText";
import { Fade } from "../../components/Reveal";
import { Arrow } from "../../components/Bits";
import { useLang } from "../../lib/lang";

function NotFound() {
  const { t } = useLang();
  return (
    <Page title="404">
      <section className="relative h-[100svh] overflow-hidden">
        <FieldCanvas className="absolute inset-0" />
        <div className="wrap pointer-events-none relative z-10 flex h-full flex-col justify-end pb-12">
          <h1 className="pointer-events-auto text-[clamp(4rem,12vw,9rem)] leading-none tracking-[-0.05em]">
            <ProximityText text="404" />
          </h1>
          <Fade delay={0.3} className="pointer-events-auto mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="text-muted">{t.notFound}</span>
            <Link to="/" className="group flex items-center gap-1.5">
              <span className="link">{t.goHome}</span>
              <Arrow direction="right" className="w-3.5 text-accent transition-transform duration-500 ease-expo group-hover:translate-x-1" />
            </Link>
          </Fade>
        </div>
      </section>
    </Page>
  );
}

export default NotFound;
