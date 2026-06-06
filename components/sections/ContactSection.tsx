"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    comment: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Background Image - Cherry Blossoms & Mount Fuji */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/contact-bg.png"
          alt="Cherry blossoms framing Mount Fuji and red pagoda"
          fill
          className="object-cover object-center"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-mist-black/60 via-mist-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center px-6 md:px-12 py-24">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-md">
            {/* Glass Form Panel */}
            <motion.div
              className="glass-panel-strong rounded-2xl p-8 md:p-10"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-2xl md:text-3xl font-serif font-light text-kimono-white mb-2 leading-snug">
                Want to join us,
                <br />
                but still have questions?
              </h2>
              <p className="text-xs font-body uppercase tracking-tracked-wide text-mouse-gray mb-8">
                Leave a request
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="form-input"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="form-input"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Comment"
                    value={formData.comment}
                    onChange={(e) =>
                      setFormData({ ...formData, comment: e.target.value })
                    }
                    rows={3}
                    className="form-input resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-3 px-6 bg-mountain-cream text-mist-black font-body text-sm font-medium rounded-full hover:bg-lime-accent transition-colors duration-300 interactive"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  Send
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
