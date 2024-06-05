"use client";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { motion } from "framer-motion";

export function HeroHighlightDemo() {
  return (
    <div className="flex flex-col gap-3 py-24 text-center">
      <HeroHighlight>
        <h1 className="text-4xl md:text-7xl font-bold px-4 text-white leading-relaxed lg:leading-snug text-center mx-auto ">
          Join Team
        </h1>
        <h2 className="text-4xl md:text-7xl font-bold text-white leading-relaxed lg:leading-snug text-center mx-auto ">
          Where Every Day Is an{" "}
          <Highlight className="text-black ">Adventure!</Highlight>
        </h2>
      </HeroHighlight>
    </div>
  );
}
