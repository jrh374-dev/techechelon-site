import Link from "next/link";
import { Post, categoryLabel, formatPostTime, relativeTime } from "@/lib/posts";

export function AnchorHero({ post }: { post: Post }) {
  const cat = (post.subcategory ?? categoryLabel(post.category)).toUpperCase();
  const initials =
    post.authorInitials ?? post.author.split(" ").map((n) => n[0]).slice(0, 2).join("");
  return (
    <section className="border-y border-rule">
      <div className="max-w-[1320px] mx-auto px-5 md:px-7 py-7 md:py-10 grid grid-cols-1 md:grid-cols-[1.05fr_1fr] gap-7 md:gap-14 items-start">
        <div className="order-2 md:order-1">
          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-5">
            <span className="font-mono text-[10px] md:text-[10.5px] tracking-[0.08em] uppercase font-bold text-coral">
              Anchor / №01
            </span>
            <span className="text-sand-light">·</span>
            <span className="font-mono text-[10px] md:text-[10.5px] tracking-[0.08em] uppercase font-bold text-navy">
              {cat}
            </span>
          </div>
          <Link href={`/post/${post.slug}`} className="block group">
            <h1 className="font-display text-[36px] md:text-[64px] font-extrabold tracking-[-0.035em] leading-[0.98] md:leading-[0.96] text-ink mb-4 md:mb-6 group-hover:text-navy">
              {post.title}
            </h1>
          </Link>
          <p className="font-serif text-[15.5px] md:text-[18px] leading-snug text-ink-soft italic mb-6 md:mb-8 max-w-[560px]">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3 pt-4 md:pt-5 border-t border-rule">
            <div className="w-9 h-9 rounded-full bg-coral text-white font-extrabold text-[13px] flex items-center justify-center tracking-tight flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <div className="text-[13px] font-bold text-ink leading-tight">
                {post.author}
              </div>
              <div className="font-mono text-[10px] md:text-[10.5px] text-sand tracking-[0.04em] mt-0.5">
                {formatPostTime(post.publishedAt)} · {post.readTime ?? 5} MIN · {relativeTime(post.publishedAt).toUpperCase()}
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <Link href={`/post/${post.slug}`} className="block group">
            <div
              className="aspect-[4/3] relative"
              style={{
                backgroundColor: "#3a4756",
                backgroundImage: post.coverImage ? `url(${post.coverImage})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="flex justify-between items-baseline mt-2 md:mt-2.5 gap-3">
              <span className="font-serif text-[11px] md:text-[11.5px] text-sand italic min-w-0 truncate">
                {post.coverCaption ?? "Photo of the day"}
              </span>
              <span className="font-mono text-[9px] md:text-[9.5px] tracking-[0.1em] uppercase text-sand font-semibold whitespace-nowrap">
                {post.coverCredit?.replace(/^Photo · /, "") ?? "Editorial"}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
