import { ArrowRight, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import { STEPS } from "../data/content";
import { REPO, WEB_CLIENT } from "../data/site";
import ButtonLink from "./ButtonLink";
import InstallCommand from "./InstallCommand";

export default function Install() {
  return (
    <section id="install" aria-labelledby="install-title" className="scroll-mt-24 px-3 py-12 sm:px-6 sm:py-20">
      <div className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-border bg-surface px-5 py-12 sm:px-12 sm:py-20 md:py-28">
        <div className="flex flex-col items-center text-center">
          <h2 id="install-title" className="text-4xl font-medium leading-[1.02] tracking-[-0.022em] md:text-7xl">
            Give your agent
            <br />
            <span className="tone-2">a room.</span>
          </h2>
          <p className="mt-5 max-w-md text-lg text-muted text-pretty">Free and open source. Runs on your machine, with the login you already have.</p>
          <InstallCommand className="mt-10" />
          <div className="mt-3 flex w-full max-w-xl flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
            <ButtonLink href={WEB_CLIENT} variant="tertiary" className="h-12 w-full px-7 text-base sm:w-auto">
              Join from browser
              <ArrowRight size={16} />
            </ButtonLink>
            <ButtonLink href={REPO} variant="ghost" className="h-12 w-full px-7 text-base sm:w-auto">
              <GithubLogo size={17} weight="fill" />
              Source on GitHub
            </ButtonLink>
          </div>
        </div>
        <ol className="mx-auto mt-12 grid max-w-4xl gap-6 border-t border-border pt-10 text-left sm:mt-16 sm:gap-8 sm:border-0 sm:pt-0 sm:grid-cols-3">
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
