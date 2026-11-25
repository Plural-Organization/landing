"use client";

import { useEffect, useRef } from "react";

// Brings the release timeline to life without moving anything by hand: each release's version and date stay
// beside you while you read it (sticky, in CSS), and this marks which release you are on, fills the line down
// to it and lights its entry in the list on the left. Metas that slide up under the bar fade instead of showing
// through it. One pass per animation frame, only while scrolling.
const BAR = 96; // the sticky site bar, in px from the top
const FADE = 40;

export default function UpdatesTimeline() {
  const line = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progress = line.current;
    const timeline = progress?.parentElement;
    if (!progress || !timeline) return;
    const entries = [...timeline.querySelectorAll<HTMLElement>(".upd-entry")];
    const links = new Map([...document.querySelectorAll<HTMLAnchorElement>(".upd-toc-link")].map((link) => [link.hash.slice(1), link]));
    let active = -1;
    let frame = 0;

    const centerOf = (entry: HTMLElement | undefined): number | null => {
      const marker = entry?.querySelector(".upd-marker");
      if (!marker) return null;
      const box = marker.getBoundingClientRect();
      return box.top + box.height / 2 - timeline.getBoundingClientRect().top;
    };

    const update = () => {
      frame = 0;
      const probe = window.innerHeight * 0.42;
      let next = 0;
      entries.forEach((entry, index) => {
        if (entry.getBoundingClientRect().top <= probe) next = index;
      });
      if (next !== active) {
        const before = entries[active];
        before?.removeAttribute("data-active");
        if (before) links.get(before.id)?.removeAttribute("aria-current");
        active = next;
        entries[active]?.setAttribute("data-active", "");
        links.get(entries[active]?.id ?? "")?.setAttribute("aria-current", "true");
      }
      const start = centerOf(entries[0]);
      const end = centerOf(entries[active]);
      if (start !== null && end !== null) {
        progress.style.top = `${start}px`;
        progress.style.height = `${Math.max(0, end - start)}px`;
      }
      for (const entry of entries) {
        const meta = entry.querySelector<HTMLElement>(".upd-meta");
        if (!meta) continue;
        const top = meta.getBoundingClientRect().top;
        meta.style.opacity = top < BAR ? String(Math.max(0, (top - BAR + FADE) / FADE)) : "";
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={line} className="upd-progress" aria-hidden="true" />;
}
