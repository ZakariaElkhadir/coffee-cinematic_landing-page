"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    id: "origin",
    title: "The Origin",
    description: "Sourced from the high-altitude regions of Ethiopia.",
    number: "01",
    color: "bg-coffee-dark",
    image: "/images/story_origin_1769532205687.png",
  },
  {
    id: "roast",
    title: "The Roast",
    description: "Small-batch roasting to unlock distinct flavor profiles.",
    number: "02",
    color: "bg-coffee-medium",
    image: "/images/story_roast_1769532231439.png",
  },
  {
    id: "brew",
    title: "The Brew",
    description: "Precision brewing methods for the perfect extraction.",
    number: "03",
    color: "bg-coffee-light",
    image: "/images/story_brew_1769532252817.png",
  },
  {
    id: "cup",
    title: "The Cup",
    description: "A moment of pure indulgence in every sip.",
    number: "04",
    color: "bg-coffee-gold",
    image: "/images/story_cup_1769532269299.png",
  },
];

export function Story() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const trigger = triggerRef.current;
      if (!container || !trigger) return;

      const totalScroll = container.scrollWidth - window.innerWidth;

      gsap.to(container, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: triggerRef },
  );

  return (
    <section ref={triggerRef} className="relative h-screen overflow-hidden">
      <div ref={containerRef} className="flex h-full w-[400vw] flex-nowrap">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`relative flex h-full w-screen flex-col justify-center px-12 md:px-24 ${slide.color}`}
          >
            <div className="max-w-4xl space-y-8">
              <span className="block text-9xl font-bold opacity-10 font-serif text-white">
                {slide.number}
              </span>
              <h2 className="text-6xl font-bold font-serif text-white md:text-8xl">
                {slide.title}
              </h2>
              <p className="max-w-xl text-xl text-white/80 md:text-2xl">
                {slide.description}
              </p>
            </div>
            {/* Visual element placeholder */}
            <div className="absolute right-0 top-0 h-full w-full md:w-1/2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-current opacity-50 z-10" />
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
