import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Newsletter } from "@/components/Newsletter";
import { ArticleHeader } from "@/components/ArticleHeader";
import { ArticleBody, renderMarkdown } from "@/components/ArticleBody";
import { AuthorBio } from "@/components/AuthorBio";
import { RelatedPosts } from "@/components/RelatedPosts";
import { ArticleStructuredData } from "@/components/ArticleStructuredData";
import { FaqStructuredData } from "@/components/FaqStructuredData";
import { ArticleQAndA } from "@/components/ArticleQAndA";
import {
  getAllPosts,
  getAllPostsIncludingScheduled,
  getPostBySlug,
  categoryLabel,
} from "@/lib/posts";

// Pre-build every post's page, including future-dated ones, so a
// scheduled article's URL resolves the instant it's followed. Listings
// still hide it until its publishedAt timestamp arrives.
export async function generateStaticParams() {
  return getAllPostsIncludingScheduled().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://techechelon.com");
  const url = `${siteUrl}/post/${post.slug}`;
  const image = post.coverImage ?? "/opengraph-image";
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      images: [
        { url: image, width: 1200, height: 630, alt: post.title },
      ],
      authors: [post.author],
      publishedTime: post.publishedAt,
      section: categoryLabel(post.category),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [image],
      creator: "@Tech_Echelon",
    },
  };
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
      <ArticleStructuredData post={post} />
      {(post.qa ?? post.faq) && (
        <FaqStructuredData items={post.qa ?? post.faq ?? []} />
      )}
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
      {post.qa && post.qa.length > 0 && (
        <ArticleQAndA
          post={post}
          intervieweeName="Mika Newton"
          intervieweeTitle="CEO, xCures"
          heading="Five questions with xCures CEO Mika Newton"
          intro="Sara Montes de Oca put five questions to Newton on how xCures actually defines clinical clarity, where its accuracy numbers come from, and what changes when the manual chart-review step goes away. This transcript has been lightly edited for length and clarity."
        />
      )}
      <AuthorBio post={post} />
      <RelatedPosts posts={related} />
      <Newsletter />
      <SiteFooter />
    </div>
  );
}
