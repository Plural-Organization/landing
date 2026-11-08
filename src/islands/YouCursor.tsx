"use client";

import { useEffect, useRef } from "react";

// The visitor joins the room: a "you · guest" tag rides next to the pointer while it is over the hero.
// Position is written straight to the element's transform, never through React state.
export default function YouCursor() {
  const tag = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = tag.current;
    const area = el?.parentElement;
    if (!el || !area || !window.matchMedia("(pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      const box = area.getBoundingClientRect();
      el.style.transform = `translate(${e.clientX - box.left + 14}px, ${e.clientY - box.top + 18}px)`;
      el.style.opacity = "1";
    };
    const leave = () => { el.style.opacity = "0"; };
    area.addEventListener("pointermove", move);
    area.addEventListener("pointerleave", leave);
    return () => { area.removeEventListener("pointermove", move); area.removeEventListener("pointerleave", leave); };
  }, []);
  return (
    <div ref={tag} aria-hidden="true" className="pointer-events-none absolute top-0 left-0 z-20 rounded-full bg-[#d9a03f] px-2.5 py-1 font-mono text-[11px] font-semibold text-white opacity-0 shadow-[0_4px_12px_-4px_rgb(0_0_0/0.6)] transition-opacity duration-200">
      you · guest
    </div>
  );
}
