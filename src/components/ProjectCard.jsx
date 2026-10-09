export default function ProjectCard({ project }) {
  const isDone = project.status === "done";
  return (
    <div className="project-card">
      <div className="project-card-header">
        <span className="project-path">{project.path}</span>
        <span className={`status-pill ${isDone ? "" : "in-progress"}`}>
          <span className="status-dot" />
          {isDone ? "Shipped" : "In progress"}
        </span>
      </div>
      <h3 className="font-display project-title">
        {project.title}
      </h3>
      <p className="project-description">
        {project.description}
      </p>
      <div className="project-stack">
        {project.stack.map((tech) => (
          <span key={tech} className="tech-pill">{tech}</span>
        ))}
      </div>
    </div>
  );
}
