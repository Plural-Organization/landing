import type { Metadata } from "next";
import Image from "next/image";
import Footer from "../../components/Footer";
import Frame from "../../components/Frame";
import Nav from "../../components/Nav";
import { LINKS } from "../../data/site";
import { type ChangeKind, dayOf, EARLIER, type Release, RELEASES } from "../../data/updates";
import CopyButton from "../../islands/CopyButton";
import Reveal from "../../islands/Reveal";
import UpdatesTimeline from "../../islands/UpdatesTimeline";

export const metadata: Metadata = {
  title: "Updates · Plural",
  description: "Every Plural release, newest first: what changed for the people in the room.",
};

// Each kind of change wears one of the people's colours, the same three the rest of the site uses.
const KINDS: { kind: ChangeKind; label: string }[] = [
  { kind: "new", label: "New" },
  { kind: "improved", label: "Improved" },
  { kind: "fixed", label: "Fixed" },
];

const anchor = (version: string) => `v${version.replaceAll(".", "-")}`;

function Entry({ release, latest, index }: { release: Release; latest: boolean; index: number }) {
  return (
    <article id={anchor(release.version)} className="upd-entry scroll-mt-28" data-tone={index % 3}>
      <div className="upd-meta">
        <span className="upd-marker" aria-hidden="true" />
        <a href={`#${anchor(release.version)}`} className="upd-version">v{release.version}</a>
        <time dateTime={release.date} className="text-sm text-muted">{dayOf(release.date)}</time>
        {latest ? <span className="upd-latest">Latest</span> : null}
      </div>
      <Reveal className="reveal upd-body">
        <h2 className="text-3xl font-medium leading-[1.08] tracking-[-0.02em] md:text-[2.5rem]">{release.title}</h2>
        <p className="mt-3 max-w-[60ch] text-lg leading-relaxed text-muted text-pretty">{release.summary}</p>
        {release.shot ? (
          <Frame title={release.shot.frame} kind={release.shot.kind} className="mt-8">
            <Image src={release.shot.src} alt={release.shot.alt} width={release.shot.width} height={release.shot.height} sizes="(min-width: 1152px) 760px, 92vw" className="block h-auto w-full" />
          </Frame>
        ) : null}
        <div className="mt-8 flex flex-col gap-6">
          {KINDS.filter(({ kind }) => (release.changes[kind] ?? []).length > 0).map(({ kind, label }) => (
            <section key={kind} aria-label={label}>
              <span className="upd-kind" data-kind={kind}>{label}</span>
              <ul className="mt-3 flex flex-col gap-2.5">
                {(release.changes[kind] ?? []).map((line) => (
                  <li key={line} className="upd-line" data-kind={kind}>{line}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Reveal>
    </article>
  );
}

export default function Updates() {
  const latest = RELEASES[0]!;
  const previous = RELEASES[1]!;
  return (
    <>
      <Nav base="/" />
      <main id="top">
        <header className="upd-hero relative isolate overflow-hidden">
          <div className="pixel-grid" aria-hidden="true" />
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-16 pb-14 sm:px-6 md:pt-24 md:pb-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div>
            <a href={`#${anchor(latest.version)}`} className="upd-pill">
              <span className="upd-pill-dot" aria-hidden="true" />
              v{latest.version} · {latest.title}
            </a>
            <h1 className="mt-6 text-5xl font-medium leading-[0.98] tracking-[-0.03em] md:text-7xl">
              What&apos;s new
              <br />
              <span className="tone-2">in the room.</span>
            </h1>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted text-pretty">
              Every Plural release, newest first: what changed for the host, the people they invite and the agent between them.
            </p>
            <div className="mt-8 flex w-full max-w-md items-center gap-3 rounded-full border border-border bg-surface-secondary p-1.5 pr-5">
              <CopyButton text="plural update" label="Copy plural update" />
              <code className="font-mono text-[13px] text-foreground"><span className="select-none text-muted">$ </span>plural update</code>
            </div>
            </div>
            {/* What `plural update` prints, line for line, so the hero shows the thing the page is about. */}
            <Frame title="plural update" kind="terminal" className="upd-term hidden lg:block" >
              <pre aria-label="Output of plural update">
                <span className="upd-term-prompt">$</span> plural update{"\n"}
                updating plural {previous.version} <span className="upd-term-dim">→</span> {latest.version}{"\n"}
                <span className="upd-term-dim">&gt;</span> Downloading plural and plural-host{"\n"}
                <span className="upd-term-dim">&gt;</span> Starting the host once{"\n"}
                {"\n"}
                <span className="upd-term-ok">plural {latest.version} is installed.</span> Start plural again to use it{"\n"}
                <span className="upd-term-prompt">$</span> <span className="upd-term-caret" />
              </pre>
            </Frame>
          </div>
        </header>

        <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-24 sm:px-6 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="Releases" className="hidden lg:block">
            <ol className="upd-toc sticky top-28 flex flex-col">
              {RELEASES.map((release) => (
                <li key={release.version}>
                  <a href={`#${anchor(release.version)}`} className="upd-toc-link">
                    <span className="font-mono text-[12.5px]">v{release.version}</span>
                    <span className="truncate">{release.title}</span>
                  </a>
                </li>
              ))}
              <li>
                <a href="#earlier" className="upd-toc-link"><span className="font-mono text-[12.5px]">older</span><span>Earlier releases</span></a>
              </li>
            </ol>
          </nav>

          <div className="upd-timeline">
            <UpdatesTimeline />
            {RELEASES.map((release, index) => (
              <Entry key={release.version} release={release} latest={index === 0} index={index} />
            ))}

            <section id="earlier" aria-labelledby="earlier-title" className="upd-entry scroll-mt-28" data-tone={0}>
              <div className="upd-meta">
                <span className="upd-marker" aria-hidden="true" />
                <span className="upd-version">v0.1 – v0.2.18</span>
              </div>
              <div className="upd-body">
                <h2 id="earlier-title" className="text-3xl font-medium tracking-[-0.02em] md:text-[2.5rem]">Earlier releases</h2>
                <ul className="mt-6 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2">
                  {EARLIER.map((item) => (
                    <li key={item.version} className="flex flex-col gap-1 bg-background p-5">
                      <span className="flex items-baseline gap-3">
                        <span className="font-mono text-[13px] text-foreground">v{item.version}</span>
                        <time dateTime={item.date} className="text-[13px] text-muted">{dayOf(item.date)}</time>
                      </span>
                      <span className="text-[15px] leading-snug text-muted text-pretty">{item.line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </div>

        <section className="px-3 pb-16 sm:px-6">
          <div className="upd-cta relative isolate mx-auto flex max-w-6xl flex-col items-start gap-6 overflow-hidden rounded-[2rem] border border-border px-6 py-12 sm:px-12 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-medium tracking-[-0.02em] md:text-4xl">Every release, as it ships.</h2>
              <p className="mt-2 text-muted">Watch the repository for releases, or let plural tell you when one is out.</p>
            </div>
            <a href={LINKS.releases} className="upd-cta-button">All releases on GitHub</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
