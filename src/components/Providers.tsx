// The agents and models Plural runs, as one row. The hover colours are the brand colours from Simple Icons (CC0 data); Gemini is the blue of the Lobe Icons colour mark, since Simple Icons lists it as purple.
// Codex and Ollama ship a black or white mark with no brand colour (Simple Icons lists Ollama as #000000, and has no OpenAI entry),
// so they brighten to white. The mark is painted through a mask, so one SVG serves both the muted and the hover state.
const CONNECTORS: [string, string, string][] = [
  ["Claude Code", "/providers/claude.svg", "#D97757"],
  ["Codex", "/providers/openai.svg", "#FFFFFF"],
  ["Gemini", "/providers/gemini.svg", "#3186FF"],
  ["OpenRouter", "/providers/openrouter.svg", "#94A3B8"],
  ["DeepSeek", "/providers/deepseek.svg", "#5786FE"],
  ["Ollama", "/providers/ollama.svg", "#FFFFFF"],
];

export default function Providers() {
  return (
    <section aria-labelledby="providers-title" className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
      <p id="providers-title" className="text-center text-[15px] text-muted">Connects to the models your team already uses</p>
      <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 lg:flex-nowrap lg:gap-x-12">
        {CONNECTORS.map(([name, src, brand]) => (
          <li
            key={name}
            style={{ ["--brand" as string]: brand }}
            className="group flex items-center gap-2.5 text-[1.2rem] font-semibold tracking-[-0.02em] text-foreground/55 transition-colors duration-500 ease-out hover:text-foreground/90 md:text-[1.3rem]"
          >
            <span
              aria-hidden="true"
              className="size-6 shrink-0 bg-foreground/55 transition-colors duration-500 ease-out group-hover:bg-(--brand)"
              style={{ maskImage: `url(${src})`, WebkitMaskImage: `url(${src})`, maskSize: "contain", WebkitMaskSize: "contain", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat", maskPosition: "center", WebkitMaskPosition: "center" }}
            />
            <span className="font-display">{name}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-center text-sm text-muted">and any OpenAI-compatible endpoint</p>
    </section>
  );
}
