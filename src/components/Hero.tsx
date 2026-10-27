import RoleDiagram from "../islands/RoleDiagram";

export default function Hero() {
  return (
    <div className="wrap">
      <div className="hero">
        <div>
          <h1>the shared room for your coding agent.</h1>
          <p className="lede">
            Four people, one agent in the middle. The host runs it on their machine with their own key, and everyone else joins from a terminal or a
            browser.
          </p>
          <div className="hint">hover a person, or the agent in the middle, to see what they can do</div>
        </div>
        <RoleDiagram />
      </div>
    </div>
  );
}
