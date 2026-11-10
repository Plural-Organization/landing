"use client";

import { useEffect, useState, type ReactNode } from "react";

// Temporary: shows one of the problem-section variants, picked with ?problem=<key>; falls back to `initial`.
export default function ProblemSwitch({ variants, initial }: { variants: Record<string, ReactNode>; initial: string }) {
  const [key, setKey] = useState(initial);
  useEffect(() => {
    const k = new URLSearchParams(window.location.search).get("problem");
    if (k && k in variants) setKey(k);
  }, [variants]);
  return <>{variants[key]}</>;
}
