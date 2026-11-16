import type { ReactNode } from "react";

// A window around a capture: three dots and a title, so a screenshot reads as the program it came from.
// `kind` only changes the title's face: the browser shows an address, the terminal a command.
export default function Frame({ title, kind = "browser", className = "", children }: { title: string; kind?: "browser" | "terminal"; className?: string; children: ReactNode }) {
  return (
    <div className={`frame ${className}`}>
      <div className="frame-bar" aria-hidden="true">
        <span className="frame-dots"><i /><i /><i /></span>
        <span className={kind === "browser" ? "frame-url" : "frame-title"}>{title}</span>
      </div>
      {children}
    </div>
  );
}
