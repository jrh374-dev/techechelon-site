import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Category = "business" | "politics" | "ai" | "security" | "opinion";

export interface PostFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  category: Category;
  subcategory?: string;
  author: string;
  authorInitials?: string;
  publishedAt: string;
  coverImage?: string;
  coverCredit?: string;
  coverCaption?: string;
  tags?: string[];
  primaryEntity?: string;
  readTime?: number;
  pullQuote?: { text: string; source: string };
  unlisted?: boolean;
  coverFit?: "cover" | "contain";
}

export interface Post extends PostFrontmatter {
  content: string;
}

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function listPostFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
}

function normalizeDate(v: unknown): string {
  if (v instanceof Date) return v.toISOString();
  return String(v ?? "");
}

export function getAllPosts(): Post[] {
  return listPostFiles()
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const fm = data as PostFrontmatter;
      return { ...fm, publishedAt: normalizeDate(fm.publishedAt), content };
    })
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPostBySlug(slug: string): Post | null {
  const all = getAllPosts();
  return all.find((p) => p.slug === slug) ?? null;
}

// Title prefixes used historically on TechEchelon for opinion-style pieces.
// Both standalone OPINION pieces and Executive Q&A interviews are surfaced
// under the Opinion section.
const OPINION_PREFIX = /^\s*opinion\s*[:|—\-]/i;
const QA_PREFIX = /^\s*executive\s+q\s*&\s*a/i;

export function isOpinion(p: Post): boolean {
  return (
    p.category === "opinion" ||
    OPINION_PREFIX.test(p.title) ||
    QA_PREFIX.test(p.title)
  );
}

export function getPostsByCategory(category: Category): Post[] {
  // Unlisted posts stay accessible via direct URL and search, but never
  // appear in any category listing or homepage rail.
  const all = getAllPosts().filter((p) => p.unlisted !== true);
  if (category === "opinion") {
    return all.filter(isOpinion);
  }
  return all.filter(
    (p) =>
      p.category === category &&
      !OPINION_PREFIX.test(p.title) &&
      !QA_PREFIX.test(p.title),
  );
}

export function getPostsByAuthor(authorSlug: string): Post[] {
  const all = getAllPosts();
  const norm = (s: string) => s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  return all.filter((p) => norm(p.author) === authorSlug);
}

// Format in America/New_York so the displayed clock matches the "ET"
// label we put next to it. The previous implementation read the
// server-local clock (UTC on Vercel) and labeled it ET — which produced
// times that were 4–5 hours ahead of the actual ET timestamp.
const ET_DATE_FMT = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  month: "short",
  day: "numeric",
  year: "numeric",
});

const ET_TIME_FMT = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

export function formatPostDate(iso: string): string {
  return ET_DATE_FMT.format(new Date(iso));
}

export function formatPostTime(iso: string): string {
  const parts = ET_TIME_FMT.formatToParts(new Date(iso));
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const h = get("hour").padStart(2, "0");
  const m = get("minute");
  const ap = get("dayPeriod").toUpperCase();
  return `${h}:${m} ${ap} ET`;
}

export function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const hours = Math.round(diff / 3600000);
  if (hours < 1) return `${Math.max(1, Math.round(diff / 60000))} min ago`;
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.round(hours / 24);
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

export function categoryLabel(c: Category): string {
  switch (c) {
    case "ai":
      return "Artificial Intelligence";
    case "business":
      return "Business & Finance";
    case "politics":
      return "Politics";
    case "security":
      return "Cybersecurity";
    case "opinion":
      return "Opinion";
  }
}
