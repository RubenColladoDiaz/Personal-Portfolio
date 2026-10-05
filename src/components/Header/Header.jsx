import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "../../lib/lang";
import { useTheme } from "../../lib/theme";
import { ROUTES, routeLabel } from "../../lib/routes";
import { useHeaderInfo } from "../../lib/data";
import { EASE } from "../../lib/clock";
import { useLenis } from "../SmoothScroll";
import { LocalTime } from "../Bits";

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { t } = useLang();
  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? t.themeToDay : t.themeToNight}
      className="group flex h-6 w-6 items-center justify-center"
    >
      <span className="block transition-transform duration-500 ease-expo group-hover:scale-125">
        <span
          className="block h-3 w-3 rounded-full border border-current transition-transform duration-1000 ease-expo"
          style={{
            background: "linear-gradient(90deg, currentColor 50%, transparent 50%)",
            transform: `rotate(${theme === "dark" ? 0 : 180}deg)`,
          }}
        />
      </span>
    </button>
  );
}

function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <span className="flex items-center gap-1">
      {["es", "en"].map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="opacity-30">/</span>}
          <button
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={`transition-opacity duration-300 ${
              lang === l ? "opacity-100" : "opacity-40 hover:opacity-100"
            }`}
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </span>
  );
}

function Header() {
  const { pathname } = useLocation();
  const { lang, t } = useLang();
  const headerInfo = useHeaderInfo();
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const items = ROUTES.slice(1).map((r) => ({
    ...r,
    label: routeLabel(r.key, lang, headerInfo),
  }));

  // Se esconde al bajar y vuelve al subir.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 8) return;
      setHidden(y > last && y > 160);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setHidden(false);
  }, [pathname]);

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[100] text-[13px] text-white mix-blend-difference transition-transform duration-700 ease-expo"
        style={{ transform: hidden && !open ? "translateY(-110%)" : "none" }}
      >
        <div className="wrap flex items-center justify-between py-5">
          <div className="flex items-center gap-8">
            <Link to="/" className="font-medium tracking-tight">
              Rubén Collado
            </Link>
            <LocalTime className="hidden opacity-50 md:inline" />
          </div>

          <div className="flex items-center gap-8">
            <nav className="hidden items-center gap-6 lg:flex">
              {items.map((item) => {
                const active = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative flex items-center gap-1.5 transition-opacity duration-300 ${
                      active ? "opacity-100" : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="h-1 w-1 rounded-full bg-current"
                        transition={{ duration: 0.6, ease: EASE }}
                      />
                    )}
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="flex items-center gap-5">
              <LangSwitch />
              <ThemeToggle />
              <button
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                className="lg:hidden"
              >
                {open ? t.close : t.menu}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] bg-bg/95 backdrop-blur-md lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.4, ease: EASE } }}
            exit={{ opacity: 0, transition: { duration: 0.3, ease: EASE } }}
          >
            <nav className="wrap flex h-full flex-col justify-between pb-8 pt-28">
              <div className="flex flex-col gap-1">
                {ROUTES.map((r, i) => {
                  const active = pathname === r.path;
                  return (
                    <motion.div
                      key={r.path}
                      initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE, delay: 0.05 + i * 0.05 } }}
                    >
                      <Link
                        to={r.path}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 text-3xl font-medium tracking-tight ${
                          active ? "text-fg" : "text-fg/45"
                        }`}
                      >
                        {routeLabel(r.key, lang, headerInfo)}
                        {active && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <div className="meta flex justify-between">
                <LocalTime seconds />
                <span>Barcelona</span>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
