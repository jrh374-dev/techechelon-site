import Link from "next/link";
import { Post, categoryLabel, relativeTime } from "@/lib/posts";

export function BigLead({ post }: { post: Post }) {
  return (
    <Link href={`/post/${post.slug}`} className="block group">
      <div className="text-[10.5px] tracking-[0.18em] uppercase font-extrabold text-coral mb-2.5 inline-flex items-center gap-2">
        <span>◆</span>
        <span>The Lead</span>
      </div>
      <div
        className="aspect-[16/10] relative overflow-hidden mb-4"
        style={{
          backgroundColor: "#3a4756",
          backgroundImage: post.coverImage ? `url(${post.coverImage})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {post.coverCredit && (
          <span className="absolute bottom-1.5 right-2 text-[9px] tracking-[0.12em] uppercase text-white/80 font-semibold">
            {post.coverCredit}
          </span>
        )}
      </div>
      <div className="text-[10px] tracking-[0.16em] uppercase font-extrabold text-coral mb-2.5">
        {post.subcategory ?? categoryLabel(post.category)}
      </div>
      <h1 className="font-display text-[42px] font-black tracking-tightest leading-[1.0] text-ink group-hover:underline decoration-[3px] underline-offset-4 mb-3.5">
        {post.title}
      </h1>
      <p className="font-serif text-[16px] leading-relaxed text-ink-soft italic mb-4 max-w-[600px]">
        {post.excerpt}
      </p>
      <div className="flex items-center gap-3 pt-3 border-t border-black/15">
        <div className="w-9 h-9 rounded-full bg-coral text-white font-extrabold text-[13px] flex items-center justify-center">
          {post.authorInitials ?? post.author.split(" ").map((n) => n[0]).slice(0, 2).join("")}
        </div>
        <div className="text-[12.5px]">
          <div className="font-extrabold text-navy">{post.author}</div>
          <div className="text-sand">
            {post.readTime ?? 5} min read · {relativeTime(post.publishedAt)}
          </div>
        </div>
      </div>
    </Link>
  );
}
