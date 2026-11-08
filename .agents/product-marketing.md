# Product Marketing Context

**Document version:** v4
**Last updated:** 2026-11-08

> Drafted from the Plural README, docs/usage.md, the GitHub repo description and the current landing page.
> Lines marked **[?]** are guesses that need the founder's answer before copy relies on them.

## Product Overview
**One-liner:** The shared room for your coding agent. (README)
**What it does:** The host runs a coding agent (Claude, Codex, Gemini, Ollama and others) on their own machine with their own key. Teammates join the session by link, from the terminal or the browser, watch every reply, tool call and diff live, and prompt it; every write and shell command waits for the host. In a team, each person's own session shows up in a shared SPACES list, agents can hand each other briefings, and two agents editing the same file are warned.
**Product category:** Multiplayer / collaboration layer for AI agents: coding agents in the terminal, and plain chat with an agent in the browser, including non-engineering business teams (founder, 2026-11-08). (CLI + TUI + web client.) Shelf people search: "share Claude Code session", "pair programming with AI agent", "multiplayer coding agent". **[?]**
**Product type:** Open-source developer tool (CLI client `plural` + host `plural-host`), optional relay, web client.
**Business model:** Free, GPL-3.0-or-later (versions up to 0.2.16 were Apache 2.0). No paid tier today. **[?]** Any hosted relay / team plan planned?

## Target Audience
**Target companies:** Small engineering teams and startups already using Claude Code or Codex CLI daily. **[?]**
**Decision-makers:** The developer who runs the agent (host); a tech lead who wants to see what the team's agents are doing. Bottom-up adoption, no buyer. **[?]**
**Primary use case:** Work on one agent session together: one person drives, others watch and prompt, the host stays in control of the machine. **[?] confirm this is the lead scenario vs. team visibility**
**Jobs to be done:**
- Let a teammate see and steer my agent session without screen sharing or handing over my key.
- Know what everyone's agents are doing right now, and which one is stuck waiting on a person.
- Pass what my agent learned to a teammate's agent, even across models.
**Use cases:**
- Pairing on a bug: host runs the agent, a teammate joins and prompts in `open` mode.
- Review mode: a junior or a guest proposes prompts, the host approves each one.
- Showing product/QA a live agent run through the web client, nothing to install.
- Picking up a colleague's half-finished task with `/brief`.
- Catching two agents editing the same file before a merge conflict.

## Personas
| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| Host (dev running the agent) | Control of their machine, key and repo | Sharing a session means screen share or giving access | Others join and prompt; every write and command still asks the host |
| Teammate / participant | Seeing and steering the work | Only sees results after the fact, via PRs or chat | Live turns, tool calls and diffs, prompt with their name on it |
| Tech lead | What the team's agents are doing | Agent work is invisible until a PR shows up | SPACES list: who, repo, branch, working / waiting / idle |
| Guest (PM, QA, contractor) | Watching or suggesting without setup | No install, no access to the repo | Browser link, review mode, nothing reaches the agent without the host |

## Problems & Pain Points
**Core problem:** People can't share context. What the agent knows (what was tried, what broke, why) stays in one person's terminal, so the team talks around the agent in Slack, DMs and pasted transcripts, and every new agent starts from zero. Communication should go through the agent, so the context is shared by default. (Founder, 2026-11-08)
**Why alternatives fall short:**
- Screen sharing (Zoom, Meet): view-only, one viewer at a time drives, no history, no permission model.
- Handing over SSH / repo access or your API key: unsafe, everyone burns the same key with no attribution.
- VS Code Live Share / tmux sharing: share an editor or a shell, not an agent conversation with approvals.
- Pasting transcripts into Slack: loses structure, models can't use it well.
**What it costs them:** Duplicated work between agents, merge conflicts from two agents in one file, context re-explained to every new agent, slow reviews of agent-written code. **[?] any numbers**
**Emotional tension:** Fear of letting someone else's prompt run commands on my machine; feeling out of the loop on what teammates' agents are changing.

## Competitive Landscape
**Direct:** **[?]** Other multiplayer agent tools the founder compares against (none named in the repo).
**Secondary:** Screen sharing / Live Share / tmux sessions: share pixels or a shell, not a permission-gated agent.
**Indirect:** Everyone using their agent alone and syncing through PRs and Slack.
**Learns from (README acknowledgements):** pi, opencode, hermes, herdr.

## Differentiation
**Key differentiators:**
- The agent runs on the host's machine under the host's key; guests never receive it.
- Every write and exec waits for the host; a guest-started run can never be auto-approved by a rule.
- `open` and `review` prompting modes, switchable any time.
- Event-sourced log: reconnect, replay and audit for free; joining late shows the full history.
- Model-agnostic: Anthropic (API key, Claude OAuth, Claude Code login), Codex CLI login, any OpenAI-compatible endpoint, Ollama.
- Team layer: SPACES, `/brief` briefings between any two models, same-file warnings.
- Relay never decides permissions and never stores content.
**How we do it differently:** Shares the agent session itself (turns, tool calls, diffs, approvals), not the screen or the shell.
**Why that's better:** Real collaboration on the agent without giving up control or credentials.
**Why customers choose us:** **[?]** need real reasons from early users.

## Objections
| Objection | Response |
|-----------|----------|
| "I don't want others running commands on my machine." | Every write and command waits for the host; guest runs can't be auto-approved; review mode gates every prompt. |
| "Will my API key leak?" | It never leaves the host. Participants send prompts through the room. Threat model is published. |
| "We already pair over Zoom." | Zoom shares pixels; Plural shares the session: everyone prompts with attribution, sees full history, approvals stay with the host. |
| **[?]** "GPL is a problem for us." | It's a dev tool you run, not a library you ship; confirm the stance. |

**Anti-persona:** Solo developers who never share sessions; teams that forbid running agents locally; people looking for a hosted cloud agent. **[?]**

## Switching Dynamics
**Push:** Agent work is invisible and single-player; colliding edits; re-explaining context. **[?]**
**Pull:** Join any session by link; keep control; works with the agent and login you already have.
**Habit:** Running `claude` / `codex` alone in the terminal and screen sharing when needed.
**Anxiety:** Security of letting others drive; one more tool to install; GPL; early project (v0.2.x, small community).

## Customer Language
**How they describe the problem:** **[?]** no verbatim quotes yet.
**How they describe us:** **[?]**
**Words to use:** room, host, join, session, the agent, approve, open mode, review mode, spaces, briefing, your key, your machine.
**Words to avoid:** platform, seamless, revolutionize, AI-powered, swarm, autonomous. **[?]**
**Glossary:**
| Term | Meaning |
|------|---------|
| Room | One live agent session that people join |
| Host | The person whose machine and key run the agent; approves writes and commands |
| Participant | Prompts directly in open mode |
| Viewer | Watches only |
| Guest (review mode) | Proposes prompts the host approves, edits or rejects |
| Spaces | The team's list of sessions with status, repo and branch |
| Briefing | A structured account of one session, written by its agent for another agent |

## Brand Voice
| Attribute | Means | Doesn't mean | Example line |
|-----------|-------|--------------|--------------|
| Plain | Short sentences, literal verbs | Dumbed down | "you approve what matters" |
| Lowercase-calm | Quiet confidence, no hype | Casual or jokey | "one agent. one host. everyone in the room." |
| Precise | Names the exact behaviour and limits | Jargon for its own sake | "a relay that never decides permissions and never stores content" |
| Safety-forward | Leads with control and consent | Fear-mongering | "write and exec actions always wait for the host" |

**Tone by context:**
- Launch: concrete feature, one line each, no superlatives.
- Errors/support: what happened, what to do, no apology padding.
**Terms we own:** "the shared room for your coding agent", "everyone in the room".
**Never use (and why):** "Apache 2.0" for current versions (licence is GPL-3.0-or-later since 0.2.17).

## Proof Points
**Metrics:** **[?]** none public yet (4 GitHub stars, latest release v0.2.18).
**Customers:** **[?]**
**Testimonials:** **[?]**
**Value themes:**
| Theme | Proof |
|-------|-------|
| Control | Permission gate on every write/exec; threat model published |
| Openness | GPL-3.0, source on GitHub, self-hostable relay |
| Works with your stack | Claude Code and Codex logins need no key; any OpenAI-compatible endpoint; Ollama |

## Goals
**Business goal:** **[?]** adoption / GitHub stars / active rooms?
**Conversion action:** Run the install command, or join a room from the browser. **[?] which is primary**
**Current metrics:** **[?]**

## Learnings
*Decisions and tested lessons. Newest first. Keep it to about 20 active entries.*
| Date | Learning | Evidence | Applies to | Status |
|------|----------|----------|------------|--------|
| 2026-11-08 | Not only a terminal tool: also regular chat with an agent, including business communication. Copy says "session" or "chat", not "terminal", when describing where context lives. | Founder, 2026-11-08 | All copy | active |
| 2026-11-08 | Core pain is unshared context: the team talks around the agent instead of through it. Lead copy with this problem. | Founder, 2026-11-08 | Hero, problem section, all copy | active |
| 2026-11-08 | Lead with the shared room (one agent, one host, everyone joins); the team layer (Spaces, briefings, same-file warnings) comes second. | Decision, matches README positioning; founder to confirm | Landing hero, all copy | watch |
| 2026-11-08 | Primary audience: small teams already using Claude Code or Codex daily. | Assumption, founder to confirm | Landing, launch posts | watch |
| 2026-11-08 | Primary conversion is the install command; joining from the browser is secondary. | Assumption, founder to confirm | Landing CTAs | watch |
| 2026-11-08 | Licence is GPL-3.0-or-later; never say Apache 2.0 for current versions. | README, LICENSE | All copy | active |

## Changelog
*Newest first. One line per revision: what changed and why.*
- v4 (2026-11-08) — Broadened category beyond coding/terminal to agent chat for business teams (founder); copy rule added to Learnings.
- v3 (2026-11-08) — Core problem rewritten in the founder's words: context can't be shared, communication should go through the agent; added as an active learning.
- v2 (2026-11-08) — Recorded positioning decisions (shared room first, small Claude Code/Codex teams, install as primary CTA) as watch-status learnings; landing copy rewritten against them.
- v1 (2026-11-08) — Initial context, auto-drafted from the README, docs/usage.md and the landing page.
