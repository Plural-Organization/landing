"use client";

// Orbkit's WebGL orbs use hooks, so they render from this client island. Pixel styles only (MIT orbs).
import { Shdr14 } from "../components/orbkit/shdr-14";
import { Shdr23 } from "../components/orbkit/shdr-23";
import { Shdr29 } from "../components/orbkit/shdr-29";

type State = "idle" | "thinking" | "speaking";

export default function Orb({ kind, state, size }: { kind: "plasma" | "led" | "ascii"; state: State; size: number }) {
  if (kind === "plasma") return <Shdr14 size={size} state={state} colors={{ ink: "#0b0b0d", paper: "#d4d4d8" }} />;
  if (kind === "led") return <Shdr29 size={size} state={state} colors={{ lit: "#7fd4b0", wall: "#1b1e21" }} />;
  return <Shdr23 size={size} state={state} colors={{ glow: "#e8b45a", deep: "#0b0b0d" }} />;
}
