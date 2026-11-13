// The web client lives on its own deployment; /app serves it from here. Its files are relative
// (./assets/…), which from /app resolve to /assets/…, so that path goes to the client too.
const WEB_CLIENT = "https://plural-room.vercel.app";
const DOCS = "https://docs-six-lilac.vercel.app";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/docs", destination: `${DOCS}/docs` },
      { source: "/docs/:path*", destination: `${DOCS}/docs/:path*` },
      { source: "/app", destination: `${WEB_CLIENT}/` },
      { source: "/app/:path*", destination: `${WEB_CLIENT}/:path*` },
      { source: "/assets/:path*", destination: `${WEB_CLIENT}/assets/:path*` },
    ];
  },
};

export default nextConfig;
