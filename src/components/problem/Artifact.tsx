import { LockSimple, Warning } from "@phosphor-icons/react/dist/ssr";
import { PEOPLE } from "./people";

// Small real-looking objects that sit above each before/after column: the thing the reader recognises from their day.
export type ArtifactSpec =
  | { kind: "slack"; who: keyof typeof PEOPLE; text: string; time?: string }
  | { kind: "file"; name: string; meta: string }
  | { kind: "link"; text: string }
  | { kind: "room"; lines: [keyof typeof PEOPLE | "agent", string][] }
  | { kind: "warn"; text: string }
  | { kind: "approve"; text: string }
  | { kind: "key"; text: string }
  | { kind: "spaces"; rows: [keyof typeof PEOPLE, string, string][] };

const tile = "w-full max-w-md rounded-2xl border border-white/[0.08] bg-surface px-4 py-3";

export default function Artifact({ a }: { a: ArtifactSpec }) {
  switch (a.kind) {
    case "slack":
      return (
        <div className={`${tile} flex gap-3 bg-[#1a1d21]`}>
          <span className="grid size-8 shrink-0 place-items-center rounded-lg text-sm font-semibold text-white" style={{ background: PEOPLE[a.who] }}>{a.who[0]!.toUpperCase()}</span>
          <p className="text-[15px] leading-snug text-white/85"><b className="font-semibold text-white">{a.who}</b> {a.time && <span className="ml-1 text-xs text-white/40">{a.time}</span>}<br />{a.text}</p>
        </div>
      );
    case "file":
      return (
        <div className={`${tile} flex items-center justify-between font-mono text-[13px]`}>
          <span className="text-foreground/80">{a.name}</span><span className="text-muted">{a.meta}</span>
        </div>
      );
    case "link":
      return <div className={`${tile} font-mono text-[13px] text-[#7fd4b0]`}><span className="text-muted">$ </span>{a.text}</div>;
    case "room":
      return (
        <div className={`${tile} space-y-1 font-mono text-[13px] leading-relaxed`}>
          {a.lines.map(([who, text], i) => (
            <p key={i} className={who === "agent" ? "text-foreground/75" : "text-foreground/90"}>
              <b style={{ color: who === "agent" ? "var(--foreground)" : PEOPLE[who] }}>{who}</b> › {text}
            </p>
          ))}
        </div>
      );
    case "warn":
      return <div className={`${tile} flex items-start gap-2 text-[14px] text-[#e8b45a]`}><Warning size={16} className="mt-0.5 shrink-0" />{a.text}</div>;
    case "approve":
      return (
        <div className={`${tile} flex items-center justify-between gap-3 font-mono text-[13px]`}>
          <span className="text-foreground/85">{a.text}</span>
          <span className="flex gap-1"><kbd className="rounded bg-white/10 px-1.5 text-foreground">y</kbd><kbd className="rounded bg-white/10 px-1.5 text-muted">n</kbd></span>
        </div>
      );
    case "key":
      return <div className={`${tile} flex items-center gap-2 font-mono text-[13px] text-foreground/85`}><LockSimple size={15} />{a.text}</div>;
    case "spaces":
      return (
        <div className={`${tile} space-y-1.5 text-[13px]`}>
          {a.rows.map(([who, task, state]) => (
            <p key={who} className="flex items-center gap-2">
              <span className="size-2 rounded-full" style={{ background: PEOPLE[who] }} />
              <b className="font-medium">{who}</b><span className="truncate text-muted">{task}</span>
              <span className={`ml-auto shrink-0 font-mono text-[11px] ${state === "waiting" ? "text-[#e8b45a]" : "text-[#7fd4b0]"}`}>{state}</span>
            </p>
          ))}
        </div>
      );
  }
}
