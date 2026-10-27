import { LOGO_ROWS } from "./logo-rows";

export type Side = "top" | "right" | "bottom" | "left";
export type Cell = readonly [number, number];

export interface Figure {
  side: Side;
  cells: Cell[];
  center: Cell;
  dir: Cell;
}

export const SIDES: readonly Side[] = ["top", "right", "bottom", "left"];
export const H = LOGO_ROWS.length;
export const W = Math.max(...LOGO_ROWS.map((row) => row.length));
export const MX = (W - 1) / 2;
export const MY = (H - 1) / 2;
export const AGENT: Cell = [MX, MY + 2];

export function isOn(x: number, y: number): boolean {
  return LOGO_ROWS[y]?.[x] === "#";
}

export function sideAt(x: number, y: number): Side {
  return Math.abs(x - MX) > Math.abs(y - MY) ? (x > MX ? "right" : "left") : y > MY ? "bottom" : "top";
}

function centroid(cells: Cell[]): Cell {
  const [sx, sy] = cells.reduce(([ax, ay], [x, y]) => [ax + x, ay + y], [0, 0]);
  return [sx / cells.length, sy / cells.length];
}

function components(): Cell[][] {
  const seen = new Set<string>();
  const found: Cell[][] = [];
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (!isOn(x, y) || seen.has(`${x},${y}`)) {
        continue;
      }
      const cells: Cell[] = [];
      const stack: Cell[] = [[x, y]];
      seen.add(`${x},${y}`);
      while (stack.length > 0) {
        const [cx, cy] = stack.pop()!;
        cells.push([cx, cy]);
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const key = `${cx + dx},${cy + dy}`;
            if (isOn(cx + dx, cy + dy) && !seen.has(key)) {
              seen.add(key);
              stack.push([cx + dx, cy + dy]);
            }
          }
        }
      }
      found.push(cells);
    }
  }
  return found;
}

export const FIGURES: Record<Side, Figure> = (() => {
  const bySide = { top: [], right: [], bottom: [], left: [] } as Record<Side, Cell[]>;
  for (const cells of components()) {
    const [cx, cy] = centroid(cells);
    bySide[sideAt(cx, cy)].push(...cells);
  }
  const figures = {} as Record<Side, Figure>;
  for (const side of SIDES) {
    const cells = bySide[side];
    const center = centroid(cells);
    const length = Math.hypot(center[0] - MX, center[1] - MY) || 1;
    figures[side] = { side, cells, center, dir: [(center[0] - MX) / length, (center[1] - MY) / length] };
  }
  return figures;
})();

export function dance(t: number, phase: number): Cell {
  return [Math.round(Math.sin(t * 5 + phase) * 1.2), -Math.round(Math.abs(Math.sin(t * 10 + phase)) * 2.6)];
}
