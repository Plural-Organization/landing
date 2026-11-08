import type { CSSProperties, ReactNode } from "react";
import Reveal from "../../islands/Reveal";
import LogoMark from "../LogoMark";
import { PEOPLE } from "./people";

// The problem section. The pain drawn as time. Two lanes on one clock (14:20 → 15:01): the Slack thread spreads across all of it,
// with the waits left visibly empty; the room does the same work inside the first three minutes.
// Every positioned element carries --t (0..1 along the 41 minutes); CSS places it on the horizontal axis on wide
// screens and on a vertical one on phones, and a playhead sweeps the lane while events appear as it passes.
const SPAN = 41;
const t = (min: number) => ({ "--t": min / SPAN }) as CSSProperties;
const seg = (a: number, b: number) => ({ "--a": a / SPAN, "--b": b / SPAN }) as CSSProperties;
const TICKS = [0, 10, 20, 30, 40];
const clock = (m: number) => `${14 + Math.floor((20 + m) / 60)}:${String((20 + m) % 60).padStart(2, "0")}`;

function Chip({ who, time, children }: { who: keyof typeof PEOPLE; time: string; children: ReactNode }) {
  return (
    <div className="w-[13.5rem] rounded-2xl border border-white/[0.08] bg-[#17191d] p-3 shadow-[0_20px_40px_-24px_rgb(0_0_0/0.9),inset_0_1px_0_rgb(255_255_255/0.05)]">
      <div className="flex items-center gap-2 text-[13px]">
        <span className="grid size-5 place-items-center rounded-md text-[10px] font-semibold text-white" style={{ background: PEOPLE[who] }}>{who[0]!.toUpperCase()}</span>
        <b className="font-semibold">{who}</b>
        <span className="font-mono text-[11px] text-white/40">{time}</span>
      </div>
      <div className="mt-1.5 text-[13.5px] leading-snug text-white/80">{children}</div>
    </div>
  );
}

function Grid() {
  return <>{TICKS.map((m) => <span key={m} aria-hidden="true" className="tl-grid" style={t(m)} />)}</>;
}

function Lane({ label, dot, total, tone, children }: { label: ReactNode; dot: string; total: number; tone: string; children: ReactNode }) {
  return (
    <div className="grid gap-4 md:grid-cols-[10rem_1fr] md:gap-8">
      <div className="md:pt-6">
        <p className="flex items-center gap-2 text-sm text-muted"><span className="size-1.5 rounded-full" style={{ background: dot }} />{label}</p>
        <p className="mt-2 font-display text-5xl font-medium tracking-[-0.03em] md:text-6xl" style={{ color: tone }}>
          <span className="elapsed" style={{ "--to": total } as CSSProperties} /><span className="ml-1 text-2xl text-muted md:text-3xl">min</span>
        </p>
      </div>
      <div className="tl-track">
        <Grid />
        {children}
        <span aria-hidden="true" className="tl-head"><i /></span>
      </div>
    </div>
  );
}

export default function V6Timeline() {
  return (
    <section aria-labelledby="problem-title" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-36">
      <div className="max-w-3xl">
        <h2 id="problem-title" className="text-4xl font-medium leading-[1.05] tracking-[-0.022em] md:text-[3.4rem]">
          Forty minutes in Slack<br /><span className="tone-2">for one answer.</span>
        </h2>
        <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted">
          The context already exists in alia&apos;s agent session. Getting it to bek, and to his agent, is the slow part.
        </p>
      </div>

      {/* Double bezel: a thin outer tray holding the figure's core. */}
      <Reveal className="reveal mt-14 rounded-[2rem] border border-white/[0.08] bg-white/[0.02] p-2">
        <figure className="rounded-[calc(2rem-0.5rem)] bg-[#0b0b0d] px-5 py-8 shadow-[inset_0_1px_0_rgb(255_255_255/0.06)] md:px-10 md:py-10"
          aria-label="Asking in Slack takes 41 minutes and bek's agent still has no context; in a Plural room the same question is answered and the fix approved within 3 minutes.">
          {/* Clock axis, shared by both lanes. */}
          <div className="mb-2 hidden md:grid md:grid-cols-[10rem_1fr] md:gap-8">
            <span />
            <div className="relative h-5">
              {TICKS.map((m) => <span key={m} className="tl-tick font-mono text-[11px] text-white/35" style={t(m)}>{clock(m)}</span>)}
            </div>
          </div>

          <div className="space-y-10 md:space-y-2">
            <Lane label="Asking in Slack" dot="#e0623a" total={41} tone="#f0a080">
              <span className="tl-line bg-white/10" />
              <span className="tl-seg tl-wait" style={seg(0, 14)} />
              <span className="tl-seg tl-wait" style={seg(14, 31)} />
              <span className="tl-gap" style={t(7)}>14 min</span>
              <span className="tl-gap" style={t(22.5)}>17 min</span>
              {[0, 14, 31, 41].map((m) => <span key={m} className="tl-dot bg-[#e0623a]" style={t(m)} />)}
              <div className="tl-ev up" style={t(0)}><Chip who="bek" time="14:20">@alia what did Claude already try for the redirect?</Chip></div>
              <div className="tl-ev down" style={t(14)}><Chip who="alia" time="14:34">one sec, in a call</Chip></div>
              <div className="tl-ev up" style={t(31)}>
                <Chip who="alia" time="14:51"><span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-2 py-1 font-mono text-[11.5px] text-white/60">claude-transcript.txt · 412 lines</span></Chip>
              </div>
              <div className="tl-ev down end" style={t(41)}><Chip who="alia" time="15:01">I think the cookie? not sure anymore</Chip></div>
            </Lane>

            <Lane label={<span className="flex items-center gap-1.5"><LogoMark size={13} /> In a Plural room</span>} dot="#2a9d73" total={3} tone="#7fd4b0">
              <span className="tl-line bg-white/[0.06]" />
              <span className="tl-seg tl-done" style={seg(0, 3)} />
              <span className="tl-dot bg-[#2a9d73]" style={t(0)} />
              <span className="tl-dot tl-check" style={t(3)}>✓</span>
              <div className="tl-ev up" style={t(0)}>
                <div className="w-[17.5rem] rounded-2xl border border-white/[0.08] bg-[#111214] p-3.5 font-mono text-[12px] leading-relaxed shadow-[0_20px_40px_-24px_rgb(0_0_0/0.9),inset_0_1px_0_rgb(255_255_255/0.05)]">
                  <p><b style={{ color: PEOPLE.bek }}>bek</b> › what did you already try?</p>
                  <p className="text-white/75"><b className="text-white">agent</b> › loop is <span className="rounded bg-white/10 px-1">SameSite=Strict</span> on the callback</p>
                  <p><b style={{ color: PEOPLE.bek }}>bek</b> › set it to Lax, add a test</p>
                  <p className="text-white/75"><b style={{ color: PEOPLE.alia }}>alia</b> › y <span className="text-white/40">· approved the write</span></p>
                </div>
              </div>
              <div className="tl-ev down" style={t(3)}><span className="whitespace-nowrap font-mono text-xs text-[#7fd4b0]">fixed · 14:23</span></div>
              <span className="tl-note" style={t(24)}>alia never left her call</span>
            </Lane>
          </div>
        </figure>
      </Reveal>
    </section>
  );
}
