# plural · landing

The landing page for [Plural](https://github.com/Plural-Organization/Plural), the shared room for your coding agent. Built with [Next.js](https://nextjs.org) (App Router) and React.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run build      # production build in .next/
npm run start      # serve the production build
```

Node 22 or newer.

## Layout

```text
src/
├── app/layout.tsx         html head, fonts, meta
├── app/page.tsx           the page
├── app/globals.css
├── components/            server sections: nav, hero, terminal example, session log, install, footer
├── islands/               client components ("use client") that run in the browser
│   ├── Loader.tsx         the four people join the room, then the page appears through the glitch
│   ├── RoleDiagram.tsx    the logo as a diagram of roles, with hover cards and dancing people
│   └── CopyButton.tsx
├── data/                  links, roles and the example session log
├── lib/logo.ts            the pixel logo split into its four people
public/favicon.svg         the logo as pixels
```

Text lives in `src/data/` and the components, so most edits never touch the islands.

## Deploy

Deployed on Vercel, which detects Next.js with no config. The page is prerendered at build time. CI builds every push and pull request.

`WEB_CLIENT` in `src/data/site.ts` points to the web client. It links to the client's source until the web client has its own address.

## License

Apache 2.0, like Plural.
