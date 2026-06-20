import { getAllPosts, categoryLabel } from "@/lib/posts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://techechelon.com";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getAllPosts().slice(0, 50);
  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/post/${p.slug}`;
      const pubDate = new Date(p.publishedAt).toUTCString();
      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <description>${escapeXml(p.excerpt)}</description>
      <author>noreply@techechelon.com (${escapeXml(p.author)})</author>
      <category>${escapeXml(categoryLabel(p.category))}</category>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>TechEchelon</title>
    <link>${SITE_URL}</link>
    <description>Independent reporting on technology, markets, and the policy decisions that shape both.</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
