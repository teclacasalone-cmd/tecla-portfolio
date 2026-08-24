"use client";

import { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";

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

/* ══════════════════════════
   NAVBAR
   ══════════════════════════ */
function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Servizi" },
    { href: "#work", label: "Esperienza" },
    { href: "#projects", label: "Progetti" },
    { href: "#contact", label: "Contatti" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#faf8f5]/90 backdrop-blur-sm border-b border-[#e5e0d8]">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
        <a href="#" className="font-[var(--font-heading)] text-sm font-semibold tracking-wide">Tecla Casalone</a>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
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
            <a key={l.href} href={l.href} className="text-xs text-[#888] hover:text-[#1a1a1a] transition-colors uppercase tracking-widest">
              {l.label}
            </a>
          ))}
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-[#faf8f5] border-b border-[#e5e0d8] px-6 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-[#888] hover:text-[#1a1a1a]" onClick={() => setOpen(false)}>{l.label}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ══════════════════════════
   HERO
   ══════════════════════════ */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const nameLetters = "Tecla Casalone".split("");

  return (
    <section ref={ref} className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <motion.div style={{ y, opacity }} className="text-center">
        <motion.p
          className="text-sm text-[#c44536] font-medium tracking-widest uppercase mb-6 font-[var(--font-heading)]"
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }}
        >
          Digital Marketing & AI
        </motion.p>

        <h1 className="font-[var(--font-heading)] text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-[1] text-center mb-8">
          {nameLetters.map((letter, i) => (
            <motion.span key={i} className={i < 5 ? "text-[#c44536]" : "text-[#1a1a1a]"}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </h1>

        <motion.p className="text-lg text-[#777] max-w-lg mx-auto text-center leading-relaxed mb-10"
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2 }}
        >
          Studio come le AI vedono i brand e creo strategie per migliorare la loro visibilità.
        </motion.p>

        <motion.div className="flex gap-4 justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.6 }}>
          <a href="#contact" className="px-7 py-3 bg-[#c44536] hover:bg-[#a93a2d] text-white text-sm font-medium rounded-full transition-colors">Contattami</a>
          <a href="#about" className="px-7 py-3 border border-[#d5cfc7] hover:border-[#999] text-sm font-medium rounded-full transition-colors">Scopri di più</a>
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
    { num: "1", label: "Tool AI fondato" },
    { num: "5+", label: "Progetti completati" },
    { num: "3+", label: "Esperienze professionali" },
    { num: "2", label: "Lauree IULM" },
  ];

  return (
    <section className="py-16 px-6 border-y border-[#e5e0d8]">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <FadeUp key={s.label} delay={i * 0.1} className="text-center">
            <div className="font-[var(--font-heading)] text-4xl sm:text-5xl font-bold text-[#c44536] mb-2">{s.num}</div>
            <div className="text-sm text-[#888]">{s.label}</div>
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
  ];
  const doubled = [...skills, ...skills];

  return (
    <section className="py-10 overflow-hidden bg-[#f0ece6]">
      <div className="marquee-track">
        {doubled.map((s, i) => (
          <span key={i} className="flex items-center shrink-0 px-4 text-sm text-[#555] whitespace-nowrap">
            <span className="text-[#c44536] mr-4 text-xs">&#10022;</span>
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
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-16">
        <SlideLeft className="md:col-span-2">
          <span className="text-[#c44536] text-xs font-medium uppercase tracking-widest font-[var(--font-heading)]">About</span>
          <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold tracking-tight mt-3">
            Marketing, ricerca e un po&apos; di codice.
          </h2>
        </SlideLeft>
        <SlideRight className="md:col-span-3 space-y-5 text-[#555] leading-relaxed" delay={0.15}>
          <p>
            Sono una digital marketing specialist con specializzazione in AI Marketing
            e Generative Engine Optimization (GEO). Laureanda magistrale in Marketing,
            Consumi e Comunicazione alla <strong className="text-[#1a1a1a]">IULM di Milano</strong>,
            sto scrivendo la tesi sulla visibilità informativa nei sistemi LLM.
          </p>
          <p>
            Ho co-fondato <strong className="text-[#1a1a1a]">Citation Rate</strong>, un tool
            che monitora come le intelligenze artificiali citano i brand. Lo sviluppo, gestisco
            il CRM, analizzo i modelli di linguaggio e ricerco nuovi parametri di monitoraggio.
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
   SERVICES (numerati)
   ══════════════════════════ */
function Services() {
  const services = [
    {
      num: "01",
      title: "AI Visibility & GEO",
      ideal: "Brand che vogliono essere citati dalle AI",
      desc: "Analizzo come i modelli di linguaggio vedono il tuo brand e creo strategie per migliorare la tua visibilità su ChatGPT, Perplexity, Google AI Overviews.",
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
  ];

  return (
    <section id="services" className="py-24 px-6 bg-[#f0ece6]">
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          <span className="text-[#c44536] text-xs font-medium uppercase tracking-widest font-[var(--font-heading)]">Servizi</span>
          <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-14">Cosa posso fare per te</h2>
        </FadeUp>
        <div className="space-y-12">
          {services.map((s, i) => (
            <FadeUp key={s.num} delay={i * 0.12}>
              <div className="grid md:grid-cols-12 gap-6 py-10 border-t border-[#ddd5cb]">
                <div className="md:col-span-1">
                  <span className="font-[var(--font-heading)] text-3xl font-bold text-[#c44536]/30">{s.num}</span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-[var(--font-heading)] text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-xs text-[#c44536] uppercase tracking-widest font-[var(--font-heading)]">Ideale per</p>
                  <p className="text-sm text-[#777] mt-1">{s.ideal}</p>
                </div>
                <div className="md:col-span-4">
                  <p className="text-[#555] text-sm leading-relaxed">{s.desc}</p>
                </div>
                <div className="md:col-span-3">
                  <p className="text-xs text-[#999] uppercase tracking-widest font-[var(--font-heading)] mb-3">Deliverable</p>
                  <ul className="space-y-2">
                    {s.deliverables.map((d) => (
                      <li key={d} className="text-sm text-[#777] flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#c44536] shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
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
   EXPERIENCE
   ══════════════════════════ */
function Experience() {
  const jobs = [
    { period: "Attuale", role: "Researcher & Developer, Co-founder", company: "Citation Rate", desc: "Sviluppo software, CRM, analisi modelli AI, ricerca parametri di monitoraggio." },
    { period: "Mar — Giu 2025", role: "Social Media Manager", company: "Studio Dentistico Minasi, Roma", desc: "PED social e blog, grafiche, sponsorizzate, eventi, articoli WordPress." },
    { period: "Giu — Ago 2024", role: "Marketing Intern", company: "Loft 73, Legnano", desc: "E-commerce Eversell, contenuti social, engagement e brand awareness." },
  ];

  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          <span className="text-[#c44536] text-xs font-medium uppercase tracking-widest font-[var(--font-heading)]">Esperienza</span>
          <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-14">Dove ho lavorato</h2>
        </FadeUp>
        <div className="divide-y divide-[#e5e0d8]">
          {jobs.map((j, i) => (
            <FadeUp key={i} delay={i * 0.12}>
              <div className="py-8 grid md:grid-cols-4 gap-4 first:pt-0 last:pb-0">
                <div className="text-sm text-[#999] font-mono">{j.period}</div>
                <div className="md:col-span-3">
                  <h3 className="font-[var(--font-heading)] font-semibold">{j.role}</h3>
                  <p className="text-[#c44536] text-sm mb-2">{j.company}</p>
                  <p className="text-[#777] text-sm leading-relaxed">{j.desc}</p>
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
    { period: "2024 — 2026", title: "Laurea Magistrale in Marketing, Consumi e Comunicazione", detail: "IULM Milano — Digital Marketing Management", thesis: "Visibilità informativa nei sistemi LLM: un approccio GEO basato sull'AI Visibility Index (AIVX)" },
    { period: "2021 — 2024", title: "Laurea Triennale in Comunicazione d'Impresa e Relazioni Pubbliche", detail: "IULM Milano", thesis: "Social Media e Personal Branding: due casi a confronto" },
    { period: "2016 — 2021", title: "Diploma Liceo Scienze Umane", detail: "Istituto Barbara Melzi, Legnano", thesis: null },
  ];

  return (
    <section className="py-24 px-6 bg-[#f0ece6]">
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          <span className="text-[#c44536] text-xs font-medium uppercase tracking-widest font-[var(--font-heading)]">Formazione</span>
          <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-14">Il mio percorso</h2>
        </FadeUp>
        <div className="space-y-10">
          {edu.map((e, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-sm text-[#999] font-mono">{e.period}</div>
                <div className="md:col-span-3">
                  <h3 className="font-[var(--font-heading)] font-semibold">{e.title}</h3>
                  <p className="text-sm text-[#777]">{e.detail}</p>
                  {e.thesis && (
                    <p className="text-sm text-[#999] mt-2 italic border-l-2 border-[#c44536]/20 pl-4">Tesi: &ldquo;{e.thesis}&rdquo;</p>
                  )}
                </div>
              </div>
            </FadeUp>
          ))}
          <FadeUp delay={0.3}>
            <div className="grid md:grid-cols-4 gap-4 pt-6 border-t border-[#ddd5cb]">
              <div className="text-sm text-[#999] font-mono">Cert.</div>
              <div className="md:col-span-3">
                <h3 className="font-[var(--font-heading)] font-semibold">AIDA Database Fundamentals</h3>
                <p className="text-sm text-[#777]">Moody&apos;s</p>
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
    { title: "Citation Rate", label: "Co-founder", desc: "Tool per monitorare la visibilità dei brand nei sistemi AI. Citazioni, CRM, dashboard, metriche proprietarie.", featured: true },
    { title: "Intrigue App", label: "IULM", desc: "Rinnovo app, PED, CRM, sicurezza dati.", featured: false },
    { title: "Google Merchandising (GA4)", label: "IULM", desc: "Analisi carrello, strategie vendita, campagne data-driven.", featured: false },
    { title: "Rocket Espresso — Global", label: "IULM", desc: "Lancio prodotto internazionale, strategie online e offline.", featured: false },
    { title: "Coca Cola — Sostenibilità", label: "IULM", desc: "Lancio prodotto, comunicazione multicanale, social strategy.", featured: false },
  ];

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          <span className="text-[#c44536] text-xs font-medium uppercase tracking-widest font-[var(--font-heading)]">Progetti</span>
          <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-14">Cosa ho creato</h2>
        </FadeUp>
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <ScaleIn key={p.title} delay={i * 0.08} className={p.featured ? "md:col-span-2" : ""}>
              <div className={`p-6 rounded-xl border transition-all hover:-translate-y-1 h-full ${
                p.featured ? "border-[#c44536]/20 bg-[#c44536]/[0.04] hover:border-[#c44536]/40" : "border-[#e5e0d8] bg-white hover:border-[#ccc]"
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-[var(--font-heading)] font-semibold">{p.title}</h3>
                  <span className={`text-[10px] font-medium uppercase tracking-widest px-3 py-1 rounded-full ${
                    p.featured ? "text-[#c44536] bg-[#c44536]/10" : "text-[#999] bg-[#f0ece6]"
                  }`}>{p.label}</span>
                </div>
                <p className="text-[#777] text-sm leading-relaxed">{p.desc}</p>
              </div>
            </ScaleIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════
   BIG CTA
   ══════════════════════════ */
function BigCta() {
  return (
    <section className="py-24 px-6 bg-[#1a1a1a] text-white">
      <FadeUp className="max-w-3xl mx-auto text-center">
        <h2 className="font-[var(--font-heading)] text-3xl sm:text-5xl font-bold tracking-tight mb-6">
          Hai un progetto?<br />Parliamone.
        </h2>
        <p className="text-[#999] text-lg mb-10 max-w-md mx-auto">
          Che sia una strategia AI, una campagna ads o un&apos;idea ancora da definire.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="mailto:tecla.casalone@gmail.com" className="px-8 py-4 bg-[#c44536] hover:bg-[#a93a2d] text-white font-medium rounded-full transition-colors">
            tecla.casalone@gmail.com
          </a>
          <a href="#contact" className="px-8 py-4 border border-white/20 hover:border-white/40 font-medium rounded-full transition-colors">
            Scrivimi dal form &rarr;
          </a>
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
    <section id="contact" className="py-24 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-16">
        <SlideLeft className="md:col-span-2">
          <span className="text-[#c44536] text-xs font-medium uppercase tracking-widest font-[var(--font-heading)]">Contatti</span>
          <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-6">Scrivimi.</h2>
          <p className="text-[#777] leading-relaxed mb-8">
            Compila il form o scrivimi direttamente via email.
          </p>
          <div className="space-y-4 text-sm text-[#777]">
            <a href="mailto:tecla.casalone@gmail.com" className="flex items-center gap-3 hover:text-[#1a1a1a] transition-colors">
              <svg className="w-4 h-4 shrink-0 text-[#c44536]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              tecla.casalone@gmail.com
            </a>
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 shrink-0 text-[#c44536]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <label htmlFor="name" className="block text-xs font-[var(--font-heading)] font-medium uppercase tracking-widest mb-2">Nome</label>
                <input id="name" name="name" required className="w-full px-4 py-3 bg-white rounded-lg border border-[#e5e0d8] text-sm focus:outline-none focus:border-[#c44536]/50 transition-colors placeholder:text-[#bbb]" placeholder="Il tuo nome" />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-[var(--font-heading)] font-medium uppercase tracking-widest mb-2">Email</label>
                <input id="email" name="email" type="email" required className="w-full px-4 py-3 bg-white rounded-lg border border-[#e5e0d8] text-sm focus:outline-none focus:border-[#c44536]/50 transition-colors placeholder:text-[#bbb]" placeholder="La tua email" />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-xs font-[var(--font-heading)] font-medium uppercase tracking-widest mb-2">Messaggio</label>
              <textarea id="message" name="message" rows={5} required className="w-full px-4 py-3 bg-white rounded-lg border border-[#e5e0d8] text-sm focus:outline-none focus:border-[#c44536]/50 transition-colors resize-none placeholder:text-[#bbb]" placeholder="Raccontami del tuo progetto..." />
            </div>
            <button type="submit" className="px-8 py-3 bg-[#c44536] hover:bg-[#a93a2d] text-white text-sm font-medium rounded-full transition-colors">Invia messaggio</button>
            {sent && <p className="text-sm text-[#c44536]">Si aprirà il tuo client email.</p>}
          </form>
        </SlideRight>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-[#e5e0d8]">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-[var(--font-heading)] font-semibold text-sm mb-1">Tecla Casalone</p>
          <p className="text-xs text-[#999]">AI Marketing &middot; GEO &middot; Digital Strategy</p>
        </div>
        <div className="flex gap-6">
          <a href="mailto:tecla.casalone@gmail.com" className="text-xs text-[#999] hover:text-[#1a1a1a] transition-colors">Email</a>
          <a href="#" className="text-xs text-[#999] hover:text-[#1a1a1a] transition-colors">LinkedIn</a>
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
        <BigCta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
