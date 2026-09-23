import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

// ============================================================================
// DECK STATUS
// ============================================================================
// Every week of a course gets its folder scaffolded up front, so the presence
// of a page.tsx is not enough to say the deck exists: an unwritten week holds
// a placeholder that renders nothing. A week counts as built once that
// placeholder has been replaced with a real deck.
// ============================================================================

const PLACEHOLDER = "export default function Page() { return null; }";

const normalize = (source: string) => source.replace(/\s+/g, " ").trim();

/** True when `<courseDir>/<slug>/page.tsx` is a real deck, not a placeholder. */
export function isDeckBuilt(courseDir: string, slug: string): boolean {
  const pagePath = path.join(courseDir, slug, "page.tsx");
  if (!existsSync(pagePath)) return false;
  return normalize(readFileSync(pagePath, "utf8")) !== PLACEHOLDER;
}
