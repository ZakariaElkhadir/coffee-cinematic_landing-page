"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useGSAP(
    () => {
      const cursor = cursorRef.current;
      const follower = followerRef.current;
      if (!cursor || !follower) return;

      gsap.set(cursor, { xPercent: -50, yPercent: -50 });
      gsap.set(follower, { xPercent: -50, yPercent: -50 });

      const onMouseMove = (e: MouseEvent) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power2.out",
        });
        gsap.to(follower, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      const onMouseEnter = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (
          target.closest("button") ||
          target.closest("a") ||
          target.closest("[data-hover]")
        ) {
          setIsHovering(true);
        } else {
          setIsHovering(false);
        }
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseover", onMouseEnter);

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseover", onMouseEnter);
      };
    },
    { scope: cursorRef }, // scope strictly to cursorRef to avoid conflicts? actually window listeners are global.
  );

  useEffect(() => {
    const follower = followerRef.current;
    if (!follower) return;

    if (isHovering) {
      gsap.to(follower, {
        scale: 1.5,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        border: "1px solid rgba(198, 168, 124, 0.5)", // coffee-gold
        mixBlendMode: "difference",
        duration: 0.3,
      });
    } else {
      gsap.to(follower, {
        scale: 1,
        backgroundColor: "transparent",
        border: "1px solid #c6a87c",
        mixBlendMode: "normal",
        duration: 0.3,
      });
    }
  }, [isHovering]);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-coffee-gold mix-blend-difference"
      />
      <div
        ref={followerRef}
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[9998] h-12 w-12 rounded-full border border-coffee-gold transition-opacity duration-300 ease-out",
        )}
      />
    </>
  );
}
