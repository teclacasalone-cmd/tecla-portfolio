"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ── Scroll reveal hook ── */
function useReveal<T extends HTMLElement>(className = "reveal") {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  // attach the base class
  useEffect(() => {
    ref.current?.classList.add(className);
  }, [className]);
  return ref;
}

/* ── Typing effect ── */
function useTyping(words: string[], speed = 80, pause = 2000) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setText(word.slice(0, charIdx + 1));
          if (charIdx + 1 === word.length) {
            setTimeout(() => setDeleting(true), pause);
          } else {
            setCharIdx(charIdx + 1);
          }
        } else {
          setText(word.slice(0, charIdx));
          if (charIdx === 0) {
            setDeleting(false);
            setWordIdx((wordIdx + 1) % words.length);
          } else {
            setCharIdx(charIdx - 1);
          }
        }
      },
      deleting ? speed / 2 : speed
    );
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return text;
}

/* ── Mouse glow effect ── */
function useMouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const handleMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    ref.current.style.setProperty("--mx", `${e.clientX}px`);
    ref.current.style.setProperty("--my", `${e.clientY}px`);
  }, []);
  useEffect(() => {
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [handleMove]);
  return ref;
}

/* ══════════════════════════════════════════
   NAVBAR
   ══════════════════════════════════════════ */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#chi-sono", label: "Chi Sono" },
    { href: "#competenze", label: "Competenze" },
    { href: "#esperienze", label: "Esperienze" },
    { href: "#formazione", label: "Formazione" },
    { href: "#progetti", label: "Progetti" },
    { href: "#contatti", label: "Contatti" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-card-border shadow-lg shadow-primary/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <a href="#" className="text-xl font-bold gradient-text">
          TC
        </a>
        <button
          className="sm:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        <div className="hidden sm:flex gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted hover:text-accent transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
      {open && (
        <div className="sm:hidden bg-background/95 backdrop-blur-xl border-b border-card-border px-6 pb-6 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-muted hover:text-accent transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ══════════════════════════════════════════
   HERO
   ══════════════════════════════════════════ */
function Hero() {
  const typed = useTyping(
    ["AI Marketing", "GEO Specialist", "Digital Strategist", "Citation Rate Co-founder"],
    70,
    2500
  );
  const glowRef = useMouseGlow();

  return (
    <section
      ref={glowRef}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 grid-bg overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at var(--mx, 50%) var(--my, 50%), rgba(124,58,237,0.08) 0%, transparent 50%), #050510",
      }}
    >
      {/* Floating orbs */}
      <div className="orb w-72 h-72 bg-primary/30 top-20 -left-20" />
      <div className="orb w-96 h-96 bg-accent/20 bottom-20 -right-32" style={{ animationDelay: "3s" }} />
      <div className="orb w-48 h-48 bg-primary-light/20 top-1/2 left-1/3" style={{ animationDelay: "5s" }} />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="mb-6 inline-block px-4 py-2 rounded-full border border-card-border bg-card text-sm text-muted">
          Disponibile per nuovi progetti
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-6 tracking-tight">
          <span className="gradient-text">Tecla</span>
          <br />
          <span className="text-foreground">Casalone</span>
        </h1>

        <div className="text-xl sm:text-2xl md:text-3xl text-muted mb-8 h-10">
          <span className="text-accent">{typed}</span>
          <span className="cursor text-accent">|</span>
        </div>

        <p className="text-muted max-w-2xl mx-auto text-lg leading-relaxed mb-10">
          Ricercatrice e sviluppatrice di Citation Rate. Studio come le AI citano i brand
          e creo strategie per migliorare la loro visibilità nei sistemi di intelligenza artificiale.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#contatti"
            className="group px-8 py-4 bg-primary hover:bg-primary-light text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-1"
          >
            Contattami
            <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">&rarr;</span>
          </a>
          <a
            href="#chi-sono"
            className="px-8 py-4 border border-card-border hover:border-accent text-foreground rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1"
          >
            Scopri di più
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-muted/30 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-accent rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   CHI SONO
   ══════════════════════════════════════════ */
function ChiSono() {
  const ref1 = useReveal<HTMLDivElement>("reveal-left");
  const ref2 = useReveal<HTMLDivElement>("reveal-right");

  return (
    <section id="chi-sono" className="py-28 px-4 sm:px-6 relative">
      <div className="orb w-64 h-64 bg-accent/15 top-0 right-0" />
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div ref={ref1}>
          <span className="text-accent text-sm font-mono tracking-widest uppercase mb-4 block">// Chi Sono</span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-8">
            Digital Marketing
            <br />
            <span className="gradient-text">meets AI</span>
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              Sono <strong className="text-foreground">Tecla Casalone</strong>, digital marketing specialist con
              specializzazione in AI Marketing e Generative Engine Optimization (GEO).
            </p>
            <p>
              Laureanda magistrale alla <strong className="text-foreground">IULM di Milano</strong>, sto
              sviluppando la mia tesi sulla visibilità informativa nei sistemi LLM con un approccio
              basato sull&apos;AI Visibility Index (AIVX).
            </p>
            <p>
              Co-founder di <strong className="text-foreground">Citation Rate</strong>, un tool innovativo
              per monitorare come le intelligenze artificiali citano i brand.
            </p>
          </div>
        </div>

        <div ref={ref2} className="grid grid-cols-2 gap-4">
          {[
            { num: "3+", label: "Esperienze lavorative" },
            { num: "5+", label: "Progetti completati" },
            { num: "2", label: "Lauree IULM" },
            { num: "1", label: "Tool AI fondato" },
          ].map((s) => (
            <div key={s.label} className="glow-card p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-2">{s.num}</div>
              <div className="text-sm text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   COMPETENZE
   ══════════════════════════════════════════ */
function Competenze() {
  const titleRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>("stagger");

  const skills = [
    {
      title: "AI Marketing",
      desc: "Prompt Engineering avanzato per SEO e Content Strategy. Modelli OpenAI, Anthropic, Microsoft.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611l-.573.097a9.59 9.59 0 01-3.124 0l-.573-.097c-1.717-.293-2.3-2.379-1.067-3.611L16 15.3M5 14.5l-1.402 1.402c-1.232 1.232-.65 3.318 1.067 3.611l.573.097a9.59 9.59 0 003.124 0l.573-.097c1.717-.293 2.3-2.379 1.067-3.611L8.2 15.3" />
        </svg>
      ),
    },
    {
      title: "Digital Strategy & Ads",
      desc: "Gestione del Funnel TOFU/MOFU/BOFU. Google Ads, Meta Ads, LinkedIn Ads.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
    },
    {
      title: "Analytics & SEO",
      desc: "Google Analytics 4 con supporto AI. Ottimizzazione UX/UI per visibilità organica.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      ),
    },
    {
      title: "Tech Stack",
      desc: "Shopify, Canva, Eversell, CRM GoHighLevel, AIDA Moody's.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      ),
    },
    {
      title: "Content Creation",
      desc: "PED social e blog, grafiche, articoli WordPress, social media strategy.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
        </svg>
      ),
    },
    {
      title: "GEO & AI Visibility",
      desc: "Metriche per la visibilità dei brand nei sistemi AI generativi.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
        </svg>
      ),
    },
  ];

  return (
    <section id="competenze" className="py-28 px-4 sm:px-6 relative grid-bg">
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className="text-center mb-16">
          <span className="text-accent text-sm font-mono tracking-widest uppercase mb-4 block">// Competenze</span>
          <h2 className="text-4xl sm:text-5xl font-bold">
            Le mie <span className="gradient-text">skills</span>
          </h2>
        </div>
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((s) => (
            <div key={s.title} className="glow-card p-8 group">
              <div className="text-primary group-hover:text-accent transition-colors duration-300 mb-4">
                {s.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{s.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   ESPERIENZE
   ══════════════════════════════════════════ */
function Esperienze() {
  const titleRef = useReveal<HTMLDivElement>();

  const exp = [
    {
      role: "Researcher & Developer | Co-founder",
      company: "Citation Rate",
      period: "Attuale",
      desc: "Sviluppo del software, creazione e monitoraggio del CRM, analisi dei modelli di linguaggio AI, ricerca dei parametri di monitoraggio del tool.",
    },
    {
      role: "Social Media Manager",
      company: "Studio Dentistico Minasi, Roma",
      period: "Mar 2025 - Giu 2025",
      desc: "Creazione di PED social e blog, grafiche, gestione sponsorizzate, gestione eventi, pubblicazione di articoli su WordPress.",
    },
    {
      role: "Marketing Intern",
      company: "Loft 73, Legnano (MI)",
      period: "Giu 2024 - Ago 2024",
      desc: "Ottimizzazione e-commerce e gestione dello store online tramite Eversell. Contenuti social per engagement e brand awareness.",
    },
  ];

  return (
    <section id="esperienze" className="py-28 px-4 sm:px-6 relative">
      <div className="orb w-80 h-80 bg-primary/10 -left-32 top-1/3" />
      <div className="max-w-4xl mx-auto">
        <div ref={titleRef} className="text-center mb-16">
          <span className="text-accent text-sm font-mono tracking-widest uppercase mb-4 block">// Esperienze</span>
          <h2 className="text-4xl sm:text-5xl font-bold">
            Il mio <span className="gradient-text">percorso</span>
          </h2>
        </div>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px timeline-line md:-translate-x-px" />

          {exp.map((e, i) => {
            const isLeft = i % 2 === 0;
            return <TimelineItem key={i} exp={e} isLeft={isLeft} index={i} />;
          })}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ exp, isLeft, index }: { exp: { role: string; company: string; period: string; desc: string }; isLeft: boolean; index: number }) {
  const ref = useReveal<HTMLDivElement>(isLeft ? "reveal-left" : "reveal-right");

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-start mb-12 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Dot */}
      <div className="absolute left-[-6px] md:left-1/2 md:-translate-x-1/2 top-2 w-3 h-3 bg-accent rounded-full shadow-lg shadow-accent/50 z-10" />

      {/* Content */}
      <div className={`pl-8 md:pl-0 md:w-1/2 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
        <span className="inline-block text-xs font-mono text-accent bg-accent/10 px-3 py-1 rounded-full mb-3">
          {exp.period}
        </span>
        <h3 className="text-xl font-semibold text-foreground">{exp.role}</h3>
        <p className="text-primary-light font-medium mb-2">{exp.company}</p>
        <p className="text-muted text-sm leading-relaxed">{exp.desc}</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   FORMAZIONE
   ══════════════════════════════════════════ */
function Formazione() {
  const titleRef = useReveal<HTMLDivElement>();

  const edu = [
    {
      title: "Laurea Magistrale in Marketing, Consumi e Comunicazione",
      sub: "Specializzazione in Digital Marketing Management",
      school: "Università IULM, Milano",
      period: "2024 - Luglio 2026",
      thesis: "Visibilità informativa nei sistemi LLM: un approccio GEO basato sull'AI Visibility Index (AIVX)",
    },
    {
      title: "Laurea Triennale in Comunicazione d'Impresa e Relazioni Pubbliche",
      sub: null,
      school: "Università IULM, Milano",
      period: "2021 - 2024",
      thesis: "Social Media e Personal Branding: due casi a confronto",
    },
    {
      title: "Diploma Liceo Scienze Umane",
      sub: null,
      school: "Istituto Barbara Melzi, Legnano (MI)",
      period: "2016 - 2021",
      thesis: null,
    },
  ];

  return (
    <section id="formazione" className="py-28 px-4 sm:px-6 relative grid-bg">
      <div className="max-w-4xl mx-auto">
        <div ref={titleRef} className="text-center mb-16">
          <span className="text-accent text-sm font-mono tracking-widest uppercase mb-4 block">// Formazione</span>
          <h2 className="text-4xl sm:text-5xl font-bold">
            Il mio <span className="gradient-text">studio</span>
          </h2>
        </div>
        <div className="space-y-6">
          {edu.map((e, i) => (
            <FormazioneCard key={i} edu={e} index={i} />
          ))}
          <CertCard />
        </div>
      </div>
    </section>
  );
}

function FormazioneCard({ edu, index }: { edu: { title: string; sub: string | null; school: string; period: string; thesis: string | null }; index: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="glow-card p-8" style={{ transitionDelay: `${index * 150}ms` }}>
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span className="text-xs font-mono text-accent bg-accent/10 px-3 py-1 rounded-full">
          {edu.period}
        </span>
        <span className="text-sm text-muted">{edu.school}</span>
      </div>
      <h3 className="text-xl font-semibold text-foreground">{edu.title}</h3>
      {edu.sub && <p className="text-primary-light text-sm font-medium mt-1">{edu.sub}</p>}
      {edu.thesis && (
        <p className="text-muted text-sm mt-3 italic border-l-2 border-accent/30 pl-4">
          Tesi: &ldquo;{edu.thesis}&rdquo;
        </p>
      )}
    </div>
  );
}

function CertCard() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="glow-card p-8" style={{ transitionDelay: "450ms" }}>
      <span className="text-xs font-mono text-accent bg-accent/10 px-3 py-1 rounded-full">Certificazione</span>
      <h3 className="text-lg font-semibold text-foreground mt-3">AIDA Database Fundamentals Course</h3>
      <p className="text-muted text-sm">Moody&apos;s</p>
    </div>
  );
}

/* ══════════════════════════════════════════
   PROGETTI
   ══════════════════════════════════════════ */
function Progetti() {
  const titleRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>("stagger");

  const projects = [
    {
      title: "Citation Rate",
      desc: "Tool per monitorare la visibilità dei brand nei sistemi AI. Come le AI citano le aziende e strategie per migliorarne la presenza.",
      tag: "Co-founder",
      accent: true,
    },
    {
      title: "Intrigue App",
      desc: "Implementazione e rinnovo dell'applicazione. PED, CRM e sicurezza dei dati.",
      tag: "Università",
      accent: false,
    },
    {
      title: "Google Merchandising (GA4)",
      desc: "Analisi dati, carrello clienti, strategie di vendita e campagne marketing.",
      tag: "Università",
      accent: false,
    },
    {
      title: "Rocket Espresso Global",
      desc: "Adattamento prodotto a nuove culture, strategie di lancio online e offline.",
      tag: "Università",
      accent: false,
    },
    {
      title: "Sostenibilità Coca Cola",
      desc: "Lancio nuovo prodotto, contenuti grafici, PED, social media strategy.",
      tag: "Università",
      accent: false,
    },
  ];

  return (
    <section id="progetti" className="py-28 px-4 sm:px-6 relative">
      <div className="orb w-72 h-72 bg-accent/10 bottom-0 right-0" />
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className="text-center mb-16">
          <span className="text-accent text-sm font-mono tracking-widest uppercase mb-4 block">// Progetti</span>
          <h2 className="text-4xl sm:text-5xl font-bold">
            Cosa ho <span className="gradient-text">creato</span>
          </h2>
        </div>
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p.title}
              className={`glow-card p-8 ${
                p.accent ? "border-accent/30 bg-accent/5" : ""
              }`}
            >
              <span
                className={`inline-block text-xs font-mono px-3 py-1 rounded-full mb-4 ${
                  p.accent
                    ? "text-accent bg-accent/15"
                    : "text-primary-light bg-primary/10"
                }`}
              >
                {p.tag}
              </span>
              <h3 className="text-lg font-semibold text-foreground mb-3">{p.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   CONTATTI
   ══════════════════════════════════════════ */
function Contatti() {
  const titleRef = useReveal<HTMLDivElement>();
  const formRef = useReveal<HTMLDivElement>("reveal-scale");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const message = data.get("message") as string;
    const subject = encodeURIComponent(`Contatto dal portfolio - ${name}`);
    const body = encodeURIComponent(`Da: ${name} (${email})\n\n${message}`);
    window.location.href = `mailto:tecla.casalone@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    form.reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contatti" className="py-28 px-4 sm:px-6 relative grid-bg">
      <div className="orb w-96 h-96 bg-primary/10 top-0 left-1/4" />
      <div className="max-w-2xl mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-12">
          <span className="text-accent text-sm font-mono tracking-widest uppercase mb-4 block">// Contatti</span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Lavoriamo <span className="gradient-text">insieme</span>
          </h2>
          <p className="text-muted text-lg">
            Hai un progetto in mente? Scrivimi e parliamone.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <a
            href="mailto:tecla.casalone@gmail.com"
            className="flex items-center gap-3 px-5 py-3 glow-card text-sm text-muted hover:text-accent transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            tecla.casalone@gmail.com
          </a>
          <div className="flex items-center gap-3 px-5 py-3 glow-card text-sm text-muted">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Rescaldina (MI)
          </div>
        </div>

        <div ref={formRef}>
          <form onSubmit={handleSubmit} className="glow-card p-8 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Nome</label>
              <input
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 rounded-lg bg-background border border-card-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-foreground placeholder:text-muted/50"
                placeholder="Il tuo nome"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg bg-background border border-card-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-foreground placeholder:text-muted/50"
                placeholder="La tua email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Messaggio</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-3 rounded-lg bg-background border border-card-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none text-foreground placeholder:text-muted/50"
                placeholder="Raccontami del tuo progetto..."
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-primary hover:bg-primary-light text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
            >
              Invia Messaggio &rarr;
            </button>
            {sent && (
              <p className="text-center text-sm text-accent">
                Si aprirà il tuo client email per inviare il messaggio.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="py-10 px-4 border-t border-card-border text-center">
      <p className="text-muted text-sm">
        &copy; {new Date().getFullYear()} <span className="gradient-text font-medium">Tecla Casalone</span>. Tutti i diritti riservati.
      </p>
    </footer>
  );
}

/* ══════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ChiSono />
        <Competenze />
        <Esperienze />
        <Formazione />
        <Progetti />
        <Contatti />
      </main>
      <Footer />
    </>
  );
}
