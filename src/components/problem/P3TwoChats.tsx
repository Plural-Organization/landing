import type { ReactNode } from "react";
import Reveal from "../../islands/Reveal";
import { PEOPLE } from "./people";

// Variant 3: the same question in two small chats. One ends in waiting, the other in an answer.
function Line({ who, children, dim }: { who: keyof typeof PEOPLE | "agent"; children: ReactNode; dim?: boolean }) {
  const color = who === "agent" ? "#f4f4f5" : PEOPLE[who];
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg text-xs font-semibold" style={{ background: who === "agent" ? "#27272a" : color, color: who === "agent" ? "#f4f4f5" : "#fff" }}>{who === "agent" ? "AI" : who[0]!.toUpperCase()}</span>
      <p className={`text-[16px] leading-relaxed ${dim ? "text-muted" : "text-foreground/90"}`}><b className="font-semibold text-foreground">{who}</b><br />{children}</p>
    </div>
  );
}

export default function P3TwoChats() {
  return (
    <section aria-labelledby="problem-title" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
      <h2 id="problem-title" className="mx-auto max-w-3xl text-center text-4xl font-medium leading-[1.05] tracking-[-0.022em] md:text-6xl">
        Same question.<br /><span className="tone-2">Very different afternoon.</span>
      </h2>
      <div className="mx-auto mt-16 grid max-w-4xl gap-5 md:grid-cols-2">
        <Reveal className="reveal">
          <p className="mb-3 text-sm text-muted">Asking a teammate in Slack</p>
          <div className="space-y-5 rounded-3xl border border-border bg-surface p-6">
            <Line who="bek">what did Claude already try for the login redirect?</Line>
            <Line who="alia" dim>one sec, in a call</Line>
            <p className="border-t border-dashed border-white/10 pt-4 text-center font-mono text-xs uppercase tracking-wider text-[#f0a080]">40 minutes later</p>
            <Line who="alia" dim>I think it was the cookie? not sure anymore</Line>
          </div>
        </Reveal>
        <Reveal className="reveal" delay={140}>
          <p className="mb-3 text-sm text-foreground">Asking the agent in alia&apos;s Plural room</p>
          <div className="space-y-5 rounded-3xl border border-[#2a9d73]/30 bg-surface p-6">
            <Line who="bek">what did you already try for the login redirect?</Line>
            <Line who="agent">Cleared the logout cookie, then moved the redirect after auth. The loop is <span className="rounded bg-white/10 px-1 font-mono text-[14px]">SameSite=Strict</span> on the callback cookie.</Line>
            <p className="border-t border-dashed border-white/10 pt-4 text-center font-mono text-xs uppercase tracking-wider text-[#7fd4b0]">same minute · alia never left her call</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
