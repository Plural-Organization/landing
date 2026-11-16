// The three ways unshared context costs a team, each with the part of the product that answers it.
export const PAINS = [
  {
    title: "Context lives in one chat",
    body: "Each person runs their own agent, and each agent knows only its own conversation. What one finds, the next finds again.",
    answer: "One room",
    href: "#room",
  },
  {
    title: "Findings travel by copy-paste",
    body: "What an agent learned reaches the team as a pasted transcript, or secondhand in a call. The next agent starts from zero.",
    answer: "Briefings",
    href: "#features",
  },
  {
    title: "Two agents, one file",
    body: "Nobody sees what a teammate's agent is changing until the branches meet in a merge conflict.",
    answer: "Same-file warnings",
    href: "#features",
  },
];

// The room, beat by beat. Each step is one real capture of the web client. `focus` says which end of the conversation
// the step is about, for the layouts that zoom into the capture and cannot show all of its height.
export const TOUR = [
  {
    key: "ask",
    focus: "top",
    label: "Ask",
    title: "Alia asks. Everyone sees the answer.",
    body: "The agent searches the code and names the cause. Bek and Cleo are in the room, so nobody forwards anything.",
    src: "/shots/room-found.png",
    alt: "Alia's room in the Plural web client. She asks why people land back on the login page after SSO; the agent searches the code, reads the callback and explains that the session cookie is set with SameSite=Strict. Bek and Cleo are listed as participants.",
  },
  {
    key: "approve",
    focus: "bottom",
    label: "Approve",
    title: "Bek prompts. Alia decides.",
    body: "Bek tells the agent to apply the fix. It is Alia's machine, so the edit waits for her: once, for the session, reject or block.",
    src: "/shots/room-approval.png",
    alt: "The same room a minute later. Cleo wrote a note to the team, Bek asked the agent to apply the fix, and a card asks the host to allow the edit of src/auth/session.ts, because Bek's prompt started the run.",
  },
  {
    key: "ship",
    focus: "bottom",
    label: "Ship",
    title: "One diff, in front of all three.",
    body: "The change lands as a numbered diff with the agent's summary, next to Cleo's note and Bek's prompt. That is the whole thread.",
    src: "/shots/room-done.png",
    alt: "The room after the host allowed the edit: the diff of src/auth/session.ts changes SameSite=Strict to SameSite=Lax, and the agent says the test still passes. The left rail lists the team's three rooms with their status.",
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
    a: "No. A guest can join from the browser with a link, on a laptop or a phone. The terminal client is there for people who want it.",
  },
  {
    q: "Terminal or browser?",
    a: "Both, on the same session. The terminal client is one full-screen program with mouse and keyboard; the browser client needs no install. Each person picks, and they see the same turns, diffs, approvals and queue.",
  },
  {
    q: "Can everyone keep their own agent?",
    a: "Yes. In a team each person runs their own room with their own key and model. The team sees every shared room in one list, anyone can open one to read it live, two agents changing the same file are both warned, and one agent can write a briefing for another.",
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
