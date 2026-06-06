"use client";

import { useEffect, useRef, useState } from "react";

// Problem 4B — Custom cursor with two states:
//   Default: 8px solid lime dot, follows mouse with lerp (lag ~0.15)
//   Hover:   32px outlined circle (1px border, no fill)
// mix-blend-mode: difference ensures visibility on any background.
// Hidden on mobile (< 768px) — native touch doesn't have a cursor.
// Uses requestAnimationFrame for smooth lerped following, not useState
// on every mousemove (which re-renders too frequently).

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });       // raw mouse position
  const lerpRef = useRef({ x: 0, y: 0 });       // smoothed position
  const rafRef = useRef<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Hide entirely on mobile
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIsMobile(true);
      return;
    }

    const LERP = 0.15; // lag factor — lower = more lag

    // Track raw position
    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    // Hover detection on interactive elements
    const onMouseOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (
        t.tagName === "A" ||
        t.tagName === "BUTTON" ||
        t.closest("a") ||
        t.closest("button") ||
        t.classList.contains("interactive") ||
        t.closest(".interactive")
      ) {
        setIsHovering(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (
        t.tagName === "A" ||
        t.tagName === "BUTTON" ||
        t.closest("a") ||
        t.closest("button") ||
        t.classList.contains("interactive") ||
        t.closest(".interactive")
      ) {
        setIsHovering(false);
      }
    };

    // RAF loop — lerp position and write directly to DOM (no React re-render)
    const loop = () => {
      lerpRef.current.x += (posRef.current.x - lerpRef.current.x) * LERP;
      lerpRef.current.y += (posRef.current.y - lerpRef.current.y) * LERP;

      if (dotRef.current) {
        const size = isHovering ? 32 : 8;
        dotRef.current.style.transform = `translate(${lerpRef.current.x - size / 2}px, ${lerpRef.current.y - size / 2}px)`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [isHovering]);

  if (isMobile) return null;

  return (
    <div
      ref={dotRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: isHovering ? 32 : 8,
        height: isHovering ? 32 : 8,
        borderRadius: "50%",
        backgroundColor: isHovering ? "transparent" : "#D4F87A",
        border: isHovering ? "1px solid #FAFAFA" : "none",
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "difference",
        transition: "width 0.2s cubic-bezier(0.16,1,0.3,1), height 0.2s cubic-bezier(0.16,1,0.3,1), background-color 0.2s ease, border 0.2s ease",
        willChange: "transform",
      }}
    />
  );
}
