import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Newsletter } from "@/components/Newsletter";
import { SearchClient } from "@/components/SearchClient";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Search — TechEchelon",
  description: "Full-text search across the TechEchelon archive — headlines, deks, and article bodies.",
};

export default function SearchPage() {
  const total = getAllPosts().length;
  return (
    <div className="bg-cream min-h-screen">
      <SiteHeader />
      <SearchClient initialTotal={total} />
      <Newsletter />
      <SiteFooter />
    </div>
  );
}
