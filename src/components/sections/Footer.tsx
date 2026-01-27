"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Instagram, Twitter, Facebook, Mail } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const footer = footerRef.current;
      if (!footer) return;

      gsap.from(".footer-item", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 80%",
        },
      });
    },
    { scope: footerRef },
  );

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-coffee-dark px-4 py-24 text-coffee-cream overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-coffee-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="footer-item flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-4xl font-serif font-bold text-coffee-gold mb-4">
            Cinematic Coffee
          </h3>
          <p className="max-w-xs text-sm opacity-60 mb-8">
            Crafting the perfect cup since 1987. Use this space to add a brand
            statement.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-coffee-gold transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-coffee-gold transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-coffee-gold transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-coffee-gold transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="footer-item flex flex-col items-center gap-6">
          <h4 className="text-lg uppercase tracking-widest font-medium">
            Join our newsletter
          </h4>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent border-b border-white/20 px-4 py-2 focus:outline-none focus:border-coffee-gold transition-colors w-64"
            />
            <Button variant="ghost" className="!px-4">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      <div className="footer-item w-full text-center mt-24 text-xs opacity-30">
        &copy; {new Date().getFullYear()} Cinematic Coffee. All rights reserved.
      </div>
    </footer>
  );
}
