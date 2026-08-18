export default function ProjectCard({ project }) {
  const isDone = project.status === "done";
  return (
    <div className="project-card">
      <div className="flex items-center justify-between">
        <span className="project-path">{project.path}</span>
        <span className={`status-pill ${isDone ? "" : "in-progress"}`}>
          <span className="status-dot" />
          {isDone ? "Shipped" : "In progress"}
        </span>
      </div>
      <h3 className="font-display" style={{ fontSize: "1.15rem", fontWeight: 600 }}>
        {project.title}
      </h3>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.65 }}>
        {project.description}
      </p>
      <div className="flex flex-wrap" style={{ gap: "8px", marginTop: "auto" }}>
        {project.stack.map((tech) => (
          <span key={tech} className="tech-pill">{tech}</span>
        ))}
      </div>
    </div>
  );
}
