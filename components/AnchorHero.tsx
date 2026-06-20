import Link from "next/link";
import { Post, categoryLabel, relativeTime } from "@/lib/posts";

function publishedAtClock(iso: string): string {
  const d = new Date(iso);
  const hour = d.getHours();
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 || 12;
  const min = d.getMinutes().toString().padStart(2, "0");
  return `${h12.toString().padStart(2, "0")}:${min} ${ampm} ET`;
}

export function AnchorHero({ post }: { post: Post }) {
  const cat = (post.subcategory ?? categoryLabel(post.category)).toUpperCase();
  const initials =
    post.authorInitials ?? post.author.split(" ").map((n) => n[0]).slice(0, 2).join("");
  return (
    <section className="border-y border-rule">
      <div className="max-w-[1320px] mx-auto px-7 py-10 grid grid-cols-[1.05fr_1fr] gap-14 items-start">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[10.5px] tracking-[0.08em] uppercase font-bold text-coral">
              Anchor / №01
            </span>
            <span className="text-sand-light">·</span>
            <span className="font-mono text-[10.5px] tracking-[0.08em] uppercase font-bold text-navy">
              {cat}
            </span>
          </div>
          <Link href={`/post/${post.slug}`} className="block group">
            <h1 className="font-display text-[64px] font-extrabold tracking-[-0.035em] leading-[0.96] text-ink mb-6 group-hover:text-navy">
              {post.title}
            </h1>
          </Link>
          <p className="font-serif text-[18px] leading-snug text-ink-soft italic mb-8 max-w-[560px]">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3 pt-5 border-t border-rule">
            <div className="w-9 h-9 rounded-full bg-coral text-white font-extrabold text-[13px] flex items-center justify-center tracking-tight">
              {initials}
            </div>
            <div>
              <div className="text-[13px] font-bold text-ink leading-tight">
                {post.author}
              </div>
              <div className="font-mono text-[10.5px] text-sand tracking-[0.04em] mt-0.5">
                {publishedAtClock(post.publishedAt)} · {post.readTime ?? 5} MIN · {relativeTime(post.publishedAt).toUpperCase()}
              </div>
            </div>
          </div>
        </div>
        <div>
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
            <div className="flex justify-between items-baseline mt-2.5">
              <span className="font-serif text-[11.5px] text-sand italic">
                {post.coverCaption ?? "Photo of the day"}
              </span>
              <span className="font-mono text-[9.5px] tracking-[0.1em] uppercase text-sand font-semibold">
                {post.coverCredit?.replace(/^Photo · /, "") ?? "Editorial"}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
