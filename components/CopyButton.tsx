"use client";

import { useState } from "react";

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (very old browser / http) — select-and-copy
      // manually is the fallback; nothing useful to do programmatically.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`font-mono text-[10.5px] tracking-[0.08em] uppercase font-bold px-3 py-1.5 border transition-colors ${
        copied
          ? "bg-sage text-white border-sage"
          : "bg-navy text-white border-navy hover:bg-coral hover:border-coral"
      }`}
    >
      {copied ? "Copied ✓" : label}
    </button>
  );
}
