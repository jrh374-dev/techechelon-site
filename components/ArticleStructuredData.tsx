import { Post, categoryLabel } from "@/lib/posts";

function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://techechelon.com")
  );
}

function authorSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// Schema.org NewsArticle JSON-LD. Google News and Discover rely on this to
// identify and rank news content. Required fields per Google's docs:
// headline (≤110 chars ideally), image, datePublished, author, publisher.
export function ArticleStructuredData({ post }: { post: Post }) {
  const base = siteUrl();
  const url = `${base}/post/${post.slug}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title.slice(0, 110),
    description: post.excerpt,
    image: post.coverImage ? [post.coverImage] : [`${base}/opengraph-image`],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
      url: `${base}/author/${authorSlug(post.author)}`,
    },
    publisher: {
      "@type": "Organization",
      name: "TechEchelon",
      logo: {
        "@type": "ImageObject",
        url: `${base}/opengraph-image`,
        width: 1200,
        height: 630,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    articleSection: categoryLabel(post.category),
    keywords: post.tags?.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
