"use client";

import Link from "next/link";
import { needThisNowIds, phraseById } from "@/data/turkish";
import PhraseCard from "@/components/PhraseCard";
import { useLocale } from "@/lib/i18n";

export default function NeedThisNowContent() {
  const { t } = useLocale();
  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <Link href="/turkish" className="text-sm" style={{ color: "var(--bosphorus)" }}>
        {t("turkish_now_back")}
      </Link>
      <h1 className="font-display mt-2 text-2xl font-semibold">{t("turkish_now_title")}</h1>
      <p className="text-sm" style={{ color: "var(--muted)" }}>
        {t("turkish_now_subtitle")}
      </p>
      <div className="mt-4 space-y-3">
        {needThisNowIds.map((id) => {
          const p = phraseById(id);
          if (!p) return null;
          return <PhraseCard key={id} phrase={p} />;
        })}
      </div>
    </div>
  );
}
