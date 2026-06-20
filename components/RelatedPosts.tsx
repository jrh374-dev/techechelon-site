import Link from "next/link";
import { Post, relativeTime, categoryLabel } from "@/lib/posts";

export function RelatedPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;
  return (
    <div className="bg-cream border-t border-rule">
      <div className="max-w-[1320px] mx-auto px-7 py-10">
        <div className="flex items-baseline gap-4 mb-7 pb-2 border-b border-rule">
          <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase font-bold text-sage">
            ━━ KEEP READING
          </span>
          <h3 className="font-display text-[20px] font-extrabold tracking-[-0.022em] text-navy leading-none">
            More from this desk
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-10">
          {posts.slice(0, 3).map((p, i) => (
            <article key={p.slug} className="group">
              <Link href={`/post/${p.slug}`} className="block">
                <div className="font-mono text-[10px] tracking-[0.1em] uppercase font-bold text-coral mb-2">
                  №{(i + 1).toString().padStart(2, "0")} · {(p.subcategory ?? categoryLabel(p.category)).toUpperCase()}
                </div>
                <div
                  className="aspect-[16/10] mb-3"
                  style={{
                    backgroundColor: "#6e7479",
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
                <div className="font-mono text-[10px] tracking-[0.06em] uppercase text-sand">
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
    </div>
  );
}
