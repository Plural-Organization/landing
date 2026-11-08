// The models Plural connects to, straight under the hero the way heroui.com shows its customers.
// Mark plus name in one muted tone, so the row reads as one band.
const CONNECTORS = [
  ["Anthropic", "https://cdn.simpleicons.org/anthropic/ffffff"],
  ["OpenAI", "/providers/openai.svg"],
  ["Gemini", "https://cdn.simpleicons.org/googlegemini/ffffff"],
  ["OpenRouter", "https://cdn.simpleicons.org/openrouter/ffffff"],
  ["DeepSeek", "https://cdn.simpleicons.org/deepseek/ffffff"],
  ["Ollama", "https://cdn.simpleicons.org/ollama/ffffff"],
] as const;

export default function Providers() {
  return (
    <section aria-labelledby="providers-title" className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
      <p id="providers-title" className="text-center text-[15px] text-muted">Connects to the models your team already uses</p>
      <ul className="mt-9 grid grid-cols-2 items-center justify-items-center gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
        {CONNECTORS.map(([name, src]) => (
          <li key={name} className="flex items-center gap-2.5 text-[1.35rem] font-semibold tracking-[-0.02em] text-foreground/55 transition-colors hover:text-foreground/90">
            <img src={src} alt="" width={26} height={26} className="h-[26px] w-auto opacity-55 brightness-0 invert" />
            <span className="font-display">{name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
