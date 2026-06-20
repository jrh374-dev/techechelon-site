import Link from "next/link";
import { Post, categoryLabel, relativeTime } from "@/lib/posts";

export function RightRail({
  feature,
  views,
}: {
  feature: Post;
  views: Post[];
}) {
  return (
    <aside>
      <Link href={`/post/${feature.slug}`} className="block group mb-7">
        <div className="text-[10.5px] tracking-[0.16em] uppercase font-bold text-navy mb-3">
          {feature.subcategory ?? categoryLabel(feature.category)}
        </div>
        <h3 className="font-display text-[26px] font-bold tracking-[-0.02em] leading-[1.1] text-ink mb-3 group-hover:text-navy">
          {feature.title}
        </h3>
        <p className="font-serif text-[14.5px] leading-snug text-ink-soft mb-4">
          {feature.excerpt}
        </p>
        <div
          className="aspect-[4/3] mb-2 relative"
          style={{
            backgroundColor: "#4A5468",
            backgroundImage: feature.coverImage ? `url(${feature.coverImage})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="text-[10px] tracking-[0.02em] text-sand italic">
          {feature.coverCredit?.replace(/^Photo · /, "") ?? "Editorial"}
        </div>
      </Link>

      <div className="grid grid-cols-2 gap-3">
        {views.slice(0, 2).map((p) => (
          <ViewCard key={p.slug} post={p} />
        ))}
      </div>
    </aside>
  );
}

function ViewCard({ post }: { post: Post }) {
  const initials = post.authorInitials ?? post.author.split(" ").map((n) => n[0]).slice(0, 2).join("");
  return (
    <Link
      href={`/post/${post.slug}`}
      className="block bg-cream-soft border border-black/10 p-4 hover:border-navy/40 group"
    >
      <div className="text-[10px] tracking-[0.12em] uppercase text-sand font-semibold mb-2">
        View / {post.subcategory ?? categoryLabel(post.category)}
      </div>
      <h4 className="font-display text-[16px] font-bold leading-[1.18] text-ink tracking-[-0.015em] mb-4 group-hover:text-navy">
        {post.title.replace(/\.$/, "").split(":")[0]}
      </h4>
      <div className="flex items-center gap-2 pt-3 border-t border-black/12">
        <div className="w-7 h-7 rounded-full bg-navy text-white text-[10px] font-bold flex items-center justify-center">
          {initials}
        </div>
        <span className="text-[11px] font-semibold text-ink">{post.author}</span>
      </div>
    </Link>
  );
}
