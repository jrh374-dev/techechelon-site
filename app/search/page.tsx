import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Newsletter } from "@/components/Newsletter";
import { SearchClient } from "@/components/SearchClient";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Search — TechEchelon",
  description: "Search the TechEchelon archive across markets, AI, politics, and security.",
};

export default function SearchPage() {
  const posts = getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    author: p.author,
    publishedAt: p.publishedAt,
  }));

  return (
    <div className="bg-cream min-h-screen">
      <SiteHeader />
      <SearchClient posts={posts} />
      <Newsletter />
      <SiteFooter />
    </div>
  );
}
