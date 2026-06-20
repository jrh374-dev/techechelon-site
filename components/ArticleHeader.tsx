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
      <article className="max-w-[1100px] mx-auto px-8 pt-12 pb-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="font-mono text-[10.5px] tracking-[0.1em] uppercase font-bold text-coral">
            №01 / Anchor
          </span>
          <span className="text-sand-light">·</span>
          <span className="font-mono text-[10.5px] tracking-[0.1em] uppercase font-bold text-navy">
            {(post.subcategory ?? categoryLabel(post.category)).toUpperCase()}
          </span>
        </div>
        <div className="grid grid-cols-[1.1fr_0.9fr] gap-12 items-start">
          <div>
            <h1 className="font-display text-[56px] font-extrabold tracking-[-0.035em] leading-[0.98] text-ink mb-6">
              {post.title}
            </h1>
            <p className="font-serif text-[18.5px] leading-snug text-ink-soft italic mb-7 max-w-[560px]">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-3 pt-5 border-t border-rule">
              <div className="w-10 h-10 rounded-full bg-coral text-white font-extrabold text-[13.5px] flex items-center justify-center tracking-tight">
                {post.authorInitials ?? post.author.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div>
                <div className="text-[13.5px] font-bold text-ink leading-tight">
                  {post.author}
                </div>
                <div className="font-mono text-[10.5px] text-sand tracking-[0.04em] mt-0.5">
                  {formatPostDate(post.publishedAt).toUpperCase()} · {publishedClock(post.publishedAt)} · {post.readTime ?? 5} MIN READ
                </div>
              </div>
            </div>
          </div>
          <div>
            <div
              className="aspect-[4/3] relative"
              style={{
                backgroundColor: "#3a4756",
                backgroundImage: post.coverImage ? `url(${post.coverImage})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="flex justify-between items-baseline mt-2.5">
              <span className="font-serif text-[11.5px] text-sand italic max-w-[400px]">
                {post.coverCaption ?? ""}
              </span>
              <span className="font-mono text-[9.5px] tracking-[0.1em] uppercase text-sand font-bold whitespace-nowrap">
                {post.coverCredit?.replace(/^Photo · /, "") ?? "Editorial"}
              </span>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
