# plural · landing

The landing page for [Plural](https://github.com/Plural-Organization/Plural), the shared room for your coding agent. Built with [Astro](https://astro.build), with React for the interactive parts.

## Develop

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # astro check, then the static site in dist/
npm run preview   # serve dist/
```

Node 22 or newer.

## Layout

```text
src/
├── pages/index.astro      the page
├── layouts/Base.astro     html head, fonts, meta
├── components/            static sections: nav, hero, terminal example, session log, install, footer
├── islands/               React parts that run in the browser
│   ├── Loader.tsx         the four people join the room, then the page appears through the glitch
│   ├── RoleDiagram.tsx    the logo as a diagram of roles, with hover cards and dancing people
│   └── CopyButton.tsx
├── data/                  links, roles and the example session log
├── lib/logo.ts            the pixel logo split into its four people
└── styles/global.css
public/favicon.svg         the logo as pixels
```

Text lives in `src/data/` and the components, so most edits never touch the islands.

## Deploy

`npm run build` writes a static site to `dist/`. Any static host serves it: Vercel, Netlify, Cloudflare Pages or GitHub Pages. CI builds every push and pull request.

`WEB_CLIENT` in `src/data/site.ts` points to the web client. It links to the client's source until the web client has its own address.

## License

Apache 2.0, like Plural.
