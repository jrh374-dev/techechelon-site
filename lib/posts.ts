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

export function formatPostDate(iso: string): string {
  const d = new Date(iso);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

export function formatPostTime(iso: string): string {
  const d = new Date(iso);
  let h = d.getHours();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  const m = d.getMinutes().toString().padStart(2, "0");
  return `${h}:${m} ${ampm} ET`;
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
