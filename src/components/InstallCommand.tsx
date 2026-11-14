import CopyButton from "../islands/CopyButton";
import { INSTALL } from "../data/site";

// Copy sits first, so the action stays visible however much of the long command the width cuts off.
export default function InstallCommand({ className = "" }: { className?: string }) {
  return (
    <div className={`flex w-full max-w-xl items-center gap-3 rounded-3xl sm:rounded-full border border-border bg-surface-secondary p-1.5 pr-5 ${className}`}>
      <CopyButton text={INSTALL} />
      <code className="min-w-0 flex-1 break-all py-1 font-mono text-xs leading-snug text-foreground sm:overflow-x-auto sm:whitespace-nowrap sm:break-normal sm:py-0 sm:text-[13px] sm:[mask-image:linear-gradient(90deg,black_85%,transparent)] sm:[scrollbar-width:none]">
        <span className="select-none text-muted">$ </span>{INSTALL}
      </code>
    </div>
  );
}
