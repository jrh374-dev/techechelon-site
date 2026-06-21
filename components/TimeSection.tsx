import Link from "next/link";
import { Post, categoryLabel, relativeTime } from "@/lib/posts";

function publishedClock(iso: string): string {
  const d = new Date(iso);
  const hour = d.getHours();
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 || 12;
  const min = d.getMinutes().toString().padStart(2, "0");
  return `${h12.toString().padStart(2, "0")}:${min} ${ampm} ET`;
}

interface Props {
  label: string;
  range: string;
  posts: Post[];
  startNumber?: number;
}

export function TimeSection({ label, range, posts, startNumber = 2 }: Props) {
  if (posts.length === 0) return null;
  return (
    <section className="border-b border-rule">
      <div className="max-w-[1320px] mx-auto px-5 md:px-7 py-7 md:py-10">
        <div className="flex flex-wrap items-baseline gap-2 md:gap-4 mb-5 md:mb-7 pb-3 border-b border-rule">
          <h2 className="font-display text-[20px] md:text-[26px] font-extrabold tracking-[-0.025em] text-navy leading-none">
            {label}
          </h2>
          <span className="font-mono text-[10px] md:text-[11px] tracking-[0.08em] uppercase font-semibold text-sand">
            {range}
          </span>
          <span className="flex-1 hidden md:inline-block border-b border-rule mb-1" />
          <span className="font-mono text-[9.5px] md:text-[10.5px] tracking-[0.06em] uppercase font-bold text-coral">
            {posts.length} STORIES
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-7 md:gap-x-10 gap-y-7 md:gap-y-9">
          {posts.map((p, i) => (
            <TimeCard key={p.slug} post={p} num={startNumber + i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimeCard({ post, num }: { post: Post; num: number }) {
  return (
    <article className="group">
      <Link href={`/post/${post.slug}`} className="block">
        <div className="flex flex-wrap items-baseline gap-2 md:gap-2.5 mb-3">
          <span className="font-mono text-[12px] md:text-[12.5px] font-bold tracking-tight text-coral">
            №{num.toString().padStart(2, "0")}
          </span>
          <span className="font-mono text-[9.5px] md:text-[10px] tracking-[0.06em] uppercase font-semibold text-sand">
            {publishedClock(post.publishedAt)}
          </span>
          <span className="text-sand-light">·</span>
          <span className="font-mono text-[9.5px] md:text-[10px] tracking-[0.06em] uppercase font-bold text-navy">
            {(post.subcategory ?? categoryLabel(post.category)).toUpperCase()}
          </span>
        </div>
        <div
          className="aspect-[16/10] mb-3"
          style={{
            backgroundColor: "#5c6478",
            backgroundImage: post.coverImage ? `url(${post.coverImage})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <h3 className="font-display text-[19px] md:text-[21px] font-extrabold tracking-[-0.022em] leading-[1.1] text-ink mb-2 md:mb-2.5 group-hover:text-navy">
          {post.title}
        </h3>
        <p className="font-serif text-[13.5px] leading-snug text-ink-soft mb-3">
          {post.excerpt}
        </p>
        <div className="flex justify-between items-baseline pt-2.5 border-t border-rule-soft">
          <span className="text-[12px] font-bold text-navy">{post.author}</span>
          <span className="font-mono text-[9.5px] md:text-[10px] tracking-[0.04em] uppercase text-sand font-medium">
            {post.readTime ?? 5} MIN READ
          </span>
        </div>
      </Link>
    </article>
  );
}
