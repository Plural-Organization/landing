"use client";

import { useEffect, useRef, useState } from "react";
import TuiShot from "./TuiShot";

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

const PREVIEW_WIDTH = 1080;
const NARROW = 640;

export function BrowserMockup({ compact = false, member = team[0]!, paused = false }: { compact?: boolean; member?: typeof team[number]; paused?: boolean }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const box = useRef<HTMLDivElement>(null);
  // Wide boxes show the client at desktop width, scaled down to fit. Narrow ones give it the real width, so it
  // switches to its own phone layout and the text stays readable.
  const [fit, setFit] = useState({ scale: 1, width: PREVIEW_WIDTH });
  useEffect(() => {
    const element = box.current;
    if (!element) return;
    const measure = () => {
      const width = element.clientWidth;
      setFit(width < NARROW ? { scale: 1, width } : { scale: Math.min(1, width / PREVIEW_WIDTH), width: PREVIEW_WIDTH });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const syncPause = () => { frame.current?.contentWindow?.postMessage({type:"plural-preview-pause",paused},location.origin); };
  useEffect(syncPause, [paused]);
  return <div ref={box} className={`real-web-embed${compact ? ' compact' : ''}`}>
    <iframe ref={frame} style={{ width: fit.width, height: `${100 / fit.scale}%`, transform: `scale(${fit.scale})` }} tabIndex={-1} inert onLoad={syncPause} src={`/product-preview/index.html?name=${encodeURIComponent(member.name)}&agent=${encodeURIComponent(member.agent)}`} title="Plural web client — website creation demo, view only" loading={compact ? "lazy" : "eager"} />
  </div>;
}

export function TerminalMockup(_: { compact?: boolean; member?: typeof team[number] }) {
  return <TuiShot />;
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
