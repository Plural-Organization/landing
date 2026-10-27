export interface LogRow {
  seq: string;
  time: string;
  actor: string;
  event: string;
  note: string;
  key?: boolean;
}

export const SESSION_LOG: LogRow[] = [
  { seq: "0001", time: "12:00:02", actor: "vlad", event: "participant.joined", note: "The host opens the room in their project. The first line is an invite." },
  { seq: "0002", time: "12:00:40", actor: "alia", event: "participant.joined", note: "A teammate joins from her terminal with the invite." },
  { seq: "0003", time: "12:01:05", actor: "alia", event: "prompt.accepted", note: "\"the login test fails on ci\". In open mode it goes straight to the agent, with her name on it." },
  { seq: "0004", time: "12:01:05", actor: "host", event: "run.started", note: "The run carries a guest prompt, so every write and command in it will ask the host.", key: true },
  { seq: "0005", time: "12:01:07", actor: "agent", event: "tool.started", note: "read tests/test_login.py. Reads run without asking." },
  { seq: "0006", time: "12:01:09", actor: "agent", event: "approval.requested", note: "edit src/auth/login.py. A card appears for vlad: allow once, for the session, reject or block.", key: true },
  { seq: "0007", time: "12:01:21", actor: "vlad", event: "approval.resolved", note: "Allowed once. The decision is in the log with his name." },
  { seq: "0008", time: "12:01:22", actor: "agent", event: "tool.ended", note: "+2 −2. Everyone sees the numbered diff." },
  { seq: "0009", time: "12:01:30", actor: "bek", event: "participant.joined", note: "Late, but he gets a snapshot and the replay, so he sees the whole session." },
  { seq: "0010", time: "12:01:41", actor: "agent", event: "run.ended", note: "Done. Bek's queued prompt starts the next run." },
];
