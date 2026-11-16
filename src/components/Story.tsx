import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { PAINS } from "../data/content";
import Reveal from "../islands/Reveal";
import RoomTour from "../islands/RoomTour";
import SectionHeading from "./SectionHeading";

// The problem, drawn rather than photographed: two people, the same question, two chats that know nothing of each
// other. It is a diagram on purpose, so nobody mistakes it for the product; the product follows in real captures.
function Chat({ who, color, tone = "plain", lines }: { who: string; color: string; tone?: "plain" | "warn"; lines: { from: "me" | "agent"; text: string }[] }) {
  return (
    <div className={`split-chat ${tone === "warn" ? "split-chat--warn" : ""}`}>
      <p className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.08em] text-muted">
        <span className="size-2 rounded-full" style={{ background: color }} aria-hidden="true" />
        {who}&apos;s chat
      </p>
      <ul className="mt-4 space-y-2.5">
        {lines.map((line, index) => (
          <li key={line.text} className={`pop flex ${line.from === "me" ? "justify-end" : "justify-start"}`} style={{ ["--i" as string]: index }}>
            <span className={line.from === "me" ? "bubble bubble--me" : "bubble"}>
              {line.from === "agent" && <span className="mb-1 block font-mono text-[11px] uppercase tracking-[0.08em] text-muted">Agent</span>}
              {line.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Story() {
  return (
    <>
      <section id="problem" aria-labelledby="problem-title" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 md:py-24">
        <SectionHeading id="problem-title" lead="Same bug. Two chats." tail="The answer lives in one.">
          Each person runs their own agent, so each agent knows only its own chat. What one of them finds, the other has to find again, or hear secondhand.
        </SectionHeading>

        <Reveal className="reveal mt-14">
          <div className="split" role="img" aria-label="Two separate chats about the same bug. Alia's agent finds the cause. Bek's agent, in another chat, has not seen any of it and starts from zero.">
            <Chat
              who="Alia" color="#e0623a"
              lines={[
                { from: "me", text: "why do people land back on the login page after SSO?" },
                { from: "agent", text: "Found it: the session cookie is set with SameSite=Strict, so the browser drops it on the redirect." },
              ]}
            />
            <div className="split-gap" aria-hidden="true"><span>no shared context</span></div>
            <Chat
              who="Bek" color="#2a9d73" tone="warn"
              lines={[
                { from: "me", text: "why do people land back on the login page after SSO?" },
                { from: "agent", text: "I have not looked at this code yet. Has anyone already investigated? Paste what they found." },
              ]}
            />
          </div>
        </Reveal>

        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {PAINS.map((pain, index) => (
            <li key={pain.title}>
              <Reveal className="reveal h-full" delay={index * 70}>
                <article className="flex h-full flex-col rounded-3xl border border-border bg-surface p-6">
                  <span className="font-mono text-[12px] text-muted" aria-hidden="true">0{index + 1}</span>
                  <h3 className="mt-3 text-lg font-medium tracking-tight">{pain.title}</h3>
                  <p className="mt-1.5 flex-1 text-[15px] leading-relaxed text-muted text-pretty">{pain.body}</p>
                  <a href={pain.href} className="pain-link mt-5">
                    <span className="text-muted">Plural:</span> {pain.answer}
                    <ArrowRight size={14} aria-hidden="true" />
                  </a>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section id="room" aria-labelledby="room-title" className="room-band relative isolate scroll-mt-16 overflow-hidden border-y border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-28">
          <Reveal className="reveal">
            <RoomTour>
              <h2 id="room-title" className="text-3xl font-medium leading-[1.08] tracking-[-0.02em] md:text-5xl lg:text-[2.75rem]">
                One room.
                <br />
                <span className="text-foreground/60">One agent. Everyone in it.</span>
              </h2>
              <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-foreground/70 text-pretty max-lg:mx-auto lg:text-[17px]">
                The host runs the agent on their machine. The team joins the same session by link, so a finding is in front of everyone the moment it appears, and every message says who wrote it.
              </p>
            </RoomTour>
          </Reveal>
          <p className="mx-auto mt-10 max-w-[64ch] text-center text-[15px] leading-relaxed text-muted text-pretty">
            Late joiners see everything that came before. People talk to each other in the same thread, and the agent answers only when someone tags <code className="font-mono text-[13px] text-foreground/80">@plrl</code>.
          </p>
        </div>
      </section>
    </>
  );
}
