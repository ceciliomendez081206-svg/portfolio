import profilePhoto from "../assets/profile.png";

export default function Hero() {
  return (
    <section id="home" className="hero-shell">
      <div className="hero-inner max-w-6xl mx-auto px-5 sm:px-8">
        <div className="hero-copy">
          <p className="hero-kicker hero-text-reveal hero-reveal-1">HELLO, I'M</p>
          <h1 className="hero-title hero-text-reveal hero-reveal-2">
            <span>Cecilio Emil J Mendez</span>
          </h1>
          <p className="hero-role hero-text-reveal hero-reveal-3">Aspiring Software Developer</p>
          <p className="hero-description hero-text-reveal hero-reveal-4">
            I am a currently a 3rd year BSIS student at the Technological University of the Philippines, 
            trying to pursue a career in software development.
          </p>
          
          <div className="hero-actions hero-text-reveal hero-reveal-5">
            <a href="#projects" className="btn hero-btn-primary">View My Work</a>
            <a href="#contact" className="btn hero-btn-secondary">Contact Me</a>
          </div>
        </div>

        <div className="hero-visual fade-up-delay-1">
          <div className="portrait-card">
            <img
              className="hero-photo"
              src={profilePhoto}
              alt="Portrait of Cecilio Emil Mendez"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
