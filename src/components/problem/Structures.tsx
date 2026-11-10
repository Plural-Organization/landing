import type { ReactNode } from "react";
import Reveal from "../../islands/Reveal";
import { PEOPLE } from "./people";

// Temporary: the problem section in ten different structures, from a brainstorm with Codex (hooks merged and critiqued
// across both lists). Same rules as the before/after copies: no contrast reveals, no negation lists, no em dashes,
// no invented stats, every claim something Plural does.

function Frame({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return <section aria-labelledby="problem-title" className={`mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32 ${center ? "text-center" : ""}`}>{children}</section>;
}
const H = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <h2 id="problem-title" className={`max-w-4xl text-4xl font-medium leading-[1.05] tracking-[-0.022em] md:text-6xl ${className}`}>{children}</h2>
);
const Sub = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <p className={`mt-6 max-w-[54ch] text-xl leading-relaxed text-muted ${className}`}>{children}</p>
);
const Turn = ({ children }: { children: ReactNode }) => (
  <p className="mt-12 max-w-[56ch] border-t border-white/[0.08] pt-8 text-xl leading-relaxed md:text-2xl"><span className="text-[#7fd4b0]">In a Plural room </span>{children}</p>
);

// 21. Provocative observation
export function S21() {
  return (
    <Frame>
      <H>Your agent knows more<br /><span className="tone-2">than your team does.</span></H>
      <Sub>Its decisions, failed attempts, tool calls and diffs stay in one person&apos;s session. Everyone else works from a summary.</Sub>
      <Turn>the team watches the same session and prompts the same agent.</Turn>
    </Frame>
  );
}

// 22. Cause and consequence, as a chain
export function S22() {
  const chain = ["A transcript gets shortened.", "A Slack message leaves out the path.", "The next agent starts with part of the story."];
  return (
    <Frame>
      <H>Every handoff leaks<br /><span className="tone-2">what the agent learned.</span></H>
      <ol className="mt-12 space-y-4">
        {chain.map((c, i) => (
          <Reveal key={c} delay={i * 140} className="reveal"><li className="flex items-baseline gap-5 text-2xl text-foreground/85 md:text-3xl"><span className="font-mono text-base text-[#f0a080]">{i === 0 ? "↓" : "↓"}</span>{c}</li></Reveal>
        ))}
      </ol>
      <Turn>you send the room link, and the next person reads the session itself.</Turn>
    </Frame>
  );
}

// 23. Team snapshot
export function S23() {
  const team: [keyof typeof PEOPLE, string, string][] = [["alia", "Claude", "checkout-api · fix/login"], ["bek", "Codex", "checkout-api · feat/v2"], ["cleo", "Gemini", "web · onboarding"], ["vlad", "Claude", "infra · deploy"]];
  return (
    <Frame>
      <H>Five people, five agents,<br /><span className="tone-2">and nobody sees the others.</span></H>
      <ul className="mt-12 max-w-2xl divide-y divide-white/[0.07] border-y border-white/[0.07]">
        {team.map(([who, agent, where], i) => (
          <Reveal key={who} delay={i * 90} className="reveal">
            <li className="flex items-center gap-4 py-4 text-lg"><span className="size-2.5 rounded-full" style={{ background: PEOPLE[who] }} /><b className="w-14 font-medium">{who}</b><span className="w-20 text-muted">{agent}</span><span className="truncate font-mono text-sm text-muted">{where}</span><span className="ml-auto font-mono text-xs text-muted">private</span></li>
          </Reveal>
        ))}
      </ul>
      <Turn>one list shows every session, and you can open any of them and watch.</Turn>
    </Frame>
  );
}

// 24. Bottleneck diagnosis
export function S24() {
  const jobs = ["They answer what the agent already tried.", "They explain why it changed course.", "They write every handoff by hand."];
  return (
    <Frame>
      <H>The bottleneck on your team<br /><span className="tone-2">is whoever holds the context.</span></H>
      <ul className="mt-12 space-y-4">
        {jobs.map((j, i) => <Reveal key={j} delay={i * 120} className="reveal"><li className="text-2xl text-foreground/85 md:text-3xl">{j}</li></Reveal>)}
      </ul>
      <Turn>those questions go to the agent, and the person who ran it keeps working.</Turn>
    </Frame>
  );
}

// 25. Dialogue
export function S25() {
  const lines: [keyof typeof PEOPLE, string, string][] = [["bek", "14:20", "wait, what did Claude already try?"], ["alia", "14:34", "one sec, in a call"], ["alia", "14:51", "I'll paste the relevant parts"], ["bek", "14:58", "which part was the fix?"]];
  return (
    <Frame>
      <H>&ldquo;Wait, what did Claude<br /><span className="tone-2">already try?&rdquo;</span></H>
      <div className="mt-12 max-w-xl space-y-5">
        {lines.map(([who, time, text], i) => (
          <Reveal key={i} delay={i * 220} className="reveal">
            <p className="text-xl md:text-2xl"><b className="font-medium" style={{ color: PEOPLE[who] }}>{who}</b> <span className="font-mono text-xs text-muted">{time}</span><br /><span className="text-foreground/85">{text}</span></p>
          </Reveal>
        ))}
      </div>
      <Turn>bek asks the agent that tried it, and it answers from its own history.</Turn>
    </Frame>
  );
}

// 26. Review paradox, two lines
export function S26() {
  return (
    <Frame>
      <H>You can&apos;t review<br /><span className="tone-2">what you never saw.</span></H>
      <div className="mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
        <Reveal className="reveal"><p className="text-sm uppercase tracking-[0.14em] text-muted">The pull request shows</p><p className="mt-3 text-3xl md:text-4xl">what changed.</p></Reveal>
        <Reveal className="reveal" delay={140}><p className="text-sm uppercase tracking-[0.14em] text-muted">The session shows</p><p className="mt-3 text-3xl text-[#7fd4b0] md:text-4xl">every prompt, tool call and decision behind it.</p></Reveal>
      </div>
      <Turn>the session happens where the team can watch it, and stays there to read.</Turn>
    </Frame>
  );
}

// 27. Manifesto line
export function S27() {
  return (
    <Frame center>
      <H className="mx-auto md:text-7xl">Put the conversation<br /><span className="tone-2">where the agent can hear it.</span></H>
      <Sub className="mx-auto">Decide by prompting the agent in a shared room. Every teammate&apos;s prompt carries their name, and the agent works from all of them.</Sub>
    </Frame>
  );
}

// 28. Two-part promise
export function S28() {
  const lines = ["Teammates join by link and prompt from their own screen.", "Every write and command waits for the host to approve.", "The API key never leaves the host's machine."];
  return (
    <Frame>
      <H>Share the session.<br /><span className="tone-2">Keep the keys.</span></H>
      <ul className="mt-12 space-y-4">
        {lines.map((l, i) => <Reveal key={l} delay={i * 120} className="reveal"><li className="text-2xl text-foreground/85 md:text-3xl">{l}</li></Reveal>)}
      </ul>
    </Frame>
  );
}

// 29. Comparison table
export function S29() {
  const rows: [string, string, boolean][] = [["The agent session", "the full working context, for one person", false], ["Slack and DMs", "a human summary, written later", false], ["The pull request", "the final changes", false], ["A Plural room", "the full session, for everyone you let in", true]];
  return (
    <Frame>
      <H>One task,<br /><span className="tone-2">four different views of it.</span></H>
      <table className="mt-12 w-full max-w-4xl text-left">
        <thead><tr className="text-sm uppercase tracking-[0.14em] text-muted"><th className="pb-4 font-medium">Where</th><th className="pb-4 font-medium">What the team gets</th></tr></thead>
        <tbody className="divide-y divide-white/[0.07] border-t border-white/[0.07]">
          {rows.map(([where, what, plural]) => (
            <tr key={where} className={plural ? "text-[#7fd4b0]" : ""}><td className="py-5 pr-6 text-xl md:text-2xl">{where}</td><td className={`py-5 text-xl md:text-2xl ${plural ? "" : "text-muted"}`}>{what}</td></tr>
          ))}
        </tbody>
      </table>
    </Frame>
  );
}

// 30. Repetition pattern
export function S30() {
  return (
    <Frame>
      <H className="md:text-[5.5rem]">Explain. Paste.<br /><span className="tone-2">Rephrase. Repeat.</span></H>
      <Sub>That is how context moves between people and agents today. Each handoff drops part of the path that produced the answer.</Sub>
      <Turn>everyone reads the path itself, and a briefing carries it to the next agent.</Turn>
    </Frame>
  );
}

export const STRUCTURES = [S21, S22, S23, S24, S25, S26, S27, S28, S29, S30];
