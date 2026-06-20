import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Newsletter } from "@/components/Newsletter";

interface Props {
  eyebrow: string;
  title: string;
  dek?: string;
  children: React.ReactNode;
}

export function StaticPage({ eyebrow, title, dek, children }: Props) {
  return (
    <div className="bg-cream min-h-screen">
      <SiteHeader />
      <section className="bg-cream border-b border-rule">
        <div className="max-w-[860px] mx-auto px-7 pt-12 pb-9 text-center">
          <div className="font-mono text-[10.5px] tracking-[0.16em] uppercase font-bold text-coral mb-4">
            ━━ {eyebrow}
          </div>
          <h1 className="font-display text-[58px] font-extrabold tracking-[-0.035em] leading-[0.96] text-navy mb-5">
            {title}
          </h1>
          {dek && (
            <p className="font-serif text-[18px] leading-relaxed text-ink-soft italic max-w-[640px] mx-auto">
              {dek}
            </p>
          )}
        </div>
      </section>
      <section className="bg-cream py-12">
        <div className="static-prose mx-auto px-7" style={{ maxWidth: "660px" }}>
          {children}
        </div>
      </section>
      <Newsletter />
      <SiteFooter />
    </div>
  );
}
