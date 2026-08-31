import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Newsletter } from "@/components/Newsletter";
import { AnchorHero } from "@/components/AnchorHero";
import { TimeSection } from "@/components/TimeSection";
import { DeskRow } from "@/components/DeskRow";
import {
  getAllPosts,
  getPostsByCategory,
  isOpinion,
} from "@/lib/posts";

export default function HomePage() {
  // The homepage hero and time sections are a news feed. Opinion pieces
  // and Executive Q&As live in /category/opinion only, so they never
  // take over the anchor slot the morning they publish.
  const all = getAllPosts().filter((p) => !isOpinion(p));
  if (all.length === 0) {
    return (
      <>
        <SiteHeader />
        <div className="max-w-[1320px] mx-auto px-7 py-16 text-center text-sand">
          No posts yet. Add markdown files to content/posts/ and refresh.
        </div>
        <SiteFooter />
      </>
    );
  }

  const [hero, ...rest] = all;
  const thisMorning = rest.slice(0, 3);
  const earlierToday = rest.slice(3, 6);
  const business = getPostsByCategory("business").slice(0, 3);
  const ai = getPostsByCategory("ai").slice(0, 3);

  return (
    <div className="bg-cream min-h-screen">
      <SiteHeader />
      <AnchorHero post={hero} />
      <TimeSection
        label="This Morning"
        range="06:00 — 12:00 ET"
        posts={thisMorning}
        startNumber={2}
      />
      <TimeSection
        label="Earlier Today"
        range="00:00 — 06:00 ET"
        posts={earlierToday}
        startNumber={5}
      />
      {business.length > 0 && <DeskRow desk="business" posts={business} />}
      {ai.length > 0 && <DeskRow desk="ai" posts={ai} />}
      <Newsletter />
      <SiteFooter />
    </div>
  );
}
