import { PROJECTS } from "../content.js";
import ProjectCard from "./ProjectCard.jsx";
import ScrollRevealSection from "./ScrollRevealSection.jsx";

export default function Projects() {
  return (
    <ScrollRevealSection id="projects" className="content-section max-w-6xl mx-auto px-5 sm:px-8">
      <p className="eyebrow section-eyebrow">Projects</p>
      <h2 className="section-heading projects-heading">Featured projects</h2>
      <p className="section-intro">
        A few things I've built — and one I'm still building.
      </p>
      <div className="projects-grid">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </ScrollRevealSection>
  );
}
