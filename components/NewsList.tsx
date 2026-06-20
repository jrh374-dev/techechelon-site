import Link from "next/link";
import { Post, relativeTime } from "@/lib/posts";

export function NewsList({
  title,
  posts,
  variant = "default",
}: {
  title: string;
  posts: Post[];
  variant?: "default" | "boxed";
}) {
  if (posts.length === 0) return null;
  return (
    <div
      className={
        variant === "boxed"
          ? "bg-cream border border-black/15 px-4 py-4"
          : ""
      }
    >
      <h3 className="font-display text-center text-[14px] font-black tracking-[0.04em] text-navy mb-3 pb-2 border-b border-black/30">
        {title}
      </h3>
      <ul className="space-y-3">
        {posts.map((p) => (
          <li key={p.slug} className="flex gap-2.5">
            <span className="text-coral font-extrabold text-[14px] leading-tight">•</span>
            <div>
              <Link href={`/post/${p.slug}`}>
                <h4 className="font-display text-[13px] font-bold leading-tight text-ink hover:underline decoration-2 underline-offset-2">
                  {p.title}
                </h4>
              </Link>
              <p className="text-[10px] text-sand mt-1 font-semibold tracking-[0.02em]">
                {p.author} · {relativeTime(p.publishedAt)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
