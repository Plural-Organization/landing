import { LEGAL, LINKS, REPO, WEB_CLIENT } from "../data/site";
import { FIGURES } from "../lib/logo";
import LogoMark from "./LogoMark";

const LINK_LIST: [string, string][] = [
  ["Documentation", LINKS.docs],
  ["Source", REPO],
  ["Updates", "/updates"],
  ["Releases", LINKS.releases],
  ["Threat model", LINKS.threatModel],
  ["Join from browser", WEB_CLIENT],
  ["Privacy Policy", "/privacy"],
  ["Terms of Service", "/terms"],
];

// The four people of the logo, each in their own colour: alia coral, bek mint, cleo blue, the host in white.
const PEOPLE = [
  { side: "left", color: "oklch(0.7 0.17 35)" },
  { side: "bottom", color: "oklch(0.78 0.13 165)" },
  { side: "top", color: "oklch(0.97 0 0)" },
  { side: "right", color: "oklch(0.68 0.17 260)" },
] as const;

// Each figure is cropped to its own pixels so all four stand on the same ground line.
const FIGURE_BOXES = PEOPLE.map(({ side, color }) => {
  const cells = FIGURES[side].cells;
  const x0 = Math.min(...cells.map((c) => c[0]));
  const y0 = Math.min(...cells.map((c) => c[1]));
  const x1 = Math.max(...cells.map((c) => c[0])) + 1;
  const y1 = Math.max(...cells.map((c) => c[1])) + 1;
  return { side, color, cells, x0, y0, w: x1 - x0, h: y1 - y0 };
});

// The sky starts on the page's own dark and warms only at the horizon, so the scene belongs to the site: stepped bands (as a
// pixel-art sky is drawn) that mix a muted coral into --background, at most 46% at the ground line.
const SKY = Array.from({ length: 16 }, (_, i) => `color-mix(in oklch, oklch(0.6 0.14 38) ${Math.round((i / 15) ** 2.2 * 46)}%, oklch(0.145 0.002 286))`);
const STARS: [number, number][] = [[8, 12], [17, 30], [26, 8], [34, 22], [43, 14], [55, 34], [63, 10], [72, 26], [80, 16], [90, 32], [96, 9], [48, 40]];

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-border">
      <div aria-hidden="true" className="absolute inset-0 -z-10 flex flex-col">
        {SKY.map((color, i) => <div key={i} className="flex-1" style={{ background: color }} />)}
      </div>
      {STARS.map(([x, y]) => (
        <span key={`${x}-${y}`} aria-hidden="true" className="absolute size-[3px] bg-white/45" style={{ left: `${x}%`, top: `${y}%` }} />
      ))}
      <div
        aria-hidden="true"
        className="absolute top-[14%] right-[8%] size-12 bg-[oklch(0.93_0.01_286)] [box-shadow:0_0_60px_18px_oklch(1_0_0/.12)] [clip-path:polygon(25%_0,75%_0,75%_12.5%,87.5%_12.5%,87.5%_25%,100%_25%,100%_75%,87.5%_75%,87.5%_87.5%,75%_87.5%,75%_100%,25%_100%,25%_87.5%,12.5%_87.5%,12.5%_75%,0_75%,0_25%,12.5%_25%,12.5%_12.5%,25%_12.5%)] md:right-[12%] md:size-16"
      />

      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 md:pt-20">
        <div className="max-w-md">
          <a href="#top" className="flex w-fit items-center gap-3 text-3xl font-bold tracking-tight text-foreground no-underline">
            <LogoMark size={40} />
            plural
          </a>
          <p className="mt-3 text-foreground/80">Multiplayer for coding agents. Free, open source, on your machine.</p>
        </div>

        {/* The people walk toward one lit doorway: the room. Decorative, so hidden from assistive tech. */}
        <div aria-hidden="true" className="relative mt-16 flex items-end justify-center gap-4 [--u:5px] sm:gap-10 md:mt-24 md:gap-16 md:[--u:9px]">
          {FIGURE_BOXES.map(({ side, color, cells, x0, y0, w, h }) => (
            <svg
              key={side}
              viewBox={`${x0} ${y0} ${w} ${h}`}
              shapeRendering="crispEdges"
              style={{ width: `calc(${w} * var(--u))`, height: `calc(${h} * var(--u))` }}
            >
              <g fill={color}>
                {cells.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />)}
              </g>
            </svg>
          ))}
          <span className="h-[44px] w-[28px] bg-[oklch(0.93_0.06_70)] [box-shadow:0_0_44px_12px_oklch(0.8_0.12_55/.4)] [clip-path:polygon(0_100%,0_20%,50%_0,100%_20%,100%_100%)] md:h-[88px] md:w-[56px]" />
        </div>
      </div>

      {/* The ground line and the link bar sit on the page's own background, so the scene reads as a strip of sky above the site. */}
      <div className="relative bg-background">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-2 -translate-y-full bg-[linear-gradient(90deg,var(--background)_50%,transparent_50%)] [background-size:12px_100%] opacity-80" />
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-3 px-4 py-8 text-sm sm:px-6">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-1">
            {LINK_LIST.map(([label, href]) => (
              <a key={label} href={href} className="inline-flex min-h-6 items-center text-muted no-underline hover:text-foreground">{label}</a>
            ))}
          </nav>
          <span className="flex items-center gap-3 text-xs text-muted md:ml-auto">
            <span>© 2026 Plural</span>
            <a href={LEGAL.license} className="inline-flex min-h-6 items-center text-muted no-underline hover:text-foreground">GPL-3.0-or-later</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
