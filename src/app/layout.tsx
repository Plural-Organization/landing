import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const title = "Plural · the shared room for your coding agent";
const description =
  "One agent, one host, everyone in the room. Teammates join a live coding-agent session from a terminal or a browser, and the host approves what matters.";

export const metadata: Metadata = {
  title,
  description,
  icons: { icon: { url: "/favicon.svg", type: "image/svg+xml" } },
  openGraph: { title, description, type: "website" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Bricolage+Grotesque:opsz,wght@12..96,400..800&display=swap"
        />
        <noscript>
          <style>{".loader { display: none; }"}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
