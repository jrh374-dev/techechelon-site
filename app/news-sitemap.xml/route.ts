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

// Google News sitemap — only includes articles published in the last 48
// hours. Google specifically reads this format for the News tab; the
// general sitemap.xml isn't sufficient for News inclusion.
export const dynamic = "force-dynamic";

export async function GET() {
  const base = siteUrl();
  const cutoff = Date.now() - 48 * 3600 * 1000;
  const recent = getAllPosts().filter((p) => {
    const t = new Date(p.publishedAt).getTime();
    return Number.isFinite(t) && t >= cutoff;
  });

  const entries = recent.map((p) => {
    return `  <url>
    <loc>${base}/post/${xmlEscape(p.slug)}</loc>
    <news:news>
      <news:publication>
        <news:name>TechEchelon</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${p.publishedAt}</news:publication_date>
      <news:title>${xmlEscape(p.title)}</news:title>
    </news:news>
  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${entries.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
    },
  });
}
