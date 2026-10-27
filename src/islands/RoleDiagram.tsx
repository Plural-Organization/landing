import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { ROLES, type Role } from "../data/roles";
import { AGENT, dance, FIGURES, H, sideAt, SIDES, W } from "../lib/logo";

const MARGIN = 4;
const BRIGHT = "#e9e8e4";
const FAINT = "#2a2b2f";
const PREFER: Record<string, ("right" | "left" | "above" | "below")[]> = {
  top: ["right", "left", "above", "below"],
  right: ["right", "below", "above", "left"],
  bottom: ["right", "left", "below", "above"],
  left: ["left", "below", "above", "right"],
  agent: ["left", "right", "below", "above"],
};

const byKey = Object.fromEntries(ROLES.map((role) => [role.key, role])) as Record<string, Role>;
const bySide = Object.fromEntries(ROLES.filter((role) => role.side).map((role) => [role.side, role.key])) as Record<string, string>;

export default function RoleDiagram() {
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const pop = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const focus = hover ?? pinned;
  const focusRef = useRef(focus);
  focusRef.current = focus;

  const geometry = useCallback(() => {
    const element = canvas.current!;
    const n = Math.floor(element.width / (Math.max(W, H) + MARGIN * 2));
    return { n, ox: Math.round((element.width - n * W) / 2), oy: Math.round((element.height - n * H) / 2) };
  }, []);

  useEffect(() => {
    const element = canvas.current!;
    const context = element.getContext("2d")!;
    let frame = 0;
    const draw = (now: number) => {
      const { n, ox, oy } = geometry();
      const current = focusRef.current;
      const side = current ? byKey[current]?.side ?? null : null;
      const t = now / 1000;
      context.clearRect(0, 0, element.width, element.height);
      for (const figureSide of SIDES) {
        const dancing = current === "agent" || figureSide === side;
        const [dx, dy] = dancing ? dance(t, current === "agent" ? SIDES.indexOf(figureSide) * 0.8 : 0) : [0, 0];
        context.fillStyle = !current || dancing ? BRIGHT : FAINT;
        for (const [x, y] of FIGURES[figureSide].cells) {
          context.fillRect(ox + (x + dx) * n, oy + (y + dy) * n, n, n);
        }
      }
      if (current === "agent") {
        const size = n * (3 + Math.round(Math.sin(t * 6) + 1));
        context.fillStyle = BRIGHT;
        context.fillRect(Math.round(ox + AGENT[0] * n - size / 2), Math.round(oy + AGENT[1] * n - size / 2), size, size);
      }
      frame = current ? requestAnimationFrame(draw) : 0;
    };
    const resize = () => {
      const rect = element.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      element.width = Math.round(rect.width * dpr);
      element.height = Math.round(rect.height * dpr);
      cancelAnimationFrame(frame);
      draw(performance.now());
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [geometry, focus]);

  useEffect(() => {
    const card = pop.current;
    const container = box.current;
    const element = canvas.current;
    if (!card || !container || !element || !focus) {
      return;
    }
    const place = () => {
      const role = byKey[focus]!;
      const d = container.getBoundingClientRect();
      const c = element.getBoundingClientRect();
      const { n, ox, oy } = geometry();
      const unit = (n * c.width) / element.width;
      const bx = c.left - d.left + (ox * c.width) / element.width;
      const by = c.top - d.top + (oy * c.height) / element.height;
      const cells = role.side ? FIGURES[role.side].cells : SIDES.flatMap((side) => FIGURES[side].cells);
      const xs = cells.map(([x]) => x);
      const ys = cells.map(([, y]) => y);
      const area = {
        left: bx + (Math.min(...xs) - 2) * unit,
        right: bx + (Math.max(...xs) + 3) * unit,
        top: by + (Math.min(...ys) - 4) * unit,
        bottom: by + (Math.max(...ys) + 2) * unit,
      };
      const w = card.offsetWidth;
      const h = card.offsetHeight;
      const gap = 14;
      const pad = 8;
      const view = { left: -d.left + pad, top: -d.top + pad, right: document.documentElement.clientWidth - d.left - pad, bottom: window.innerHeight - d.top - pad };
      const midX = (area.left + area.right) / 2;
      const midY = (area.top + area.bottom) / 2;
      const clampX = (x: number) => Math.max(view.left, Math.min(view.right - w, x));
      const clampY = (y: number) => Math.max(view.top, Math.min(view.bottom - h, y));
      const spots = {
        right: [area.right + gap, clampY(midY - h / 2)],
        left: [area.left - gap - w, clampY(midY - h / 2)],
        above: [clampX(midX - w / 2), area.top - gap - h],
        below: [clampX(midX - w / 2), area.bottom + gap],
      } as const;
      const fits = ([x, y]: readonly [number, number]) => x >= view.left && y >= view.top && x + w <= view.right && y + h <= view.bottom;
      const order = PREFER[role.side ?? "agent"]!;
      const first = spots[order[0]!];
      const [left, top] = order.map((key) => spots[key]).find(fits) ?? [clampX(first[0]), clampY(first[1])];
      card.style.left = `${left}px`;
      card.style.top = `${top}px`;
    };
    place();
    window.addEventListener("scroll", place, { passive: true });
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place);
      window.removeEventListener("resize", place);
    };
  }, [focus, geometry]);

  const roleAt = (event: MouseEvent<HTMLCanvasElement>): string | null => {
    const element = canvas.current!;
    const rect = element.getBoundingClientRect();
    const { n, ox, oy } = geometry();
    const scale = element.width / rect.width;
    const x = ((event.clientX - rect.left) * scale - ox) / n;
    const y = ((event.clientY - rect.top) * scale - oy) / n;
    if (Math.hypot(x - AGENT[0], y - AGENT[1]) < 7) return "agent";
    if (x < -3 || y < -3 || x > W + 3 || y > H + 3) return null;
    return bySide[sideAt(x, y)] ?? null;
  };

  const toggle = (key: string | null) => setPinned((current) => (current === key ? null : key));
  const role = focus ? byKey[focus] : undefined;

  return (
    <div className="diagram" ref={box}>
      <canvas
        ref={canvas}
        aria-hidden="true"
        onPointerMove={(event) => event.pointerType === "mouse" && setHover(roleAt(event))}
        onPointerLeave={() => setHover(null)}
        onClick={(event) => toggle(roleAt(event) ?? "agent")}
      />
      {ROLES.map((item) => (
        <button
          key={item.key}
          type="button"
          className={`tag t-${item.side ?? "agent"}`}
          aria-pressed={focus === item.key}
          onMouseEnter={() => setHover(item.key)}
          onMouseLeave={() => setHover(null)}
          onFocus={() => setHover(item.key)}
          onBlur={() => setHover(null)}
          onClick={() => toggle(item.key)}
        >
          {item.side === "left" ? "guest" : item.name}
        </button>
      ))}
      <div className={`pop${role ? " show" : ""}`} ref={pop} role="tooltip" aria-live="polite">
        {role ? (
          <>
            <div className="pop-name">
              {role.name} <small>{role.note}</small>
            </div>
            <ul>
              {role.can.map((line) => (
                <li key={line}>{line}</li>
              ))}
              {role.cannot.map((line) => (
                <li key={line} className="no">
                  {line}
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </div>
  );
}

