import type { BeforeAfterCopy } from "./P2BeforeAfter";

// Temporary: ten hooks for the before/after problem section, written with the copywriting skill's rules (no contrast
// reveals, no negation lists, no colon reveals, no em dashes, only claims the product supports) and hook patterns from
// viral-hook-creator. Each column gets a small artifact the reader recognises. Every claim maps to the product:
// room link, /brief, host approval of writes, the key staying on the host, Spaces, same-file warnings, name on each prompt.
export const COPIES: BeforeAfterCopy[] = [
  {
    // 1. You're Losing (loss verb)
    lead: "Every handoff leaks",
    tail: "what the agent learned.",
    before: { label: "Handing off today", visual: { kind: "slack", who: "bek", time: "14:20", text: "can you catch me up on the login bug?" },
      items: ["You retell the session from memory.", "Your teammate skims it and asks again.", "Their agent starts with none of it."] },
    after: { label: "Handing off with Plural", visual: { kind: "link", text: "plural join ws://…/r_01M5W7AC" },
      items: ["You send the room link.", "They read the session as it happened.", "Their agent starts from a briefing."] },
  },
  {
    // 2. Cautionary tale with names
    lead: "bek spent an hour",
    tail: "on fixes alia's agent already tried.",
    before: { label: "What happened", visual: { kind: "room", lines: [["bek", "try clearing the session cookie"], ["agent", "cleared it · still loops"]] },
      items: ["The answer sat in alia's session.", "bek asked in Slack and waited.", "His agent tried the same three things."] },
    after: { label: "In a Plural room", visual: { kind: "room", lines: [["bek", "what did you already try?"], ["agent", "cookie, redirect order · loop is SameSite=Strict"]] },
      items: ["bek opens alia's room.", "He asks the agent that found it.", "He starts from the fix."] },
  },
  {
    // 3. The unexpected bottleneck
    lead: "The bottleneck on your team",
    tail: "is whoever holds the context.",
    before: { label: "Today", visual: { kind: "slack", who: "alia", time: "14:34", text: "one sec, in a call" },
      items: ["Every question about the agent goes through them.", "They stop their work to retell it.", "Nobody else can prompt their agent."] },
    after: { label: "In a Plural room", visual: { kind: "room", lines: [["cleo", "why did we keep cookie auth?"], ["agent", "bek decided it at 14:21, here's why"]] },
      items: ["Questions go to the agent in their room.", "They keep working while it answers.", "Anyone invited can prompt it, with their name on it."] },
  },
  {
    // 4. The line everyone has typed
    lead: "“Wait, what did Claude already try?”",
    tail: "Ask the one who knows.",
    before: { label: "Asking a person", visual: { kind: "slack", who: "bek", time: "14:20", text: "@alia what did Claude already try?" },
      items: ["The answer is in someone else's session.", "Getting it takes a message and a wait.", "It arrives as a summary."] },
    after: { label: "Asking the agent", visual: { kind: "room", lines: [["bek", "what did you already try?"], ["agent", "three things, from 13:02 on"]] },
      items: ["Ask the agent that tried it.", "It answers from its own history.", "Anyone joining late can scroll back and read it."] },
  },
  {
    // 5. Tiny change, big impact
    lead: "Send one link",
    tail: "and skip the transcript.",
    before: { label: "Today", visual: { kind: "file", name: "claude-transcript.txt", meta: "412 lines" },
      items: ["A transcript pasted into a thread.", "Read by one person, halfway.", "Useless to the next agent."] },
    after: { label: "With Plural", visual: { kind: "link", text: "plural join ws://…/r_01M5W7AC" },
      items: ["One room link, sent once.", "Opened by anyone you let in.", "Handed to the next agent as a briefing."] },
  },
  {
    // 6. Reset expectations: agents seat one
    lead: "Your agent seats one.",
    tail: "Plural seats the team.",
    before: { label: "One seat", visual: { kind: "slack", who: "cleo", time: "15:10", text: "can you share your screen? I'll tell you what to type" },
      items: ["One person prompts while the rest watch a shared screen.", "Only the person sharing can type.", "Decisions happen where the agent can't see them."] },
    after: { label: "A room", visual: { kind: "room", lines: [["cleo", "add a test for the redirect"], ["bek", "and keep cookie auth"]] },
      items: ["Everyone prompts from their own screen.", "Each prompt carries a name.", "Decisions happen inside the session."] },
  },
  {
    // 7. The reviewer's angle
    lead: "You can't review",
    tail: "what you never saw.",
    before: { label: "Today", visual: { kind: "file", name: "PR #482 · src/auth/session.ts", meta: "+14 −3" },
      items: ["Agent work shows up as a finished diff.", "How it got there is in someone's chat.", "Review means guessing the reasoning."] },
    after: { label: "With Plural", visual: { kind: "room", lines: [["agent", "edit session.ts · SameSite=Lax"], ["alia", "y"]] },
      items: ["Agent work happens where the team can watch.", "Every prompt, tool call and diff stays in the room.", "Review means reading the conversation."] },
  },
  {
    // 8. Answer the objection about control
    lead: "Share the session.",
    tail: "Keep the keys.",
    before: { label: "The usual ways", visual: { kind: "key", text: "ANTHROPIC_API_KEY=sk-ant-… pasted in a DM" },
      items: ["Screen-share, and only you can type.", "Hand over access to your machine.", "Paste your key, and hope it stays put."] },
    after: { label: "A Plural room", visual: { kind: "approve", text: "write src/auth/session.ts" },
      items: ["Teammates prompt from their own screen.", "Every write and command waits for your y.", "The key stays on your machine."] },
  },
  {
    // 9. The whole team: Spaces and same-file warnings
    lead: "Five people, five agents,",
    tail: "and nobody sees the others.",
    before: { label: "Today", visual: { kind: "warn", text: "merge conflict in src/auth/session.ts" },
      items: ["Each agent knows only its owner's work.", "Two agents edit the same file.", "You find out at merge time."] },
    after: { label: "With Plural", visual: { kind: "spaces", rows: [["alia", "checkout-api · fix/login", "waiting"], ["bek", "checkout-api · feat/v2", "working"], ["cleo", "web · feat/onboarding", "working"]] },
      items: ["One list shows every session and branch.", "A same-file edit raises a warning first.", "You open a teammate's session and watch."] },
  },
  {
    // 10. The founder's idea: talk where the agent can hear
    lead: "Put the conversation",
    tail: "where the agent can hear it.",
    before: { label: "Today", visual: { kind: "slack", who: "bek", time: "16:02", text: "decided: keep cookie auth, skip the v2 token" },
      items: ["Decisions happen in Slack and on calls.", "The agent works from an old prompt.", "Someone has to carry the context back."] },
    after: { label: "In a Plural room", visual: { kind: "room", lines: [["bek", "keep cookie auth, skip the v2 token"], ["agent", "noted · updating session.ts"]] },
      items: ["The team decides by prompting the agent.", "The agent works from every prompt in the room.", "The context is already there."] },
  },
];
