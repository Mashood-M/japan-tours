"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Globe, Instagram, Facebook, Send } from "lucide-react";

const polaroidCards = [
  { id: 1, label: "3 cities in Japan", image: "/images/im2/3citiesinjapan.png" },
  { id: 2, label: "10 days", image: "/images/im2/10days.png" },
  { id: 3, label: "gigabytes of photos", image: "/images/im2/gigabytesofphotos.png" },
  { id: 4, label: "eat ramen", image: "/images/im2/eatramen.png" },
  { id: 5, label: "enjoy the vibe", image: "/images/im2/enjoythevibe.png" },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Problem 2 — Scroll-linked parallax. Linear easing, no spring.
  // Mountain image: 0.3x scroll speed (slowest — anchors the scene)
  const mountainsY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Typography: 0.5x scroll speed (mid-depth, moves more than mountains)
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  // Polaroids: drift left at 0.4x
  const cardsX = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      {/*
        ─────────────────────────────────────────────────────
        PROBLEM 1 — CORRECT HERO LAYERING (z-index stack)
        ─────────────────────────────────────────────────────
        Layer 0 (z-0): sky / lower mountain fade — sits behind JAPAN text
        Layer 1 (z-10): "JAPAN" display typography
        Layer 2 (z-20): mountain foreground (clips bottom of JAPAN letters)
        Layer 3 (z-25): kimono figure (visual anchor, no parallax)
        Layer 30+:      nav, socials, polaroids, Book button, About heading
        ─────────────────────────────────────────────────────
        Since we only have one mountain image, we use a CSS clip-path +
        duplicate approach:
          • The BACKGROUND copy (z-0) is full-bleed and provides the sky.
          • The FOREGROUND copy (z-20) uses clip-path to reveal only the
            lower ~55% (the actual mountain mass), sitting ABOVE the text,
            recreating the "text standing behind mountains" illusion.
        Both copies share the same parallax transform so they stay in sync.
        ─────────────────────────────────────────────────────
      */}

      {/* Layer 0 — Full mountain image as sky backdrop */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: mountainsY, willChange: "transform" }}
      >
        <Image
          src="/images/hero-mountains.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Bottom fade to dark so sections below blend cleanly */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#0A0A0A]" />
      </motion.div>

      {/* Layer 1 — JAPAN image: outer div handles position, inner motion.div handles parallax */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "150px",
          left: "250px",
          width: "70%",
          zIndex: 10,
        }}
      >
        <motion.div style={{ y: textY, willChange: "transform" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/japan-text.png"
            alt="JAPAN"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </motion.div>
      </div>

      {/* Layer 2 — Mountain foreground mask */}
      {/* clipPath inset(33% 0 0 0) → reveals bottom 67% of image.
          The mountain ridge in hero-mountains.png sits ~33% from top,
          so this makes the peaks slice through the lower ~40% of the
          JAPAN letterforms — exactly matching the reference design. */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          y: mountainsY,
          willChange: "transform",
          clipPath: "inset(33% 0 0 0)",
        }}
      >
        <Image
          src="/images/hero-mountains.png"
          alt="Misty Japanese mountains at dawn"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0A]" />
      </motion.div>

      {/* Layer 3 — Kimono figure (visual anchor, intentionally no parallax) */}
      <div
        className="absolute bottom-[-60px] md:bottom-[-80px] right-[2%] md:right-[8%] z-25 w-[50%] md:w-[40%] h-[88%] pointer-events-none"
        style={{ zIndex: 25 }}
      >
        <Image
          src="/images/kimono-figure.png"
          alt="Woman in vibrant floral kimono"
          fill
          className="object-contain object-bottom"
          priority
          quality={95}
        />
      </div>

      {/* ── Navigation (z-30) ── */}
      <nav className="absolute top-[18px] left-1/2 -translate-x-1/2 z-30 flex items-center justify-between px-6 md:px-10 w-[1800px] max-w-[96vw] h-[60px] rounded-[60px] bg-white/10 backdrop-blur-md border border-white/20">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 md:w-6 md:h-6 text-kimono-white" strokeWidth={1.5} />
          <span className="text-sm md:text-base font-body uppercase tracking-widest text-kimono-white">
            JAPAN TOURS
          </span>
        </div>

        {/* Center Nav */}
        <div className="hidden md:flex items-center gap-12">
          {["About", "Included", "Contacts"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="nav-link text-[15px] md:text-[17px] font-body text-kimono-white/90 hover:text-kimono-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Book Button (nav) */}
        <a
          href="#contact"
          className="px-8 py-2 border border-kimono-white/40 rounded-[60px] text-[15px] md:text-[17px] font-body text-kimono-white hover:bg-kimono-white/10 transition-all duration-300 interactive"
        >
          Book
        </a>
      </nav>

      {/* Social Icons — Right Edge (z-30) */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4">
        {[Instagram, Facebook, Send].map((Icon, i) => (
          <a
            key={i}
            href="#"
            className="text-kimono-white/30 hover:text-kimono-white/70 transition-colors duration-300"
          >
            <Icon className="w-4 h-4" strokeWidth={1.5} />
          </a>
        ))}
      </div>

      {/* ── Problem 2 — Polaroid Card Strip: translateX at 0.4x scroll speed ── */}
      <motion.div
        className="absolute bottom-[20%] md:bottom-[22%] left-[48px] z-30 flex gap-[36px]"
        style={{ x: cardsX, willChange: "transform" }}
      >
        {polaroidCards.map((card) => (
          <motion.div
            key={card.id}
            className="relative w-[90px] md:w-[120px] lg:w-[140px] overflow-hidden cursor-pointer interactive rounded-[5px]"
            style={{ aspectRatio: "9/16" }}
            whileHover={{
              y: -8,
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(255, 184, 197, 0.2)",
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={card.image}
              alt={card.label}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 70px, 100px"
            />
            {/* Bottom gradient shadow overlay */}
            <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />
            
            {/* Text on top of shadow */}
            <div className="absolute inset-x-0 bottom-3 md:bottom-4 px-3 md:px-4 text-left pointer-events-none">
              <p className="text-[12px] md:text-sm lg:text-base text-kimono-white/90 font-body leading-tight whitespace-pre-wrap">
                {card.label === "3 cities in Japan" ? "3 cities\nin Japan" : 
                 card.label === "gigabytes of photos" ? "gigabytes\nof photos" : 
                 card.label}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Book Button — solid white gradient, overlapping kimono */}
      <motion.a
        href="#contact"
        className="absolute bottom-[20%] md:bottom-[22%] right-[75px] z-[24] flex items-center justify-center w-[400px] max-w-[90vw] h-[60px] bg-gradient-to-r from-[#e0e0e0] via-[#f5f5f5] to-white text-sm md:text-lg text-black font-body rounded-[5px] transition-all duration-300 interactive shadow-2xl"
        whileHover={{ scale: 1.02, x: -5 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        Book
      </motion.a>

    </section>
  );
}
