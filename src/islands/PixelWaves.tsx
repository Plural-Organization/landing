"use client";

import { useEffect, useRef } from "react";
import { PEOPLE } from "../components/problem/people";

// A pixel sea under the hero. The field is computed once per cell (not per screen pixel), ordered-dithered through a
// 4x4 Bayer matrix and blown up with nearest-neighbour scaling, so every cell stays a hard square. Swells roll in from
// the right, crests pick up the team's colours as they travel, and the pointer drops ripples into the water.
// Off-screen, in a hidden tab, or with reduced motion it stops (reduced motion keeps one still frame).

const CELL = 6; // CSS px per pixel cell
const FPS = 30;
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
const BG: [number, number, number] = [20, 20, 22];
const TINTS = [PEOPLE.alia, PEOPLE.bek, PEOPLE.cleo].map((hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as [number, number, number]);

type Ripple = { x: number; y: number; t0: number; power: number };

function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

// Smooth value noise, enough to break the sines up so the sea never looks like a screensaver.
function noise(x: number, y: number) {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = x - ix, fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy);
  const a = hash(ix, iy), b = hash(ix + 1, iy), c = hash(ix, iy + 1), d = hash(ix + 1, iy + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

export default function PixelWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cols = 0, rows = 0;
    let image: ImageData | null = null;
    let raf = 0, last = 0, visible = true;
    const start = performance.now();
    const ripples: Ripple[] = [];
    const pointer = { x: -1, y: -1, on: false };

    const resize = () => {
      const box = host.getBoundingClientRect();
      cols = Math.max(1, Math.ceil(box.width / CELL));
      rows = Math.max(1, Math.ceil(box.height / CELL));
      canvas.width = cols;
      canvas.height = rows;
      image = ctx.createImageData(cols, rows);
      draw(performance.now());
    };

    const draw = (now: number) => {
      if (!image) return;
      const t = (now - start) / 1000;
      const data = image.data;
      // Ripples live ~3s; drop the spent ones.
      for (let i = ripples.length - 1; i >= 0; i--) if (t - ripples[i]!.t0 > 3.2) ripples.splice(i, 1);

      for (let y = 0; y < rows; y++) {
        const v = y / rows; // 0 top .. 1 bottom
        // The sea sits low: calm sky above, swell grows toward the bottom edge.
        const depth = Math.min(1, Math.max(0, (v - 0.22) / 0.7));
        const horizon = depth * depth * (3 - 2 * depth);
        for (let x = 0; x < cols; x++) {
          const u = x / rows; // keep wave proportions independent of aspect ratio
          const warp = noise(u * 2.2 + t * 0.08, v * 3 - t * 0.05) * 1.6;
          let h =
            Math.sin(u * 7 + v * 2.5 + t * 1.1 + warp) * 0.5 +
            Math.sin(u * 13 - v * 4 + t * 1.7 + warp * 0.7) * 0.25 +
            Math.sin(u * 3.1 + v * 9 + t * 0.6) * 0.25;
          h = h * 0.5 + 0.5;

          let ring = 0;
          for (const r of ripples) {
            const age = t - r.t0;
            const d = Math.hypot(x - r.x, y - r.y);
            const front = age * 38; // cells per second
            const band = d - front;
            if (band > -10 && band < 6) ring += Math.cos(band * 0.9) * Math.exp(-age * 1.3) * r.power * Math.max(0, 1 - Math.abs(band) / 10);
          }
          if (pointer.on) {
            const d = Math.hypot(x - pointer.x, y - pointer.y);
            ring += Math.max(0, 1 - d / 22) * 0.35;
          }

          // Brightness: crests near the bottom, plus whatever the pointer stirred up anywhere.
          const level = Math.min(1, h * horizon * 0.85 + Math.max(0, ring) * 0.9);
          const threshold = BAYER[(y & 3) * 4 + (x & 3)]!;
          const on = level > threshold;
          const crest = on && level > 0.78;

          const i = (y * cols + x) * 4;
          if (!on) {
            data[i] = BG[0]; data[i + 1] = BG[1]; data[i + 2] = BG[2]; data[i + 3] = 0;
            continue;
          }
          if (crest) {
            // Colour drifts along the sea: coral, mint, blue, slowly handing over to one another.
            const k = (u * 0.35 + t * 0.04) % 3;
            const a = TINTS[Math.floor(k)]!, b = TINTS[(Math.floor(k) + 1) % 3]!;
            const f = k - Math.floor(k);
            data[i] = a[0] + (b[0] - a[0]) * f;
            data[i + 1] = a[1] + (b[1] - a[1]) * f;
            data[i + 2] = a[2] + (b[2] - a[2]) * f;
            data[i + 3] = 200;
          } else {
            data[i] = 255; data[i + 1] = 255; data[i + 2] = 255;
            data[i + 3] = 18 + level * 70;
          }
        }
      }
      ctx.putImageData(image, 0, 0);
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden || now - last < 1000 / FPS) return;
      last = now;
      draw(now);
    };

    const toCell = (e: PointerEvent) => {
      const box = host.getBoundingClientRect();
      return { x: (e.clientX - box.left) / CELL, y: (e.clientY - box.top) / CELL };
    };
    let lastDrop = 0;
    const move = (e: PointerEvent) => {
      const p = toCell(e);
      pointer.x = p.x; pointer.y = p.y; pointer.on = true;
      const t = (performance.now() - start) / 1000;
      if (t - lastDrop > 0.35) { lastDrop = t; ripples.push({ ...p, t0: t, power: 0.45 }); }
    };
    const down = (e: PointerEvent) => ripples.push({ ...toCell(e), t0: (performance.now() - start) / 1000, power: 1.2 });
    const leave = () => { pointer.on = false; };

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    if (still) return () => ro.disconnect();

    const io = new IntersectionObserver((entries) => { visible = entries.some((e) => e.isIntersecting); });
    io.observe(host);
    // The hero copy sits above this layer, so listen on the hero section itself.
    const hero = host.closest("section") ?? host;
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerdown", down);
    hero.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerdown", down);
      hero.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pixel-waves pointer-events-none absolute inset-0 -z-10">
      <canvas ref={canvasRef} className="h-full w-full [image-rendering:pixelated]" />
    </div>
  );
}
