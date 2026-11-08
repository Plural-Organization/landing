import { LINKS, REPO } from "../data/site";
import LogoMark from "./LogoMark";

const columns = [
  { title: "Project", links: [["Source", REPO], ["Releases", LINKS.releases]] },
  { title: "Learn", links: [["Documentation", LINKS.docs], ["Threat model", LINKS.threatModel]] },
] as const;

export default function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
      <div className="grid gap-10 py-12 sm:grid-cols-[2fr_1fr_1fr]">
        <div>
          <a href="#top" className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-foreground no-underline">
            <LogoMark size={24} />
            plural
          </a>
          <p className="mt-3 text-sm text-muted">Multiplayer for coding agents.</p>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title} className="flex flex-col gap-2.5 text-sm">
            <span className="font-semibold text-foreground">{col.title}</span>
            {col.links.map(([label, href]) => (
              <a key={label} href={href} className="text-muted no-underline hover:text-foreground">{label}</a>
            ))}
          </nav>
        ))}
      </div>
      <div className="flex flex-wrap justify-between gap-2 text-xs text-muted">
        <span>GPL-3.0</span>
        <span>Built in the open</span>
      </div>
    </footer>
  );
}
