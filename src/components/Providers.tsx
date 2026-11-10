// The models Plural connects to (the providers in the Plural README), straight under the hero.
// Mark plus name in one muted tone, so the row reads as one band. Groq has no Simple Icons mark, so it shows its name.
const CONNECTORS: [string, string | null][] = [
  ["Anthropic", "https://cdn.simpleicons.org/anthropic/ffffff"],
  ["Claude Code", "https://cdn.simpleicons.org/claude/ffffff"],
  ["OpenAI", "/providers/openai.svg"],
  ["Codex", "/providers/openai.svg"],
  ["Gemini", "https://cdn.simpleicons.org/googlegemini/ffffff"],
  ["OpenRouter", "https://cdn.simpleicons.org/openrouter/ffffff"],
  ["Groq", null],
  ["DeepSeek", "https://cdn.simpleicons.org/deepseek/ffffff"],
  ["Ollama", "https://cdn.simpleicons.org/ollama/ffffff"],
];

export default function Providers() {
  return (
    <section aria-labelledby="providers-title" className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
      <p id="providers-title" className="text-center text-[15px] text-muted">Connects to the models your team already uses</p>
      <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-12">
        {CONNECTORS.map(([name, src]) => (
          <li key={name} className="flex items-center gap-2.5 text-[1.2rem] font-semibold tracking-[-0.02em] text-foreground/55 transition-colors hover:text-foreground/90 md:text-[1.3rem]">
            {src && <img src={src} alt="" width={24} height={24} className="h-6 w-auto opacity-55 brightness-0 invert" />}
            <span className="font-display">{name}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-center text-sm text-muted">and any OpenAI-compatible endpoint</p>
    </section>
  );
}
