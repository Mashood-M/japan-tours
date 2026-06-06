"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import Image from "next/image";

const cities = [
  {
    days: "Days 1–3",
    name: "Osaka",
    photos: [
      { src: "/images/im1/Osaka Castle .png", alt: "Osaka castle", tilt: "photo-tilt-left" },
      { src: "/images/im1/Osaka Skyline with Castle.png", alt: "Osaka skyline", tilt: "photo-tilt-right" },
    ],
  },
  {
    days: "Days 4–6",
    name: "Kyoto",
    photos: [
      { src: "/images/im1/Kyoto Temple.png", alt: "Kyoto pagoda", tilt: "photo-tilt-left" },
      { src: "/images/im1/Kyoto Torii Pathway.jpg", alt: "Red shrine", tilt: "photo-tilt-right" },
    ],
  },
  {
    days: "Days 7–10",
    name: "Tokyo",
    photos: [
      { src: "/images/reference.jpg", alt: "Shibuya neon", tilt: "photo-tilt-left" },
      { src: "/images/reference.jpg", alt: "Tokyo street", tilt: "photo-tilt-right" },
    ],
  },
];

// Stagger delays per city: 0ms → 200ms → 400ms
const CITY_DELAYS = [0, 0.2, 0.4];

const clusterVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// Problem 3 — Each city gets its own ref + useInView. When 30% of the
// cluster scrolls into viewport (once only), it triggers. Delays are
// staggered 200ms apart to create a travel-journal page-turn feeling.
function CityNode({
  city,
  index,
}: {
  city: (typeof cities)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="relative flex items-start gap-6 md:gap-8"
      variants={clusterVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={CITY_DELAYS[index]}
    >
      {/* Timeline Node */}
      <div className="flex flex-col items-center">
        <div className="timeline-node" />
        {index < 2 && (
          <div className="w-px h-24 md:h-32 bg-white/20 mt-2" />
        )}
      </div>

      {/* City Info */}
      <div className="flex-1 pb-8">
        <div className="mb-3">
          <span className="text-xs text-mouse-gray font-body uppercase tracking-tracked">
            {city.days}
          </span>
          <h3 className="text-xl md:text-2xl font-display text-kimono-white mt-1">
            {city.name}
          </h3>
        </div>

        {/* Photo Cluster */}
        <div className="photo-cluster relative flex gap-3">
          {city.photos.map((photo, i) => (
            <motion.div
              key={i}
              className={`relative w-28 md:w-36 aspect-[4/3] rounded-sm overflow-hidden border-2 border-white/80 shadow-lg ${
                i === 0 ? "photo-1 photo-tilt-left" : "photo-2 photo-tilt-right"
              }`}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-16 md:py-24 px-6 md:px-12"
      style={{ backgroundColor: "#090806" }}
    >
      {/* About the Tour — heading */}
      <div className="w-full mb-16 md:mb-24 flex items-center justify-center pointer-events-none">
        <div className="w-full flex items-center gap-4 md:gap-8">
          <div className="flex-1 h-px bg-white/30" />
          <h2 
            className="w-[940px] max-w-[80vw] shrink-0 h-[80px] flex items-center justify-center text-[40px] md:text-[60px] lg:text-[80px] text-kimono-white tracking-[0.2em] uppercase leading-none font-medium"
            style={{ fontFamily: "'Duran', sans-serif" }}
          >
            ABOUT THE TOUR
          </h2>
          <div className="flex-1 h-px bg-white/30" />
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        {/* Left Column — Text */}
        <div className="space-y-8">
          <motion.p
            className="text-base md:text-lg font-body text-kimono-white/80 leading-relaxed max-w-md"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            We&apos;ve planned a simple and convenient 10-day itinerary for your trip to Japan.
            You&apos;ll visit three cities:{" "}
            <span className="accent-glow">Osaka, Kyoto, and Tokyo</span>.
          </motion.p>

          <motion.p
            className="text-base md:text-lg font-body text-kimono-white/80 leading-relaxed max-w-md"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            No need to worry about routes, schedules, or finding places — everything is already
            organized. We&apos;ll show you where to go, what to see, and where to eat, so you can
            simply <span className="accent-glow">enjoy the journey</span>.
          </motion.p>
        </div>

        {/* Right Column — Timeline with staggered reveals */}
        <div className="relative">
          {cities.map((city, index) => (
            <CityNode key={city.name} city={city} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
