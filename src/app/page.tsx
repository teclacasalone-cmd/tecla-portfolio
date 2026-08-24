"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "motion/react";

/* ── Scroll wrappers ── */
function FadeUp({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}>
      {children}
    </motion.div>
  );
}

function SlideLeft({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}>
      {children}
    </motion.div>
  );
}

function SlideRight({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, x: 50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}>
      {children}
    </motion.div>
  );
}

function ScaleIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, scale: 0.92 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}>
      {children}
    </motion.div>
  );
}

/* ── Magnetic button ── */
function MagneticButton({ children, className = "", href, onClick, target, rel }: { children: React.ReactNode; className?: string; href?: string; onClick?: React.MouseEventHandler; target?: string; rel?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.2);
    y.set((e.clientY - cy) * 0.2);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.a ref={ref} href={href} onClick={onClick} target={target} rel={rel} style={{ x: springX, y: springY }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={className}>
      {children}
    </motion.a>
  );
}

/* ── Glow card with mouse tracking ── */
function GlowCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div ref={ref} onMouseMove={handleMouseMove} className={`glow-card ${className}`}>
      {children}
    </div>
  );
}


/* ══════════════════════════
   NAVBAR
   ══════════════════════════ */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Servizi" },
    { href: "#work", label: "Esperienza" },
    { href: "#projects", label: "Progetti" },
    { href: "#blog", label: "Blog" },
    { href: "#contact", label: "Contatti" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#060612]/80 backdrop-blur-xl border-b border-white/5" : ""}`}
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#" className="font-[var(--font-heading)] text-sm font-bold tracking-wide gradient-text">TC</a>
        <button className="md:hidden p-2 text-white/60" onClick={() => setOpen(!open)} aria-label="Menu">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        <div className="hidden md:flex gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[11px] text-white/40 hover:text-white transition-colors uppercase tracking-[0.2em] font-[var(--font-heading)]">
              {l.label}
            </a>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#060612]/95 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex flex-col gap-3"
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-white/50 hover:text-white" onClick={() => setOpen(false)}>{l.label}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ══════════════════════════
   HERO
   ══════════════════════════ */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px]" />
      </div>

      <motion.div style={{ y, opacity }} className="text-center relative z-10">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 mb-8"
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.8 }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-white/60 font-[var(--font-heading)] tracking-wide">Disponibile per nuovi progetti</span>
        </motion.div>

        <h1 className="font-[var(--font-heading)] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] text-center mb-4">
          <motion.span className="block text-white" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            Siti, AI, <span className="gradient-text">strategia.</span>
          </motion.span>
        </h1>

        <motion.p className="font-[var(--font-heading)] text-xl sm:text-2xl md:text-3xl text-white/40 font-medium tracking-tight text-center mb-12"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
        >
          Tutto quello che serve, <span className="text-white/70">niente di pi&ugrave;.</span>
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.1 }}>
          <MagneticButton href="#contact" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-full transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] font-[var(--font-heading)]">
            Parliamo del tuo progetto
          </MagneticButton>
          <MagneticButton href="#projects" className="px-8 py-4 border border-white/10 hover:border-white/25 text-white/70 hover:text-white text-sm font-medium rounded-full transition-all backdrop-blur-sm font-[var(--font-heading)]">
            Vedi i miei lavori
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
      >
        <motion.div
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5"
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-1 h-1.5 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════
   STATS
   ══════════════════════════ */
function Stats() {
  const stats = [
    { num: "1", label: "SaaS fondata" },
    { num: "2", label: "Siti web costruiti" },
    { num: "5+", label: "Progetti completati" },
    { num: "2", label: "Lauree IULM" },
  ];

  return (
    <section className="py-20 px-6 border-y border-white/5 relative">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <FadeUp key={s.label} delay={i * 0.1} className="text-center group">
            <div className="font-[var(--font-heading)] text-5xl sm:text-6xl font-extrabold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">{s.num}</div>
            <div className="text-sm text-white/40 font-[var(--font-heading)] tracking-wide">{s.label}</div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════
   MARQUEE SKILLS
   ══════════════════════════ */
function SkillsMarquee() {
  const skills = [
    "AI Marketing", "Prompt Engineering", "GEO & AI Visibility", "Google Ads",
    "Meta Ads", "LinkedIn Ads", "Content Strategy", "Google Analytics 4",
    "SEO", "Funnel TOFU/MOFU/BOFU", "CRM Management", "Social Media Strategy",
    "E-commerce", "UX/UI", "Brand Awareness", "Copywriting",
    "Next.js", "React", "Web Development", "Tailwind CSS",
  ];
  const doubled = [...skills, ...skills];

  return (
    <section className="py-10 overflow-hidden bg-white/[0.02] border-y border-white/5">
      <div className="marquee-track">
        {doubled.map((s, i) => (
          <span key={i} className="flex items-center shrink-0 px-5 text-sm text-white/30 whitespace-nowrap hover:text-white/70 transition-colors">
            <span className="gradient-text mr-4 text-xs font-bold">+</span>
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════
   ABOUT
   ══════════════════════════ */
function About() {
  return (
    <section id="about" className="py-28 px-6 relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-16 relative z-10">
        <SlideLeft className="md:col-span-2">
          <span className="text-indigo-400 text-xs font-semibold uppercase tracking-[0.2em] font-[var(--font-heading)]">About</span>
          <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-extrabold tracking-tight mt-3">
            Marketing, <span className="highlight">ricerca</span> e un po&apos; di <span className="gradient-text">codice</span>.
          </h2>
        </SlideLeft>
        <SlideRight className="md:col-span-3 space-y-5 text-white/50 leading-relaxed text-[15px]" delay={0.15}>
          <p>
            Sono una digital marketing specialist con specializzazione in <strong className="text-white font-medium">AI Marketing</strong> e{" "}
            <strong className="text-white font-medium">Generative Engine Optimization (GEO)</strong>. Laureanda magistrale in Marketing,
            Consumi e Comunicazione alla <strong className="text-white font-medium">IULM di Milano</strong>,
            sto scrivendo la tesi sulla visibilit&agrave; informativa nei sistemi LLM.
          </p>
          <p>
            Ho co-fondato <strong className="text-indigo-400 font-semibold">Citation Rate</strong>, un tool
            che monitora come le intelligenze artificiali citano i brand. Ho costruito da zero
            il <strong className="text-white font-medium">sito web</strong>, il <strong className="text-white font-medium">CRM interno</strong> e
            la <strong className="text-white font-medium">dashboard analytics</strong> con Next.js, React e Tailwind CSS.
            Analizzo i modelli di linguaggio e ricerco nuovi parametri di monitoraggio.
          </p>
          <p>
            Fuori dal lavoro faccio CrossFit (gare in team e coaching per adolescenti),
            vado in moto e faccio volontariato con AVIS, ADMO e Croce Rossa.
          </p>
        </SlideRight>
      </div>
    </section>
  );
}

/* ══════════════════════════
   SERVICES
   ══════════════════════════ */
function Services() {
  const services = [
    {
      num: "01",
      title: "AI Visibility & GEO",
      ideal: "Brand che vogliono essere citati dalle AI",
      desc: "Analizzo come i modelli di linguaggio vedono il tuo brand e creo strategie per migliorare la tua visibilit\u00e0 su ChatGPT, Perplexity, Google AI Overviews.",
      deliverables: ["Audit AI Visibility", "Strategia GEO", "Monitoraggio citazioni", "Report mensili"],
    },
    {
      num: "02",
      title: "Digital Advertising",
      ideal: "Aziende che vogliono scalare con le ads",
      desc: "Gestione campagne su Google, Meta e LinkedIn con approccio full-funnel. Dalla awareness alla conversione, con ottimizzazione continua basata sui dati.",
      deliverables: ["Setup campagne", "Gestione budget", "A/B testing", "Report performance"],
    },
    {
      num: "03",
      title: "Content & Social Strategy",
      ideal: "Brand che vogliono costruire una presenza online",
      desc: "Creazione di piani editoriali, contenuti social, articoli blog e strategie di comunicazione per aumentare engagement e brand awareness.",
      deliverables: ["Piano editoriale", "Contenuti social", "Blog & articoli", "Community management"],
    },
    {
      num: "04",
      title: "Siti Web & Web App",
      ideal: "Aziende che vogliono un sito moderno e performante",
      desc: "Progettazione e sviluppo di siti web, landing page, dashboard e CRM custom con Next.js, React e Tailwind CSS. Siti veloci, responsive e ottimizzati per SEO e AI Search.",
      deliverables: ["Sito web / landing page", "Dashboard & CRM", "Performance & Core Web Vitals", "Manutenzione & evoluzione"],
    },
  ];

  return (
    <section id="services" className="py-28 px-6 bg-white/[0.02] relative">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <FadeUp>
          <span className="text-indigo-400 text-xs font-semibold uppercase tracking-[0.2em] font-[var(--font-heading)]">Servizi</span>
          <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 mb-16">
            Cosa posso <span className="gradient-text">fare per te</span>
          </h2>
        </FadeUp>
        <div className="space-y-6">
          {services.map((s, i) => (
            <FadeUp key={s.num} delay={i * 0.1}>
              <GlowCard className="rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300">
                <div className="grid md:grid-cols-12 gap-6 p-8">
                  <div className="md:col-span-1">
                    <span className="font-[var(--font-heading)] text-3xl font-extrabold text-indigo-500/20">{s.num}</span>
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="font-[var(--font-heading)] text-xl font-bold text-white mb-2">{s.title}</h3>
                    <p className="text-[10px] text-indigo-400 uppercase tracking-[0.2em] font-[var(--font-heading)] font-semibold">Ideale per</p>
                    <p className="text-sm text-white/40 mt-1">{s.ideal}</p>
                  </div>
                  <div className="md:col-span-4">
                    <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                  <div className="md:col-span-3">
                    <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-[var(--font-heading)] font-semibold mb-3">Deliverable</p>
                    <ul className="space-y-2">
                      {s.deliverables.map((d) => (
                        <li key={d} className="text-sm text-white/40 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-indigo-500 shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlowCard>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════
   EXPERIENCE
   ══════════════════════════ */
function Experience() {
  const jobs = [
    { period: "Attuale", role: "Researcher & Developer, Co-founder", company: "Citation Rate", desc: "Sviluppo del sito web, CRM interno e dashboard analytics con Next.js e React. Gestione piattaforma SaaS, analisi modelli AI, ricerca parametri di monitoraggio.", active: true },
    { period: "Mar \u2014 Giu 2025", role: "Social Media Manager", company: "Studio Dentistico Minasi, Roma", desc: "PED social e blog, grafiche, sponsorizzate, eventi, articoli WordPress.", active: false },
    { period: "Giu \u2014 Ago 2024", role: "Marketing Intern", company: "Loft 73, Legnano", desc: "E-commerce Eversell, contenuti social, engagement e brand awareness.", active: false },
  ];

  return (
    <section id="work" className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <span className="text-indigo-400 text-xs font-semibold uppercase tracking-[0.2em] font-[var(--font-heading)]">Esperienza</span>
          <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 mb-16">
            Dove ho <span className="highlight">lavorato</span>
          </h2>
        </FadeUp>
        <div className="space-y-0">
          {jobs.map((j, i) => (
            <FadeUp key={i} delay={i * 0.12}>
              <div className="py-8 grid md:grid-cols-4 gap-4 border-b border-white/5 group hover:bg-white/[0.01] -mx-4 px-4 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  {j.active && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />}
                  <span className="text-sm text-white/30 font-mono">{j.period}</span>
                </div>
                <div className="md:col-span-3">
                  <h3 className="font-[var(--font-heading)] font-bold text-white group-hover:text-indigo-300 transition-colors">{j.role}</h3>
                  <p className="text-indigo-400 text-sm font-semibold mb-2">{j.company}</p>
                  <p className="text-white/40 text-sm leading-relaxed">{j.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════
   EDUCATION
   ══════════════════════════ */
function Education() {
  const edu = [
    { period: "2024 \u2014 2026", title: "Laurea Magistrale in Marketing, Consumi e Comunicazione", detail: "IULM Milano \u2014 Digital Marketing Management", thesis: "Visibilit\u00e0 informativa nei sistemi LLM: un approccio GEO basato sull\u2019AI Visibility Index (AIVX)" },
    { period: "2021 \u2014 2024", title: "Laurea Triennale in Comunicazione d\u2019Impresa e Relazioni Pubbliche", detail: "IULM Milano", thesis: "Social Media e Personal Branding: due casi a confronto" },
    { period: "2016 \u2014 2021", title: "Diploma Liceo Scienze Umane", detail: "Istituto Barbara Melzi, Legnano", thesis: null },
  ];

  return (
    <section className="py-28 px-6 bg-white/[0.02] relative">
      <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <FadeUp>
          <span className="text-indigo-400 text-xs font-semibold uppercase tracking-[0.2em] font-[var(--font-heading)]">Formazione</span>
          <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 mb-16">
            Il mio <span className="gradient-text">percorso</span>
          </h2>
        </FadeUp>
        <div className="space-y-10">
          {edu.map((e, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-sm text-white/30 font-mono">{e.period}</div>
                <div className="md:col-span-3">
                  <h3 className="font-[var(--font-heading)] font-bold text-white">{e.title}</h3>
                  <p className="text-sm text-white/40">{e.detail}</p>
                  {e.thesis && (
                    <p className="text-sm text-white/30 mt-3 italic border-l-2 border-indigo-500/30 pl-4">
                      Tesi: &ldquo;{e.thesis}&rdquo;
                    </p>
                  )}
                </div>
              </div>
            </FadeUp>
          ))}
          <FadeUp delay={0.3}>
            <div className="grid md:grid-cols-4 gap-4 pt-8 border-t border-white/5">
              <div className="text-sm text-white/30 font-mono">Cert.</div>
              <div className="md:col-span-3">
                <h3 className="font-[var(--font-heading)] font-bold text-white">AIDA Database Fundamentals</h3>
                <p className="text-sm text-white/40">Moody&apos;s</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════
   PROJECTS
   ══════════════════════════ */
function Projects() {
  const projects = [
    { title: "Citation Rate", label: "Co-founder", desc: "Piattaforma SaaS per monitorare la visibilit\u00e0 dei brand nei sistemi AI. Ho costruito il sito web, il CRM interno con gestione lead e analytics, e la dashboard con metriche proprietarie.", featured: true, link: "https://www.citationrate.com", techTags: ["Next.js", "React", "Tailwind CSS", "Supabase", "Vercel"] },
    { title: "Intrigue App", label: "IULM", desc: "Rinnovo app, PED, CRM, sicurezza dati.", featured: false, link: null, techTags: null },
    { title: "Google Merchandising (GA4)", label: "IULM", desc: "Analisi carrello, strategie vendita, campagne data-driven.", featured: false, link: null, techTags: null },
    { title: "Rocket Espresso \u2014 Global", label: "IULM", desc: "Lancio prodotto internazionale, strategie online e offline.", featured: false, link: null, techTags: null },
    { title: "Coca Cola \u2014 Sostenibilit\u00e0", label: "IULM", desc: "Lancio prodotto, comunicazione multicanale, social strategy.", featured: false, link: null, techTags: null },
  ];

  return (
    <section id="projects" className="py-28 px-6 relative">
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <FadeUp>
          <span className="text-indigo-400 text-xs font-semibold uppercase tracking-[0.2em] font-[var(--font-heading)]">Progetti</span>
          <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 mb-16">
            Cosa ho <span className="highlight">creato</span>
          </h2>
        </FadeUp>
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <ScaleIn key={p.title} delay={i * 0.08} className={p.featured ? "md:col-span-2" : ""}>
              <GlowCard className={`rounded-2xl border transition-all duration-300 hover:-translate-y-1 h-full ${
                p.featured
                  ? "border-indigo-500/20 bg-gradient-to-br from-indigo-500/[0.06] to-purple-500/[0.03] hover:border-indigo-500/40 hover:shadow-[0_0_40px_rgba(99,102,241,0.1)]"
                  : "border-white/5 bg-white/[0.02] hover:border-white/10"
              }`}>
                <div className="p-7 relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-[var(--font-heading)] font-bold text-white text-lg">{p.title}</h3>
                    <span className={`text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1 rounded-full ${
                      p.featured ? "text-indigo-300 bg-indigo-500/15" : "text-white/30 bg-white/5"
                    }`}>{p.label}</span>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed">{p.desc}</p>
                  {p.techTags && (
                    <div className="flex flex-wrap gap-2 mt-5">
                      {p.techTags.map((tag) => (
                        <span key={tag} className="text-[10px] font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full">{tag}</span>
                      ))}
                    </div>
                  )}
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-5 text-sm text-indigo-400 hover:text-indigo-300 font-semibold transition-colors group/link font-[var(--font-heading)]">
                      Visita il sito
                      <svg className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </GlowCard>
            </ScaleIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════
   BLOG / INSIGHTS
   ══════════════════════════ */
function Blog() {
  const [activeCategory, setActiveCategory] = useState("Tutti");
  const categories = ["Tutti", "AI & GEO", "Web Dev", "Marketing", "Personale"];

  const articles = [
    {
      title: "Come le AI scelgono quali brand citare (e come influenzarle)",
      excerpt: "Ho analizzato centinaia di risposte di ChatGPT, Perplexity e Gemini. Ecco i pattern che determinano quali brand vengono citati e quali ignorati.",
      category: "AI & GEO",
      date: "Coming soon",
      readTime: "8 min",
      featured: true,
      tags: ["Citation Rate", "GEO", "AI Visibility"],
    },
    {
      title: "GEO vs SEO: cosa cambia davvero nel 2026",
      excerpt: "La Generative Engine Optimization non sostituisce la SEO \u2014 la completa. Una guida pratica su dove si sovrappongono e dove divergono.",
      category: "AI & GEO",
      date: "Coming soon",
      readTime: "6 min",
      featured: false,
      tags: ["GEO", "SEO", "Strategia"],
    },
    {
      title: "Ho costruito un CRM da zero con Next.js \u2014 cosa ho imparato",
      excerpt: "Dal primo commit alla gestione di lead reali: errori, scelte architetturali e lezioni che applico a ogni nuovo progetto.",
      category: "Web Dev",
      date: "Coming soon",
      readTime: "10 min",
      featured: false,
      tags: ["Next.js", "React", "Case Study"],
    },
    {
      title: "5 segnali che dicono se il tuo brand \u00e8 invisibile alle AI",
      excerpt: "Checklist rapida per capire se ChatGPT, Perplexity e Google AI Overviews conoscono il tuo brand \u2014 e cosa fare se non lo citano.",
      category: "AI & GEO",
      date: "Coming soon",
      readTime: "5 min",
      featured: false,
      tags: ["AI Visibility", "Checklist", "Brand"],
    },
    {
      title: "AI Overviews: guida pratica per apparire nelle risposte di Google",
      excerpt: "Google ha cambiato le regole. Ecco come strutturare i contenuti per essere inclusi nelle risposte generate dall\u2019AI.",
      category: "AI & GEO",
      date: "Coming soon",
      readTime: "7 min",
      featured: false,
      tags: ["Google", "AI Overviews", "Content"],
    },
    {
      title: "Prompt Engineering per marketer: 10 prompt che uso ogni giorno",
      excerpt: "I prompt che uso davvero per analisi competitor, copy, briefing e reportistica. Niente teoria, solo workflow reali.",
      category: "Marketing",
      date: "Coming soon",
      readTime: "6 min",
      featured: false,
      tags: ["Prompt Engineering", "Workflow", "Produttivit\u00e0"],
    },
    {
      title: "Quanto costa davvero un sito web nel 2026 (e perch\u00e9)",
      excerpt: "Breakdown trasparente dei costi: hosting, sviluppo, design, manutenzione. Cosa influenza il prezzo e dove risparmiare senza compromessi.",
      category: "Web Dev",
      date: "Coming soon",
      readTime: "8 min",
      featured: false,
      tags: ["Siti Web", "Pricing", "Trasparenza"],
    },
    {
      title: "Da IULM a co-founder: costruire un SaaS durante la magistrale",
      excerpt: "Come ho bilanciato universit\u00e0, sviluppo prodotto e primi clienti. Le decisioni che rifarei e quelle che cambierei.",
      category: "Personale",
      date: "Coming soon",
      readTime: "7 min",
      featured: false,
      tags: ["Startup", "IULM", "Storytelling"],
    },
  ];

  const filtered = activeCategory === "Tutti" ? articles : articles.filter((a) => a.category === activeCategory);
  const featuredArticle = filtered.find((a) => a.featured) || filtered[0];
  const restArticles = filtered.filter((a) => a !== featuredArticle);

  return (
    <section id="blog" className="py-28 px-6 bg-white/[0.02] relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <FadeUp>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
            <div>
              <span className="text-indigo-400 text-xs font-semibold uppercase tracking-[0.2em] font-[var(--font-heading)]">Blog & Insights</span>
              <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-extrabold tracking-tight mt-3">
                Idee su <span className="gradient-text">AI, web</span> e <span className="highlight">marketing</span>
              </h2>
            </div>
            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[11px] font-semibold uppercase tracking-[0.15em] px-4 py-2 rounded-full transition-all font-[var(--font-heading)] ${
                    activeCategory === cat
                      ? "bg-indigo-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                      : "bg-white/5 text-white/30 hover:text-white/60 hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </FadeUp>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Featured article */}
            {featuredArticle && (
              <GlowCard className="rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/[0.06] to-purple-500/[0.03] hover:border-indigo-500/40 hover:shadow-[0_0_40px_rgba(99,102,241,0.1)] transition-all duration-300 mb-6 group cursor-pointer">
                <div className="p-8 md:p-10 relative z-10">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-indigo-300 bg-indigo-500/15 px-3 py-1 rounded-full">{featuredArticle.category}</span>
                    <span className="text-[10px] text-white/20 font-mono">{featuredArticle.date}</span>
                    <span className="text-[10px] text-white/20">&middot;</span>
                    <span className="text-[10px] text-white/20 font-mono">{featuredArticle.readTime} lettura</span>
                  </div>
                  <h3 className="font-[var(--font-heading)] text-xl sm:text-2xl font-extrabold text-white mb-3 group-hover:text-indigo-200 transition-colors">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-white/40 text-[15px] leading-relaxed max-w-2xl mb-5">{featuredArticle.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {featuredArticle.tags.map((tag) => (
                      <span key={tag} className="text-[10px] text-white/20 border border-white/10 px-2.5 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              </GlowCard>
            )}

            {/* Article grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {restArticles.map((a, i) => (
                <ScaleIn key={a.title} delay={i * 0.06}>
                  <GlowCard className="rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300 h-full group cursor-pointer">
                    <div className="p-6 relative z-10 flex flex-col h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`text-[10px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full ${
                          a.category === "AI & GEO" ? "text-indigo-300 bg-indigo-500/10" :
                          a.category === "Web Dev" ? "text-emerald-300 bg-emerald-500/10" :
                          a.category === "Marketing" ? "text-amber-300 bg-amber-500/10" :
                          "text-purple-300 bg-purple-500/10"
                        }`}>{a.category}</span>
                        <span className="text-[10px] text-white/15 font-mono">{a.readTime}</span>
                      </div>
                      <h3 className="font-[var(--font-heading)] font-bold text-white text-[15px] leading-snug mb-3 group-hover:text-indigo-200 transition-colors">
                        {a.title}
                      </h3>
                      <p className="text-white/30 text-sm leading-relaxed flex-1">{a.excerpt}</p>
                      <div className="flex items-center gap-1.5 mt-5 text-xs text-indigo-400 font-semibold font-[var(--font-heading)] group-hover:text-indigo-300 transition-colors">
                        Leggi
                        <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </GlowCard>
                </ScaleIn>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ══════════════════════════
   BIG CTA
   ══════════════════════════ */
function BigCta() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* CTA gradient bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[150px]" />
      </div>
      <FadeUp className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="font-[var(--font-heading)] text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          Hai un progetto?<br /><span className="gradient-text">Parliamone.</span>
        </h2>
        <p className="text-white/40 text-lg mb-12 max-w-md mx-auto">
          Che sia un sito web, una strategia AI o una campagna ads.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <MagneticButton href="mailto:tecla.casalone@gmail.com" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] font-[var(--font-heading)]">
            tecla.casalone@gmail.com
          </MagneticButton>
          <MagneticButton href="#contact" className="px-8 py-4 border border-white/10 hover:border-white/25 text-white/60 hover:text-white font-medium rounded-full transition-all font-[var(--font-heading)]">
            Scrivimi dal form &rarr;
          </MagneticButton>
        </div>
      </FadeUp>
    </section>
  );
}

/* ══════════════════════════
   CONTACT
   ══════════════════════════ */
function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const message = data.get("message") as string;
    window.location.href = `mailto:tecla.casalone@gmail.com?subject=${encodeURIComponent(`Dal portfolio — ${name}`)}&body=${encodeURIComponent(`Da: ${name} (${email})\n\n${message}`)}`;
    setSent(true);
    form.reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="py-28 px-6 bg-white/[0.02] relative">
      <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-16 relative z-10">
        <SlideLeft className="md:col-span-2">
          <span className="text-indigo-400 text-xs font-semibold uppercase tracking-[0.2em] font-[var(--font-heading)]">Contatti</span>
          <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 mb-6">
            <span className="gradient-text">Scrivimi.</span>
          </h2>
          <p className="text-white/40 leading-relaxed mb-8">
            Compila il form o scrivimi direttamente via email.
          </p>
          <div className="space-y-4 text-sm text-white/40">
            <a href="mailto:tecla.casalone@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors">
              <svg className="w-4 h-4 shrink-0 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              tecla.casalone@gmail.com
            </a>
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 shrink-0 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Rescaldina (MI)
            </div>
          </div>
        </SlideLeft>
        <SlideRight className="md:col-span-3" delay={0.15}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-[10px] font-[var(--font-heading)] font-semibold uppercase tracking-[0.2em] mb-2 text-white/30">Nome</label>
                <input id="name" name="name" required className="w-full px-4 py-3.5 bg-white/5 rounded-xl border border-white/10 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all placeholder:text-white/20" placeholder="Il tuo nome" />
              </div>
              <div>
                <label htmlFor="email" className="block text-[10px] font-[var(--font-heading)] font-semibold uppercase tracking-[0.2em] mb-2 text-white/30">Email</label>
                <input id="email" name="email" type="email" required className="w-full px-4 py-3.5 bg-white/5 rounded-xl border border-white/10 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all placeholder:text-white/20" placeholder="La tua email" />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-[10px] font-[var(--font-heading)] font-semibold uppercase tracking-[0.2em] mb-2 text-white/30">Messaggio</label>
              <textarea id="message" name="message" rows={5} required className="w-full px-4 py-3.5 bg-white/5 rounded-xl border border-white/10 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all resize-none placeholder:text-white/20" placeholder="Raccontami del tuo progetto..." />
            </div>
            <MagneticButton
              href="#"
              onClick={(e) => {
                e.preventDefault();
                const form = (e.currentTarget as HTMLElement).closest("form");
                if (form) form.requestSubmit();
              }}
              className="inline-block px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-full transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] font-[var(--font-heading)] cursor-pointer"
            >
              Invia messaggio
            </MagneticButton>
            {sent && <p className="text-sm text-indigo-400">Si aprir&agrave; il tuo client email.</p>}
          </form>
        </SlideRight>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-[var(--font-heading)] font-bold text-sm gradient-text mb-1">Tecla Casalone</p>
          <p className="text-xs text-white/30">AI Marketing &middot; GEO &middot; Web Development &middot; Digital Strategy</p>
        </div>
        <div className="flex gap-6">
          <a href="mailto:tecla.casalone@gmail.com" className="text-xs text-white/30 hover:text-white transition-colors">Email</a>
          <a href="#" className="text-xs text-white/30 hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}

/* ── PAGE ── */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <SkillsMarquee />
        <About />
        <Services />
        <Experience />
        <Education />
        <Projects />
        <Blog />
        <BigCta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
