import Link from "next/link";
import { Post, categoryLabel, relativeTime } from "@/lib/posts";

const FALLBACK_BGS = ["#5c6478", "#8a7766", "#6e6856", "#4e5867", "#7a6e6a"];

export function SplitCard({
  post,
  size = "md",
  index = 0,
}: {
  post: Post;
  size?: "sm" | "md" | "lg";
  index?: number;
}) {
  const titleSize =
    size === "lg"
      ? "text-[24px] leading-[1.05]"
      : size === "sm"
      ? "text-[15px] leading-[1.15]"
      : "text-[19px] leading-[1.1]";
  const dekSize = size === "lg" ? "text-[14px]" : size === "sm" ? "text-[11.5px]" : "text-[12.5px]";
  const bg = FALLBACK_BGS[index % FALLBACK_BGS.length];

  return (
    <Link
      href={`/post/${post.slug}`}
      className="grid grid-cols-[1fr_1.2fr] gap-3.5 group"
    >
      <div
        className="aspect-[4/3] relative overflow-hidden"
        style={{
          backgroundColor: bg,
          backgroundImage: post.coverImage ? `url(${post.coverImage})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="flex flex-col justify-between">
        <div>
          <div className="text-[9.5px] tracking-[0.16em] uppercase font-extrabold text-coral mb-1.5">
            {post.subcategory ?? categoryLabel(post.category)}
          </div>
          <h3
            className={`font-display font-black tracking-tighter text-ink group-hover:underline decoration-2 underline-offset-2 ${titleSize}`}
          >
            {post.title}
          </h3>
          {size !== "sm" && (
            <p className={`text-sand mt-1.5 leading-snug ${dekSize}`}>
              {post.excerpt}
            </p>
          )}
        </div>
        <p className="text-[10.5px] text-sand font-semibold mt-2 tracking-[0.02em]">
          <b className="font-extrabold text-navy">{post.author}</b>
          <span> · {relativeTime(post.publishedAt)}</span>
        </p>
      </div>
    </Link>
  );
}
