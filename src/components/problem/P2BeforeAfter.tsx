import type { ReactNode } from "react";
import Reveal from "../../islands/Reveal";
import Artifact, { type ArtifactSpec } from "./Artifact";

// Before and after as plain type, no cards or boxes. The copy comes in through props, so several hooks can be compared.
export interface BeforeAfterCopy {
  lead: ReactNode;
  tail: ReactNode;
  before: { label: string; items: string[]; visual?: ArtifactSpec };
  after: { label: string; items: string[]; visual?: ArtifactSpec };
}

export const ORIGINAL: BeforeAfterCopy = {
  lead: "Stop retelling",
  tail: "what the agent already knows.",
  before: { label: "Without Plural", items: ["Context lives in one person's session.", "The team asks around it in Slack and DMs.", "Every new agent starts from zero."] },
  after: { label: "With Plural", items: ["Context lives in a room the team shares.", "Everyone asks the agent directly.", "Late joiners read the whole history."] },
};

export default function P2BeforeAfter({ copy = ORIGINAL }: { copy?: BeforeAfterCopy }) {
  return (
    <section aria-labelledby="problem-title" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
      <h2 id="problem-title" className="max-w-4xl text-4xl font-medium leading-[1.05] tracking-[-0.022em] md:text-6xl">
        {copy.lead}<br /><span className="tone-2">{copy.tail}</span>
      </h2>
      <div className="mt-16 grid gap-14 md:grid-cols-2 md:gap-20">
        {[{ col: copy.before, tone: "text-muted", dot: "#e0623a" }, { col: copy.after, tone: "text-foreground", dot: "#2a9d73" }].map(({ col, tone, dot }, c) => (
          <Reveal key={col.label} delay={c * 120} className="reveal">
            <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.14em] text-muted"><span className="size-1.5 rounded-full" style={{ background: dot }} />{col.label}</p>
            {col.visual && <div className="mt-5"><Artifact a={col.visual} /></div>}
            <ul className="mt-6 space-y-5">
              {col.items.map((t) => <li key={t} className={`text-2xl leading-snug md:text-[1.9rem] ${tone}`}>{t}</li>)}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
