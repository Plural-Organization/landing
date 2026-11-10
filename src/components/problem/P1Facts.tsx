import Reveal from "../../islands/Reveal";

// Variant 1: one statement and three plain facts from the same afternoon.
const FACTS = [
  { big: "41 min", text: "for bek to get an answer out of alia over Slack" },
  { big: "412 lines", text: "of pasted transcript nobody reads to the end" },
  { big: "0", text: "context for bek's own agent when he finally starts" },
];

export default function P1Facts() {
  return (
    <section aria-labelledby="problem-title" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
      <h2 id="problem-title" className="max-w-3xl text-4xl font-medium leading-[1.05] tracking-[-0.022em] md:text-6xl">
        Your agent knows.<br /><span className="tone-2">Your team doesn&apos;t.</span>
      </h2>
      <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-muted">
        alia spent the morning fixing a login bug with Claude. In the afternoon bek picks it up. What it cost him:
      </p>
      <ul className="mt-14 divide-y divide-white/[0.07] border-y border-white/[0.07]">
        {FACTS.map((f, i) => (
          <Reveal key={f.big} delay={i * 90} className="reveal">
            <li className="grid items-baseline gap-2 py-7 md:grid-cols-[16rem_1fr] md:gap-10">
              <span className="font-display text-5xl font-medium tracking-[-0.03em] text-[#f0a080] md:text-6xl">{f.big}</span>
              <span className="text-xl text-foreground/85 md:text-2xl">{f.text}</span>
            </li>
          </Reveal>
        ))}
      </ul>
      <p className="mt-12 max-w-[56ch] text-xl leading-relaxed md:text-2xl">
        <span className="text-[#7fd4b0]">In a Plural room</span>, bek asks the same agent alia was working with, and it answers from the session itself.
      </p>
    </section>
  );
}
