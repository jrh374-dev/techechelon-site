import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getAllPosts, isSponsored, formatPostDate } from "@/lib/posts";

export const metadata = {
  title: "Partner Content — TechEchelon",
  description:
    "Sponsored articles published on TechEchelon. Paid for by the sponsor, labeled, and kept separate from our news coverage.",
};

export default function PartnersPage() {
  const posts = getAllPosts().filter(isSponsored);

  return (
    <div className="bg-cream min-h-screen">
      <SiteHeader />
      <section className="bg-cream border-b border-rule">
        <div className="max-w-[860px] mx-auto px-5 md:px-7 pt-9 md:pt-12 pb-7 md:pb-9 text-center">
          <div className="font-mono text-[10px] md:text-[10.5px] tracking-[0.16em] uppercase font-bold text-coral mb-3 md:mb-4">
            ━━ Sponsored
          </div>
          <h1 className="font-display text-[40px] md:text-[58px] font-extrabold tracking-[-0.03em] leading-[0.98] text-navy mb-4 md:mb-5">
            Partner content
          </h1>
          <p className="font-serif text-[15.5px] md:text-[18px] leading-relaxed text-ink-soft italic max-w-[640px] mx-auto">
            Articles paid for by a sponsor. Each is labeled, reviewed by TechEchelon for accuracy, and kept out of our news desks. Our{" "}
            <Link href="/ethics" className="underline underline-offset-[3px] decoration-1 not-italic hover:text-coral">standards</Link> explain the line we hold.
          </p>
        </div>
      </section>

      <main className="max-w-[860px] mx-auto px-5 md:px-7 py-10">
        {posts.length === 0 ? (
          <p className="font-serif text-[17px] text-ink-soft text-center">
            No partner content has been published yet. See{" "}
            <Link href="/advertise" className="underline underline-offset-[3px] decoration-1 text-navy hover:text-coral">partnership options</Link>.
          </p>
        ) : (
          <ul className="list-none p-0 m-0 border-t border-rule">
            {posts.map((p) => (
              <li key={p.slug} className="py-6 border-b border-rule">
                <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                  <span className="font-mono text-[10px] tracking-[0.1em] uppercase font-bold text-cream bg-coral px-2 py-0.5">Sponsored</span>
                  {p.sponsor?.name && (
                    <span className="font-mono text-[10px] tracking-[0.1em] uppercase font-semibold text-sand">
                      Presented by <span className="text-navy font-bold">{p.sponsor.name}</span>
                    </span>
                  )}
                </div>
                <Link href={`/post/${p.slug}`} className="group block">
                  <h2 className="font-display text-[24px] md:text-[30px] font-extrabold tracking-[-0.025em] leading-[1.08] text-ink group-hover:text-navy mb-2.5">
                    {p.title}
                  </h2>
                  <p className="font-serif text-[15.5px] md:text-[16.5px] leading-relaxed text-ink-soft italic m-0 max-w-[640px]">
                    {p.excerpt}
                  </p>
                </Link>
                <div className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-sand mt-3">
                  {formatPostDate(p.publishedAt)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
