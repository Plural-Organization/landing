export const FEATURES = [
  {
    title: "See who is working",
    body: "Every session on the team in one list: who runs it, which repo and branch, and which agent is waiting on a person.",
  },
  {
    title: "Join any session live",
    body: "Open a teammate's session and see the same turns, tool calls and diffs as they happen.",
  },
  {
    title: "Move context, not transcripts",
    body: "Ask one agent for a structured briefing and import it into another, even when the two run different models.",
  },
  {
    title: "Catch the same file twice",
    body: "Get warned before two agents edit the same file, then open the other session and settle it.",
  },
  {
    title: "Keys stay on the host",
    body: "The agent runs on the host's machine with the host's key and model. Nobody else ever receives it.",
  },
  {
    title: "Writes wait for the host",
    body: "Reads are free. Every write and shell command goes through the host, in open or review mode.",
  },
];

export const STEPS = [
  { title: "Install", body: "One command. macOS and Linux, Windows through WSL." },
  { title: "Run plural in your project", body: "It starts the agent with your key or your Claude Code or Codex login." },
  { title: "Send the room link", body: "The first line is the link. It does not expire, and you let each person in." },
];

export const FAQ = [
  {
    q: "Does my API key leave my machine?",
    a: "No. The agent runs on the host's machine with the host's key and model. Other people send prompts through the room; they never get the key.",
  },
  {
    q: "Which models work?",
    a: "Claude (API key, Claude Code login or Claude OAuth), Codex CLI with your Codex sign-in, any OpenAI-compatible endpoint such as OpenAI, Gemini, OpenRouter, Groq or DeepSeek, and local models through Ollama.",
  },
  {
    q: "Do guests need to install anything?",
    a: "No. A guest can join from the browser with a link. The terminal client is there for people who want it.",
  },
  {
    q: "Who approves file writes and commands?",
    a: "The host. In open mode participants prompt directly but every write still asks the host; in review mode the host approves each prompt first.",
  },
  {
    q: "Is it open source?",
    a: "Yes. Plural is free software under GPL-3.0-or-later, and the threat model is published in the repository.",
  },
];
