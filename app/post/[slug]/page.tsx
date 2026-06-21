import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Newsletter } from "@/components/Newsletter";
import { ArticleHeader } from "@/components/ArticleHeader";
import { ArticleBody, renderMarkdown } from "@/components/ArticleBody";
import { AuthorBio } from "@/components/AuthorBio";
import { RelatedPosts } from "@/components/RelatedPosts";
import {
  getAllPosts,
  getPostBySlug,
  categoryLabel,
} from "@/lib/posts";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();
  const html = await renderMarkdown(post.content);
  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="bg-cream min-h-screen">
      <SiteHeader />
      <div className="bg-cream">
        <div className="max-w-[1320px] mx-auto px-5 md:px-7 py-3 text-[10.5px] md:text-[11px] tracking-[0.04em] text-sand font-semibold overflow-x-auto whitespace-nowrap">
          <Link href="/" className="text-navy hover:underline">
            Home
          </Link>
          <span className="mx-2 text-sand-light">/</span>
          <Link
            href={`/category/${post.category}`}
            className="text-navy hover:underline"
          >
            {categoryLabel(post.category)}
          </Link>
          {post.subcategory && (
            <>
              <span className="mx-2 text-sand-light">/</span>
              <span>{post.subcategory}</span>
            </>
          )}
        </div>
      </div>
      <ArticleHeader post={post} />
      <ArticleBody html={html} />
      <AuthorBio post={post} />
      <RelatedPosts posts={related} />
      <Newsletter />
      <SiteFooter />
    </div>
  );
}
