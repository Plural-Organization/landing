"use client";

import { GithubLogo } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import ButtonLink from "../components/ButtonLink";
import LogoMark from "../components/LogoMark";
import { LINKS, REPO } from "../data/site";

const items = [
  { href: "#product", label: "Product" },
  { href: "#roles", label: "Roles" },
  { href: "#faq", label: "FAQ" },
  { href: LINKS.docs, label: "Docs" },
];

// Temporary: which scrolled-header treatment to build while the options are compared (see .nav-v-* in globals.css).
const VARIANT = process.env.NEXT_PUBLIC_NAV ?? "glass";

// The bar keeps its size and shape at every scroll position. What changes once the page scrolls depends on VARIANT.
// A sentinel at the top of the document says when the page has scrolled; only the "headroom" variant also needs
// the scroll direction, read once per frame from a passive listener.
export default function Nav() {
  const sentinel = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const element = sentinel.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry!.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (VARIANT !== "headroom") return;
    let last = window.scrollY;
    let frame = 0;
    const read = () => {
      frame = 0;
      const y = window.scrollY;
      if (Math.abs(y - last) > 6) { setHidden(y > last && y > 120); last = y; }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(read); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, []);

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="pointer-events-none absolute top-0 h-8 w-px" />
      <header data-scrolled={scrolled} data-hidden={hidden} className={`nav-v nav-v-${VARIANT} sticky top-0 z-50 flex justify-center px-3 pt-3 sm:px-4`}>
        <div className="flex h-16 w-full max-w-6xl items-center px-3 sm:px-4 md:grid md:grid-cols-[1fr_auto_1fr]">
          <a href="#top" aria-label="Plural home" className="nav-isl flex items-center gap-3 justify-self-start text-[1.4rem] font-semibold tracking-[-0.03em] text-foreground no-underline">
            <LogoMark size={30} />
            plural
          </a>
          <nav aria-label="Main" className="nav-isl hidden items-center gap-1 md:flex">
            {items.map((item) => (
              <a key={item.href} href={item.href} className="rounded-full px-3.5 py-2 text-[15px] text-muted no-underline transition-colors hover:text-foreground">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="nav-isl ml-auto flex items-center gap-2 justify-self-end">
            <ButtonLink href={REPO} target="_blank" rel="noopener" variant="ghost" className="hidden sm:inline-flex">
              <GithubLogo size={18} />
              GitHub
            </ButtonLink>
            <ButtonLink href="#install">Get started</ButtonLink>
          </div>
        </div>
      </header>
    </>
  );
}
