"use client";

import { useLocale } from "@/lib/i18n";
import { localeMeta, Locale } from "@/locales/translations";

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLocale();
  const locales = Object.keys(localeMeta) as Locale[];

  return (
    <div className="flex items-center gap-1" dir="ltr">
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={`tap-target rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${compact ? "" : "px-3 py-1.5"}`}
          style={{
            background: locale === l ? "var(--bosphorus)" : "transparent",
            color: locale === l ? "white" : "var(--muted)",
            border: locale === l ? "none" : "1px solid var(--border)",
          }}
        >
          {localeMeta[l].label}
        </button>
      ))}
    </div>
  );
}
