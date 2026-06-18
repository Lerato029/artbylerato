"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    title: "Portrait Paintings",
    description: "Traditional and contemporary painted portraits exploring the depth of human expression.",
    count: "Series I",
    accent: "#c1694f",
  },
  {
    title: "Digital Portraits",
    description: "Digitally illustrated portraits that blend modern technique with rich cultural storytelling.",
    count: "Series II",
    accent: "#8b6b4a",
  },
  {
    title: "Personal Projects",
    description: "Explorative works born from personal observation, curiosity, and lived experience.",
    count: "Series III",
    accent: "#6b8b6b",
  },
  {
    title: "Cultural Narratives",
    description: "Artwork that centres African heritage, tradition, and the visual language of community.",
    count: "Series IV",
    accent: "#4a6b8b",
  },
  {
    title: "Children's Book Illustrations",
    description: "Vibrant illustrations that bring stories to life for young readers across cultures.",
    count: "Series V",
    accent: "#8b4a6b",
  },
];

export default function Portfolio() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Header reveal
      gsap.from(".portfolio-header .reveal-item", {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".portfolio-header",
          start: "top 80%",
        },
      });

      // Cards stagger up with a slight scale
      gsap.from(".portfolio-card", {
        opacity: 0,
        y: 60,
        scale: 0.96,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".portfolio-grid",
          start: "top 80%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="portfolio" className="py-28 bg-[#faf7f2]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="portfolio-header max-w-xl mb-20">
          <p className="reveal-item text-sm uppercase tracking-[0.2em] text-[#c1694f] mb-4 font-medium">
            Portfolio
          </p>
          <h2
            className="reveal-item text-4xl md:text-5xl font-semibold text-[#2c2c2c] mb-6 leading-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Selected Works
          </h2>
          <p className="reveal-item text-[#6b6b6b] leading-relaxed">
            A collection of portraits and personal projects exploring culture,
            identity, and contemporary African experiences. Each piece begins
            with observation and curiosity, transforming everyday moments into
            visual stories.
          </p>
        </div>

        {/* Category grid */}
        <div className="portfolio-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="portfolio-card group border border-[#e8ddd0] bg-white hover:border-[#c1694f] transition-colors duration-300 cursor-pointer"
            >
              {/* Artwork placeholder */}
              <div
                className="aspect-[4/3] relative overflow-hidden"
                style={{ backgroundColor: `${cat.accent}12` }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div
                    className="w-12 h-12 mb-3 flex items-center justify-center"
                    style={{ color: cat.accent }}
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-xs tracking-widest uppercase" style={{ color: cat.accent }}>
                    {cat.count}
                  </p>
                </div>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  style={{ backgroundColor: `${cat.accent}18` }}
                >
                  <span className="text-xs tracking-widest uppercase text-[#2c2c2c] border border-[#2c2c2c] px-4 py-2">
                    View Series
                  </span>
                </div>
              </div>

              {/* Card content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-4 h-px" style={{ backgroundColor: cat.accent }} />
                  <span className="text-xs uppercase tracking-widest text-[#6b6b6b]">
                    {cat.count}
                  </span>
                </div>
                <h3
                  className="text-lg font-semibold text-[#2c2c2c] mb-2 group-hover:text-[#c1694f] transition-colors"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {cat.title}
                </h3>
                <p className="text-sm text-[#6b6b6b] leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}

          {/* "More coming" card */}
          <div className="portfolio-card border border-dashed border-[#e8ddd0] flex items-center justify-center aspect-auto min-h-48 p-8">
            <div className="text-center">
              <div className="w-8 h-8 rounded-full border border-[#c1694f] flex items-center justify-center mx-auto mb-3">
                <span className="text-[#c1694f] text-lg leading-none">+</span>
              </div>
              <p className="text-xs text-[#6b6b6b] tracking-wide">More works coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
