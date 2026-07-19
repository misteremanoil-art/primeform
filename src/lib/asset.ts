/**
 * Prefixes a path from `public/` with the deployment's base path.
 *
 * `next/image` rewrites `src` through the optimizer, which applies `basePath` on
 * the way. The gallery export runs with `images.unoptimized`, where `src` is
 * passed through untouched — so an absolute path like `/coach.png` resolves
 * against the domain root and 404s when the app is served from a subdirectory.
 *
 * Anything pointing at `public/` goes through here. It is a no-op in dev and on
 * the standalone deploy, both of which serve from the root.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${basePath}${path}`;
