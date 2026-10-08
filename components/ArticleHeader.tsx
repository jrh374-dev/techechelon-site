import { Post, formatPostDate, formatPostTime, categoryLabel, isSponsored } from "@/lib/posts";
import { getDeskSponsor } from "@/lib/sponsors";

export function ArticleHeader({ post }: { post: Post }) {
  const sponsored = isSponsored(post);
  // Desk sponsorship is judged by the article's own date, so the line
  // stays on articles filed during a sponsored month.
  const deskSponsor = sponsored ? null : getDeskSponsor(post.category, post.publishedAt);
  return (
    <div className="bg-cream border-b border-rule">
      <article className="max-w-[1100px] mx-auto px-5 md:px-8 pt-7 md:pt-12 pb-8 md:pb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4 md:mb-5">
          {sponsored ? (
            <>
              <span className="font-mono text-[10px] md:text-[10.5px] tracking-[0.1em] uppercase font-bold text-cream bg-coral px-2 py-0.5">
                Sponsored
              </span>
              <span className="text-sand-light">·</span>
              <span className="font-mono text-[10px] md:text-[10.5px] tracking-[0.1em] uppercase font-bold text-navy">
                Partner content
              </span>
            </>
          ) : (
            <>
              <span className="font-mono text-[10px] md:text-[10.5px] tracking-[0.1em] uppercase font-bold text-coral">
                №01 / Anchor
              </span>
              <span className="text-sand-light">·</span>
              <span className="font-mono text-[10px] md:text-[10.5px] tracking-[0.1em] uppercase font-bold text-navy">
                {(post.subcategory ?? categoryLabel(post.category)).toUpperCase()}
              </span>
            </>
          )}
          {deskSponsor && (
            <>
              <span className="text-sand-light">·</span>
              <span className="font-mono text-[10px] md:text-[10.5px] tracking-[0.1em] uppercase font-semibold text-sand">
                {categoryLabel(post.category)} desk presented by{" "}
                {deskSponsor.url ? (
                  <a href={deskSponsor.url} rel="sponsored noopener" target="_blank" className="font-bold text-navy hover:text-coral">
                    {deskSponsor.name}
                  </a>
                ) : (
                  <span className="font-bold text-navy">{deskSponsor.name}</span>
                )}
              </span>
            </>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-6 md:gap-12 items-start">
          <div className="order-2 md:order-1">
            <h1 className="font-display text-[32px] md:text-[56px] font-extrabold tracking-[-0.035em] leading-[0.98] text-ink mb-4 md:mb-6">
              {post.title}
            </h1>
            <p className="font-serif text-[15.5px] md:text-[18.5px] leading-snug text-ink-soft italic mb-5 md:mb-7 max-w-[560px]">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-3 pt-4 md:pt-5 border-t border-rule">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-coral text-white font-extrabold text-[12px] md:text-[13.5px] flex items-center justify-center tracking-tight flex-shrink-0">
                {post.authorInitials ?? post.author.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div className="min-w-0">
                <div className="text-[13px] md:text-[13.5px] font-bold text-ink leading-tight">
                  {post.author}
                </div>
                <div className="font-mono text-[9.5px] md:text-[10.5px] text-sand tracking-[0.04em] mt-0.5">
                  {formatPostDate(post.publishedAt).toUpperCase()} · {formatPostTime(post.publishedAt)} · {post.readTime ?? 5} MIN READ
                </div>
              </div>
            </div>
            {sponsored && (
              <p className="mt-4 font-serif text-[13.5px] leading-snug text-sand italic max-w-[560px]">
                Sponsored by{" "}
                {post.sponsor?.url ? (
                  <a href={post.sponsor.url} rel="sponsored noopener" target="_blank" className="text-navy not-italic font-semibold hover:text-coral">
                    {post.sponsor.name}
                  </a>
                ) : (
                  <span className="text-navy not-italic font-semibold">{post.sponsor?.name ?? "a partner"}</span>
                )}
                . Partner content is paid for by the sponsor, reviewed by TechEchelon for accuracy, and kept separate from our news coverage.
              </p>
            )}
          </div>
          <div className="order-1 md:order-2">
            {post.coverFit === "contain" ? (
              <div className="aspect-[4/3] bg-cream-deep overflow-hidden flex items-center justify-center">
                {post.coverImage && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={post.coverImage}
                    alt={post.coverCaption ?? post.title}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            ) : (
              <div
                className="aspect-[4/3] relative"
                style={{
                  backgroundColor: "#3a4756",
                  backgroundImage: post.coverImage ? `url(${post.coverImage})` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            )}
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-1 mt-2 md:mt-2.5">
              <span className="font-serif text-[11.5px] text-sand italic max-w-[400px] order-2 md:order-1">
                {post.coverCaption ?? ""}
              </span>
              <span className="font-mono text-[9px] md:text-[9.5px] tracking-[0.1em] uppercase text-sand font-bold whitespace-nowrap order-1 md:order-2">
                {post.coverCredit?.replace(/^Photo · /, "") ?? "Editorial"}
              </span>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
