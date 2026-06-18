"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".footer-col", {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".footer-col",
          start: "top 90%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <footer ref={containerRef} className="bg-[#2c2c2c] text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="footer-col">
            <p
              className="text-xl font-semibold mb-3 text-white"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Art by Lerato
            </p>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Creating portraits that celebrate identity, culture, and belonging.
            </p>
          </div>

          {/* Navigation */}
          <div className="footer-col">
            <p className="text-xs uppercase tracking-widest text-[#c1694f] mb-4">
              Navigate
            </p>
            <ul className="space-y-2.5">
              {[
                { href: "#about", label: "About" },
                { href: "#portfolio", label: "Portfolio" },
                { href: "#statement", label: "Artist Statement" },
                { href: "#commissions", label: "Commissions" },
                { href: "#exhibitions", label: "Exhibitions" },
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <p className="text-xs uppercase tracking-widest text-[#c1694f] mb-4">
              Get in Touch
            </p>
            <div className="space-y-3 text-sm text-white/50">
              <p>
                <a
                  href="mailto:hello@yourdomain.com"
                  className="hover:text-white transition-colors"
                >
                  hello@yourdomain.com
                </a>
              </p>
              <p>
                <a
                  href="https://instagram.com/yourhandle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  @yourhandle on Instagram
                </a>
              </p>
              <p>Johannesburg, South Africa</p>
            </div>

            <a
              href="#contact"
              className="inline-block mt-6 border border-[#c1694f] text-[#c1694f] px-6 py-2.5 text-xs tracking-widest uppercase hover:bg-[#c1694f] hover:text-white transition-colors"
            >
              Commission Work
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>
            &copy; {new Date().getFullYear()} Lerato Nyalungu. All rights reserved.
          </p>
          <p>Built with care in Johannesburg, South Africa.</p>
        </div>
      </div>
    </footer>
  );
}
