"use client";

import { useId, useState } from "react";

type Status = "idle" | "pending" | "success" | "error";

// "band" is the full-width sign-up section used across the site; "rail" is
// the same form and copy as a compact box for a desk page's right rail.
export function Newsletter({ variant = "band" }: { variant?: "band" | "rail" }) {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (status === "pending" || status === "success") return;

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("pending");
    setMessage("");

    try {
      const r = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      if (r.ok) {
        setStatus("success");
        setMessage("You're in. Look for The Brief in your inbox next weekday at 6:30 AM ET.");
        setEmail("");
        return;
      }
      let payload: { error?: string } = {};
      try {
        payload = (await r.json()) as { error?: string };
      } catch {
        /* leave payload empty */
      }
      setStatus("error");
      setMessage(
        payload.error === "invalid_email"
          ? "That email doesn't look right. Try again?"
          : "Something went wrong. Please try again in a moment.",
      );
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again in a moment.");
    }
  }

  const disabled = status === "pending" || status === "success";
  const buttonLabel =
    status === "pending" ? "Subscribing…" : status === "success" ? "Subscribed ✓" : "Get the Brief →";

  if (variant === "rail") {
    return (
      <section aria-labelledby={`${inputId}-title`} className="bg-navy text-cream p-5 md:p-6">
        <div className="font-mono text-[10.5px] tracking-[0.14em] uppercase font-bold text-coral-light">
          ● THE BRIEF · DAILY NEWSLETTER
        </div>
        <h2
          id={`${inputId}-title`}
          className="mt-2 font-display text-[24px] md:text-[26px] font-extrabold tracking-[-0.025em] leading-[1.08]"
        >
          Five stories every morning. Before the opening bell.
        </h2>
        <p className="mt-3 font-serif text-[14.5px] leading-snug italic text-cream/80">
          Written for readers who already know the basics — markets, AI, and the policy decisions that shape both.
        </p>
        <form className="mt-4 flex flex-col gap-2" onSubmit={handleSubmit} noValidate>
          <label htmlFor={inputId} className="text-[12px] font-semibold">
            Email address
          </label>
          <input
            id={inputId}
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={disabled}
            placeholder="your@email.com"
            className="w-full px-3 py-3 bg-cream text-ink text-[14px] placeholder:text-sand border border-transparent focus:border-coral focus:outline-none font-sans disabled:bg-cream-deep disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={disabled}
            className="w-full bg-coral text-ink px-4 py-3 text-[13px] font-extrabold tracking-[0.06em] uppercase hover:bg-coral-light transition-colors disabled:bg-sand-light disabled:cursor-not-allowed"
          >
            {buttonLabel}
          </button>
          {message ? (
            <p
              className={`font-mono text-[10.5px] tracking-[0.04em] mt-1 ${
                status === "error" ? "text-coral-light" : "text-sage-light"
              }`}
              role={status === "error" ? "alert" : "status"}
            >
              {message}
            </p>
          ) : (
            <p className="font-mono text-[9.5px] tracking-[0.06em] uppercase text-cream/70 mt-1">
              Mon — Fri · 06:30 ET · Free · Unsubscribe anytime
            </p>
          )}
        </form>
      </section>
    );
  }

  return (
    <section className="border-y border-rule bg-cream">
      <div className="max-w-[1320px] mx-auto px-5 md:px-7 py-9 md:py-12 grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-8 md:gap-14 items-center">
        <div>
          <div className="font-mono text-[10.5px] tracking-[0.16em] uppercase font-bold text-coral mb-3 md:mb-4">
            ● THE BRIEF · DAILY NEWSLETTER
          </div>
          <h3 className="font-display text-[28px] md:text-[44px] font-extrabold tracking-[-0.03em] leading-[1.04] text-navy mb-4 md:mb-5 max-w-[520px]">
            Five stories every morning. Before the opening bell.
          </h3>
          <p className="font-serif text-[15px] md:text-[16.5px] leading-relaxed text-ink-soft max-w-[480px] italic">
            Written for readers who already know the basics — markets, AI, and the policy decisions that shape both.
          </p>
          <div className="mt-4 md:mt-5 font-mono text-[10px] md:text-[10.5px] tracking-[0.08em] uppercase text-sand font-semibold">
            Mon — Fri · 06:30 ET · Free
          </div>
        </div>
        <form
          className="md:border-l border-rule md:pl-14"
          onSubmit={handleSubmit}
          noValidate
        >
          <label className="font-mono text-[11px] tracking-[0.14em] uppercase font-bold text-sage mb-3 block">
            Subscribe — Free
          </label>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={disabled}
            placeholder="your@email.com"
            aria-label="Email address"
            className="w-full px-4 py-3.5 border border-rule bg-white text-ink text-[15px] placeholder:text-sand-light focus:border-navy focus:outline-none font-sans disabled:bg-cream-deep disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={disabled}
            className="w-full mt-3 bg-navy text-white px-5 py-3.5 text-[13px] font-extrabold tracking-[0.06em] uppercase hover:bg-coral transition-colors disabled:bg-sand disabled:hover:bg-sand disabled:cursor-not-allowed"
          >
            {buttonLabel}
          </button>
          {message ? (
            <p
              className={`font-mono text-[10.5px] tracking-[0.04em] mt-3 text-center ${
                status === "error" ? "text-[#C9402A]" : "text-sage"
              }`}
              role={status === "error" ? "alert" : "status"}
            >
              {message}
            </p>
          ) : (
            <p className="font-mono text-[9.5px] tracking-[0.04em] uppercase text-sand mt-3 text-center">
              No spam · Unsubscribe anytime
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
