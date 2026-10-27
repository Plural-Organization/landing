import type { Side } from "../lib/logo";

export interface Role {
  key: string;
  side: Side | null;
  name: string;
  note: string;
  can: string[];
  cannot: string[];
}

export const ROLES: Role[] = [
  {
    key: "host",
    side: "top",
    name: "host",
    note: "runs the agent",
    can: [
      "runs the agent on their machine",
      "holds the API key, which never leaves it",
      "approves writes and commands",
      "switches open and review mode",
      "invites people and revokes them",
    ],
    cannot: [],
  },
  {
    key: "participant",
    side: "right",
    name: "participant",
    note: "open mode",
    can: ["prompts the agent directly, with their name on it", "sees every reply, tool call and diff", "cancels their own queued prompt"],
    cannot: ["approves nothing: their runs always ask the host"],
  },
  {
    key: "viewer",
    side: "bottom",
    name: "viewer",
    note: "watch only",
    can: ["watches the session live", "joins late and still gets the full history"],
    cannot: ["cannot prompt", "cannot approve"],
  },
  {
    key: "guest",
    side: "left",
    name: "guest in review",
    note: "review mode",
    can: ["proposes a prompt", "waits while the host approves, edits or rejects it", "sees the whole session live"],
    cannot: ["reaches the agent only through the host"],
  },
  {
    key: "agent",
    side: null,
    name: "agent",
    note: "one, in the middle",
    can: [
      "one agent with the host's key and model",
      "reads files on its own",
      "every write and command goes through the policy gate",
      "anthropic, openai-compatible or ollama",
    ],
    cannot: ["never gets past a host's block or reject"],
  },
];
