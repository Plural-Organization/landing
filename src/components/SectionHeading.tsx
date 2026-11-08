import type { ReactNode } from "react";

// heroui.com-style header: a two-tone headline, the explainer beside it on wide screens and under it on phones.
export default function SectionHeading({ id, lead, tail, children, align = "split", size = "lg" }: { id?: string; lead: ReactNode; tail?: ReactNode; children?: ReactNode; align?: "split" | "center"; size?: "lg" | "md" }) {
  const title = (
    <h2 id={id} className={`font-medium leading-[1.05] tracking-[-0.022em] ${size === "lg" ? "text-4xl md:text-5xl lg:text-[3.4rem]" : "text-3xl md:text-4xl"}`}>
      {lead}
      {tail && <><br /><span className="tone-2">{tail}</span></>}
    </h2>
  );
  if (align === "center")
    return (
      <div className="mx-auto max-w-2xl text-center">
        {title}
        {children && <p className="mx-auto mt-5 max-w-[56ch] text-lg leading-relaxed text-muted text-pretty">{children}</p>}
      </div>
    );
  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:items-start md:gap-16">
      {title}
      {children && <p className="max-w-[52ch] text-lg leading-relaxed text-muted text-pretty md:pt-3">{children}</p>}
    </div>
  );
}
