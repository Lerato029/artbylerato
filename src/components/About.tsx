"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Image slides in from left
      gsap.from(".about-image", {
        x: -80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-image",
          start: "top 80%",
        },
      });

      // Offset border draws in after image
      gsap.from(".about-image-shadow", {
        x: -40,
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-image",
          start: "top 80%",
        },
        delay: 0.3,
      });

      // Eyebrow + heading
      gsap.from(".about-heading .reveal-item", {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-heading",
          start: "top 80%",
        },
      });

      // Body paragraphs
      gsap.from(".about-body p", {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-body",
          start: "top 85%",
        },
      });

      // Stats count up feel — just fade + slide
      gsap.from(".about-stat", {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.6,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: ".about-stats",
          start: "top 90%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="about" className="py-28 bg-[#f5ede0]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image placeholder */}
          <div className="relative about-image">
            <div className="w-full aspect-[4/5] bg-[#e8ddd0] relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-[#c1694f]/20 flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-[#c1694f]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <p className="text-xs text-[#6b6b6b] tracking-widest uppercase">
                  Artist Photo
                </p>
              </div>
              {/* Decorative offset border */}
              <div className="about-image-shadow absolute -bottom-4 -right-4 w-full h-full border border-[#c1694f] opacity-30 -z-10" />
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="about-heading">
              <p className="reveal-item text-sm uppercase tracking-[0.2em] text-[#c1694f] mb-4 font-medium">
                About the Artist
              </p>
              <h2
                className="reveal-item text-4xl md:text-5xl font-semibold text-[#2c2c2c] mb-8 leading-tight"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Lerato
                <br />
                Nyalungu
              </h2>
            </div>

            <div className="about-body space-y-5 text-[#6b6b6b] leading-relaxed">
              <p>
                I&apos;m a South African visual artist whose practice centres on
                portraiture. Through painting and digital illustration, I explore
                themes of identity, belonging, heritage, and self-expression.
              </p>
              <p>
                My work is inspired by the people around me, the stories
                embedded within our communities, and the beauty of natural
                African features and hairstyles.
              </p>
              <p>
                Each artwork is an invitation to pause, reflect, and connect
                with the humanity of the subject.
              </p>
            </div>

            <div className="about-stats mt-10 pt-10 border-t border-[#e8ddd0] grid grid-cols-3 gap-6">
              {[
                { value: "5+", label: "Years of Practice" },
                { value: "50+", label: "Artworks Created" },
                { value: "JHB", label: "Based in South Africa" },
              ].map((stat) => (
                <div key={stat.label} className="about-stat">
                  <p
                    className="text-3xl font-semibold text-[#c1694f]"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs text-[#6b6b6b] mt-1 tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
