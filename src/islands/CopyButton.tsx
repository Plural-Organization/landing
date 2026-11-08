"use client";

import { Button } from "@heroui/react";
import { Check, Copy } from "@phosphor-icons/react";
import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 1600);
  };

  return (
    <Button size="sm" variant="primary" onPress={copy} aria-label="Copy install command" className="shrink-0">
      {state === "copied" ? <Check size={15} weight="bold" /> : <Copy size={15} />}
      {state === "copied" ? "Copied" : state === "failed" ? "Press ⌘C" : "Copy"}
    </Button>
  );
}
