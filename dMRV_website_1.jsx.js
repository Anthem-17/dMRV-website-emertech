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
  Leaf,
  Check,
  CheckCircle,
} from "lucide-react";

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
const GRADIENT = "bg-gradient-to-r from-violet-600 to-fuchsia-600";

function Pill({ children, dot = false, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-violet-700 ring-1 ring-inset ring-violet-100 ${className}`}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-fuchsia-600" />
        </span>
      )}
      {children}
    </span>
  );
}

function Eyebrow({ children }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.18em] text-fuchsia-600">
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */
function Navbar() {
  const [open, setOpen] = useState(false);
  const links = ["Overview", "Sectors", "Platform", "Why Emertech"];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${GRADIENT} shadow-sm shadow-violet-200`}>
            <Leaf className="h-5 w-5 text-white" strokeWidth={2.4} />
          </span>
          <span className="text-[15px] font-bold leading-tight text-slate-900">
            Emertech
            <span className="block text-[11px] font-medium text-slate-400">
              Innovations
            </span>
          </span>
        </a>

        {/* Center links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l}
              href="#"
              className="text-sm font-medium text-slate-500 transition-colors hover:text-violet-700"
            >
              {l}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className={`hidden rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-200 transition-all hover:shadow-lg hover:shadow-fuchsia-200 hover:brightness-105 sm:inline-block ${GRADIENT}`}
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
              key={l}
              href="#"
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-violet-50 hover:text-violet-700"
            >
              {l}
            </a>
          ))}
          <a
            href="#contact"
            className={`mt-2 block rounded-full px-5 py-2.5 text-center text-sm font-semibold text-white ${GRADIENT}`}
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
                    robot ? "border-violet-600 bg-violet-600" : "border-slate-300 bg-white"
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
      className="relative overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(168,85,247,0.06) 1px, transparent 1px)",
        backgroundSize: "26px 26px",
      }}
    >
      {/* soft glow accents */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-violet-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-40 h-72 w-72 rounded-full bg-fuchsia-200/30 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        {/* Left column */}
        <div>
          <Pill dot>dMRV Platform — Live</Pill>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Climate impact,
            <br />
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
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
              <Activity className="h-5 w-5 text-fuchsia-600" />
            </span>
            <div className="leading-tight">
              <p className="text-[10px] font-bold uppercase tracking-wider text-fuchsia-600">
                Verification cycle
              </p>
              <p className="text-sm font-semibold text-slate-700">
                Real-time monitoring — every project, every credit
              </p>
            </div>
          </div>
        </div>

        {/* Right column — form */}
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
  },
  {
    icon: Trees,
    tag: "SECTOR",
    title: "Agroforestry",
    desc: "Monitor tree growth, biomass, and sequestration in mixed land-use and forestry systems.",
  },
  {
    icon: Flame,
    tag: "SECTOR",
    title: "Biochar",
    desc: "Quantify durable carbon removal from pyrolysis and certify long-term biochar storage.",
  },
  {
    icon: Droplets,
    tag: "SECTOR",
    title: "Biofuel",
    desc: "Measure lifecycle emissions and feedstock sustainability across the biofuel value chain.",
  },
];

function SectorGrid() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
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
                href="#"
                className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/60"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-50 to-fuchsia-50 transition-colors group-hover:from-violet-100 group-hover:to-fuchsia-100">
                    <Icon className="h-6 w-6 text-violet-600" strokeWidth={2} />
                  </span>
                  <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-bold tracking-wider text-slate-400">
                    {s.tag}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                  {s.desc}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 opacity-0 transition-all duration-300 group-hover:gap-2.5 group-hover:opacity-100">
                  Explore <ArrowRight className="h-4 w-4" />
                </span>
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
    <section className="bg-slate-50/70 py-20 lg:py-28">
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
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-fuchsia-100">
                    <Icon className="h-6 w-6 text-violet-600" />
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
          <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-7 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm sm:grid-cols-2 lg:grid-cols-3 lg:p-10">
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
    <footer style={{ backgroundColor: "#1d1339" }} className="text-white">
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
                    <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-fuchsia-400" />
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