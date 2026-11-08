"use client";

import { Dithering, ImageDithering } from "@paper-design/shaders-react";
import { useEffect, useState } from "react";

// The pixel logo in the team's colours, rendered through an ordered (Bayer) dither so it reads as pixels, not blur.
// A faint animated dither field over it keeps the room breathing; both stop when reduced motion is on.
export default function DitherLogo() {
  const [still, setStill] = useState(false);
  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  return (
    <div aria-hidden="true" className="hero-depth-scroll pointer-events-none absolute inset-0 -z-10 overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent_95%)]">
      <div className="hero-depth hero-depth--far absolute -inset-8">
      <ImageDithering
        image="/hero/logo-soft.png"
        originalColors
        type="4x4"
        size={3}
        colorSteps={3}
        colorBack="#141416"
        fit="contain"
        scale={0.95}
        className="absolute inset-0 h-full w-full opacity-45"
      />
      </div>
      <div className="hero-depth hero-depth--near absolute -inset-8">
      <Dithering
        shape="warp"
        type="4x4"
        size={2}
        speed={still ? 0 : 0.25}
        colorBack="#00000000"
        colorFront="#ffffff0d"
        className="absolute inset-0 h-full w-full"
      />
      </div>
    </div>
  );
}
