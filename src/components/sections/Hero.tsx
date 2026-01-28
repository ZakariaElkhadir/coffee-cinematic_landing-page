"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MoveDown } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { SplitText } from "@/components/ui/SplitText";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Intro animation
      tl.from(videoRef.current, {
        scale: 1.2,
        duration: 2,
        ease: "power2.out",
      })
        .to(
          ".hero-content",
          {
            opacity: 1,
            duration: 1,
          },
          "-=1",
        )
        .from(
          ".hero-btn",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5",
        );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-coffee-dark px-4"
    >
      {/* Background with animated gradient overlay */}
      <div ref={videoRef} className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_background_1769532189324.png"
            alt="Coffee Background"
            className="h-full w-full object-cover opacity-60"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-coffee-dark/80 via-coffee-dark/50 to-coffee-dark/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-coffee-gold/5 via-transparent to-transparent" />
      </div>

      <div className="hero-content relative z-10 flex flex-col items-center text-center opacity-0">
        <span className="mb-4 text-sm uppercase tracking-[0.2em] text-coffee-accent font-serif italic">
          Est. 1987
        </span>
        <h1 className="mb-8 max-w-4xl text-5xl font-bold leading-tight text-coffee-cream md:text-7xl lg:text-8xl">
          <SplitText delay={0.5}>The Art of</SplitText>
          <br />
          <SplitText delay={1.0} className="font-serif italic text-coffee-gold">
            Coffee Making
          </SplitText>
        </h1>
        <p className="mb-10 max-w-lg text-lg text-coffee-cream/80 md:text-xl">
          Experience the journey from bean to cup. A cinematic exploration of
          flavor, aroma, and tradition.
        </p>
        <div className="hero-btn flex gap-4">
          <Button>Explore Journey</Button>
          <Button
            variant="outline"
            className="text-coffee-cream border-coffee-cream hover:bg-coffee-cream hover:text-coffee-dark"
          >
            Our Origins
          </Button>
        </div>
      </div>

      <div className="hero-btn absolute bottom-10 left-1/2 -translate-x-1/2 text-coffee-cream/50 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <MoveDown className="h-4 w-4" />
        </div>
      </div>
    </section>
  );
}
