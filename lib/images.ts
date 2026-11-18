// Cover-image URLs sized to the slot they render in.
//
// Covers arrive at whatever size the publishing bot found: Wikimedia
// thumbnails are usually 3840px wide (1.5–5 MB), Pexels links ask for a
// 1880px dpr=2 render, Unsplash links ask for 1080–1600px. Dropping those
// into a 96px thumbnail or a 400px card leaves the box blank while
// megabytes download. sizedImage() rewrites the URL to request a width
// suited to the slot from the image host's own resizer.
//
// Wikimedia only serves a fixed set of thumbnail widths; others (1600, for
// one) return HTTP 400. Every rewrite therefore snaps to IMAGE_WIDTHS, and
// the same widths are used for Pexels and Unsplash so CDN caches stay warm.

export const IMAGE_WIDTHS = [330, 500, 960, 1280] as const;
export type ImageWidth = (typeof IMAGE_WIDTHS)[number];

const WIKIMEDIA_HOSTS = new Set(["upload.wikimedia.org", "thumb.wikimedia.org"]);

// /wikipedia/<project>/thumb/<a>/<ab>/<File>/<prefix><N>px-<thumb name>
// (prefix covers forms like "lossy-page1-" used for multi-page originals)
const WIKIMEDIA_THUMB = /^\/wikipedia\/([^/]+)\/thumb\/([0-9a-f])\/([0-9a-f]{2})\/([^/]+)\/([^/]*?)(\d+)px-([^/]+)$/;
// /wikipedia/<project>/<a>/<ab>/<File>
const WIKIMEDIA_ORIGINAL = /^\/wikipedia\/([^/]+)\/([0-9a-f])\/([0-9a-f]{2})\/([^/]+)$/;
// Originals whose thumbnails keep the same file name. SVG, TIFF and PDF
// thumbnails are rendered to a different format, so those stay untouched.
const RESIZABLE_ORIGINAL = /\.(jpe?g|png|webp|gif)$/i;

function snapWidth(width: number): ImageWidth {
  return IMAGE_WIDTHS.find((w) => w >= width) ?? IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1];
}

function parse(src: string): URL | null {
  try {
    return new URL(src);
  } catch {
    return null; // relative (/images/...) or malformed: leave as is
  }
}

function stripTracking(url: URL): void {
  for (const key of [...url.searchParams.keys()]) {
    if (key.toLowerCase().startsWith("utm_")) url.searchParams.delete(key);
  }
}

function wikimediaSized(url: URL, width: ImageWidth): string | null {
  const thumb = url.pathname.match(WIKIMEDIA_THUMB);
  if (thumb) {
    const [, project, a, ab, file, prefix, current, name] = thumb;
    // Never ask for more than the thumbnail the story already points at.
    const w = Math.min(width, Number(current));
    return `https://upload.wikimedia.org/wikipedia/${project}/thumb/${a}/${ab}/${file}/${prefix}${w}px-${name}`;
  }
  const original = url.pathname.match(WIKIMEDIA_ORIGINAL);
  if (original && RESIZABLE_ORIGINAL.test(original[4]!)) {
    const [, project, a, ab, file] = original;
    // Wikimedia serves the original when the requested width is larger
    // than the file, so small originals are safe to request this way.
    return `https://upload.wikimedia.org/wikipedia/${project}/thumb/${a}/${ab}/${file}/${width}px-${file}`;
  }
  return null;
}

// URL for `src` at roughly `width` CSS-independent pixels (snapped up to a
// standard width). Unknown hosts and relative paths come back unchanged.
export function sizedImage(src: string, width: number): string;
export function sizedImage(src: string | undefined, width: number): string | undefined;
export function sizedImage(src: string | undefined, width: number): string | undefined {
  if (!src) return src;
  const url = parse(src);
  if (!url) return src;
  const w = snapWidth(width);
  const host = url.hostname.toLowerCase();

  if (WIKIMEDIA_HOSTS.has(host)) {
    stripTracking(url);
    const resized = wikimediaSized(url, w);
    if (resized) return resized + url.search;
    return url.toString();
  }
  if (host === "images.pexels.com") {
    stripTracking(url);
    url.searchParams.delete("dpr");
    url.searchParams.delete("h");
    url.searchParams.set("auto", "compress");
    url.searchParams.set("cs", "tinysrgb");
    url.searchParams.set("w", String(w));
    return url.toString();
  }
  if (host === "images.unsplash.com") {
    stripTracking(url);
    url.searchParams.set("w", String(w));
    return url.toString();
  }
  return src;
}

// Value for a CSS background-image declaration. Quoted so a URL containing
// parentheses or spaces can't break out of url().
export function cssImage(src: string | undefined, width: number): string | undefined {
  const sized = sizedImage(src, width);
  return sized ? `url("${sized.replace(/["\\\n]/g, (c) => encodeURIComponent(c))}")` : undefined;
}

// Identity of the underlying photo regardless of the size or tracking
// parameters requested, so the same picture at two widths counts as one.
export function imageKey(src: string): string {
  const url = parse(src);
  if (!url) return src.split(/[?#]/)[0]!.toLowerCase();
  const host = url.hostname.toLowerCase();
  if (WIKIMEDIA_HOSTS.has(host)) {
    const m = url.pathname.match(WIKIMEDIA_THUMB) ?? url.pathname.match(WIKIMEDIA_ORIGINAL);
    if (m) return `wikimedia:${m[1]}/${m[2]}/${m[3]}/${m[4]}`;
  }
  return `${host}${url.pathname}`;
}

// Alt text for a cover. A written caption wins. Wikimedia files are named
// after what they show ("Palo_Alto_Networks_Headquarters_South_Side_2018"),
// so a readable file name is used next; stock photos and unreadable names
// get an empty alt and are treated as decorative.
export function coverAlt(src: string | undefined, caption?: string): string {
  if (caption?.trim()) return caption.trim();
  if (!src) return "";
  const url = parse(src);
  if (!url || !WIKIMEDIA_HOSTS.has(url.hostname.toLowerCase())) return "";
  const m = url.pathname.match(WIKIMEDIA_THUMB) ?? url.pathname.match(WIKIMEDIA_ORIGINAL);
  if (!m) return "";
  let name: string;
  try {
    name = decodeURIComponent(m[4]!);
  } catch {
    return "";
  }
  name = name
    .replace(/(\.[a-z0-9]{2,4})+$/i, "") // extension(s), e.g. ".svg.png"
    .replace(/_/g, " ")
    .replace(/\([^)]*\)/g, " ") // "(cropped)", "(3x4)"
    .replace(/\b(DSC|IMG|DSCN|P)\s?\d+\b/gi, " ") // camera serials
    .replace(/\b\d{5,}\b/g, " ") // long numeric ids
    .replace(/\s+-\s+(geograph|by)\b.*$/i, "") // credit suffixes
    .replace(/\s+\d{1,3}\s*$/, "") // trailing serials: "… Warsh 2", "… 010"
    .replace(/\s+/g, " ")
    .replace(/^[\s\-,.]+|[\s\-,.]+$/g, "");
  const words = name.split(" ").filter((w) => /[a-z]/i.test(w));
  return words.length >= 2 ? name : "";
}
