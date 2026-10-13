import { useState } from "react";
import { GitBranch, Mail, User } from "lucide-react";
import config from "../config.js";
import ScrollRevealSection from "./ScrollRevealSection.jsx";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setFeedback({ type: "", message: "" });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback({ type: "", message: "" });

    try {
      const response = await fetch(config.feedback.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, ts: Date.now() }),
      });

      if (!response.ok) {
        throw new Error(`The message could not be sent (server returned ${response.status}).`);
      }

      setForm({ name: "", email: "", subject: "", message: "" });
      setFeedback({ type: "success", message: "Thanks for reaching out! Your message was sent." });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error instanceof Error
          ? `${error.message} Please try again later.`
          : "Your message could not be sent. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ScrollRevealSection id="contact" className="content-section contact-section max-w-6xl mx-auto px-5 sm:px-8">
      <div className="contact-content">
        <p className="eyebrow section-eyebrow">Contact</p>
        <h2 className="section-heading contact-heading">Let's build something</h2>
        <p className="contact-description">
          Have a project or opportunity in mind? Send me a message using the form below.
        </p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form-heading">
            <h3>Send me a message</h3>
            <p>Fill in the details and I’ll get back to you.</p>
          </div>
          <div className="contact-form-row">
            <div className="contact-field">
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={updateField}
                maxLength={100}
                required
              />
            </div>
            <div className="contact-field">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={updateField}
                maxLength={254}
                required
              />
            </div>
          </div>
          <div className="contact-field">
            <label htmlFor="contact-subject">Subject</label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={updateField}
              maxLength={150}
              required
            />
          </div>
          <div className="contact-field">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              value={form.message}
              onChange={updateField}
              rows={6}
              maxLength={5000}
              required
            />
          </div>
          <button className="btn btn-primary contact-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
            <Mail size={16} />
          </button>
          <p
            className={`contact-feedback${feedback.type ? ` is-${feedback.type}` : ""}`}
            role={feedback.type === "error" ? "alert" : "status"}
            aria-live="polite"
          >
            {feedback.message}
          </p>
        </form>
        <div className="social-links">
          <a
            href="https://github.com/ceciliomendez081206-svg"
            className="social-btn"
            aria-label="GitHub"
            target="_blank"
            rel="noreferrer"
          >
            <GitBranch size={18} />
          </a>
          <a href="#" className="social-btn" aria-label="LinkedIn"><User size={18} /></a>
          <a href="mailto:ceciliomendez081206@gmail.com" className="social-btn" aria-label="Email"><Mail size={18} /></a>
        </div>
      </div>
    </ScrollRevealSection>
  );
}
