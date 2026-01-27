"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export function Showcase() {
  const sectionRef = useRef<HTMLOptionElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const image = imageRef.current;
      if (!section || !image) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "bottom top",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".showcase-text", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power2.out",
      }).from(
        image,
        {
          y: 100,
          opacity: 0,
          rotate: 5,
          scale: 0.9,
          duration: 1.2,
          ease: "power2.out",
        },
        "-=0.8",
      );

      // Floating animation for the bag
      gsap.to(image, {
        y: "-=20",
        rotation: "+=2",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-coffee-cream flex flex-col md:flex-row items-center justify-center p-8 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto w-full items-center gap-12 md:gap-24 relative z-10">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left space-y-8 showcase-text">
          <h2 className="text-5xl md:text-7xl font-bold font-serif text-coffee-dark leading-none">
            The Signature <br />{" "}
            <span className="text-coffee-gold italic">Blend</span>
          </h2>
          <p className="text-xl text-coffee-medium max-w-lg mx-auto md:mx-0 leading-relaxed">
            A masterpiece of flavor. Sourced from the finest origins, roasted to
            perfection, and designed for those who appreciate the art of coffee.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start pt-4">
            <Button>Add to Cart</Button>
            <Button variant="outline">View Details</Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 relative flex justify-center">
          <div className="absolute inset-0 bg-radial-gradient from-coffee-gold/20 to-transparent blur-3xl transform scale-150" />
          <img
            ref={imageRef}
            src="/images/product_coffee_bag_1769532577703.png"
            alt="Cinematic Coffee Premium Bag"
            className="relative z-10 w-full max-w-md drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Decorative Background Text */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden opacity-5 pointer-events-none">
        <span className="text-[15vw] font-bold font-serif whitespace-nowrap text-coffee-dark uppercase leading-none">
          Premium Roast
        </span>
      </div>
    </section>
  );
}
