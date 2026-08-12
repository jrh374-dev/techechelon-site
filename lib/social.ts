// LinkedIn copy generation for the Social Desk. For each article we ask
// Claude for two pieces: a company-page post (institutional voice) and a
// suggested repost comment in the Editor in Chief's personal voice.
// Generations are memoized per-slug via unstable_cache so each article
// only ever costs one LLM call; a deterministic fallback keeps the desk
// usable if the API is unreachable.

import { unstable_cache } from "next/cache";
import { Post, categoryLabel } from "@/lib/posts";

const SITE_URL = "https://www.techechelon.com";
const MODEL = "claude-sonnet-5";

export interface SocialCopy {
  companyPost: string;
  saraRepost: string;
  generated: boolean; // false when the deterministic fallback was used
}

interface AnthropicResponse {
  content?: Array<{ type: string; text?: string }>;
}

function fallbackCopy(post: Post): SocialCopy {
  const url = `${SITE_URL}/post/${post.slug}`;
  return {
    companyPost: `${post.title}\n\n${post.excerpt}\n\n${url}`,
    saraRepost: `Our latest from the ${categoryLabel(post.category)} desk. Worth your time.`,
    generated: false,
  };
}

async function rawGenerate(
  slug: string,
  title: string,
  excerpt: string,
  category: string,
  author: string,
  bodyHead: string,
): Promise<SocialCopy> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const url = `${SITE_URL}/post/${slug}`;
  if (!apiKey) {
    throw new Error("no ANTHROPIC_API_KEY");
  }

  const systemPrompt = `You write social media copy for TechEchelon, an independent news publication covering technology, markets, and policy. You will be given one article. Produce TWO pieces of LinkedIn copy as strict JSON.

1. "companyPost" — a post for the TechEchelon COMPANY PAGE.
   - Open with a hook line stating the most newsworthy fact. Never open with "We're excited", "We're proud", "New article", or the article's headline verbatim.
   - 2 to 4 short sentences total. Confident, institutional, wire-service register. No first person.
   - Then a blank line, then the article URL on its own line: ${url}
   - After the URL, one line with 2 or 3 relevant hashtags (CamelCase, no spaces). Never more than 3.
   - NEVER use em-dashes (—) anywhere. Use periods, commas, or colons instead.

2. "saraRepost" — a short comment Sara Montes de Oca, TechEchelon's Editor in Chief, would write when REPOSTING the company post from her personal profile.
   - 1 to 3 sentences, first person, editorial judgment. Sounds like a person, not a brand.
   - Reference why the story matters or what stood out in the reporting. Do not restate the headline.
   - No hashtags, no link (the repost carries those already), no "thrilled", "excited", "proud", or exclamation marks.
   - NEVER use em-dashes (—).

Output ONLY the JSON object: {"companyPost": "...", "saraRepost": "..."}`;

  const userPrompt = JSON.stringify({
    title,
    category,
    author,
    excerpt,
    bodyOpening: bodyHead,
  });

  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 600,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    }),
    next: { revalidate: 300 },
  });
  if (!r.ok) {
    throw new Error(`anthropic ${r.status}`);
  }
  const body = (await r.json()) as AnthropicResponse;
  const text = (body.content ?? [])
    .filter((b) => b.type === "text")
    .map((b) => b.text ?? "")
    .join("")
    .trim();
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("no JSON in response");
  const parsed = JSON.parse(match[0]) as {
    companyPost?: string;
    saraRepost?: string;
  };
  if (!parsed.companyPost || !parsed.saraRepost) {
    throw new Error("missing fields");
  }
  return {
    companyPost: parsed.companyPost.trim(),
    saraRepost: parsed.saraRepost.trim(),
    generated: true,
  };
}

const cachedGenerate = unstable_cache(rawGenerate, ["social-copy-v1"], {
  revalidate: 60 * 60 * 24 * 30,
});

function stripMarkdown(md: string): string {
  return md
    .replace(/!\[[^\]]*]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/[*_`>#|]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export async function getSocialCopy(post: Post): Promise<SocialCopy> {
  try {
    return await cachedGenerate(
      post.slug,
      post.title,
      post.excerpt,
      categoryLabel(post.category),
      post.author,
      stripMarkdown(post.content).slice(0, 700),
    );
  } catch {
    return fallbackCopy(post);
  }
}
