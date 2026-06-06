"use client";

import { Globe, Instagram, Facebook, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-mist-black py-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Hairline Rule */}
        <div className="h-px bg-white/10 mb-8" />

        {/* Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-kimono-white/60" strokeWidth={1} />
            <span className="text-xs font-body uppercase tracking-tracked-wide text-kimono-white/60">
              JAPAN TOURS
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            {["Home", "About", "Included", "Contacts"].map((item) => (
              <a
                key={item}
                href={item === "Home" ? "#" : `#${item.toLowerCase()}`}
                className="nav-link text-xs font-body uppercase tracking-tracked-wide text-kimono-white/50 hover:text-kimono-white transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {[Instagram, Facebook, Send].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="text-kimono-white/30 hover:text-kimono-white/60 transition-colors duration-300"
              >
                <Icon className="w-4 h-4" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
