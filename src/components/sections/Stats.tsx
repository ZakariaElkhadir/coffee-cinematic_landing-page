"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: "Origin Countries", value: 12, suffix: "+" },
  { label: "Awards Won", value: 45, suffix: "" },
  { label: "Community Members", value: 10, suffix: "k+" },
  { label: "Years of Craft", value: 37, suffix: "" },
];

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const items = section.querySelectorAll(".stat-item");
      const values = section.querySelectorAll(".stat-value");

      gsap.from(items, {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      values.forEach((val: Element) => {
        const target = parseInt(val.getAttribute("data-value") || "0");
        const el = val as HTMLElement;
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            onUpdate: function () {
              el.innerText = Math.ceil(this.targets()[0].innerText).toString();
            },
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-coffee-dark text-coffee-cream py-16 md:py-32 px-4"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="stat-item flex flex-col items-center text-center space-y-2"
          >
            <span
              className="stat-value text-5xl md:text-8xl font-bold font-serif text-coffee-gold"
              data-value={stat.value}
            >
              0
            </span>
            <span className="text-sm md:text-base uppercase tracking-widest opacity-80">
              {stat.label}
            </span>
            {stat.suffix && (
              <span className="hidden">
                {stat.suffix}
              </span> /* This is a bit tricky with innerText tween, might need separate element for suffix */
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
