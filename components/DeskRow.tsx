import Link from "next/link";
import { Post, Category, categoryLabel, relativeTime } from "@/lib/posts";

export function DeskRow({
  desk,
  posts,
}: {
  desk: Category;
  posts: Post[];
}) {
  if (posts.length === 0) return null;
  const [lead, ...rest] = posts;
  return (
    <section className="border-b border-rule">
      <div className="max-w-[1320px] mx-auto px-5 md:px-7 py-7 md:py-9">
        <div className="flex flex-wrap items-baseline gap-2 md:gap-4 mb-5 md:mb-6">
          <span className="font-mono text-[9.5px] md:text-[10px] tracking-[0.14em] uppercase font-bold text-sage">
            ━━ DESK
          </span>
          <h2 className="font-display text-[20px] md:text-[24px] font-extrabold tracking-[-0.022em] text-navy leading-none">
            {categoryLabel(desk)}
          </h2>
          <span className="flex-1 hidden md:inline-block border-b border-rule mb-1.5" />
          <Link
            href={`/category/${desk}`}
            className="font-mono text-[10px] md:text-[10.5px] tracking-[0.08em] uppercase font-bold text-coral"
          >
            All {desk === "ai" ? "AI" : desk} →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-7 md:gap-10">
          <article className="group">
            <Link href={`/post/${lead.slug}`} className="block">
              <div
                className="aspect-[16/10] mb-3 md:mb-4"
                style={{
                  backgroundColor: "#4A5468",
                  backgroundImage: lead.coverImage ? `url(${lead.coverImage})` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="font-mono text-[9.5px] md:text-[10px] tracking-[0.1em] uppercase font-bold text-coral mb-2">
                {(lead.subcategory ?? "Feature").toUpperCase()}
              </div>
              <h3 className="font-display text-[22px] md:text-[26px] font-extrabold tracking-[-0.025em] leading-[1.08] text-ink mb-3 group-hover:text-navy">
                {lead.title}
              </h3>
              <p className="font-serif text-[14px] md:text-[14.5px] leading-snug text-ink-soft mb-3">
                {lead.excerpt}
              </p>
              <div className="flex items-baseline gap-2 font-mono text-[9.5px] md:text-[10px] tracking-[0.06em] uppercase text-sand">
                <span className="text-navy font-bold not-italic normal-case font-sans text-[12px]">
                  {lead.author}
                </span>
                <span>·</span>
                <span>{relativeTime(lead.publishedAt).toUpperCase()}</span>
              </div>
            </Link>
          </article>
          {rest.slice(0, 2).map((p) => (
            <article key={p.slug} className="group">
              <Link href={`/post/${p.slug}`} className="block">
                <div className="font-mono text-[9.5px] md:text-[10px] tracking-[0.1em] uppercase font-bold text-coral mb-2">
                  {(p.subcategory ?? categoryLabel(desk)).toUpperCase()}
                </div>
                <h4 className="font-display text-[17px] md:text-[19px] font-extrabold tracking-[-0.02em] leading-[1.12] text-ink mb-2 md:mb-2.5 group-hover:text-navy">
                  {p.title}
                </h4>
                <p className="font-serif text-[13.5px] leading-snug text-ink-soft mb-3">
                  {p.excerpt}
                </p>
                <div className="font-mono text-[9.5px] md:text-[10px] tracking-[0.06em] uppercase text-sand">
                  <span className="text-navy font-bold not-italic normal-case font-sans text-[12px]">
                    {p.author}
                  </span>
                  <span> · {relativeTime(p.publishedAt).toUpperCase()}</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
