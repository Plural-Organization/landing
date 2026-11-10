import Reveal from "../../islands/Reveal";

// Variant 5: the one question every team with agents keeps asking, and where Plural answers it.
export default function P5Quote() {
  return (
    <section aria-labelledby="problem-title" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-36">
      <p className="text-sm font-medium uppercase tracking-[0.14em] text-muted">The most expensive question on a team with agents</p>
      <h2 id="problem-title" className="mt-6 max-w-5xl text-5xl font-medium leading-[1.02] tracking-[-0.03em] md:text-[5.5rem]">
        &ldquo;Wait, what did Claude <span className="text-[#f0a080]">already try</span>?&rdquo;
      </h2>
      <p className="mt-8 max-w-[52ch] text-xl leading-relaxed text-muted">
        Today it goes to a teammate, who has to stop, scroll back and retell. Half of it gets lost on the way.
      </p>
      <Reveal className="reveal mt-14 max-w-2xl">
        <div className="rounded-3xl border border-[#2a9d73]/30 bg-surface p-6 font-mono text-[15px] leading-relaxed">
          <p className="mb-3 font-sans text-sm text-[#7fd4b0]">In a Plural room, the agent answers it</p>
          <p><b style={{ color: "#2a9d73" }}>bek</b> › what did you already try?</p>
          <p className="text-foreground/85"><b className="text-foreground">agent</b> › cleared the logout cookie, moved the redirect after auth. The loop is <span className="rounded bg-white/10 px-1">SameSite=Strict</span> on the callback.</p>
        </div>
      </Reveal>
    </section>
  );
}
