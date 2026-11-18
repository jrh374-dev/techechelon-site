// Desk (section) page logic: topic chips, story kickers, the "Developing"
// band and "Most covered this week". Everything here is derived from the
// stories' own tags and primaryEntity, so nothing on a desk page is
// invented: a chip, kicker or count only appears when the data supports it.

import type { Category, Post } from "./posts";

// ── Topic chips ──────────────────────────────────────────────────────────
// Each chip filters the desk to stories carrying any of its tags (after
// alias folding, below). A chip only shows when it matches at least
// MIN_CHIP_STORIES stories, so an empty filter is never offered.

export interface DeskTopic {
  slug: string;
  label: string;
  tags: string[];
}

export const MIN_CHIP_STORIES = 3;

export const DESK_TOPICS: Record<Category, DeskTopic[]> = {
  ai: [
    { slug: "nvidia-chips", label: "Nvidia & chips", tags: ["nvidia", "ai chips", "semiconductors", "gpu", "chip exports", "amd", "broadcom", "tsmc"] },
    { slug: "openai", label: "OpenAI", tags: ["openai", "chatgpt", "sam altman"] },
    { slug: "anthropic", label: "Anthropic", tags: ["anthropic", "claude", "dario amodei"] },
    { slug: "ai-agents", label: "AI agents", tags: ["ai agents", "agentic commerce"] },
    { slug: "ai-policy", label: "AI policy", tags: ["ai policy", "ai regulation", "export controls", "ai legislation"] },
    { slug: "data-centers", label: "Data centers", tags: ["data centers", "ai infrastructure", "hyperscalers", "neocloud"] },
    { slug: "funding-ipos", label: "Funding & IPOs", tags: ["ipo", "venture capital", "ai funding", "funding", "ai financing"] },
  ],
  business: [
    { slug: "earnings", label: "Earnings", tags: ["earnings"] },
    { slug: "chips", label: "Chips", tags: ["semiconductors", "ai chips", "memory chips", "hbm", "gpu", "nvidia", "sk hynix", "micron"] },
    { slug: "ai-infrastructure", label: "AI infrastructure", tags: ["ai infrastructure", "data centers", "neocloud", "coreweave", "hyperscalers", "capital expenditure"] },
    { slug: "ipos", label: "IPOs", tags: ["ipo"] },
    { slug: "crypto", label: "Crypto", tags: ["cryptocurrency", "bitcoin", "stablecoin", "crypto regulation", "clarity act"] },
    { slug: "fed-rates", label: "Fed & rates", tags: ["federal reserve", "interest rates", "inflation", "treasury yields"] },
  ],
  politics: [
    { slug: "white-house", label: "White House", tags: ["donald trump", "trump administration", "white house"] },
    { slug: "congress", label: "Congress", tags: ["congress", "senate"] },
    { slug: "china-trade", label: "China & trade", tags: ["china", "export controls", "tariffs", "trade policy", "trade"] },
    { slug: "ai-regulation", label: "AI regulation", tags: ["ai regulation", "ai policy", "ai legislation"] },
    { slug: "social-media", label: "Social media", tags: ["social media", "tiktok", "social media regulation", "content moderation", "child safety"] },
    { slug: "musk-spacex", label: "Musk & SpaceX", tags: ["elon musk", "spacex", "starlink", "starshield"] },
  ],
  security: [
    { slug: "data-breaches", label: "Data breaches", tags: ["data breach", "customer data", "data extortion", "identity theft"] },
    { slug: "ransomware", label: "Ransomware", tags: ["ransomware", "cybercrime"] },
    { slug: "ai-security", label: "AI security", tags: ["ai security", "ai safety", "ai agents", "hugging face", "claude code"] },
    { slug: "vulnerabilities", label: "Vulnerabilities", tags: ["vulnerability", "zero-day", "patch", "remote code execution", "patch tuesday", "sql injection"] },
    { slug: "malware-phishing", label: "Malware & phishing", tags: ["malware", "phishing", "vishing", "social engineering"] },
    { slug: "critical-infrastructure", label: "Critical infrastructure", tags: ["critical infrastructure"] },
  ],
  // Opinion pieces are too sparsely tagged for any topic to reach the
  // threshold, so the desk shows no chips.
  opinion: [],
};

// ── Topic keys ───────────────────────────────────────────────────────────
// A story's topic keys are its lowercased tags plus its primaryEntity,
// with corporate suffixes dropped and synonyms folded, so "Apple Inc." and
// "apple", or "trump" and "donald trump", count once per story.

const ALIASES: Record<string, string> = {
  trump: "donald trump",
  meta: "meta platforms",
  midterms: "midterm elections",
  "agentic ai": "ai agents",
  "self-driving": "autonomous vehicles",
  "data center": "data centers",
  "ai data centers": "data centers",
  crypto: "cryptocurrency",
  "samsung electronics": "samsung",
  "advanced micro devices": "amd",
  "artificial intelligence regulation": "ai regulation",
  doj: "department of justice",
  "united states department of justice": "department of justice",
  "supreme court of the united states": "supreme court",
  "federal communications commission": "fcc",
  "commodity futures trading commission": "cftc",
  "cybersecurity and infrastructure security agency": "cisa",
  "kaspersky lab": "kaspersky",
};

// Too broad to say anything on a tech desk, or the desk's own name.
const GENERIC = new Set(["artificial intelligence", "ai", "technology", "tech", "big tech", "tech industry", "news"]);
const DESK_GENERIC: Record<Category, string[]> = {
  ai: ["artificial intelligence", "ai"],
  business: ["business", "finance", "business & finance", "markets"],
  politics: ["politics", "policy"],
  security: ["cybersecurity", "security", "cyber security"],
  opinion: ["opinion", "op-ed", "op-eds", "commentary"],
};

function isGeneric(key: string, desk: Category): boolean {
  return GENERIC.has(key) || DESK_GENERIC[desk].includes(key);
}

// "Apple Inc." → "Apple", "Amazon (company)" → "Amazon", "Tesla, Inc." → "Tesla"
function cleanEntity(name: string): string {
  return name
    .replace(/\s*\([^)]*\)\s*$/, "")
    .replace(/,?\s+(Inc\.?|Corporation|Corp\.?|Ltd\.?|plc|LLC|Co\.)$/i, "")
    .trim();
}

function normalize(raw: string): string {
  const k = raw.trim().toLowerCase().replace(/\s+/g, " ");
  return ALIASES[k] ?? k;
}

function entityKey(p: Post): string | null {
  if (!p.primaryEntity?.trim()) return null;
  return normalize(cleanEntity(p.primaryEntity));
}

// Ordered, de-duplicated, non-generic keys: entity first, then tags in the
// order the desk wrote them.
function storyKeys(p: Post, desk: Category): string[] {
  const out: string[] = [];
  const add = (k: string | null) => {
    if (k && !isGeneric(k, desk) && !out.includes(k)) out.push(k);
  };
  add(entityKey(p));
  for (const t of p.tags ?? []) add(normalize(String(t)));
  return out;
}

// ── Display names ────────────────────────────────────────────────────────

const DISPLAY: Record<string, string> = {
  nvidia: "Nvidia",
  openai: "OpenAI",
  chatgpt: "ChatGPT",
  "meta platforms": "Meta",
  "sk hynix": "SK Hynix",
  coreweave: "CoreWeave",
  spacex: "SpaceX",
  xai: "xAI",
  tiktok: "TikTok",
  bytedance: "ByteDance",
  crowdstrike: "CrowdStrike",
  shinyhunters: "ShinyHunters",
  "jpmorgan chase": "JPMorgan Chase",
  blackrock: "BlackRock",
  deepseek: "DeepSeek",
  youtube: "YouTube",
  linkedin: "LinkedIn",
  github: "GitHub",
  iphone: "iPhone",
  "iphone duo": "iPhone Duo",
  paypal: "PayPal",
  doordash: "DoorDash",
  fedex: "FedEx",
  macos: "macOS",
  ios: "iOS",
  "us-china relations": "U.S.-China relations",
  "donald trump": "Donald Trump",
};

const SPECIAL_WORDS: Record<string, string> = {
  ipos: "IPOs", etfs: "ETFs", gpus: "GPUs", llms: "LLMs", evs: "EVs", pacs: "PACs", saas: "SaaS", us: "U.S.",
};
const ACRONYMS = new Set([
  "ai", "ipo", "etf", "gpu", "hbm", "sec", "ftc", "fcc", "faa", "nhtsa", "dhs", "cisa", "fbi", "nasa", "eu", "uk",
  "gdpr", "llm", "api", "ceo", "cfo", "cto", "ev", "amd", "tsmc", "aws", "nyse", "irs", "fda", "nsa", "cia", "cftc",
  "imf", "pac", "vc", "ibm", "cxmt", "naacp", "epa", "ftx", "hr", "m&a", "r&d", "q&a",
]);
const SMALL_WORDS = new Set(["a", "an", "and", "as", "at", "by", "for", "in", "of", "on", "or", "the", "to", "vs"]);

function titleCase(key: string): string {
  return key
    .split(" ")
    .map((word, i) =>
      word
        .split("-")
        .map((part, j) => {
          if (SPECIAL_WORDS[part]) return SPECIAL_WORDS[part];
          if (ACRONYMS.has(part)) return part.toUpperCase();
          if ((i > 0 || j > 0) && SMALL_WORDS.has(part)) return part;
          return part.charAt(0).toUpperCase() + part.slice(1);
        })
        .join("-"),
    )
    .join(" ");
}

// Proper names as the stories' primaryEntity spells them ("Palo Alto
// Networks", "Kevin Warsh"), keyed by topic key.
export function entityNames(posts: Post[]): Map<string, string> {
  const names = new Map<string, string>();
  for (const p of posts) {
    if (!p.primaryEntity) continue;
    const cleaned = cleanEntity(p.primaryEntity);
    const key = cleaned.toLowerCase().replace(/\s+/g, " ");
    // Only record names that are the key itself, not an alias of it.
    if (!ALIASES[key] && !names.has(key)) names.set(key, cleaned);
  }
  return names;
}

export function topicName(key: string, names?: Map<string, string>): string {
  return DISPLAY[key] ?? names?.get(key) ?? titleCase(key);
}

// ── Chips ────────────────────────────────────────────────────────────────

export interface Chip extends DeskTopic {
  count: number;
}

export function storyMatchesTopic(p: Post, desk: Category, topic: DeskTopic): boolean {
  const keys = storyKeys(p, desk);
  return topic.tags.some((t) => keys.includes(normalize(t)));
}

export function deskChips(desk: Category, posts: Post[]): Chip[] {
  return DESK_TOPICS[desk]
    .map((t) => ({ ...t, count: posts.filter((p) => storyMatchesTopic(p, desk, t)).length }))
    .filter((c) => c.count >= MIN_CHIP_STORIES);
}

export function chipForKey(key: string, chips: Chip[]): Chip | undefined {
  return chips.find((c) => c.tags.some((t) => normalize(t) === key));
}

// ── Kickers ──────────────────────────────────────────────────────────────
// "NVIDIA · EXPORT CONTROLS": the story's subject (primaryEntity, else its
// first meaningful tag), then — when the story has one — the first later
// tag that names a beat (a desk chip tag or a story-type facet below) and
// doesn't belong to the same chip as the subject. Never the desk name.

const FACETS = new Set([
  "earnings", "ipo", "lawsuit", "litigation", "antitrust", "regulation", "ai regulation", "ai policy",
  "ai safety", "export controls", "chip exports", "tariffs", "acquisitions", "mergers and acquisitions",
  "venture capital", "ai funding", "funding", "layoffs", "executive moves", "ceo succession", "data centers",
  "ai chips", "semiconductors", "ai agents", "data breach", "ransomware", "privacy", "data privacy",
  "federal reserve", "congress", "supreme court", "national security", "payments", "robotics",
  "autonomous vehicles", "ai infrastructure", "cloud computing", "stock market", "prediction markets",
  "cryptocurrency", "social media", "content moderation", "child safety", "elections", "midterm elections",
  "energy policy", "trade policy", "vulnerability", "zero-day", "malware", "phishing", "espionage",
  "critical infrastructure", "ai security", "streaming", "advertising", "chips", "memory chips",
]);

export function storyKicker(p: Post, desk: Category, names?: Map<string, string>): string | null {
  const keys = storyKeys(p, desk);
  const subject = keys[0];
  if (!subject) return null;
  const topics = DESK_TOPICS[desk];
  const subjectTopic = topics.find((t) => t.tags.some((tag) => normalize(tag) === subject));
  const beatKeys = new Set([...FACETS, ...topics.flatMap((t) => t.tags.map(normalize))]);
  const beat = keys.slice(1).find((k) => {
    if (!beatKeys.has(k)) return false;
    return !subjectTopic?.tags.some((tag) => normalize(tag) === k);
  });
  return [subject, beat]
    .filter((k): k is string => !!k)
    .map((k) => topicName(k, names).toUpperCase())
    .join(" · ");
}

// ── This week (Developing band, Most covered) ────────────────────────────
// "This week" is the seven ET calendar days ending on the day of the desk's
// newest story — not the wall clock — so the same content always builds the
// same page.

const ET_DAY = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/New_York",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function etDay(iso: string): string {
  const t = Date.parse(iso);
  return Number.isFinite(t) ? ET_DAY.format(new Date(t)) : "";
}

function shiftDay(day: string, days: number): string {
  const [y, m, d] = day.split("-").map(Number);
  return new Date(Date.UTC(y!, m! - 1, d! + days)).toISOString().slice(0, 10);
}

export interface Week {
  start: string; // YYYY-MM-DD, ET
  end: string;
  posts: Post[]; // newest first
}

export function deskWeek(posts: Post[]): Week | null {
  const newest = posts[0];
  if (!newest) return null;
  const end = etDay(newest.publishedAt);
  if (!end) return null;
  const start = shiftDay(end, -6);
  return { start, end, posts: posts.filter((p) => etDay(p.publishedAt) >= start) };
}

// Ranking: most stories this week, then the desk's all-time coverage of
// the topic, then alphabetical, so ties resolve the same way every build.
function rankWeekTopics(week: Week, all: Post[], desk: Category): Array<{ key: string; posts: Post[] }> {
  const byKey = new Map<string, Post[]>();
  for (const p of week.posts) {
    for (const k of storyKeys(p, desk)) byKey.set(k, [...(byKey.get(k) ?? []), p]);
  }
  const allTime = new Map<string, number>();
  for (const p of all) for (const k of storyKeys(p, desk)) allTime.set(k, (allTime.get(k) ?? 0) + 1);
  return [...byKey.entries()]
    .map(([key, posts]) => ({ key, posts }))
    .sort(
      (a, b) =>
        b.posts.length - a.posts.length ||
        (allTime.get(b.key) ?? 0) - (allTime.get(a.key) ?? 0) ||
        a.key.localeCompare(b.key),
    );
}

export const DEVELOPING_MIN_STORIES = 4;
const DEVELOPING_MAX_ITEMS = 6;

export interface Developing {
  keys: string[];
  label: string;
  posts: Post[]; // oldest → newest
}

// A single topic dominates the week when it appears in at least
// DEVELOPING_MIN_STORIES of the desk's stories. A runner-up that clears
// the same bar and mostly covers the same stories (a company and its
// CEO, say) is folded into the label: "Nvidia and Jensen Huang".
export function developingStory(
  desk: Category,
  all: Post[],
  week: Week | null,
  names?: Map<string, string>,
): Developing | null {
  if (!week) return null;
  const ranked = rankWeekTopics(week, all, desk).filter((t) => t.posts.length >= DEVELOPING_MIN_STORIES);
  const top = ranked[0];
  if (!top) return null;
  const keys = [top.key];
  const stories = new Set(top.posts);
  const partner = ranked
    .slice(1)
    .find((t) => t.posts.filter((p) => stories.has(p)).length >= 0.75 * t.posts.length);
  if (partner) {
    keys.push(partner.key);
    partner.posts.forEach((p) => stories.add(p));
  }
  const posts = [...stories]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, DEVELOPING_MAX_ITEMS)
    .reverse();
  return { keys, label: keys.map((k) => topicName(k, names)).join(" and "), posts };
}

export interface CoveredTopic {
  key: string;
  label: string;
  count: number;
  chip?: Chip;
}

export const MOST_COVERED_MIN_STORIES = 2;

export function mostCovered(
  desk: Category,
  all: Post[],
  week: Week | null,
  chips: Chip[],
  names?: Map<string, string>,
): CoveredTopic[] {
  if (!week) return [];
  return rankWeekTopics(week, all, desk)
    .filter((t) => t.posts.length >= MOST_COVERED_MIN_STORIES)
    .slice(0, 6)
    .map((t) => ({
      key: t.key,
      label: topicName(t.key, names),
      count: t.posts.length,
      chip: chipForKey(t.key, chips),
    }));
}

// ── Dates (AP style, ET) ─────────────────────────────────────────────────

const AP_MONTHS = ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];

function dayParts(day: string): { y: number; m: number; d: number } {
  const [y, m, d] = day.split("-").map(Number);
  return { y: y!, m: m!, d: d! };
}

// "Nov. 17" — with the year when it differs from `refYear` or `withYear`.
export function apDate(iso: string, opts: { refYear?: number; withYear?: boolean } = {}): string {
  const day = etDay(iso);
  if (!day) return "";
  const { y, m, d } = dayParts(day);
  const base = `${AP_MONTHS[m - 1]} ${d}`;
  return opts.withYear || (opts.refYear !== undefined && y !== opts.refYear) ? `${base}, ${y}` : base;
}

export function etYear(iso: string): number {
  return dayParts(etDay(iso) || "1970-01-01").y;
}

// "Nov. 11–17", "Oct. 29–Nov. 4", "Dec. 29, 2025–Jan. 4, 2026"
export function apRange(startDay: string, endDay: string): string {
  const s = dayParts(startDay);
  const e = dayParts(endDay);
  if (s.y !== e.y) return `${AP_MONTHS[s.m - 1]} ${s.d}, ${s.y}–${AP_MONTHS[e.m - 1]} ${e.d}, ${e.y}`;
  if (s.m !== e.m) return `${AP_MONTHS[s.m - 1]} ${s.d}–${AP_MONTHS[e.m - 1]} ${e.d}`;
  return `${AP_MONTHS[s.m - 1]} ${s.d}–${e.d}`;
}
