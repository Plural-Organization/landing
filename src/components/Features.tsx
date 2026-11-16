import { Chip } from "@heroui/react";
import { LockSimple } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import type { ReactNode } from "react";
import Reveal from "../islands/Reveal";
import SectionHeading from "./SectionHeading";

// Every tile but one is a real capture of the product, taken at 2x from one staged session (Alia, Bek and Cleo on the
// same repository), so the tiles tell one story. The key tile is drawn: there is nothing on screen to capture, and
// that is the point of it.
function Key() {
  return (
    <div className="w-full max-w-xs rounded-2xl bg-surface-secondary p-4">
      <div className="flex items-center gap-2 text-sm font-medium">
        <LockSimple size={16} /> ANTHROPIC_API_KEY
      </div>
      <p className="mt-2 font-mono text-xs text-muted">stays on alia&apos;s machine</p>
      <div className="mt-3 flex gap-1.5">
        <Chip size="sm" variant="soft">host · alia</Chip>
        <Chip size="sm" variant="soft">guests · 0 keys</Chip>
      </div>
    </div>
  );
}

type Shot = { src: string; alt: string; width: number; height: number; fit?: "phone" | "contain"; terminal?: boolean };
type Tile = { title: string; body: string; tag: string; span: 2 | 3 | 4; shot?: Shot; preview?: ReactNode };

const SPAN = { 2: "md:col-span-2", 3: "md:col-span-3", 4: "md:col-span-4" };
const SIZES = { 2: "(min-width: 1152px) 340px, (min-width: 768px) 30vw, 92vw", 3: "(min-width: 1152px) 540px, (min-width: 768px) 46vw, 92vw", 4: "(min-width: 1152px) 720px, (min-width: 768px) 62vw, 92vw" };

const TILES: Tile[] = [
  {
    tag: "Control", span: 4,
    title: "Writes wait for the host", body: "Reads are free. Every write and shell command asks the host first, and a guest's run can never be waved through by a rule.",
    shot: { src: "/shots/approval.png", width: 1604, height: 944, alt: "Bek's prompt asks the agent to apply the fix. A card asks the host: the agent asks to use edit on src/auth/session.ts. Buttons: Allow once, For the session, Reject, Block." },
  },
  {
    tag: "Any device", span: 2,
    title: "Join from a phone", body: "Open the room link in any browser, type a name and you are in. Same session, same diff, no install.",
    shot: { src: "/shots/phone-room.png", width: 780, height: 1688, fit: "phone", alt: "The same room on a phone: Bek's prompt, the diff of the edit, the host's approval and the agent's summary." },
  },
  {
    tag: "Keys", span: 2,
    title: "Your key stays on your machine", body: "The agent runs with the host's key or login. Nobody else receives it.",
    preview: <Key />,
  },
  {
    tag: "Teams", span: 4,
    title: "Several rooms, one team", body: "When everyone runs their own agent, the team's rooms sit in one list. Open a teammate's room to read it live from the first message, and ask the host when you want to write.",
    shot: { src: "/shots/team-watch.png", width: 2224, height: 844, alt: "The team Backend in the web client: rooms of Alia, Bek and Cleo in the left rail. Bek's room is open as a viewer; his agent waits for the host's permission to edit src/auth/session.ts." },
  },
  {
    tag: "Teams", span: 4,
    title: "Catch the same file twice", body: "Two agents changed one file? The approval card says who, when and on which branch, before the edit lands. Nothing is blocked.",
    shot: { src: "/shots/same-file.png", width: 1604, height: 864, alt: "An approval card in Bek's room with a warning: src/auth/session.ts was also changed by Alia moments ago on fix/login-redirect." },
  },
  {
    tag: "Teams", span: 2,
    title: "See who needs a person", body: "Working, idle, or waiting on its host: the status of every room, next to the agent that runs it.",
    shot: { src: "/shots/team-rail.png", width: 578, height: 584, fit: "contain", alt: "The team rail: Alia idle, Bek marked as waiting for a person, Cleo working." },
  },
  {
    tag: "Shared context", span: 3,
    title: "Hand context to another agent", body: "/ask @bek, and Bek's agent writes a short briefing of its session for yours, across models. Nothing reaches your agent until you give it.",
    shot: { src: "/shots/terminal-briefing.png", width: 1416, height: 750, terminal: true, alt: "The terminal client showing an answer from Bek's session: goal, what is done, what is in progress, and a warning that both agents touch the same file. Actions: copy, give to my agent." },
  },
  {
    tag: "Commands", span: 3,
    title: "Everything is a slash away", body: "Invite, switch who may prompt, ask to write, open a shared board, import a chat from Claude or ChatGPT. The same commands in the browser and the terminal.",
    shot: { src: "/shots/commands.png", width: 1604, height: 988, alt: "The command list above the composer: /help, /who, /draw, /team, /invite, /import, /brief, /access, /preview, /kick, each with a one-line description." },
  },
];

export default function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 md:py-24">
      <SectionHeading id="features-title" lead="Talk through the agent," tail="not around it.">
        One room when you work on one thing together. A team of rooms when everyone runs their own agent. The context stays where the whole team can reach it.
      </SectionHeading>
      <div className="mt-14 grid gap-4 md:grid-cols-6">
        {TILES.map((t, i) => (
          <Reveal key={t.title} delay={(i % 2) * 70} className={`reveal ${SPAN[t.span]}`}>
            <article className="tile flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface">
              {t.shot ? (
                <div className={`flex flex-1 items-center justify-center p-4 sm:p-5 ${t.shot.fit === "phone" ? "pb-0" : ""}`}>
                  <Image
                    src={t.shot.src} alt={t.shot.alt} width={t.shot.width} height={t.shot.height} quality={90}
                    sizes={t.shot.fit === "phone" ? "260px" : t.shot.fit === "contain" ? "290px" : SIZES[t.span]}
                    className={
                      t.shot.fit === "phone" ? "h-auto max-h-[25rem] w-auto max-w-[260px] rounded-t-[1.75rem] border border-b-0 border-border object-cover object-top"
                      : t.shot.fit === "contain" ? "h-auto w-full max-w-[290px] rounded-2xl border border-border"
                      : `h-auto w-full rounded-2xl border border-border ${t.shot.terminal ? "bg-black" : ""}`
                    }
                  />
                </div>
              ) : (
                <div className="flex min-h-40 flex-1 items-center justify-center p-5 sm:min-h-56 sm:p-6" aria-hidden="true" inert>
                  {t.preview}
                </div>
              )}
              <div className="px-6 pt-1 pb-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{t.tag}</p>
                <h3 className="mt-2 text-lg font-medium tracking-tight">{t.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-muted text-pretty">{t.body}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
