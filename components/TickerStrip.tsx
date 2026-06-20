import Link from "next/link";
import { Post, relativeTime } from "@/lib/posts";

export function TickerStrip({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;
  return (
    <div className="border-y border-black/30 bg-cream-soft">
      <div className="max-w-[1280px] mx-auto px-6 py-3 flex gap-7 overflow-hidden">
        {posts.slice(0, 6).map((p) => (
          <Link
            key={p.slug}
            href={`/post/${p.slug}`}
            className="flex items-center gap-2.5 flex-shrink-0 group min-w-0"
          >
            <div
              className="w-7 h-7 flex-shrink-0 relative"
              style={{
                backgroundColor: "#5c6478",
                backgroundImage: p.coverImage ? `url(${p.coverImage})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <span className="font-display text-[12.5px] font-bold tracking-tight text-ink truncate group-hover:underline decoration-2 underline-offset-2 max-w-[260px]">
              {p.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
