"use client";

import { useEffect, useState } from "react";
import { canSpeak, speak } from "@/lib/speech";

export default function ListenButton({ text, lang = "tr-TR" }: { text: string; lang?: string }) {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- speechSynthesis support is only known client-side
    setSupported(canSpeak());
  }, []);

  if (!supported) return null;
  return (
    <button
      type="button"
      onClick={() => speak(text, lang)}
      className="tap-target inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium"
      style={{ borderColor: "var(--border)", color: "var(--bosphorus)" }}
      aria-label={`Listen to pronunciation: ${text}`}
    >
      🔊 Listen
    </button>
  );
}
