"use client";

import { useEffect, useState, type CSSProperties } from "react";

// A tile set into the headline whose glyph changes every few seconds or on click, after heroui.com's hero.
// Two sets: the models Plural drives, and the people in a room.
const PROVIDERS = [
  { id: "claude", label: "Claude", color: "#d97757" },
  { id: "openai", label: "OpenAI", color: "#f4f4f5" },
  { id: "gemini", label: "Gemini", color: "#5b8def" },
  { id: "ollama", label: "Ollama", color: "#e4e4e7" },
  { id: "openrouter", label: "OpenRouter", color: "#7c7cf5" },
];

const PEOPLE = [
  { name: "alia", color: "#e0623a" },
  { name: "bek", color: "#2a9d73" },
  { name: "cleo", color: "#3b6cf4" },
  { name: "vlad", color: "#a1a1aa" },
  { name: "tamir", color: "#d9a03f" },
];

export default function HeroSlot({ set, delay = 0, tilt = -8 }: { set: "providers" | "people"; delay?: number; tilt?: number }) {
  const count = set === "providers" ? PROVIDERS.length : PEOPLE.length;
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => setActive((i) => (i + 1) % count), 2600);
    }, delay);
    return () => { window.clearTimeout(start); window.clearInterval(timer); };
  }, [count, delay]);

  return (
    <span className={`hero-slot${set === "people" ? " hero-slot--wide" : ""}`} style={{ "--slot-tilt": `${tilt}deg` } as CSSProperties}>
      {" "}
      <button type="button" tabIndex={-1} aria-hidden="true" className="hero-slot__tile" onClick={() => setActive((i) => (i + 1) % count)}>
        {set === "providers"
          ? PROVIDERS.map((p, i) => (
              <span key={p.id} className="hero-slot__layer" data-active={i === active}>
                <span className="hero-slot__glyph" style={{ "--glyph": `url(/providers/${p.id}.svg)`, "--glyph-fill": p.color } as CSSProperties} />
              </span>
            ))
          : PEOPLE.map((p, i) => (
              <span key={p.name} className="hero-slot__layer" data-active={i === active}>
                <span className="hero-slot__cursor" style={{ "--c": p.color } as CSSProperties}>
                  <svg viewBox="0 0 16 22"><path d="M1.5 1.2v17.1l4.6-4.3 3.2 7.2 2.9-1.3-3.2-7 6.3-.3L1.5 1.2Z" fill="var(--c)" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" /></svg>
                  <i>{p.name}</i>
                </span>
              </span>
            ))}
      </button>
    </span>
  );
}
