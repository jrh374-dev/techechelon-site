"use client";

export function Newsletter() {
  return (
    <section className="border-y border-rule bg-cream">
      <div className="max-w-[1320px] mx-auto px-7 py-12 grid grid-cols-[1.3fr_1fr] gap-14 items-center">
        <div>
          <div className="font-mono text-[10.5px] tracking-[0.16em] uppercase font-bold text-coral mb-4">
            ● THE BRIEF · DAILY NEWSLETTER
          </div>
          <h3 className="font-display text-[44px] font-extrabold tracking-[-0.03em] leading-[1.0] text-navy mb-5 max-w-[520px]">
            Five stories every morning. Before the opening bell.
          </h3>
          <p className="font-serif text-[16.5px] leading-relaxed text-ink-soft max-w-[480px] italic">
            Written for readers who already know the basics — markets, AI, and the policy decisions that shape both.
          </p>
          <div className="mt-5 font-mono text-[10.5px] tracking-[0.08em] uppercase text-sand font-semibold">
            Mon — Fri · 06:30 ET · Free
          </div>
        </div>
        <form className="border-l border-rule pl-14" onSubmit={(e) => e.preventDefault()}>
          <label className="font-mono text-[11px] tracking-[0.14em] uppercase font-bold text-sage mb-3 block">
            Subscribe — Free
          </label>
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full px-4 py-3.5 border border-rule bg-white text-ink text-[15px] placeholder:text-sand-light focus:border-navy focus:outline-none font-sans"
          />
          <button
            type="submit"
            className="w-full mt-3 bg-navy text-white px-5 py-3.5 text-[13px] font-extrabold tracking-[0.06em] uppercase hover:bg-coral transition-colors"
          >
            Get the Brief →
          </button>
          <p className="font-mono text-[9.5px] tracking-[0.04em] uppercase text-sand mt-3 text-center">
            No spam · Unsubscribe anytime
          </p>
        </form>
      </div>
    </section>
  );
}
