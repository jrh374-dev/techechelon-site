import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Newsletter } from "@/components/Newsletter";
import {
  Category,
  categoryLabel,
  getPostsByCategory,
  relativeTime,
} from "@/lib/posts";

const VALID: Category[] = ["business", "politics", "ai", "security", "opinion"];

const DESCRIPTIONS: Record<Category, string> = {
  ai: "Coverage of model development, deployment policy, infrastructure economics, and the regulatory fights that will decide who profits and who pays.",
  business: "Markets, earnings, deals, and the macro shifts that move them. Reported for readers who already know the basics.",
  politics: "Technology meets policy. The regulators, courts, and committees deciding what gets built and what gets blocked.",
  security: "Threats, breaches, defenders. Reported by people who can actually read the post-mortems.",
  opinion: "Argument and analysis from TechEchelon contributors and outside voices.",
};

export function generateStaticParams() {
  return VALID.map((c) => ({ slug: c }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = params.slug as Category;
  if (!VALID.includes(cat)) notFound();
  const posts = getPostsByCategory(cat);
  const [lead, ...rest] = posts;

  return (
    <div className="bg-cream min-h-screen">
      <SiteHeader />
      <section className="border-b border-rule bg-cream">
        <div className="max-w-[1320px] mx-auto px-7 pt-12 pb-9">
          <div className="font-mono text-[10.5px] tracking-[0.16em] uppercase font-bold text-coral mb-4">
            ━━ DESK
          </div>
          <h1 className="font-display text-[72px] font-extrabold tracking-[-0.035em] leading-[0.95] text-navy mb-5">
            {categoryLabel(cat)}.
          </h1>
          <p className="font-serif text-[18px] leading-relaxed text-ink-soft italic max-w-[640px]">
            {DESCRIPTIONS[cat]}
          </p>
        </div>
      </section>

      {lead && (
        <section className="border-b border-rule">
          <div className="max-w-[1320px] mx-auto px-7 py-10 grid grid-cols-[1.5fr_1fr] gap-14">
            <Link href={`/post/${lead.slug}`} className="block group">
              <div className="font-mono text-[10.5px] tracking-[0.1em] uppercase font-bold text-coral mb-3">
                №01 · LEAD · {(lead.subcategory ?? categoryLabel(cat)).toUpperCase()}
              </div>
              <h2 className="font-display text-[42px] font-extrabold tracking-[-0.03em] leading-[1.02] text-ink mb-4 group-hover:text-navy">
                {lead.title}
              </h2>
              <p className="font-serif text-[17px] leading-relaxed text-ink-soft italic mb-5 max-w-[640px]">
                {lead.excerpt}
              </p>
              <div
                className="aspect-[16/9] mb-3"
                style={{
                  backgroundColor: "#4A5468",
                  backgroundImage: lead.coverImage ? `url(${lead.coverImage})` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="font-mono text-[11px] tracking-[0.06em] uppercase font-semibold text-sand">
                <span className="text-navy font-bold not-italic normal-case font-sans text-[13px]">
                  {lead.author}
                </span>
                <span> · {relativeTime(lead.publishedAt).toUpperCase()}</span>
              </div>
            </Link>
            <div className="border-l border-rule pl-12">
              <div className="font-mono text-[10.5px] tracking-[0.14em] uppercase font-bold text-sage mb-5">
                ━ MORE FROM THIS DESK
              </div>
              <ol className="space-y-5">
                {rest.slice(0, 5).map((p, i) => (
                  <li
                    key={p.slug}
                    className="grid grid-cols-[28px_1fr] gap-3 pb-5 border-b border-rule-soft last:border-b-0 last:pb-0"
                  >
                    <span className="font-mono text-[13px] font-bold text-coral leading-tight pt-px">
                      №{(i + 2).toString().padStart(2, "0")}
                    </span>
                    <div>
                      <Link href={`/post/${p.slug}`}>
                        <h4 className="font-display text-[15px] font-extrabold tracking-[-0.015em] leading-[1.25] text-ink hover:text-navy">
                          {p.title}
                        </h4>
                      </Link>
                      <p className="font-mono text-[10px] tracking-[0.04em] uppercase text-sand mt-1.5">
                        {p.author} · {relativeTime(p.publishedAt).toUpperCase()}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      <section className="border-b border-rule">
        <div className="max-w-[1320px] mx-auto px-7 py-10">
          <div className="flex items-baseline gap-4 mb-7 pb-3 border-b border-rule">
            <h2 className="font-display text-[26px] font-extrabold tracking-[-0.025em] text-navy leading-none">
              Latest in {categoryLabel(cat).split(" ")[0]}
            </h2>
            <span className="font-mono text-[10.5px] tracking-[0.08em] uppercase font-semibold text-sand">
              UPDATED MOMENTS AGO
            </span>
          </div>
          {rest.length === 0 ? (
            <p className="text-sand">More coverage soon.</p>
          ) : (
            <div className="grid grid-cols-3 gap-x-10 gap-y-10">
              {rest.map((p, i) => (
                <article key={p.slug} className="group">
                  <Link href={`/post/${p.slug}`} className="block">
                    <div className="font-mono text-[10px] tracking-[0.1em] uppercase font-bold text-coral mb-2">
                      №{(i + 2).toString().padStart(2, "0")} · {(p.subcategory ?? categoryLabel(cat)).toUpperCase()}
                    </div>
                    <div
                      className="aspect-[16/10] mb-3"
                      style={{
                        backgroundColor: "#5c6478",
                        backgroundImage: p.coverImage ? `url(${p.coverImage})` : undefined,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <h4 className="font-display text-[19px] font-extrabold tracking-[-0.02em] leading-[1.12] text-ink mb-2 group-hover:text-navy">
                      {p.title}
                    </h4>
                    <p className="font-serif text-[13.5px] text-ink-soft leading-snug mb-2">
                      {p.excerpt}
                    </p>
                    <p className="font-mono text-[10px] tracking-[0.06em] uppercase text-sand">
                      <span className="text-navy font-bold not-italic normal-case font-sans text-[12px]">
                        {p.author}
                      </span>
                      <span> · {relativeTime(p.publishedAt).toUpperCase()}</span>
                    </p>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Newsletter />
      <SiteFooter />
    </div>
  );
}
