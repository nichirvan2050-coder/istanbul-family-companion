"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { turkishPhrases, categoryLabels } from "@/data/turkish";
import { TurkishPhrase } from "@/data/types";
import PhraseCard from "@/components/PhraseCard";
import { useLocale } from "@/lib/i18n";

export default function TurkishPage() {
  const { t, locale } = useLocale();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<TurkishPhrase["category"] | null>(null);

  const filtered = useMemo(() => {
    return turkishPhrases.filter((p) => {
      if (category && p.category !== category) return false;
      if (query) {
        const q = query.toLowerCase();
        return `${p.english} ${p.turkish} ${p.kurdish} ${p.arabic}`.toLowerCase().includes(q);
      }
      return true;
    });
  }, [query, category]);

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <h1 className="font-display text-2xl font-semibold">{t("turkish_title")}</h1>
      <p className="text-sm" style={{ color: "var(--muted)" }}>
        {t("turkish_subtitle")}
      </p>

      <Link
        href="/turkish/now"
        className="card mt-4 flex items-center gap-3 p-4"
        style={{ background: "var(--terracotta-light)" }}
      >
        <span className="text-2xl">🆘</span>
        <div>
          <p className="font-semibold" style={{ color: "var(--terracotta)" }}>
            {t("turkish_need_now_title")}
          </p>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            {t("turkish_need_now_subtitle")}
          </p>
        </div>
      </Link>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("turkish_search_placeholder")}
        className="tap-target mt-4 w-full rounded-full border px-4 py-2.5 text-sm outline-none"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      />

      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setCategory(null)}
          className="shrink-0 rounded-full border px-3 py-1.5 text-sm"
          style={{ borderColor: "var(--border)", background: category === null ? "var(--bosphorus)" : "transparent", color: category === null ? "white" : "var(--foreground)" }}
        >
          {t("turkish_all")}
        </button>
        {(Object.keys(categoryLabels) as TurkishPhrase["category"][]).map((c) => (
          <button
            key={c}
            onClick={() => setCategory(category === c ? null : c)}
            className="shrink-0 rounded-full border px-3 py-1.5 text-sm"
            style={{ borderColor: "var(--border)", background: category === c ? "var(--bosphorus)" : "transparent", color: category === c ? "white" : "var(--foreground)" }}
          >
            {categoryLabels[c].icon} {categoryLabels[c][locale]}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {filtered.map((p) => (
          <PhraseCard key={p.id} phrase={p} />
        ))}
        {filtered.length === 0 && <p className="col-span-full py-10 text-center text-sm" style={{ color: "var(--muted)" }}>{t("turkish_no_match")}</p>}
      </div>
    </div>
  );
}
