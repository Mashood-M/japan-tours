"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import IncludedSection from "@/components/sections/IncludedSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";
import CustomCursor from "@/components/ui/CustomCursor";

// Problem 4A — Lenis smooth scroll.
// duration: 1.2 · custom expo-out easing · cancelable RAF loop.
// Framer Motion's useScroll works natively because Lenis fires native
// scroll events on the window, so no additional adapter is needed.
export default function Home() {
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 0, // keeps mobile native — better performance
    });

    function raf(time: number) {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    }

    rafIdRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative">
      {/* Problem 4B — Custom cursor (mobile hidden via CSS) */}
      <CustomCursor />
      <HeroSection />
      <AboutSection />
      <IncludedSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
