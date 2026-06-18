"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    year: "2024",
    title: "Exhibition Title",
    detail: "Venue / City · Description of the exhibition or event",
    type: "Exhibition",
  },
  {
    year: "2023",
    title: "Award / Recognition",
    detail: "Awarding body · Description or context",
    type: "Award",
  },
  {
    year: "2023",
    title: "Publication / Feature",
    detail: "Publication name · Description of the feature or article",
    type: "Publication",
  },
  {
    year: "2022",
    title: "Collaboration",
    detail: "Partner / Organisation · Description of the project",
    type: "Collaboration",
  },
];

export default function Exhibitions() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".exhibitions-header .reveal-item", {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".exhibitions-header",
          start: "top 80%",
        },
      });

      // Timeline line draws down
      gsap.from(".timeline-line", {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".timeline-wrapper",
          start: "top 80%",
        },
      });

      // Each item slides in with dot
      gsap.from(".timeline-item", {
        opacity: 0,
        x: 40,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".timeline-wrapper",
          start: "top 80%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="exhibitions" className="py-28 bg-[#faf7f2]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="exhibitions-header max-w-xl mb-16">
          <p className="reveal-item text-sm uppercase tracking-[0.2em] text-[#c1694f] mb-4 font-medium">
            Recognition
          </p>
          <h2
            className="reveal-item text-4xl md:text-5xl font-semibold text-[#2c2c2c] mb-6 leading-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Exhibitions &amp;
            <br />
            Awards
          </h2>
          <p className="reveal-item text-[#6b6b6b] leading-relaxed">
            A selection of exhibitions, publications, awards, and creative collaborations.
          </p>
        </div>

        {/* Timeline */}
        <div className="timeline-wrapper relative">
          <div className="timeline-line absolute left-0 top-0 bottom-0 w-px bg-[#e8ddd0]" />

          <div className="space-y-10 pl-8">
            {items.map((item, i) => (
              <div key={i} className="timeline-item relative group">
                {/* Timeline dot */}
                <div className="absolute -left-8 w-px h-full">
                  <div className="absolute top-2 -left-1.5 w-3 h-3 rounded-full border-2 border-[#c1694f] bg-[#faf7f2] group-hover:bg-[#c1694f] transition-colors" />
                </div>

                <div className="border border-[#e8ddd0] bg-white p-6 hover:border-[#c1694f] transition-colors">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-xs tracking-widest uppercase text-[#c1694f] font-medium">
                      {item.year}
                    </span>
                    <span className="text-xs tracking-widest uppercase text-[#6b6b6b] border border-[#e8ddd0] px-2 py-0.5">
                      {item.type}
                    </span>
                  </div>
                  <h3
                    className="font-semibold text-[#2c2c2c] mb-1.5 italic"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#6b6b6b]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pl-8">
            <p className="text-sm text-[#6b6b6b] italic">
              Update this section with your exhibitions, awards, publications, and notable projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
