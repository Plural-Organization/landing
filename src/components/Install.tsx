import CopyButton from "../islands/CopyButton";
import { INSTALL, WEB_CLIENT } from "../data/site";

const start = "cd your-project && plural";

export default function Install() {
  return (
    <section id="install">
      <div className="wrap go">
        <div>
          <h2>open your own room.</h2>
          <p className="lede">macOS and Linux, arm64 and x64, Windows through WSL. Without a key the host runs a scripted demo agent.</p>
        </div>
        <div className="term">
          <div className="line"><code>{INSTALL}</code><CopyButton text={INSTALL} /></div>
          <div className="line"><code>{start}</code><span className="c">you host</span><CopyButton text={start} /></div>
          <div className="line"><code>plural join &quot;ws://…&quot;</code><span className="c">a teammate joins</span></div>
          <div className="line">
            <a className="web" href={WEB_CLIENT} target="_blank" rel="noopener">or join from the browser →</a><span className="c">no install</span>
          </div>
        </div>
      </div>
    </section>
  );
}
