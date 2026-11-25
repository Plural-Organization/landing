// Release notes for /updates, newest first. Written from the merged pull requests of each release on GitHub,
// in people's words: what you can do now, not how it was built. Keep `version` and `date` as on the release.

export type ChangeKind = "new" | "improved" | "fixed";

export interface Release {
  version: string;
  date: string; // ISO day of the GitHub release
  title: string;
  summary: string;
  changes: Partial<Record<ChangeKind, string[]>>;
  // A capture that shows the headline change, from public/shots.
  shot?: { src: string; width: number; height: number; alt: string; frame: string; kind?: "browser" | "terminal" };
}

export const RELEASES: Release[] = [
  {
    version: "0.2.30",
    date: "2026-11-17",
    title: "Pick up where you left off",
    summary: "A session stays on your computer after the room closes. Now the web client brings it back, with everything that was said.",
    changes: {
      new: [
        "Start a room lists the sessions this computer keeps. Continue opens one again, in the same folder.",
        "A relay can ask hosts to be signed in, and the host says so before it opens a room: run plural login.",
      ],
      improved: [
        "The installer starts the host once, so your first plural login opens the browser in about a second.",
        "The installer points out older copies of plural on your PATH, and plural update names a daemon that still runs the old version.",
        "The terminal client now looks like the web client, with a menu that fits the window.",
        "One inbox for approvals and requests, the same in the terminal and the browser.",
      ],
    },
  },
  {
    version: "0.2.29",
    date: "2026-11-14",
    title: "Danger zone",
    summary: "Tired of approving every command a teammate's prompt starts? Hand the room over, knowingly.",
    changes: {
      new: [
        "Danger zone: what a guest asks the agent to change or run goes through without asking you. Turned on by name, after a warning, and off when the room restarts.",
        "Up and down in the composer bring back your last hundred messages.",
      ],
      improved: [
        "Start a room in fewer steps: one press picks the folder and starts.",
        "The trace button says Trace.",
        "Slash commands are defined once for the terminal and the browser.",
      ],
      fixed: [
        "Vite apps run in the shared preview.",
        "A long command no longer pushes the approval buttons out of view.",
      ],
    },
  },
  {
    version: "0.2.28",
    date: "2026-11-14",
    title: "Talk to the room, tag the agent",
    summary: "A plain message is chat between people. The agent reads it, and answers only when someone writes @plrl.",
    changes: {
      new: ["@plrl mentions call the agent; everything else is room chat it can read."],
    },
    shot: { src: "/shots/room-done.png", width: 2880, height: 1800, alt: "A Plural room where people talk and the agent answers a message that tags @plrl.", frame: "plrl.host/app" },
  },
  {
    version: "0.2.27",
    date: "2026-11-13",
    title: "Bring your context",
    summary: "Send a chat from Claude, ChatGPT or Grok to your session, and stop everything Plural runs with one command.",
    changes: {
      new: [
        "Import a chat's context through the MCP gateway with /import.",
        "plural stop ends the daemon, rooms, relays and agents on this computer.",
      ],
      improved: ["Speed benchmarks and agent evals run on every change."],
      fixed: ["Previews in the web canvas, and /ask in the web client."],
    },
  },
  {
    version: "0.2.26",
    date: "2026-11-12",
    title: "The right team",
    summary: "Small fixes to starting a room from the browser.",
    changes: {
      fixed: ["A room starts in the team you are in.", "Setup shows as three commands you can copy."],
    },
  },
  {
    version: "0.2.25",
    date: "2026-11-11",
    title: "Teams, everywhere",
    summary: "Be in more than one team, in the terminal and the browser, as one person on every device.",
    changes: {
      new: [
        "Several teams in the terminal, with plural team list and plural team use.",
        "In the browser: a team switcher and a window to manage each team.",
        "Rooms started from the web can be shown to a team.",
        "Team members are accounts, with a key per device.",
      ],
    },
    shot: { src: "/shots/team-watch.png", width: 2224, height: 844, alt: "A teammate's session opened from the team list in the web client.", frame: "plrl.host/app" },
  },
  {
    version: "0.2.24",
    date: "2026-11-11",
    title: "Choose your agent in the browser",
    summary: "Set up the agent on your computer, then pick it, and switch it, from the web page.",
    changes: {
      new: [
        "Choose and configure the agent from the web client, or with plural agent.",
        "Start a room from the web on your own relay.",
        "When a run fails, the host is offered another agent.",
      ],
      fixed: ["plural login shows the sign-in address before the browser answers."],
    },
  },
  {
    version: "0.2.23",
    date: "2026-11-10",
    title: "Host from the browser",
    summary: "A small daemon on your computer lets the web page start rooms there, in a folder you choose.",
    changes: {
      new: ["Start a room from plrl.host/app through the local daemon."],
    },
  },
  {
    version: "0.2.22",
    date: "2026-11-10",
    title: "Accounts",
    summary: "Sign in with Google and link a computer, so the browser and the terminal know it is you.",
    changes: {
      new: ["Sign in with Google in the web client.", "plural login links this computer to your account."],
      improved: ["Panels you can hide and resize, and agent logos."],
    },
  },
  {
    version: "0.2.21",
    date: "2026-11-09",
    title: "See what it builds",
    summary: "Share a server running on the host, and everyone opens it inside the room.",
    changes: {
      new: ["/preview shows a local server in the web canvas of everyone in the room."],
    },
  },
  {
    version: "0.2.20",
    date: "2026-11-09",
    title: "A new web client",
    summary: "The entry screen and the room, rebuilt in the same design as this site.",
    changes: {
      new: ["The browser client, rebuilt on HeroUI."],
    },
    shot: { src: "/shots/room-approval.png", width: 2880, height: 1800, alt: "The rebuilt web client: a room with the agent asking the host to approve an edit.", frame: "plrl.host/app" },
  },
];

// Earlier releases, one line each.
export const EARLIER: { version: string; date: string; line: string }[] = [
  { version: "0.2.18", date: "2026-11-05", line: "plural -p runs alone; --local wins over a relay from the environment" },
  { version: "0.2.17", date: "2026-11-03", line: "Licensed GPL-3.0-or-later; the host asks before opening a folder outside the session" },
  { version: "0.2.15", date: "2026-11-03", line: "Move between team sessions without reconnecting; paste images and long text" },
  { version: "0.2.12", date: "2026-11-02", line: "Approvals in one row with arrow keys; hooks and status lines for plugins" },
  { version: "0.2.11", date: "2026-10-31", line: "Teams in the browser; preview the site the agent writes" },
  { version: "0.2.8", date: "2026-10-30", line: "Host plugins with slash commands and tools; images to Claude Code and Codex" },
  { version: "0.2.7", date: "2026-10-29", line: "Teams: create, join, watch a teammate's session; a board you can pan and zoom" },
  { version: "0.2.5", date: "2026-10-29", line: "Sub-agents, a fast model, /usage and /agents" },
  { version: "0.2.4", date: "2026-10-28", line: "A chat-like room with a canvas, a shared board, quotes and inline diffs" },
  { version: "0.2.1", date: "2026-10-28", line: "The browser client; Claude Code and Codex as agents" },
  { version: "0.1.0", date: "2026-10-25", line: "The first release: one agent, one room, many people" },
];

export function dayOf(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}
