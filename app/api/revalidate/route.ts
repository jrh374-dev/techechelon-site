import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// On-demand revalidation for scheduled posts.
//
// The homepage, desk pages, and article pages are statically generated at
// build time, and getAllPosts() hides any post whose publishedAt is still in
// the future. That means a scheduled article only surfaces on the next build
// or revalidation that happens after its timestamp — historically whenever
// the publishing bot next committed, which could be hours late.
//
// This route purges the static cache so the next request re-renders every
// page with the current time, bringing scheduled posts into listings on
// schedule. Vercel Cron calls it daily at 13:00 UTC (8:00 AM ET, the usual
// scheduling slot); it can also be called by hand to surface a post
// immediately.
//
// Auth: Vercel Cron sends `Authorization: Bearer $CRON_SECRET`.

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const expected = `Bearer ${process.env.CRON_SECRET ?? ""}`;
  if (!process.env.CRON_SECRET || authHeader !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Revalidating the root layout purges every route nested under it, which
  // is every page on the site.
  revalidatePath("/", "layout");

  return NextResponse.json({
    revalidated: true,
    at: new Date().toISOString(),
  });
}
