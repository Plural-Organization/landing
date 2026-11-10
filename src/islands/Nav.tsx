"use client";

import { GithubLogo, List, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import ButtonLink from "../components/ButtonLink";
import LogoMark from "../components/LogoMark";
import NavShade from "./NavShade";
import { LINKS, REPO } from "../data/site";

const items = [
  { href: "#product", label: "Product" },
  { href: "#roles", label: "Roles" },
  { href: "#faq", label: "FAQ" },
  { href: LINKS.docs, label: "Docs" },
];

// The bar keeps its size and shape at every scroll position. Once the page scrolls, a pixel shade appears behind it
// (NavShade): the hero's flowing pixel texture across the bar, parting around the logo, links and buttons
// (each marked data-nav-clear) so they stay readable.
// A sentinel at the top of the document says when, so nothing listens to scroll events.
// Below md the links move into a menu opened from the bar.
export default function Nav() {
  const sentinel = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const element = sentinel.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry!.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="pointer-events-none absolute top-0 h-8 w-px" />
      <header data-scrolled={scrolled} className="nav-bar sticky top-0 z-50 flex justify-center px-3 pt-3 sm:px-4">
        <NavShade on={scrolled || open} />
        <div className="flex h-16 w-full max-w-6xl items-center px-3 sm:px-4 md:grid md:grid-cols-[1fr_auto_1fr]">
          <a href="#top" aria-label="Plural home" data-nav-clear className="flex items-center gap-3 justify-self-start text-[1.4rem] font-semibold tracking-[-0.03em] text-foreground no-underline">
            <LogoMark size={30} />
            plural
          </a>
          <nav aria-label="Main" data-nav-clear className="hidden items-center gap-1 md:flex">
            {items.map((item) => (
              <a key={item.href} href={item.href} className="rounded-full px-3.5 py-2 text-[15px] text-muted no-underline transition-colors hover:text-foreground">
                {item.label}
              </a>
            ))}
          </nav>
          <div data-nav-clear className="ml-auto flex items-center gap-2 justify-self-end">
            <ButtonLink href={REPO} target="_blank" rel="noopener" variant="ghost" className="hidden sm:inline-flex">
              <GithubLogo size={18} />
              GitHub
            </ButtonLink>
            <ButtonLink href="#install">Get started</ButtonLink>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 place-items-center rounded-full text-foreground active:scale-95 md:hidden"
            >
              {open ? <X size={22} /> : <List size={22} />}
            </button>
          </div>
        </div>
        {open && (
          <nav id="mobile-menu" aria-label="Main" className="absolute inset-x-3 top-[calc(100%+0.25rem)] rounded-3xl border border-border bg-surface p-2 shadow-[0_24px_48px_-20px_rgb(0_0_0/0.8)] md:hidden">
            {[...items, { href: REPO, label: "GitHub" }].map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3.5 text-[17px] text-foreground no-underline active:bg-surface-secondary">
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
