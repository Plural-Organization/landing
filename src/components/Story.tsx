import { Card, Chip } from "@heroui/react";
import Image from "next/image";
import Reveal from "../islands/Reveal";
import SectionHeading from "./SectionHeading";

// The problem and the answer, both shown as the real web client: two people chasing one bug in two
// separate chats, then the same bug in one room. The screenshots are the product, not a mock.
function Shot({
  src, alt, width, height, tag, tone = "plain", caption, sizes, cardClass = "bg-surface",
}: {
  src: string; alt: string; width: number; height: number; tag: string; tone?: "plain" | "warn"; caption: string; sizes: string; cardClass?: string;
}) {
  return (
    <Card className={`h-full overflow-hidden rounded-3xl border border-border p-0 shadow-none ${cardClass}`}>
      <Card.Header className="flex-row items-center gap-2 px-5 pt-4">
        <Chip size="sm" variant="soft" className={tone === "warn" ? "bg-[oklch(0.62_0.17_35/0.16)] text-[oklch(0.82_0.1_40)]" : "bg-surface-secondary text-muted"}>
          <Chip.Label>{tag}</Chip.Label>
        </Chip>
      </Card.Header>
      <Card.Content className="mx-3 overflow-hidden rounded-2xl border border-border p-0">
        <Image src={src} alt={alt} width={width} height={height} sizes={sizes} quality={90} className="h-auto w-full" />
      </Card.Content>
      <Card.Footer className="px-6 pt-1 pb-6">
        <p className="text-[15px] leading-relaxed text-muted text-pretty">{caption}</p>
      </Card.Footer>
    </Card>
  );
}

export default function Story() {
  return (
    <>
    <section id="problem" aria-labelledby="problem-title" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 md:py-24">
      <SectionHeading id="problem-title" lead="Same bug. Two chats." tail="The answer lives in one.">
        Each person runs their own agent, so each agent knows only its own chat. What one of them finds, the other has to find again, or hear secondhand.
      </SectionHeading>

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        <Reveal className="reveal">
          <Shot
            src="/shots/pain-alia-crop.jpg" width={900} height={440} sizes="(min-width: 1152px) 560px, (min-width: 768px) 46vw, 92vw"
            alt="Alia's chat: her agent searches the code and finds that the session cookie is set with SameSite=Strict."
            tag="Alia's chat"
            caption="Alia asks why people land back on the login page. Her agent searches, reads the code and finds the cause."
          />
        </Reveal>
        <Reveal className="reveal" delay={70}>
          <Shot
            src="/shots/pain-bek-crop.jpg" width={900} height={440} sizes="(min-width: 1152px) 560px, (min-width: 768px) 46vw, 92vw"
            alt="Bek's chat: his agent has not seen the code and asks whether anyone has already looked at the bug."
            tag="Bek's chat" tone="warn"
            caption="Bek asks the same question in his own chat. His agent starts from zero and asks him to paste what someone else found."
          />
        </Reveal>
      </div>

    </section>

    <section id="room" aria-labelledby="room-title" className="room-band relative isolate overflow-hidden border-y border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="room-title" className="text-3xl font-medium leading-[1.08] tracking-[-0.02em] md:text-5xl">
            One room.
            <br />
            <span className="text-foreground/60">One agent. Everyone in it.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-lg leading-relaxed text-foreground/70 text-pretty">
            The host runs the agent on their machine. Alia, Bek and Cleo join the same session, so a finding is in front of all three the moment it appears, and every message says who wrote it.
          </p>
        </div>

        <Reveal className="reveal mt-12">
          <Shot
            cardClass="bg-background shadow-[0_40px_120px_-30px_rgb(0_0_0/0.9),0_0_0_1px_oklch(1_0_0/0.06)]"
            src="/shots/room-done.jpg" width={1512} height={806} sizes="(min-width: 1152px) 1100px, 92vw"
            alt="One Plural room with Alia as host and Bek and Cleo as participants: Cleo's message to the team, Bek asking the agent to apply the fix, and the agent's edit shown as a diff."
            tag="One room, three people"
            caption="Late joiners see everything that came before. People can talk to each other in the room. The agent answers only when someone tags @plrl."
          />
        </Reveal>
      </div>
    </section>
    </>
  );
}
