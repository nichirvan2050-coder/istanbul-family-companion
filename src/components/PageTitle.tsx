"use client";

import { useLocale } from "@/lib/i18n";
import { TranslationKey } from "@/locales/translations";

export function PageTitle({ k, className = "font-display text-2xl font-semibold" }: { k: TranslationKey; className?: string }) {
  const { t } = useLocale();
  return <h1 className={className}>{t(k)}</h1>;
}

export function PageText({ k, className }: { k: TranslationKey; className?: string }) {
  const { t } = useLocale();
  return <span className={className}>{t(k)}</span>;
}
