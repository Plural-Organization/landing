"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Frame from "../components/Frame";
import { TOUR } from "../data/content";

// The room in three beats. On a desktop the steps stand on the left, under the section's heading (passed as children),
// and the capture changes on the right; below that the order is heading, capture, steps. The captures sit on top of each
// other and cross-fade. The bar on the active step fills and, when it ends, the next step takes over: it is a CSS
// animation, so readers who reduce motion get no auto-advance, and it only runs while the tour is on screen and nobody
// is hovering or tabbing through it.
export default function RoomTour({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(0);
  const [onScreen, setOnScreen] = useState(false);
  const [held, setHeld] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = box.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      return;
    }
    const observer = new IntersectionObserver((entries) => setOnScreen(entries.some((entry) => entry.isIntersecting)), { threshold: 0.35 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const pick = (index: number) => setActive((index + TOUR.length) % TOUR.length);

  return (
    <div
      ref={box}
      className="tour"
      data-playing={onScreen && !held}
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <div className="tour-side">
        <div className="tour-head">{children}</div>
        <div
          role="tablist"
          aria-label="The room, step by step"
          aria-orientation="vertical"
          className="tour-steps"
          onKeyDown={(event) => {
            const step = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
            if (step !== 0) {
              event.preventDefault();
              const next = (active + step + TOUR.length) % TOUR.length;
              pick(next);
              document.getElementById(`tour-tab-${TOUR[next]!.key}`)?.focus();
            }
          }}
        >
          {TOUR.map((step, index) => (
            <button
              key={step.key}
              id={`tour-tab-${step.key}`}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-controls={`tour-panel-${step.key}`}
              tabIndex={index === active ? 0 : -1}
              data-active={index === active}
              onClick={() => pick(index)}
              className="tour-step"
            >
              <span className="tour-bar" aria-hidden="true">
                <i onAnimationEnd={() => pick(index + 1)} />
              </span>
              <span className="flex items-center gap-2.5">
                <span className="tour-num" aria-hidden="true">{index + 1}</span>
                <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted">{step.label}</span>
              </span>
              <span className="mt-2.5 block text-[17px] font-medium leading-snug tracking-tight text-foreground lg:text-lg">{step.title}</span>
              <span className="tour-fold">
                <span className="tour-body block pt-1.5 text-[15px] leading-relaxed text-muted text-pretty">{step.body}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <Frame title="plrl.host/app" className="tour-frame">
        <div className="tour-stage">
          {TOUR.map((step, index) => (
            <div key={step.key} id={`tour-panel-${step.key}`} role="tabpanel" aria-labelledby={`tour-tab-${step.key}`} aria-hidden={index !== active} className="tour-shot" data-active={index === active} data-focus={step.focus}>
              <Image src={step.src} alt={step.alt} width={2880} height={1800} quality={90} priority={index === 0} sizes="(min-width: 1280px) 1360px, (min-width: 1024px) 110vw, (min-width: 640px) 92vw, 160vw" className="tour-img" />
            </div>
          ))}
        </div>
      </Frame>
    </div>
  );
}
