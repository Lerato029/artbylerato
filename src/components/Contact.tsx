"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type FormState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState<FormState>("idle");

  useGSAP(
    () => {
      gsap.from(".contact-left .reveal-item", {
        opacity: 0,
        x: -50,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-left",
          start: "top 80%",
        },
      });

      gsap.from(".contact-info-item", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-info",
          start: "top 85%",
        },
      });

      gsap.from(".contact-form", {
        opacity: 0,
        x: 50,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 80%",
        },
      });
    },
    { scope: containerRef }
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setFormState("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setFormState("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  };

  const inputClass =
    "w-full border border-[#e8ddd0] bg-white px-4 py-3 text-sm text-[#2c2c2c] placeholder:text-[#b0a898] focus:outline-none focus:border-[#c1694f] transition-colors";

  return (
    <section ref={containerRef} id="contact" className="py-28 bg-[#f5ede0]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20">
          {/* Left: info */}
          <div className="contact-left">
            <p className="reveal-item text-sm uppercase tracking-[0.2em] text-[#c1694f] mb-4 font-medium">
              Contact
            </p>
            <h2
              className="reveal-item text-4xl md:text-5xl font-semibold text-[#2c2c2c] mb-6 leading-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Let&apos;s
              <br />
              Connect
            </h2>
            <p className="reveal-item text-[#6b6b6b] leading-relaxed mb-10">
              Whether you&apos;re interested in commissioning artwork, collaborating
              on a project, or simply want to learn more about my work — I&apos;d
              love to hear from you.
            </p>

            <div className="contact-info space-y-6">
              <div className="contact-info-item flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#c1694f]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[#c1694f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#6b6b6b] mb-1">Email</p>
                  <a
                    href="mailto:hello@yourdomain.com"
                    className="text-[#2c2c2c] hover:text-[#c1694f] transition-colors"
                  >
                    hello@yourdomain.com
                  </a>
                </div>
              </div>

              <div className="contact-info-item flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#c1694f]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[#c1694f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#6b6b6b] mb-1">Location</p>
                  <p className="text-[#2c2c2c]">Johannesburg, South Africa</p>
                </div>
              </div>

              <div className="contact-info-item flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#c1694f]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[#c1694f]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#6b6b6b] mb-1">Instagram</p>
                  <a
                    href="https://instagram.com/yourhandle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2c2c2c] hover:text-[#c1694f] transition-colors"
                  >
                    @yourhandle
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="contact-form">
            {formState === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 border border-[#e8ddd0] bg-white px-8">
                <div className="w-14 h-14 rounded-full bg-[#c1694f]/10 flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-[#c1694f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3
                  className="text-2xl font-semibold text-[#2c2c2c] mb-3"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Message Sent
                </h3>
                <p className="text-[#6b6b6b] text-sm leading-relaxed max-w-xs">
                  Thank you for reaching out. I&apos;ll be in touch with you soon.
                </p>
                <button
                  onClick={() => setFormState("idle")}
                  className="mt-8 text-sm text-[#c1694f] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs uppercase tracking-widest text-[#6b6b6b] mb-2">
                      Your Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Lerato"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-widest text-[#6b6b6b] mb-2">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs uppercase tracking-widest text-[#6b6b6b] mb-2">
                    Enquiry Type
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`${inputClass} cursor-pointer`}
                  >
                    <option value="">Select an enquiry type</option>
                    <option value="Personal Portrait">Personal Portrait</option>
                    <option value="Family Portrait">Family Portrait</option>
                    <option value="Book Illustration">Book Illustration</option>
                    <option value="Editorial Artwork">Editorial Artwork</option>
                    <option value="Cultural / Community Project">
                      Cultural / Community Project
                    </option>
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Collaboration">Collaboration</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-widest text-[#6b6b6b] mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or enquiry..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {formState === "error" && (
                  <div className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="w-full bg-[#c1694f] text-white py-3.5 text-sm tracking-wide hover:bg-[#a0553d] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {formState === "loading" ? "Sending…" : "Send Message"}
                </button>

                <p className="text-xs text-[#6b6b6b] text-center">
                  I typically respond within 2–3 business days.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
