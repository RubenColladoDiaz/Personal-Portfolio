import { useCallback, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header/Header";
import Preloader from "./components/Preloader";
import { SmoothScroll, scrollToTop, useLenis } from "./components/SmoothScroll";
import { EASE, INTRO_MS, setEnterIn } from "./lib/clock";
import { useLang } from "./lib/lang";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Studies from "./pages/Studies/Studies";
import Experience from "./pages/Experience/Experience";
import MyProjects from "./pages/MyProjects/MyProjects";
import Contact from "./pages/Contact/Contact";
import NotFound from "./pages/NotFound/NotFound";

function shouldPlayIntro() {
  try {
    if (sessionStorage.getItem("intro-seen")) return false;
    sessionStorage.setItem("intro-seen", "1");
  } catch {
    /* sin sessionStorage: se muestra igualmente */
  }
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const PLAY_INTRO = shouldPlayIntro();
setEnterIn(PLAY_INTRO ? INTRO_MS - 250 : 100);

function useComeBackTitle() {
  const { t } = useLang();
  useEffect(() => {
    let saved = null;
    const onChange = () => {
      if (document.hidden) {
        saved = document.title;
        document.title = t.comeBack;
      } else if (saved !== null) {
        document.title = saved;
        saved = null;
      }
    };
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, [t]);
}

// Una línea fina que cruza la parte superior en cada cambio de página.
function NavProgress({ path }) {
  return (
    <motion.div
      key={path}
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[120] h-px origin-left bg-accent"
      initial={{ scaleX: 0, opacity: 1 }}
      animate={{
        scaleX: [0, 0.7, 1],
        opacity: [1, 1, 0],
        transition: { duration: 1.1, ease: EASE, times: [0, 0.6, 1] },
      }}
    />
  );
}

function Shell() {
  const location = useLocation();
  const lenis = useLenis();
  const [intro, setIntro] = useState(PLAY_INTRO);
  const endIntro = useCallback(() => setIntro(false), []);

  useComeBackTitle();

  useEffect(() => {
    if (!lenis) return;
    if (intro) lenis.stop();
    else lenis.start();
  }, [intro, lenis]);

  return (
    <>
      {intro && <Preloader onDone={endIntro} />}
      {location.key !== "default" && <NavProgress path={location.pathname} />}
      <Header />
      <AnimatePresence mode="wait" onExitComplete={() => scrollToTop(lenis, true)}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/studies" element={<Studies />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/myprojects" element={<MyProjects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <SmoothScroll>
      <Shell />
    </SmoothScroll>
  );
}
