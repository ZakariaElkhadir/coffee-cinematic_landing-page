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

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
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
      });

      mm.add("(max-width: 767px)", () => {
        const slides = gsap.utils.toArray<HTMLElement>(".mobile-story-slide");
        slides.forEach((slide) => {
          gsap.from(slide.querySelectorAll(".mobile-animate"), {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: slide,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: triggerRef },
  );

  return (
    <section
      ref={triggerRef}
      className="relative md:h-screen md:overflow-hidden"
    >
      <div
        ref={containerRef}
        className="flex flex-col md:flex-row md:h-full w-full md:w-[400vw] md:flex-nowrap"
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`mobile-story-slide relative flex min-h-[60vh] md:h-full w-full md:w-screen flex-col justify-start md:justify-center px-6 pt-32 pb-12 md:py-0 md:px-24 ${slide.color}`}
          >
            <div className="relative z-20 max-w-4xl space-y-8">
              <span className="mobile-animate block text-7xl md:text-9xl font-bold opacity-10 font-serif text-white">
                {slide.number}
              </span>
              <h2 className="mobile-animate text-4xl md:text-8xl font-bold font-serif text-white">
                {slide.title}
              </h2>
              <p className="mobile-animate max-w-xl text-lg md:text-2xl text-white/80">
                {slide.description}
              </p>
            </div>
            {/* Visual element placeholder */}
            <div className="absolute right-0 top-0 h-[50vh] md:h-full w-full md:w-1/2 overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent md:bg-gradient-to-l md:from-transparent md:to-current opacity-60 z-10" />
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
