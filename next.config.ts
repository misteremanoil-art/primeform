import type { NextConfig } from "next";
import path from "node:path";

/**
 * The app ships to two places: its own Vercel deploy, served from the root, and
 * the studio gallery, served as a static export out of a subdirectory.
 *
 * Only the gallery build needs `basePath`, so it selects itself:
 *
 *   NEXT_PUBLIC_BASE_PATH=/demos/coaching npm run build
 *
 * `next dev` and the root deploy leave it unset and behave exactly as before.
 * Keeping this in an env var rather than config you comment in and out means a
 * rebuild is one command with nothing to remember to put back afterwards.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Pin the workspace root — a stray lockfile in the home directory otherwise
  // confuses Turbopack's root inference.
  turbopack: {
    root: path.resolve(__dirname),
  },

  ...(basePath && {
    output: "export" as const,
    basePath,
    // There is no image optimizer in front of the gallery.
    images: { unoptimized: true },
  }),
};

export default nextConfig;
