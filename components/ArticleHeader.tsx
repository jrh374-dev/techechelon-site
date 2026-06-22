import { Post, formatPostDate, formatPostTime, categoryLabel } from "@/lib/posts";

function publishedClock(iso: string): string {
  const d = new Date(iso);
  const hour = d.getHours();
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 || 12;
  const min = d.getMinutes().toString().padStart(2, "0");
  return `${h12.toString().padStart(2, "0")}:${min} ${ampm} ET`;
}

export function ArticleHeader({ post }: { post: Post }) {
  return (
    <div className="bg-cream border-b border-rule">
      <article className="max-w-[1100px] mx-auto px-5 md:px-8 pt-7 md:pt-12 pb-8 md:pb-10">
        <div className="flex items-center gap-3 mb-4 md:mb-5">
          <span className="font-mono text-[10px] md:text-[10.5px] tracking-[0.1em] uppercase font-bold text-coral">
            №01 / Anchor
          </span>
          <span className="text-sand-light">·</span>
          <span className="font-mono text-[10px] md:text-[10.5px] tracking-[0.1em] uppercase font-bold text-navy">
            {(post.subcategory ?? categoryLabel(post.category)).toUpperCase()}
          </span>
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
                  {formatPostDate(post.publishedAt).toUpperCase()} · {publishedClock(post.publishedAt)} · {post.readTime ?? 5} MIN READ
                </div>
              </div>
            </div>
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
