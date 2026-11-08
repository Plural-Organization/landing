import { ArrowRight, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import { STEPS } from "../data/content";
import { REPO, WEB_CLIENT } from "../data/site";
import ButtonLink from "./ButtonLink";
import InstallCommand from "./InstallCommand";

export default function Install() {
  return (
    <section id="install" aria-labelledby="install-title" className="scroll-mt-24 px-3 py-20 sm:px-6">
      <div className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-border bg-surface px-5 py-20 sm:px-12 md:py-28">
        <div className="flex flex-col items-center text-center">
          <h2 id="install-title" className="text-4xl font-medium leading-[1.02] tracking-[-0.022em] md:text-7xl">
            Give your agent
            <br />
            <span className="tone-2">a room.</span>
          </h2>
          <p className="mt-5 max-w-md text-lg text-muted text-pretty">Free and open source. Runs on your machine, with the login you already have.</p>
          <InstallCommand className="mt-10" />
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <ButtonLink href={WEB_CLIENT} variant="tertiary">
              Join from browser
              <ArrowRight size={16} />
            </ButtonLink>
            <ButtonLink href={REPO} variant="ghost">
              <GithubLogo size={17} weight="fill" />
              Source on GitHub
            </ButtonLink>
          </div>
        </div>
        <ol className="mx-auto mt-16 grid max-w-4xl gap-8 text-left sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex gap-4">
              <span className="grid size-7 shrink-0 place-items-center rounded-full border border-border font-mono text-xs text-muted" aria-hidden="true">{i + 1}</span>
              <div>
                <h3 className="font-medium tracking-tight">{s.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-muted">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
