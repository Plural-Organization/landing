import type { Metadata, Viewport } from "next";
import { Geist_Mono, IBM_Plex_Mono, Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

// heroui.com sets body text in Inter and headlines in Britti Sans, a commercial face. Headlines here use Satoshi
// (Fontshare, free for commercial use), the closest open match; with a Britti Sans licence, swap it in globals.css.
const sans = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
// The terminal capture in the product demo was drawn in Plex Mono; it keeps it so the cells line up.
const plex = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex" });

const title = "Plural · the shared room for your coding agent";
const description =
  "Your agent's context lives with one person. Plural puts the team in the same session, in the terminal or the browser: everyone watches and prompts one agent, and every write waits for the host.";

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
    <html lang="en" className={`dark ${sans.variable} ${mono.variable} ${plex.variable}`} data-theme="dark">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@500,700&display=swap" />
        <noscript>
          <style>{".reveal, .tuishot .tl { opacity: 1 !important; transform: none !important; }"}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
