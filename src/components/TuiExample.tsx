const diff = [
  { kind: "del", text: "- 41   response = redirect(next_url)" },
  { kind: "del", text: '- 42   response.set_cookie("session", token)' },
  { kind: "add", text: '+ 41   response.set_cookie("session", token, httponly=True)' },
  { kind: "add", text: "+ 42   response = redirect(next_url)" },
];
const tools = [
  { mark: "✓", name: "read", subject: "tests/test_login.py", meta: "48 lines" },
  { mark: "✓", name: "grep", subject: '"session_cookie"', meta: "3 matches" },
  { mark: "✓", name: "bash", subject: "pytest tests/test_login.py", meta: "1 failed" },
];

export default function TuiExample() {
  return (
    <section id="tui">
      <div className="wrap">
        <div className="head">
          <h2>what it looks like in your terminal.</h2>
          <p>
            The client is one full-screen binary. The conversation is on the left, the room on the right. Every tool call is one line you can open,
            and anything that waits for the host shows up as a card.
          </p>
        </div>
        <div className="tui" role="img" aria-label="Example of the Plural terminal client during a shared session">
          <div className="tui-top">
            <b>◆ plural</b><span>room r_01jb7q</span><span>open mode</span><span className="grow"></span><span>claude-opus-5-5</span><span>3 in the room</span>
          </div>
          <div className="tui-body">
            <div className="tui-feed">
              <div><span className="g">[alia]</span> the login test fails on ci, can you look?</div>
              <div className="a">agent · reading the test and the handler.</div>
              {tools.map((tool) => (
                <div key={tool.name} className="t"><i>{tool.mark}</i> {tool.name.padEnd(6)} {tool.subject.padEnd(28)} {tool.meta}</div>
              ))}
              <div className="a">agent · the cookie is set after the redirect, so the test never sees it. moving it up.</div>
              <div className="t"><i>●</i> {"edit".padEnd(6)} {"src/auth/login.py".padEnd(28)} +2 −2</div>
              <div className="open">{diff.map((line) => <span key={line.text} className={line.kind}>{line.text}</span>)}</div>
              <div className="tui-card">
                <div className="h"><span>approval · edit src/auth/login.py</span><span className="why">waits for vlad · 1:52</span></div>
                <div className="why">alia&apos;s prompt started this run, so writes always ask the host.</div>
                <div className="keys">
                  <span><kbd>y</kbd>allow once</span><span><kbd>a</kbd>for the session</span><span><kbd>n</kbd>reject</span><span><kbd>b</kbd>block</span>
                </div>
              </div>
            </div>
            <aside className="tui-side">
              <div><h4>in the room</h4><ul><li>vlad <span className="r">host</span></li><li>alia</li><li className="typing">bek · typing…</li></ul></div>
              <div><h4>waits for you</h4><ul><li>1 approval</li></ul></div>
              <div><h4>queue</h4><ul><li>bek · add a regression test</li></ul></div>
              <div><h4>agent</h4><ul><li>running · 4 tools</li><li className="r">14.2k tokens</li></ul></div>
            </aside>
          </div>
          <div className="tui-input"><span>›</span><span>message the room</span><span className="cursor"></span></div>
          <div className="tui-keys"><span>ctrl+o tool details</span><span>ctrl+b panel</span><span>F2 settings</span><span>/help</span></div>
        </div>
      </div>
    </section>
  );
}
