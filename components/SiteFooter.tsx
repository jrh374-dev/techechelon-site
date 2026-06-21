import Link from "next/link";
import { TechEchelonMark } from "./TechEchelonMark";

const SECTIONS = {
  Desks: [
    { label: "Markets", href: "/category/business" },
    { label: "Policy", href: "/category/politics" },
    { label: "Artificial Intelligence", href: "/category/ai" },
    { label: "Cybersecurity", href: "/category/security" },
    { label: "Opinion", href: "/category/opinion" },
  ],
  Newsroom: [
    { label: "About TechEchelon", href: "/about" },
    { label: "Masthead", href: "/masthead" },
    { label: "Ethics & Standards", href: "/ethics" },
    { label: "Contact", href: "/contact" },
    { label: "Corrections", href: "/corrections" },
  ],
  Channels: [
    { label: "The Brief Newsletter", href: "/subscribe" },
    { label: "X · @Tech_Echelon", href: "https://x.com/Tech_Echelon" },
    { label: "RSS Feed", href: "/rss.xml" },
    { label: "Events", href: "/events" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-cream-deep border-t border-rule">
      <div className="max-w-[1320px] mx-auto px-5 md:px-7 pt-9 md:pt-12 pb-6 md:pb-7">
        <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-7 md:gap-12 pb-8 md:pb-10 border-b border-rule">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 text-navy mb-4">
              <TechEchelonMark size={36} />
              <div className="font-display font-extrabold text-[26px] md:text-[30px] tracking-[-0.025em] text-navy leading-none">
                TechEchelon
              </div>
            </Link>
            <p className="font-serif text-[14px] leading-relaxed text-ink-soft max-w-[280px] mb-5">
              Independent reporting on technology, markets, and the policy decisions that shape both. Founded 2024.
            </p>
            <div className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-sand font-semibold">
              NEW YORK · WASHINGTON · SAN FRANCISCO
            </div>
          </div>
          {(Object.keys(SECTIONS) as Array<keyof typeof SECTIONS>).map((heading) => (
            <div key={heading}>
              <h4 className="font-mono text-[10.5px] font-bold tracking-[0.14em] uppercase text-coral mb-3 md:mb-4">
                ━ {heading}
              </h4>
              <ul className="space-y-2 md:space-y-2.5">
                {SECTIONS[heading].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="font-display text-[13px] font-medium text-ink hover:text-coral">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row md:justify-between gap-2 font-mono text-[10px] md:text-[10.5px] tracking-[0.06em] uppercase font-semibold text-sand pt-5 md:pt-6">
          <span>© {year} TechEchelon Media · All rights reserved</span>
          <span>Terms · Privacy · Accessibility</span>
        </div>
      </div>
    </footer>
  );
}
