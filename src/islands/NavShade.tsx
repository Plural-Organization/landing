"use client";

import { useEffect, useRef } from "react";

// The header's scrolled shade, textured like the hero background: domain-warped noise (the same family as the hero's
// warp dither) drawn as 2px pixels with a 4x4 Bayer threshold, flowing slowly and fading out below the bar.
// Two layers give it depth: a far one (large, slow swirls) and a near one (smaller, faster). Both shift with the
// pointer and with the page's scroll, the near layer more, so the texture moves in parallax under the header.
// The texture covers the whole bar and a short tail under it, but parts around the logo, links and buttons (the elements
// marked data-nav-clear) like water around stones. There is no flat backing: dark pixels come from the wave's troughs,
// and around each control the wave runs darker and loses its light pixels, so they stay readable.
// It only animates while shown and while the tab is visible; with reduced motion it draws one still frame.
const PX = 2;
const FPS = 24;
const DARK = Math.round(255 * 0.8); // opacity of the dark (page-coloured) pixels the wave lays down
const CLEAR_PX = 18; // how far (screen px) the texture keeps away from each control
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

// Parallax strength, in noise-space units per unit of pointer (-1..1) and per screen pixel of scroll.
const FAR = { scale: 0.02, pointer: 0.9, scroll: 0.0016, glow: 26, alpha: 135 };
const NEAR = { scale: 0.038, pointer: 2.6, scroll: 0.005, glow: 34, alpha: 150 };

function smoothstep(a: number, b: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function noise(x: number, y: number) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash(ix, iy);
  const b = hash(ix + 1, iy);
  const c = hash(ix, iy + 1);
  const d = hash(ix + 1, iy + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

function fbm(x: number, y: number) {
  return (noise(x, y) * 0.5 + noise(x * 2.03, y * 2.03) * 0.25 + noise(x * 4.01, y * 4.01) * 0.125) / 0.875;
}

// Domain-warped noise in 0..1: the field is pushed around by itself, which gives the slow swirling look.
function warp(x: number, y: number, t: number) {
  const q = fbm(x + t * 0.08, y - t * 0.05);
  const r = fbm(x + 3.2 * q + t * 0.11, y + 3.2 * q + 1.7);
  return fbm(x + 2.6 * r, y + 2.6 * r - t * 0.04);
}

export default function NavShade({ on }: { on: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx || !on) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const twoLayers = window.matchMedia("(min-width: 768px)").matches; // phones draw the far layer only

    // The page colour, resolved from the theme token by letting the browser paint it.
    const probe = document.createElement("i");
    probe.style.cssText = "position:absolute;visibility:hidden;background:var(--background)";
    document.body.appendChild(probe);
    const swatch = document.createElement("canvas").getContext("2d")!;
    swatch.fillStyle = getComputedStyle(probe).backgroundColor;
    probe.remove();
    swatch.fillRect(0, 0, 1, 1);
    const [r, g, b] = swatch.getImageData(0, 0, 1, 1).data;

    // Pointer position, eased toward its target each frame; written by a passive listener, read in the draw loop.
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (!still) window.addEventListener("pointermove", onPointer, { passive: true });

    let w = 0;
    let h = 0;
    let fw = 0;
    let image: ImageData | null = null;
    let far = new Float32Array(0);
    let near = new Float32Array(0);
    let clear = new Float32Array(0); // per cell: 0 inside a control's pool, 1 out in the open texture

    // Distance from each cell to the nearest control box, turned into a soft 0..1 mask.
    const buildClearings = () => {
      clear = new Float32Array(w * h).fill(1);
      const header = el.closest("header");
      if (!header) return;
      const origin = el.getBoundingClientRect();
      const boxes = [...header.querySelectorAll<HTMLElement>("[data-nav-clear]")]
        .map((n) => n.getBoundingClientRect())
        .filter((b) => b.width > 0 && b.height > 0)
        .map((b) => ({ l: b.left - origin.left, t: b.top - origin.top, r: b.right - origin.left, b: b.bottom - origin.top }));
      for (let y = 0; y < h; y++) {
        const py = (y + 0.5) * PX;
        for (let x = 0; x < w; x++) {
          const px = (x + 0.5) * PX;
          let d = Infinity;
          for (const b of boxes) {
            const dx = Math.max(b.l - px, 0, px - b.r);
            const dy = Math.max(b.t - py, 0, py - b.b);
            d = Math.min(d, Math.hypot(dx, dy));
          }
          clear[y * w + x] = smoothstep(2, CLEAR_PX, d);
        }
      }
    };
    const resize = () => {
      w = Math.max(1, Math.ceil(el.clientWidth / PX));
      h = Math.max(1, Math.ceil(el.clientHeight / PX));
      el.width = w;
      el.height = h;
      image = ctx.createImageData(w, h);
      fw = Math.ceil(w / 2);
      far = new Float32Array(fw * Math.ceil(h / 2));
      near = new Float32Array(fw * Math.ceil(h / 2));
      buildClearings();
    };

    // Fill a half-resolution noise grid for one layer, offset by pointer and scroll for parallax.
    const sample = (out: Float32Array, layer: typeof FAR, t: number) => {
      const ox = pointer.x * layer.pointer;
      const oy = pointer.y * layer.pointer * 0.6 + window.scrollY * layer.scroll;
      for (let fy = 0; fy < out.length / fw; fy++) {
        for (let fx = 0; fx < fw; fx++) {
          out[fy * fw + fx] = warp(fx * 2 * layer.scale + ox, fy * 2 * layer.scale * 2.2 + oy, t);
        }
      }
    };

    const draw = (time: number) => {
      if (!image) return;
      const t = time / 1000;
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;
      sample(far, FAR, t);
      if (twoLayers) sample(near, NEAR, t * 1.3);
      const data = image.data;
      data.fill(0);
      for (let y = 0; y < h; y++) {
        const ny = (y + 0.5) / h; // 0 at the top of the bar, 1 at the bottom of the tail under it
        const fade = 1 - smoothstep(0.62, 1, ny); // everything thins out over the tail
        for (let x = 0; x < w; x++) {
          const k = (y >> 1) * fw + (x >> 1);
          const th = BAYER[(y & 3) * 4 + (x & 3)]!;
          const i = (y * w + x) * 4;
          const open = clear[y * w + x]!;
          const litFar = smoothstep(0.4, 0.76, far[k]!) * fade * open;
          const litNear = twoLayers ? smoothstep(0.5, 0.8, near[k]!) * fade * open * 0.8 : 0;
          if (litNear > th) {
            data[i] = r! + NEAR.glow; data[i + 1] = g! + NEAR.glow; data[i + 2] = b! + NEAR.glow; data[i + 3] = NEAR.alpha;
          } else if (litFar > th) {
            data[i] = r! + FAR.glow; data[i + 1] = g! + FAR.glow; data[i + 2] = b! + FAR.glow; data[i + 3] = FAR.alpha;
          } else {
            // The dark comes from the same wave: its low troughs lay down page-coloured pixels, and around the controls
            // the wave runs darker, so there is no flat backing anywhere, only the flowing field.
            const trough = 1 - smoothstep(0.28, 0.6, far[k]!);
            const dark = Math.min(1, trough * 0.75 + (1 - open) * 0.85) * fade;
            if (dark > th) { data[i] = r!; data[i + 1] = g!; data[i + 2] = b!; data[i + 3] = DARK; }
          }
        }
      }
      ctx.putImageData(image, 0, 0);
    };

    resize();
    const observer = new ResizeObserver(() => { resize(); draw(performance.now()); });
    observer.observe(el);

    let frame = 0;
    let last = 0;
    const loop = (time: number) => {
      frame = requestAnimationFrame(loop);
      if (document.hidden || time - last < 1000 / FPS) return;
      last = time;
      draw(time);
    };
    if (still) draw(0);
    else frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointer);
    };
  }, [on]);

  return (
    <div aria-hidden="true" data-on={on} className="nav-shade pointer-events-none absolute inset-x-0 top-0 -bottom-5 -z-10">
      <canvas ref={canvas} className="h-full w-full [image-rendering:pixelated]" />
    </div>
  );
}
