import type { ReactNode } from "react";
import { REPO } from "../data/site";
import Footer from "./Footer";
import LogoMark from "./LogoMark";

// Shared frame of the legal pages: the brand bar, a two-tone title, readable prose, the site footer.
export default function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <header className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="/" aria-label="Plural home" className="flex items-center gap-3 text-[1.4rem] font-semibold tracking-[-0.03em] text-foreground no-underline">
          <LogoMark size={30} />
          plural
        </a>
        <a href={REPO} className="text-sm text-muted no-underline hover:text-foreground">GitHub</a>
      </header>
      <main id="top" className="mx-auto max-w-3xl px-4 pb-16 pt-10 sm:px-6">
        <h1 className="text-4xl font-medium leading-[1.05] tracking-[-0.022em] md:text-5xl">{title}</h1>
        <p className="mt-4 text-sm text-muted">Last updated {updated}</p>
        <div className="mt-10 flex flex-col gap-10">{children}</div>
      </main>
      <Footer />
    </>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3 text-[17px] leading-relaxed text-muted [&_a]:text-foreground [&_a]:underline [&_li]:ml-5 [&_li]:list-disc [&_strong]:font-medium [&_strong]:text-foreground [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5">
      <h2 className="text-2xl font-medium tracking-[-0.015em] text-foreground">{title}</h2>
      {children}
    </section>
  );
}
