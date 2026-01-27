import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { Showcase } from "@/components/sections/Showcase";
import { Stats } from "@/components/sections/Stats";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <main className="min-h-screen w-full bg-coffee-cream selection:bg-coffee-gold selection:text-coffee-dark">
        <Hero />
        <Story />
        <Showcase />
        <Stats />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
