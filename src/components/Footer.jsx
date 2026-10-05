import { Link, useLocation } from "react-router-dom";
import { useLang } from "../lib/lang";
import { nextRoute, routeLabel } from "../lib/routes";
import { useHeaderInfo } from "../lib/data";
import { scrollToTop, useLenis } from "./SmoothScroll";
import { Arrow, LocalTime } from "./Bits";
import { Fade } from "./Reveal";

export default function Footer() {
  const { pathname } = useLocation();
  const { lang, t } = useLang();
  const headerInfo = useHeaderInfo();
  const lenis = useLenis();
  const next = nextRoute(pathname);

  return (
    <footer className="wrap pb-8 pt-40 md:pt-56">
      <Fade>
        <Link to={next.path} className="group inline-block">
          <span className="meta">{t.next}</span>
          <span className="mt-1 flex items-center gap-3 text-[clamp(1.6rem,3vw,2.4rem)] font-medium tracking-[-0.03em]">
            <span className="stretch">{routeLabel(next.key, lang, headerInfo)}</span>
            <Arrow
              direction="right"
              className="w-[0.7em] text-accent transition-transform duration-500 ease-expo group-hover:translate-x-2"
            />
          </span>
        </Link>
      </Fade>

      <div className="hairline mt-12" />
      <div className="meta mt-5 flex flex-wrap items-center justify-between gap-x-8 gap-y-2">
        <span>© {new Date().getFullYear()} Rubén Collado</span>
        <LocalTime seconds prefix="Barcelona" />
        <button
          onClick={() => scrollToTop(lenis)}
          className="link transition-colors hover:text-fg"
        >
          {t.backToTop} ↑
        </button>
      </div>
    </footer>
  );
}
