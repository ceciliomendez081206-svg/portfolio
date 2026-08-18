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
    skills: ["React", "Python", "HTML", "CSS", "Next.js", "TypeScript"],
  },
  {
    category: "Backend",
    icon: null,
    skills: ["Node.js", "PHP", "Express"],
  },
  {
    category: "Database",
    icon: null,
    skills: ["MySQL"],
  },
  {
    category: "Tools",
    icon: null,
    skills: ["Git"],
  },
];

export const PROJECTS = [
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
