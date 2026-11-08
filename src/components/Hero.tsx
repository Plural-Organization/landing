import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { WEB_CLIENT } from "../data/site";
import HeroSlot from "../islands/HeroSlot";
import ButtonLink from "./ButtonLink";
import DitherLogo from "../islands/DitherLogo";
import YouCursor from "../islands/YouCursor";
import HeroParallax from "../islands/HeroParallax";
import Providers from "./Providers";

export default function Hero() {
  // The first screen holds only the hero and the connectors; the product frame starts below the fold.
  return (
    <section id="top" className="relative isolate -mt-[76px] flex min-h-[100dvh] flex-col overflow-hidden pt-[76px]">
      <DitherLogo />
      {/* A neutral scrim under the copy, so the dithered logo stays loud at the edges and quiet behind the words. */}
      <div aria-hidden="true" className="hero-scrim pointer-events-none absolute inset-0 -z-10" />
      <YouCursor />
      <HeroParallax />
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
        <h1 className="text-[11vw] font-medium leading-[1.04] tracking-[-0.022em] sm:text-7xl md:text-[5.6rem]">
          <span className="sr-only">Multiplayer for coding agents.</span>
          <span aria-hidden="true" className="block">
            <span className="hero-slot-line">
              <span className="hero-word">Multiplayer</span>
              <HeroSlot set="providers" tilt={-8} />
              <span className="hero-word">for</span>
            </span>
            <br />
            <span className="hero-slot-line tone-2" style={{ ["--slot-delay" as string]: ".7s" }}>
              <span className="hero-word">coding</span>
              <HeroSlot set="people" tilt={6} delay={1300} />
              <span className="hero-word">agents.</span>
            </span>
          </span>
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-foreground/75 text-pretty md:text-xl">
          Your agent&apos;s context <mark className="hero-mark">lives with one person</mark>. Plural puts the team in{" "}
          <mark className="hero-mark">the same session</mark>, so nobody re-explains anything.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#install" size="lg">Install plural</ButtonLink>
          <ButtonLink href={WEB_CLIENT} variant="tertiary" size="lg">
            Join from browser
            <ArrowRight size={17} />
          </ButtonLink>
        </div>
      </div>
      <Providers />
    </section>
  );
}
