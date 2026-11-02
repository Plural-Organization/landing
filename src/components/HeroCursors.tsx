import type { CSSProperties } from "react";

// Decorative: the people of a room moving around behind the headline, the way cursors do in a shared document.
const PEOPLE = [
  { name: "alia", color: "#e0623a", slot: "a" },
  { name: "bek", color: "#2a9d73", slot: "b" },
  { name: "cleo", color: "#3b6cf4", slot: "c" },
  { name: "vlad · host", color: "#191919", slot: "d" },
] as const;

export default function HeroCursors() {
  return (
    <div className="hero-cursors" aria-hidden="true">
      {PEOPLE.map((person) => (
        <span key={person.slot} className={`mc mc-${person.slot}`} style={{ "--c": person.color } as CSSProperties}>
          <svg viewBox="0 0 16 22" width="16" height="22">
            <path d="M1.5 1.2v17.1l4.6-4.3 3.2 7.2 2.9-1.3-3.2-7 6.3-.3L1.5 1.2Z" fill="currentColor" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
          <i>{person.name}</i>
        </span>
      ))}
    </div>
  );
}
