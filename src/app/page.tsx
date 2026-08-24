"use client";

import { useState } from "react";
import { AppleHelloEnglishEffect } from "@/components/ui/apple-hello-effect";
import { ParallaxComponent } from "@/components/ui/parallax-scrolling";

/* ── NAVBAR ── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#about", label: "About" },
    { href: "#work", label: "Esperienza" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Progetti" },
    { href: "#contact", label: "Contatti" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#111]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
        <a href="#" className="font-heading text-sm font-semibold tracking-wide">
          TC
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
            <a key={l.href} href={l.href} className="text-xs text-[#888] hover:text-white transition-colors uppercase tracking-widest">
              {l.label}
            </a>
          ))}
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-[#111]/95 backdrop-blur-md border-b border-white/5 px-6 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-[#888] hover:text-white" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ── HERO con Apple Hello ── */
function Hero() {
  const [helloComplete, setHelloComplete] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-[#111]">
      {/* Hello animation */}
      <div className="mb-12">
        <AppleHelloEnglishEffect
          className="h-16 sm:h-24 md:h-32 text-[#e85d4a]"
          speed={1.2}
          onAnimationComplete={() => setHelloComplete(true)}
        />
      </div>

      {/* Content fades in after hello */}
      <div
        className="text-center max-w-3xl transition-all duration-1000 ease-out"
        style={{
          opacity: helloComplete ? 1 : 0,
          transform: helloComplete ? "translateY(0)" : "translateY(20px)",
        }}
      >
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
          Sono <span className="text-[#e85d4a]">Tecla Casalone</span>
        </h1>
        <p className="text-lg sm:text-xl text-[#999] max-w-xl mx-auto leading-relaxed mb-10">
          Digital marketing specialist. Studio come le AI vedono i brand
          e creo strategie per migliorare la loro visibilità.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="#contact"
            className="px-7 py-3 bg-[#e85d4a] hover:bg-[#d44a38] text-white text-sm font-medium rounded-full transition-colors"
          >
            Contattami
          </a>
          <a
            href="#about"
            className="px-7 py-3 border border-white/15 hover:border-white/30 text-sm font-medium rounded-full transition-colors"
          >
            Scopri di più
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 flex flex-col items-center gap-2 text-[#555] transition-opacity duration-1000"
        style={{ opacity: helloComplete ? 1 : 0 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#555] to-transparent" />
      </div>
    </section>
  );
}

/* ── PARALLAX SECTION ── */
function ParallaxSection() {
  return <ParallaxComponent />;
}

/* ── ABOUT ── */
function About() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-16">
        <div className="md:col-span-2">
          <span className="text-[#e85d4a] text-xs font-medium uppercase tracking-widest font-heading">About</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight mt-3">
            Marketing, ricerca
            <br />e un po&apos; di codice.
          </h2>
        </div>
        <div className="md:col-span-3 space-y-5 text-[#999] leading-relaxed">
          <p>
            Sono una digital marketing specialist con specializzazione in AI Marketing
            e Generative Engine Optimization (GEO). Laureanda magistrale in Marketing,
            Consumi e Comunicazione alla <strong className="text-white">IULM di Milano</strong>,
            sto scrivendo la tesi sulla visibilità informativa nei sistemi LLM.
          </p>
          <p>
            Ho co-fondato <strong className="text-white">Citation Rate</strong>, un tool
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
    <section id="work" className="py-28 px-6 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        <span className="text-[#e85d4a] text-xs font-medium uppercase tracking-widest font-heading">Esperienza</span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-14">
          Dove ho lavorato
        </h2>
        <div className="divide-y divide-white/5">
          {jobs.map((j, i) => (
            <div key={i} className="group py-8 grid md:grid-cols-4 gap-4 first:pt-0 last:pb-0 hover:bg-white/[0.02] -mx-4 px-4 rounded-lg transition-colors">
              <div className="text-sm text-[#666] font-mono">{j.period}</div>
              <div className="md:col-span-3">
                <h3 className="font-heading font-semibold text-white group-hover:text-[#e85d4a] transition-colors">{j.role}</h3>
                <p className="text-[#e85d4a]/70 text-sm mb-2">{j.company}</p>
                <p className="text-[#888] text-sm leading-relaxed">{j.desc}</p>
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
      detail: "IULM Milano — Digital Marketing Management",
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
    <section className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <span className="text-[#e85d4a] text-xs font-medium uppercase tracking-widest font-heading">Formazione</span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-14">
          Il mio percorso
        </h2>
        <div className="space-y-10">
          {edu.map((e, i) => (
            <div key={i} className="grid md:grid-cols-4 gap-4">
              <div className="text-sm text-[#666] font-mono">{e.period}</div>
              <div className="md:col-span-3">
                <h3 className="font-heading font-semibold text-white">{e.title}</h3>
                <p className="text-sm text-[#888]">{e.detail}</p>
                {e.thesis && (
                  <p className="text-sm text-[#666] mt-2 italic border-l-2 border-[#e85d4a]/20 pl-4">
                    Tesi: &ldquo;{e.thesis}&rdquo;
                  </p>
                )}
              </div>
            </div>
          ))}
          <div className="grid md:grid-cols-4 gap-4 pt-6 border-t border-white/5">
            <div className="text-sm text-[#666] font-mono">Cert.</div>
            <div className="md:col-span-3">
              <h3 className="font-heading font-semibold text-white">AIDA Database Fundamentals</h3>
              <p className="text-sm text-[#888]">Moody&apos;s</p>
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
      items: ["Prompt Engineering", "OpenAI / Anthropic / Microsoft", "GEO & AI Visibility", "Content Strategy"],
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
      items: ["Shopify", "Canva", "GoHighLevel", "WordPress", "Eversell"],
    },
  ];

  return (
    <section id="skills" className="py-28 px-6 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        <span className="text-[#e85d4a] text-xs font-medium uppercase tracking-widest font-heading">Skills</span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-14">
          Cosa so fare
        </h2>
        <div className="grid sm:grid-cols-2 gap-x-20 gap-y-12">
          {groups.map((g) => (
            <div key={g.label}>
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white mb-5 pb-3 border-b border-white/10">
                {g.label}
              </h3>
              <ul className="space-y-3">
                {g.items.map((item) => (
                  <li key={item} className="text-[#888] text-sm flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e85d4a] shrink-0" />
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
      desc: "Tool per monitorare la visibilità dei brand nei sistemi AI. Citazioni, CRM, dashboard, metriche proprietarie.",
      featured: true,
    },
    {
      title: "Intrigue App",
      label: "IULM",
      desc: "Rinnovo app, PED, CRM, sicurezza dati.",
      featured: false,
    },
    {
      title: "Google Merchandising (GA4)",
      label: "IULM",
      desc: "Analisi carrello, strategie vendita, campagne data-driven.",
      featured: false,
    },
    {
      title: "Rocket Espresso — Global",
      label: "IULM",
      desc: "Lancio prodotto internazionale, strategie online e offline.",
      featured: false,
    },
    {
      title: "Coca Cola — Sostenibilità",
      label: "IULM",
      desc: "Lancio prodotto, comunicazione multicanale, social strategy.",
      featured: false,
    },
  ];

  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <span className="text-[#e85d4a] text-xs font-medium uppercase tracking-widest font-heading">Progetti</span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-14">
          Cosa ho creato
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p) => (
            <div
              key={p.title}
              className={`group p-6 rounded-xl border transition-all hover:-translate-y-1 ${
                p.featured
                  ? "border-[#e85d4a]/20 bg-[#e85d4a]/[0.03] md:col-span-2 hover:border-[#e85d4a]/40"
                  : "border-white/5 bg-white/[0.02] hover:border-white/15"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-semibold text-white">{p.title}</h3>
                <span className={`text-[10px] font-medium uppercase tracking-widest px-3 py-1 rounded-full ${
                  p.featured ? "text-[#e85d4a] bg-[#e85d4a]/10" : "text-[#666] bg-white/5"
                }`}>
                  {p.label}
                </span>
              </div>
              <p className="text-[#888] text-sm leading-relaxed">{p.desc}</p>
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
    <section id="contact" className="py-28 px-6 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-16">
        <div className="md:col-span-2">
          <span className="text-[#e85d4a] text-xs font-medium uppercase tracking-widest font-heading">Contatti</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-6">
            Parliamone.
          </h2>
          <p className="text-[#888] leading-relaxed mb-8">
            Hai un progetto? Un&apos;idea? O vuoi fare due chiacchiere
            sul futuro del marketing e dell&apos;AI. Scrivimi.
          </p>
          <div className="space-y-4 text-sm text-[#888]">
            <a href="mailto:tecla.casalone@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors">
              <svg className="w-4 h-4 shrink-0 text-[#e85d4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              tecla.casalone@gmail.com
            </a>
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 shrink-0 text-[#e85d4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <label htmlFor="name" className="block text-xs font-heading font-medium uppercase tracking-widest mb-2">Nome</label>
                <input
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-[#111] rounded-lg border border-white/10 text-sm focus:outline-none focus:border-[#e85d4a]/50 transition-colors placeholder:text-[#444]"
                  placeholder="Il tuo nome"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-heading font-medium uppercase tracking-widest mb-2">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-[#111] rounded-lg border border-white/10 text-sm focus:outline-none focus:border-[#e85d4a]/50 transition-colors placeholder:text-[#444]"
                  placeholder="La tua email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-xs font-heading font-medium uppercase tracking-widest mb-2">Messaggio</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-3 bg-[#111] rounded-lg border border-white/10 text-sm focus:outline-none focus:border-[#e85d4a]/50 transition-colors resize-none placeholder:text-[#444]"
                placeholder="Raccontami del tuo progetto..."
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-[#e85d4a] hover:bg-[#d44a38] text-white text-sm font-medium rounded-full transition-colors"
            >
              Invia messaggio
            </button>
            {sent && <p className="text-sm text-[#e85d4a]">Si aprirà il tuo client email.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[#555]">&copy; {new Date().getFullYear()} Tecla Casalone</p>
        <div className="flex gap-6">
          <a href="mailto:tecla.casalone@gmail.com" className="text-xs text-[#555] hover:text-white transition-colors">Email</a>
          <a href="#" className="text-xs text-[#555] hover:text-white transition-colors">LinkedIn</a>
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
        <ParallaxSection />
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
