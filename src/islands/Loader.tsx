import { useEffect, useRef, useState } from "react";
import { FIGURES, H, SIDES, W, type Figure } from "../lib/logo";

const HOST_AT = 0.12;
const HOST_DUR = 0.28;
const JOIN_AT = [0, 0.56, 0.9, 1.24];
const JOIN_DUR = 0.2;
const GLITCH_DUR = 0.16;
const ALL_AT = 1.44;
const OUT_AT = 1.78;
const OUT_DUR = 0.3;
const REVEAL_AT = 1.86;
const REVEAL_DUR = 0.85;
const END = REVEAL_AT + REVEAL_DUR;
const SETTLE_MS = 950;
const CHANNELS: [string, number][] = [
  ["#ff2a3d", -1],
  ["#2aff7a", 0],
  ["#3a6bff", 1],
];

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const easeOutBack = (t: number) => 1 + 2.9 * Math.pow(t - 1, 3) + 1.9 * Math.pow(t - 1, 2);
const noise = (n: number) => {
  const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

interface FigureState {
  count: number;
  dx: number;
  dy: number;
  glitch: number;
}

function stateOf(figure: Figure, index: number, order: number[], t: number): FigureState {
  if (index === 0) {
    const p = clamp((t - HOST_AT) / HOST_DUR);
    return { count: Math.floor(easeOutExpo(p) * order.length), dx: 0, dy: 0, glitch: p > 0 && p < 1 ? 0.25 : 0 };
  }
  const start = JOIN_AT[index] ?? 0;
  if (t < start) {
    return { count: 0, dx: 0, dy: 0, glitch: 0 };
  }
  const distance = (1 - easeOutBack(clamp((t - start) / JOIN_DUR))) * 34;
  return {
    count: order.length,
    dx: Math.round(figure.dir[0] * distance),
    dy: Math.round(figure.dir[1] * distance),
    glitch: clamp(1 - (t - start) / (JOIN_DUR + GLITCH_DUR)),
  };
}

function statusAt(t: number, joined: number): string {
  const total = SIDES.length;
  if (t >= OUT_AT) return "entering the room";
  if (t >= ALL_AT) return `${total}/${total} in the room · one agent`;
  if (joined === 0) return "";
  return `${joined === 1 ? "host opened the room" : "+ participant joined"} · ${joined}/${total}`;
}

export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState("");
  const [fading, setFading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const page = document.getElementById("page");
    const finishPage = () => {
      page?.classList.add("glitching");
      window.setTimeout(() => page?.classList.remove("glitching"), SETTLE_MS);
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || canvas.current === null) {
      setDone(true);
      return;
    }
    const element = canvas.current;
    const context = element.getContext("2d")!;
    const orders = SIDES.map((side) => FIGURES[side].cells.map((_, index) => index).sort(() => Math.random() - 0.5));
    let width = 0;
    let height = 0;
    let cell = 0;
    let ox = 0;
    let oy = 0;
    let bands: { y: number; h: number; at: number }[] = [];
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.round(window.innerWidth * dpr);
      height = Math.round(window.innerHeight * dpr);
      element.width = width;
      element.height = height;
      cell = Math.max(2, Math.floor((Math.min(width, height) * 0.28) / Math.max(W, H)));
      ox = Math.round((width - cell * W) / 2);
      oy = Math.round((height - cell * H) / 2);
      bands = [];
      for (let y = 0, i = 0; y < height; i++) {
        const h = Math.round((6 + noise(i * 3.1) * 54) * dpr);
        bands.push({ y, h, at: noise(i * 7.7 + 1) });
        y += h;
      }
    };
    resize();
    window.addEventListener("resize", resize);
    document.documentElement.style.overflow = "hidden";

    const drawFigures = (t: number) => {
      const frame = Math.floor(t * 30);
      const out = clamp((t - OUT_AT) / OUT_DUR);
      const shift = (glitch: number, y: number) =>
        glitch > 0 && noise(frame * 97 + y * 7) < 0.35 * glitch ? Math.round((noise(frame + y * 13) - 0.5) * 12 * glitch) : 0;
      context.globalCompositeOperation = "lighter";
      for (const [color, channel] of CHANNELS) {
        context.fillStyle = color;
        SIDES.forEach((side, index) => {
          const figure = FIGURES[side];
          const order = orders[index]!;
          const state = stateOf(figure, index, order, t);
          const glitch = Math.max(state.glitch, out);
          const split = Math.round(glitch * 4) * channel;
          for (let i = 0; i < state.count; i++) {
            const [x, y] = figure.cells[order[i]!]!;
            if (out > 0 && noise(x * 31 + y * 17 + 5) < out * out) continue;
            context.fillRect(ox + (x + state.dx + shift(glitch, y + state.dy) + split) * cell, oy + (y + state.dy) * cell, cell, cell);
          }
        });
      }
      context.globalCompositeOperation = "source-over";
    };

    const drawReveal = (t: number) => {
      const p = clamp((t - REVEAL_AT) / REVEAL_DUR);
      const frame = Math.floor(t * 30);
      context.globalAlpha = 1 - 0.7 * p * p;
      for (const band of bands) {
        if (band.at < p * 1.25 - 0.1) {
          if (band.at > p * 1.25 - 0.3 && noise(frame + band.y) < 0.5) {
            context.fillStyle = noise(band.y + frame) < 0.5 ? "rgba(255,42,61,.22)" : "rgba(58,107,255,.22)";
            context.fillRect(noise(band.y + frame * 7) * width, band.y, width * (0.1 + noise(band.y * 3 + frame) * 0.5), Math.max(2, band.h * 0.3));
          }
          continue;
        }
        const jitter = p > 0 && p < 0.5 && noise(band.y * 5 + frame) < 0.2 ? (noise(frame * 3 + band.y) - 0.5) * width * 0.04 : 0;
        context.fillStyle = "#000";
        context.fillRect(Math.min(0, jitter), band.y, width + Math.abs(jitter), band.h);
      }
      context.globalAlpha = 1;
    };

    let frameId = 0;
    let revealing = false;
    let finished = false;
    let shown = "";
    const start = performance.now();
    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(frameId);
      document.documentElement.style.overflow = "";
      setDone(true);
    };
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      if (t >= REVEAL_AT && !revealing) {
        revealing = true;
        root.current?.classList.add("revealing");
        finishPage();
      }
      context.clearRect(0, 0, width, height);
      if (revealing) {
        drawReveal(t);
      } else {
        context.fillStyle = "#000";
        context.fillRect(0, 0, width, height);
      }
      if (t < OUT_AT + OUT_DUR) {
        drawFigures(t);
      }
      const joined = SIDES.filter((side, index) => stateOf(FIGURES[side], index, orders[index]!, t).count > 0).length;
      const next = statusAt(t, joined);
      if (next !== shown) {
        shown = next;
        setStatus(next);
      }
      setFading(t >= OUT_AT);
      if (t >= END) {
        finish();
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };
    frameId = requestAnimationFrame(tick);
    const skip = () => {
      if (!revealing) finishPage();
      finish();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") skip();
    };
    window.addEventListener("keydown", onKey, { once: true });
    root.current?.querySelector("button")?.addEventListener("click", skip);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (done) {
    return null;
  }
  return (
    <div className="loader" ref={root} aria-hidden="true">
      <canvas ref={canvas} />
      <div className={`loader-status${fading ? " fading" : ""}`}>{status || " "}</div>
      <button className="loader-skip" type="button">
        skip →
      </button>
    </div>
  );
}
