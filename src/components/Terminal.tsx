import Image from "next/image";
import Reveal from "../islands/Reveal";
import Frame from "./Frame";
import SectionHeading from "./SectionHeading";

// The terminal client, shown as it draws itself: the capture is the real interface rendered off-screen from the same
// conversation as the web captures above, so a reader can compare the two side by side.
const FACTS = [
  { title: "One program", body: "A single binary, full screen. No runtime to install, macOS and Linux." },
  { title: "Mouse and keyboard", body: "Click a tool call to open its diff, or never leave the keys. Themes included." },
  { title: "The team in a panel", body: "Spaces lists every room on the team; a click opens a teammate's session." },
  { title: "Pick up where you left", body: "plural -r resumes a session, with its room link and its history." },
];

const COMMANDS = [
  { cmd: "plural", note: "start a room in this folder" },
  { cmd: "plural join <link>", note: "join someone's room" },
  { cmd: "plural team join <code>", note: "see the team's rooms" },
];

export default function Terminal() {
  return (
      <section id="terminal" aria-labelledby="terminal-title" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 md:py-24">
        <SectionHeading id="terminal-title" lead="Same room." tail="In your terminal.">
          Plural started in the terminal and still lives there. The terminal client shows the same session, approvals, queue and team as the browser, so each person works where they already are.
        </SectionHeading>

        <Reveal className="reveal mt-12">
          <Frame kind="terminal" title="plural — shop · fix/login-redirect" className="term-frame">
            <div className="term-shot">
              <Image
                src="/shots/terminal-room.png" width={2530} height={1540} quality={90} sizes="(min-width: 1152px) 1100px, (min-width: 640px) 92vw, 150vw"
                alt="The Plural terminal client in the same room: Alia's question, the agent's search and answer, Cleo's note to the room, Bek's prompt, the diff of src/auth/session.ts and the agent's summary. A side panel lists the participants, the agent and the team's spaces, with a warning that Bek's agent also changed src/auth/session.ts."
                className="term-img"
              />
            </div>
          </Frame>
        </Reveal>

        <ul className="mt-4 grid gap-2 sm:grid-cols-3 sm:gap-3">
          {COMMANDS.map((item, index) => (
            <li key={item.cmd}>
              <Reveal className="reveal h-full" delay={index * 60}>
                <div className="flex h-full flex-col gap-1 rounded-2xl border border-border bg-background/70 px-4 py-3.5 backdrop-blur">
                  <code className="font-mono text-[14px] text-foreground"><span className="text-muted select-none">$ </span>{item.cmd}</code>
                  <span className="text-[14px] text-muted">{item.note}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <dl className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((fact) => (
            <div key={fact.title} className="border-t border-border pt-4">
              <dt className="font-medium tracking-tight">{fact.title}</dt>
              <dd className="mt-1 text-[15px] leading-relaxed text-muted text-pretty">{fact.body}</dd>
            </div>
          ))}
        </dl>
      </section>
  );
}
