"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const commissionTypes = [
  {
    title: "Personal Portraits",
    description: "A portrait of you — a gift to yourself that honours your story and presence.",
    icon: "👤",
  },
  {
    title: "Family Portraits",
    description: "Celebrate the bonds that define you. A lasting artwork for generations.",
    icon: "👨‍👩‍👧",
  },
  {
    title: "Book Illustrations",
    description: "Visual storytelling for authors creating meaningful books for all ages.",
    icon: "📖",
  },
  {
    title: "Editorial Artwork",
    description: "Illustrations for magazines, articles, and editorial publications.",
    icon: "✏️",
  },
  {
    title: "Cultural & Community",
    description: "Projects that celebrate community heritage, identity, and collective stories.",
    icon: "🌍",
  },
];

export default function Commissions() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Left heading + body
      gsap.from(".commissions-left .reveal-item", {
        opacity: 0,
        x: -50,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".commissions-left",
          start: "top 80%",
        },
      });

      // CTA button
      gsap.from(".commissions-cta", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".commissions-cta",
          start: "top 90%",
        },
      });

      // Commission type rows slide in from right
      gsap.from(".commission-item", {
        opacity: 0,
        x: 50,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".commissions-list",
          start: "top 80%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="commissions" className="py-28 bg-[#f5ede0]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20">
          {/* Left: text */}
          <div className="commissions-left">
            <p className="reveal-item text-sm uppercase tracking-[0.2em] text-[#c1694f] mb-4 font-medium">
              Commissions
            </p>
            <h2
              className="reveal-item text-4xl md:text-5xl font-semibold text-[#2c2c2c] mb-6 leading-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Commission a
              <br />
              Custom Artwork
            </h2>
            <p className="reveal-item text-[#6b6b6b] leading-relaxed mb-6">
              Interested in a custom portrait or illustration? I work with
              individuals, families, authors, and organisations to create
              meaningful artwork tailored to each project.
            </p>
            <p className="reveal-item text-[#6b6b6b] leading-relaxed mb-10">
              Every commission begins with a conversation. Tell me about the
              story you want to tell, and we&apos;ll explore how art can bring it
              to life.
            </p>
            <a
              href="#contact"
              className="commissions-cta inline-block bg-[#c1694f] text-white px-8 py-3.5 text-sm tracking-wide hover:bg-[#a0553d] transition-colors"
            >
              Discuss Your Project
            </a>
          </div>

          {/* Right: commission types */}
          <div className="commissions-list space-y-4">
            {commissionTypes.map((type) => (
              <div
                key={type.title}
                className="commission-item flex items-start gap-5 bg-white border border-[#e8ddd0] p-5 hover:border-[#c1694f] transition-colors group"
              >
                <div className="text-2xl mt-0.5 shrink-0">{type.icon}</div>
                <div>
                  <h3
                    className="font-semibold text-[#2c2c2c] mb-1 group-hover:text-[#c1694f] transition-colors"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {type.title}
                  </h3>
                  <p className="text-sm text-[#6b6b6b] leading-relaxed">
                    {type.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
