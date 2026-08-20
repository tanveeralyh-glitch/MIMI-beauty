"use client";
import { useEffect } from "react";
import Lenis from "lenis";

/** Smooth scroll on fine-pointer desktops only — native scroll on mobile. */
export function useSmoothScroll() {
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse), (max-width: 767px)").matches;

    if (reduce || coarse) return;

    const lenis = new Lenis({
      duration: 0.9,
      lerp: 0.09,
      smoothWheel: true,
      touchMultiplier: 1.35,
      wheelMultiplier: 0.95,
      syncTouch: false,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
}
