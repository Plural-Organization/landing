import { SESSION_LOG } from "../data/session-log";

export default function SessionLog() {
  return (
    <section id="log">
      <div className="wrap">
        <div className="head">
          <h2>a session, as the log sees it.</h2>
          <p>
            Plural is event-sourced. Every prompt, tool call and decision is appended to one log, so a teammate who joins late, reconnects or audits
            afterwards sees exactly what happened and who did it.
          </p>
        </div>
        <div className="log">
          <table>
            <thead><tr><th>seq</th><th>time</th><th>actor</th><th>event</th><th>what it means</th></tr></thead>
            <tbody>
              {SESSION_LOG.map((row) => (
                <tr key={row.seq} className={row.key ? "key" : undefined}>
                  <td className="seq">{row.seq}</td>
                  <td className="ts">{row.time}</td>
                  <td className="who">{row.actor}</td>
                  <td className="ev">{row.event}</td>
                  <td className="note">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
