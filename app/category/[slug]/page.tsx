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
  opinion: "Argument and analysis from TechEchelon contributors and outside voices, plus the Executive Q&A interview series.",
};

const PAGE_SIZE = 18;

export function generateStaticParams() {
  return VALID.map((c) => ({ slug: c }));
}

export default function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { page?: string };
}) {
  const cat = params.slug as Category;
  if (!VALID.includes(cat)) notFound();
  const allPosts = getPostsByCategory(cat);
  const page = Math.max(1, Number(searchParams.page ?? 1) || 1);
  const totalPages = Math.max(1, Math.ceil(allPosts.length / PAGE_SIZE));
  const offset = (page - 1) * PAGE_SIZE;
  const posts = allPosts.slice(offset, offset + PAGE_SIZE);

  // On page 1, the very first article is treated as the page Lead.
  // On later pages, no special lead — just a chronological grid.
  const isFirstPage = page === 1;
  const lead = isFirstPage ? posts[0] : null;
  const rest = isFirstPage ? posts.slice(1) : posts;

  return (
    <div className="bg-cream min-h-screen">
      <SiteHeader />
      <section className="bg-cream border-b border-rule">
        <div className="max-w-[860px] mx-auto px-5 md:px-7 pt-9 md:pt-12 pb-7 md:pb-9 text-center">
          <div className="font-mono text-[10px] md:text-[10.5px] tracking-[0.16em] uppercase font-bold text-coral mb-3 md:mb-4">
            ━━ DESK
          </div>
          <h1 className="font-display text-[42px] md:text-[64px] font-extrabold tracking-[-0.03em] md:tracking-[-0.035em] leading-[0.96] md:leading-[0.95] text-navy mb-4 md:mb-5">
            {categoryLabel(cat)}
          </h1>
          <p className="font-serif text-[15.5px] md:text-[17px] leading-relaxed text-ink-soft italic mx-auto max-w-[600px]">
            {DESCRIPTIONS[cat]}
          </p>
          <div className="mt-5 md:mt-6 font-mono text-[10.5px] tracking-[0.08em] uppercase font-semibold text-sand">
            {allPosts.length.toLocaleString()} STORIES · PAGE {page} OF {totalPages}
          </div>
        </div>
      </section>

      {lead && (
        <section className="bg-cream border-b border-rule">
          <div className="max-w-[1320px] mx-auto px-5 md:px-7 py-7 md:py-10">
            <Link href={`/post/${lead.slug}`} className="block group">
              <div className="font-mono text-[10px] md:text-[10.5px] tracking-[0.1em] uppercase font-bold text-coral mb-3">
                №01 · LEAD · {(lead.subcategory ?? categoryLabel(cat)).toUpperCase()}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-6 md:gap-10 items-start">
                <div className="order-2 md:order-1">
                  <h2 className="font-display text-[28px] md:text-[42px] font-extrabold tracking-[-0.025em] md:tracking-[-0.03em] leading-[1.04] text-ink mb-3 md:mb-4 group-hover:text-navy">
                    {lead.title}
                  </h2>
                  <p className="font-serif text-[15px] md:text-[17px] leading-relaxed text-ink-soft italic mb-4 md:mb-5">
                    {lead.excerpt}
                  </p>
                  <p className="font-mono text-[11px] tracking-[0.06em] uppercase font-semibold text-sand">
                    <span className="text-navy font-bold not-italic normal-case font-sans text-[13px]">
                      {lead.author}
                    </span>
                    <span> · {relativeTime(lead.publishedAt).toUpperCase()}</span>
                  </p>
                </div>
                <div
                  className="aspect-[16/10] order-1 md:order-2"
                  style={{
                    backgroundColor: "#4A5468",
                    backgroundImage: lead.coverImage ? `url(${lead.coverImage})` : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="bg-cream">
        <div className="max-w-[1320px] mx-auto px-5 md:px-7 py-8 md:py-10">
          <div className="flex flex-wrap items-baseline gap-3 mb-5 md:mb-7 pb-3 border-b border-rule">
            <h3 className="font-display text-[20px] md:text-[24px] font-extrabold tracking-[-0.025em] text-navy leading-none">
              {isFirstPage ? `More in ${categoryLabel(cat).split(" ")[0]}` : `${categoryLabel(cat)} · Page ${page}`}
            </h3>
            <span className="font-mono text-[10px] md:text-[10.5px] tracking-[0.08em] uppercase font-semibold text-sand">
              Showing {rest.length}
            </span>
          </div>
          {rest.length === 0 ? (
            <p className="text-sand font-mono text-[12px] uppercase tracking-wider">
              No more stories on this page.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 md:gap-x-10 gap-y-8 md:gap-y-10">
              {rest.map((p, i) => (
                <article key={p.slug} className="group">
                  <Link href={`/post/${p.slug}`} className="block">
                    <div className="font-mono text-[9.5px] md:text-[10px] tracking-[0.1em] uppercase font-bold text-coral mb-2">
                      №{(offset + i + (isFirstPage ? 2 : 1)).toString().padStart(2, "0")} · {(p.subcategory ?? categoryLabel(cat)).toUpperCase()}
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
                    <h4 className="font-display text-[17px] md:text-[19px] font-extrabold tracking-[-0.02em] leading-[1.12] text-ink mb-2 group-hover:text-navy">
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

          {totalPages > 1 && (
            <Pagination basePath={`/category/${cat}`} page={page} totalPages={totalPages} />
          )}
        </div>
      </section>

      <Newsletter />
      <SiteFooter />
    </div>
  );
}

function Pagination({
  basePath,
  page,
  totalPages,
}: {
  basePath: string;
  page: number;
  totalPages: number;
}) {
  const prev = page > 1 ? page - 1 : null;
  const next = page < totalPages ? page + 1 : null;
  // Compact: first, prev, current ±2, next, last
  const pages = new Set<number>([1, totalPages]);
  for (let p = Math.max(1, page - 2); p <= Math.min(totalPages, page + 2); p++) pages.add(p);
  const sorted = [...pages].sort((a, b) => a - b);
  return (
    <nav className="mt-10 md:mt-12 flex items-center justify-center gap-1.5 md:gap-2.5 flex-wrap font-mono text-[11px] md:text-[12px] tracking-[0.04em] uppercase">
      <PageLink
        href={prev ? `${basePath}${prev === 1 ? "" : `?page=${prev}`}` : null}
        label="← Prev"
      />
      {sorted.map((p, idx) => {
        const gap = idx > 0 && p - sorted[idx - 1]! > 1;
        return (
          <span key={p} className="flex items-center gap-1.5 md:gap-2.5">
            {gap && <span className="text-sand-light">…</span>}
            <PageLink
              href={p === page ? null : `${basePath}${p === 1 ? "" : `?page=${p}`}`}
              label={p.toString().padStart(2, "0")}
              active={p === page}
            />
          </span>
        );
      })}
      <PageLink
        href={next ? `${basePath}?page=${next}` : null}
        label="Next →"
      />
    </nav>
  );
}

function PageLink({ href, label, active = false }: { href: string | null; label: string; active?: boolean }) {
  const cls = active
    ? "bg-navy text-white px-3 py-1.5 font-bold"
    : href
    ? "px-3 py-1.5 text-ink hover:bg-cream-deep border border-rule font-bold"
    : "px-3 py-1.5 text-sand-light cursor-not-allowed font-medium";
  if (!href) return <span className={cls}>{label}</span>;
  return (
    <Link href={href} className={cls}>
      {label}
    </Link>
  );
}
