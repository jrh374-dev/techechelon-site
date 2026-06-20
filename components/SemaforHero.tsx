import Link from "next/link";
import { Post, categoryLabel, relativeTime } from "@/lib/posts";

export function SemaforHero({ post }: { post: Post }) {
  const eyebrow = (post.subcategory ?? categoryLabel(post.category)).toUpperCase();
  return (
    <article className="text-center">
      <div className="text-[11px] tracking-[0.18em] uppercase font-bold text-navy mb-5">
        {eyebrow}
      </div>
      <Link href={`/post/${post.slug}`} className="block group">
        <h1 className="font-display text-[44px] font-bold tracking-[-0.022em] leading-[1.04] text-ink mx-auto max-w-[640px] mb-4 group-hover:text-navy">
          {post.title}
        </h1>
      </Link>
      <p className="font-serif text-[17px] leading-relaxed text-ink-soft mx-auto max-w-[600px] mb-7">
        {post.excerpt}
      </p>
      <div
        className="aspect-[16/10] mx-auto mb-3 relative max-w-[760px]"
        style={{
          backgroundColor: "#3a4756",
          backgroundImage: post.coverImage ? `url(${post.coverImage})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="text-[10.5px] tracking-[0.02em] text-sand italic max-w-[760px] mx-auto text-left pl-1">
        Photo · {post.coverCredit?.replace(/^Photo · /, "") ?? "Editorial"}
      </div>
      <div className="text-[11px] tracking-[0.05em] uppercase text-sand max-w-[760px] mx-auto text-right font-semibold mt-3">
        By <span className="text-navy font-bold not-italic">{post.author}</span> · {relativeTime(post.publishedAt)}
      </div>
    </article>
  );
}
