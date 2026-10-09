import Feedback from "./components/Feedback.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";
import NavBar from "./components/NavBar.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import "./styles/index.css";

export default function Portfolio() {
  return (
    <div className="portfolio-root">
      <NavBar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <Feedback />
    </div>
  );
}
