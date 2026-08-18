import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Mail,
  Sun,
  Moon,
  GraduationCap,
  Target,
  Wrench,
  Code2,
  Server,
  Database,
  GitBranch,
  Home,
  FolderKanban,
  TrendingUp,
  User,
  ArrowRight,
} from "lucide-react";
import Feedback from "./components/Feedback.jsx";
import { NAV_LINKS, SKILL_GROUPS, PROJECTS } from "./content.js";
import GlobalStyles from "./components/GlobalStyles.jsx";
import ProjectCard from "./components/ProjectCard.jsx";
// Content and smaller components moved to separate files:
// - src/content.js
// - src/components/GlobalStyles.jsx
// - src/components/ProjectCard.jsx

const ICON_MAP = {
  Frontend: Code2,
  Backend: Server,
  Database: Database,
  Tools: GitBranch,
};

/* ---------------------------------------------------------------
   GLOBAL STYLES
   This environment renders plain Tailwind utility classes fine for
   layout (flex, grid, spacing, responsive prefixes) but can't compile
   custom/arbitrary values. So all colors, fonts, hover states, and
   animations are defined here as real CSS instead — Tailwind just
   handles the layout skeleton.
---------------------------------------------------------------- */

// Global styles are in src/components/GlobalStyles.jsx

/* ---------------------------------------------------------------
   NAV
   Just one piece of state here: whether the mobile menu is open.
   This is the classic React pattern — useState gives you a value
   and a setter function, and the UI re-renders whenever it changes.
---------------------------------------------------------------- */

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    } catch (e) {}
  }, [theme]);

  return (
    <header className="nav-wrap">
      <div
        className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between"
        style={{ height: "64px" }}
      >
        {/* TODO: swap YourName for your actual name or brand */}
        <a
          href="#home"
          className="font-mono"
          style={{ color: "var(--text)", textDecoration: "none", fontSize: "0.95rem" }}
        >
          {"<"}
          <span style={{ color: "var(--amber)" }}>Cecilio Emil J. Mendez</span>
          {">"}
        </a>

        <nav className="hidden md:flex items-center" style={{ gap: "28px" }}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            className="icon-btn"
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            className="icon-btn md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-panel md:hidden">
          <div className="max-w-6xl mx-auto px-5 flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------------------------------------------------------
   HERO + DASHBOARD WIDGET
   You build dashboards (Utang Management, Ipon Tracker) — so the
   hero's "signature visual" is styled like a small admin panel
   instead of a generic stat block. It also literally answers the
   "maybe also a dashboard" part of the brief.
---------------------------------------------------------------- */

function DashboardWidget() {
  // Illustrative bar heights only — not wired to real data.
  const bars = [30, 45, 38, 60, 52, 74, 90];
  const maxBar = 100;

  return (
    <div className="dash-card">
      <div className="dash-titlebar">
        <div className="dash-dots" aria-hidden="true">
          <span className="dot" style={{ background: "#E5533D" }} />
          <span className="dot" style={{ background: "var(--amber)" }} />
          <span className="dot" style={{ background: "var(--mint)" }} />
        </div>
        <span className="font-mono dash-titletext">overview.dashboard</span>
      </div>

      <div className="dash-body">
        <div className="dash-rail" aria-hidden="true">
          <span className="rail-icon rail-active"><Home size={16} /></span>
          <span className="rail-icon"><FolderKanban size={16} /></span>
          <span className="rail-icon"><TrendingUp size={16} /></span>
          <span className="rail-icon"><User size={16} /></span>
        </div>

        <div className="dash-main">
          <div className="dash-header-row">
            <span className="font-mono dash-label">OVERVIEW</span>
            <span className="font-mono dash-live">
              <span className="pulse-dot" /> live
            </span>
          </div>

          <div className="dash-stats">
            <div className="stat-tile">
              <span className="font-display stat-num">03</span>
              <span className="font-mono stat-label">Shipped</span>
            </div>
            <div className="stat-tile">
              <span className="font-display stat-num" style={{ color: "var(--mint)" }}>01</span>
              <span className="font-mono stat-label">In progress</span>
            </div>
            <div className="stat-tile">
              <span className="font-display stat-num">11</span>
              <span className="font-mono stat-label">Tools</span>
            </div>
          </div>

          <div className="dash-chart">
            <div className="chart-bars">
              {bars.map((h, i) => (
                <span
                  key={i}
                  className="chart-bar"
                  style={{
                    height: `${(h / maxBar) * 100}%`,
                    background: i === bars.length - 1 ? "var(--mint)" : "var(--amber)",
                    opacity: i === bars.length - 1 ? 1 : 0.35 + i * 0.09,
                  }}
                />
              ))}
            </div>
            <span className="font-mono chart-caption">skills, trending up</span>
          </div>

          <div className="dash-status">
            <span className="pulse-dot" />
            <span className="font-mono status-text">Building: Ipon Tracker</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="section max-w-6xl mx-auto px-5 sm:px-8"
      style={{ paddingTop: "72px", paddingBottom: "72px" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="fade-up">
          <p className="eyebrow" style={{ marginBottom: "16px" }}>
            Student developer — full stack in progress
          </p>
          {/* TODO: make this headline your own voice if you want */}
          <h1
            className="font-display"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.4rem)", lineHeight: 1.1, fontWeight: 700, marginBottom: "20px" }}
          >
            I build things that solve real problems.
          </h1>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              maxWidth: "480px",
              marginBottom: "32px",
            }}
          >
            Still a student, still learning — but every project here started because
            something needed fixing, not because a tutorial told me to build it.
          </p>
          <div className="flex flex-wrap" style={{ gap: "14px" }}>
            <a href="#projects" className="btn btn-primary">
              See my work <ArrowRight size={16} />
            </a>
            <a href="#contact" className="btn btn-secondary">
              Let's talk
            </a>
          </div>
        </div>

        <div className="fade-up-delay-1">
          <DashboardWidget />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   ABOUT
---------------------------------------------------------------- */

function About() {
  return (
    <section
      id="about"
      className="section max-w-6xl mx-auto px-5 sm:px-8"
      style={{ paddingTop: "64px", paddingBottom: "64px" }}
    >
      <p className="eyebrow" style={{ marginBottom: "12px" }}>About</p>
      <h2
        className="font-display"
        style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, marginBottom: "20px" }}
      >
        A little about me
      </h2>
      <p
        style={{
          color: "var(--text-muted)",
          fontSize: "1rem",
          lineHeight: 1.8,
          maxWidth: "640px",
          marginBottom: "28px",
        }}
      >
        I'm just a student and programmer, still early in the journey — but with a clear
        goal: to grow into a full-stack developer working in tech. I like building
        software for problems I actually see around me, whether that's tracking who
        owes who money or managing orders for a small business. Small steps, big dreams.
      </p>
      <div className="flex flex-wrap" style={{ gap: "12px" }}>
        <span className="fact-badge"><GraduationCap size={15} /> Student</span>
        <span className="fact-badge"><Target size={15} /> Goal: Full-Stack Developer</span>
        <span className="fact-badge"><Wrench size={15} /> Learning by building</span>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   SKILLS
---------------------------------------------------------------- */

function Skills() {
  return (
    <section
      id="skills"
      className="section max-w-6xl mx-auto px-5 sm:px-8"
      style={{ paddingTop: "64px", paddingBottom: "64px" }}
    >
      <p className="eyebrow" style={{ marginBottom: "12px" }}>Skills</p>
      <h2
        className="font-display"
        style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, marginBottom: "32px" }}
      >
        What I work with
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "18px" }}>
        {SKILL_GROUPS.map((group) => {
          const Icon = ICON_MAP[group.category] || Code2;
          return (
            <div key={group.category} className="skill-card">
              <div className="flex items-center" style={{ gap: "10px", marginBottom: "16px" }}>
                <Icon size={18} color="var(--amber)" />
                <h3 className="font-display" style={{ fontSize: "1rem", fontWeight: 600 }}>
                  {group.category}
                </h3>
              </div>
              <div className="flex flex-wrap" style={{ gap: "8px" }}>
                {group.skills.map((skill) => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   PROJECTS
   ProjectCard is a small reusable component that takes a single
   "project" prop — a good example of props in action.
---------------------------------------------------------------- */

// ProjectCard component moved to src/components/ProjectCard.jsx

function Projects() {
  return (
    <section
      id="projects"
      className="section max-w-6xl mx-auto px-5 sm:px-8"
      style={{ paddingTop: "64px", paddingBottom: "64px" }}
    >
      <p className="eyebrow" style={{ marginBottom: "12px" }}>Projects</p>
      <h2
        className="font-display"
        style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, marginBottom: "8px" }}
      >
        Featured projects
      </h2>
      <p style={{ color: "var(--text-muted)", marginBottom: "32px" }}>
        A few things I've built — and one I'm still building.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "20px" }}>
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   CONTACT
---------------------------------------------------------------- */

function Contact() {
  return (
    <section
      id="contact"
      className="section max-w-6xl mx-auto px-5 sm:px-8"
      style={{ paddingTop: "64px", paddingBottom: "88px" }}
    >
      <div style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto" }}>
        <p className="eyebrow" style={{ marginBottom: "12px" }}>Contact</p>
        <h2
          className="font-display"
          style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, marginBottom: "14px" }}
        >
          Let's build something
        </h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "32px", lineHeight: 1.7 }}>
          Open to internships, junior roles, or just a good conversation about code.
          Reach out — I reply fast.
        </p>

        {/* TODO: replace with your real email */}
        <a href="mailto:you@example.com" className="contact-prompt">
          <span className="prompt-symbol">$</span> contact @ceciliomendez081206@gmail.com
        </a>

        <div className="flex items-center justify-center" style={{ gap: "14px", marginTop: "28px" }}>
          {/* TODO: replace # with your real profile links */}
          <a href="#" className="social-btn" aria-label="GitHub"><GitBranch size={18} /></a>
          <a href="#" className="social-btn" aria-label="LinkedIn"><User size={18} /></a>
          <a href="mailto:you@example.com" className="social-btn" aria-label="Email"><Mail size={18} /></a>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   FOOTER
---------------------------------------------------------------- */

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)" }}>
      <div
        className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between"
        style={{ paddingTop: "24px", paddingBottom: "24px", gap: "8px" }}
      >
        <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
          Cecilio Emil J. Mendez — built with React
        </span>
        <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
          © 2026
        </span>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------
   APP
   This is the piece that gets exported and rendered. Notice it's
   just composing all the smaller components above in order — that's
   the core idea of React: build small pieces, then assemble them.
---------------------------------------------------------------- */

export default function Portfolio() {
  return (
    <div className="portfolio-root" style={{ minHeight: "100vh" }}>
      <GlobalStyles />
      <NavBar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      <Feedback />
    </div>
  );
}