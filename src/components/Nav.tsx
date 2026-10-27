import { REPO, VERSION, WEB_CLIENT } from "../data/site";

export default function Nav() {
  return (
    <div className="wrap">
      <div className="top">
        <span><b>plural</b> · {VERSION} · apache-2.0</span>
        <nav>
          <a href="#log">the log</a>
          <a href="#install">install</a>
          <a href={WEB_CLIENT} target="_blank" rel="noopener">web client</a>
          <a href={REPO} target="_blank" rel="noopener">github ↗</a>
        </nav>
      </div>
    </div>
  );
}
