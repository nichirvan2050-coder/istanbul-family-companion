"use client";

import Link from "next/link";
import { istanbulkart as istanbulkartEn } from "@/data/transport";
import { localizeIstanbulkart } from "@/data/transportTranslations";
import SourceTag from "@/components/SourceTag";
import { useLocale } from "@/lib/i18n";

export default function IstanbulkartPageContent() {
  const { t, locale } = useLocale();
  const istanbulkart = localizeIstanbulkart(locale);

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <Link href="/transport" className="text-sm" style={{ color: "var(--bosphorus)" }}>
        ← {t("transport_title")}
      </Link>
      <h1 className="font-display mt-2 text-2xl font-semibold">💳 {t("transport_istanbulkart_title")}</h1>

      <Section title={t("istanbulkart_what_is_it")}>
        <p>{istanbulkart.whatIsIt}</p>
      </Section>

      <Section title={t("istanbulkart_where_to_get")}>
        <p>{istanbulkart.whereToGet}</p>
        <div className="mt-2 flex flex-wrap gap-2 text-sm">
          <a href={istanbulkartEn.officialUrl} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--bosphorus)" }}>
            {t("istanbulkart_official_site")}
          </a>
          <a href={istanbulkartEn.centersUrl} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--bosphorus)" }}>
            {t("istanbulkart_service_centers")}
          </a>
        </div>
      </Section>

      <Section title={t("istanbulkart_how_to_load")}>
        <p>{istanbulkart.howToLoad}</p>
      </Section>

      <Section title={t("istanbulkart_how_to_use")}>
        <p>{istanbulkart.howToUse}</p>
      </Section>

      <Section title={t("istanbulkart_card_cost")}>
        <p className="font-semibold">{istanbulkartEn.cardFee.value}</p>
        <div className="mt-1">
          <SourceTag sourceName={istanbulkartEn.cardFee.sourceName} sourceUrl={istanbulkartEn.cardFee.sourceUrl} lastVerified={istanbulkartEn.cardFee.lastVerified} status={istanbulkartEn.cardFee.status} />
        </div>
      </Section>

      <Section title={t("istanbulkart_two_adults_child")}>
        <p>{t("istanbulkart_two_standard_cards")}</p>
        <p className="mt-2 font-semibold" style={{ color: "var(--warning)" }}>
          🟡 {istanbulkart.familyNote}
        </p>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 border-t pt-5" style={{ borderColor: "var(--border)" }}>
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <div className="mt-2 text-[15px] leading-relaxed">{children}</div>
    </section>
  );
}
