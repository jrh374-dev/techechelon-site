import type { NextRequest } from "next/server";
import { getAllPosts, categoryLabel } from "@/lib/posts";

// Server-side full-text search — scans title, excerpt, author, AND body
// content. Static client-side search couldn't include bodies without
// shipping a multi-megabyte index to every visitor.

export const dynamic = "force-dynamic";

function stripMarkdown(s: string): string {
  return s
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_`~]/g, "")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") ?? "").trim().toLowerCase();
  const cat = req.nextUrl.searchParams.get("cat") ?? "all";

  if (q.length < 2 && cat === "all") {
    const posts = getAllPosts().slice(0, 50);
    return Response.json({
      total: posts.length,
      results: posts.map((p) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        category: p.category,
        author: p.author,
        publishedAt: p.publishedAt,
      })),
    });
  }

  const tokens = q.split(/\s+/).filter((t) => t.length > 0);
  const all = getAllPosts();

  const matched = all.filter((p) => {
    if (cat !== "all" && p.category !== cat) return false;
    if (tokens.length === 0) return true;
    const meta = `${p.title} ${p.excerpt} ${p.author} ${p.primaryEntity ?? ""}`.toLowerCase();
    const body = stripMarkdown(p.content);
    return tokens.every((t) => meta.includes(t) || body.includes(t));
  });

  const limited = matched.slice(0, 200);

  return Response.json({
    total: matched.length,
    results: limited.map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      author: p.author,
      publishedAt: p.publishedAt,
    })),
  });
}
