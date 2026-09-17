"use client";

import { useState } from "react";

export default function ShareButton({ title, text }: { title: string; text?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        // user cancelled or share failed — fall through to copy link
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — nothing more we can do silently
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="tap-target inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium"
      style={{ borderColor: "var(--border)" }}
    >
      {copied ? "✅ Link copied" : "🔗 Share"}
    </button>
  );
}
