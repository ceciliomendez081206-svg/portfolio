import css3Logo from "../assets/skills/css3.svg";
import expressLogo from "../assets/skills/express.svg";
import githubLogo from "../assets/skills/github.svg";
import html5Logo from "../assets/skills/html5.svg";
import javascriptLogo from "../assets/skills/javascript.svg";
import mongodbLogo from "../assets/skills/mongodb.svg";
import nodejsLogo from "../assets/skills/nodejs.svg";
import reactLogo from "../assets/skills/react.svg";
import tailwindcssLogo from "../assets/skills/tailwindcss.svg";
import vscodeLogo from "../assets/skills/vscode.svg";
import { SKILL_SHOWCASE } from "../content.js";
import ScrollRevealSection from "./ScrollRevealSection.jsx";

const SKILL_LOGOS = {
  html5: html5Logo,
  css3: css3Logo,
  tailwind: tailwindcssLogo,
  javascript: javascriptLogo,
  react: reactLogo,
  github: githubLogo,
  node: nodejsLogo,
  express: expressLogo,
  mongodb: mongodbLogo,
  vscode: vscodeLogo,
};

export default function Skills() {
  return (
    <ScrollRevealSection id="skills" className="skills-section">
      <div className="skills-wrapper">
        <h2 className="skills-title">Skills</h2>
        <div className="skills-grid">
          {SKILL_SHOWCASE.map((skill) => (
            <div key={skill.name} className="skill-tile">
              <div className="skill-logo-wrap">
                <img
                  className={`skill-svg${skill.type === "github" || skill.type === "express" ? " skill-svg-monochrome" : ""}`}
                  src={SKILL_LOGOS[skill.type]}
                  alt=""
                  aria-hidden="true"
                />
              </div>
              <div className="skill-label">{skill.name}</div>
            </div>
          ))}
        </div>
      </div>
    </ScrollRevealSection>
  );
}
