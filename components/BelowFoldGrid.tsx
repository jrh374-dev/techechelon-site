import Link from "next/link";
import { Post, categoryLabel, relativeTime } from "@/lib/posts";

export function BelowFoldGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-4 divide-x divide-black/15">
      {posts.slice(0, 4).map((p) => (
        <article key={p.slug} className="px-6 first:pl-0 last:pr-0">
          <Link href={`/post/${p.slug}`} className="block group">
            <div className="text-[10px] tracking-[0.14em] uppercase font-bold text-coral mb-2">
              {p.subcategory ?? categoryLabel(p.category)}
            </div>
            <h3 className="font-display text-[22px] font-bold tracking-[-0.018em] leading-[1.1] text-ink mb-3 group-hover:text-navy">
              {p.title}
            </h3>
            <p className="font-serif text-[14px] leading-snug text-ink-soft mb-3">
              {p.excerpt}
            </p>
            <p className="text-[11px] text-sand tracking-[0.02em] font-medium">
              <span className="text-navy font-semibold">{p.author}</span> · {relativeTime(p.publishedAt)}
            </p>
          </Link>
        </article>
      ))}
    </div>
  );
}
