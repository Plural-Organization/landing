"use client";

import { useEffect, useRef } from "react";

// Feeds the pointer position over the hero into --px / --py (-1..1) on the hero element; the background layers
// turn those into small offsets in CSS. Written once per frame, never through React state.
export default function HeroParallax() {
  const probe = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const hero = probe.current?.parentElement;
    if (!hero || !window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      frame = 0;
      hero.style.setProperty("--px", x.toFixed(3));
      hero.style.setProperty("--py", y.toFixed(3));
    };
    const move = (e: PointerEvent) => {
      const box = hero.getBoundingClientRect();
      x = ((e.clientX - box.left) / box.width) * 2 - 1;
      y = ((e.clientY - box.top) / box.height) * 2 - 1;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const leave = () => { x = 0; y = 0; if (!frame) frame = requestAnimationFrame(apply); };
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", leave);
    return () => { hero.removeEventListener("pointermove", move); hero.removeEventListener("pointerleave", leave); cancelAnimationFrame(frame); };
  }, []);
  return <span ref={probe} hidden />;
}
