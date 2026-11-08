import { Alert, Avatar, Button, Chip, Kbd } from "@heroui/react";
import { ArrowRight, FileTs, LockSimple } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";
import Reveal from "../islands/Reveal";
import SectionHeading from "./SectionHeading";

// Each tile shows the feature as the product shows it, built from real HeroUI components with the demo team
// (Alia, Bek and Cleo from the hero scene). Display only: the controls inside are inert.
const team = [
  { name: "Alia", agent: "Claude", color: "#e0623a", task: "Tracing the login redirect", state: "Needs you" },
  { name: "Bek", agent: "Codex", color: "#2a9d73", task: "Updating the checkout client", state: "Working" },
  { name: "Cleo", agent: "Gemini", color: "#3b6cf4", task: "Reviewing the regression tests", state: "Working" },
];

function Face({ name, color, size = "sm" }: { name: string; color: string; size?: "sm" | "md" }) {
  return (
    <Avatar size={size}>
      <Avatar.Fallback style={{ background: color, color: "#fff" }}>{name[0]}</Avatar.Fallback>
    </Avatar>
  );
}

function Sessions() {
  return (
    <ul className="w-full max-w-sm space-y-2">
      {team.map((p) => (
        <li key={p.name} className="flex items-center gap-3 rounded-2xl bg-surface-secondary px-3 py-2.5">
          <Face name={p.name} color={p.color} />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">{p.name} <span className="text-muted">· {p.agent}</span></p>
            <p className="truncate text-xs text-muted">{p.task}</p>
          </div>
          <Chip size="sm" variant="soft" color={p.state === "Needs you" ? "warning" : "success"}>{p.state}</Chip>
        </li>
      ))}
    </ul>
  );
}

function Live() {
  return (
    <div className="w-full max-w-sm rounded-2xl bg-surface-secondary p-4">
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {team.map((p) => <Face key={p.name} name={p.name} color={p.color} />)}
        </div>
        <span className="text-xs text-muted">3 in the room</span>
      </div>
      <div className="mt-4 space-y-2 font-mono text-[12px]">
        <p className="text-muted"><span style={{ color: "#2a9d73" }}>bek</span> › check the retry path in checkout.ts</p>
        <p className="text-muted"><span className="text-foreground">agent</span> › reading src/api/checkout.ts</p>
      </div>
    </div>
  );
}

function Briefing() {
  return (
    <div className="w-full max-w-sm rounded-2xl bg-surface-secondary p-4">
      <div className="flex items-center gap-2 text-xs text-muted">
        <Face name="Alia" color="#e0623a" />
        <span>Claude</span>
        <ArrowRight size={14} />
        <Face name="Cleo" color="#3b6cf4" />
        <span>Gemini</span>
      </div>
      <p className="mt-3 text-sm font-medium">Briefing: login redirect</p>
      <p className="mt-1 text-xs leading-relaxed text-muted">Goal, files touched, decisions so far and the open question, ready to import.</p>
      <Button size="sm" className="pointer-events-none mt-3">Import briefing</Button>
    </div>
  );
}

function Overlap() {
  return (
    <Alert status="warning" className="w-full max-w-sm">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>Same file in two sessions</Alert.Title>
        <Alert.Description className="flex items-center gap-1.5">
          <FileTs size={14} /> src/auth/session.ts changed in Bek&apos;s session
        </Alert.Description>
      </Alert.Content>
    </Alert>
  );
}

function Key() {
  return (
    <div className="w-full max-w-sm rounded-2xl bg-surface-secondary p-4">
      <div className="flex items-center gap-2 text-sm font-medium">
        <LockSimple size={16} /> ANTHROPIC_API_KEY
      </div>
      <p className="mt-2 font-mono text-xs text-muted">stays on vlad&apos;s machine</p>
      <div className="mt-3 flex gap-1.5">
        <Chip size="sm" variant="soft">host · vlad</Chip>
        <Chip size="sm" variant="soft">guests · 0 keys</Chip>
      </div>
    </div>
  );
}

function Approval() {
  return (
    <div className="w-full max-w-sm rounded-2xl bg-surface-secondary p-4">
      <p className="text-xs text-muted">Bek&apos;s run wants to write</p>
      <p className="mt-1 font-mono text-sm">src/api/checkout.ts  <span style={{ color: "#2a9d73" }}>+14</span> <span style={{ color: "#e0623a" }}>−3</span></p>
      <div className="mt-4 flex items-center gap-2">
        <Button size="sm" className="pointer-events-none">Approve</Button>
        <Button size="sm" variant="tertiary" className="pointer-events-none">Reject</Button>
        <span className="ml-auto flex gap-1"><Kbd>y</Kbd><Kbd>n</Kbd></span>
      </div>
    </div>
  );
}

// Three rows of two, the wide tile switching sides each row. The shared room first, the team layer after.
const TILES: { title: string; body: string; preview: ReactNode; wide?: boolean }[] = [
  { title: "Join live, with the full history", body: "Teammates open the room link and see every reply, tool call and diff. Late joiners get everything that came before.", preview: <Live />, wide: true },
  { title: "Writes wait for the host", body: "Reads are free. Every write and shell command asks the host first.", preview: <Approval /> },
  { title: "Your key stays on your machine", body: "The agent runs with the host's key or login. Nobody else receives it.", preview: <Key /> },
  { title: "Every session on the team", body: "When everyone runs their own agent, Spaces shows who is working, on which repo and branch, and who is waiting on a person.", preview: <Sessions />, wide: true },
  { title: "Catch the same file twice", body: "Two agents changed one file? Both people are told, and nothing is blocked.", preview: <Overlap />, wide: true },
  { title: "Hand off with a briefing", body: "One agent writes a short account of its session for another, across models.", preview: <Briefing /> },
];

export default function Features() {
  return (
    <section aria-labelledby="features-title" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <SectionHeading id="features-title" lead="Talk through the agent," tail="not around it.">
        One person hosts and keeps the keys. Everyone else joins, watches and prompts, so the context stays in one place.
      </SectionHeading>
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {TILES.map((t, i) => (
          <Reveal key={t.title} delay={(i % 2) * 70} className={`reveal ${t.wide ? "md:col-span-2" : ""}`}>
            <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface">
              <div className="flex min-h-56 flex-1 items-center justify-center p-6" aria-hidden="true" inert>
                {t.preview}
              </div>
              <div className="px-6 pt-1 pb-6">
                <h3 className="text-lg font-medium tracking-tight">{t.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-muted">{t.body}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
