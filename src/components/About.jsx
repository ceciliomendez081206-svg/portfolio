import { GraduationCap, Target, Wrench } from "lucide-react";
import ScrollRevealSection from "./ScrollRevealSection.jsx";

export default function About() {
  return (
    <ScrollRevealSection id="about" className="content-section max-w-6xl mx-auto px-5 sm:px-8">
      <p className="eyebrow section-eyebrow">About</p>
      <h2 className="section-heading">A little about me</h2>
      <p className="about-description">
        I'm a student and aspiring programmer, still early in my journey but driven by a clear goal: to become a full-stack developer in the tech industry.
I enjoy building software that solves real-world problems, whether it's tracking shared expenses, managing orders for small businesses, or creating tools that make everyday tasks easier. For me, programming isn't just about writing code — it's about turning ideas into practical solutions.
I'm continuously learning, experimenting with new technologies, and improving my skills one project at a time. I know there's still a lot to learn, but I'm excited about the process, the challenges, and the opportunities to build something meaningful.
Small steps, big dreams — and a lot of code along the way.
      </p>
      <div className="about-facts">
        <span className="fact-badge"><GraduationCap size={15} /> Student</span>
        <span className="fact-badge"><Target size={15} /> Goal: Full-Stack Developer</span>
        <span className="fact-badge"><Wrench size={15} /> Learning by building</span>
      </div>
    </ScrollRevealSection>
  );
}
