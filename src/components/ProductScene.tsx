"use client";

import { useEffect, useRef, useState } from "react";

const team = [
  { name: "Alia", agent: "Claude", icon: "claude", task: "Tracing the login redirect", file: "src/auth/session.ts", tone: "coral" },
  { name: "Bek", agent: "Codex", icon: "openai", task: "Updating the checkout client", file: "src/api/checkout.ts", tone: "mint" },
  { name: "Cleo", agent: "Gemini", icon: "gemini", task: "Reviewing the regression tests", file: "tests/auth.test.ts", tone: "blue" },
];

export function HeroProviders() {
  return <div className="hero-providers" aria-label="Supported providers">
    {[['claude', 'Claude'], ['openai', 'Codex / OpenAI'], ['gemini', 'Gemini'], ['ollama', 'Ollama'], ['openrouter', 'OpenRouter']].map(([icon, label]) =>
      <span key={icon} className={`hero-provider provider-${icon}`}><img src={`/providers/${icon}.svg`} alt="" />{label}</span>
    )}
  </div>;
}

export function BrowserMockup({ compact = false, member = team[0]!, paused = false }: { compact?: boolean; member?: typeof team[number]; paused?: boolean }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const syncPause = () => { frame.current?.contentWindow?.postMessage({type:"plural-preview-pause",paused},location.origin); };
  useEffect(syncPause, [paused]);
  return <div className={`real-web-embed${compact ? ' compact' : ''}`}>
    <iframe ref={frame} tabIndex={-1} inert onLoad={syncPause} src={`/product-preview/index.html?name=${encodeURIComponent(member.name)}&agent=${encodeURIComponent(member.agent)}`} title="Plural web client — website creation demo, view only" loading={compact ? "lazy" : "eager"} />
  </div>;
}

export function TerminalMockup({ compact = false, member = team[1]! }: { compact?: boolean; member?: typeof team[number] }) {
  return (
    <div className={`product-window terminal-window actual-tui${compact ? " compact" : ""}`}>
      <div className="terminal-top"><b>◆ plural</b><span>backend-platform</span><span className="term-grow" /><span>{member.name} · {member.agent}</span><span>4 spaces</span></div>
      <div className="terminal-body"><div className="terminal-feed">
        <p><b className="term-user">{member.name}</b> {member.task}. Check {member.file}.</p>
        <p className="term-agent">agent · imported Alia’s briefing. comparing her route changes with this branch.</p>
        <div className="term-tool"><span>✓</span>briefing <b>alia · checkout-api</b><em>12 facts</em></div>
        <div className="term-tool terminal-working"><span>◌</span>read <b>{member.file}</b><em>working…</em></div>
        <p className="shared-example-label">Shared context · checkout client patch and overlap</p>
        <div className="term-diff"><span>- client.post('/checkout', body)</span><b>+ client.post('/v2/checkout', body)</b></div>
        <div className="term-approval"><b>⚠ src/api/checkout.ts also changed</b><span>alia · 3m</span><p>Her agent touched this file on feat/checkout-v2.</p><div><kbd>y</kbd> continue　<kbd>m</kbd> message alia　<kbd>n</kbd> stop</div></div>
      </div><aside className="terminal-side"><b>SPACES</b><p className="selected">● you <span>landing</span></p><p>◆ alia <span>checkout</span></p><p>● bek <span>auth-fix · 👁2</span></p><p>○ cleo <span>onboarding</span></p><b>INBOX</b><p>1 · file overlap</p><p>1 · briefing ready</p><b>YOUR AGENT</b><p>running · 3 tools</p></aside></div>
      <div className="terminal-input"><b>›</b><span>message the room</span><i /></div>
    </div>
  );
}

export default function ProductScene() {
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [view, setView] = useState<'web' | 'terminal'>('web');
  useEffect(() => {
    if (!playing || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setPhase(value => (value + 1) % 3), 3600);
    return () => window.clearInterval(timer);
  }, [playing]);
  const selected = team[active]!;
  return <div className={`product-scene agent-network phase-${phase}${playing ? '' : ' network-paused'}`}>
    <div className="network-team" aria-label="Example team sessions">
      {team.map((person, index) => <button type="button" key={person.name} className={`network-person ${person.tone}${active === index ? ' is-selected' : ''}`} aria-pressed={active === index} onClick={() => { setActive(index); setPhase(0); }}>
        <span className="network-icon"><img src={`/providers/${person.icon}.svg`} alt="" /></span>
        <span className="network-identity"><b>{person.name}<small>{person.agent}</small></b><span>{person.task}</span></span>
        <span className="network-status"><i />{phase === 2 && index === active ? 'Needs you' : 'Working'}</span>
      </button>)}
    </div>
    <div className="network-wires" aria-hidden="true"><svg viewBox="0 0 1000 70" preserveAspectRatio="none"><path d="M165 0 V20 Q165 40 200 40 H470 Q500 40 500 70"/><path d="M500 0 V70"/><path d="M835 0 V20 Q835 40 800 40 H530 Q500 40 500 70"/><path className="network-packet" d="M165 0 V20 Q165 40 200 40 H470 Q500 40 500 70"/><path className="network-packet packet-two" d="M835 0 V20 Q835 40 800 40 H530 Q500 40 500 70"/></svg><span>plural</span></div>
    <div className="network-console">
      <div className="network-controls"><div className="client-tabs" role="group" aria-label="Preview client"><button type="button" aria-pressed={view === 'web'} onClick={() => setView('web')}>Web + canvas</button><button type="button" aria-pressed={view === 'terminal'} onClick={() => setView('terminal')}>Terminal</button></div><span>Interactive demo</span><button type="button" className="demo-pause" onClick={() => setPlaying(value => !value)}>{playing ? 'Pause' : 'Play'}</button></div>
      <div className={`network-event event-${phase}`}><span className="event-symbol">{phase === 0 ? '●' : phase === 1 ? '↗' : '⚠'}</span><div><b>{phase === 0 ? `${selected.name}’s ${selected.agent} is working` : phase === 1 ? 'Briefing ready to share' : 'File overlap detected'}</b><span>{phase === 0 ? selected.file : phase === 1 ? `${selected.name}’s context can be imported into another agent` : `${selected.file} was also changed in a teammate’s session`}</span></div><span className="event-step">{phase + 1} / 3</span></div>
      <div className="network-preview" key={view} inert={view === 'terminal'}>{view === 'web' ? <BrowserMockup member={selected} paused={!playing} /> : <TerminalMockup member={selected} />}</div>
    </div>
  </div>;
}
