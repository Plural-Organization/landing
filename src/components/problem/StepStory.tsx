import type { ReactNode } from "react";
import Orb from "../../islands/Orb";
import Reveal from "../../islands/Reveal";
import { PEOPLE } from "./people";

// The problem section, after boat.dev: the headline and lead, then three cards. Each card is a small pixel scene with
// the agent at its centre as an Orbkit orb in the state that matches the card, a mono caption under the scene, a title
// and two lines of text.

function Person({ who, className }: { who: keyof typeof PEOPLE; className: string }) {
  return (
    <span className={`absolute flex items-center gap-1.5 ${className}`}>
      <span className="size-3 [image-rendering:pixelated]" style={{ background: PEOPLE[who], boxShadow: `0 0 0 2px #0b0b0d, 0 0 0 3px ${PEOPLE[who]}55` }} />
      <span className="rounded-sm px-1 font-mono text-[11px] text-white/80" style={{ background: `${PEOPLE[who]}33` }}>{who}</span>
    </span>
  );
}

function Scene({ children }: { children: ReactNode }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b0b0d] [background-image:radial-gradient(rgb(255_255_255/0.06)_1px,transparent_1.2px)] [background-size:12px_12px]">
      {children}
    </div>
  );
}

const CARDS: { scene: ReactNode; caption: string; title: string; body: string }[] = [
  {
    scene: (
      <Scene>
        <div className="absolute inset-0 grid place-items-center"><Orb kind="plasma" state="speaking" size={150} /></div>
        <Person who="alia" className="top-5 left-5" />
        <Person who="bek" className="top-10 right-5" />
        <Person who="cleo" className="bottom-6 left-8" />
        <span className="absolute right-5 bottom-5 rounded-sm bg-[#2a9d73]/25 px-1.5 font-mono text-[11px] text-[#7fd4b0]">3 in the room</span>
      </Scene>
    ),
    caption: "$ plural join ws://…/r_01M5W7AC",
    title: "Everyone joins the same session",
    body: "Send a link. Teammates open your live session in the terminal or the browser, the way you'd open a shared Google Doc.",
  },
  {
    scene: (
      <Scene>
        <div className="absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2"><Orb kind="led" state="thinking" size={130} /></div>
        <div className="absolute top-6 right-4 bottom-6 w-[52%] space-y-2 rounded-lg border border-white/[0.08] bg-black/60 p-3 font-mono text-[10.5px] leading-snug">
          <p className="text-white/45">13:02 agent › read session.ts</p>
          <p className="text-white/45">13:20 agent › cleared the cookie</p>
          <p className="text-white/70">13:41 agent › cause found</p>
          <p className="pt-1"><b style={{ color: PEOPLE.bek }}>bek</b> <span className="text-white/85">› what did you already try?</span></p>
          <p className="text-[#7fd4b0]">agent is answering…</p>
        </div>
      </Scene>
    ),
    caption: "bek joined late · full history",
    title: "Read every step, then keep going",
    body: "Late joiners scroll back through every reply, tool call and diff. Anyone you let in can prompt the same agent and carry the task on.",
  },
  {
    scene: (
      <Scene>
        <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2"><Orb kind="ascii" state="idle" size={120} /></div>
        <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-3 rounded-lg border border-[#e8b45a]/30 bg-black/70 px-3 py-2 font-mono text-[11px]">
          <span className="truncate text-white/85">edit src/auth/session.ts</span>
          <span className="flex shrink-0 gap-1"><kbd className="rounded-sm bg-white/15 px-1.5 text-white">y</kbd><kbd className="rounded-sm bg-white/10 px-1.5 text-white/50">n</kbd></span>
        </div>
      </Scene>
    ),
    caption: "waiting for alia (host)",
    title: "Writes wait for you",
    body: "The agent runs on your machine with your key. File edits and commands a teammate starts always ask you first.",
  },
];

export default function StepStory() {
  return (
    <section aria-labelledby="problem-title" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
      <Reveal className="reveal">
        <h2 id="problem-title" className="max-w-4xl text-4xl font-medium leading-[1.12] tracking-[-0.022em] md:text-6xl">
          You shouldn&apos;t have to <span className="mark-line" style={{ ["--c" as string]: "#e0623a" }}>retell</span>
          <br />
          <span className="tone-2">what your agent </span><span className="mark-line text-foreground" style={{ ["--c" as string]: "#2a9d73", ["--d" as string]: ".55s" }}>already learned</span><span className="tone-2">.</span>
        </h2>
      </Reveal>
      <p className="mt-6 max-w-[54ch] text-xl leading-relaxed text-muted">
        Plural lets teammates join the same AI agent session live, from their terminal or browser. You start it with{" "}
        <code className="rounded bg-white/10 px-1.5 font-mono text-[0.85em] text-foreground">plural</code> in your project, signed in with Claude Code, Codex or an API key.
      </p>
      <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-6">
        {CARDS.map((c, i) => (
          <Reveal key={c.title} delay={i * 110} className="reveal">
            <article>
              {c.scene}
              <p className="mt-3 truncate font-mono text-xs text-muted">{c.caption}</p>
              <h3 className="mt-5 text-xl font-medium tracking-tight">{c.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{c.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <p className="mt-12 text-sm text-muted">
        …and more: <code className="font-mono text-foreground/80">/brief</code> hands the context to another agent, Spaces lists every session on the team, and two agents editing the same file both get a warning.
      </p>
    </section>
  );
}
