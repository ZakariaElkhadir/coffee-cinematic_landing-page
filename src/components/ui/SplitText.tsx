"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
}

export function SplitText({ children, className, delay = 0 }: SplitTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const chars = textRef.current?.querySelectorAll(".char");
      if (!chars) return;

      gsap.fromTo(
        chars,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 1,
          ease: "power4.out",
          delay,
        },
      );
    },
    { scope: textRef },
  );

  return (
    <div ref={textRef} className={cn("overflow-hidden", className)}>
      {children.split("").map((char, index) => (
        <span
          key={index}
          className="char inline-block"
          style={{ willChange: "transform" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}
