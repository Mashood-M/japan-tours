"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Plane, Bus, Hotel } from "lucide-react";

const includedItems = [
  {
    icon: Users,
    title: "Guides",
    description: "2 awesome guides who know everything about Japan!",
  },
  {
    icon: Plane,
    title: "Flights",
    description: "Routes: Moscow — Osaka, Tokyo — Moscow",
  },
  {
    icon: Bus,
    title: "Transfers",
    description: "From the airport to the hotels",
  },
  {
    icon: Hotel,
    title: "Hotels",
    description: "Comfortable accommodation, 2 people per room (breakfasts included)",
  },
];

export default function IncludedSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <section
      id="included"
      ref={sectionRef}
      className="relative bg-mist-black py-24 md:py-32 px-6 md:px-12"
    >
      {/* Section Heading with Hairline Rule */}
      <div className="max-w-7xl mx-auto mb-16 md:mb-24">
        <div className="flex items-center gap-6">
          <motion.h2
            className="text-4xl md:text-6xl font-display text-kimono-white tracking-tight"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            WHAT&apos;S INCLUDED
          </motion.h2>
          <div className="flex-1 h-px bg-white/20" />
        </div>
      </div>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {includedItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              className="glass-panel rounded-xl p-6 md:p-8 card-lift cursor-pointer interactive"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.div
                className="mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Icon
                  className="w-6 h-6 text-lime-accent"
                  strokeWidth={1.5}
                />
              </motion.div>
              <h3 className="text-sm font-body uppercase tracking-tracked-wide text-kimono-white mb-3">
                {item.title}
              </h3>
              <p className="text-sm font-body text-kimono-white/60 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
