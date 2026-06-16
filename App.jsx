import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  CheckCircle2,
  ShieldCheck,
  Sprout,
  Trees,
  Flame,
  Droplets,
  Monitor,
  MessageSquare,
  HeartHandshake,
  FileText,
  Activity,
  Phone,
  MapPin,
  Mail,
  ArrowRight,
  Check,
  CheckCircle,
} from "lucide-react";

/* Embedded Emertech Innovations logo (data URI — ships inside the component) */
const LOGO_SRC =
  "data:image/jpeg;base64,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";

/* Smooth-scroll to a section id, accounting for the sticky navbar */
function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ------------------------------------------------------------------ */
/*  Scroll-reveal hook + wrapper                                       */
/* ------------------------------------------------------------------ */
function useInView(options = { threshold: 0.15 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(entry.target);
      }
    }, options);
    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, inView];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Small shared UI bits                                               */
/* ------------------------------------------------------------------ */
const GRADIENT = "bg-[linear-gradient(135deg,#6f4698_0%,#a83f96_100%)]";

function Pill({ children, dot = false, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-violet-700 ring-1 ring-inset ring-violet-100 ${className}`}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[linear-gradient(135deg,#6f4698_0%,#a83f96_100%)] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[linear-gradient(135deg,#6f4698_0%,#a83f96_100%)]" />
        </span>
      )}
      {children}
    </span>
  );
}

function Eyebrow({ children }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */
function Navbar() {
  const [open, setOpen] = useState(false);
  // Each link maps to the id of a real section on the page
  const links = [
    { label: "Overview", id: "overview" },
    { label: "Sectors", id: "sectors" },
    { label: "Platform", id: "platform" },
    { label: "Why Emertech", id: "why-emertech" },
  ];

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        {/* Logo + wordmark (single line, both words black) */}
        <a href="#overview" onClick={go("overview")} className="flex items-center gap-2.5">
          <img
            src={LOGO_SRC}
            alt="Emertech Innovations logo"
            className="h-9 w-9 rounded-lg object-contain"
          />
          <span className="whitespace-nowrap text-[15px] font-bold text-slate-900">
            Emertech Innovations
          </span>
        </a>

        {/* Center links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={go(l.id)}
              className="cursor-pointer text-sm font-medium text-slate-500 transition-colors hover:text-violet-700"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            onClick={go("contact")}
            className={`hidden cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-200 transition-all hover:shadow-lg hover:shadow-violet-200 hover:brightness-105 sm:inline-block ${GRADIENT}`}
          >
            Get in touch
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t border-slate-100 bg-white px-5 py-3 md:hidden">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={go(l.id)}
              className="block cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-violet-50 hover:text-violet-700"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={go("contact")}
            className={`mt-2 block cursor-pointer rounded-full px-5 py-2.5 text-center text-sm font-semibold text-white ${GRADIENT}`}
          >
            Get in touch
          </a>
        </div>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact form (right column of hero)                                */
/* ------------------------------------------------------------------ */
function ContactForm() {
  const [data, setData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [robot, setRobot] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));

  const handleSubmit = () => {
    if (!data.name || !data.company || !data.email) {
      setError("Please fill in your name, company and work email.");
      return;
    }
    if (!robot) {
      setError("Please confirm you're not a robot.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-violet-400 focus:ring-2 focus:ring-violet-100";

  return (
    <div
      id="contact"
      className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/60 ring-1 ring-slate-100"
    >
      {/* Purple gradient header */}
      <div className={`px-7 py-6 ${GRADIENT}`}>
        <h3 className="text-xl font-bold text-white">Get in touch with our team</h3>
        <p className="mt-1 text-sm text-violet-100">
          See how Emertech can power your MRV reporting.
        </p>
      </div>

      {/* White body */}
      <div className="space-y-4 p-7">
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-100">
              <CheckCircle className="h-8 w-8 text-violet-600" />
            </span>
            <h4 className="mt-4 text-lg font-bold text-slate-900">
              Thanks, {data.name.split(" ")[0] || "there"}!
            </h4>
            <p className="mt-1 max-w-xs text-sm text-slate-500">
              Your request is in. A compliance specialist will reach out within one
              business day.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input className={inputClass} placeholder="Full name" value={data.name} onChange={set("name")} />
              <input className={inputClass} placeholder="Company" value={data.company} onChange={set("company")} />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input className={inputClass} type="email" placeholder="Work email" value={data.email} onChange={set("email")} />
              <input className={inputClass} placeholder="Phone (optional)" value={data.phone} onChange={set("phone")} />
            </div>
            <textarea
              className={`${inputClass} min-h-[110px] resize-none`}
              placeholder="Tell us about your dMRV needs"
              value={data.message}
              onChange={set("message")}
            />

            {/* reCAPTCHA mockup */}
            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <label className="flex cursor-pointer items-center gap-3 select-none">
                <button
                  onClick={() => setRobot((r) => !r)}
                  className={`flex h-6 w-6 items-center justify-center rounded border-2 transition-all ${
                    robot ? "border-[#6f4698] bg-[linear-gradient(135deg,#6f4698_0%,#a83f96_100%)]" : "border-slate-300 bg-white"
                  }`}
                  aria-label="I'm not a robot"
                >
                  {robot && <Check className="h-4 w-4 text-white" strokeWidth={3} />}
                </button>
                <span className="text-sm text-slate-600">I'm not a robot</span>
              </label>
              <div className="text-right leading-none">
                <div className="text-[10px] font-bold text-slate-400">reCAPTCHA</div>
                <div className="text-[8px] text-slate-300">Privacy · Terms</div>
              </div>
            </div>

            {error && <p className="text-xs font-medium text-rose-500">{error}</p>}

            <button
              onClick={handleSubmit}
              className={`w-full rounded-xl py-3.5 text-sm font-semibold text-white shadow-md shadow-violet-200 transition-all hover:shadow-lg hover:brightness-105 ${GRADIENT}`}
            >
              Request a dMRV demo
            </button>
            <p className="text-center text-xs text-slate-400">
              By submitting, you agree to be contacted regarding your inquiry.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
function Hero() {
  const checks = [
    "Audit-ready MRV reports, out of the box",
    "Satellite & IoT-verified measurements",
    "Built for CSR & NGO transparency",
    "End-to-end project traceability",
  ];

  return (
    <section
      id="overview"
      className="relative scroll-mt-20 overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(168,85,247,0.06) 1px, transparent 1px)",
        backgroundSize: "26px 26px",
      }}
    >
      {/* soft glow accents */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-violet-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-40 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-14 md:grid-cols-2 md:gap-12 lg:gap-16 lg:px-8 lg:py-24">
        {/* Left half — headline, summary, bullets */}
        <div>
          <Pill dot>dMRV Platform — Live</Pill>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Climate impact,
            <br />
            <span className="bg-[linear-gradient(135deg,#6f4698_0%,#a83f96_100%)] bg-clip-text text-transparent">
              measured &amp; verified
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">
            Emertech gives CSR teams, NGOs, and project owners a single platform to
            measure, report, and verify carbon outcomes — with transparent,
            audit-ready data across every project and sector.
          </p>

          <ul className="mt-8 space-y-3.5">
            {checks.map((c) => (
              <li key={c} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-violet-600" />
                <span className="text-sm font-medium text-slate-700">{c}</span>
              </li>
            ))}
          </ul>

          {/* small callout */}
          <div className="mt-9 inline-flex items-center gap-3 rounded-2xl border border-violet-100 bg-violet-50/60 px-5 py-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
              <Activity className="h-5 w-5 text-violet-600" />
            </span>
            <div className="leading-tight">
              <p className="text-[10px] font-bold uppercase tracking-wider text-violet-600">
                Verification cycle
              </p>
              <p className="text-sm font-semibold text-slate-700">
                Real-time monitoring — every project, every credit
              </p>
            </div>
          </div>
        </div>

        {/* Right half — form */}
        <ContactForm />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Sector grid                                                        */
/* ------------------------------------------------------------------ */
const SECTORS = [
  {
    icon: Sprout,
    tag: "SECTOR",
    title: "Agriculture",
    desc: "Track soil carbon, regenerative practices, and emission reductions across managed farmland.",
    href: "https://dmrv-agri-main-l6jo.vercel.app/",
  },
  {
    icon: Trees,
    tag: "SECTOR",
    title: "Agroforestry",
    desc: "Monitor tree growth, biomass, and sequestration in mixed land-use and forestry systems.",
    href : "https://dmrv-agro.vercel.app/"
  },
  {
    icon: Flame,
    tag: "SECTOR",
    title: "Biochar",
    desc: "Quantify durable carbon removal from pyrolysis and certify long-term biochar storage.",
    href: "https://dmrv-biochar-2.vercel.app/",
  },
  {
    icon: Droplets,
    tag: "SECTOR",
    title: "Biofuel",
    desc: "Measure lifecycle emissions and feedstock sustainability across the biofuel value chain.",
    href: "https://d-mrv-bio-fuel-iv7u.vercel.app/",
  },
];

function SectorGrid() {
  return (
    <section id="sectors" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20 lg:px-8 lg:py-28">
      <Reveal className="text-center">
        <Eyebrow>Coverage by sector</Eyebrow>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          MRV built for every climate project type
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-slate-500">
          One verification engine, tailored methodologies. Select a sector to explore
          its measurement and reporting workflow.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SECTORS.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.title} delay={i * 90}>
              <a
                href={s.href}
                target={s.href !== "#" ? "_blank" : undefined}
                rel={s.href !== "#" ? "noopener noreferrer" : undefined}
                className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/60"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#6f4698_0%,#a83f96_100%)] transition-colors">
                    <Icon className="h-6 w-6 text-white" strokeWidth={2} />
                  </span>
                  <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-bold tracking-wider text-slate-400">
                    {s.tag}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                  {s.desc}
                </p>
                <div className="mt-5 flex justify-end">
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 opacity-0 transition-all duration-300 group-hover:gap-2.5 group-hover:opacity-100">
                    Explore <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </a>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Why Emertech                                                       */
/* ------------------------------------------------------------------ */
const PILLARS = [
  {
    icon: Monitor,
    title: "Comprehensive MRV management",
    desc: "End-to-end project tracking keeps every stakeholder aligned, with progress visibility and risk flags across your verification pipeline.",
  },
  {
    icon: MessageSquare,
    title: "Guided onboarding support",
    desc: "Kickoff calls set clear expectations and tailored sessions address your team's specific data and methodology needs.",
  },
  {
    icon: HeartHandshake,
    title: "Dedicated MRV expertise",
    desc: "Direct assistance throughout the process. Our specialists stay current with evolving carbon standards and reporting frameworks.",
  },
];

const FEATURES = [
  ["Standards-aligned reporting", "Built for leading carbon registries and updated as methodologies evolve."],
  ["QR & API-based access", "Each project links to its digital MRV record via secure, shareable access."],
  ["Automated carbon calculations", "Sequestration and emissions computed automatically from your verified inputs."],
  ["Real-time monitoring", "Live dashboards for every project and credit in the field."],
  ["IoT & satellite integration", "Plug-and-play connectors for field sensors and remote-sensing data."],
  ["Audit-ready trails", "Tamper-evident records that stand up to third-party verification."],
];

function WhyEmertech() {
  return (
    <section id="why-emertech" className="scroll-mt-20 bg-slate-50/70 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="text-center">
          <Eyebrow>Why Emertech</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            A team that makes your daily operations easier
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-500">
            We provide expert guidance, tailored support, and proactive management to
            ensure a smooth rollout and long-term success of your MRV program.
          </p>
        </Reveal>

        {/* 3 pillars */}
        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 100}>
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#6f4698_0%,#a83f96_100%)]">
                    <Icon className="h-6 w-6 text-white" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{p.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* placeholder feature grid */}
        <Reveal delay={150}>
          <div
            id="platform"
            className="mt-16 grid scroll-mt-24 grid-cols-1 gap-x-10 gap-y-7 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm sm:grid-cols-2 lg:grid-cols-3 lg:p-10"
          >
            {FEATURES.map(([title, body]) => (
              <div key={title} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-violet-500" />
                <div>
                  <p className="text-sm font-bold text-slate-900">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */
function Footer() {
  const ecoLinks = [
    { icon: FileText, title: "What is dMRV?", sub: "Read the introductory guide" },
    { icon: Activity, title: "Strategic Implications for 2027", sub: "Comprehensive guide for project owners" },
  ];
  const contacts = [
    { icon: Phone, text: "+91 22 4000 1200" },
    { icon: MapPin, text: "Emertech Innovations, Bandra Kurla Complex, Mumbai 400051, India" },
    { icon: Mail, text: "support@emertech.io" },
  ];

  return (
    <footer style={{ backgroundColor: "#090014" }} className="text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left */}
          <div>
            <h3 className="text-2xl font-bold">Explore our broader ecosystem</h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-violet-200/70">
              Emertech builds comprehensive measurement, reporting, and verification
              solutions. Discover how our technology powers transparent climate action
              beyond dMRV.
            </p>

            <a
              href="#"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white/60 hover:bg-white/5"
            >
              Visit Emertech.io <ArrowRight className="h-4 w-4" />
            </a>

            {/* Contact details */}
            <div className="mt-9 space-y-3.5">
              {contacts.map((c, i) => {
                const Icon = c.icon;
                return (
                  <div key={i} className="flex items-start gap-3 text-sm text-violet-200/80">
                    <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-violet-400" />
                    <span>{c.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — ecosystem links */}
          <div>
            <h3 className="text-2xl font-bold">Learn more on this</h3>
            <div className="mt-6 space-y-4">
              {ecoLinks.map((l) => {
                const Icon = l.icon;
                return (
                  <a
                    key={l.title}
                    href="#"
                    className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:border-white/25 hover:bg-white/10"
                    style={{ backgroundColor: "rgba(255,255,255,0.035)" }}
                  >
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <Icon className="h-5 w-5 text-violet-200" />
                    </span>
                    <div>
                      <p className="font-semibold text-white">{l.title}</p>
                      <p className="text-sm text-violet-200/60">{l.sub}</p>
                    </div>
                    <ArrowRight className="ml-auto h-4 w-4 text-violet-300 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-sm text-violet-200/50 sm:flex-row sm:items-center">
          <p>© 2026 Emertech. All rights reserved.</p>
          <p>Digital Measurement, Reporting &amp; Verification platform.</p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function App() {
  return (
    <div
      className="min-h-screen bg-white antialiased"
      style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');`}</style>
      <Navbar />
      <main>
        <Hero />
        <SectorGrid />
        <WhyEmertech />
      </main>
      <Footer />
    </div>
  );
}
