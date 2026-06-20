import Link from "next/link";
import { Post, Category, categoryLabel, relativeTime } from "@/lib/posts";

export function SectionBlock({
  category,
  posts,
  variant = "default",
}: {
  category: Category;
  posts: Post[];
  variant?: "default" | "white";
}) {
  if (posts.length === 0) return null;
  const [lead, ...rest] = posts;
  return (
    <section className={`px-5 py-7 ${variant === "white" ? "bg-white" : ""}`}>
      <div className="flex justify-between items-end mb-4.5 pb-2 border-b-2 border-navy">
        <h3 className="font-display text-[24px] font-black tracking-tighter text-navy leading-none">
          {categoryLabel(category)}.
        </h3>
        <Link
          href={`/category/${category}`}
          className="text-[11px] font-extrabold tracking-[0.04em] uppercase text-coral"
        >
          All {category === "ai" ? "AI" : category} →
        </Link>
      </div>
      <div className="space-y-5">
        <LeadCard post={lead} />
        {rest.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {rest.slice(0, 4).map((p) => (
              <ListCard key={p.slug} post={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function LeadCard({ post }: { post: Post }) {
  return (
    <article className="bg-cream p-4 border-b-[3px] border-navy">
      <div className="text-[10px] tracking-[0.16em] uppercase font-extrabold text-coral mb-2.5">
        {post.subcategory ?? "Feature"}
      </div>
      <Link href={`/post/${post.slug}`}>
        <h4 className="font-display text-[18px] font-black tracking-tighter leading-tight text-ink mb-2.5 hover:underline decoration-2 underline-offset-2">
          {post.title}
        </h4>
      </Link>
      <p className="text-[12.5px] text-ink-soft leading-relaxed mb-3">
        {post.excerpt}
      </p>
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-navy text-white font-extrabold text-[11px] flex items-center justify-center">
          {post.authorInitials ?? post.author.split(" ").map((n) => n[0]).slice(0, 2).join("")}
        </div>
        <p className="text-[11.5px]">
          <b className="font-extrabold">{post.author}</b>
          <span className="text-sand"> · {relativeTime(post.publishedAt)}</span>
        </p>
      </div>
    </article>
  );
}

function ListCard({ post }: { post: Post }) {
  return (
    <article className="pt-3 border-t-2 border-navy">
      <div className="text-[9.5px] tracking-[0.14em] uppercase font-extrabold text-navy mb-1.5">
        {post.subcategory ?? categoryLabel(post.category)}
      </div>
      <Link href={`/post/${post.slug}`}>
        <h5 className="font-display text-[13.5px] font-extrabold tracking-tighter leading-tight text-ink hover:underline decoration-2 underline-offset-2">
          {post.title}
        </h5>
      </Link>
      <p className="text-[10.5px] text-sand mt-2 font-medium">
        {post.author} · {relativeTime(post.publishedAt)}
      </p>
    </article>
  );
}
