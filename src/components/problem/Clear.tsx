import type { ReactNode } from "react";
import Reveal from "../../islands/Reveal";
import { PEOPLE } from "./people";

// Temporary: four versions of the problem section built to pass a five-second test for someone who has never heard of
// Plural. Each one answers, in order: what it is (a shared, live AI agent session), where it hurts (a moment the reader
// has lived), and how it works (link, read everything, prompt it, host approves writes).

const Section = ({ children }: { children: ReactNode }) => <section aria-labelledby="problem-title" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">{children}</section>;
const H = ({ children }: { children: ReactNode }) => <h2 id="problem-title" className="max-w-4xl text-4xl font-medium leading-[1.05] tracking-[-0.022em] md:text-6xl">{children}</h2>;
const Lead = ({ children }: { children: ReactNode }) => <p className="mt-6 max-w-[56ch] text-xl leading-relaxed text-muted md:text-[1.4rem]">{children}</p>;
const Who = ({ n }: { n: keyof typeof PEOPLE }) => <b className="font-medium" style={{ color: PEOPLE[n] }}>{n}</b>;

// 31. Analogy first, then the morning that shows the pain, then the fix.
export function C31() {
  const steps: [string, ReactNode, string][] = [
    ["Morning", <>
      <Who n="alia" /> fixes a login bug with Claude. Everything the agent tried and found lives in her session.</>, "text-foreground/85"],
    ["Afternoon", <>
      <Who n="bek" /> picks the bug up. He asks in Slack what was tried, waits for <Who n="alia" />, and gets a summary. His own agent starts from zero.</>, "text-muted"],
    ["With Plural", <>
      <Who n="alia" /> sends a link to her session. <Who n="bek" /> reads every step, asks the agent himself, and carries on. Anything it writes waits for <Who n="alia" />&apos;s approval.</>, "text-foreground"],
  ];
  return (
    <Section>
      <H>Share your AI agent session<br /><span className="tone-2">like a Google Doc.</span></H>
      <Lead>Plural lets your team join the session you&apos;re running with Claude, Codex or any model. They see what the agent did and can talk to it too.</Lead>
      <ol className="mt-14 grid gap-8 md:grid-cols-3 md:gap-10">
        {steps.map(([when, text, tone], i) => (
          <Reveal key={when} delay={i * 140} className="reveal">
            <li className={`border-t pt-5 ${i === 2 ? "border-[#2a9d73]" : "border-white/[0.1]"}`}>
              <p className={`text-sm font-medium uppercase tracking-[0.14em] ${i === 2 ? "text-[#7fd4b0]" : "text-muted"}`}>{when}</p>
              <p className={`mt-3 text-xl leading-snug ${tone}`}>{text}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

// 32. Recognition checklist, then one thing that fixes all of it.
export function C32() {
  const pains = [
    "You paste your agent's transcript into Slack so a teammate can catch up.",
    "You share your screen so someone can see what the agent is doing.",
    "A teammate's agent redoes work yours already did.",
    "Agent work shows up in review with no record of how it got there.",
  ];
  return (
    <Section>
      <H>If you work with AI agents on a team,<br /><span className="tone-2">you&apos;ve done all of these.</span></H>
      <ul className="mt-12 max-w-3xl space-y-4">
        {pains.map((p, i) => (
          <Reveal key={p} delay={i * 100} className="reveal"><li className="flex gap-4 text-xl leading-snug text-foreground/85 md:text-2xl"><span className="mt-1.5 size-4 shrink-0 rounded border border-[#e0623a]/70" aria-hidden="true" />{p}</li></Reveal>
        ))}
      </ul>
      <Reveal delay={450} className="reveal mt-14 max-w-3xl border-t border-white/[0.08] pt-8">
        <p className="text-2xl leading-snug md:text-3xl"><span className="text-[#7fd4b0]">Plural is a shared room for one agent session.</span> Teammates open a link, see every message, tool call and code change as it happens, and prompt the agent from their own screen. The person who started it approves anything the agent writes.</p>
      </Reveal>
    </Section>
  );
}

// 33. The question everyone has asked, answered by showing the product in one exchange.
export function C33() {
  return (
    <Section>
      <H>Ever had to explain<br /><span className="tone-2">what your AI agent already did?</span></H>
      <Lead>That explanation happens because the agent&apos;s work lives in one person&apos;s session. Plural puts the session where the whole team can open it.</Lead>
      <div className="mt-14 grid gap-5 md:grid-cols-2">
        <Reveal className="reveal">
          <p className="text-sm uppercase tracking-[0.14em] text-muted">Without Plural</p>
          <div className="mt-3 space-y-2 rounded-3xl border border-border bg-surface p-6 text-lg">
            <p><Who n="bek" /> <span className="text-foreground/85">@alia what did Claude already try?</span></p>
            <p className="text-muted"><Who n="alia" /> one sec, in a call</p>
            <p className="pt-2 text-sm text-[#f0a080]">40 minutes later, a pasted transcript</p>
          </div>
        </Reveal>
        <Reveal className="reveal" delay={140}>
          <p className="text-sm uppercase tracking-[0.14em] text-[#7fd4b0]">In alia&apos;s Plural session</p>
          <div className="mt-3 space-y-2 rounded-3xl border border-[#2a9d73]/30 bg-surface p-6 text-lg">
            <p><Who n="bek" /> <span className="text-foreground/85">what did you already try?</span></p>
            <p className="text-foreground/80"><b className="font-medium text-foreground">Claude</b> cleared the logout cookie, then moved the redirect. The loop comes from the callback cookie.</p>
            <p className="pt-2 text-sm text-[#7fd4b0]">same minute, alia never left her call</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

// 34. Definition up front, three plain capabilities, the pain as the reason.
export function C34() {
  const can: [string, string][] = [
    ["Join", "Send a link. Teammates open your agent session in the terminal or the browser."],
    ["See", "Every message, tool call and code change, live, with the full history for anyone who joins late."],
    ["Prompt", "Anyone you let in can talk to the agent. You approve every file it writes and command it runs."],
  ];
  return (
    <Section>
      <H>Plural turns your AI agent session<br /><span className="tone-2">into a room your team can join.</span></H>
      <Lead>Today the agent&apos;s context stays with whoever started it, and the rest of the team learns about it later, secondhand.</Lead>
      <div className="mt-14 grid gap-10 md:grid-cols-3">
        {can.map(([verb, text], i) => (
          <Reveal key={verb} delay={i * 120} className="reveal">
            <p className="font-display text-4xl font-medium text-[#7fd4b0] md:text-5xl">{verb}</p>
            <p className="mt-3 text-lg leading-snug text-foreground/85">{text}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export const CLEAR = [C31, C32, C33, C34];
