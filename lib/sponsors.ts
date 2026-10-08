// Sponsorship windows, read from two JSON files in content/.
//
// content/desk-sponsors.json — array of
//   { "desk": "ai", "name": "Acme", "url": "https://acme.com",
//     "logo": "/images/sponsors/acme.png", "start": "2026-11-01", "end": "2026-11-30" }
// A desk sponsor appears on the desk's front page while the window is
// current, and under the headline of every article that desk published
// inside the window (checked against the article's own date, so the line
// stays on those articles in the archive).
//
// content/brief-sponsors.json — array of
//   { "name": "Acme", "url": "https://acme.com", "message": "Up to 50 words.",
//     "start": "2026-11-03", "end": "2026-11-07" }
// The presenting sponsor of The Brief for each send date inside the window.
//
// Dates are calendar days in America/New_York, inclusive on both ends.

import fs from "node:fs";
import path from "node:path";
import type { Category } from "./posts";

export interface DeskSponsor {
  desk: Category;
  name: string;
  url?: string;
  logo?: string;
  start: string;
  end: string;
}

export interface BriefSponsor {
  name: string;
  url?: string;
  message: string;
  start: string;
  end: string;
}

function readJson<T>(file: string): T[] {
  try {
    const p = path.join(process.cwd(), "content", file);
    if (!fs.existsSync(p)) return [];
    const parsed = JSON.parse(fs.readFileSync(p, "utf8"));
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

// Calendar day in ET for an instant, as YYYY-MM-DD.
export function etDay(at: Date | string | number = new Date()): string | null {
  const t = at instanceof Date ? at.getTime() : typeof at === "number" ? at : Date.parse(at);
  if (!Number.isFinite(t)) return null;
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(t));
}

function covers(start: string, end: string, day: string): boolean {
  return start <= day && day <= end;
}

export function getDeskSponsor(desk: Category, at: Date | string | number = new Date()): DeskSponsor | null {
  const day = etDay(at);
  if (!day) return null;
  return readJson<DeskSponsor>("desk-sponsors.json").find((s) => s.desk === desk && covers(s.start, s.end, day)) ?? null;
}

export function getBriefSponsor(day: string): BriefSponsor | null {
  return readJson<BriefSponsor>("brief-sponsors.json").find((s) => covers(s.start, s.end, day)) ?? null;
}
