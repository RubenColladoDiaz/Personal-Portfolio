import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Page, { Loader } from "../../components/Page";
import Footer from "../../components/Footer";
import { Fade, SplitText } from "../../components/Reveal";
import { LocalTime } from "../../components/Bits";
import { useDoc } from "../../lib/data";
import { useLang } from "../../lib/lang";
import { EASE } from "../../lib/clock";

function Ext({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-link">
      {children}
    </a>
  );
}

function Contact() {
  const { lang, t, pick } = useLang();
  const { status: infoStatus, data: info } = useDoc("contact", "contact-info");
  const { status: linksStatus, data: links } = useDoc("contact", "social-links");
  const [copied, setCopied] = useState(false);
  const timer = useRef();

  useEffect(() => () => clearTimeout(timer.current), []);

  if (infoStatus === "loading" || linksStatus === "loading") {
    return (
      <Page>
        <Loader />
      </Page>
    );
  }

  const email = info.email || "";
  const [user, domain] = email.split("@");
  const city = (pick(info, "location") || "Barcelona").split(",")[0];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  const elsewhere =
    lang === "es" ? (
      <>
        También me encuentras en <Ext href={links.linkedin}>LinkedIn</Ext>,{" "}
        <Ext href={links.gitlab}>GitLab</Ext> y <Ext href={links.twitter}>X</Ext>. El código de esta web está{" "}
        <Ext href={links.portfolio}>aquí</Ext>.
      </>
    ) : (
      <>
        You can also find me on <Ext href={links.linkedin}>LinkedIn</Ext>,{" "}
        <Ext href={links.gitlab}>GitLab</Ext> and <Ext href={links.twitter}>X</Ext>. The code for this site lives{" "}
        <Ext href={links.portfolio}>here</Ext>.
      </>
    );

  return (
    <Page title={pick(info, "title")}>
      <section className="wrap grid min-h-[78svh] grid-cols-12 gap-x-6 pt-32 md:pt-40">
        <div className="col-span-12 md:col-span-4">
          <h1 className="title">
            <SplitText text={t.talk} />
          </h1>
        </div>

        <div className="col-span-12 mt-14 md:col-span-8 md:mt-[5.5rem]">
          <Fade delay={0.15}>
            <p className="text-muted">{t.writeTo}</p>
            <button onClick={copy} className="group mt-2 block text-left">
              <span className="text-[clamp(1.7rem,4vw,3.4rem)] font-medium leading-[1.1] tracking-[-0.035em]">
                <span className="link">
                  {user}
                  <wbr />
                  <span className="text-accent">@</span>
                  {domain}
                </span>
              </span>
            </button>
            <span className="meta relative mt-3 inline-flex h-4 overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={copied ? "y" : "n"}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%", transition: { duration: 0.45, ease: EASE } }}
                  exit={{ y: "-100%", transition: { duration: 0.45, ease: EASE } }}
                  className={copied ? "text-accent" : ""}
                >
                  {copied ? `${t.copied} ✓` : t.clickToCopy}
                </motion.span>
              </AnimatePresence>
            </span>
          </Fade>

          <Fade delay={0.25} as="p" className="mt-16 max-w-2xl text-[clamp(1.2rem,1.9vw,1.6rem)] leading-[1.35] tracking-[-0.02em]">
            {elsewhere}
          </Fade>

          <Fade delay={0.35} as="p" className="meta mt-10 flex items-center gap-2">
            <span className="live-dot" />
            {lang === "es" ? `Ahora mismo en ${city}:` : `Right now in ${city}:`}
            <LocalTime prefix="" seconds className="text-fg" />
          </Fade>
        </div>
      </section>

      <Footer />
    </Page>
  );
}

export default Contact;
