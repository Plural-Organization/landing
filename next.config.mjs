// The web client lives on its own deployment; /app serves it from here. Its files are relative
// (./assets/…), which from /app resolve to /assets/…, so that path goes to the client too. The client also references its
// start-page pixel art by the absolute path /art/…, so that goes to the client as well.
const WEB_CLIENT = "https://plural-room.vercel.app";
const DOCS = "https://docs-six-lilac.vercel.app";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The screenshots are text-heavy, so they use quality 90 (Next allows only 75 unless listed).
  images: { qualities: [75, 90] },
  // Lets a phone reach `next dev` through a Cloudflare quick tunnel; without it the page loads but never hydrates.
  allowedDevOrigins: ["*.trycloudflare.com"],
  async rewrites() {
    return [
      { source: "/docs", destination: `${DOCS}/docs` },
      { source: "/docs/:path*", destination: `${DOCS}/docs/:path*` },
      { source: "/app", destination: `${WEB_CLIENT}/` },
      { source: "/app/:path*", destination: `${WEB_CLIENT}/:path*` },
      { source: "/assets/:path*", destination: `${WEB_CLIENT}/assets/:path*` },
      { source: "/art/:path*", destination: `${WEB_CLIENT}/art/:path*` },
    ];
  },
};

export default nextConfig;
