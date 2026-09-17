"use client";

import { useEffect, useState } from "react";
import { SavedKind, isSaved, toggleSaved } from "@/lib/storage";

export default function SaveButton({ kind, id, label = true }: { kind: SavedKind; id: string; label?: boolean }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is client-only and unavailable during SSR
    setSaved(isSaved(kind, id));
  }, [kind, id]);

  return (
    <button
      type="button"
      onClick={() => setSaved(toggleSaved(kind, id))}
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved" : "Save"}
      className="tap-target inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors"
      style={{
        borderColor: saved ? "var(--terracotta)" : "var(--border)",
        background: saved ? "var(--terracotta-light)" : "transparent",
        color: saved ? "var(--terracotta)" : "var(--foreground)",
      }}
    >
      <span aria-hidden>{saved ? "❤️" : "🤍"}</span>
      {label && (saved ? "Saved" : "Save")}
    </button>
  );
}
