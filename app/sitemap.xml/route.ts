import { getAllPosts } from "@/lib/posts";

function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://techechelon.com")
  );
}

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const STATIC_PATHS = [
  "/",
  "/about",
  "/masthead",
  "/ethics",
  "/contact",
  "/corrections",
  "/disclaimer",
  "/subscribe",
  "/events",
  "/search",
  "/terms",
  "/privacy",
  "/accessibility",
  "/category/business",
  "/category/politics",
  "/category/ai",
  "/category/security",
  "/category/opinion",
];

export async function GET() {
  const base = siteUrl();
  const posts = getAllPosts();

  const urls: string[] = [];
  for (const p of STATIC_PATHS) {
    urls.push(`<url><loc>${base}${p}</loc></url>`);
  }
  for (const post of posts) {
    urls.push(
      `<url><loc>${base}/post/${xmlEscape(post.slug)}</loc><lastmod>${post.publishedAt}</lastmod></url>`,
    );
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
