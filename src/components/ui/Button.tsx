"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MoveRight } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  icon?: boolean;
}

export function Button({
  children,
  className,
  variant = "primary",
  icon = false,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!buttonRef.current || !circleRef.current || variant !== "primary")
        return;

      const button = buttonRef.current;
      const circle = circleRef.current;

      const onMouseEnter = () => {
        gsap.to(circle, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(button, {
          color: "#2c241b", // coffee-dark
          duration: 0.3,
        });
      };

      const onMouseLeave = () => {
        gsap.to(circle, {
          scale: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(button, {
          color: "#f4f1ea", // coffee-cream
          duration: 0.3,
        });
      };

      const onMouseMove = (e: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(circle, {
          x,
          y,
          duration: 0.1,
          ease: "power2.out",
        });

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const moveX = (x - centerX) * 0.1;
        const moveY = (y - centerY) * 0.1;

        gsap.to(button, {
          x: moveX,
          y: moveY,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      button.addEventListener("mouseenter", onMouseEnter);
      button.addEventListener("mouseleave", onMouseLeave);
      button.addEventListener("mousemove", onMouseMove);

      return () => {
        button.removeEventListener("mouseenter", onMouseEnter);
        button.removeEventListener("mouseleave", onMouseLeave);
        button.removeEventListener("mousemove", onMouseMove);
      };
    },
    { scope: buttonRef },
  );

  const variants = {
    primary:
      "bg-coffee-dark text-coffee-cream border border-coffee-dark hover:border-coffee-dark",
    outline:
      "bg-transparent text-coffee-dark border border-coffee-dark hover:bg-coffee-dark hover:text-coffee-cream",
    ghost: "bg-transparent text-coffee-dark hover:bg-coffee-dark/10",
  };

  return (
    <button
      ref={buttonRef}
      className={cn(
        "relative flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-4 text-sm font-medium uppercase tracking-wider transition-colors",
        variants[variant],
        className,
      )}
      {...props}
    >
      {variant === "primary" && (
        <div
          ref={circleRef}
          className="pointer-events-none absolute left-0 top-0 h-32 w-32 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-coffee-gold opacity-20 mix-blend-difference"
        />
      )}
      <span ref={textRef} className="relative z-10 font-serif">
        {children}
      </span>
      {icon && <MoveRight className="relative z-10 h-4 w-4" />}
    </button>
  );
}
