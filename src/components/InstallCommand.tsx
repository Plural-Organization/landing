import CopyButton from "../islands/CopyButton";
import { INSTALL } from "../data/site";

// Copy sits first, so the action stays visible however much of the long command the width cuts off.
export default function InstallCommand({ className = "" }: { className?: string }) {
  return (
    <div className={`flex w-full max-w-xl items-center gap-3 rounded-full border border-border bg-surface-secondary p-1.5 pr-5 ${className}`}>
      <CopyButton text={INSTALL} />
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-[13px] text-foreground [mask-image:linear-gradient(90deg,black_85%,transparent)] [scrollbar-width:none]">
        <span className="select-none text-muted">$ </span>{INSTALL}
      </code>
    </div>
  );
}
