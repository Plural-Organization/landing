import Reveal from "../../islands/Reveal";

// Variant 4: the problem as a three-line story, then the turn.
const STORY = [
  <>alia spends the morning on a login bug <span className="text-foreground">with her agent</span>.</>,
  <>After lunch bek picks it up and asks <span className="text-foreground">what was already tried</span>.</>,
  <>alia is in a call. bek&apos;s agent <span className="text-[#f0a080]">starts from zero</span>.</>,
];

export default function P4Story() {
  return (
    <section aria-labelledby="problem-title" className="mx-auto max-w-5xl px-4 py-24 sm:px-6 md:py-32">
      <h2 id="problem-title" className="sr-only">Why context gets lost</h2>
      <ol className="space-y-8 md:space-y-10">
        {STORY.map((line, i) => (
          <Reveal key={i} delay={i * 140} className="reveal">
            <li className="grid grid-cols-[2.5rem_1fr] items-baseline gap-4 md:grid-cols-[3.5rem_1fr]">
              <span className="font-mono text-sm text-muted">0{i + 1}</span>
              <p className="text-3xl leading-[1.2] tracking-[-0.015em] text-muted md:text-5xl">{line}</p>
            </li>
          </Reveal>
        ))}
      </ol>
      <Reveal delay={480} className="reveal mt-14 border-t border-white/[0.08] pt-10 md:mt-20">
        <p className="text-3xl leading-[1.2] tracking-[-0.015em] md:text-5xl">
          With Plural, bek asks <span className="text-[#7fd4b0]">the agent in alia&apos;s room</span>, and it answers from what it already did.
        </p>
      </Reveal>
    </section>
  );
}
