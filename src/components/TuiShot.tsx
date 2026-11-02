import type { CSSProperties } from "react";
import Reveal from "../islands/Reveal";
import { TUI_FRAMES, type Frame, type Run } from "../data/tui-capture";

const BG = "1a1b26";
const BRAILLE = /^[⠀-⣿]$/;

// Box-drawing glyphs stop short of the line box and leave gaps between rows, so they are drawn with CSS to fill the whole cell.
const BOX = /([│╭╮╰╯]|─+)/;
const BOX_CLASS: Record<string, string> = { "│": "bx-v", "╭": "bx-tl", "╮": "bx-tr", "╰": "bx-bl", "╯": "bx-br" };

function Glyphs({ text }: { text: string }) {
  return text.split(BOX).map((part, i) => {
    if (!part) return null;
    if (part[0] === "─") return <span key={i} className="bx bx-h" style={{ width: `${part.length}ch` }} />;
    const cls = BOX_CLASS[part];
    return cls ? <span key={i} className={`bx ${cls}`} /> : part;
  });
}

function Cell({ run }: { run: Run }) {
  const [text, fg, bg, bold, symbol] = run;
  const style: CSSProperties = { color: `#${fg}` };
  if (bg !== BG) style.background = `#${bg}`;
  if (bold) style.fontWeight = 600;
  if (symbol && BRAILLE.test(text)) {
    return <span className="sym spin" style={style}><span>{text}</span></span>;
  }
  if (symbol) return <span className="sym" style={style}>{text}</span>;
  return <span className={text.includes("typing…") ? "typing" : undefined} style={style}><Glyphs text={text} /></span>;
}

// A caret on the composer line, laid over the space after the prompt arrow so no cell moves.
function Row({ runs, index }: { runs: Run[]; index: number }) {
  const cells = runs.flatMap((run, i): React.ReactNode[] => {
    const at = run[0].indexOf("› Message");
    if (at < 0 || run[4]) return [<Cell key={i} run={run} />];
    const head: Run = [run[0].slice(0, at + 1), run[1], run[2], run[3], 0];
    const tail: Run = [run[0].slice(at + 2), run[1], run[2], run[3], 0];
    return [<Cell key={`${i}a`} run={head} />, <span key={`${i}c`} className="caret"> </span>, <Cell key={`${i}b`} run={tail} />];
  });
  return <div className="tl" style={{ "--i": index } as CSSProperties}>{runs.length ? cells : " "}</div>;
}

function Screen({ frame, className }: { frame: Frame; className: string }) {
  return (
    <div className={`tui-screen ${className}`} style={{ "--cols": frame.cols } as CSSProperties} aria-hidden="true">
      {frame.rows.map((runs, y) => (
        <Row key={y} runs={runs} index={y} />
      ))}
    </div>
  );
}

export default function TuiShot() {
  return (
    <Reveal className="tuishot">
      <div role="img" aria-label="The Plural terminal client in a team: the room on the left, the team spaces on the right, and a warning that a teammate changed the same file the agent is about to edit.">
        <Screen frame={TUI_FRAMES.wide} className="tui-wide" />
        <Screen frame={TUI_FRAMES.narrow} className="tui-narrow" />
      </div>
    </Reveal>
  );
}
