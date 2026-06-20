import Link from "next/link";
import { Post, formatPostDate, relativeTime } from "@/lib/posts";

export function Hero({ post }: { post: Post }) {
  return (
    <section className="bg-white px-5 py-7 border-b-[1.5px] border-navy">
      <div className="eyebrow mb-3.5">The Lead</div>
      <Link href={`/post/${post.slug}`} className="block">
        <h2 className="font-display text-[36px] font-black tracking-tighter leading-[1.02] text-navy mb-3.5 hover:underline decoration-2 underline-offset-4">
          {post.title}
        </h2>
      </Link>
      <p className="text-[15.5px] leading-relaxed text-ink-soft max-w-[600px] mb-4">
        {post.excerpt}
      </p>
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-coral text-white font-extrabold text-[12px] flex items-center justify-center tracking-tight">
          {post.authorInitials ?? post.author.split(" ").map((n) => n[0]).slice(0, 2).join("")}
        </div>
        <p className="text-[12.5px] leading-tight">
          <b className="font-extrabold">{post.author}</b>
          <br />
          <span className="text-sand font-medium">
            {post.readTime ?? 5} min read · {relativeTime(post.publishedAt)}
          </span>
        </p>
      </div>
      {post.pullQuote && (
        <div className="mt-5 px-4 py-4 bg-cream border-l-4 border-coral">
          <div className="text-[10.5px] tracking-[0.16em] uppercase font-extrabold text-coral mb-1.5">
            Why it matters
          </div>
          <p className="font-display text-[16px] font-bold tracking-tighter leading-tight text-navy">
            “{post.pullQuote.text}”
          </p>
        </div>
      )}
    </section>
  );
}
