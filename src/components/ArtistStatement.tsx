"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ArtistStatement() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Big quote fades in with slight upward drift
      gsap.from(".statement-quote", {
        opacity: 0,
        y: 50,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".statement-quote",
          start: "top 80%",
        },
      });

      // Attribution line
      gsap.from(".statement-attr", {
        opacity: 0,
        x: -30,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".statement-attr",
          start: "top 85%",
        },
        delay: 0.3,
      });

      // Right column heading + body
      gsap.from(".statement-text .reveal-item", {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".statement-text",
          start: "top 80%",
        },
      });

      // Theme pills pop in
      gsap.from(".theme-pill", {
        opacity: 0,
        scale: 0.8,
        stagger: 0.07,
        duration: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".theme-grid",
          start: "top 88%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="statement" className="py-28 bg-[#2c2c2c] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* Pull quote */}
          <div className="relative">
            <div
              className="text-[8rem] leading-none text-[#c1694f] opacity-20 absolute -top-8 -left-4"
              style={{ fontFamily: "Georgia, serif" }}
            >
              &ldquo;
            </div>
            <blockquote
              className="statement-quote text-2xl md:text-3xl leading-relaxed text-white/90 relative z-10"
              style={{ fontFamily: "Georgia, serif" }}
            >
              I believe art has the power to connect people across cultures
              while reminding us of our shared humanity.
            </blockquote>
            <div className="statement-attr mt-8 flex items-center gap-4">
              <div className="w-8 h-px bg-[#c1694f]" />
              <span className="text-sm tracking-widest uppercase text-[#c1694f]">
                Lerato Nyalungu
              </span>
            </div>
          </div>

          {/* Statement text */}
          <div className="statement-text">
            <p className="reveal-item text-sm uppercase tracking-[0.2em] text-[#c1694f] mb-4 font-medium">
              Artist Statement
            </p>
            <h2
              className="reveal-item text-4xl font-semibold text-white mb-8 leading-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Why I Create
            </h2>

            <div className="space-y-5 text-white/70 leading-relaxed">
              <p className="reveal-item">
                Portraiture allows me to document stories that are often
                overlooked. My work seeks to celebrate African beauty, preserve
                cultural memory, and create images that people can see
                themselves in.
              </p>
              <p className="reveal-item">
                I am particularly interested in the visual language of natural
                hair, family, community, and the quiet moments that shape our
                identities.
              </p>
              <p className="reveal-item">
                I believe art has the power to connect people across cultures
                while reminding us of our shared humanity.
              </p>
            </div>

            {/* Themes */}
            <div className="theme-grid mt-10 grid grid-cols-2 gap-3">
              {[
                "Identity",
                "African Beauty",
                "Natural Hair",
                "Cultural Memory",
                "Community",
                "Heritage",
              ].map((theme) => (
                <div
                  key={theme}
                  className="theme-pill border border-white/10 px-4 py-2.5 text-xs tracking-widest uppercase text-white/50 hover:border-[#c1694f] hover:text-[#c1694f] transition-colors cursor-default"
                >
                  {theme}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
