// Same-story rules for The Brief.
//
// The Brief lists the five most recent stories. On a big news day the bot
// can publish several articles about the same company within hours (on
// 2026-11-18 two "Nvidia shares slide amid the Huang fallout" pieces ran in
// the same edition), so the roundup enforces two rules as it fills the five
// slots, newest first:
//
//   1. One story per company per edition. Stories whose primaryEntity
//      normalizes to the same company are treated as the same story; the
//      newest one wins and the next distinct story takes the slot.
//   2. A headline-overlap backstop for stories that lack a primaryEntity or
//      carry inconsistent labels.
//
// These rules are deliberately simple and deterministic: the newsletter must
// never repeat a story, so it doesn't depend on a model call succeeding.

import type { Post } from "./posts";

// Labels that refer to the same company under a different name. Keys and
// values are already normalized (see normalizeEntity).
const ENTITY_ALIASES: Record<string, string> = {
  "jensen huang": "nvidia",
  google: "alphabet",
  "google deepmind": "alphabet",
  facebook: "meta",
};

const ENTITY_SUFFIXES =
  /\b(inc|incorporated|corp|corporation|co|company|ltd|limited|plc|llc|holdings|group|platforms|technologies|technology)\b/g;

export function normalizeEntity(entity?: string): string {
  if (!entity) return "";
  const base = entity
    .toLowerCase()
    .replace(/\([^)]*\)/g, " ") // "Amazon (company)" -> "amazon"
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(ENTITY_SUFFIXES, " ")
    .replace(/\s+/g, " ")
    .trim();
  return ENTITY_ALIASES[base] ?? base;
}

const STOPWORDS = new Set([
  "a", "an", "and", "as", "at", "after", "amid", "by", "for", "from", "in",
  "into", "is", "its", "of", "on", "or", "over", "the", "to", "with", "new",
  "says", "say", "s",
]);

function headlineTokens(title: string): Set<string> {
  return new Set(
    title
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .split(/\s+/)
      .filter((t) => t.length > 1 && !STOPWORDS.has(t)),
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let shared = 0;
  a.forEach((t) => {
    if (b.has(t)) shared++;
  });
  return shared / (a.size + b.size - shared);
}

// Headlines this similar describe the same story even when the entity
// labels disagree or are missing. Same-company pairs never reach this check
// (rule 1 catches them), and different-company pairs in the archive top out
// well below it.
const HEADLINE_OVERLAP_LIMIT = 0.35;

export function isSameStoryForBrief(a: Post, b: Post): boolean {
  const ea = normalizeEntity(a.primaryEntity);
  const eb = normalizeEntity(b.primaryEntity);
  if (ea && eb && ea === eb) return true;
  return jaccard(headlineTokens(a.title), headlineTokens(b.title)) >= HEADLINE_OVERLAP_LIMIT;
}

// Walks candidates in order (newest first) and keeps up to n stories, none
// of which repeats a story already kept.
export function pickDistinctStories(candidates: Post[], n: number): Post[] {
  const picked: Post[] = [];
  for (const post of candidates) {
    if (picked.length >= n) break;
    if (picked.some((kept) => isSameStoryForBrief(post, kept))) continue;
    picked.push(post);
  }
  return picked;
}
