"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Radial bg
      tl.from(".hero-bg", { opacity: 0, scale: 1.4, duration: 2 }, 0);

      // Eyebrow label
      tl.from(".hero-eyebrow", { opacity: 0, y: 20, duration: 0.7 }, 0.3);

      // Heading lines stagger
      tl.from(".hero-headline .line", {
        opacity: 0,
        y: 60,
        stagger: 0.12,
        duration: 0.9,
      }, 0.5);

      // Body copy
      tl.from(".hero-body p", {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.7,
      }, 1.1);

      // Buttons
      tl.from(".hero-cta a", {
        opacity: 0,
        y: 20,
        stagger: 0.12,
        duration: 0.6,
      }, 1.5);

      // Visual card
      tl.from(".hero-card", {
        opacity: 0,
        x: 60,
        duration: 1,
        ease: "power2.out",
      }, 0.4);

      // Corner accents draw in
      tl.from(".hero-corner", {
        scaleX: 0,
        scaleY: 0,
        transformOrigin: "top left",
        stagger: 0.08,
        duration: 0.5,
        ease: "power1.out",
      }, 1.1);

      // Scroll indicator
      tl.from(".hero-scroll", { opacity: 0, y: -10, duration: 0.6 }, 1.8);
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="hero"
      className="min-h-screen flex items-center justify-center bg-[#faf7f2] relative overflow-hidden"
    >
      {/* Decorative background element */}
      <div
        className="hero-bg absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 70% 50%, #c1694f 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-16 items-center">
        {/* Text content */}
        <div className="order-2 md:order-1">
          <p className="hero-eyebrow text-sm uppercase tracking-[0.2em] text-[#c1694f] mb-4 font-medium">
            Portrait Artist · Johannesburg
          </p>
          <h1
            className="hero-headline text-5xl md:text-6xl lg:text-7xl font-semibold text-[#2c2c2c] leading-tight mb-6 overflow-hidden"
            style={{ fontFamily: "Georgia, serif" }}
          >
            <span className="line block">Celebrating</span>
            <span className="line block text-[#c1694f]">Identity</span>
            <span className="line block">Through</span>
            <span className="line block">Portraiture</span>
          </h1>
          <div className="hero-body">
            <p className="text-lg text-[#6b6b6b] leading-relaxed mb-4 max-w-md">
              I create contemporary portrait paintings and illustrations that
              explore beauty, culture, memory, and the stories we carry.
            </p>
            <p className="text-base text-[#6b6b6b] leading-relaxed mb-10 max-w-md">
              My work focuses on representation — particularly the richness of
              African identity and natural hair — using portraiture as a way to
              preserve, honour, and celebrate everyday people.
            </p>
          </div>
          <div className="hero-cta flex flex-wrap gap-4">
            <a
              href="#portfolio"
              className="inline-block bg-[#c1694f] text-white px-8 py-3.5 text-sm tracking-wide hover:bg-[#a0553d] transition-colors"
            >
              View Portfolio
            </a>
            <a
              href="#contact"
              className="inline-block border border-[#2c2c2c] text-[#2c2c2c] px-8 py-3.5 text-sm tracking-wide hover:bg-[#2c2c2c] hover:text-white transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Visual card */}
        <div className="order-1 md:order-2 flex justify-center">
          <div className="hero-card relative w-80 h-96 md:w-96 md:h-[480px]">
            <div className="absolute inset-0 bg-[#f5ede0] border border-[#e8ddd0]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
              <div className="w-16 h-px bg-[#c1694f] mb-6" />
              <p
                className="text-[#6b6b6b] text-sm leading-relaxed italic"
                style={{ fontFamily: "Georgia, serif" }}
              >
                &ldquo;Each portrait is an invitation to pause, reflect, and
                connect with the humanity of the subject.&rdquo;
              </p>
              <div className="w-16 h-px bg-[#c1694f] mt-6" />
              <p className="text-xs text-[#c1694f] mt-4 tracking-widest uppercase">
                Lerato Nyalungu
              </p>
            </div>
            {/* Corner accents */}
            <div className="hero-corner absolute top-3 left-3 w-6 h-6 border-l border-t border-[#c1694f] opacity-60" />
            <div className="hero-corner absolute top-3 right-3 w-6 h-6 border-r border-t border-[#c1694f] opacity-60" />
            <div className="hero-corner absolute bottom-3 left-3 w-6 h-6 border-l border-b border-[#c1694f] opacity-60" />
            <div className="hero-corner absolute bottom-3 right-3 w-6 h-6 border-r border-b border-[#c1694f] opacity-60" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs tracking-widest uppercase text-[#6b6b6b]">
          Scroll
        </span>
        <div className="w-px h-8 bg-[#6b6b6b] animate-pulse" />
      </div>
    </section>
  );
}
