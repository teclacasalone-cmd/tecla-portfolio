"use client";

import { useState } from "react";

/* ── NAVBAR ── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#about", label: "About" },
    { href: "#work", label: "Esperienza" },
    { href: "#skills", label: "Competenze" },
    { href: "#projects", label: "Progetti" },
    { href: "#contact", label: "Contatti" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14 border-b border-border">
        <a href="#" className="text-sm font-semibold tracking-wide text-foreground">
          Tecla Casalone
        </a>
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
            <a key={l.href} href={l.href} className="text-xs text-muted hover:text-foreground transition-colors uppercase tracking-wider">
              {l.label}
            </a>
          ))}
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-background border-b border-border px-6 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted hover:text-foreground" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ── HERO ── */
function Hero() {
  return (
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm text-accent font-medium mb-6 tracking-wide">Digital Marketing & AI</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.1] tracking-tight mb-8 max-w-3xl">
          Ciao, sono Tecla.
          <br />
          <span className="text-muted">Studio come le AI vedono i brand.</span>
        </h1>
        <p className="text-lg text-muted max-w-xl leading-relaxed mb-10">
          Digital marketing specialist, co-founder di Citation Rate.
          Aiuto le aziende a capire e migliorare la loro visibilità
          nei sistemi di intelligenza artificiale.
        </p>
        <div className="flex gap-4">
          <a href="#contact" className="px-6 py-3 bg-foreground text-background text-sm font-medium rounded-full hover:bg-warm transition-colors">
            Scrivimi
          </a>
          <a href="#about" className="px-6 py-3 text-sm font-medium text-foreground border border-border rounded-full hover:bg-soft transition-colors">
            Chi sono
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── ABOUT ── */
function About() {
  return (
    <section id="about" className="py-24 px-6 bg-soft">
      <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <p className="text-xs text-accent font-medium uppercase tracking-wider mb-3">Chi sono</p>
          <h2 className="text-3xl font-semibold tracking-tight">
            Marketing, ricerca e un po&apos; di codice.
          </h2>
        </div>
        <div className="md:col-span-3 space-y-5 text-muted leading-relaxed">
          <p>
            Sono una digital marketing specialist con specializzazione in AI Marketing
            e Generative Engine Optimization (GEO). Laureanda magistrale in Marketing,
            Consumi e Comunicazione alla <strong className="text-foreground">IULM di Milano</strong>,
            sto scrivendo la tesi sulla visibilità informativa nei sistemi LLM.
          </p>
          <p>
            Ho co-fondato <strong className="text-foreground">Citation Rate</strong>, un tool
            che monitora come le intelligenze artificiali citano i brand. Lo sviluppo, gestisco
            il CRM, analizzo i modelli di linguaggio e ricerco nuovi parametri di monitoraggio.
          </p>
          <p>
            Fuori dal lavoro faccio CrossFit (gare in team e coaching per adolescenti),
            vado in moto e faccio volontariato con AVIS, ADMO e Croce Rossa.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── EXPERIENCE ── */
function Experience() {
  const jobs = [
    {
      period: "Attuale",
      role: "Researcher & Developer, Co-founder",
      company: "Citation Rate",
      desc: "Sviluppo software, CRM, analisi modelli AI, ricerca parametri di monitoraggio.",
    },
    {
      period: "Mar — Giu 2025",
      role: "Social Media Manager",
      company: "Studio Dentistico Minasi, Roma",
      desc: "PED social e blog, grafiche, sponsorizzate, eventi, articoli WordPress.",
    },
    {
      period: "Giu — Ago 2024",
      role: "Marketing Intern",
      company: "Loft 73, Legnano",
      desc: "E-commerce Eversell, contenuti social, engagement e brand awareness.",
    },
  ];

  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs text-accent font-medium uppercase tracking-wider mb-3">Esperienza</p>
        <h2 className="text-3xl font-semibold tracking-tight mb-12">Dove ho lavorato</h2>
        <div className="divide-y divide-border">
          {jobs.map((j, i) => (
            <div key={i} className="py-8 grid md:grid-cols-4 gap-4 first:pt-0 last:pb-0">
              <div className="text-sm text-muted font-mono">{j.period}</div>
              <div className="md:col-span-3">
                <h3 className="font-semibold text-foreground">{j.role}</h3>
                <p className="text-accent text-sm mb-2">{j.company}</p>
                <p className="text-muted text-sm leading-relaxed">{j.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── EDUCATION ── */
function Education() {
  const edu = [
    {
      period: "2024 — 2026",
      title: "Laurea Magistrale in Marketing, Consumi e Comunicazione",
      detail: "IULM Milano — Specializzazione Digital Marketing Management",
      thesis: "Visibilità informativa nei sistemi LLM: un approccio GEO basato sull'AI Visibility Index (AIVX)",
    },
    {
      period: "2021 — 2024",
      title: "Laurea Triennale in Comunicazione d'Impresa e Relazioni Pubbliche",
      detail: "IULM Milano",
      thesis: "Social Media e Personal Branding: due casi a confronto",
    },
    {
      period: "2016 — 2021",
      title: "Diploma Liceo Scienze Umane",
      detail: "Istituto Barbara Melzi, Legnano",
      thesis: null,
    },
  ];

  return (
    <section className="py-24 px-6 bg-soft">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs text-accent font-medium uppercase tracking-wider mb-3">Formazione</p>
        <h2 className="text-3xl font-semibold tracking-tight mb-12">Il mio percorso</h2>
        <div className="space-y-8">
          {edu.map((e, i) => (
            <div key={i} className="grid md:grid-cols-4 gap-4">
              <div className="text-sm text-muted font-mono">{e.period}</div>
              <div className="md:col-span-3">
                <h3 className="font-semibold text-foreground">{e.title}</h3>
                <p className="text-sm text-muted">{e.detail}</p>
                {e.thesis && (
                  <p className="text-sm text-muted mt-2 italic">
                    Tesi: &ldquo;{e.thesis}&rdquo;
                  </p>
                )}
              </div>
            </div>
          ))}
          <div className="grid md:grid-cols-4 gap-4 pt-4 border-t border-border">
            <div className="text-sm text-muted font-mono">Cert.</div>
            <div className="md:col-span-3">
              <h3 className="font-semibold text-foreground">AIDA Database Fundamentals</h3>
              <p className="text-sm text-muted">Moody&apos;s</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── SKILLS ── */
function Skills() {
  const groups = [
    {
      label: "AI Marketing",
      items: ["Prompt Engineering", "OpenAI / Anthropic / Microsoft", "GEO & AI Visibility", "Content Strategy AI-driven"],
    },
    {
      label: "Advertising",
      items: ["Google Ads", "Meta Ads", "LinkedIn Ads", "Funnel TOFU / MOFU / BOFU"],
    },
    {
      label: "Analytics & SEO",
      items: ["Google Analytics 4", "Search Console", "UX/UI Optimization", "Keyword Research"],
    },
    {
      label: "Tools",
      items: ["Shopify", "Canva", "GoHighLevel CRM", "Eversell", "WordPress", "AIDA Moody's"],
    },
  ];

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs text-accent font-medium uppercase tracking-wider mb-3">Competenze</p>
        <h2 className="text-3xl font-semibold tracking-tight mb-12">Cosa so fare</h2>
        <div className="grid sm:grid-cols-2 gap-x-16 gap-y-10">
          {groups.map((g) => (
            <div key={g.label}>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 pb-2 border-b border-border">
                {g.label}
              </h3>
              <ul className="space-y-2">
                {g.items.map((item) => (
                  <li key={item} className="text-muted text-sm flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PROJECTS ── */
function Projects() {
  const projects = [
    {
      title: "Citation Rate",
      label: "Co-founder",
      desc: "Tool per monitorare la visibilità dei brand nei sistemi AI. Analisi delle citazioni, CRM, dashboard e metriche proprietarie.",
    },
    {
      title: "Intrigue App",
      label: "IULM",
      desc: "Rinnovo dell'applicazione: PED, implementazione CRM, sicurezza dei dati.",
    },
    {
      title: "Google Merchandising (GA4)",
      label: "IULM",
      desc: "Analisi carrello clienti, strategie di vendita e campagne marketing data-driven.",
    },
    {
      title: "Rocket Espresso — Globalizzazione",
      label: "IULM",
      desc: "Adattamento prodotto a nuove culture, strategie di lancio online e offline.",
    },
    {
      title: "Coca Cola — Sostenibilità",
      label: "IULM",
      desc: "Lancio nuovo prodotto, comunicazione multicanale, contenuti grafici e social strategy.",
    },
  ];

  return (
    <section id="projects" className="py-24 px-6 bg-soft">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs text-accent font-medium uppercase tracking-wider mb-3">Progetti</p>
        <h2 className="text-3xl font-semibold tracking-tight mb-12">Cosa ho fatto</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <div
              key={p.title}
              className="p-6 bg-background rounded-lg border border-border hover:border-accent/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">{p.title}</h3>
                <span className="text-[11px] text-accent font-medium uppercase tracking-wider bg-accent-soft px-2.5 py-1 rounded-full">
                  {p.label}
                </span>
              </div>
              <p className="text-muted text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CONTACT ── */
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
      <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <p className="text-xs text-accent font-medium uppercase tracking-wider mb-3">Contatti</p>
          <h2 className="text-3xl font-semibold tracking-tight mb-4">Parliamone.</h2>
          <p className="text-muted leading-relaxed mb-8">
            Hai un progetto? Un&apos;idea? Oppure vuoi solo fare due chiacchiere sul futuro del marketing. Scrivimi.
          </p>
          <div className="space-y-3 text-sm text-muted">
            <a href="mailto:tecla.casalone@gmail.com" className="flex items-center gap-3 hover:text-foreground transition-colors">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              tecla.casalone@gmail.com
            </a>
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Rescaldina (MI)
            </div>
          </div>
        </div>
        <div className="md:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-foreground uppercase tracking-wider mb-2">Nome</label>
                <input
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-soft rounded-lg border border-border text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-muted/50"
                  placeholder="Il tuo nome"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-foreground uppercase tracking-wider mb-2">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-soft rounded-lg border border-border text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-muted/50"
                  placeholder="La tua email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-xs font-medium text-foreground uppercase tracking-wider mb-2">Messaggio</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-3 bg-soft rounded-lg border border-border text-sm focus:outline-none focus:border-accent transition-colors resize-none placeholder:text-muted/50"
                placeholder="Raccontami..."
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-foreground text-background text-sm font-medium rounded-full hover:bg-warm transition-colors"
            >
              Invia messaggio
            </button>
            {sent && (
              <p className="text-sm text-accent">Si aprirà il tuo client email.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted">
          &copy; {new Date().getFullYear()} Tecla Casalone
        </p>
        <div className="flex gap-6">
          <a href="mailto:tecla.casalone@gmail.com" className="text-xs text-muted hover:text-foreground transition-colors">
            Email
          </a>
          <a href="#" className="text-xs text-muted hover:text-foreground transition-colors">
            LinkedIn
          </a>
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
        <About />
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
