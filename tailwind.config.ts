import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "mist-black": "#0A0A0A",
        "mountain-cream": "#F5E8D3",
        "kimono-white": "#FAFAFA",
        "lime-accent": "#D4F87A",
        "sakura-pink": "#FFB7C5",
        "mouse-gray": "#888888",
        "glass-border": "rgba(255,255,255,0.1)",
      },
      fontFamily: {
        display: ["var(--font-bebas)", "Bebas Neue", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
      },
      letterSpacing: {
        "tracked": "0.12em",
        "tracked-wide": "0.18em",
      },
      backdropBlur: {
        "xl": "24px",
      },
      transitionTimingFunction: {
        "cinematic": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;