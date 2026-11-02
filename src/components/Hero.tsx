import CopyButton from "../islands/CopyButton";
import { INSTALL, WEB_CLIENT } from "../data/site";
import ProductScene, { HeroProviders } from "./ProductScene";

export default function Hero() {
  return (
    <section className="hero-section" id="top">
      <div className="wrap hero-copy">
        <h1>Multiplayer for<br />coding agents.</h1>
        <p>Run your own agent. See the agents your team is running. Join any session live, pass context between models, and stop parallel work from colliding.</p>
        <HeroProviders />
        <div className="hero-actions">
          <div className="install-command"><code>{INSTALL}</code><CopyButton text={INSTALL} /></div>
          <a className="button button-secondary" href={WEB_CLIENT}>Join from browser</a>
        </div>
        <div className="hero-proof"><span>Local credentials</span><span>Browser + terminal</span><span>Claude, Codex, Gemini, Ollama and more</span></div>
      </div>
      <div className="wrap hero-product"><ProductScene /></div>
    </section>
  );
}
