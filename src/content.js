export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const SKILL_GROUPS = [
  {
    category: "Frontend",
    icon: null,
    skills: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    category: "Programming",
    icon: null,
    skills: ["C", "C++", "Python"],
  },
  {
    category: "Tools",
    icon: null,
    skills: ["Git", "GitHub", "VS Code"],
  },
  {
    category: "Database",
    icon: null,
    skills: ["MySQL"],
  },
];

export const SKILL_SHOWCASE = [
  { name: "HTML", type: "html5", accent: "#ef6a2d" },
  { name: "CSS", type: "css3", accent: "#1b7fe8" },
  { name: "TAILWIND", type: "tailwind", accent: "#30d9ff" },
  { name: "JAVASCRIPT", type: "javascript", accent: "#f7d63a" },
  { name: "REACT JS", type: "react", accent: "#5ec6f9" },
  { name: "GITHUB", type: "github", accent: "#f2f4f8" },
  { name: "NODE JS", type: "node", accent: "#8ecf52" },
  { name: "EXPRESS JS", type: "express", accent: "#1d1d1d" },
  { name: "MONGODB", type: "mongodb", accent: "#4caf50" },
  { name: "VS CODE", type: "vscode", accent: "#2f88ff" },
];

export const PROJECTS = [
  {
    title: "SMJ ProFaith Printing Services",
    path: "~/projects/smj-profaith-printing-services",
    status: "in-progress",
    description:
      "A website for SMJ ProfAith Printing Services, built to showcase the business and its printing services.",
    stack: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "E-Commerce Platform",
    path: "~/projects/ecommerce-oop",
    status: "done",
    description:
      "A full online store built around core OOP principles, with MySQL handling products, users, and orders behind the scenes.",
    stack: ["Java", "MySQL", "OOP"],
  },
  {
    title: "Bro Caps",
    path: "~/projects/bro-caps",
    status: "done",
    description:
      "A storefront concept for a cap business — clean product browsing, built from scratch with vanilla HTML, CSS, and JavaScript.",
    stack: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Utang Management",
    path: "~/projects/utang-management",
    status: "done",
    description:
      "An admin dashboard for tracking money lent out — who owes what, and how much has been paid back so far.",
    stack: ["React", "Vite", "JavaScript"],
  },
  {
    title: "Ipon Tracker",
    path: "~/projects/ipon-tracker",
    status: "in-progress",
    description:
      "A personal savings tracker in active development — currently wiring up goal-tracking and history views.",
    stack: ["React", "Vite", "JavaScript"],
  },
];
