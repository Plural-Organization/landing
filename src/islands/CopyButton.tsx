import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [label, setLabel] = useState("copy");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setLabel("copied");
    } catch {
      setLabel("press ⌘C");
    }
    window.setTimeout(() => setLabel("copy"), 1600);
  };

  return (
    <button className="copy" type="button" onClick={copy}>
      {label}
    </button>
  );
}
